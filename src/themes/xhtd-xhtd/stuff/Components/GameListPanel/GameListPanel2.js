/**
 * xhtd-电子游艺
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import merge from 'lodash/merge';
import "./Game2.scss";
var flag=false;

class GameListPanel extends Component {

    constructor(props) {
        super(props);
        this.inited = false;
        this.selCategory = null;
        this.initMap = {};
        this.selJackpot = false;
        let gameID = "AG";
        if(this.props.linkToGames){
            gameID = this.props.linkToGames;
        }
        this.state = {
            selCategoryMarkIds:"",
            selCategoryId: "",
            selPlatformId: gameID,
            platformListStart: 0 ,
            opL: .3,
            opR: 1,
            loading:false
        };
        if (this.props.limitPlatform) {
            this.state.selPlatformId = this.props.limitPlatform;
        }

        if (this.props.gameCategories && this.props.gameCategories.length > 0) {
            this.state.selCategoryId = this.props.gameCategories[0].id;
        }
    }

    // 游戏点击
    onClickGame(game) {
        if (!window.actions.auth()) {
            return;
        }
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen('Game');
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    // 平台类型选择
    onSelectPlatform(platform) {
        flag=true;
        this.setState({selPlatformId: platform.ID, selPlatformMarkId: platform.markId});
        this.state.selPlatformId = platform.ID;
        this.state.selPlatformMarkId = platform.markId;
        this.toPage(1);
    }



    // 平台导航
    renderPlatfromList() {
        var platformLists = [];
        for (var i = 0; i < this.props.platforms.length; i++) {
            var platform = this.props.platforms[i];
            if(!platform.ShowSlot){
                continue;
            }
            if(platform.Name2){
                if(platform.Name2 == "YOPLAY")
                continue
            }else{
                if(platform.Name == "YOPLAY")
                continue
            }
            
            platformLists.push(
                <div key={platform.ID} className={this.state.selPlatformId === platform.ID ? "list2_onchoose platform_list2" : "platform_list2"}
                     onClick={this.onSelectPlatform.bind(this, platform)}>{platform.ID}</div>
            );

        }
        return platformLists;
    }
    // 挂载完成
    componentDidMount() {
        // 传递状态
        this.componentWillReceiveProps(this.props);

        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        var web = getUrlParameter('tab');
        if(web && web!=null){
            this.setState({selPlatformId: web});
        }
    }
    // 接收
    componentWillReceiveProps(nextProps) {
        if (!this.inited) {
            if (nextProps.gameCategories && nextProps.gameCategories.length > 0) {
                this.inited = true;
                /*
                for (var i = 0; i < nextProps.gameCategories.length; i++) {
                    var gc = nextProps.gameCategories[i];
                    if (gc.name.indexOf("热门") >= 0) {
                        this.onSelectCategory(gc);
                        return;
                    }
                }
                */
                var gc = nextProps.gameCategories[0];
                this.onSelectCategory(gc);
            }
        }
    }
    // 奖池游戏
    onJackpotChanged(e) {
        this.selJackpot = e.target.checked;
        this.toPage();
    }
    // 分类导航点击
    onSelectCategory(category) {
        flag=true;
        this.setState({selCategoryMarkIds: category.MarkIds,selCategoryId:category.ID});
        this.state.selCategoryMarkIds = category.MarkIds;
        this.state.selCategoryId = category.ID;
        this.toPage(1);
    }
    // 查询
    onSearch(e) {
        e.preventDefault();
        flag=true;
        this.toPage(1);
    }
    // 游戏数据获取
    toPage(pageNo = 1) {

        let GameListPanel = window.r.props("GameListPanel");
        const pgsize = GameListPanel.pgsize  || 12;
        // 搜索值
        let searchText = this.refs.searchText.value;
        let filter = {};
        let GamePlatform="",YoPlay="";
        if(this.state.selPlatformId == "YOPLAY"){
            YoPlay=1
        }else{
            GamePlatform=this.state.selPlatformId;
        }
        new window.actions.ApiQueryGameAllCountAction(GamePlatform,YoPlay).fly();
        filter.GameMarks = [];
        filter.GamePlatform = [this.state.selPlatformId];
        if (this.state.selCategoryMarkIds) {
            filter.GameMarks.push(this.state.selCategoryMarkIds);
        }
        if (searchText) {
            filter.GameName = searchText;
        }
        if(this.selJackpot){
            filter.Jackpot = 1;
        }
        filter.GameMarks = filter.GameMarks.join(',');
        filter.GamePlatform = filter.GamePlatform.join(',');
        filter.GameType = 4;
        if(this.state.selPlatformId  == "YOPLAY"){//如果是Yoplay平台的情况下
            filter.YoPlay = 1;
            filter.GamePlatform="";
        }
        let _this = this;
        new window.actions.ApiQueryGamesAction(filter, pageNo , pgsize).fly(resp=>{
            if(resp.Page && resp.Page.length == 0){
                flag=false;
                // 本站无 显示没有搜索到的游戏
                this.refs.searchText.value = '';
                
                return;
            }else if(flag){
                flag=false;
            }         
            if(resp.StatusCode ==0){
                _this.setState({
                    loading:false
                })
            }
            else{
                window.swal('错误',resp.message,'error');
            }
        });

    }
    toNextPage() {
        if (this.props.games.pageNo >= this.props.games.totalPage) {
            return;
        }
        this.toPage(this.props.games.pageNo + 1);
        
    }
    toPrevPage() {
        if (this.props.games.pageNo <= 1) {
            return;
        }
        this.toPage(this.props.games.pageNo - 1);
    }
    // 游戏区域
    renderGames() {
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        for (var i = 0; i < this.props.games.rows.length; i++) {
            var g = this.props.games.rows[i];
            var imgUrl = window.config.prdImgUrl+g.ImageUrl;
            ret.push(
                <li key={i} className="gameItem wow gamesPic" style={{visibility: "visible", animationName: "fadeInUp",width:"30%",height:"auto"}}>
                    <a href="javascript:void(0)"><img className="gameImg" src={imgUrl} onClick={this.onClickGame.bind(this, g)}/>
                        <span className="game-text game-text-btn BGcolor-second color-second">{g.Title}</span>
                    </a>
                    <a href="javascript:void(0)" className="game-fuceng" onClick={this.onClickGame.bind(this, g)}>
                        <img className="game-start-btn"/>
                    </a>
                </li>
            );
        }
        return ret;
    }


    // 分页
    renderGamePage() {
        var ret = [];
        var invalidTag = false;
        for (var i = 1; i <= this.props.games.totalPage; i++) {
            if (i !== 1 && i !== this.props.games.totalPage && Math.abs(this.props.games.pageNo - i) >= 3) {
                invalidTag = true;
                continue;
            }
            if (invalidTag) {
                ret.push(
                    <div key={"ex" + i} className="number_icon">
                        <a　className="BGcolor-third border-type color-main" href="javascript:void(0)">...</a>
                    </div>
                )
                invalidTag = false;
            }
            ret.push(
                <div key={i} className={i === this.props.games.pageNo ? "active" : "number_icon"}>
                    <a className={i === this.props.games.pageNo ? "  border-type" : " border-type"} href="javascript:void(0)" onClick={this.toPage.bind(this, i)}>{i}</a>
                </div>
            )
        }
        return ret;
    }
    // 游戏分类
    renderCategories() {
        var ret = [];
        if (!this.state.selCategoryMarkIds && this.props.gameCategories.length > 0) {
            this.state.selCategoryMarkIds = this.props.gameCategories[0].MarkIds;
        }
        let counter = this.props.gameCounter[this.state.selPlatformId];
        if(counter!== undefined){
            for (var i = 0; i < this.props.gameCategories.length; i++) {
                var gc = this.props.gameCategories[i];
                if(counter[gc.ID]>0){
                    ret.push(
                        <li key={gc.ID}
                            className={gc.ID === this.state.selCategoryId ? "active color-highlight" : "color-main"}>
                            <a href="javascript:void(0)" onClick={this.onSelectCategory.bind(this, gc)}>{gc.Name}
                                <span className="game-text">({counter[gc.ID]})</span>
                            </a>
                        </li>
                    )
                }
            }            
        }   
        return ret;
    }

    // 渲染
    render() {
        return (
            <div className="game-list-content game-list-content2 BGcolor-main">
                <div className="container fadeInUp animated">           
                    <div className="game-list-fname2" >
                        <div className="game-list-left-nav wow" style={{visibility: "visible", animationName: "fadeInUp"}}>
                            <div className="checkJackpot">
                                <label htmlFor="option"><input onChange={this.onJackpotChanged.bind(this)} type="checkbox" name="jackpot" value="option"/>奖池游戏</label>
                            </div>
                            <ul>
                                {this.renderCategories()}
                            </ul>
                            <form onSubmit={this.onSearch.bind(this)} className="searchbar" style={{cursor:'pointer'}}>
                                <input ref="searchText" type="text" className="searchbartext" placeholder="查询游戏"/>
                                <i className="fa fa-search-minus searchBtn" aria-hidden="true" onClick={this.onSearch.bind(this)}></i>
                            </form>
                        </div>
                        <div className="game-list-mid-box" >
                            <div className="game-list-right-content">
                                {this.props.limitPlatform? []:
                                    <div className="game-list-box2">
                                        {this.renderPlatfromList()}
                                    </div>
                                }
                                <div id="GamesGridPopupMask" className="none" style={{display: "none"}}>
                                    <div id="LoadingDiv">
                                        <div className="GamePopupMask"></div>
                                    </div>
                                </div>
                                <ul className="games_box">
                                    {this.renderGames()}
                                    <div className="clear"></div>
                                    <nav id="game-page" className="wow"
                                         style={{visibility: "visible", animationName: "fadeInUp"}}>
                                        <div className="pager_box">
                                            <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toPrevPage.bind(this)}>上一页</a></div>
                                            {this.renderGamePage()}
                                            <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toNextPage.bind(this)}>下一页</a></div>
                                        </div>
                                    </nav>
                                </ul>
                            </div>
                            <div className="clear"></div>
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
        gameCategories: state.game.gameCategories,
        gameCounter: state.game.gameCounter,
        games: state.game.games,
        platforms: state.game.slot_platforms,
        linkToGames:state.linkToGames.linkToGames
    }
);

export default connect(mapStateToProps, {})(GameListPanel);