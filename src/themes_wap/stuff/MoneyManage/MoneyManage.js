
/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                业务逻辑难度为：★★★
          
*/


import React, { Component } from 'react';
import {Icon,List,NavBar,Modal,Toast,Switch } from "antd-mobile";
import {
    ApiUpdateTransferSettingAction,
    ApiPlayerInfoAction,
} from "globalAction";
import connect from "react-redux/es/connect/connect";
import "./MoneyManage.scss";

class MoneyManage extends Component{
    constructor(props) {
        super(props);
        this.submitState = true;//防止多次提交
        this.transferAllOutState = true;
        this.state={
            allAmount: this.props.user.amount,
            platformsIdLoading: [],
            openLock: false,
            platformId: '', //遍历平台余额时,当平台ID等于该字段时,进行loading
            loadBalance: false, //刷新余额中动画
            allLoading: true,
            transferAllOutState: true,// 一键转出-锁
            openLock: false,// 自动转账按钮锁
        }
    }
    componentDidMount() {
        let _this = this;
        new window.actions.ApiPlayerInfoAction().fly();// 用户信息
        if(this.props.platforms.length>0 && this.props.platforms[0].hasOwnProperty('Balance')){
            _this.setState({
                allLoading: false,
            })
        }else{
            new window.actions.ApiGamePlatformsAction().fly((resp) => {// 获取所有游戏平台
                if (resp.StatusCode === 0) {
                    //获取所有游戏平台余额
                    new window.actions.ApiGamePlatformAllBalanceAction().fly((res) => {
                        _this.setState({
                            allLoading: false,
                        })
                    }, new Date());
                }
            })           
        }
    }
    reloadAll() {
        this.setState({
            allLoading: true,
        })
        new window.actions.ApiPlayerInfoAction().fly();// 会员信息
        new window.actions.ApiGamePlatformAllBalanceAction().fly(() => {
            this.setState({
                allLoading: false,
            })
        })
    }
    // 平台单独刷新
    reload(platformsId) {
        let _this = this;
        let arr = this.state.platformsIdLoading;
        arr.push(platformsId)
        this.setState({
            platformsIdLoading: arr
        })
        new window.actions.ApiGamePlatformBalanceAction(platformsId).fly(() => { // 获取单个平台余额
            let index = _this.checkIndex(this.state.platformsIdLoading, platformsId); // 通过值获取下标
            let newArr = _this.state.platformsIdLoading;
            newArr.splice(index, 1)
            _this.setState({
                platformsIdLoading: newArr
            },()=>{
                if(this.state.platformsIdLoading.length<1){
                    new window.actions.ApiPlayerInfoAction().fly();
                }
            })
        }, platformsId)
    }
    // 一键转出
    transferAllOut() {
        let _this = this;
        if (!this.state.transferAllOutState) return;
        let transferArr = [];//空数组
        for (let i = 0; i < this.props.platforms.length; i++) {
            let platform = this.props.platforms[i];
            if (platform.ID === "YOPLAY") continue;
            if (platform.Balance && platform.Balance >= 1) { // 如果余额大于1存入空数组
                transferArr.push(platform);
            }
        }
        if (transferArr.length === 0) {  // 余额大于1的平台为空数组时
            Modal.alert("抱歉！","您的所有平台没有足够的余额可以转出",
                [    
                    {text:'取消',on:()=>{}},
                    {text:'充值',onPress:()=>{window.wapHistoryType.push('/money/deposit')}}
                ]
            )
            return
        } else {
            this.setState({
                transferAllOutState: false,// 关锁
            })
        }
        let obj = {};// 转出平台-参数
        for(let b = 0;b<transferArr.length;b++){
            let Balance = transferArr[b].Balance;
            obj[transferArr[b].ID] = Balance;
        }
        Toast.loading('转出中,请稍后...', 30);
        new window.actions.ApiTransferOutAction(obj).fly(resp=>{
            if (resp.StatusCode === 0 || resp.Success === true) {
                for (let i = 0; i < transferArr.length; i++) {
                    let index = i + 1;
                    let platform = transferArr[i];
                    _this.reload(platform.ID);// 刷新
                    if (index === transferArr.length) {
                        Toast.hide();
                        _this.setState({
                            transferAllOutState: true,// 开锁
                        })
                    }
                }
            }
        })
    }
    // 通过值查找数组中对应的下标
    checkIndex(arr, item) {
        if (Array.prototype.indexOf) {
            return arr.indexOf(item);
        } else {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === item) {
                    return i;
                }
            }
        }
        return -1;
    }
    renderList() {
        let list= [];
        let tem= [];
        let EnabledPlatforms = [];
        for(let e = 0; e < this.props.platforms.length; e++){
            let item = this.props.platforms[e]; 
            if(item.ID === "YOPLAY") {
                continue;
            } 
            if(item.Enabled){
                EnabledPlatforms.push(item)
            }
        }
        if(EnabledPlatforms.length>0){
            for (let i = 0; i < EnabledPlatforms.length; i++) {
                let item = EnabledPlatforms[i];    
                let balanceDom; // 余额
                if (this.state.allLoading) {
                    balanceDom = <span className="loading"><Icon type='loading' /></span>;
                }else{
                    if(item.Maintain){
                        balanceDom = (
                            <span className='money' style={{'color':'#ff0000'}}>维护中</span>
                        )          
                    }else{
                        if (this.state.platformsIdLoading.join(',').includes(item.ID)) {
                            balanceDom = <span className="loading"><Icon type='loading' /></span>
                        }else {
                            balanceDom = (
                                <span className='money'>{item.Balance || 0}</span>
                            )
                        }                        
                    }
                }
                //一个DIV放4个LI
                tem.push(
                    <div key={i} onClick={
                        this.props.user.AutoTransfer || item.Maintain ?
                            () => { return } :
                            () => { window.wapHistoryType.push('money/transfer/' + item.ID) }}
                    >
                        <span className='tlt'>{item.Name}</span>
                        {balanceDom}
                    </div>
                )
                if (tem.length === 4) {
                    list.push(
                        <li key={item.ID}>
                            {tem}
                        </li>
                    )
                    tem = [];
                }
                if (i === EnabledPlatforms.length-1 && tem.length > 0) {
                    list.push(
                        <li key={item.ID}>
                            {tem}
                        </li>
                    )
                }
            }            
        }
        return (
            <ul>
                {list}
            </ul>
        )
    }
    changeAutoTransfer(){//自动转账开关
        if(this.state.openLock)return;
        Toast.loading('转账模式切换中...',0.8);
        this.state.openLock = true;
        let open = this.props.user.AutoTransfer == 1?0:1;
        let _this = this;
        new ApiUpdateTransferSettingAction(open).fly(resp=>{
            if(resp.StatusCode === 0){
                new ApiPlayerInfoAction().fly(resp=>{
                    Toast.success('转账模式切换成功',0.8);
                });
            }else{
                Toast.fail('转账模式切换失败',0.8);
            }
            _this.state.openLock = false;
        });
    }
    render(){
        return(
            <div className="transfer_page">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push('/myPage')}
                    rightContent={<div className="flush" onClick={this.reloadAll.bind(this)}>刷新</div>}
                >资金管理</NavBar>
                    <div className='scroll-content'>
                    <div className='wrap'>
                        <ul>
                            <li>
                                <span className='tlt'>主账户余额</span>
                                <span className='money'>{this.state.allLoading ? <span className="loading"><Icon type='loading' /></span> : this.props.user.amount}</span>
                            </li>
                            <li>
                                <span className='tlt'>游戏总余额</span>
                                <span className='money'>{this.state.allLoading ? <span className="loading"><Icon type='loading' /></span> : this.props.gameMoney}</span>
                            </li>
                            <li>
                                <button onClick={this.transferAllOut.bind(this)}>一键回收</button>
                            </li>
                        </ul>
                    </div>
                    <div className='games'>
                        {this.renderList()}
                    </div>
                    <div className='autoTransfer'>
                        {
                            this.props.user.AutoTransfer ?
                                <span><b>自动转账</b>(开启后余额自动转入游戏)</span> :
                                <span>请点击游戏名称进入手动转账页面</span>
                        }
                        <Switch
                            checked={this.props.user.AutoTransfer}
                            onChange={this.changeAutoTransfer.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        platforms:state.game.platforms,
        gameMoney: state.game.gameMoney,
    }
);

export default connect(mapStateToProps)(MoneyManage)