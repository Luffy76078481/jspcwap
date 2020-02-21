
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { serversOpen,RedAllMsg } from "commonFunc"
import "./Header.scss";
class Header extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            tags: [],
            test:0,
            showBlock: false,
            reqLock:false//状态锁
        };
    }
    // 登录
    onLogin(event) {
        event.preventDefault();
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value, "", "").fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiBankAccountsAction().fly(); //获取会员绑定的银行卡
                new window.actions.ApiPlayerInfoAction().fly(); //获取会员信息
                new window.actions.ApiBankAccountsAction().fly();//获取会员绑定的银行卡
            }
            _self.state.reqLock = false;
        });
    }
    // 退出
    onLogout(event) {
        new window.actions.LogoutAction().fly();
        setTimeout(() => {
            browserHistory.push("/");
        }, 300);
    }
    // 挂载
    componentDidMount(){
        window.setInterval(()=>{
            let d = new Date();
            let dt = d.getTime();    
            dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000       
            this.setState({time: new Date(dt).format("yyyy/MM/dd hh:mm:ss")})
        }, 1000);
        if(location.search == ""){}
        else if(location.search == '?tab=HB' || location.search == '?tab=PT'|| location.search == '?tab=MG2'|| location.search == '?tab=OPUS2'|| location.search == '?tab=AG'|| location.search == '?tab=YOPLAY'|| location.search == '?tab=QT'|| location.search == '?tab=BBIN'){}
        else if((location.search).split('=')[0]=='?channel'){}
        else{
            function getSearch(key){
                var str=location.search;
                var newstr=str.slice(1);
                var strArr=newstr.split('&');
                var strObj={};
                var newArr=[];
                for(var i=0;i<strArr.length;i++){
                  newArr=strArr[i].split('=');
                  strObj[newArr[0]]=newArr[1]
                }
                var name = window.atob(strObj.name);
                var password = window.atob(strObj.password);
                new window.actions.ApiLoginAction(name,password).fly(resp=>{
                    if (resp.status === 0) {
                        new window.actions.ApiBankAccountsAction().fly();
                    }
                });
              }
              getSearch();
        }
    }
    // 未登录
    renderLoginForm() {
        const online_service_link = this.props.remoteSysConfs.online_service_link;
        return (
            <form id="login-form" onSubmit={this.onLogin.bind(this)}>
                <div className="form-login-input">
                    <input type="text" ref="username" className="account-input input-type" placeholder="账号" autoComplete='off'/>
                    <input type="password" ref="password" className="pwd-input input-type" placeholder="密码" autoComplete='off'/>
                    <a href="javascript:void(0);" id="test" onClick={()=>serversOpen(online_service_link)} className="forget">忘记密码？</a>
                </div>
                <div className="form-login-button">
                    <button type="submit" className="form-login-btn"></button>
                </div>
                <div className="form-login-reg">
                    <Link to="/register" className="form-reg-btn" title="免费注册"></Link>
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    // 用户信息
    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您" ;
        return (
            <div className="infoContent">
                <span className="memberItem">{userLevel}：<Link to="/member">{user.username}</Link></span>
                <div className="infoWrap">
                    <span className="memberItem" style={{paddingLeft:"2px"}}>  余额：{this.props.user.amount} ￥</span>
                    <span className="memberItem" ><Link to="/deposit" className="item bai charge" style = {{"color":"#ff0000"}}>充值</Link></span>
                    <span className="memberItem"><Link to="/withdraw" className="item bai">取款</Link></span>
                    <span className="memberItem"><Link to="/transfer" className="item bai">游戏转账</Link></span>
                </div>
                <span className="memberItem" onClick={()=>RedAllMsg()}>
                    <Link to="/records_message" className="item">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i><span className="huang ml5" >({this.props.sitemsg.unread})</span>
                    </Link>
                </span>
                <span className="memberItem"><a href="javascript:void(0)" className="item huang bgGray4" onClick={this.onLogout.bind(this)}>退出</a></span>
                <div className="clear"></div>
            </div>

        );
    }
    render() {
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        const config = window.config;
        const agentLoginUrl = config.agentLoginUrl;
        const NavigationBar = window.r.get("NavigationBar");
        return (
            <header id="topHead">
                <div className="headBg">
                    <div className="HeaderWrap pr mAuto clearfix">                 
                        <Link className="logo" to="/"></Link>      
                        <div className="credit"></div>    
                        <div className='loginForm'>
                            <div className="timeNumber mt5">
                                { 
                                    this.props.user.token?
                                    <span className="time_box mt10">
                                        <i className="glyphicon glyphicon-time"></i>美东时间：<b id="clock">{this.state.time}</b>
                                    </span>:null
                                }          
                                {
                                    this.props.user.token?      
                                    <Link to="/member"><i className="glyphicon glyphicon-user" aria-hidden="true"></i>个人中心</Link>
                                    :null      
                                }
                                <a className="mobile_betting" href={promotionLink} target="_blank"><i className="glyphicon glyphicon-phone mt5"></i>手机投注</a>
                                <a href="javascript:Util.AddFavorite('新濠天地');" className="fav"><i className="glyphicon glyphicon-home"></i>收藏本站</a> 
                                <a href="/xhtd/nav.html" target="_blank"><i className="fa fa-tasks" aria-hidden="true"></i>线路检测</a>
                                {   
                                    !this.props.user.token && 
                                    <a href="/agent.html?tab=Alliance" target="_blank">代理合作</a>
                                }                                    
                                {   
                                    this.props.user.token && 
                                    <a href="/agent.html?tab=Alliance" target="_blank">代理加盟</a>
                                }
                                <a href={agentLoginUrl} target="_blank">代理登入</a>                                                                        
                                <div className="clear"></div>
                            </div>        
                            {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}                   
                        </div>
                    </div>
                    {/* 导航 */}
                    <div className="menu-nav" id="headerNav" >
                        <NavigationBar menuHover={(value)=>{this.setState({showBlock: value})}}/>
                    </div>                           
                </div>
                <Link to="/LootoPage" activeClassName="active" className="lucky_wheel"/>
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
        verifycode: state.verifycode
    }
);
export default connect(mapStateToProps)(Header)