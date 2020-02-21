import React, { Component } from 'react';
import {Link,browserHistory} from 'react-router';
import {config} from 'globalConfig'
import { connect } from 'react-redux';
import "./FirstPage.scss";
import Swiper from "swiper";
import 'swiper/dist/css/swiper.css'
import {serversOpen} from "commonFunc"

import icon04 from './images/icon-04.png';
import icon05 from './images/icon-05.png';
import icon06 from './images/icon-06.png';
import icon08 from './images/icon-08.png';
import icon10 from './images/icon-10.png';
import icon11 from './images/icon-11.png';
import icon12 from './images/icon-12.png';
import icon13 from './images/icon-13.png';
import icon14 from './images/icon-14.png';
import rank1 from './images/Ranking1.png';
import rank2 from './images/Ranking2.png';
import rank3 from './images/Ranking3.png';
import rank4 from './images/Ranking4.png';
import rank5 from './images/Ranking5.png';
import lottery1 from './images/Lottery1.png';
import lottery2 from './images/Lottery2.png';
import lottery3 from './images/Lottery3.png';
import lottery4 from './images/Lottery4.png';
import lottery5 from './images/Lottery5.png';
import lottery6 from './images/Lottery6.png';
import DateList1 from './images/datalist1.png';
import DateList2 from './images/datalist2.png';
import procedure1 from './images/procedure1.png';
import procedure2 from './images/procedure2.png';
import procedure3 from './images/procedure3.png';
import procedure4 from './images/procedure4.png';
import procedure5 from './images/procedure5.png';
import BankList1 from './images/BankList1.png';
import BankList2 from './images/BankList2.png'
import BankList3 from './images/BankList3.png'
import BankList4 from './images/BankList4.png'
import BankList5 from './images/BankList5.png'
import BankList6 from './images/BankList6.png'
import BankList7 from './images/BankList7.png'
import swal from 'sweetalert2';

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    initAll(){
        var Lottery = new Swiper('#swiper1',{
            slidesPerView: 3,
            spaceBetween: 5,
            direction: 'vertical',
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        })
        var DateList = new Swiper('#swiper2',{
            spaceBetween: 5,
            loop: true,
            autoHeight:true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.DateList-Banner .next',
                prevEl: '.DateList-Banner .prev',
            }
        })
    }
    componentDidMount() {
        this.initAll();
    
    }
    componentWillUnmount(){
     
    }
    componentDidUpdate() {
        this.initAll();
    }
    onLogin(event) {
        event.preventDefault();
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiBankAccountsAction().fly();
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiGamePlatformAllBalanceAction().fly()// 所有平台余额
            }else{
                Swal.fire(resp.Message)
            }
        });
    }
    onLogout() {
        new window.actions.LogoutAction().fly();
        browserHistory.push('/');
    }
    renderLoginForm() {
        return (
            <form id="login-form" onSubmit={this.onLogin.bind(this)}>
                <div className="inputDiv">
                    <span>账号</span>
                    &nbsp;|
                    <input type="text" ref="username"  id="demotestid2" className="account-input input-type border-type" placeholder="用户名"/>
                </div>
                <div className="inputDiv">
                    <span>密码</span>
                    &nbsp;|
                    <input type="password" ref="password" className="pwd-input input-type border-type" placeholder="密码"/>
                </div>
                <div className="loginTips">
                    <div className="left">
                        {this.state.errorMessage?<span className="errorMessage">{this.state.errorMessage}</span>:null}
                    </div>
                    <div className="right">
                        <a onClick={()=>{serversOpen(this.props.remoteSysConfs.channel_push_url)}} className="forget">
                            忘记密码？
                        </a>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="loginBtn">
                    <button type="submit" className="loginBt">登录</button>
                    <Link to="/register" className="regBt">免费开户</Link>
                </div>
                <div className="clear"></div>
            </form>
        );
    }
    renderUserInfo() {
        const user = this.props.user;
        return (
            <div className="userInfo">
                <p className="memberItem">欢迎<b>{user.username}</b></p>
                <ul>
                    <li>
                        <Link to="/records_message" >
                            <span>消息中心({this.props.sitemsg.unread})</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/withdrawAndDeposit" >
                            <span>我要存款</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/member" >
                            <span>会员中心</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/withdrawAndDeposit/withdraw" >
                            <span>我要取款</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/transfer" >
                            <span>额度转换</span>
                        </Link>
                    </li>
                </ul>
                <a  onClick={this.onLogout.bind(this)}>安全退出</a>
            </div>
        );
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }


    onClickGame(game) {
        if (!window.actions.auth()) {
            return;
        }
        let GameType = '';
        if(game.PlatformId=="MG2"){
            GameType = 'casino'
        }else{
            GameType = 'Trueman'
        }
        let parma = {
            GamePlatform:game.PlatformId,
            GameType:GameType,//Trueman
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen("Casino");
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    showNotice(){
        window.$("#noticeModal").modal("show");
    }
    radomNum(index=1){
        var num="";
        for(var i =0; i<index ; i++){
            if(i==(index-1) && random()=="0"){
                num+=random()-0+1+""
            }
            num+=random()
        }
        function random(){
            return parseInt(Math.random()*10).toString()
        }
        return num;
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        let notice="";
        this.props.notices.forEach((item,index)=>{
            notice += item.Title+":"+item.Content;
        });
        return (
            <div className="firstPage ">
                {ImageGallery&&<ImageGallery height="395px" imgtype='slider'></ImageGallery>}
                <div className="pr w1000 mAuto">
                    <div className="login_BG"></div>
                    <div className="loginDiv">
                        <div className="tIcon"></div>
                        {this.props.user.token?this.renderUserInfo():this.renderLoginForm()}
                    </div>
                    {/*产品优势*/}
                    <div className="Recommend">
                        <div className="Recommend_title">
                            <span className="Recommend_titsp"></span>
                            <div className="right newDiv">
                                <span className="newsImg left"></span>
                                <span className="more left">公告详情滚动：</span>
                                <div className="marquee">
                                    <marquee ref="notice1" direction="left"  onMouseOver={(ele)=>{this.refs.notice1.stop();}} onMouseOut={(ele)=>{this.refs.notice1.start();}} className="NewNoticeList color-highlight">
                                        <a onClick={this.showNotice.bind(this)} className="app_color">
                                            {notice}
                                        </a>
                                    </marquee>
                                </div>
                            </div>
                        </div>
                        <div className="Recommend_bd">
                            <div className="div330 left mr5">
                                <div className="Recommend_div div163 h163 mr4">
                                    <img src={icon04} width="163" height="163" />
                                    <span className="bbin">台湾厅.BBIN<br/><i>{this.radomNum(4)}人在玩</i></span>
                                    <div className="mask w163 h163">
                                        <Link to="/casino" className="info">进入游戏</Link>
                                    </div>
                                </div>
                                <div className="Recommend_div div163 h163 ">
                                    <img src={icon06} width="163" height="163" />
                                    <span className="pt">MG老虎机<br/><i>{this.radomNum(4)}人在玩</i></span>
                                    <div className="mask w163 h163">
                                        <Link to="/MG" className="info">进入游戏</Link>
                                    </div>
                                </div>
                                <div className="Recommend_div w330 h163 third-effect">
                                    <img src={icon05} width="330" height="163"/>
                                    <span className="ag">PT老虎机&nbsp;<i>{this.radomNum(4)}人在玩</i></span>
                                    <div className="mask w330 h163">
                                        <Link to="/PT"  className="info" >进入游戏</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="div330 left mr5">
                                <div className="Recommend_div w330 h163">
                                    <img src={icon11} width="330" height="163"/>
                                    <span className="ag">银河厅.AG&nbsp;<i>{this.radomNum(4)}人在玩</i></span>
                                    <div className="mask w330 h163">
                                        <Link to="/games/tab=AG"  className="info" >进入游戏</Link>
                                    </div>
                                </div>
                                <div className="Recommend_div w163 h163 mr4 ">
                                    <img  src={icon13} width="163" height="163" />
                                    <span className="ty2">体育投注<br/><i>{this.radomNum(4)}人在玩</i></span>
                                    <div className="mask w163 h163">
                                        <Link to="/sport"  className="info" >进入游戏</Link>
                                    </div>
                                </div>
                                <div className="Recommend_div w163 h163  ">
                                    <img  src={icon14} width="163" height="163" />
                                    <span className="ty2">奥洲厅.PT<br/><i>{this.radomNum(4)}人在玩</i></span>
                                    <div className="mask w163 h163">
                                        <Link to="/games/tab=PT"  className="info" >进入游戏</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="div330 left">
                                <div className="Recommend_div div163 h163 mr4">
                                    <img src={icon08} width="163" height="163" />
                                    <span className="bbin">棋牌游戏<br/><i>{this.radomNum(4)}人在玩</i></span>
                                    <div className="mask w163 h163">
                                        <Link to="/streetMachine" className="info">进入游戏</Link>
                                    </div>
                                </div>
                                <div className="Recommend_div div163 h163 ">
                                    <img src={icon10} width="163" height="163" />
                                    <span className="pt">美洲厅.QT<br/><i>{this.radomNum(4)}人在玩</i></span>
                                    <div className="mask w163 h163">
                                        <Link to="/games/tab=QT" className="info">进入游戏</Link>
                                    </div>
                                </div>
                                <div className="Recommend_div w330 h163 third-effect">
                                    <img src={icon12} width="330" height="163"/>
                                    <span className="ag">快乐彩 时时彩&nbsp;<i>{this.radomNum(4)}人在玩</i></span>
                                    <div className="mask w330 h163">
                                        <Link to="/bingo"  className="info" >进入游戏</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*游戏彩池*/}
                    <div className="Recommend ">
                        <div className="Recommend_title">
                            <span className="Gamepot_titsp"></span>
                        </div>
                        <div className="Recommend_bd Gamepot_Div">
                            <div className="Ranking left">
                                <div className="Ranking-title">
                                </div>
                                <ul className="RankingUl" id="jackpotList">
                                    <li>
                                        <div className="li-left">
                                            <span className="First"></span>
                                        </div>
                                        <img className="left" src={rank1} />
                                            <div className="RankingInfo">
                                                <div className="RankingName">奖金巨人</div>
                                                <p>￥<span id="jpt_0" className="jackpot">85,902,416</span></p>
                                            </div>
                                    </li>
                                    <li>
                                        <div className="li-left">
                                            <span className="Second"></span>
                                        </div>
                                        <img className="left" src={rank2} />
                                            <div className="RankingInfo">
                                                <div className="RankingName">海滩人生</div>
                                                <p>￥<span className="jackpot">65,501,316</span></p>

                                            </div>
                                    </li>
                                    <li>
                                        <div className="li-left">
                                            <span className="Third"></span>
                                        </div>
                                        <img className="left" src={rank3}/>
                                            <div className="RankingInfo">
                                                <div className="RankingName">疯狂水果</div>
                                                <p>￥<span  className="jackpot">52,002,654</span></p>
                                            </div>
                                    </li>
                                    <li>
                                        <div className="li-left">
                                            <span className="Fourth"></span>
                                        </div>
                                        <img className="left" src={rank4} />
                                            <div className="RankingInfo">
                                                <div className="RankingName">角斗士彩池游戏</div>
                                                <p>￥<span className="jackpot">33,251,289</span></p>
                                            </div>
                                    </li>
                                    <li>
                                        <div className="li-left">
                                            <span className="Fifth"></span>
                                        </div>
                                        <img className="left" src={rank5}/>
                                            <div className="RankingInfo">
                                                <div className="RankingName">泰国佛寺</div>
                                                <p>￥<span className="jackpot">25,502,626</span></p>
                                            </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="Lottery left">
                                <div className="swiper-container tempWrap " id="swiper1">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <img src={lottery1} />
                                            <br/>
                                            <div className="LotteryUl-div">
                                                恭喜summ**we在188体育足球中喜获 <strong className="color-fco">2,871,123元</strong>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <img src={lottery2} />
                                            <br/>
                                            <div className="LotteryUl-div">
                                                恭喜王**先生在HG百家乐游戏中喜获 <strong className="color-fco">1,113,335元</strong>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <img src={lottery3} />
                                            <br/>
                                            <div className="LotteryUl-div">
                                                恭喜**00在时时彩游戏中喜获 <strong className="color-fco">721,346元</strong>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <img src={lottery4} />
                                            <br/>
                                            <div className="LotteryUl-div">
                                                恭喜陈**先生在皇冠体育足球游戏中喜获 <strong className="color-fco">213,152元</strong>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <img src={lottery5} />
                                            <br/>
                                            <div className="LotteryUl-div">
                                                恭喜何**女士在古墓丽影游戏中喜获  <strong className="color-fco">558,621元</strong>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <img src={lottery6} />
                                            <br/>
                                            <div className="LotteryUl-div">
                                                恭喜numm**12在古怪猴子游戏中喜获 <strong className="color-fco">656,112元</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="DateList left">
                                <div className="DateList-div">
                                    <div className="DateList-top">
                                        <div className="size">银河最近<strong>24H</strong>数据</div>
                                        <div className="size2">THE 24 HOURS</div>
                                    </div>
                                    <div className="DateListBd">
                                        <ul className="DateListBdUl">
                                            <li>
                                                <div>
                                                    <span className="DateList01"></span>24小时活跃用户数
                                                </div>
                                                <div className="progressbar">
                                                    <div id="bd1" className="bar" style={{width:'60%'}}>
                                                        <span  className="time">28,494</span>人
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <span className="DateList02"></span>24小时累计注单量
                                                </div>
                                                <div className="progressbar">
                                                    <div id="bd2" className="bar"  style={{width:'40%'}}>
                                                        <span className="time">11,033,294</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <span className="DateList03"></span>24小时累计存款数
                                                </div>
                                                <div className="progressbar">
                                                    <div id="bd3" className="bar"  style={{width:'80%'}}>
                                                        <span className="time">31,348</span>笔/
                                                        <span  className="time">840</span>每笔
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <span className="DateList04"></span>24小时累计派奖
                                                </div>
                                                <div className="progressbar">
                                                    <div id="bd4" className="bar"  style={{width:'70%'}}>
                                                        <span className="time">18,343,119</span>元
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="DateList-Banner">
                                    <div className="swiper-container tempWrap " id="swiper2">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <img src={DateList1} />
                                            </div>
                                            <div className="swiper-slide">
                                                <img src={DateList2} />
                                            </div>
                                        </div>
                                        <div className="prev"></div>
                                        <div className="next"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*游戏流程*/}
                    <div className="procedure-div">
                        <div className="procedure-div-pro left">
                            <div className="procedure-top">
                                <span className="procedure-tit left"></span>
                                <span className="procedure-div-pro-wel right">
                                    {config.appName}欢迎你的到来！<Link to="/register">点我加入</Link>
                                </span>
                            </div>
                            <div className="procedure-div-pro-p clear">
                                <div className="procedure-list">
                                    <div><img src={procedure1} /></div>
                                    免费开户
                                </div>
                                <span className="rt_arrow"></span>
                                <div className="procedure-list">
                                    <div><img  src={procedure2} /></div>
                                    绑定资料
                                </div>
                                <span className="rt_arrow"></span>
                                <div className="procedure-list">
                                    <div><img src={procedure3} /></div>
                                    存款入账
                                </div>
                                <span className="rt_arrow"></span>
                                <div className="procedure-list">
                                    <div><img src={procedure4} /></div>
                                    游戏投注
                                </div>
                                <span className="rt_arrow"></span>
                                <div className="procedure-list">
                                    <div><img src={procedure5} /></div>
                                    提款到账
                                </div>
                            </div>
                            <div className="download-div">
                                <span className="download-tit left"></span>
                                <div className="left">
                                    <a href={this.props.remoteSysConfs.channel_push_url} target="_blank"><span className="icon-AG"></span>AG下载</a>
                                    <a href={this.props.remoteSysConfs.channel_push_url} target="_blank"><span className="icon-PT"></span>PT下载</a>
                                    <a href={this.props.remoteSysConfs.channel_push_url} target="_blank"><span className="icon-MG"></span>MG下载</a>
                                    <a href={this.props.remoteSysConfs.channel_push_url} target="_blank"><span className="icon-QG"></span>QG下载</a>
                                </div>
                            </div>
                        </div>
                        <div className="right DepositTime ">
                            <div className="DepositTime-div">
                                <div className="DepositTime-top">
                                    <div className="left">
                                        <div className="DepositTime-name">存款到账</div>
                                        <div className="average ">平均时间</div>
                                    </div>
                                    <div className="right martop">
                                        <span className="time">9秒</span>
                                    </div>
                                </div>
                                <div className="progressbar2 clear">
                                    <div id="bd5" className="bar2" style={{width:'69%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="DepositTime-div">
                                <div className="DepositTime-top">
                                    <div className="left">
                                        <div className="DepositTime-name">取款到账</div>
                                        <div className="average ">平均时间</div>
                                    </div>
                                    <div className="right martop">
                                        <span className="time">1分49秒</span>
                                    </div>
                                </div>
                                <div className="progressbar2 clear">
                                    <div id="bd6" className="bar2"  style={{width:'49%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="Bank">
                                <div className="left">
                                    <span className="DepositTime-name">支持主流支付与银行</span>
                                    <span className="time">36</span><span className="time2">家</span>
                                </div>
                                <a className="right more2">更多</a>
                            </div>
                            <div className="BankList clear">
                                <img src={BankList1} />
                                <img src={BankList2} />
                                <img src={BankList3} />
                                <img src={BankList4} />
                                <img src={BankList5} />
                                <img src={BankList6} />
                                <img src={BankList7} />
                            </div>
                        </div>
                    </div>
                    {/*安全保障*/}
                    <div className="safe-div clear">
                        <div className="safe-div-safe">
                            <span className="safe-div-safe-span">安全保障</span>
                            <span className="safe-div-info">全程数据加密，海岸门博彩监管，保障你的账户安全。</span>
                        </div>
                        <div className="safe-div-tec">
                            <span className="safe-div-safe-span">技术领先</span>
                            <span className="safe-div-info">以全网主流平台接入为主要特点，整合全网最优资源。</span>
                        </div>
                        <div className="safe-div-pt">
                            <span className="safe-div-safe-span">最大博彩平台</span>
                            <span className="safe-div-info">亚洲起步最早，用户基数最大，交易量最高，用户首选的博彩交易平台。</span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        views:state.views,
        sitemsg: state.sitemsg,
        global: state.global,
        bestGames: state.game.bestGames,
        casinos:state.views.casinos,
        notices:state.notices,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(FirstPage)