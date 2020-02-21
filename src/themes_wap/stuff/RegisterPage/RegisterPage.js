/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                注册页-业务逻辑难度为：★★★★
          
*/

import React, {Component} from 'react';
import {Icon, List, InputItem, NavBar, Modal, Toast, Checkbox, DatePicker} from "antd-mobile";
import {Link} from "react-router";
import connect from "react-redux/es/connect/connect";
import * as cache from "CacheHelper";
import {config} from 'globalConfig';
import {NumIconPicker} from 'pui';
import "./RegisterPage.scss"

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.trueNameReg = /[A-Za-z\u4e00-\u9fa5]+$/;; //判断是中文和英文
        this.state = {
            noUsername: false,
            noTrueName: false,
            star:'',
            noPassword: false,
            noPassword2: false,
            noBirthday: false,
            noEmail: false,
            noAuthCode: false,
            noWithdrawalPassword: false,
            noWithdrawalPassword2: false,
            noPhone: false,
            noWechat: false,
            noQQ: false,
            birthday: "",
            checkPay: false,
            agreeRules:true,
            VerifyCode: "",
            required: {},   //必填集合
            commitVal: {},  //提交注册的参数
            getLock:false,  //验证码锁
            WithdrawalPassword: ['0','0','0','0'],
            WithdrawalPassword2: ['0','0','0','0'],
        };
        this.star='';
    }
    componentWillMount() {
        Toast.info('数据加载中,请稍后');
        new window.actions.ApiGetRegistrySettingAction().fly(resp => {
            Toast.hide();
        });
        let isAutoLogin = location.search;
        if (isAutoLogin.indexOf('channel') > 0) {
            cache.setSession('channel', isAutoLogin.split('=')[1]);
        }
    }
    componentDidMount(){
        let storeChannel = "";
        if (window.sessionStorage) {
            storeChannel = sessionStorage.getItem("channel");
        }
        const channel = storeChannel || window.channel || "";
        if (!!channel) {
            this.setState({
                commitVal:Object.assign(this.state.commitVal,{"ExtendCode":channel})
            })
        }
    }
    // 注册
    onRegister(e) {
        e.preventDefault();
        let notPass = false;

        if(!this.state.agreeRules){
            Toast.info('请勾选本站隐私条款');
            return;
        }

        for (let require in this.state.required) {
            if (!this.state.commitVal[require]) {
                this.setState({
                    ["no" + require]: true
                });
                notPass = true;
            }
        }

        if (notPass) {
            Toast.info('请您填写完整信息');
            return;
        }

        if (this.state.required.Password2) {//二次输入密码
            if (this.state.commitVal.Password !== this.state.commitVal.Password2) {
                Toast.info('密码不相符');
                notPass = true;
                return;
            }
        }
        if (this.state.required.WithdrawalPassword2) {//提款二次输入密码
            if (this.state.commitVal.WithdrawalPassword !== this.state.commitVal.WithdrawalPassword2) {
                Toast.info('取款密码不相符');
                notPass = true;
                return;
            }
        }
        if (this.state.required.TrueName) {//真实姓名
            const reg = /[A-Za-z\u4e00-\u9fa5]+$/;;
            if (!reg.test(this.state.commitVal.TrueName)) {
                Toast.info('请您填写中文姓名或英文名');
                notPass = true;
                return;
            }
        }
        if (this.state.required.Phone) { //如果需要输入手机号,则进行验证
            if (!(/^1[3-9][0-9]\d{8}$/.test(this.state.commitVal.Phone))) {
                this.setState({
                    noPhone: true
                });
                return;
            }
        }
        if (notPass) return;
        Toast.loading('注册中,请稍后...');
        new window.actions.ApiSignUpAction(this.state.commitVal).fly((respond) => {
            Toast.hide();
            if (respond.StatusCode === 0) {
                new window.actions.LoginAfterInit();
                window.wapHistoryType.push("/money/deposit");
            } else {
                if(respond.StatusCode === 512){//验证码过期
                    this.getAuthCode(true);
                }
                Modal.alert("注册失败！", respond.Message);
            }
        });

    }
    chexboxChange(key) {
        this.setState({
            commitVal: Object.assign(this.state.commitVal, {
                [key]: !this.state.commitVal[key]
            })
        });
    }
    // 同意注册条款勾选
    checkReg(e){
        this.setState({
            agreeRules:e.target.checked
        });
    }
    errorInfos = (which) => {
        //用户名
        const inputVal = this.refs.username.state.value;
        const wechatVal = this.props.registerSetting.WechatIsVisible && this.refs.noWechat.state.value;
        const reg = /[A-Za-z\u4e00-\u9fa5]/g; //判断是中文

        if (which == "noUsername" && this.state.noUsername) {
            if (inputVal == "") {
                Toast.info('用户名不能为空');
            } else {
                if (reg.test(inputVal)) {
                    Toast.info('用户名不能是中文,只能是数字或字母！');
                    this.refs.username.state.value = '';
                } else {
                    if (inputVal.length < 6) {
                        Toast.info('用户名不能少于6位！');
                    }
                }
            }
        }
        //真实姓名
        if (this.state.noTrueName && which == "noTrueName") {
            Toast.info('请填写您真实中文姓名或英文名！');
        }
        //密码
        if (this.state.noPassword && which == "noPassword") {
            if (this.refs.password.state.value == "") {
                Toast.info('请填写登陆密码！');
            } else {
                Toast.info('登陆密码长度必须为6-12位！')
            }
        }
        //确认密码
        if (this.state.noPassword2 && which == "noPassword2") {
            Toast.info('确认密码与密码不相符！');
        }
        // 取款密码
        // if (this.state.noWithdrawalPassword && which == "noWithdrawalPassword") {
        //     if (this.refs.noWithdrawalPassword.state.value == "") {
        //         Toast.info('请填写取款密码！');
        //     } else if (this.refs.noWithdrawalPassword.state.value === this.refs.password.state.value) {
        //         Toast.info('取款密码和登录密码不能相同！')
        //     } else {
        //         Toast.info('取款密码长度必须为6-12位！')
        //     }
        // }
        // 确认取款密码
        // if (this.state.noWithdrawalPassword2 && which == "noWithdrawalPassword2") {
        //     Toast.info('确认取款密码与取款密码不相符！');
        // }

        //取款密码-new
        if(this.state.noWithdrawalPassword  && which == "noWithdrawalPassword"){
            if(this.state.WithdrawalPassword == ""){
                Toast.info('请填写取款密码！');
            }else if(this.state.WithdrawalPassword === this.refs.password.state.value){ //不可能相同, 取款密码4位, 登录密码至少6位
                Toast.info('取款密码和登录密码不能相同！')
            }
        }
        //确认取款密码-new
        if(this.state.noPayPassword2 && which =="noPayPassword2"){
            Toast.info('确认取款密码与取款密码不相符！');
        }
        //郵箱
        if (this.state.noEmail && which == "noEmail") {
            Toast.info('请填写您的邮箱！');
        }
        //生日
        if (this.state.noBirthday && which == "noBirthday") {
            Toast.info('您的生日不能为空！');
        }
        //手机
        if (this.state.noPhone && which == "noPhone") {
            if (this.refs.noPhone.state.value == "") {
                Toast.info('请填写您的手机号码！');
            } else if (this.refs.noPhone.state.value !== /^1[3-9][0-9]\d{8}$/) {
                Toast.info('手机号码格式错误！')
            } else {
                Toast.info('手机号码长度错误！')
            }
        }
        //微信
        if (this.state.noWechat && which == "noWechat") {
            if (wechatVal == "") {
                Toast.info('您的微信号码不能为空！');
            } else {
                if (!reg.test(wechatVal)) {
                    Toast.info('微信账号不能是中文,只能是数字或字母！')
                }
            }

        }
        //QQ
        if (this.state.noQQ && which == "noQQ") {
            Toast.info('您的QQ号码不能为空！')
        }
    }
    // 输入框Onchange事件，改变状态。
    validateInput(which, key, val) {
        if(which === "noWithdrawalPassword"){

            this.setState({
                commitVal: Object.assign(this.state.commitVal, {[key]: this.state.WithdrawalPassword.join('')})
            });
        }else if(which === "noWithdrawalPassword2"){
            this.setState({
                commitVal: Object.assign(this.state.commitVal, {[key]: this.state.WithdrawalPassword2.join('')})
            });
        }else {
            this.setState({
                commitVal: Object.assign(this.state.commitVal, {[key]: val})
            });
        }
        const reg = /^[0-9a-zA-Z]+$/;
        //用户名
        if (which == "noUsername") {
            if (val == "" || val.length < 6) {
                this.setState({noUsername: true})
            } else {
                this.setState({noUsername: false})
            }
        }
        //真实姓名
        if (which == "noTrueName") {
            if (val == "" || !this.trueNameReg.test(val)) {
                this.setState({noTrueName: true})
            } else {
                this.setState({noTrueName: false});
            }
        }
        //登陆密码
        if (which == "noPassword") {
            if (val == "" || 6 > val.length) {
                this.setState({
                    noPassword: true
                })
            } else {
                this.setState({
                    noPassword: false
                });
            }
        }
        //确认密码
        if (which == "noPassword2") {
            if (val == "" || this.state.commitVal.Password !== val) {
                this.setState({noPassword2: true})
            } else {
                this.setState({noPassword2: false});
            }
        }
        //取款密码
        if (which == "noWithdrawalPassword") {
            if (val == "") {
                this.setState({noWithdrawalPassword: true})
            } else {
                this.setState({noWithdrawalPassword: false});
            }
        }
        //确认取款密码
        if (which == "noWithdrawalPassword2") {
            if (this.state.WithdrawalPassword.join('') !== this.state.WithdrawalPassword2.join('')) {
                this.setState({noWithdrawalPassword2: true})
            } else {
                this.setState({noWithdrawalPassword2: false});
            }
        }
        //郵箱
        if (which == "noEmail") {
            if (val == "") {
                this.setState({noEmail: true})
            } else {
                this.setState({noEmail: false});
            }
        }
        //手机
        if (which == "noPhone") {
            if (val == "" || val.replaceAll(' ', '').length > 11 || val.replaceAll(' ', '').length < 11 ) {
                this.setState({
                    noPhone: true
                })
            } else {
                this.setState({
                    noPhone: false
                });
            }
        }
        //微信
        if (which == "noWechat") {
            if (val == "" || !reg.test(val)) {
                this.setState({noWechat: true})
            } else {
                this.setState({noWechat: false});
            }
        }
        //QQ
        if (which == "noQQ") {
            if (val == "") {
                this.setState({noQQ: true})
            } else {
                this.setState({noQQ: false});
            }
        }
        //生日
        if (which == "noBirthday") {
            if (val == "") {
                this.setState({
                    noBirthday: true,
                    birthday: val.format("yyyy-MM-dd")
                })
            } else {
                this.setState({
                    noBirthday: false,
                    birthday: val.format("yyyy-MM-dd")
                });
            }
        }
        //验证码
        if (which == "noAuthCode") {
            if (val == "") {
                this.setState({noAuthCode: true})
            } else {
                this.setState({noAuthCode: false})
            }
        }
    }
    // 检测用户名是否重复
    checkUserName(which, val) {
        let _this = this;
        if (val == "" || 6 > val.length) {
            return;
        }
        new window.actions.ApiCheckUserNameAction(val).fly(resp => {
            if (resp.StatusCode == 0) {
                if (resp.Registered) {
                    Toast.info('您填写的账号已经被注册,请您更换一个！');
                    _this.setState({
                        noUsername: true
                    })
                }
            }
        });
    }
    // 注册表单
    registryList() {
        let setting = this.props.register.Fields ? this.props.register.Fields : [];
        let regList = [];
        for (let i = 0; i < setting.length; i++) {
            this.star='';
            switch (setting[i].Field) {
                case "UserName":
                    if (setting[i].Required){
                        this.state.required.UserName = true;
                        this.star='*'
                    }
                    regList.push(
                        <InputItem
                            key={setting[i].Field}
                            placeholder="6-12位由字母和数字组成"
                            clear
                            maxLength={12}
                            ref="username"
                            error={this.state.noUsername}
                            onKeyUp={this.errorInfos.bind(this, 'noUsername')}
                            onErrorClick={this.errorInfos.bind(this, 'noUsername')}
                            onChange={this.validateInput.bind(this, 'noUsername', 'UserName')}
                            onBlur={this.checkUserName.bind(this, 'noUsername')}
                        >
                            <i className="icon icon-user"></i>
                            <span className='star'>用户名{this.star}</span>
                        </InputItem>
                    );
                    continue;
                case "Password":
                    if (setting[i].Required){
                        this.state.required.Password = true;
                        this.star='*';
                    }
                    regList.push(
                        <InputItem
                            key={setting[i].Field}
                            placeholder="6-12位由字母和数字组成"
                            clear
                            maxLength={12}
                            type="password"
                            ref="password"
                            error={this.state.noPassword}
                            onErrorClick={this.errorInfos.bind(this, 'noPassword')}
                            onChange={this.validateInput.bind(this, 'noPassword', 'Password')}
                        >
                            <i className="icon icon-lock"></i>
                            <span className='star'>密码{this.star}</span>
                        </InputItem>
                    );
                    continue;
                case "Password2":
                    if (setting[i].Required){
                        this.state.required.Password2 = true;
                        this.star='*';
                    }
                    regList.push(
                        <InputItem
                            key={setting[i].Field}
                            placeholder="6-12位由字母和数字组成"
                            clear
                            maxLength={12}
                            type="password"
                            ref="noPassword2"
                            error={this.state.noPassword2}
                            onErrorClick={this.errorInfos.bind(this, 'noPassword2')}
                            onChange={this.validateInput.bind(this, 'noPassword2', 'Password2')}
                        >
                            <i className="icon icon-key"></i>
                            <span className='star'>确认密码{this.star}</span>
                        </InputItem>
                    );
                    continue;
                case "TrueName":
                    if (setting[i].Required){
                        this.state.required.TrueName = true;
                        this.star='*';
                    }
                    regList.push(
                        <InputItem
                            key={setting[i].Field}
                            placeholder="与您的银行账户名相同,否则不能出款"
                            clear
                            ref="noTrueName"
                            error={this.state.noTrueName}
                            onErrorClick={this.errorInfos.bind(this, 'noTrueName')}
                            onChange={this.validateInput.bind(this, 'noTrueName', "TrueName")}
                            onBlur={this.validateInput.bind(this, 'noTrueName', "TrueName")}
                        >
                            <i className="icon icon-user-md"></i>
                            <span className='star'>真实姓名{this.star}</span>
                        </InputItem>
                    );
                    continue;
                case "Phone":
                    if (setting[i].Required){
                        this.state.required.Phone = true;
                        this.star='*';
                    }
                    regList.push(
                        <InputItem
                            key={setting[i].Field}
                            // placeholder="请输入您的常用手机"
                            placeholder={config.spec.includes("j98") ? "填写真实手机号码，接收优惠服务" : '请输入您的常用手机'}
                            clear
                            type="tel"
                            ref="noPhone"
                            maxLength={11}
                            error={this.state.noPhone}
                            onErrorClick={this.errorInfos.bind(this, 'noPhone')}
                            onChange={this.validateInput.bind(this, 'noPhone', 'Phone')}
                        >
                            <i className="icon icon-mobile-phone"></i>
                            <span className='star'>手机号码{this.star}</span>
                        </InputItem>
                    );
                    continue;
                case "Email":
                    if (setting[i].Required){
                        this.state.required.Email = true;
                        this.star='*';
                    }
                    regList.push(
                        <InputItem
                            key={setting[i].Field}
                            placeholder="请输入您的常用邮箱"
                            clear
                            ref="noEmail"
                            type="email"
                            error={this.state.noEmail}
                            onErrorClick={this.errorInfos.bind(this, 'noEmail')}
                            onChange={this.validateInput.bind(this, 'noEmail', 'Email')}
                        >
                            <i className="icon icon-envelope"></i>
                            <span className='star'>电子邮件{this.star}</span>
                        </InputItem>
                    );
                    continue;
                case "Birthday":
                    if (setting[i].Required){
                        this.state.required.Birthday = true;
                        this.star='*';
                        this.setState.star='*'
                    }
                    const CustomChildren = ({extra, onClick, children}) => (
                        <InputItem
                            placeholder={extra}
                            value={this.state.birthday}
                            error={this.state.noBirthday}
                            onClick={onClick}
                            onErrorClick={this.errorInfos.bind(this, 'noBirthday')}
                        >
                            <i className="icon icon-calendar"></i>
                            <span className='star'>生日{this.setState.star}</span>
                            {children}
                        </InputItem>
                    );
                    regList.push(
                        <DatePicker
                            key={setting[i].Field}
                            mode="date"
                            title="日期选择"
                            extra="请填写您的生日"
                            ref="noBirthday"
                            value={this.state.birthday ? new Date(this.state.birthday) : ""}
                            minDate={new Date(1900, 1, 1)}
                            maxDate={new Date()}
                            onOk={this.validateInput.bind(this, 'noBirthday', 'Birthday')}
                        >
                            <CustomChildren/>
                        </DatePicker>
                    );
                    continue;
                case "QQ":
                    if (setting[i].Required){
                        this.state.required.QQ = true;
                        this.star='*'
                    }
                    regList.push(
                        <InputItem
                            key={setting[i].Field}
                            placeholder="请输入您的QQ"
                            clear
                            ref="noQQ"
                            type="Number"
                            error={this.state.noQQ}
                            onErrorClick={this.errorInfos.bind(this, 'noQQ')}
                            onChange={this.validateInput.bind(this, 'noQQ', 'QQ')}
                        >
                            <i className="icon icon-linux"></i>
                            <span className='star'>QQ号{this.star}</span>
                        </InputItem>
                    );
                    continue;
                case "Wechat":
                    if (setting[i].Required){
                        this.state.required.Wechat = true;
                        this.star='*'
                    }
                    regList.push(
                        <InputItem
                            key={setting[i].Field}
                            placeholder="请输入您的微信"
                            clear
                            ref="noWechat"
                            error={this.state.noWechat}
                            onErrorClick={this.errorInfos.bind(this, 'noWechat')}
                            onChange={this.validateInput.bind(this, 'noWechat', 'Wechat')}
                        >
                            <i className="icon icon-comments"></i>
                            <span className='star'>微信号{this.star}</span>
                        </InputItem>
                    );
                    continue;
                case "WithdrawalPassword":
                    if (setting[i].Required){
                        this.state.required.WithdrawalPassword = true;
                        this.star='*'
                    }
                    if(!this.state.commitVal.WithdrawalPassword)this.state.commitVal.WithdrawalPassword = "0000";
                    regList.push(
                        <div key={setting[i].Field} className='set_withdraw_pwd'>
                            <NumIconPicker
                                value={this.state.WithdrawalPassword}
                                onOk={v=>{
                                    this.state.WithdrawalPassword=v;
                                    this.validateInput('noWithdrawalPassword','WithdrawalPassword');
                                }}
                                error={this.state.noWithdrawalPassword}
                                onErrorClick={this.errorInfos.bind(this,'noWithdrawalPassword')}
                                tipText={'取款密码'+this.star}
                                iconClassName='icon icon-key'
                            />
                        </div>
                    );
                    continue;
                case "WithdrawalPassword2":
                    if (setting[i].Required){
                        this.state.required.WithdrawalPassword2 = true;
                        this.star='*';
                    }
                    if(!this.state.commitVal.WithdrawalPassword2)this.state.commitVal.WithdrawalPassword2 = "0000";
                    regList.push(
                        <div key={setting[i].Field} className='set_withdraw_pwd'>
                            <NumIconPicker
                                value={this.state.WithdrawalPassword2}
                                onOk={v=>{
                                    this.state.WithdrawalPassword2=v;
                                    this.validateInput('noWithdrawalPassword2','WithdrawalPassword2');
                                }}
                                error={this.state.noWithdrawalPassword2}
                                onErrorClick={this.errorInfos.bind(this,'noWithdrawalPassword2')}
                                tipText={'确认密码'+this.star}
                                iconClassName='icon icon-key'
                            />
                        </div>
                    );
                    continue;
                case "ExtendCode":
                    if (setting[i].Required){
                        this.state.required.ExtendCode = true;
                        this.star='*'
                    }
                    // let disabled = cache.getSession('channel')?"disabled":"";
                    let disabled = sessionStorage.getItem('channel')?"disabled":"";
                    regList.push(
                        <InputItem
                            key={setting[i].Field}
                            defaultValue={this.state.commitVal.ExtendCode}
                            placeholder="推广码（ 可以不填写 ）"
                            disabled={disabled}
                            type="text"
                            ref="extendCode"
                            onChange={this.validateInput.bind(this, 'extendCode', 'ExtendCode')}
                        >
                            <i className="icon icon-tags"></i>
                            <span className='star'>推广码{this.star}</span>
                        </InputItem>
                    );
                    continue;
                case "IsReceiveEmail":
                    if (this.state.commitVal.IsReceiveEmail == undefined) this.state.commitVal.IsReceiveEmail = true;
                    regList.push(
                        <List.Item key={setting[i].Field} className="checkPay">
                            <Checkbox.CheckboxItem defaultChecked onChange={this.chexboxChange.bind(this, 'IsReceiveEmail')}>
                                是的，我想收到{config.appName}的邮件消息
                            </Checkbox.CheckboxItem>
                        </List.Item>
                    );
                    continue;
                case "IsReceiveSMS":
                    if (this.state.commitVal.IsReceiveSMS == undefined) this.state.commitVal.IsReceiveSMS = true;
                    regList.push(
                        <List.Item key={setting[i].Field} className="checkPay">
                            <Checkbox.CheckboxItem defaultChecked onChange={this.chexboxChange.bind(this, 'IsReceiveSMS')}>
                                是的，我想收到{config.appName}的短信消息
                            </Checkbox.CheckboxItem>
                        </List.Item>
                    );
                    continue;
                case "AuthCode": // 验证码
                    if (setting[i].Required){
                        this.state.required.AuthCode = true;
                    }
                    this.getAuthCode();
                    this.state.getLock = true;
                    regList.push(
                        <InputItem
                            key={setting[i].Field}
                            placeholder="请输入验证码"
                            clear
                            className="verifyCode"
                            type="text"
                            maxLength={4}
                            ref="noAuthCode"
                            error={this.state.noAuthCode}
                            onErrorClick={this.errorInfos.bind(this, 'noAuthCode')}
                            onChange={this.validateInput.bind(this, 'noAuthCode', 'AuthCode')}
                        >
                            <img onClick={this.getAuthCode.bind(this,true)} src={this.state.AuthCode} alt="验证码"/>
                        </InputItem>
                    );
            }
        }
        return regList;
    }
    //获取验证码
    getAuthCode(refreshCode=false){
        if(this.state.getLock && !refreshCode)return;
        new window.actions.ApiAuthCodeAction().fly(resp=>{
            if(resp.StatusCode === 0){
                this.setState({
                    AuthCode:resp.AuthImg,
                    commitVal:Object.assign(this.state.commitVal,{
                        AuthToken:resp.AuthToken
                    })
                })
            }
        })
    }
    render() {
        return (
            <div className="pageContainer">
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    leftContent={'返回'}
                    onLeftClick={window.wapHistoryType.goBack}
                    rightContent={<div className="goHome" onClick={() => window.wapHistoryType.push('/')}><i className="icon icon-home"></i></div>}
                >注册账号</NavBar>
                <div className="scroll-content register">
                    <form onSubmit={this.onRegister.bind(this)}>
                        <List>
                            {this.registryList()}
                            <List.Item className="checkPay">
                                <Checkbox.CheckboxItem
                                    onChange={this.checkReg.bind(this)}
                                    checked={this.state.agreeRules}
                                >
                                    我已届满合法博彩年龄,且同意各项开户条约
                                </Checkbox.CheckboxItem>
                                <List.Item>
                                    <div className='show_rules'>
                                        注册即表示您已经阅读并同意本公司规则与条款
                                    </div>
                                </List.Item>
                            </List.Item>
                        </List>
                        <button className="btn registerBtn">注 册</button>
                    </form>
                    <div className="loginBt">
                        <Link to="/login">已有账号? 登陆</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        registerSetting: state.registerSetting,
        remoteSysConfs: state.remoteSysConfs,
        register: state.getRegisterSetting
    }
);

export default connect(mapStateToProps)(RegisterPage)