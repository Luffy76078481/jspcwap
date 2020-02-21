/**
 * 转入转出页
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

class TransferPage extends Component {
    constructor(props) {
        super(props);
        this.submitState = true;// 单个平台余额刷新按钮防止多次点击
        this.submitRefresh = true; // 一键刷新锁
        this.transferAllOutState = true; 
        //new window.actions.ApiPlayerInfoAction().fly(); // 会员信息API
        new window.actions.ApiGamePlatformAllBalanceAction().fly();
        this.state = {
            autoTransfer: this.props.user.AutoTransfer, //初始化自动转账状态
            activeClass:0,  //当前导航
            from:"main",    //转出
            to:"main",      //转入
            type:"",        //操作类型
            reqLock:false,  //防止多次连续提交
            loadBalance:false, // 是否余额加载时进行loading动画
            BalanceId:"", // 遍历平台余额时，当平台ID等于该字段时，进行loading
            allLoading:false // 一键刷新loading
        };     
    }
    //拿到每个相应平台的余额
    getBalance(id) {
        var ret = 0;
        if (id === "main") {       
            ret = this.props.user.amount || 0;
        } else {
            for (var i = 0; i < this.props.game.platforms.length; i++) {
                var p = this.props.game.platforms[i];
                if (p.ID === id) {
                    ret = p.Balance || 0;
                    break;
                }
            }
        }
        return Math.floor(ret);
    }
    // 提交转入转出
    onSubmit(e) {
        e.preventDefault();
        let _self = this;
        var from = this.refs.from.value;// 转出值
        var to = this.refs.to.value; // 转入值
        //判空
        if (!from || !to) {
            window.swal("错误", "转入转出项必须填写", "error");
            return;
        }
        //判重
        if (from == to) {
            window.swal("错误", "转入转出项不能相同", "error");
            return;
        }
        var fromBalance = this.getBalance(this.state.from);
        console.log(fromBalance)
        //判小
        if (fromBalance <= 0) {
            window.swal("错误", "转出项可用金额必须大于0", "error");
            return;
        }
        //判大
        if (!this.refs.amount.value || this.refs.amount.value > fromBalance) {
            window.swal("错误", "输入金额必须大于0并且小于转出可用金额");
            return;
        }
        //return
        if(this.state.reqLock)
        return;
        this.state.reqLock = true;
        var next = (platformsId) => {
            // 转入
            if (this.refs.to.value !== "main") {
                new window.actions.ApiTransferAction (this.refs.to.value, "in", this.refs.amount.value).fly((resp)=>{
                    if (resp.StatusCode === 0) {
                        this.getGameBalance(platformsId,true);
                        setTimeout(()=>{
                            _self.state.reqLock = false;
                        },2000)              
                    }else{
                        setTimeout(()=>{
                            _self.state.reqLock = false;
                        },2000)                       
                    }
                });
            }else{
                this.getGameBalance(platformsId,true);
                setTimeout(()=>{
                    _self.state.reqLock = false;
                },2000)    
            }
        }
        // 从平台转出到主账户
        if (this.state.from !== "main") {
            new window.actions.ApiTransferAction (this.refs.from.value, "out", this.refs.amount.value).fly((resp)=>{
                if (resp.StatusCode === 0) {
                    next(from);
                    setTimeout(()=>{
                        _self.state.reqLock = false;
                    },2000)    
                }else{
                    setTimeout(()=>{
                        _self.state.reqLock = false;
                    },2000)                    
                }
            });
        } 
         // 从主账户转入到游戏平台
        else {
            next(to);   
        }
    }
    // 一键转出
    transferAllOut(){
        let _this = this;
        if(!this.transferAllOutState)return;
        let transferArr=[];
        // 计算当前游戏总财富
        for(let i=0; i<this.props.platforms.length;i++){
            let platform = this.props.platforms[i];
            if(platform.Balance && platform.Balance>=1){
                transferArr.push(platform);
            }
        }
        // 如果游戏总财富余额不大于1，则不转出。
        if(transferArr.length == 0) {
            let obj = {};
            obj.type="message";
            obj.msgType = "error";
            obj.title = "错误";
            obj.message = "当前没有可转出的余额";
            var d = new Date();
            obj.created = d.format("yyyy/MM/dd hh:mm:ss");
            obj.startTime = d.getTime();
            window.actions._dispatch(obj)
            this.transferAllOutState = true;
            return
        }else{
            this.transferAllOutState = false;
        }
        let param = {};
        for(let b = 0;b<transferArr.length;b++){
            let Balance = transferArr[b].Balance;
            param[transferArr[b].ID] = Balance;
        }
        new window.actions.ApiTransferOutAction(param).fly(resp=>{
            if (resp.StatusCode === 0 || resp.Success === true) {
                _this.allfrenshBalance();
            }
        })
        /*
        for(let i=0; i<transferArr.length;i++){
            let platform = transferArr[i];
            let index = i+1;
            new window.actions.ApiTransferAction (platform.ID,"out",parseInt(platform.Balance)).fly((resp)=>{
                if (resp.StatusCode === 0) {
                    _this.allfrenshBalance();
                }
                if( index == transferArr.length){
                    _this.transferAllOutState = true;
                }
            }, "transfer_" + platform.ID);
        }
        */
    }
    // 转入或转出切换
    onChangeFromOrTo() {
        this.setState({from:this.refs.from.value, to:this.refs.to.value});
    }
    // 平台转账选择
    renderPlatformSelect() {
        var ret = [];
        ret.push(<option key="main" value="main">主帐户</option>);
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if(platform.Name == 'YOPLAY'){ continue }
            ret.push(
                <option key={i} style={platform.Maintain?{"color":"#ccc"}:{}} 
                disabled={platform.Maintain} value={platform.ID}>{platform.Name}</option>
            )
        }
        return ret;
    }
    // 切换游戏类型
    changePlatformsTab(whichPlatform){
        this.setState({
            activeClass:whichPlatform,
        })
        this.platformsBalance(this.state.activeClass)
    }
    // 游戏平台-游戏余额-表格
    platformsBalance(type=this.state.activeClass){
        let ret = []  
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if( platform.Name == 'YOPLAY' ){ 
                continue 
            }
            let noteDOM;
            if(platform.Maintain){
                noteDOM = <div><span className='f16' style={{'color':'#ff0000'}}>维护中...</span></div>
            }else{
                if(this.state.allLoading || (this.state.loadBalance && platform.ID == this.state.BalanceId)){
                    noteDOM=(<div><Icon type="loading" spin /><span>请稍候...</span></div>)
                }else{
                    noteDOM=(<div><span className="money">{platform.Balance || 0}</span>RMB</div>)
                }                
            }
            if(type){
                if( platform.ClientGameType == type ){
                    ret.push(
                        <div key={i} className='platbox'>
                            <div className='platName'>
                                {platform.Name}
                                {
                                    platform.Maintain?
                                    null:
                                    <i className="glyphicon glyphicon-repeat pointer" onClick={this.getGameBalance.bind(this,platform.ID)}></i>
                                }                              
                            </div>
                            <div className='platBalance'>
                                {noteDOM}
                            </div>          
                        </div>
                    )   
                }
            }else{
                ret.push(
                    <div key={i} className='platbox'>
                        <div className='platName'>
                            {platform.Name}
                            {
                                platform.Maintain?
                                null:
                                <i className="glyphicon glyphicon-repeat pointer" onClick={this.getGameBalance.bind(this,platform.ID)}></i>
                            }      
                        </div>
                        <div className='platBalance'>
                            {noteDOM}
                        </div>    
                    </div>
                )  
            }
        }             
        return ret
    }
    //切换自动转账状态
    switchAutotransfer = ()=> { 
        new window.actions.ApiUpdateTransferSettingAction(this.state.autoTransfer == 0?1:0).fly(res=>{
            if(res.StatusCode ===0){
                this.setState({
                    autoTransfer: !this.state.autoTransfer
                })
                new window.actions.ApiPlayerInfoAction().fly();
            }
        });
    }
    // 一键刷新获取所有余额
    allfrenshBalance(){
        if(!this.submitRefresh)return;
        this.state.allLoading = false;
        this.setState({
            allLoading:true
        })
        this.submitRefresh = false;
        new window.actions.ApiGamePlatformAllBalanceAction().fly(resp=>{
            this.submitRefresh = true;
            this.transferAllOutState = true;
            if(resp.StatusCode===0){
                new window.actions.ApiPlayerInfoAction().fly();
                setTimeout(()=>{
                    this.setState({
                        allLoading:!this.state.allLoading
                    })     
                },500)          
            }
        });
    }
    // 获取单个平台余额
    getGameBalance(BalanceId,getUserAmount=false){
        if(!this.submitState) return;
        this.setState({
            loadBalance:true,
            BalanceId
        });
        this.submitState = false;
        new window.actions.ApiGamePlatformBalanceAction(BalanceId).fly(resp=>{
            this.submitState = true;
            this.setState({
                loadBalance:false
            })
            if(getUserAmount){
                new window.actions.ApiPlayerInfoAction().fly(); // 会员信息API
            }
        },BalanceId)
    }
    render() {
        return (
            <div className="transferWrap clearfix pr">
                <div className='alloutBox'>
                    {/* 一键转出，刷新只能同一时间点击一个,disabled */}
                    <button onClick={this.transferAllOut.bind(this)} className="btn AllOutButton" disabled={!this.submitRefresh}>一键转出</button>
                </div>
                <div className='allfrenshBox'>
                    <button onClick={this.allfrenshBalance.bind(this)} className="btn AllOutButton" disabled={!this.transferAllOutState}>一键刷新</button>
                </div>
                <div className="fl w-5 pr40">           
                    <div className="autoTransfer">
                        <span className="f14">自动转账</span>
                        <div className={`transferOnOff ${this.state.autoTransfer?"checked":"unChecked"}`} onClick={this.switchAutotransfer}>
                            <i className="transferCircle" />
                        </div>
                    </div>          
                    {
                        this.state.autoTransfer?
                        <p className='FontColor pr40 pl40 pt20'>
                            温馨提示：<br/>
                            您有已切换为自动转账模式；<br/>
                            主账户余额将会自动转入到游戏平台；<br/>
                            祝你游戏愉快！
                        </p>:
                        <form onSubmit={this.onSubmit.bind(this)} className='mt50'>
                            <div className="mb20">
                                <label>转出: </label>             
                                <select ref="from" onChange={this.onChangeFromOrTo.bind(this)} className='normalInput'>
                                    {this.renderPlatformSelect()}
                                </select>           
                            </div>        
                            <div className="mb20">
                                <label>转入: </label>             
                                <select ref="to" onChange={this.onChangeFromOrTo.bind(this)} className='normalInput'>
                                    {this.renderPlatformSelect()}
                                </select>      
                            </div>           
                            <div className="mb20">
                                <label>转账金额：</label>
                                <input ref="amount" type="number" placeholder="请输入转账金额"/>
                            </div>      
                            <div className="mb10">
                                <label className='ZhanWei'></label>
                                <span className='FontColor f14'>温馨提示：只支持1元以上整数的转账。</span>
                            </div>    
                            <div>
                                <button className='SubBut mt10' style={{"width":"250px","marginLeft":"120px"}}>确认并提交</button>
                            </div>               
                        </form>                           
                    }                
                </div>
                <div className="fr w-5 text-center">
                    {/* <ul className='platformsTabs'>
                        <li key='index' onClick={this.changePlatformsTab.bind(this,0)} className={!this.state.activeClass?'active':null}>全部</li>
                        <li key='casino' onClick={this.changePlatformsTab.bind(this,1)} className={this.state.activeClass==1?'active':null}>真人</li>
                        <li key='lottery' onClick={this.changePlatformsTab.bind(this,2)} className={this.state.activeClass==2?'active':null}>彩票</li>
                        <li key='sport' onClick={this.changePlatformsTab.bind(this,3)} className={this.state.activeClass==3?'active':null}>体育</li>
                        <li key='game' onClick={this.changePlatformsTab.bind(this,4)} className={this.state.activeClass==4?'active':null}>电子</li>
                        <li key='chess' onClick={this.changePlatformsTab.bind(this,5)} className={this.state.activeClass==5?'active':null}>棋牌</li>
                        <li key='esprot' onClick={this.changePlatformsTab.bind(this,6)} className={this.state.activeClass==6?'active':null}>电竞</li>
                    </ul> */}
                    <div className='platformsContents'>
                        <Scrollbars style={{height:400 }}>
                            {this.platformsBalance()}
                        </Scrollbars>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        game: state.game,
        platforms: state.game.platforms.filter((item)=>{
            if(item.Enabled){
                return item;// 各个平台
            }
        })
    }
);

export default connect(mapStateToProps, {})(TransferPage);