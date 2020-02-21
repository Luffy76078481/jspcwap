

import React, { Component } from 'react';
import { Link, browserHistory, IndexLink } from 'react-router';
import { connect } from 'react-redux'
import { RedAllMsg, serversOpen } from "commonFunc"
import "./Header.scss";
import { config } from '../../../../../config/config';
let timer;

class Header extends Component {
    constructor() {
        super();
        this.state = {
            nowTime: "",
        };
    }
    componentDidMount() {
        timer = window.setInterval(() => {
            let d = new Date();
            let dt = d.getTime();
            dt = dt + (d.getTimezoneOffset() - 4 * 60) * 60 * 1000; // 美东时间
            this.setState({
                nowTime: new Date(dt).format("yyyy/MM/dd hh:mm:ss")
            })
        }, 1000);
    }
    componentWillMount() {
        clearInterval(timer)
    }
    // 1级导航
    renderNav() {
        let mainNav = this.props.mainNav;
        let mainNavDom = [];
        for (let i = 0; i < mainNav.length; i++) {
            var mainNavData = mainNav[i]
            let classNames = "mainMenu " + mainNavData.ClassName + (mainNavData.IsHot ? " hot" : "") + (mainNavData.IsNew ? " new" : "");
            if (mainNavData.Tag == 'home' || mainNavData.GotoUrl == '/') {
                mainNavDom.push(
                    <li key='home' className={classNames}>
                        <IndexLink to={mainNavData.GotoUrl} activeClassName="active">
                            <span>首页</span>
                            <p>HOME</p>
                        </IndexLink>
                    </li>
                )
            } else {
                mainNavDom.push(
                    <li key={i + 'uzi'} className={classNames}>
                        {mainNavData.GotoUrl.indexOf("http") === -1 ?

                            <Link
                                className={(mainNavData.Tag==="games" || mainNavData.Tag==="casino" || mainNavData.Tag==="promotions")?'animation':''}
                                activeClassName={mainNavData.GotoUrl ? "active" : null}
                                // className='blink2'
                                to={mainNavData.GotoUrl}
                                // 跳下载页
                                href={mainNavData.Tag == "mobile" && !mainNavData.GotoUrl ? this.props.remoteSysConfs.channel_push_url : null}
                                target={!mainNavData.GotoUrl ? "_blank" : null}
                                // onClick={mainNavData.Tag == "server" ? () => { serversOpen(this.props.remoteSysConfs.online_service_link) } : null}
                            >
                                <span>{mainNavData.Title}</span>
                                <p>{mainNavData.SubTitle.toUpperCase()}</p>
                            </Link>
                            :
                            <a href={mainNavData.GotoUrl} target="_blank">
                                <span>{mainNavData.Title}</span>
                                <p>{mainNavData.SubTitle.toUpperCase()}</p>
                            </a>
                        }
                        {
                            <ul className='secondNav'>
                                {
                                    mainNavData.Data != null ?
                                        this.renderSecondNav(mainNavData.Data, mainNavData.Tag) : null
                                }
                            </ul>
                        }
                    </li>
                );
            }

        }
        return mainNavDom;
    }
    // 点击1级导航
    handleClickGame(games, tag) {
        if (tag.includes("casino") || tag.includes("sport") || tag.includes("eSports")) {
            this.openGame(games)
        } else if (tag.includes("chess") || tag.includes("bingo")) {
            this.intoPage(games, tag)
        } else if (tag.includes("games")) {
            this.intoGames(games)
        } else {
            return false
        }
    }
    // 真人，体育直接打开游戏
    openGame(data) {
        if (!window.actions.auth()) {
            return;
        }
        if (!data.Games) {
            message.error('未配置游戏', 1)
            return
        }
        let parma = {
            GamePlatform: data.Games[0].GamePlatform,// 平台
            GameType: data.Games[0].GamePlatform == "MG2" ? "casino" : data.Games[0].GameTypeText,// 类型
            GameId: data.Games[0].GameIdentify,
            IsMobile: false,
            IsDemo: false,
        }
        let windowOpen = window.Util.windowOpen(parma.GameType);
        let AutoTransfer = this.props.user.AutoTransfer === 1 ? true : false;
        new window.actions.ApiGetLoginUrl(parma, 'WEB', AutoTransfer).fly(res => {
            if (res.StatusCode == 0) {
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href = gameLink;
            } else {
                windowOpen.urlError(res.Message);
            }
        })
    }
    // 跳转电子游戏
    intoGames(game) {
        let Tag = game.Tag.indexOf("_") > -1 ? game.Tag.substr(0, game.Tag.indexOf("_")) : game.Tag;
        window.actions.ChangeLinkID(Tag);
        //browserHistory.push("/");
        setTimeout(() => {
            browserHistory.push("/games");
        }, 10);
    }
    // 跳转内页
    intoPage(data, tag) {
        window.actions.ChangeGameTabs({
            pram: data.Tag,
            link: tag
        })
    }
    renderSecondNav(secondNavDatas, tag) {
        let secondNavDom = [];
        for (let i = 0; i < secondNavDatas.length; i++) {
            let secondLi = secondNavDatas[i];
            let classNames = secondLi.ClassName + (secondLi.IsHot ? " hot" : "") + (secondLi.IsNew ? " new" : "");
            if (secondLi.Tag.includes('188') && !this.props.user.username) {
                continue;
            }

            secondNavDom.push(
                <li key={i + secondLi} className={classNames} onClick={this.handleClickGame.bind(this, secondLi, tag)}>
                    <i className='navIcon' style={{ "backgroundImage": `url(${window.config.prdImgUrl + secondLi.IconUrl})` }}></i>
                    {secondLi.SubTitle || secondLi.Title}
                </li>
            )
        }
        return secondNavDom;
    }
    onLogout() {
        new window.actions.LogoutAction().fly(() => {
            browserHistory.push("/");
        });
    }
    render() {
        const site = this.props.backConfigs.SiteMainUrl || "";
        return (
            <header className='header'>
                <div className='header-inner-top clearfix'>
                    <div className='pr w1000 mAuto'>
                        <div className='top-link-wrap fl'>
                            <span className='header-time'>官方地址:{site}</span>
                            <a href="javascript:Util.AddFavorite('新葡京官网');" className="blink">收藏本站</a>
                            {/* <a href="/nav.html" target="_blank" className="blink">备用网址</a> */}
                            <a href="/help.html" target="_blank" className="blink">帮助中心</a>
                            <a href="/agent.html" target="_blank" className="ApplyAgent">申请代理</a>
                        </div>
                        <div className='timer-header'>
                            <span>美东时间:</span>
                            <span>{this.state.nowTime}</span>
                        </div>
                    </div>
                </div>
                {/* style={document.documentElement.scrollTop>40?{"position":"fixed"}:{"position":"relative"}} */}
                <div className='nav-top'>
                    <div className='pr w1000 mAuto clearfix navWrap'>
                        <div className='logo'>
                            <Link to="/">
                                <img src={require('./images/logo-head.png')}></img>
                            </Link>
                        </div>
                        <div className='pagcor'>
                            <img src={require('./images/pagcor.png')}></img>
                        </div>
                        <div className='links-nav'>
                            <ul className='clearfix'>
                                {this.renderNav()}
                            </ul>
                        </div>
                    </div>
                </div>
                {
                    this.props.user.token && browserHistory.getCurrentLocation().pathname !== '/' &&
                    <div className='signin-success-nav clearfix'>
                        <div className='inner clearfix'>
                            <p className="prefix">简易域名：{site} </p>
                            <ul className='account-info clearfix'>
                                <li><Link to="/member">账户中心</Link></li>
                                <li><Link to="/deposit">线上存款</Link></li>
                                <li><Link to="/withdraw">线上取款</Link></li>
                                <li><Link to="/transfer">额度转换</Link></li>
                                <li><Link to="/records">往来记录</Link></li>
                                <li><Link to="/member">账号：{this.props.user.username}</Link></li>
                                <li><a>余额：{this.props.user.amount} RMB</a></li>
                                <li onClick={() => RedAllMsg()}><Link to="/records_message">未读讯息<span>({this.props.sitemsg.unread})</span></Link></li>
                                <li><a className="logout" href="javascript:void(0);" onClick={this.onLogout.bind(this)}>退出</a></li>
                            </ul>
                        </div>
                    </div>
                }

            </header>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        mainNav: state.gameLayout.mainNav,
        backConfigs: state.backConfigs,
        user: state.user,
        remoteSysConfs: state.remoteSysConfs,
        sitemsg: state.sitemsg,
    }
);
export default connect(mapStateToProps)(Header)