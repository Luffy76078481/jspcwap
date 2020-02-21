/*


                bet365公用头部/

*/

import React, { Component } from 'react';
import { Link ,browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {serversOpen,RedAllMsg} from 'commonFunc'
import Background from './images/head_nav.jpg';
import "./Header.scss";

class Header3 extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            tags: [],
            test:0,
            showBlock: false,
            isToggleOn: false,
            dispaly: 'block',
            needCheck:"",//这个值为空就不需要进行验证

        };
    }
    componentDidMount(){
        // 时间
        window.setInterval(()=>{
            let d = new Date();
            let dt = d.getTime();
            dt = dt + (d.getTimezoneOffset() - 4*60)*60*1000          
            this.setState({time: new Date(dt).format("hh:mm:ss")})
        }, 1000);
        document.addEventListener('click', this.handleClickOver.bind(this) );
    }
    //登录API
    onLogin(event) {
        event.preventDefault();
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiGamePlatformAllBalanceAction().fly()// 所有平台余额
                new window.actions.ApiPlayerInfoAction().fly();//获取会员基本信息
                new window.actions.ApiBankAccountsAction().fly();//获取会员绑定的银行卡
            }else if(resp.StatusCode === 1 ){
                swal(resp.Message)
            }else if(resp.StatusCode === 10110){
                this.setState({
                    needCheck:{//这个值为空就不需要进行验证
                        userName:this.refs.username.value,
                        cipher:this.refs.password.value
                    }
                })
            }
        });
    }
    // 退出登录
    onLogout() {
        new window.actions.LogoutAction().fly();
        setTimeout(() => {
            browserHistory.push("/");
        }, 300);
    }
    // 时间
    handleClickOver(e){
        if(this.state.isToggleOn){
            this.setState({
                isToggleOn:false,
                dispaly:"none"
            })
        }
    }
    // 帮助中心
    handleClick(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            display: prevState.isToggleOn ? 'none': 'block'
        }))
    }
    // 登录
    renderLoginForm() {
        return (
            <form id="login-form" onSubmit={this.onLogin.bind(this)}>
                <div className='loginInput'>
                    <input className='userName' ref="username"  id="demotestid2" type='text' placeholder='用户名' />
                    <input className='password' ref="password" type='password' placeholder='密码' />
                    <button>登录</button>
                </div>
                <div className='forgetItem'>
                   <Link to='/register' className='form-reg'>立即加入</Link>
                   <a href="javascript:void(0);" id="test" onClick={()=>{serversOpen(this.props.remoteSysConfs.online_service_link)}} className="forget">忘记密码？</a>
                </div>
            </form>
        );
    }
    // 登录后
    renderUserInfo() {
        const user = this.props.user;
        return (
            <div className='afterLoginWrap'>
                <div className='Topline'>
                    <div className='user'>
                        <a className='username f14'>{user.username}</a>
                        <a href='javascript:void(0);' className='out' onClick={this.onLogout.bind(this)}>退出</a>
                    </div>
                    <div className='account'>
                        <Link to="/member" className='ac'>账户中心</Link>
                        <Link to="/records_message" className='message' onClick={()=>{RedAllMsg()}}/>
                        <a href='javascript:void(0);' className='msgNum'>{this.props.sitemsg.unread}</a>
                    </div>
                </div>
                <div className='BottomLine'>
                    <div className='amount'>
                        余额<a> {this.props.user.amount}</a> RMB
                    </div>
                    <div className='transfer'>
                        <Link to="/deposit">存款</Link>
                        <Link to="/withdraw">提款</Link>
                        <Link to="/transfer">转账</Link>
                    </div>
                </div>
            </div>

        );
    }

    render() {
        const NavigationBar = window.r.get("NavigationBar");// 导航
        const PopNews = window.r.get("NoticeBar");// 走马灯
        const PasswordAlert = window.r.get("PasswordAlert")
        const config = window.config;
        const curPath = window.location.pathname;// 当前页面
        const {NewsSiteUrl} = this.props.backConfigs;
        return (
            <header className='Header'>
                {this.state.needCheck && <PasswordAlert checkVal={this.state.needCheck} closeWindow={()=>{this.setState({needCheck:false})}}/>}
                <div className='headTop'>
                    <div className="container" style={{background:(config.spec.includes('BEE') && curPath === "/") ? `url(${Background})` : '',backgroundSize: 'cover'}} >
                        <Link to="/" className="headFname" />
                        <div className="menu-nav" id="headerNav" >            
                            <NavigationBar menuHover={(value)=>{this.setState({showBlock: value})}}/>
                        </div>
                        <div className={`loginForm ${this.props.user.token? 'afterLogin': ''}`}>
                            {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                        </div>
                    </div>
                                      
                </div>
                {
                ( curPath === "/" && !config.spec.includes('aaa')) ? null :
                <div className="headBottom">
                    <div className="container">                   
                        <div className='timeZone'>
                            <span className="time_box">
                                <i className="glyphicon glyphicon-time"></i>美东时间：
                                <b id="clock">{this.state.time}</b> &nbsp;
                            </span>
                        </div>
                        <div className='notice'>
                            <a className="noticeText">公告:</a>
                            <PopNews></PopNews>
                        </div>
                        <div className='otherLink'>
                            <a onClick={()=>{serversOpen(this.props.remoteSysConfs.online_service_link)}}>
                                <i className="ChatText" />在线客服
                            </a>                                   
                            <a href={this.props.remoteSysConfs.channel_push_url?this.props.remoteSysConfs.channel_push_url:""} target="_blank">
                                <i className="glyphicon glyphicon-phone"/>手机端下载
                            </a>
                            <a className="server-text" onClick={this.handleClick.bind(this)}>
                                帮助中心<i className="helpLinks"/>
                            </a>
                            {
                                this.state.isToggleOn ?
                                <ul id="service">
                                    <li ><a href="/help.html" target="_blank">关于我们</a></li>
                                    <li ><a href="/agent.html" target="_blank">代理中心</a></li>
                                    {NewsSiteUrl&&<li ><a href={NewsSiteUrl} target="_blank">bet365资讯站</a></li>}
                                    {config.spec.includes('aaa') && <li ><a href="http://396110.com" target="_blank">如何修改DNS</a></li>}
                                </ul>: null
                            }
                        </div>                 
                    </div>
                </div>
                }
                <div className="clear"/>
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
        backConfigs: state.backConfigs,
    }
);
export default connect(mapStateToProps)(Header3);