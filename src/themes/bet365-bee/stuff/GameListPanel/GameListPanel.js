
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './GameListPanel.scss';

class GameListPanel extends Component {
    constructor(props) {
        super(props);
        this.inited = false;
        this.selCategory = null;
        this.initMap = {};
        this.selJackpot = 0;
        let gameID = "AG";
        if(this.props.linkToGames){
            gameID = this.props.linkToGames;
        }
        this.state = {
            selCategoryMarkIds: "",
            selCategoryId: "",
            selPlatformId: gameID,
            platformListStart: 0 ,
            opL: .3,
            opR: 1
        };
        if (this.props.limitPlatform) {
            this.state.selPlatformId = this.props.limitPlatform;
        }

        if (this.props.gameCategories && this.props.gameCategories.length > 0) {
            this.state.selCategoryMarkIds = this.props.gameCategories[0].MarkIds;
            this.state.selCategoryId = this.props.gameCategories[0].ID;
        }
    }
    isLogin(val){
        if (!window.actions.auth()){return;}
        if(this.props.user.token){
            cache.setSession("GameParam",JSON.stringify(val))            
            return
        }
    }

    onSelectPlatform(platform) {
        this.setState({selPlatformId: platform.ID});
        this.state.selPlatformId =  platform.ID;
        this.toPage(1);
    }

