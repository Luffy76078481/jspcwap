import React, { Component } from 'react';
import { Link , IndexLink,browserHistory } from 'react-router';
import { connect } from 'react-redux'
import slogan from './images/slogan.gif';
import "./Header.scss";

class Header extends Component {
    constructor() {
        super();
        this.state = {
            showBlock: "",
        };
    }
    onLogout() {
        new window.actions.LogoutAction().fly();
        browserHistory.push('/');
    }
    componentWillMount(){
        new window.actions.ApiQueryPromotionsAction(1,20,null,false).fly();
    }
    renderLoginForm() {
        return (
            <span>
                <a className="topLogin" onClick={()=>{window.actions.auth()}}>登陆</a>
                <Link to="/register">立即注册</Link>
                <a href="javascript:void(0)">线路切换</a>
            </span>
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        return (
            <div className="userInfo">
                <span className="memberItem">欢迎，<b>{user.username}</b>，<b>{this.props.user.amount}</b> RMB</span>
                <Link to="/member">会员中心</Link>
                <Link to="/records_message">消息中心(<b>{this.props.sitemsg.unread}</b>)</Link>
                <a onClick={this.onLogout.bind(this)}>
                   安全退出
                </a>
            </div>
        );
    }
    render() {
        const NavigationBar  = window.r.get('NavigationBar')
        return (
            <div className="headerCon" >
                <div className="head_top">
                    <div className="mAuto w1000 pr">
                        <div className="left">
                            <span className="min_logo"></span>
                            澳门银河集团（官方直营）
                            上市代码：<strong className="color-fco">HK00027</strong>
                        </div>
                        <div className="right">
                            <div className="login-info">
                                {this.props.user.token?this.renderUserInfo():this.renderLoginForm()}
                            </div>
                            <span className="Language">
                                <span className="chinese"></span>中文
                            </span>
                            <a href="javascript:Util.AddFavorite('澳门银河');">收藏本站</a>
                            <a href={this.props.remoteSysConfs.channel_push_url}><span className="homeimg"></span>App下载</a>
                        </div>
                    </div>
                </div>
                <header id="header">
                    <div className="head_bd header-container">
                        <IndexLink className="logo" to="/">
                            <span className="innerLogo"></span>
                        </IndexLink>
                        <img className="slogan" src={slogan} />
                        <div className="tips">
                            <a href="/">【新手指南】一分钟教您玩转银河！</a>
                        </div>
                    </div>
                    <div className="headerNav ">
                        <div className="navigation-inner">
                            <NavigationBar/>
                        </div>
                    </div>
                </header>
            </div>
        );

    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        notices:state.notices,
        agGames:state.game.agByGames,
        global:state.global,
        remoteSysConfs:state.remoteSysConfs,
        slot_platforms: state.game.slot_platforms,
        casinos:state.views.casinos,
        sportGames:state.game.sportGames,
        bingoGames:state.game.bingoGames,
        promotionTypes:state.promotions.promoTypes,
    }
);
export default connect(mapStateToProps)(Header)
