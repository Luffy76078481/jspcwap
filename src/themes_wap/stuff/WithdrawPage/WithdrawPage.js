import React, { Component } from 'react';
import {Icon, Flex, List, InputItem, NavBar, Modal, Toast, Switch, Picker} from "antd-mobile";
import {Link,browserHistory} from "react-router";
import connect from "react-redux/es/connect/connect";
import { ApiBankAccountsAction, ApiPlayerInfoAction, ApiWithdrawAction, ApiGamePlatformAllBalanceAction, ApiGamePlatformBalanceAction} from "globalAction";
import './WithdrawPage.scss';
import {config} from "globalConfig";


let timer=null;//倒计时
let timerNum =60;

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class WithdrawPage extends Component{
    constructor(props) {
        super(props);
        this.canWithdrawState = true;//取款状态锁
        this.phoneCodeState = true;//验证码锁
        new ApiBankAccountsAction().fly();
        let Accounts=[];
        this.props.user.bankAccounts.forEach((item,index)=>{
            Accounts.push({
                label:item.Bank.BankName+ " [" + "**** ****" + item.AccountNo.replace(/\s/g, "").substr(-4) + "] ",
                id:item.Id,
                PayType:item.PayType,
                value:index
            })
        })
        this.state={
            // money:parseInt(this.props.user.amount-0),
            money: "",
            Accounts: Accounts,
            AccountsValue: [],
            AccountsId: "",
            PayType: "",
            sendButtonMes: "获取验证码",
            buttonDisabled: false,
            showModal: false,
            audit_amount: 0,
            platformsIdLoading: [],
            allLoading: true,
            transferAllOutState: true,// 一键转出-锁
        }
        if(this.props.user.bankAccounts.length === 0){
            Modal.alert('无法取款!','因没有绑定取款信息，需完善个人取款信息即可执行取款操作',[
                {"text":"完善个人信息",onPress:()=>{
                    window.wapHistoryType.push('/cardManage')
                }}
            ])
            return;
        }
    }
    componentDidMount(){
        this.setState({
            AccountsValue:[0],
            AccountsId:this.state.Accounts[0].id,
        })
        new actions.ApiGetAuditAction().fly(res=>{
            this.setState({audit_amount: parseInt(res.TotalFee) ? res.TotalFee : 0})
        })
        new window.actions.ApiPlayerInfoAction().fly();
        let _this = this;
        // new window.actions.ApiPlayerInfoAction().fly();// 用户信息
        new window.actions.ApiGamePlatformsAction().fly((resp) => {// 获取所有游戏平台
            if (resp.StatusCode === 0) {
                //获取所有游戏平台余额
                new window.actions.ApiGamePlatformAllBalanceAction().fly(() => {
                    _this.setState({
                        allLoading: false,
                    })
                }, new Date());
            }
        })
    }

    componentWillUnmount(){
        clearInterval(timer)
    }
    // 获取余额
    setAmount(){
        this.setState({
            money:parseInt(this.props.user.amount-0)
        })
    }
    moneyChange(val,event){
        this.setState({
            money:val-0==0?null:val-0
        })
    }
    accountsChange(val){
        let index = val[0];
        this.setState({
            AccountsValue:[index],
            AccountsId:this.state.Accounts[index].id,
            PayType:this.state.Accounts[index].PayType
        })
    }
    // 提款
    onSubmit(e){
        e.preventDefault();
        let self = this;
        let accountId = this.state.AccountsId;
        let money = this.refs.money.state.value;
        let password =this.refs.password.state.value;
        if(!self.canWithdrawState) return;// 取款状态锁关闭状态方可取款
        if(this.props.user.amount < money){
            Modal.alert("错误", "取款金额已经超出您的余额");
            return;
        }
        if (!money) {
            Modal.alert("错误", "取款金额必须大于0");
            return;
        }  
        if (money < 100) {
            Modal.alert("错误", "单笔最低提款100");
            return;
        }
        if (!accountId) {
            Modal.alert("错误", "取款帐号未指定");
            return;
        }
        if (!password) {
            Modal.alert("错误", "取款密码未指定");
            return;
        }
        // 验证过手机没
        if (!this.props.user.verfyPhone && this.props.backConfigs.IsBindingPhone ) {
            let _this = this;
            Modal.alert("无法取款","因为没有验证手机号码，需验证手机号码即可执行取款操作",[
                {"text":"手机验证",onPress:()=>{
                    _this.showModal();
                }}
            ])
            return;
        }
        self.canWithdrawState = false;
        Toast.loading('提款申请中...',300);
        this.refs.password.state.value="";
        this.setState({
            AccountsValue:[],
            money: 0
        })
        let filter = {//后台要接收的参数
            BankAccountId:accountId,
            Amount:money,
            WithdrawalPwd:password,
            CodeType:this.state.PayType,
            UserAuditConfirm:false
        };
        new ApiWithdrawAction(filter).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode==0){
                if(resp.Success){
                    Modal.alert('恭喜您,取款已成功！');
                    new ApiPlayerInfoAction().fly();
                    new ApiGamePlatformAllBalanceAction().fly();
                    self.canWithdrawState = true;
                    return;
                }
                if(resp.NeedToAudit){//如果取款需要稽核时
                    let AllowWithdrawals = resp.AllowWithdrawals;//稽核不通过，是否允许提款
                    let amount = Number(money);
                    let TotalFee = window.Util.numberWithCommas(resp.TotalFee,2);//手续费
                    let leftFee = amount - TotalFee;//减去手续费后的值
                    if(amount < Number(TotalFee)){
                        Modal.alert('取款失败','提款金额不足必须大于需核减稽核金额¥'+TotalFee)
                        self.canWithdrawState = true;
                        return;
                    }
                    else if( amount + Number(TotalFee) > self.props.user.amount){
                        Modal.alert('取款失败','您账户的余额不足,稽核金额¥'+TotalFee+'+提款金额¥'+amount+',已经大于您的账户余额¥'+self.props.user.amount);
                        self.canWithdrawState = true;
                        return;
                    }
                    else if(AllowWithdrawals){
                        Modal.alert(
                            '取款稽核确认',
                            '提款需核减金额¥'+TotalFee+",实际提款金额¥"+leftFee,
                            [
                                {text:'取消',onPress:()=> self.canWithdrawState = true},
                                {text:'确认',onPress:()=>{
                                        Toast.loading('提款申请中...',300);
                                        let filtertwo = {//后台要接收的参数
                                            BankAccountId:accountId,
                                            Amount:money,
                                            WithdrawalPwd:password,
                                            CodeType:self.state.PayType,
                                            UserAuditConfirm:true
                                        };
                                        new ApiWithdrawAction(filtertwo).fly(resp=>{
                                            if (resp.StatusCode === 0) {
                                                Modal.alert('恭喜您,取款已成功！')
                                                new ApiPlayerInfoAction().fly();
                                                new ApiGamePlatformAllBalanceAction().fly();
                                            }else{
                                                Modal.alert("取款申请失败",resp.Message);
                                            }
                                            Toast.hide();
                                            self.canWithdrawState = true;
                                        });
                                    }}
                            ]
                        )
                        return;
                    }
                    else {
                        Modal.alert('取款失败','您的稽核未完成，提款需核减稽核金额¥'+TotalFee);
                        self.canWithdrawState = true;
                        return;
                    }
                }
            }else{
                Modal.alert("取款申请失败",resp.Message);
                self.canWithdrawState = true;
            }

        });
    }
    onWrapTouchStart = (e) => {
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    showModal(){
        this.setState({
            showModal: true
        });
    }
    onCloseModal() {
        this.setState({
            showModal: false,
        });
    }
    // 获取验证码
    getPhoneCode(){
        if(timer){
            clearInterval(timer);
        }
        Toast.info('验证码发送中,请稍后...',300);
        new window.actions.ApiSendMobileVCodeAction().fly((resp)=>{
            Toast.hide();
            if(resp.StatusCode === 0){
                Toast.info('验证码已发送,请注意查收！')
                this.setState({sendButtonMes:'重新获取('+timerNum+'s)',buttonDisabled:true});
                timer=setInterval(()=>{
                    if(timerNum>0){
                        this.setState({sendButtonMes:'重新获取('+ timerNum-- +'s)'});
                    }else{
                        this.setState({sendButtonMes:'获取验证码',buttonDisabled:false});
                        timerNum=60;
                        clearInterval(timer);
                    }
                },1000)
            }else{
                Modal.alert('错误!', resp.Message)
            }
        })
    }
    // 验证 验证码
    onSubmitPhone(){
        let _this = this;
        if(!_this.phoneCodeState) return;
        let phoneCode = _this.refs.phoneCode.value;
        if(!phoneCode){
            Modal.alert('请输入验证码!');
            return;
        }
        Toast.loading('验证中,请稍后...',300)
        this.phoneCodeState= false;
        new window.actions.ApiValidatePhoneAction(this.props.user.phone,phoneCode).fly((resp)=>{
            _this.phoneCodeState= true;
            Toast.hide();
            if(resp.StatusCode === 0){
                new window.actions.ApiPlayerInfoAction();
                new window.actions.LoadBackConfigsAction().fly()//是否绑定手机配置项
                _this.onCloseModal();
                Modal.alert("成功", "恭喜验证成功，现在您可以进行提款");
            }else{
                Modal.alert("错误", resp.Message);
            }
        });
    }
    transferAllOut() { //一键转出
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
            Modal.alert("抱歉！", "您的所有平台没有足够的余额可以转出",
                [
                    { text: '取消', on: () => { console.log("go,go"); } },
                    { text: '充值', onPress: () => { window.wapHistoryType.push('/money/deposit'); } }
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
            Toast.hide();
            if (resp.StatusCode === 0 || resp.Success === true) {
                for (let i = 0; i < transferArr.length; i++) {
                    let index = i + 1;
                    let platform = transferArr[i];
                    _this.reload(platform.ID);// 刷新
                    if (index === transferArr.length) {
                        _this.setState({
                            transferAllOutState: true,// 开锁
                        })
                    }
                }
            }
        })
    }
    reload(platformsId) {
        new ApiPlayerInfoAction().fly();
        new ApiGamePlatformBalanceAction(platformsId).fly(()=>{
            
        },platformsId);
    }
    render(){
        let _this = this;
        let extraBtn=(
            <div className="addAmount">
                <a onClick={this.setAmount.bind(this)} className="">全部</a>
            </div>
        )
        let {audit_amount} = this.state;  
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push('/myPage')}
                >玩家提款</NavBar>
                <div className="scroll-content WithdrawPage">
                    <div className="wrap">
                        <ul>
                            <li>
                                <span className="tlt">主账户余额</span>
                                <span className="money">
                                    {this.state.allLoading ? (
                                        <span className="loading">
                                            <Icon type="loading" />
                                        </span>
                                    ) : (
                                            this.props.user.amount
                                        )}
                                </span>
                            </li>
                            <li>
                                <span className="tlt">游戏总余额</span>
                                <span className="money">
                                    {this.state.allLoading ? (
                                        <span className="loading">
                                            <Icon type="loading" />
                                        </span>
                                    ) : (
                                            this.props.gameMoney
                                        )}
                                </span>
                            </li>
                            <li>
                                 <button onClick={this.transferAllOut.bind(this)}>
                                    一键回收
                                </button> 
                            </li>
                        </ul>
                    </div>
                    <div className='amount_tip_box'>单笔最低提款100元, 您还需要完成的打码量为: {audit_amount}</div>
                    <div className='circle-wrap'>
                        <List>
                            <List.Item className="noPaddingLeft" extra={extraBtn}>
                                <InputItem
                                    //type="number"
                                    type="digit"//原生的number类型支持小数
                                    ref="money"
                                    placeholder="请填写转账金额"
                                    clear
                                    maxLength={15}
                                    value = {this.state.money}
                                    onChange={this.moneyChange.bind(this)}
                                >金额</InputItem>
                            </List.Item>
                            <div className="accounts">
                                <Picker extra="请选择收款账号"
                                        data={this.state.Accounts}
                                        value={this.state.AccountsValue}
                                        cols={1}
                                        onOk={(val)=>{this.accountsChange(val)}}
                                >
                                    <List.Item arrow="down">收款账号</List.Item>
                                </Picker>
                            </div>

                            <InputItem
                                ref="password"
                                type="password"
                                placeholder="请输入提款密码"
                            >提款密码</InputItem>

                        </List>                        
                    </div>

                    <span className="tips">*初始提款密码默认为登录密码或者0000，为了保障资金安全，建议您立即去<Link style={{"color":"red"}} to="/editPassword">修改密码</Link>页面修改密码!</span>
                    {/*{*/}
                    {/*    this.props.user.SingleMinWithdraw && <span className="tips">*单笔最低提款---{this.props.user.SingleMinWithdraw}元</span>*/}
                    {/*}*/}
                     <span className="tips" style={{display:'none'}}>*温馨提示：24小时内超过VIP等级对应提款次数加收每笔50元手续费。</span>
                    <a onClick={this.onSubmit.bind(this)} className="btn">提 交</a>
                </div>
                <Modal
                    visible={_this.state.showModal}
                    transparent
                    maskClosable={true}
                    closable={true}
                    onClose={this.onCloseModal.bind(this)}
                    title="手机短信验证!"
                    footer={
                        [   
                            {
                                text:"联系客服",onPress:()=>{
                                    if(config.isApp){
                                        window.Util.appOpen(_this.props.remoteSysConfs.online_service_link)
                                    }else{
                                        window.open(_this.props.remoteSysConfs.online_service_link,'_blank');
                                    }
                                }
                            },
                            { text: '确定', onPress: () => {_this.onSubmitPhone() } }

                        ]
                    }
                    wrapProps={{ onTouchStart: _this.onWrapTouchStart }}
                >
                    <div className="sendPhone">
                        <span>点击获取将向您的手机号发送验证码!</span>
                        <div className="item">
                            <input type="number" disabled={true} value={_this.props.user.phone} />
                        </div>
                        <div className="item">
                            <input className="code" ref="phoneCode" type="number" placeholder="验证码"/>
                            <a className={this.state.buttonDisabled?"getCode disabled":"getCode"} onClick={this.getPhoneCode.bind(this)}>{this.state.sendButtonMes}</a>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        backConfigs:state.backConfigs,
        remoteSysConfs:state.remoteSysConfs,
        platforms: state.game.platforms,
        gameMoney: state.game.gameMoney,
    }
);

export default connect(mapStateToProps)(WithdrawPage)