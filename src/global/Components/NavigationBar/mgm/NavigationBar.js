import React, { Component } from 'react';
import { IndexLink,Link,browserHistory } from 'react-router';
import { connect } from 'react-redux';
import "./NavigationBar.scss"

class NavigationBar extends Component {
    constructor(){
        super();
        this.state = {
            FirstNavData:"",//当前选择的一级导航
            ShowSecondNav:true
        };
    }
    // 可配导航
    renderNav(){
        let mainNav = this.props.mainNav;
        let mainNavDom = [];
        for(let i=0;i<mainNav.length;i++){
            mainNavDom.push(this.navIterator(mainNav[i],i));                    
        }
        return mainNavDom;
    }
    // 一级导航渲染
    navIterator(mainNavData,key){
        if(mainNavData.Tag=='home'){
            return(
                <li key='home' className={mainNavData.ClassName+" mainMenu"}>
                <IndexLink 
                    to={mainNavData.GotoUrl} 
                    activeClassName="active" 
                >
                    {
                        mainNavData.IconUrl &&
                        <i className='navIcon' style={{"backgroundImage": `url(${window.config.prdImgUrl+mainNavData.IconUrl})`}}></i>
                    }
                    {mainNavData.Title}
                </IndexLink>
            </li>
            )
        }else{
            return(
                <li 
                    key={key} 
                    className={"mainMenu "+mainNavData.ClassName} // 后台传入ClassName hot代热      
                    >
                    <Link 
                        activeClassName={mainNavData.GotoUrl?"active":null}
                        to={mainNavData.GotoUrl}       
                        href={mainNavData.Tag=="mobile" && !mainNavData.GotoUrl?this.props.remoteSysConfs.channel_push_url:null}
                        target={!mainNavData.GotoUrl?"_blank":null}
                        onMouseEnter={this.showChildNav.bind(this, mainNavData)} 
                        onMouseLeave={()=>{ this.setState({ShowSecondNav:false})}}
                        >
                        {/* 图片图标，后台可配 */}
                        {
                            mainNavData.IconUrl &&
                            <i className='navIcon' style={{"backgroundImage": `url(${window.config.prdImgUrl+mainNavData.IconUrl})`}}></i>
                        }
                        {mainNavData.Title}
                    </Link>
                </li>
            )            
        }
    }
    // 显示二级导航
    showChildNav(data){
        if(!!data && !!data.Data){
            this.setState({
                FirstNavData:data,
                ShowSecondNav:true
            })
        }else{
            this.setState({
                FirstNavData:null,
                ShowSecondNav:true
            })
        }
    }
    // 体育，电竞，真人直接打开游戏， 电子，棋牌，彩票进入内页
    handleClickGame(games){
        let tag = this.state.FirstNavData.Tag;
        if(tag=="casino" || tag=="sport" || tag=="esports"){
            this.openGame(games)
        }else if(tag=="chess" || tag=="bingo"){
            this.intoPage(games)
        }else if(tag=="games"){ // 电子是老电子，暂时跳路由
            this.intoGames(games)
        }else{
            return false
        }
    }
    // 跳转电子
    intoGames(game){
        this.toPage(1,game)
        setTimeout(()=>{
            browserHistory.push("/games?tab="+game.Tag);            
        })
    }
    // 电子API ， 这个写法比较蠢，电子页重构以前暂时这么处理
    toPage(pageNo = 1,game) {
        let filter = {};
        filter.GamePlatform = game.Tag;
        filter.GameType = 4;
        if(game.Tag  == "YOPLAY"){//如果是Yoplay平台的情况下
            filter.YoPlay = 1;
            filter.GamePlatform="";
        }
        new window.actions.ApiQueryGameAllCountAction(filter.GamePlatform,filter.YoPlay).fly();
        new window.actions.ApiQueryGamesAction(filter,pageNo,12).fly();

    }
    // 用于跳转内与对于2级导航下的内容，或读取内页游戏数据，
    intoPage(data){
        window.actions.ChangeGameTabs({
            pram:data.Tag,
            link:this.state.FirstNavData.GotoUrl
        })
    }
    // 打开游戏
    openGame(data){
        if (!window.actions.auth()) {
            return;
        }
        console.log(1111111,data)
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
    // 遍历二级导航
    renderScondNav(){
        return this.state.FirstNavData.Data.map((data,index)=>{
            if(!this.props.user.username && data.Tag.includes('188')){
                return false     
            }else{
                return(
                    <li key={index} onClick={this.handleClickGame.bind(this,data)} className={data.ClassName}>
                        <div className='SecondMenu' style={{"backgroundImage":`url(${window.config.prdImgUrl+data.BackgroundImgUrl})`}}></div>
                    </li> 
                )                
            }
        })
    }

    render() {
        return (
            <nav role="navigation" className="MainNavigation">
                <div className='navContainer clearfix'>
                    <ul className="mainNav">
                        {this.renderNav()}
                    </ul>
                </div>
                {
                    this.state.FirstNavData && this.state.ShowSecondNav &&
                    <div 
                        className='SecondNav'
                        onMouseEnter={()=>{ this.setState({ShowSecondNav:true})}} 
                        onMouseLeave={()=>{ this.setState({ShowSecondNav:false})}}
                    >
                        <div className='navContainer'>
                            <ul>
                                {this.renderScondNav()}
                            </ul>                
                        </div>
                    </div>
                }
            </nav>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        remoteSysConfs:state.remoteSysConfs,
        mainNav:state.gameLayout.mainNav,
     }
);

export default connect(mapStateToProps)(NavigationBar)