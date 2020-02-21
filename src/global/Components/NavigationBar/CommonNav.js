import React, { Component } from 'react';
import { IndexLink,Link,browserHistory } from 'react-router';
import {serversOpen} from "commonFunc"

export default class NavigationBar extends Component {
    constructor(props){
        super(props);
    }
    // 渲染主级导航DOM
    renderNav(){
        let mainNav = this.props.mainNav;
        let mainNavDom = [];
        for(let i=0;i<mainNav.length;i++){
            var mainNavData = mainNav[i]
            // 主导航LI样式名，配置样式名，是否是热门，是否是最新。
            let classNames = "mainMenu " + mainNavData.ClassName + (mainNavData.IsHot?" hot":"") + (mainNavData.IsNew?" new":"");
            // 主导航IndexLink，主页。
            if(mainNavData.Tag=='home'|| mainNavData.GotoUrl=='/' ){
                mainNavDom.push(
                    <li key='home' className={classNames}>
                        <IndexLink to={mainNavData.GotoUrl} activeClassName="active">
                        {
                            // 图片图标，站点：MGM
                            mainNavData.IconUrl && this.state.imgIcon &&
                            <i className='navIcon' style={{"backgroundImage": `url(${window.config.prdImgUrl+mainNavData.IconUrl})`}}></i>
                        }
                        {
                            // 字体图标，站点：XPJ,VNS
                            this.state.FontIcon?
                            <i className="glyphicon glyphicon-home f24 mt5 mr5"></i>:null  
                        }
                        {mainNavData.Title}
                        </IndexLink>
                    </li>
                )
            }else{
                mainNavDom.push(
                    <li key={i+'uzi'} className={classNames}>
                        <Link 
                            activeClassName={mainNavData.GotoUrl?"active":null}
                            to={mainNavData.GotoUrl}       
                            href={mainNavData.Tag=="mobile" && !mainNavData.GotoUrl?this.props.remoteSysConfs.channel_push_url:null}
                            target={!mainNavData.GotoUrl?"_blank":null}
                            onClick={mainNavData.Tag=="server"?()=>{serversOpen(this.props.remoteSysConfs.online_service_link)}:null}
                            onMouseEnter={ 
                                // HorizontalNav 横形二级导航
                                this.state.HorizontalNav?this.showChildNav.bind(this, mainNavData):null
                            } 
                            onMouseLeave={
                                this.state.HorizontalNav?
                                ()=>{ this.setState({ShowSecondNav:false})}:null
                            }
                            >
                            {
                                // 图片图标，站点：MGM
                                mainNavData.IconUrl && this.state.imgIcon?
                                <i className='navIcon' style={{"backgroundImage": `url(${window.config.prdImgUrl+mainNavData.IconUrl})`}}></i>
                                :null
                            }
                            {
                                // 字体图标，站点：XPJ,VNS
                                mainNavData.IconUrl.includes('glyphicon') || (this.state.FontIcon&&mainNavData.IconUrl)?
                                <i className={`mr5 glyphicon ${mainNavData.IconUrl}`}></i>:null
                            }
                            {mainNavData.Title}
                        </Link>
                        {
                            mainNavData.Data && this.state.DropNav && (!mainNavData.Games || mainNavData.Games==null)?
                            <ul className='secondNav'>
                                {
                                    this.renderSecondNav(mainNavData.Data,mainNavData.Tag)
                                }
                            </ul>:null
                        }
                    </li>
                );                    
            }
                
        }
        return mainNavDom;
    }
    // 2级导航,竖型下拉型。（包裹在LI中）
    renderSecondNav(secondNavDatas,tag){
        let secondNavDom = [];
        for(let i=0;i<secondNavDatas.length;i++){
            let secondLi = secondNavDatas[i];
            let classNames = secondLi.ClassName + (secondLi.IsHot?" hot":"") + (secondLi.IsNew?" new":"");
            if(secondLi.Tag.includes('188') && !this.props.user.username){
                continue;
            }
            secondNavDom.push(
                <li key={i+secondLi} className={classNames} onClick={this.handleClickGame.bind(this,secondLi,tag)}>
                    {secondLi.SubTitle}
                </li>
            )
        }
        return secondNavDom;
    }
    // 点击1级导航
    handleClickGame(games,tag){
        if( tag.includes("casino") || tag.includes("sport") || tag.includes("eSports") ){
            this.openGame(games)
        }else if( tag.includes("chess") || tag.includes("bingo") ){
            this.intoPage(games,tag)
        }else if( tag.includes("games") ){
            this.intoGames(games)
        }else{
            return false
        }  
    }
    // 真人，体育直接打开游戏
    openGame(data){
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:data.Games[0].GamePlatform,// 平台
            GameType:data.Games[0].GamePlatform=="MG2"?"casino":data.Games[0].GameTypeText,// 类型
            GameId: data.Games[0].GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen(parma.GameType);
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    // 跳转电子游戏
    intoGames(game){
        let Tag = game.Tag.indexOf("_")>-1?game.Tag.substr(0,game.Tag.indexOf("_")):game.Tag;
        window.actions.ChangeLinkID(Tag);
        //browserHistory.push("/");
        setTimeout(() => {
            browserHistory.push("/games");
        }, 10);
    }
    // 跳转内页
    intoPage(data,tag){
        window.actions.ChangeGameTabs({
            pram:data.Tag,
            link:tag
        })
    }
    render() {
        return (
            <nav role="navigation" className="MainNavigation">
                <ul className="mainNav">
                    {
                        this.renderNav()
                    }
                </ul>
            </nav>
        )
    }
}