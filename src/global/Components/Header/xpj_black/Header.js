import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';
import { connect } from 'react-redux'
import "./Header.scss";
import {RedAllMsg,serversOpen} from "commonFunc"

class Header extends Component {
    constructor() {
        super();
        this.state = {
            reqLock:false
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
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiBankAccountsAction().fly();
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
    renderLoginForm() {
        return (
            <form id="login-form" className='pt5' onSubmit={this.onLogin.bind(this)}>
                <div className="form-login-input">
                    <input type="text" ref="username" placeholder="用户名"/>
                    <input type="password" ref="password" placeholder="密码"/>
                </div>
                <div className="form-login-button">
                    <button type="submit" className="form-login-btn"></button>
                    <a id="test" onClick={()=>serversOpen(this.props.remoteSysConfs.online_service_link)}>
                    <i className="glyphicon glyphicon-question-sign mr5"></i>
                        忘记密码？
                    </a>
                </div>
                <div className="form-login-reg">
                    <Link to="/register" className="form-reg-btn" title="立即注册">
                        <span>立即</span>
                        <span>注册</span>
                    </Link>
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您" ;
        return (
            <div className="afterLogining" style={{textAlign: "left"}}>
                <span>{userLevel}：<Link to="/member">{user.username}</Link></span>
                <div style={{display:'inline-block'}}>
                    <span style={{paddingLeft:"10px"}}>  总额：{this.props.user.amount} RMB</span>
                    <span><Link to="/deposit" className="item">存款</Link></span>
                    <span><Link to="/withdraw" className="item">取款</Link></span>
                    <span><Link to="/transfer" className="item">额度转换</Link></span>
                </div>
                <span>
                    <Link to="/records_message" className="item" onClick={ ()=>RedAllMsg()}>
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        <span className="ml5" style={{color: "#ff0000"}}>({this.props.sitemsg.unread})</span>
                    </Link>
                </span>
                <span><a className="item" onClick={this.onLogout.bind(this)}>退出</a></span>
                <div className="clear"></div>
            </div>
        );
    }
    render() {
        const NavigationBar = window.r.get("NavigationBar");
        const PopNews = window.r.get("NoticeBar");
        return (
            <header id="topHead">
                <div className="headBg" >
                    <div className="pr mAuto w1200">
                        <div className='clearfix'>                         
                            <div className="logo">
                                <Link to="/">
                                    <span className="innerLogo"></span>
                                </Link>
                            </div>
                            <div className="credit"> </div>
                            <div className="loginForm afterLogin">
                                <div className={this.props.user.token?"timeNumber n-timeNumber":"timeNumber"}>
                                    <a href="/nav.html" target="_blank" className="color-main help">备用网址</a>
                                    <span>|</span>
                                    <a href="/help.html" target="_blank" className="color-main help">帮助中心</a>
                                    <span>|</span>
                                    <a href="/agent.html" target="_blank" className="color-main agent">申请代理</a>
                                    <span>|</span>
                                    <a href="javascript:Util.AddFavorite('新葡京官网');" className="color-highlight fav">
                                        <i className="glyphicon glyphicon-home"></i>收藏本站
                                    </a>
                                    <div className="clear"></div>
                                </div>
                                <div className="right-login">
                                    {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                                </div>
                            </div>
                        </div>
                        <div className="menu-nav" id="headerNav" >            
                            <NavigationBar/>        
                        </div>
                    </div>
                </div>
                <div className="notice">
                    <div className="container">
                        <div className="row">
                            <div className={this.props.user.token?"col-md-3 noticeLeft n-noticeLeft":"col-md-3 noticeLeft"}>
                                <i  className="msg_tip_txt">最新公告</i>
                            </div>
                            <div className="col-md-7 noticeCenter">
                                <PopNews ></PopNews>
                            </div>
                        </div>
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