
/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                代理注册-业务逻辑难度为：★★★
          
*/
import React, { Component } from 'react';
import {Icon,List,InputItem,NavBar,Modal,Toast,DatePicker,Picker} from "antd-mobile";
import connect from "react-redux/es/connect/connect";
import { ApiagentBanks } from "globalAction";
import * as cache from "CacheHelper";
import "./AgentReg.scss"

let PayMethodList=[];
const isChinese = function isChinese(str){ 
    var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
    if(!patrn.exec(str)){ 
        return false; 
    }else{ 
        return true; 
    } 
}

class RegisterPage extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
        this.state = {
            birthday:"",
            checkPay:false,
            VerifyCode:"",
            noUsername: false,
            noRealname:false,
            noPassword: false,
            notMatchPayPassword: false,
            noBirthday:false,
            noEmail:false,
            noVerifycode:false,
            noPayPassword: false,
            noPayPassword2: false,
            noPhone: false,
            noWechat:false,
            noQQ: false,
            AgentbanksAccount:false,
            agentBanks:[],
            defaultagentBanks:[0],
            agentbanksId:""          
        }
    }
    componentWillMount() {
        Toast.info('数据加载中,请稍后');
        new window.actions.ApiAgentGetRegistSetting().fly(resp=>{
            Toast.hide();
        });
        // 推广链接
        let isAutoLogin = location.search;
        if(isAutoLogin.indexOf('channel')>0){
            cache.setSession('channel',isAutoLogin.split('=')[1]);
        }
        new ApiagentBanks().fly((resp)=>{
            let index=0;
            for(let i=0;i<resp.Data.length;i++){
                let banks = resp.Data[i];
                PayMethodList.push({
                    label:banks.BankName,
                    selfObj:banks,
                    value: index,
                    Id :banks.Id
                });
                index++;
            }
            this.setState({
                agentbanksId:PayMethodList[0].Id
            })
        })
    }
    // 注册提交
    onRegister(event) {        
        event.preventDefault();
        let checknom = 0;
        let username = this.refs.username.state.value;
        let password = this.refs.password.state.value;
        let notMatchPayPassword = this.refs.notMatchPayPassword.state.value;
        let AgentBanks = this.state.agentbanksId;
        let AgentAccount = this.refs.AgentbanksAccount.state.value;
        let withdrawPassword = this.refs.withdrawPassword.state.value;
        let noPayPassword2="",payPassword="",noRealname="",noPhone="",noEmail="",noQQ="",noBirthday="",noWechat="";
        let AgentbanksAccount="";
        let params={};
        if(!username){
            this.setState({
                noUsername:true
            });
            checknom++;
        }
        if(!password){
            this.setState({
                noPassword:true
            });
            checknom++;
        }
        if(!notMatchPayPassword){
            this.setState({
                notMatchPayPassword:true
            });
            checknom++;
        }
        if(password !== notMatchPayPassword ){
            this.setState({
                notMatchPayPassword:true
            });
            checknom++;
        }
        if(this.props.remoteSysConfs.allow_edit_pay_pwd === "true" ){
            noPayPassword2 = this.refs.noPayPassword2 && this.refs.noPayPassword2.state.value;
            payPassword = this.refs.noPayPassword && this.refs.noPayPassword.state.value;
            if(this.state.checkPay){
                if (!payPassword) {
                    this.setState({
                        noPayPassword: true
                    });
                    checknom++;
                }
                if (!noPayPassword2 || noPayPassword2!==payPassword) {
                    this.setState({
                        noPayPassword2: true
                    });
                    checknom++;
                }
            }else{
                if (!payPassword) {
                    payPassword = password
                }
            }
        }
        // 真实姓名
        if(this.props.registerSetting.TrueName.IsVisible){
            noRealname =this.refs.noRealname.state.value;
            if(!noRealname && this.props.registerSetting.TrueName.IsRequire){
                this.setState({
                    noRealname:true
                });
                checknom++;
            }
        }
        if (this.props.registerSetting.Phone.IsVisible) {
            noPhone = this.refs.noPhone && this.refs.noPhone.state.value.replaceAll(' ','');
            if (!noPhone && this.props.registerSetting.Phone.IsRequire) {
                this.setState({
                    noPhone: true
                });
                checknom++;
            }
        }
        AgentbanksAccount = this.refs.AgentbanksAccount&& this.refs.AgentbanksAccount.state.value.replaceAll(' ','');
        if(!AgentbanksAccount){
            this.setState({
                AgentbanksAccount:true
            })
            checknom++;
        }
        withdrawPassword = this.refs.withdrawPassword && this.refs.withdrawPassword.state.value.replaceAll(" ","")
        if(!withdrawPassword){
            this.setState({
                withdrawPassword:true
            })
            checknom++;
        }
        if (this.props.registerSetting.Email.IsVisible) {
            noEmail = this.refs.noEmail && this.refs.noEmail.state.value;
            if (!noEmail && this.props.registerSetting.Email.IsRequire) {
                this.setState({
                    noEmail: true
                });
                checknom++;
            }
        }
        if (this.props.registerSetting.QQ.IsVisible) {
            noQQ = this.refs.noQQ && this.refs.noQQ.state.value;
            if (!noQQ && this.props.registerSetting.QQ.IsRequire) {
                this.setState({
                    noQQ: true
                });
                checknom++;
            }
        }
        if (this.props.registerSetting.Birthday.IsVisible) {
            noBirthday = this.refs.noBirthday && this.state.birthday;
            if (!noBirthday && this.props.registerSetting.Birthday.IsRequire) {
                this.setState({
                    noBirthday:true,
                });
                checknom++;
            }
        }
        if(checknom!=0){
            return;
        }
        if(!this.submitStateLock) return;
        this.submitStateLock=false;
        Toast.loading('注册中,请稍后...');
        params={
            UserName:username,
            TrueName:noRealname,
            Password:password,
            Email:noEmail,
            Phone:noPhone,
            QQ:noQQ,
            Wechat:noWechat,
            WithdrawalPassword:withdrawPassword,
            Birthday:noBirthday,
            AgentBankId:AgentBanks,
            WebSite:"",
            AgentBankNo:AgentAccount
        }
        new window.actions.ApiAgentRegisterAction (params).fly((respond)=>{
            Toast.hide();
            this.submitStateLock=true;
            if (respond.StatusCode === 0) {
                new window.actions.LoginAfterInit();
                Modal.alert("注册成功！", respond.Message);
                window.wapHistoryType.push("/");
            } else {
                Modal.alert("注册失败！", respond.Message);
            }
        });
    }
    // 错误提示
    errorInfos =(which)=>{
        //用户名
        const inputVal = this.refs.username.state.value;
        if(which=="noUsername" && this.state.noUsername){
            if(inputVal == ""){
                Toast.info('用户名不能为空');
            }else {
                if(isChinese(inputVal)){
                    Toast.info('用户名不能是中文,只能是数字或字母！');
                    this.refs.username.state.value = '';
                }else if( !isChinese(inputVal) && inputVal.length < 6){
                    Toast.info('用户名不能少于6位！');
                }else {

                }
            }
        }
        //真实姓名
        if(this.state.noRealname && which=="noRealname"){
            Toast.info('请填写您的真实姓名！');
        }
        //密码
        if(this.state.noPassword && which=="noPassword"){
            if(this.refs.password.state.value==""){
                Toast.info('请填写登陆密码！');
            }else{
                Toast.info('登陆密码长度必须为6-12位！')
            }
        }
        //确认密码
        if(this.state.notMatchPayPassword && which=="notMatchPayPassword"){
            Toast.info('确认密码与密码不相符！');
        }
        //取款密码
        if(this.state.noPayPassword  && which=="noPayPassword"){
            if(this.refs.noPayPassword.state.value==""){
                Toast.info('请填写取款密码！');
            }else if(this.refs.noPayPassword.state.value===this.refs.password.state.value){
                Toast.info('取款密码和登录密码不能相同！')
            }else{
                Toast.info('取款密码长度必须为6-12位！')
            }
        }
        //确认取款密码
        if(this.state.noPayPassword2 && which =="noPayPassword2"){
            Toast.info('确认取款密码与取款密码不相符！');
        }
        //郵箱
        if(this.state.noEmail && which =="noEmail" && this.props.registerSetting.Email.IsRequire){
            Toast.info('请填写您的邮箱！');
        }
        //生日
        if(this.state.noBirthday && which=="noBirthday"){
            Toast.info('您的生日不能为空！');
        }
        //手机
        if(this.state.noPhone && which=="noPhone"){
            if(this.refs.noPhone.state.value==""){
                Toast.info('请填写您的手机号码！');
            }else{
                Toast.info('手机号码长度错误！')
            }
        }
        //微信
        if(this.state.noWechat && which =="noWechat"){
            Toast.info('您的微信号码不能为空！');
        }
        //QQ
        if(this.state.noQQ && which =="noQQ"){
            Toast.info('您的QQ号码不能为空！')
        }

        if(this.state.AgentbanksAccount && which =="AgentbanksAccount"){
            Toast.info('您的银行账号不能为空！')
        }
        if(this.state.withdrawPassword && which == "withdrawPassword"){
            Toast.info('您的取款密码不能为空！')
        }
    }
    // 判断输入是否合格
    validateInput(which,val){
        //用户名
        if(which=="noUsername"){
            if(val=="" || 6>val.length || isChinese(val)){
                this.setState({
                    noUsername:true
                })
            }else{
                this.setState({
                    noUsername:false
                })
            }
        }
        if(which=="AgentbanksAccount"){
            
            if(val==""){
                this.setState({
                    AgentbanksAccount:true
                })
            }else{
                this.setState({
                    AgentbanksAccount:false
                })
            }
        }
        if(which=="withdrawPassword"){
            if(val==""){
                this.setState({
                    withdrawPassword:true
                })
            }else{
                this.setState({
                    withdrawPassword:false
                })
            }
        }
        //真实姓名
        if(which =="noRealname" && this.props.registerSetting.TrueName.IsRequire){
            if(val==""){
                this.setState({
                    noRealname:true
                })
            }else{
                this.setState({
                    noRealname:false
                });
            }
        }
        //登陆密码
        if(which =="noPassword"){
            if(val==""|| 6>val.length){
                this.setState({
                    noPassword:true
                })
            }else{
                this.setState({
                    noPassword:false
                });
            }
        }
        //确认密码
        if(which =="notMatchPayPassword"){
            let oldVal = this.refs.password.state.value;
            if(val=="" ||oldVal!==val){
                this.setState({
                    notMatchPayPassword:true
                })
            }else{
                this.setState({
                    notMatchPayPassword:false
                });
            }
        }

        //取款密码
        if(which == "noPayPassword"){
            let oldVal = this.refs.password.state.value;
            if(val==""|| 6>val.length || oldVal ===val){
                this.setState({
                    noPayPassword:true
                })
            }else{
                this.setState({
                    noPayPassword:false
                });
            }
        }
        //确认取款密码
        if(which == "noPayPassword2"){
            let oldVal = this.refs.noPayPassword.state.value;
            if(val=="" ||oldVal!==val){
                this.setState({
                    noPayPassword2:true
                })
            }else{
                this.setState({
                    noPayPassword2:false
                });
            }
        }
        //郵箱
        if(which =="noEmail" && this.props.registerSetting.Email.IsRequire){
            if(val=="" ){
                this.setState({
                    noEmail:true
                })
            }else{
                this.setState({
                    noEmail:false
                });
            }
        }
        //手机
        if(which == "noPhone" &&this.props.registerSetting.Phone.IsRequire){
            if(val=="" ||val.replaceAll(' ','').length>11 || val.replaceAll(' ','').length<11){
                this.setState({
                    noPhone:true
                })
            }else{
                this.setState({
                    noPhone:false
                });
            }
        }
        //QQ
        if(which =="noQQ" && this.props.registerSetting.QQ.IsRequire){
            if(val ==""){
                this.setState({
                    noQQ:true
                })
            }else{
                this.setState({
                    noQQ:false
                });
            }
        }
        //生日
        if(which=="noBirthday"&& this.props.registerSetting.Birthday.IsVisible){
            if(val==""){
                this.setState({
                    noBirthday:true,
                    birthday:val.format("yyyy-MM-dd")
                })
            }else{
                this.setState({
                    noBirthday:false,
                    birthday:val.format("yyyy-MM-dd")
                });
            }
        }
    }
    changeAgentBanks(val,e){
        let index=val[0];
        this.setState({
            defaultagentBanks:[index],
            agentbanksId:PayMethodList[index].Id 
           
        })
    }
    render(){
        console.log(this.props.registerSetting)
        const CustomChildren = ({ extra, onClick, children }) => (
            <InputItem
                placeholder={extra}
                value={this.state.birthday}
                error={this.state.noBirthday}
                onClick={e=>{e.preventDefault();onClick()}}
                onErrorClick={this.errorInfos.bind(this,'noBirthday')}
                readOnly
            >    
                <i className="icon icon-calendar" />
                {children}
            </InputItem>
        );
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push('/myPage')}
                    rightContent={<div className="goHome" onClick={()=>window.wapHistoryType.push('/')}><i className="icon icon-home"></i></div>}
                >代理注册</NavBar>
                <div className="agentRegister scroll-content"> 
                    <form onSubmit={this.onRegister.bind(this)}>
                        <List>
                            {/*用户名*/}
                            <InputItem
                                placeholder="用户名（必填，长度6到12位）"
                                clear
                                maxLength={12}
                                ref="username"
                                error={this.state.noUsername}
                                onKeyUp={this.errorInfos.bind(this,'noUsername')}
                                //onErrorClick={this.errorInfos.bind(this,'noUsername')}
                                onChange={this.validateInput.bind(this,'noUsername')}             
                            >
                                <i className="icon icon-user" />
                            </InputItem>
                            {/*密码*/}
                            <InputItem
                                placeholder="密码（必填，长度6到12位）"
                                clear
                                maxLength={12}
                                type="password"
                                ref="password"
                                error={this.state.noPassword}
                                onErrorClick={this.errorInfos.bind(this,'noPassword')}
                                onChange={this.validateInput.bind(this,'noPassword')}
                            >
                                <i className="icon icon-lock" />
                            </InputItem>
                            {/*确认密码*/}
                            <InputItem
                                placeholder="确认密码（请再次输入你的密码）"
                                clear
                                maxLength={12}
                                type="password"
                                ref="notMatchPayPassword"
                                error={this.state.notMatchPayPassword}
                                onErrorClick={this.errorInfos.bind(this,'notMatchPayPassword')}
                                onChange={this.validateInput.bind(this,'notMatchPayPassword')}
                            >
                                <i className="icon icon-key" />
                            </InputItem>
                            {/*真实姓名*/}
                            {
                                this.props.registerSetting.TrueName.IsVisible?
                                    <InputItem
                                        placeholder="真实姓名（必填，涉及出款）"
                                        clear
                                        ref="noRealname"
                                        error={this.state.noRealname}
                                        onErrorClick={this.errorInfos.bind(this,'noRealname')}
                                        onChange={this.validateInput.bind(this,'noRealname')}
                                        onBlur = {this.validateInput.bind(this,'noRealname')}
                                    >
                                        <i className="icon icon-user-md" />
                                    </InputItem>
                                    :null
                            }
                            {/*邮箱*/}
                            {
                                this.props.registerSetting.Email.IsVisible ?
                                    <InputItem
                                        placeholder="请输入您的常用邮箱"
                                        clear
                                        ref="noEmail"
                                        type="email"
                                        error={this.state.noEmail}
                                        onErrorClick={this.errorInfos.bind(this,'noEmail')}
                                        onChange={this.validateInput.bind(this,'noEmail')}
                                    >
                                        <i className="icon icon-envelope" />
                                    </InputItem>:null
                            }
                            {/*生日*/}
                            {
                                this.props.registerSetting.Birthday.IsVisible ?
                                    <DatePicker
                                        mode="date"
                                        title="日期选择"
                                        extra="请选择您的生日"
                                        ref="noBirthday"
                                        value={this.state.birthday?new Date(this.state.birthday):""}
                                        minDate={new Date(1900,1,1)}
                                        maxDate={new Date()}
                                        onOk = {this.validateInput.bind(this,'noBirthday')}
                                    >
                                        <CustomChildren />
                                    </DatePicker>:null
                            }
                            {
                                this.props.registerSetting.QQ.IsVisible ?
                                    <InputItem
                                        placeholder="QQ"
                                        clear
                                        ref="noQQ"
                                        type="Number"
                                        error={this.state.noQQ}
                                        onErrorClick={this.errorInfos.bind(this,'noQQ')}
                                        onChange={this.validateInput.bind(this,'noQQ')}
                                    >
                                        <i className="icon icon-comment-alt" />
                                    </InputItem>:null
                            }
                            {
                                this.props.registerSetting.Phone.IsVisible ?
                                    <InputItem
                                        placeholder="手机号码"
                                        clear
                                        type="Number"
                                        ref="noPhone"
                                        error={this.state.noPhone}
                                        maxLength={11}
                                        onErrorClick={this.errorInfos.bind(this,'noPhone')}
                                        onChange={this.validateInput.bind(this,'noPhone')}
                                    >
                                        <i className="icon icon-mobile-phone" />
                                    </InputItem>:null
                            }
                            <Picker 
                                  data={PayMethodList}
                                  cols={1}
                                  value={this.state.defaultagentBanks}
                                  ref="AgentBaknks"
                                  onOk={(val)=>{this.changeAgentBanks(val)}}
                            >
                            <List.Item arrow="down" className="am-list-content-Bank">
                                <i className="icon icon-credit-card" />
                                出款银行:
                            </List.Item>
                            </Picker>
                                    <InputItem
                                        placeholder="银行账号"
                                        clear
                                        ref="AgentbanksAccount"
                                        type="Number"
                                        error={this.state.AgentbanksAccount}
                                        onErrorClick={this.errorInfos.bind(this,'AgentbanksAccount')}
                                        onChange={this.validateInput.bind(this,'AgentbanksAccount')}
                                    >
                                        <i className="icon icon-credit-card" />
                                    </InputItem>
                               {/*密码*/}
                               <InputItem
                                placeholder="取款密码"
                                clear
                                maxLength={12}
                                type="password"
                                ref="withdrawPassword"
                                error={this.state.withdrawPassword}
                                onErrorClick={this.errorInfos.bind(this,'withdrawPassword')}
                                onChange={this.validateInput.bind(this,'withdrawPassword')}        
                            >
                                <i className="icon icon-lock" />
                            </InputItem>
                        </List>
                        <button className="btn registerBtn">提交申请</button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        registerSetting:state.AgentRegisterSetting,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(RegisterPage)