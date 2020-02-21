import React, { Component } from 'react';
import {Link,browserHistory} from 'react-router';

import { connect } from 'react-redux';
import "./FirstPage.scss";
//图片
import jieji from './images/entry-page-featured-block_1.jpg';
import tiyu from './images/574x235-v2 _0.jpg';
import tiyu2 from './images/entrypage-sponsors.jpg';
import casino from './images/livedealer-revamp product tile_1.jpg'
import casino2 from './images/Ambassadors-sc.jpg'
class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state={
          notice:[],
        };

    }
    initAll() {
        // window.renderOwl(this.refs.plist, {
        //     items: 4,
        //     loop: true,
        //     dots: false,
        //     nav: true,
        //     navText: ['', ''],
        //     autoplay: true,
        //     autoplayHoverPause: true,
        //     autoplayTimeout: 3000
        // });
        // best games
        // window.renderOwl('.content-game-list', {
        //     items:1,
        //     dots:false,
        //     autoplay:true,
        //     autoplayHoverPause:true,
        //     autoplayTimeout:5000,
        //     loop:true
        // });
        window.renderOwl(".sliderBox-1",{
            loop: true,
            autoplay: true,
            items: 1,
            nav: false,
            dots:false,
            autoplayHoverPause: true,
            animateOut: 'slideOutUp',
            animateIn: 'slideInUp'
        });
        window.renderOwl(".sliderBox-2",{
            loop: true,
            autoplay: true,
            items: 1,
            nav: false,
            dots:false,
            autoplayHoverPause: true,
            animateOut: 'slideOutUp',
            animateIn: 'slideInUp'
        });
        window.renderOwl(".sliderBox-3",{
            loop: true,
            autoplay: true,
            items: 1,
            nav: false,
            autoplayHoverPause: true,
            dots:false,
            animateOut: 'slideOutUp',
            animateIn: 'slideInUp'
        });

        window.Util.index();
    }
    componentDidMount() {
        window.$("#root").attr("class", "dafaFGcss");
        this.initAll();
        document.title = "dafabet在线投注亚洲最好的在线投注网站";
    }
    componentDidUpdate() {
        this.initAll();
    }
    onClickGameLink(link) {
        window.actions.authToLink(link);
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }

    onTo(path) {
        window.scrollTo(0, 0);
        browserHistory.push(path);
    }

    onClickGame() {
        if (!window.actions.auth()) {
            return;
        }

        var gameLink = window.configHelper.getGamePlayLink('B599B11B63DA49E8911BC24B13CD0453');
        var width = 1020;
        if(this.win){
            this.win.close();
        }
        this.win = window.open(gameLink,'game',"width="+width+"px,height=700px,directories=0,alwaysRaised=0,depended=1,z-look=1,location=0, menubar=0,scrollbars=0,status=0,toolbar=0,resizable=1,left=5,top=50,screenX=350,screenY=250", true);
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");

        let notice="";
        this.props.notices.forEach((item,index)=>{
            notice += item.Title+":"+item.Content;
        });
        const FirstPagePromotionAlert = window.r.get("FirstPagePromotionAlert");
        const HijackAlert = window.r.get("hijackAlert");
        return (
            <div className="dafanewFG clearfix">
                {FirstPagePromotionAlert && <FirstPagePromotionAlert/>}
                {HijackAlert && <HijackAlert/>}
                <ImageGallery height="360px" imgtype='slider'></ImageGallery>

                <article id="pt_bg_style" className="BGcolor-main">
                    <marquee ref="notice1" direction="left"  onMouseOver={(ele)=>{this.refs.notice1.stop();}} onMouseOut={(ele)=>{this.refs.notice1.start();}} className="NewNoticeList">
                        <a data-toggle="modal" data-target="#noticeModal" className="app_color">
                            {notice}
                        </a>
                    </marquee>
                    <div id="dafa_secondSlider-1" className="dafa_secondSlider dafa_secondSlider-1 ">
                        <div className="sliderBox-1" style={{width:"100%"}}>
                            <img src={require('./images/slider-2-0.png')} style={{width:"631px"}}/>
                            <img src={require('./images/slider-2-1.png')} style={{width:"631px"}}/>
                        </div>
                    </div>
                    <div id="dafa_secondSlider-2" className="dafa_secondSlider dafa_secondSlider-2">
                        <div className="sliderBox-2" style={{width:"100%"}}>
                            <img src={require('./images/slider-3-0.png')} style={{width:"631px"}}/>
                            <img src={require('./images/slider-3-1.png')} style={{width:"631px"}}/>
                        </div>
                    </div>
                    <div id="dafa_secondSlider-3" className="dafa_secondSlider dafa_secondSlider-3">
                        <div className="sliderBox-3" style={{width:"100%"}}>
                            <img src={require('./images/slider-4-0.jpg')} style={{width:"631px"}}/>
                            <img src={require('./images/slider-4-1.png')} style={{width:"631px"}}/>
                        </div>
                    </div>
                   {/* <img src={require("./images/dafamillion-1920x100-sc.jpg")} /> */}
                </article>



                <article id="dafa_indexContent">
                    <div className="dafa_container">
                        <div className="dafa_index_box">
                            <div className="box">
                                <div className="dafa_index_title">大发老虎机娱乐场</div>
                                <img src={jieji}/>
                                <div className="dafa_index_text">
                                    欢迎来到亚洲最佳在线娱乐场，每日奖励和惊喜奉送不断！
                                </div>
                                <div className="dafa_index_cover">
                                    <div className="dafa_index_cover_btn"  onClick={this.onTo.bind(this, "/PT")}>立即参与</div>
                                </div>
                            </div>
                        </div>

                        <div className="dafa_index_box" >
                            <div className="dafa_sport-up">
                                <div className="box">
                                    <div className="dafa_index_title">大发体育</div>
                                    <img src={tiyu} />
                                    <div className="dafa_index_text">
                                        大发体育是大发新版的体育博彩，<br/>比赛结束前结算您的盈利！
                                    </div>
                                    <div className="dafa_index_cover">
                                        <div className="dafa_index_cover_btn" onClick={this.onTo.bind(this, "/sport")}>立即参与</div>
                                    </div>
                                </div>
                            </div>
                            <div className="dafa_sport-down">
                                <a href="/sport2/index.html"  target="_blank">
                                    <img src={tiyu2}/>
                                </a>
                            </div>
                        </div>

                        <div className="dafa_index_box" >
                            <div className="dafa_casino-up">
                                <div className="box">
                                    <div className="dafa_index_title">现场荷官</div>
                                    <img src={casino}/>
                                    {/*<img src="images/dafa_firstPage_img/index/casino-1.jpg"/>*/}
                                    <div className="dafa_index_text">
                                        获取1.0%返水！
                                    </div>
                                    <div className="dafa_index_cover">
                                        <div className="dafa_index_cover_btn" onClick={this.onTo.bind(this, "/casino")}>立即参与</div>
                                    </div>
                                </div>
                            </div>
                            <div className="dafa_casino-down">
                                <a href="/brand/index.html" target="_blank">
                                    <img src={casino2}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        notices:state.notices,
        user : state.user,
        views:state.views,
        global: state.global,
        bestGames: state.game.bestGames,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(FirstPage)