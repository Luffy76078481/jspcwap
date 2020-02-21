
import React, { Component } from 'react';
import { Link , IndexLink,browserHistory } from 'react-router';
import { Tooltip,Icon} from 'antd';
import { connect } from 'react-redux'
import QRCode from 'qrcode.react';
import "./Header.scss";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            showBlock: "",
            reqLock:false,
            messages:[]
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
                new window.actions.ApiBankAccountsAction().fly();
                new window.actions.ApiPlayerInfoAction().fly();
            }
            _self.state.reqLock = false;
        });
    }
    onLogout() {
        new window.actions.LogoutAction().fly();
        browserHistory.push('/');
    }
    componentWillMount(){
        new window.actions.ApiQueryPromotionsAction(1,20,null,false).fly();
    }
    componentDidMount(){
        // 读取数据API
        new window.actions.ApiNoticeAction().fly(resp=>{
            if (resp.StatusCode === 0 && resp.NewsInfo.length > 0) {

                this.setState({messages: resp.NewsInfo});
            }
        }, "pop_news_");
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    renderLoginForm() {
        return (
            <form id="login-form" onSubmit={this.onLogin.bind(this)}>
                <div className="form-login-reg">
                    <Link to="/register" className="form-reg-btn" >立即注册</Link>
                </div>
                <div className="inputDiv">
                    <input type="text" ref="username"  id="demotestid2" className="account-input input-type border-type" placeholder="用户名"/>
                </div>
                <div className="inputDiv">
                    <input type="password" ref="password" className="pwd-input input-type border-type" placeholder="密码"/>
                    <a onClick={this.serversOpen.bind(this)} className="forget">
                        忘记
                    </a>
                </div>
                <div>
                    <button type="submit" className="loginBt">登录</button>
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        return (
            <div className="userInfo">
                <span className="memberItem">你好,<b>{user.username}</b>(总额:{this.props.user.amount} RMB)</span>
                <Tooltip title="存款" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <Link to="/deposit" className="circle-icon">存</Link>
                </Tooltip>
                <Tooltip title="转款" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <Link to="/transfer" className="circle-icon">转</Link>
                </Tooltip>
                <Tooltip title="取款" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <Link to="/records_withdraw" className="circle-icon">取</Link>
                </Tooltip>
                <Tooltip title="用户中心" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <Link to="/member"><Icon type="user" /></Link>
                </Tooltip>
                <Tooltip title="消息中心" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <Link to="/records_message" >
                        <Icon type="mail" />
                        <span>({this.props.sitemsg.unread !== 0 ? 0 : this.props.sitemsg.unread })</span>
                    </Link>
                </Tooltip>
                <Tooltip title="登出" getPopupContainer={
                    (triggerNode)=> triggerNode
                }>
                    <a onClick={this.onLogout.bind(this)}>
                        <Icon type="logout" />
                    </a>
                </Tooltip>
            </div>
        );
    }
    // 点击弹窗
    showNotice(){
        window.$(this.refs.popBox).addClass('popout');
    }
    // 关闭弹窗
    hidNotice(){
        window.$(this.refs.popBox).removeClass('popout');
    }
    // 弹窗内容
    renderNotice() {
        var ret = [];
        for (var i = 0; i < this.state.messages.length; i++) {
            var msg = this.state.messages[i];
            ret.push(
                <li key={i}>
                    <p className="popBox_body_date">{msg.CreateTime}</p>
                    <p className="popBox_body_title">{msg.Title}</p>
                    <p className="popBox_body_content" dangerouslySetInnerHTML={{__html:msg.Content}}></p>
                </li>
            )
        }
        return ret;
    }
    render() {
        const NavigationBar = window.r.get("NavigationBar");
        let notice="";
        this.props.notices.forEach((item)=>{
            notice += item.Title+":"+item.Content;
        });
        return (
            <div className="headerCon Header">
                <header id="header">
                    <div className="header-container">             
                        <div className="w-2 fl">
                            <IndexLink className="logo" to="/">
                                <span className="innerLogo"></span>
                            </IndexLink>
                        </div>
                        <div className="rightHead fr pt10 pr20">    
                            <div className='fr clearfix'>
                                {this.props.user.token?this.renderUserInfo():this.renderLoginForm()}                               
                            </div>                                 
                            <NavigationBar></NavigationBar>
                        </div>
                    </div>
                </header>
                <div className="sub-header container ">
                    <div className="row">
                        <div className="col-md-8 marquee">
                            <i className="glyphicon glyphicon-volume-up"></i>
                            <marquee ref="notice1" onClick={this.showNotice.bind(this)}  direction="left"  onMouseOver={(ele)=>{this.refs.notice1.stop();}} onMouseOut={(ele)=>{this.refs.notice1.start();}} className="NewNoticeList color-highlight">
                                <a data-toggle="modal" data-target="#noticeModal" className="app_color">
                                    {notice.replace(/(&nbsp;|\s){1}|<[^>]+>/g,"")}
                                </a>
                            </marquee>
                            <div ref="popBox" className="popBox">
                                <div className="popBox_title">
                                    <i className="fa fa-circle-o-notch popBox_pic" aria-hidden="true"></i>网站公告
                                    <i className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></i>
                                </div>
                                <div className="popBox_body">
                                    <ul>
                                        {this.renderNotice()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 right">
                            <div className="row">
                                <a className="col-md-4 showQrcode" >
                                    <i className="fa fa-mobile-phone"></i>
                                    手机版
                                    <div className="mobile-qrcode-wrapper-header">
                                        <div className="mobile-qrcode">
                                            <div className="col-md-12">
                                                <div>手机版介绍</div>
                                            </div>
                                            <div className="col-md-6 qr-left-col">
                                                <span className="qr-top-text">扫一扫</span><br/>
                                                <span  className="qr-bottom-text">随时游戏</span>
                                            </div>
                                            <div id="dynamic-qr-code" className="col-md-6 qr-right-col">
                                                <QRCode className="qrImg"
                                                        includeMargin={true} //内部是否有margin
                                                        size={100}  //图片大小
                                                        value={this.props.remoteSysConfs.channel_push_url || "" } //地址
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a target="_blank" href="/agent.html?tab=FaqContent" className="col-md-4">
                                    <i className="fa fa-question-circle"></i>
                                    常见问题
                                </a>
                                <a  href="#" onClick={this.serversOpen.bind(this)} className="col-md-4">
                                    <i className="fa fa-comments-o"></i>
                                    在线客服
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        agGames:state.game.agByGames,
        global:state.global,
        notices:state.notices,
        remoteSysConfs:state.remoteSysConfs,
        slot_platforms: state.game.slot_platforms,
        casinos:state.views.casinos,
        sportGames:state.game.sportGames,
        bingoGames:state.game.bingoGames,
        promotionTypes:state.promotions.promoTypes,
        ESGame:state.game.ESGame
    }
);
export default connect(mapStateToProps)(Header)