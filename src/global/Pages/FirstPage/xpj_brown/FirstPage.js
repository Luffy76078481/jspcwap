
import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./FirstPage.scss";

class FirstPage extends Component {
    constructor(props) {
        super(props);
        const toDecimalNumber = window.toDecimalNumber;
        this.state = {
            siteData:[
                {glyphicon:"glyphicon-user",dataType:"活跃用户数",width:"44%",unit:"人",number:toDecimalNumber(this.props.global.onlineUserCount || 2989)},
                {glyphicon:"glyphicon-check",dataType:"累计注单量",width:"60%",unit:"注",number:toDecimalNumber(this.props.global.betCount || 1989565)},
                {glyphicon:"glyphicon-usd",dataType:"累计存提款",width:"98%",unit:"笔",number:toDecimalNumber(this.props.global.cashCount || 55808),cashSpeed:this.props.global.cashSpeed||332},
                {glyphicon:"glyphicon-star-empty",dataType:"累计派彩",width:"80%",unit:"人",number:toDecimalNumber(this.props.global.bonusAmount || 0)},
            ],
            games:[
                {user:"恭喜会员j**a中奖",prize:"在AG《捕鱼王者》中得CNY30,000.00"},
                {user:"恭喜会员c**55中奖",prize:"在MG《黄金海岸》中得CNY20,000.00"},
                {user:"恭喜会员w**u中奖",prize:"在PT《古怪猴子》中得CNY20,000.00"}
            ]
        }
    }
    initAll(){
        // 真人平台滑动
        window.renderOwl('.casinoPlatform', {
            items: 4,
            loop: true,
            dots: false,
            nav: false,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 3500
        });
        window.renderOwl('.content-game-list', {
            items:1,
            dots:false,
            autoplay:true,
            autoplayHoverPause:true,
            autoplayTimeout:5000,
            loop:true
        });
        let bingoRenderOwl = window.renderOwl('.content-bingo-list', {
            items:1,
            dots:false,
            autoplay:true,
            autoplayHoverPause:true,
            autoplayTimeout:4000,
            loop:true
        });
        $(".content-bingo-title a").hover(function(){
            var oA = $(this).index(".content-bingo-title a");
            $(this).addClass("active").siblings().removeClass("active");
            bingoRenderOwl.trigger('to.owl.carousel',oA)
        })
    }
    componentDidMount() {       
        this.initAll();
    }
    componentDidUpdate() {
        this.initAll();
    }
    // 渲染真人平台_滑动板块
    renderCansinoList(){
        const toDecimalNumber = window.toDecimalNumber;
        var ret = [];
        for (var i = 0; i < this.props.views.casinos.length; i++) {
            var casino = this.props.views.casinos[i];
            ret.push(
                <div key={casino.ID} className="CasinoItem">
                    <div className="platform-img">
                        <div className="platform-img-style" style={{backgroundImage: "url(" + window.config.prdImgUrl + casino.IconUrl + ") "}}></div>
                        <div className="platformNumber">
                            <i className="glyphicon glyphicon-user"></i>
                            <span>{toDecimalNumber(casino.OnlineUserCount || 0)}</span>
                        </div>
                    </div>
                    <div className="platformIntroduction">
                        <h4>{casino.Title}</h4>
                        <p>{casino.Description || "最具人气的娱乐平台" }</p>
                        <a data-gameLink={casino.PlatformId}>进入游戏</a>
                    </div>
                </div>
            );
        }
        return ret;
    }
    // 进入游戏
    onCarouselClick(event){
        if(!window.actions.auth())return
        let platform = $(event.target).attr('data-gameLink');
        if(!platform)return
        let parma = {
            GamePlatform:platform,// 平台
            GameType:platform=="MG2"?"casino":"Trueman",// 类型
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
    // 首页内容
    renderGame(){
        let ret=[];
        ret.push(
            this.state.games.map( (item,index)=>{    
                return(
                    <div className='prizeItem' key={index}>
                        <a className={"img"+index+" imgbg"}></a> 
                        <div className="GameIntroduction">
                            <div className="IntroductionLeft">
                                <h4>{item.user}</h4>
                                <p>{item.prize}</p>                    
                            </div>
                            <a href="/games">前往</a>
                        </div>
                    </div>                    
                )
            })             
        )                  
        return ret;
    }
    // 站点数据DOM
    renderSiteData(){
        let ret = [];
        ret.push(
            this.state.siteData.map( (item,index)=>{
                return(
                    <li key={index}>
                        <div className="data-list-title text-hidden">
                            <i className={"glyphicon "+item.glyphicon}></i>
                            {item.dataType}
                        </div>
                        <div className="data-list-style">
                            <span style={{width:item.width}}>
                                <span>
                                    <span className="jackpot">{item.number}</span>
                                    {item.unit}
                                </span>
                                {
                                    item.cashSpeed &&
                                    <span className="jackpot"> 
                                        /{this.props.global.cashSpeed||332}{item.unit}每秒
                                    </span>                                    
                                }

                            </span>                           
                        </div>
                        <div className="clear"></div>
                    </li>
                )
            })
        )
        return ret;
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const NoticeBar = window.r.get("NoticeBar");
        return (
            <div className='FirstPage'>
                <ImageGallery height="520px" imgtype='slider'></ImageGallery>
                {/* Content */}
                <article className='FirstPageWrap'>
                    <div className='pr w1200 mAuto'>
                        <div className="casinoPlatform fadeInUp" onClick={this.onCarouselClick.bind(this)}>
                            {this.renderCansinoList()}
                        </div>                                        
                        <div className='indexContent clearfix fadeInUp'>
                            <div className="contentJackpot">
                                <h3>
                                    <i className="glyphicon glyphicon-usd"></i>
                                    累计奖池 
                                    <span className='fr'>JACKPOT</span>
                                </h3>
                                <ul>
                                    <li><span >神的时代：激情四</span><i >￥<span className="jackpot">474,776,721.78</span></i></li>
                                    <li><span >疯狂水果</span><i >￥<span className="jackpot">101,501.55</span></i></li>
                                    <li><span >金字塔女王</span><i >￥<span className="jackpot">313,936.31</span></i></li>
                                    <li><span >金色召集</span><i >￥<span className="jackpot">6,109,587.47</span></i></li>
                                    <li><span >全景电影</span><i >￥<span className="jackpot">463,919.88</span></i></li>
                                </ul>
                            </div>
                            <div className="noticeContent">
                                <div className="Vip">
                                    <h4><i className="glyphicon glyphicon-volume-up"></i>最新公告</h4>
                                    <div className="noticeCenter">
                                        <NoticeBar type="notice_new"></NoticeBar>
                                    </div>
                                </div>
                                <div className="AD"></div>
                            </div>
                        </div>  
                        {/* 底部 */}
                        <div className='contentLast clearfix fadeInUp'>
                            {/* 最强游戏王 */}
                            <div className="content-game">
                                <h3>
                                    <i className="glyphicon glyphicon-star"></i>
                                    最强游戏王 
                                    <span className="fr">GAME</span>
                                </h3>
                                <div className="content-game-list">
                                    {this.renderGame()}
                                </div>
                            </div>
                            {/* 彩票 */}
                            <div className="content-bingo fadeInUp" data-wow-duration="1.5s">
                                <h3>
                                    <i className="glyphicon glyphicon-tree-conifer"></i>
                                    彩票区<span className="right">BINGO</span>
                                </h3>
                                <div className="content-bingo-fname">
                                    <div className="content-bingo-list">
                                        <div className="item bingo_0"></div>
                                        <div className="item bingo_1"></div>
                                        <div className="item bingo_2"></div>
                                        <div className="item bingo_3"></div>
                                    </div>
                                    <div className="content-bingo-title">
                                        <a href="/bingo" className="active">快乐彩</a>
                                        <a href="/bingo">时时彩</a>
                                        <a href="/bingo">六合彩</a>
                                        <a href="/bingo">快乐8</a>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div className="content-bingo-offers" data-wow-duration="2s" data-wow-delay="1s">
                                    <a href="/promotions">
                                        <i className="glyphicon glyphicon-fire"></i>1920奖金模式,新东方非
                                        <span>
                                            <i className="glyphicon glyphicon-gift mr5 mt5"></i>更多优惠
                                        </span>
                                    </a>
                                </div>
                            </div>
                            {/* 数据 */}
                            <div className="content-data">
                                <div className='hour24'></div>
                                <ul className="time-data">
                                    {
                                        this.renderSiteData()
                                    }
                                </ul>
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
        user : state.user,
        views:state.views,
        global: state.global,
        bestGames: state.game.bestGames
    }
);

export default connect(mapStateToProps, {})(FirstPage);