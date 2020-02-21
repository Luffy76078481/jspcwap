import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';
import { connect } from 'react-redux';
import "./NavigationBar.scss"

var mega = {};
var $activeElement;

class NavigationBar extends Component {
    constructor(){
        super();
        this.state = {

        };
    }
    initNav(){
        $('[rel]').hover(function() {
            // active[rel]，展开的元素
            $activeElement = $activeElement != undefined ?$activeElement : $('.active[rel]');
            // 元素的rel属性值
            var _rel = $(this).attr('rel');
            clearTimeout(mega[_rel + '_timer']);
            // 对象添加方法
            mega[_rel + '_timer'] = setTimeout(function() {
                // 遍历涵盖rel属性的元素
                $('[rel]').each(function() {
                    //如果等于此rel值的添加active Class,其他删除active Class
                    $(this)[_rel == $(this).attr('rel') ? 'addClass' : 'removeClass']('active');
                });
                // slideDown() 方法通过使用滑动效果，显示隐藏的被选元素。对应二级导航展开
                $('#' + _rel).stop(true, true).slideDown("300");

            }, 150);
        }, function() {
            var _rel = $(this).attr('rel');
            clearTimeout(mega[_rel + '_timer']);
            mega[_rel + '_timer'] = setTimeout(function() {
                $('[rel]').removeClass('active');
                $activeElement.addClass('active');
                $('#' + _rel).stop(true, true).slideUp(300);
            }, 150);
        });           
    }
    // 挂载 我现在改一下,再重新提交吧
    componentDidMount() {  
        this.initNav()
    }
    componentDidUpdate(){
        this.initNav()
    }
    // 渲染1级导航
    renderNav(){
        let mainNav = this.props.mainNav;
        console.log(1111111,mainNav);
        let mainNavDom = [];
        for(let i=0;i<mainNav.length;i++){
            var mainNavData = mainNav[i]
            mainNavDom.push(
                <li 
                    key={i+'xhtd'} 
                    className={"mainMenu "+mainNavData.ClassName} // 后台传入ClassName hot代热 
                    rel={mainNavData.Data?`sub-nav${i}`:""}    
                    >
                    <Link 
                        activeClassName={mainNavData.GotoUrl?"active":null}
                        to={mainNavData.GotoUrl}       
                        href={mainNavData.Tag=="mobile" && !mainNavData.GotoUrl?this.props.remoteSysConfs.channel_push_url:null}
                        target={!mainNavData.GotoUrl?"_blank":null}
                        >
                        {/* 图片图标，后台可配 */}
                        {
                            mainNavData.IconUrl &&
                            <i className='navIcon' style={{"backgroundImage": `url(${window.config.prdImgUrl+mainNavData.IconUrl})`}}></i>
                        }
                        {mainNavData.Title}
                    </Link>
                </li>
            );                    
        }
        return mainNavDom;
    }
    // 渲染2级导航
    renderSecondNav(){
        let mainNav = this.props.mainNav;
        let secondNavDom = [];
        for(let i=0;i<mainNav.length;i++){
            let mainNavData = mainNav[i]
            if(mainNavData.Data){
                secondNavDom.push(
                    <nav rel={`sub-nav${i}`} id={`sub-nav${i}`} key={`sub-nav${i}`}>
                        <div className="secondContainer">
                            <ul>
                                {
                                    this.SecondNavLi(mainNavData.Data,mainNavData.Tag)
                                }
                            </ul>
                        </div>
                    </nav>
                )               
            }
        }                
        return secondNavDom;
    }
    // 2级导航Li元素
    SecondNavLi(data,tag){
        let secondLi = [];
        for(let t=0;t<data.length;t++){
            let liData = data[t]
            secondLi.push(
                <li key={t} className={liData.ClassName} onClick={this.handleClickGame.bind(this,liData,tag)}>
                    <div className='SecondMenu' style={{"backgroundImage":`url(${window.config.prdImgUrl+liData.BackgroundImgUrl})`}}></div>
                </li> 
            )
        }
        return secondLi
    }
    // 体育，电竞，真人直接打开游戏， 电子，棋牌，彩票进入内页
    handleClickGame(games,tag){
        if(tag=="casino" || tag=="sport" || tag=="esports"){
            this.openGame(games)
        }else if(tag=="chess" || tag=="bingo"){
            this.intoPage(games,tag)
        }else if(tag=="games"){ // 电子是老电子，暂时跳路由
            this.intoGames(games)
        }else{
            return false
        }
    }
    // 跳转电子
    intoGames(game){
        window.actions.ChangeLinkID(game.Tag);
        browserHistory.push("/");
        setTimeout(() => {
            browserHistory.push("/games");
        }, 10);
    }
    // 电子API ， 这个写法比较蠢，电子页重构以前暂时这么处理
    /*
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
    */
    // 跳转内页
    intoPage(data,tag){
        window.actions.ChangeGameTabs({
            pram:data.Tag,
            link:tag
        })
    }
    // 打开游戏
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
    render(){
        return(
            <nav className='MainNavigation'>
                <div className='navContainer clearfix'>
                    <ul className="mainNav">
                        {
                            this.renderNav()
                        }
                    </ul>
                </div>
                <div className="SecondNav">
                    {
                        this.renderSecondNav()
                    }
                </div>
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