

/*
        UpDate by 7/30 by Asir
        _________________________________________________ XPJ棕色头部, kyy,jjh
*/

import React, {Component} from 'react';
import {Link,IndexLink} from 'react-router';
import {connect} from 'react-redux'
import "./Header.scss";
import {RedAllMsg,serversOpen} from "commonFunc"

class Header extends Component {
    constructor() {
        super();
        this.state = {
            loginLock:false,//登录锁
            onlinePlayers:Math.floor(Math.random()*500+20000),//在线人数
            username:"",//账号
            password:"",//密码
        };
    }
    componentDidMount(){
        window.setInterval(()=>{
            let d = new Date();
            let dt = d.getTime();    
            dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000       
            this.refs.setClock.innerHTML = new Date(dt).format("yyyy/MM/dd hh:mm:ss")
        }, 1000);

    }
    // 登录
    onLogin(event) {
        event.preventDefault();
        if(this.state.loginLock)return
        this.setState({
            loginLock:true
        })
        new window.actions.ApiLoginAction(this.state.username, this.state.password).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiPlayerInfoAction().fly();//请求玩家信息
                new window.actions.ApiBankAccountsAction().fly();//请求玩家银行信息
                new window.actions.ApiBankAccountsAction().fly();//获取会员绑定的银行卡
            }else if(resp.StatusCode === 1 ){
                swal(resp.Message)
            }
            // 登录后清空
            this.setState({
                username:"",
                password:"",
                onlinePlayers:Math.floor(Math.random()*500+20000),
                loginLock:false
            })
        });
    }
    // 退出
    onLogout() {
        new window.actions.LogoutAction().fly();
    }
    // 未登录状态
    renderLoginForm() {
        const options = window.r.props("Header");
        return (
            <form onSubmit={this.onLogin.bind(this)}>
                <div className="login-input">
                    <input type="text" placeholder="会员账号" value={this.state.username} onChange={this.handleChange.bind(this,'username')}/>
                    <input type="password" placeholder="密码" value={this.state.password} onChange={this.handleChange.bind(this,'password')}/>
                </div>
                <div className="login-button">
                    <button type="submit"></button>
                    <a onClick={ ()=>{ serversOpen(this,this.props.remoteSysConfs.online_service_link)} } className="yellowFont">
                        <i className="glyphicon glyphicon-question-sign mr5"></i>忘记密码？
                    </a>
                </div>
                <div className="login-reg">
                    <Link to="/register" title="免费注册"></Link>
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    // 输入账号密码
    handleChange(val,event){
        this.setState({
            [val]:event.target.value
        })
    }
    // 登录后
    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您" ;
        return (
            <div className="afterLogin">
                <span>
                    {userLevel}：<Link to="/member">{user.username}</Link>
                </span>      
                <span>总额：{this.props.user.amount} RMB</span>
                <span><Link to="/deposit" className="item bai">存款</Link></span>
                <span><Link to="/withdraw" className="item bai">取款</Link></span>
                <span><Link to="/transfer" className="item bai">额度转换</Link></span>  
                <span>
                    <Link to="/records_message" onClick={()=>{RedAllMsg()}}>
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        <span className="redFont">({this.props.sitemsg.unread})</span>
                    </Link>
                </span>
                <span>
                    <a onClick={this.onLogout.bind(this)}>退出</a>
                </span>
                <div className="clear"></div>
            </div>
        );
    }
    // 表单顶部DOM
    renderHeadTop(){
        return(
            <div className='headTop'>
                <span>
                    <i className="glyphicon glyphicon-time"></i>美东时间：
                    <b id="clock" ref="setClock"></b>
                </span>
                <span>
                    <i className="fa fa-male" ></i>在线人数：{this.state.onlinePlayers}人
                </span>
                <a href="javascript:Util.AddFavorite('新葡京官网');" className='yellowFont'>
                    <i className="glyphicon glyphicon-home"></i>收藏本站
                </a>
                {
                    this.props.user.token?
                    <span>
                        <Link to="/member" className='yellowFont'>
                            <i className="glyphicon glyphicon-user" aria-hidden="true"></i>个人中心
                        </Link>
                    </span>:null                                 
                }
                <div className="clear"></div>
            </div> 
        )
    }
    // 公告
    renderNotice(){
        const NoticeBar = window.r.get("NoticeBar");
        return(
            <div className="noticeItem">
                <div className="w1200 pr mAuto">            
                    <div className='pages'>
                        <a href="/help.html" target="_blank">帮助中心</a>
                        <span>|</span>
                        <a href="/agent.html" target="_blank">申请代理</a>
                        <span>|</span>
                        <Link to="/promotions" className="vip">VIP</Link>
                    </div>
                    <div className='notice_container'>
                        <NoticeBar ></NoticeBar>
                    </div>
                    <a className='getServer' target="_parent" href="#" onClick={()=>serversOpen(this.props.remoteSysConfs.online_service_link)}></a>         
                </div>
            </div>
        )
    }
    render() {
        const NavigationBar = window.r.get("NavigationBar");
        return (
            <header className='header_xpj'>
                <div className='mAuto w1200 pr'>
                    <div className="headFname clearfix">
                        <div className="logo fl">
                            <Link to="/"></Link>
                        </div>
                        <div className="loginForm fr">       
                            {this.renderHeadTop()}        
                            <div className="loginWrap">
                                {
                                    this.props.user.token?
                                    this.renderUserInfo(): 
                                    this.renderLoginForm()
                                }
                            </div>
                        </div>
                    </div>
                    <div className="navWarp">
                        <NavigationBar/>
                    </div>
                </div>
                {this.renderNotice()}
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
        global:state.global,
        remoteSysConfs:state.remoteSysConfs,
    }
);
export default connect(mapStateToProps)(Header)