    renderPlatfromList() {
        var platformLists = [];
        const options = window.r.props("GameListPanel");
        for (var i = 0; i < this.props.slot_platforms.length; i++) {
            var platform = this.props.slot_platforms[i];
            if(!platform.ShowSlot){
                continue;
            }
            platformLists.push(
                <div key={platform.ID} className={this.state.selPlatformId === platform.ID ? "platform_list_"+platform.ID+"_onchoose platform_list" : "platform_list_"+platform.ID+" platform_list"}
                     onClick={this.onSelectPlatform.bind(this, platform)}>
                    {!options.platformName?null:<span>{platform.Name2}</span>}
                </div>
            );

        }
        return platformLists;
    }
    componentDidMount() {
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

    componentWillReceiveProps(nextProps) {
        if (!this.inited) {
            if (nextProps.gameCategories && nextProps.gameCategories.length > 0) {
                this.inited = true;
                for (var i = 0; i < nextProps.gameCategories.length; i++) {
                    var gc = nextProps.gameCategories[i];
                }
                var gc = nextProps.gameCategories[0];
                this.onSelectCategory(gc);
            }
        }
    }
    onJackpotChanged(e) {
        if(e.target.checked){
            this.selJackpot = 1;
        }else{
            this.selJackpot = 0;
        }
        
        this.toPage();
    }
    onSelectCategory(category) {
        this.setState({selCategoryMarkIds: category.MarkIds,selCategoryId:category.ID});
        this.state.selCategoryMarkIds = category.MarkIds;
        this.state.selCategoryId = category.ID;
        this.toPage(1);
    }
    onSearch(e) {
        e.preventDefault();
        this.toPage(1);
    }
    toPage(pageNo = 1) {
        let GameListPanel = window.r.props("GameListPanel");
        const pgsize = GameListPanel.pgsize  || 20;
        let searchText = this.refs.searchText.value;
        let filter = {};
        let GamePlatform="",YoPlay='';
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
            filter.Jackpot = this.selJackpot;
        }
        filter.GameMarks = filter.GameMarks.join(',');
        filter.GamePlatform = filter.GamePlatform.join(',');
        filter.GameType = 4;
        if(this.state.selPlatformId  == "YOPLAY"){//如果是Yoplay平台的情况下
            filter.YoPlay = 1;
            filter.GamePlatform="";
        }else{
            filter.YoPlay = '';
        }
        new window.actions.ApiQueryGamesAction(filter, pageNo , pgsize).fly();

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

    renderGames() {
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        for (var i = 0; i < this.props.games.rows.length; i++) {
            var g = this.props.games.rows[i];
            var imgUrl = window.config.prdImgUrl +  (g.IconUrl?g.IconUrl:g.ImageUrl);
            ret.push(
                <li key={i} className="gameItem wow gamesPic"
                    style={{visibility: "visible", animationName: "fadeInUp",height:"auto"}}>
                    {
                        g.ShowJackpots&&g.JackpotsInfo?
                        <div className="jackPot"><span className="jackpot">
                            {toDecimalNumber(g.JackpotsInfo)}</span>CNY
                        </div>:null
                    }
                    <div className={'a'}><img className="gameImg" src={imgUrl}/>
                        <span className="game-text game-text-btn" style={{ background: window.config.spec.includes('tyc') ? '#c83434' : '#14805e' }}>{g.Title}</span>
                    </div>
                    <div className="game-fuceng" >
                        <a className="game-start-btn" 
                            target={this.props.user.token?"_blank":""} 
                            href={this.props.user.token?'/games.html':'javascript:void(0)'} 
                            onClick={this.isLogin.bind(this, g)}
                         >

                         </a>
                    </div>
                </li>
            );
        }
        return ret;
    }

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

    renderCategories() {
        var ret = [];
        if (!this.state.selCategoryMarkIds && this.props.gameCategories.length > 0) {
            this.state.selCategoryMarkIds = this.props.gameCategories[0].MarkIds;
        }
        let counter = this.props.gameCounter[this.state.selPlatformId];
       
        if (counter !== undefined) {
            for (var i = 0; i < this.props.gameCategories.length; i++) {
                var gc = this.props.gameCategories[i];
                if(counter[gc.ID]>0){
                    ret.push(
                        <li key={gc.ID}
                            className={gc.ID === this.state.selCategoryId ? "active color-highlight" : "color-main"}>
                            <a href="javascript:void(0)" onClick={this.onSelectCategory.bind(this, gc)}>{gc.Name}
                                <span className="game-text" >({counter[gc.ID]})</span>
                            </a>
                        </li>
                    )
                }
            }
        }
        return ret;
    }

    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        var options2 = window.r.props("GameListPanel");
        const height = options.gameHeight || options.height || "170px";
        return (
            <div className="game-list-content game-list-content2 BGcolor-main">
              <div className="game-list-bgbox" style={{height:"70px"}}>
                        <div className="game-list-outbox">
                            {this.props.limitPlatform? []:
                            <div className="game-list-inbox">
                                <div className="listboxhid">
                                        {this.renderPlatfromList()}
                                </div>
                            </div>}
                        </div>
                        </div>
                <div className="container fadeInUp animated">
                    {!options2.disableImageGallery?
                        <div className="banner">
                                <ImageGallery width="100%" height={height} type="game_banner_imgs" class="game_list_top_img" imgtype='banner'></ImageGallery>
                        </div> :null}
                    <div className="game-list-fname" >
                        <div className="game-list-left-nav wow"
                             style={{visibility: "visible", animationName: "fadeInUp"}}>
                            <div className="checkJackpot">
                                <label htmlFor="option"><input onChange={this.onJackpotChanged.bind(this)} type="checkbox" name="jackpot" value="option"/> 奖池游戏</label>
                            </div>
                            <ul>
                                {this.renderCategories()}
                            </ul>
                            <form onSubmit={this.onSearch.bind(this)} className="searchbar" style={{cursor:'pointer'}}>
                                <input ref="searchText" type="text" className="searchbartext" placeholder="查询游戏"/>
                                <i className="fa fa-search searchBtn" aria-hidden="true" onClick={this.onSearch.bind(this)}></i>
                            </form>
                        </div>                 
                        <div className="game-list-mid-box" >
                            <div className="game-list-right-content">
                               
                                <div id="GamesGridPopupMask" className="none" style={{display: "none"}}>
                                    <div id="LoadingDiv">
                                        <div className="GamePopupMask"></div>
                                    </div>
                                </div>
                                <ul className="games_box">
                                    {this.renderGames()}
                                    <div className="clear"></div>
                                </ul>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <nav id="game-page" className="wow" style={{visibility: "visible", animationName: "fadeInUp",clear:"both"}}>
                            <div className="pager_box">
                            <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toPrevPage.bind(this)}>上一页</a></div>
                                {this.renderGamePage()}
                            <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toNextPage.bind(this)}>下一页</a></div>
                            </div>
                        </nav>
                        <div className="clear"></div>
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
        slot_platforms: state.game.slot_platforms,
        linkToGames:state.linkToGames.linkToGames,
        platforms: state.game.platforms,
    }
);

export default connect(mapStateToProps, {})(GameListPanel);