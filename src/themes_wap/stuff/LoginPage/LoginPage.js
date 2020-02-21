/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                登录页-业务逻辑难度为：★
          
*/

import React, { Component } from 'react';
import {Icon, NavBar,Modal,Toast} from "antd-mobile";
import {Link} from "react-router";
import connect from "react-redux/es/connect/connect";
import "./LoginPage.scss"
import {config} from "globalConfig";
import BScroll from "better-scroll"

class LoginPage extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
        this.state = {
            autoLogin:false,
            isAndroid: false,
            isFocused: false,
            needCheck:"" // 用于导量用户修改密码
        }
    }
    // 关闭修改页
    closeWindow(){
        this.setState({
            needCheck:""
        })
    }
    componentDidMount(){
        let user = localStorage.getItem("autoLogin");
        if(user){
            user = JSON.parse(user);
            this.state = {
                autoLogin:true,
            }
            this.refs.username.value = user.admin;
            this.refs.password.value = user.pass;
            this.refs.autoLogin.checked = true;
        }
        //初始化滚动插件
        this.state.scroll = new BScroll(this.refs.wrapper, {
            click:true
        })
        // 判断系统类型
        this.setOs();
        var winHeight = $(window).height(); //浏览器当前高度
        this.state.winresize = $(window).resize(function(){
            var thisHeight = $(this).height();
            if(winHeight - thisHeight > 60){
                //当软键盘弹出在这里操作
                $('.footerBar').css({'display':'none'});
                $('.loginBg').css({'height':'55vh'});

            }else{
                //当软键盘收起,在这里操作
                $('.footerBar').css({'display':'block'});
                $('.loginBg').css({'height':winHeight});
            }
        })
    }
    componentWillUnmount(){
        this.state.winresize.off();
    }
    onLogin(event) {
        event.preventDefault();
        if(!this.submitStateLock) return;
        this.submitStateLock=false;
        if(this.state.autoLogin){
            localStorage.setItem("autoLogin",JSON.stringify({"admin":this.refs.username.value,"pass":this.refs.password.value}))
        }else{
            localStorage.removeItem("autoLogin");
        };
        Toast.hide();
        Toast.loading('登录中,请稍后...');
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            Toast.hide();
            this.submitStateLock=true;
            if (resp.StatusCode === 0) {
                new window.actions.LoginAfterInit();
                window.wapHistoryType.push('/');
            }else if(resp.StatusCode === 10110){
                this.setState({
                    needCheck:{//这个值为空就不需要进行验证
                        userName:this.refs.username.value,
                        cipher:this.refs.password.value
                    }
                })
            }else{
                Modal.alert('登录失败!',resp.Message)
            }
        });
    }
    forgetPassWord(){
        let onlineService = this.props.remoteSysConfs.online_service_link;
        Modal.alert('忘记密码?','联系在线客服协助修改密码?',[
            {text:'关闭'},
            {
                text:'联系客服',
                onPress:()=>{
                    if(config.isApp){
                        window.Util.appOpen(onlineService)
                    }else{
                        window.open(onlineService,'_blank');
                    }
                }
            }
        ])
    }
    callService(){
        let onlineService = this.props.remoteSysConfs.online_service_link;
        if(config.isApp){
            window.Util.appOpen(onlineService)
        }else{
            window.open(onlineService,'_blank');
        }
    }
    // 记住密码
    remberLogin(){
        this.setState({
            autoLogin:this.refs.autoLogin.checked
        })
    }
    // 登陆框是否聚焦
    isLoginFocus = (bool) => {
        this.setState({
            isFocused: bool
        })
    }
    // 判断系统类型
    setOs = () => {
        let u =window.navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        this.setState({
            isAndroid: isAndroid ? true : false
        })
    }
    // 判断样式
    renderLogoCss(isAndroid, isLoginFocus) {
        if(isAndroid&&isLoginFocus) {
            return 'login-logo login-logo-android'
        }else {
            return 'login-logo'
        }
    }
    render(){
        const {SiteMainUrl} = this.props.backConfigs;
        const {imagesConfig} = this.props;
        const PassWordAlert = window.r.get('PassWordAlert')
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    rightContent={<div className="goHome" onClick={()=>window.wapHistoryType.push('/')}><i className="icon icon-home"></i></div>}
                    onLeftClick={this.props.router.goBack}
                >用户登录</NavBar>
                <div className="loginPage wrapper" ref="wrapper">
                    {
                        this.state.needCheck && 
                        <PassWordAlert needCheck={this.state.needCheck} closeWindow={this.closeWindow.bind(this)}></PassWordAlert>
                    }
                    <div className="content">
                        <div className={this.renderLogoCss(this.state.isAndroid, this.state.isFocused)}>
                            <img src={config.devImgUrl + imagesConfig.Avatar} className='user_avatar' alt='用户头像' />
                            <span className='promo_code'>易记域名: {SiteMainUrl}</span>
                        </div>
                        <form onSubmit={this.onLogin.bind(this)} className="user_form">
                            <div className="inputItem">
                                <i className="icon icon-user"></i>
                                <input onFocus={()=>{this.isLoginFocus(true)}} onBlur={()=>{this.isLoginFocus(false)}} type="text" ref="username" placeholder="用户名" />
                            </div>
                            <div className="inputItem">
                                <i className="icon icon-lock"></i>
                                <input onFocus={()=>{this.isLoginFocus(true)}} onBlur={()=>{this.isLoginFocus(false)}} type="password" ref="password" placeholder="密码" />
                            </div>
                            <div className='rem_pwd'>
                                <input type="checkbox" id="autoLogin" ref="autoLogin" onClick={this.remberLogin.bind(this)}/>
                                <label htmlFor="autoLogin" className="remberlogin" onClick={this.remberLogin.bind(this)}>记住密码</label>
                            </div>
                            <button className="loginBtn">登录</button>
                        </form>
                        <div className="loginBt">
                            <a onClick={this.forgetPassWord.bind(this)}>忘记密码?</a>
                            <Link to="/register">免费开户</Link>
                            <a onClick={this.callService.bind(this)}>联系客服</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs,
        backConfigs: state.backConfigs,
        imagesConfig: state.imagesConfig,
    }
);

export default connect(mapStateToProps)(LoginPage)