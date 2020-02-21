
import React, { Component } from 'react';
import {Link,browserHistory } from 'react-router';
import {connect} from 'react-redux'
import "./Header.scss";
import {RedAllMsg,serversOpen} from "commonFunc"

class Header extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            showBlock: false,
            person:parseInt(Math.random()*3000),
            reqLock:false,
        };
    }
    onLogin(event) {
        event.preventDefault();
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiGamePlatformAllBalanceAction().fly()// 所有平台余额
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiBankAccountsAction().fly();//获取会员绑定的银行卡
            }
            _self.state.reqLock = false;
        });
    }
    onLogout() {
        new window.actions.LogoutAction().fly(()=>{
            browserHistory.push("/");
        });
    }
    componentDidMount(){
        window.setInterval(()=>{
            let d = new Date();
            let dt = d.getTime();  
            dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000         
            this.refs.setClock.innerHTML = new Date(dt).format("yyyy/MM/dd hh:mm:ss")
        }, 1000);
    }
    renderLoginForm() {
        return (
            <form id="login-form" onSubmit={this.onLogin.bind(this)}>
                <div className="form-login-input">
                    <input type="text" ref="username" className="account-input" placeholder="用户名"/>
                    <input type="password" ref="password" className="pwd-input" placeholder="密码"/>
                </div>
                <div className="form-login-button">
                    <button type="submit" className="form-login-btn"></button>
                    <a id="test" onClick={()=>{serversOpen(this.props.remoteSysConfs.online_service_link)}} className="forget">
                    <i className="glyphicon glyphicon-question-sign mr5"></i>
                        忘记密码？
                    </a>
                </div>
                <div className="form-login-reg">
                    <Link to="/register" className="form-reg-btn" title="免费注册"></Link>
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您" ;
        return (
            <div className="afterLogin">
                <span className="memberItem">{userLevel}:<Link to="/member">{user.username}</Link></span>
                <div className='i-block'>
                    <span className="memberItem" style={{paddingLeft:"2px"}}>  总额：{this.props.user.amount} RMB</span>
                    <span className="memberItem"><Link to="/deposit" className="item">存款</Link></span>
                    <span className="memberItem"><Link to="/withdraw" className="item">取款</Link></span>
                    <span className="memberItem"><Link to="/transfer" className="item">额度转换</Link></span>
                </div>
                <span className="memberItem">
                    <Link to="/records_message" className="item" onClick={()=>{RedAllMsg()}}>
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        <span className="ml5" style={{color: "#ff0000"}}>({this.props.sitemsg.unread})</span>
                    </Link>
                </span>
                <span className="memberItem"><a className="item" onClick={this.onLogout.bind(this)}>退出</a></span>
                <div className="clear"></div>
            </div>
        );
    }
    render() {
        const NavigationBar = window.r.get("NavigationBar");
        const config = window.config;
        const PopNews = window.r.get("NoticeBar");
        return (
            <header id="topHead">
                {/*大转盘*/}
                <Link to="/LootoPage" activeClassName="active" className="lucky_wheel"/>
                <div className="headBg" >
                    <div className="container">
                        <div className="headFname row">
                            <div className="logo">
                                <Link to="/">
                                    <span className="innerLogo"></span>
                                </Link>
                            </div>
                            <div className="credit"> </div>
                            <div className="loginForm afterLogin">
                                <div className={this.props.user.token?"timeNumber n-timeNumber":"timeNumber"}>
                                    <span className="time_box">
                                        <i className="glyphicon glyphicon-time"></i>美东时间：
                                        <b id="clock"  ref="setClock"></b>
                                    </span>
                                    <span className="online_user"><i className="fa fa-male" ></i>在线人数：{20000+this.state.person}人</span>
                                    <a href="javascript:Util.AddFavorite('新葡京官网');" className="color-highlight fav">
                                        <i className="glyphicon glyphicon-home"></i>收藏本站
                                    </a>
                                    <span className={this.props.user.token?"personal":"personalHide"}>
                                        <Link to="/member"><i className="glyphicon glyphicon-user" aria-hidden="true"></i>个人中心</Link>
                                    </span>
                                    <div className="clear"></div>
                                </div>
                                <div className="right-login">
                                    {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="menu-nav" id="headerNav">                 
                        <NavigationBar/>             
                    </div>
                </div>
                <div className="notice">
                    <div className="container">
                        <div className="row">
                            <div className={this.props.user.token?"col-md-3 noticeLeft n-noticeLeft":"col-md-3 noticeLeft"}>
                                <a href="/help.html" target="_blank" className="color-main help">帮助中心</a>
                                <span>|</span>
                                <a href="/agent.html" target="_blank" className="color-main agent">申请代理</a>
                                <span>|</span>
                                <a href={config.agentLoginUrl} target="blank">代理登陆</a>                           
                            </div>
                        </div>
                    </div>
                </div>
                <div className="NoticeStyle">
                    <div className="col-md-10 noticeCenter">
                        <PopNews></PopNews>
                    </div>
                    <div className="col-md-1 noticeRight">
                        <a className="top_livechat" onClick={()=>{serversOpen(this.props.remoteSysConfs.online_service_link)}}></a>
                    </div>                   
                </div>
                <div className="clear"></div>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        remoteSysConfs:state.remoteSysConfs,
    }
);
export default connect(mapStateToProps)(Header)