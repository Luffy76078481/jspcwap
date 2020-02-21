
import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';
import { connect } from 'react-redux'
import "./Header.scss";
import {RedAllMsg,serversOpen} from 'commonFunc'
class Header extends Component {
    constructor() {
        super();
        this.state = {
            person:parseInt(Math.random()*3000),
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
    componentDidMount(){
        window.setInterval(()=>{
            let d = new Date();
            let dt = d.getTime();   
            dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000           
            this.refs.setClock.innerHTML = new Date(dt).format("yyyy/MM/dd hh:mm:ss")
        }, 1000);

    }
    renderLoginForm() {
        const online_service_link = this.props.remoteSysConfs.online_service_link
        return (
            <form id="login-form" className='clearfix' onSubmit={this.onLogin.bind(this)}>
                <div className="form-login-reg">
                    <Link to="/register" className="form-reg-btn" title="免费注册"></Link>
                </div>
                <div className="form-login-input">
                    <input type="text" ref="username"  id="demotestid2" className="account-input input-type border-type" placeholder="用户名"/>
                    <input type="password" ref="password" className="pwd-input input-type border-type" placeholder="密码"/>
                </div>
                <div className="form-login-button">
                    <button type="submit" className="form-login-btn">登录</button>
                    <a id="test" onClick={()=>serversOpen(online_service_link)} className="demotest forget">忘记密码</a>
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您" ;

        return (
            <div className="mt10 userInfo">
                    <span className="memberItem">{userLevel}：<Link to="/member">{user.username}</Link></span>
                <div style={{display:'inline-block'}}>
                    <span className="memberItem" style={{paddingLeft:"2px"}}>  总额：{this.props.user.amount} RMB</span>
                    <span className="memberItem"><Link to="/deposit" className="item agent">充值</Link></span>
                    <span className="memberItem"><Link to="/withdraw" className="item ">取款</Link></span>
                    <span className="memberItem"><Link to="/transfer" className="item ">额度转换</Link></span>
                </div>
                <span className="memberItem" onClick={()=>RedAllMsg()}>
                    <Link to="/records_message" className="item member-msg">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        <span className="huang ml5" style={{color: "red",padding:"0"}}>({this.props.sitemsg.unread})</span>
                    </Link>
                </span>
                <span className="memberItem"><a className="item huang bgGray4" onClick={this.onLogout.bind(this)}>退出</a></span>
                <div className="clear"></div>
            </div>
        );
    }

    render() {
        const NavigationBar = window.r.get("NavigationBar");
        const AffixHongbao = window.r.get("AffixHongbao");
        const agent_link = this.props.remoteSysConfs.agent_link || "";
        return (
            <header id="topHead">
                <div className="headBg BGcolor-main" >
                    <div className="mAuto w1200 pr">
                        {
                            this.props.remoteSysConfs.allow_zhuanpan==='1' &&
                            <Link to="/LootoPage" activeClassName="active" className="lucky_wheel"/>
                        }
                        <div className="headFname row">
                            <div className="topLeft">
                                <div className="noticeLeft">
                                    <a href="/help.html" target="_blank" className=" help">帮助中心</a>
                                    <span>|</span>
                                    <a href="/agent.html" target="_blank" className=" agent">代理加盟</a>
                                    <span>|</span>
                                    <a href={agent_link} target="blank">代理登陆</a>
                                    <span>|</span>
                                    <Link to="/promotions">尊享VIP</Link>
                                </div>
                                <div className="timeNumber">
                                    <span className="time_box">
                                        <i className="glyphicon glyphicon-time mr5"></i>
                                        美东时间：
                                        <b id="clock" ref="setClock"></b>
                                    </span>
                                    <span className="online_user">
                                        <i className="fa fa-male" ></i>
                                        在线人数：{20000+this.state.person}人
                                    </span>
                                    {
                                        this.props.user.token?
                                        <span className="personal">
                                            <Link to="/member"><i className="glyphicon glyphicon-user mr5" aria-hidden="true">
                                            </i>个人中心</Link>
                                        </span>    
                                        :
                                        <a href="javascript:Util.AddFavorite('新葡京官网');">
                                            <i className="glyphicon glyphicon-home"></i>收藏本站
                                        </a>
                                    }
                                    <div className="clear"></div>
                                </div>
                            </div>
                            <div className="loginForm afterLogin">
                                {
                                    this.props.user.token? this.renderUserInfo() : this.renderLoginForm()
                                }
                            </div>
                        </div>
                        <div className="menu-nav" id="headerNav" >          
                            <Link to="/" className="innerLogo"></Link>
                            <NavigationBar/>       
                        </div>
                        {
                            this.props.remoteSysConfs.allow_hongbao==='1'? 
                            <AffixHongbao/> : null
                        }
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