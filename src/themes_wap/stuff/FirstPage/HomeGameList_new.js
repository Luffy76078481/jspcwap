/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                游戏组件-业务逻辑难度为：★★★★
          
*/


import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Icon, Toast, Modal} from 'antd-mobile';
import {wapAuth} from 'globalAction';
import "./HomeGameList.scss";
import {config} from "globalConfig";
// import {Tabs, WhiteSpace, Badge} from 'antd-mobile';
import Swiper from "swiper"; // 滑动插件
import 'swiper/dist/css/swiper.min.css'
var galleryThumbs,galleryTop,handleGame;
class HomeGameList extends Component {
    constructor(){
        super();
        this.state = {
            flag:false,
        }
    }
    componentDidMount(){
        if(this.props.wapHomeGames.length>0){
            this.init();
        }
    }
    componentDidUpdate(){
        if(this.state.flag){
            this.init();
            this.state.flag = false;
        }
    }
    init(){
        if(galleryThumbs){
            galleryThumbs.destroy(true)
            galleryTop.destroy(true)
        }
        //实例化滑动插件
        galleryThumbs = new Swiper('#gallery-top', {
            initialSlide:window.tabIndex?window.tabIndex:0,
            spaceBetween: 10,
            slidesPerView: 5,
            loop: true,
            freeMode: true,
            loopedSlides: 9,
            watchSlidesVisibility: true,
            // centeredSlides : true,  ///点击选中的居中
            // slideToClickedSlide: true,//点击选中的居中
            watchSlidesProgress: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                },
        });
        galleryTop = new Swiper('#gallery-thumbs', {
            initialSlide:window.tabIndex?window.tabIndex:0,
            spaceBetween: 10,
            loop:true,
            loopedSlides: 9, //looped slides should be the same
            thumbs: {
                swiper: galleryThumbs,
            },
            // shortSwipes : false,//默认允许短切换。设置为false时，只能长切换，进行快速且短距离的滑动无法触发切换。
            // touchRatio : 2,//触摸比例。触摸距离与slide滑动距离的比率。
            // longSwipesRatio : 0.2,
            threshold : 5,
            on: {
                slideChangeTransitionStart: function(){
                    this.slideToLoop(this.realIndex, 500, false);
                    this.updateSize();
                    window.tabIndex = this.realIndex;
                    this.update()
                },
              },
        });
        // window.homeScroll.refresh();     
    }
    componentWillReceiveProps(nextProps){
        if(this.props.wapHomeGames.length != nextProps.wapHomeGames.length || 
            this.props.user.token != nextProps.user.token || 
            this.props.recentlyGames.length != nextProps.recentlyGames.length 
            ||
            this.props.favoritesIds != nextProps.favoritesIds
        ){
            if(this.props.user.token != nextProps.user.token){
                //如果登录状态改变了下标默认到第一个
                window.tabIndex = 0
                this.setState({
                    flag:true,
                })
            }else{
                this.setState({
                    flag:true,
                })
            }       
        }
    }
    renderTop(){//导航栏
        let topList = [];
        for(let i = 0;i < this.props.wapHomeGames.length;i++){//循环游戏或平台
            topList.push(
                <div key={i} className="swiper-slide">
                    <div className="swiper-tabBox">
                        <span className="tabicon">
                            <i className={`icon iconfont  ${this.props.wapHomeGames[i].ClassName}`}></i>
                        </span>
                        <span className="tabfont">
                            {this.props.wapHomeGames[i].Title}
                        </span>
                    </div>
                
                </div>
            )
        }
        if(this.props.user.token){//用户已登录、渲染最爱和最近游戏
            topList.unshift(
                <div key="recently" className="swiper-slide">
                    <div className="swiper-tabBox">
                        <span className="tabicon">
                            <i className="icon iconfont icon-zuijin1"></i>
                        </span>
                        <span className="tabfont">
                            最近
                        </span>
                    </div>
                </div>
            )
            topList.push(
                <div key="favoritesIds" className="swiper-slide">
                    <div className="swiper-tabBox">
                        <span className="tabicon">
                            <i className="icon iconfont icon-favourite2"></i>
                        </span>
                        <span className="tabfont">
                            最爱
                        </span>
                    </div>
                </div>
            )
        }
        return topList;
    }
    renderContent(){//导航对应主体
        let conList = [];
        for(let i = 0;i < this.props.wapHomeGames.length;i++){
            conList.push(
                <div key={i} className="swiper-slide">
                    {
                       this.switchGameType(this.props.wapHomeGames[i])
                    }
                </div>
            )
        }
        if(this.props.user.token && this.props.recentlyGames && this.props.favoriteGames){//用户已登录、渲染最爱和最近游戏
            if(this.props.recentlyGames.length>0){//在数组头部添加最近游戏
                //最近游戏
                conList.unshift(
                    <div key="recen" className="swiper-slide">
                        {
                            this.switchGameType(this.props.recentlyGames,true)
                        }
                    </div>
                )
            }else{
                conList.unshift(
                    <div key="norecen" className="swiper-slide text">
                        没有最近游戏~~
                    </div>
                )
            };
            if(this.props.favoriteGames.length>0){//在尾部添加最爱游戏
                //最爱游戏
                conList.push(
                    <div  key="favo"  className="swiper-slide">
                        {
                            this.switchGameType(this.props.favoriteGames,true)
                        }
                    </div>
                )
            }else{
                conList.push(
                    <div key="nofav" className="swiper-slide text">
                        没有添加最爱游戏~~
                    </div>
                )
            };
        }    
        return conList;
    }
    switchGameType(data,flag){//具体平台、游戏处理
        if(flag && data.length>0){//此时进来的为最爱或最近
            return this.games(data,false);
        }else if(data.Games && data.Games.length>0){//返回的是游戏，可以直接进入
            return this.games(data.Games,false);
        }else if(data.Data && data.Data.length>0){//返回的是平台，还需要进入下一级内页
            return this.games(data.Data,true);
        }else{
            return <div className="text">没有更多数据了~~</div>
        }
    }
    games(data,notGame){//渲染游戏
        let gameList = [];
        data.forEach((item, index) => {
            let favoriteBtn;
            let itemId = "";
            if (item.FilterGame) {
                itemId = item.GameId;
            } else {
                itemId = item.Id;
            }      
            if (this.props.favoritesIds && this.props.favoritesIds.indexOf(itemId) > -1) {    
                favoriteBtn = (
                    <div onClick={this.gameRemoveFavorite.bind(this, item)} className="gameInfo removeFavorite">
                        <i className="icon icon-star"/>
                        {item.IsNew?<i className="icon icon-new"></i>:null}
                        {item.IsHot?<i className="icon icon-hot"></i>:null}
                    </div>
                )
            }else {
                if (item.Id) {       
                    favoriteBtn = (
                        <div onClick={this.gameAddFavorite.bind(this, item)} className="gameInfo removeFavorite">
                            <i className="icon icon-star-empty"/>
                            {item.IsNew?<i className="icon icon-new"></i>:null}
                            {item.IsHot?<i className="icon icon-hot"></i>:null}
                        </div>
                    )
                }else {
                    favoriteBtn = (
                        <div className="gameInfo removeFavorite">
                            <i className="icon"/>
                            {item.IsNew?<i className="icon icon-new"></i>:null}
                            {item.IsHot?<i className="icon icon-hot"></i>:null}
                        </div>
                    )
                }
            }
            let imgUrl = item.IconUrl ? item.IconUrl : item.ImageUrl2;
            //标记需要进入下一级路由的
            item.category = notGame;
            if( item.GamePlatform!==undefined&&!!!this.props.user.token && item.GamePlatform.indexOf('188')!==-1){
            }else{
                gameList.push(
                    <div className="listGame" key={index} onClick={this.canPlay.bind(this, item)}>
                        {favoriteBtn}
                        <img className="image" src={config.devImgUrl + imgUrl} alt=""/>
                        <label>{item.Title ? item.Title : item.Name}</label>
                    </div>
                )
            }
           
           
        })      
        
        return gameList;

    }

    canPlay(game) {
        event.preventDefault();
        event.stopPropagation();
        
        if (game.category) {//标记需要进入下一级路由的
            if (game.GameId) {
                this.toPlayGame(game.Game)
            } else {
                // window.wapHistoryType.push('/allGame/' + game.Tag)  如果要用新接口应该这么写
                //暂时用老接口，确实不想改内页了
                window.wapHistoryType.push('/allGame/' + game.Games[0].GamePlatform + '&' + game.Games[0].GameType + '&' + game.Title)
            }
            return false;
        } else {
            this.toPlayGame(game)
        }
    }

    toPlayGame(game) {
        if (!wapAuth(true)) return false;
        let _this = this;
        let currentBalance = 0;
        let totalAmount = parseInt(this.props.user.amount) > 1 ? parseInt(this.props.user.amount) : 0;
        for (var i = 0; i < this.props.platforms.length; i++) {
            let _thisBalance = this.props.platforms[i].Balance ? parseInt(this.props.platforms[i].Balance) : 0;
            totalAmount += _thisBalance;
            if (this.props.platforms[i].ID === game.GamePlatform) {
                currentBalance = _thisBalance;
            }
        }
        handleGame = game;
        // if(totalAmount < 1){
        //     this.setState({
        //         depositModalShow: true
        //     })
        // }
        if (this.props.user.AutoTransfer) {
            _this.getGameUrl(handleGame, true);
        } else {
            _this.getGameUrl(game);
        }
        // if(currentBalance < 1) {
        //     if(this.props.user.AutoTransfer) {
        //         _this.getGameUrl(game, true);
        //     }else {
        //         this.setState({
        //             transferModalShow: true
        //         })
        //     }
        // }else {
        //     _this.getGameUrl(game)
        // }
    }

    getGameUrl(game, TransferFlag = false) {
        let parma = {
            GamePlatform: game.GamePlatform,
            GameType: game.GameTypeText,
            GameId: game.GameIdentify,
            IsMobile: true,
            IsDemo: false,
        }
        Toast.loading('游戏地址获取中...', 300);
        let windowOpen;
        if (!config.isApp) {
            windowOpen = window.Util.windowOpen('Game');
        }
        new window.actions.ApiGetLoginUrl(parma, '(mobile)', TransferFlag).fly(res => {
            Toast.hide();
            if (res.StatusCode === 0) {
                let gameLink = res.GameLoginUrl;
                if (TransferFlag) {
                    new window.actions.ApiPlayerInfoAction().fly();
                    new window.actions.ApiGamePlatformAllBalanceAction().fly();
                }
                if (!config.isApp) {
                    windowOpen.location.href = gameLink;
                } else {
                    window.Util.appOpen(gameLink)
                }
            } else {
                if (!config.isApp) {
                    windowOpen.urlError(res.Message);
                } else {
                    Modal.alert(res.Message)
                }
            }
        })
    }


    gameAddFavorite(item, event) {
        event.preventDefault();
        event.stopPropagation();
        if (!wapAuth(true)) return false;
        Toast.loading(item.Title + '收藏中..', 300);
        new window.actions.ApiAddFavoriteAction(item.Id).fly(resp => {
            Toast.hide();
            if (resp.StatusCode !== 0) {
                Modal.alert("添加失败！", resp.Message);
            }
            else{
                new window.actions.ApiGetFavoritesAction().fly();
            }
        });
    }
    gameRemoveFavorite(item, event) {
        event.preventDefault();
        event.stopPropagation();
        Toast.loading(item.Title + '删除收藏中..', 1000);
        new window.actions.ApiDeleteFavoriteAction(item.Id).fly(resp => {
            Toast.hide();
            if (resp.StatusCode !== 0) {
                Modal.alert("删除收藏失败！", resp.Message);
            }
            else{
                new window.actions.ApiGetFavoritesAction().fly();
            }
        });
    }
    render(){
        return(
            <div className="HomeGameBox">
                <div className="swiper-container gallery-top" id="gallery-top">
                    <div className="swiper-wrapper">
                        {this.renderTop()}
                    </div>
                    <div className="swiper-button-next swiper-button-white"></div>
                    <div className="swiper-button-prev swiper-button-white"></div>
                </div>
                <div className="swiper-container gallery-thumbs" id="gallery-thumbs">
                    <div className="swiper-wrapper">
                        {this.renderContent()}
                    </div>
                </div>
                {/*转账弹出层*/}
                {
                this.state.transferModalShow &&
                <Modal
                    transparent
                    visible={this.state.transferModalShow}
                    onClose={() => {
                        this.setState({transferModalShow: false})
                    }}
                    footer={
                        [
                            {
                                text: '直接进入', onPress: () => {
                                    this.getGameUrl(handleGame);
                                    this.setState({transferModalShow: false})
                                }
                            },
                            {
                                text: '自动转入', onPress: () => {
                                    this.getGameUrl(handleGame, true);
                                    this.setState({transferModalShow: false})
                                }
                            }
                        ]
                    }
                >
                    <b style={{color: '#333'}}>您在{handleGame.GamePlatform}的余额不足，是否将资金自动转入{handleGame.GamePlatform}</b>
                </Modal>
            }       
            </div>
        )
    } 
}




const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        wapCategory: state.wapCategory,
        platforms: state.game.platforms,
        homeCategores: state.wapCategores.mobileHomeCategories,

        wapHomeGames:state.gameLayout.wapHomeGames,//首页游戏
        recentlyGames:state.recentlyGames.casinos,//最近游戏
        favoriteGames:state.user.favoriteGames,//最爱游戏
        favoritesIds:state.user.favoritesIds,//最爱游戏ID字符串

    }
);

export default connect(mapStateToProps, {})(HomeGameList)