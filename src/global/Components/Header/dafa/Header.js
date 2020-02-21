
import React, { Component } from 'react';
import { Link , IndexLink } from 'react-router';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import loadAmount from './images/loadAmount.gif';
import {serversOpen} from 'commonFunc'
import "./Header.scss";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            time:"",
            tags: [],
            isPassWord:"password",
            test:0,
            errorMessage:"",
            playerBalance:true,
            showBlock: false,
            loadAmount:false,
            reqLock:false
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
                new window.actions.ApiBankAccountsAction().fly();
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiGamePlatformAllBalanceAction().fly();
            }else{
                let mess;
                if(resp.Message == '用户名或密码错误'){
                    mess = '对不起，您输入了无效的用户名和/或密码。请再试一次。'
                }else{
                    mess = resp.Message
                }
                this.setState({
                    errorMessage: mess
                });
            }
            _self.state.reqLock = false;
        });
    }
    // 退出
    onLogout(event) {
        new window.actions.LogoutAction().fly();
        setTimeout(() => {
            browserHistory.push("/");
        }, 500);
    }
    changePasswordType(){
        if(this.state.isPassWord =="password"){
            this.setState({isPassWord:"text"})
        }else{
            this.setState({isPassWord:"password"})
        }
    }
    renderLoginForm() {
        let isPassWord  = this.state.isPassWord=="password"?"password-mask-icon":"password-mask-icon password-unmasked";
        return (
            <form 
                id="login-form" className='pr'
                onSubmit={this.onLogin.bind(this)}>
                <div className="formLogin">
                    <div className="loginInput">
                        <input type="text" ref="username"  id="demotestid2" placeholder="用户名"/>
                    </div>
                    <div className="loginInput">
                        <input type={this.state.isPassWord} ref="password" placeholder="密码"/>
                        <span className={isPassWord} onClick={this.changePasswordType.bind(this)}></span>
                    </div>                
                </div>
                <div className="login_button">
                    <button type="submit">登录</button>
                    <Link className='reg' to="/register" title="免费注册">免费注册</Link>
                    <br/>
                    <a id="test" onClick={e=>serversOpen(this.props.remoteSysConfs.online_service_link)} className="forget"><i className="glyphicon glyphicon-question-sign"></i>无法登录?</a>
                    <a href="javascript:Util.AddFavorite('dafabet');" className="color-highlight fav"><i className="glyphicon glyphicon-home"></i>收藏本站</a>
                </div>
                {this.state.errorMessage?<span className="errorMessage">{this.state.errorMessage}</span>:null}
                <div className="clear"></div>
               
            </form>
        );
    }
    playerBalanceChange(e){
        let $dom = window.$(e.currentTarget);
        let isChecked = $dom.attr('data-checked');
        if(isChecked =="true"){
            $dom.removeClass('checked').addClass('unchecked')
            $dom.attr('data-checked','false')
            this.setState({
                playerBalance:false
            })
        }else{
            $dom.removeClass('unchecked').addClass('checked')
            $dom.attr('data-checked','true')
            this.setState({
                playerBalance:true
            })
        }
    }
    // 刷新余额
    loadAmount(){
        this.setState({
            loadAmount:true
        })
        new window.actions.ApiPlayerInfoAction().fly(resp=>{
            if (resp.StatusCode === 0) {
                this.setState({
                    loadAmount:false
                })
            }
        });
    }

    showMoney(){
        var ret = [];
        for (let i = 0; i < this.props.game.platforms.length; i++) {
            let platform = this.props.game.platforms[i];
            let balance = platform.Balance || 0;
            let name = platform.Name;
            balance = balance.toFixed(2);

            ret.push(
                <li key={name}>
                    <div className="balance-details">
                        <div className="balance-label">{name}</div>
                        <div className="balance-balance" data-balanceid="4">{balance}</div>
                    </div>
                </li>
            )
        }
        return ret;
    }

    renderUserInfo() {
        const user = this.props.user;
        const userLevel = user.userLevel?user.userLevel:0;
        return (
            <div className="afterlogin mt10">
                <div className="player-balance">
                    <span className={"playerInfo playerLevel_"+userLevel}>
                    </span>欢迎 <Link to="/member">{user.username}</Link>
                    <span className="balance-checkbox" ref="balanceCheckbox" data-checked="true" onClick={this.playerBalanceChange.bind(this)}><span></span></span>
                    {
                        this.state.playerBalance?
                        (<div className="account-balance">
                            {this.state.loadAmount?(<img className="loadAmount" src={loadAmount} />):
                                (<span>总余额：{this.props.user.amount}元<i className="glyphicon glyphicon-repeat" onClick={this.loadAmount.bind(this)}></i></span>)
                            }
                            <div id="balance-tooltip">
                                <ul>
                                    {this.showMoney()}
                                </ul>
                            </div>   
                        </div>)
                        :null
                    }
                </div>
                <div className="player-options">
                    <div className="cashier-tooltip">
                        <Link to="/member" className={"cashier-label"}>出纳柜台</Link>
                        <div className={"tooltip-content text-center"}>
                            <ul>
                                <li><Link to="/deposit">存款</Link></li>
                                <li><Link to="/withdraw">取款</Link></li>
                                <li><Link to="/transfer">游戏转账</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="myaccount-tooltip">
                        <a className="icon-myaccount"></a>
                        <div className={"tooltip-content text-center"}>
                            <ul>
                                <li><Link to="/member">我的账户</Link></li>
                                <li><Link to="/person_change_pwd">修改密码</Link></li>
                                <li><Link to="/records">交易记录</Link></li>
                                <li><a onClick={this.onLogout.bind(this)}>登出</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="clear"></div>
            </div>

        );
    }
    render() {
        var NavigationBar = window.r.get("NavigationBar");
        let notice=[];
        this.props.notices.forEach((item,index)=>{
            notice.push(<p key={index}>{item.Content}<span className='noti_time'>{item.CreateTime.slice(0,10)}</span></p>);
        });
        return (
            <header id="topHead">
                <div className="headBg clearfix">             
                    <div className="headFname clearfix">
                        <div className="logo">
                            <Link to="/">
                                <span className="innerLogo"></span>
                            </Link>
                        </div>
                        <div className="rightHead fr">
                            <div className="top-option pr">
                                <i className="glyphicon glyphicon-volume-up" data-toggle="modal" data-target="#noticeModal" ></i>
                                <span className="language-switcher"></span>
                            </div>                        
                            <div className="pr loginForm">
                                {this.props.user.token? this.renderUserInfo() : this.renderLoginForm()}
                            </div>                     
                        </div>
                    </div>
                    <div className="menu-nav" id="headerNav" >          
                        <NavigationBar/>        
                    </div>        
                </div>
                <div className="clear"></div>
                {/*公告弹出层*/}
                <div id="noticeModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                公 告
                                <button type="button" className="close" data-dismiss="modal">
                                    <i className="fa fa-close"></i>
                                </button>
                            </div>                                                                  
                            <div className="modal-body">
                                {notice.length==0?"没有公告!":notice}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );

    }
}

const mapStateToProps = (state, ownProps) => (
    {
        notices:state.notices,
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        global:state.global,
        remoteSysConfs:state.remoteSysConfs,
        game: state.game
    }
);
export default connect(mapStateToProps)(Header)