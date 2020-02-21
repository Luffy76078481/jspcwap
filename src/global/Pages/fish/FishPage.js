
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'swiper/dist/css/swiper.min.css'
import {FishCanvas} from "./runCanvas.js"
import * as cache from "../../../store/CacheHelper";
import "../../../plugin/libs/superSlide"
import './FishPage.scss'
var Fucking_Nmb_IE;
class FishPage extends Component {
    constructor() {
        super();
        this.state = {
            initAllFlag:true
        }     
    }
    initAll() {
        const gameLen = this.props.gameLayout.fishGame.length;
        jQuery(".fishBody").slide({
            titCell: ".slide-indicators .FishBox",
            mainCell: ".slide-inner",
            effect: "fade",
            delayTime:800,
            autoPlay: true,
            interTime: 3500,
            autoPage: false,
            trigger: "click",
            startFun: function(i) {
           
            }
        });
        Fucking_Nmb_IE = window.renderOwl('.slide-indicators', {
            items:gameLen<8?8:10,//显示个数
            dots:false,//显示圆点导航按钮
            autoplay:false,//自动轮播
            loop:false,//无缝轮播
            nav:true,//显示左右滑动箭头
        });
    }
    componentWillUnmount(){
        Fucking_Nmb_IE=null;
    }
    componentDidMount() {
        FishCanvas();
        if(this.props.gameLayout.fishGame.length < 15){
            new window.actions.PageNavAction("fish","fishGame").fly(resp=>{
                this.initAll();
            });            
        }else{
            this.initAll();
        }
    }
    // 打开游戏
    openGame(data) {
        if (!window.actions.auth()){return;}
        if(this.props.user.token){
            cache.setSession("GameParam",JSON.stringify(data))            
            return
        }
    }
    runGames() {
        return this.props.gameLayout.fishGame.map((data, index) => {
            return (
                <div key={index} className='FishCont'>
                    <div className='FishGameDescription'>
                        <h2>{data.Title}</h2>
                        {
                            data.fishLogoUrl && <img className='platlogo' src={window.config.prdImgUrl + data.fishLogoUrl} />
                        }
                        
                        <p>{data.Remark}</p>
                        <a 
                        onClick={this.openGame.bind(this, data)}
                        target={this.props.user.token?"_blank":""} 
                        href={this.props.user.token?'/games.html':'javascript:void(0)'} 
                        >
                            进入游戏</a>
                    </div>
                    <img className='bigImg swiper-lazy' src={window.config.prdImgUrl + data.ImageUrl} />
                </div>
            )
        })
    }
    runTabs() {
        return this.props.gameLayout.fishGame.map((data, index) => {
            return (
                <div key={index} className='FishBox'>
                    <img src={window.config.prdImgUrl + data.ImageUrl} />
                    <span>{data.GamePlatform}</span>
                    <span>{data.Title}</span>
                </div>
            )
        })
    }
    render() {
        return (
            <div className='NewFishPage'>
                <div id="jsi-sea-fishAnim" className="fishAnim"></div>
                <div className="fishBody">
                    <div className='mAuto pr slide-inner'>
                        {this.runGames()}                            
                    </div>
                    <div className="fishTab">
                        <div className='w1000 mAuto pr slide-indicators'>                
                            {this.runTabs()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        gameLayout: state.gameLayout,
        user: state.user,
        pageTag:state.gameTabs
    }
);

export default connect(mapStateToProps, {})(FishPage);