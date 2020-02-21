/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                首页-业务逻辑难度为：★★
          
*/



import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { Carousel, NoticeBar, NavBar } from 'antd-mobile';
import { config } from "globalConfig";
import BScroll from "better-scroll";
import "./FirstPage.scss";

class FirstPage extends Component {
    state = {
        imgHeight: "3rem",
        refreshing: false,
        down: true,
        closable: false,
        depositModalShow: false,//是否显示充值弹出层
        transferModalShow: false,//是否显示转入弹出层
        test: false,
    }
    constructor(props) {
        super(props)
        if (props.wapAdsList.length > 0) {
            this.state.test = true;
        }
    }
    openSildeBar() {
        this.props.params.openSilde()
    }
    //渲染头部导航右侧部分
    renderRightCon() {
        let number = this.props.sitemsg.unread || 0;
        let dom = [];
        if (this.props.user.token) {
            dom = [
                <Link to='/siteLetter' className="userInfo" key='info'>
                    <i className="title-message">
                        <span>{number > 99 ? "99+" : number}</span>
                    </i>
                </Link>
            ]
        } else {
            dom = [
                <Link className='beforeLogin loginBut' to='/login' key='login'>登录</Link>,
                <Link className='beforeLogin regBut' to='/register' key='reg'>注册</Link>
            ]
        }
        return dom;
    }
    //公告渲染
    renderNotice() {
        let notice = [];
        this.props.notices.forEach((item, index) => (
            notice.push(
                <span key={index}>{item.Content.replace(/(&nbsp;|\s){1}|<[^>]+>/g, "")} </span>
            )
        ))
        return notice;
    }
    openBanner(link) {
        if (!link) return;
        if (config.isApp) {
            window.Util.appOpen(link)
        } else {
            window.open(link, '_blank');
        }
    }
    // 轮播
    renderBanner() {
        let banner = [];
        this.props.wapAdsList.forEach((img, index) => (
            banner.push(
                <a
                    key={img.Id}
                    onClick={this.openBanner.bind(this, img.Link)}
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                    <img
                        key={index}
                        src={config.devImgUrl + img.ImgUrl}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                    />
                </a>
            )
        ))
        return banner;
    }
    closeable() {
        this.setState({
            closable: true
        })
    }
    downLoad() {
        window.open(this.props.remoteSysConfs.channel_push_url, "_blank");
    }
    // 拉动刷新
    reload() {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.setState({ refreshing: false })
        }, 1000);
    }

    componentDidMount() {
        // //初始化滚动插件
        window.homeScroll = new BScroll(this.refs.wrapper, {
            click:true
        })
    }



    componentWillReceiveProps() {
        if (this.props.wapAdsList.length > 0) {
            this.setState({
                test: true
            })
        }
    }

    render() {
        let isShowdownLoad = this.state.closable || config.isApp;
        const HomeGameList = window.r.get("HomeGameList");
        let { imagesConfig } = this.props;
        return (
            <div className={window.config.spec+" firstPage"}>
                <NavBar
                    mode="light"
                    icon={<img style={{ "width": ".45rem", "height": ".45rem" }} src={require("../../images/hamburger.png")} />}
                    onLeftClick={this.openSildeBar.bind(this)}
                    rightContent={this.renderRightCon()}>
                    <img src={config.devImgUrl + imagesConfig.WAPLogo} className='logo' />
                </NavBar>
                <div className="wrapper" ref="wrapper">
                    <div className="content">
                        {
                            <Carousel autoplay={this.state.test} infinite>
                                {this.renderBanner()}
                            </Carousel>
                        }
                        {
                            isShowdownLoad ? null :
                                <div className="downAPP">
                                    <span>下载手机APP体验更多</span>
                                    <a onClick={this.downLoad.bind(this)} className="downAPP-btn">下载手机APP</a>
                                </div>
                        }
                        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }} onClick={() => window.wapHistoryType.push('/PlatFromAnnounce')}>
                            {this.renderNotice()}
                        </NoticeBar>
                        <HomeGameList />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        notices: state.notices,
        wapAdsList: state.wapAdsList,
        remoteSysConfs: state.remoteSysConfs,
        wapCategory: state.wapCategory,
        wapPage: state.wapPage,
        platforms: state.game.platforms,
        homeCategores: state.wapCategores.mobileHomeCategories,
        mobileHomeMore: state.wapCategores.mobileHomeMore,
        sitemsg: state.sitemsg,
        noticesUnRead: state.noticesUnRead,
        imagesConfig: state.imagesConfig,
    }
);

export default connect(mapStateToProps, {})(FirstPage)