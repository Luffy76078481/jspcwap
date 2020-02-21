import {MuiTheme, PreferencesIcon} from "../common/theme";
import Router from "globalRouter";
import BaseRequirement          from "../common/base";

import Frame                    from "../../global/Pages/Frame/Frame"; // 主题
//import NoticeBar                from "../../global/Components/NoticeBar/NoticeBar"; // 走马灯
import LoginPage                from "../../global/Pages/LoginPage/LoginPage"; // 登录
import PromotionAlert           from "../../global/Components/PromotionAlert-swiper/PromotionAlert"
import ImageGallery             from "../../global/Components/ImageGallery/ImageGallery";

import GamesPage                from "../bet365-bee/stuff/GamesPage";                       //电子游艺-主页面
import GamesPageTop             from "../bet365-bee/stuff/GamesPageTop/GamesPageTop2";      //电子游艺
import GameListPanel            from "../bet365-bee/stuff/GameListPanel/GameListPanel";     //电子游艺游戏列表

// import AffixService             from "../../global/Components/Sidebar/AffixService7/AffixService";                //侧栏
import AffixHongbao             from "../../global/Components/AffixHongbao/AffixHongbao";           //红包入口
import Turntable                from "../../global/Components/Turntable/Turntable"                  //转盘入口
import NavigationBar            from "../../global/Components/NavigationBar/tyc/NavigationBar";     // 导航栏

import AffixService            from "../../global/Components/Sidebar/AffixService5/AffixService";
import AffixService2            from "../../global/Components/Sidebar/AffixService5/AffixService2";      //对联

import TurntablePage            from "../../global/Pages/Turntable/Turntable"                 //转盘页
import ESportPage               from "../../global/Pages/eSport/ElectronicSport";             //电竞
import RegisterPage             from "../../global/Pages/RegisterPage/RegisterPage";          //注册
import BingoPage                from "../../global/Pages/bingo/BingoPage";                    //彩票
import StreetMachine            from "../../global/Pages/chess/Chess1";                       //棋牌
import FishGamePage             from "../../global/Pages/fish/FishPage";                      //捕鱼
import SportPage                from "../../global/Pages/sport/sport";                        //体育
import PromotionPage            from "../../global/Pages/PromotionPage/PromoDrop";            //优惠
import CasinoPage               from "../../global/Pages/casino/CasinoGame";                  //现场荷官

import FirstPage                from "./stuff/FirstPage/FirstPage";           //首页
import Footer                   from "./stuff/Footer/Footer";                 //底部
import Header                   from "./stuff/Header/Header";                 //头部

import MemberCenterRouter       from "../../global/Account/router/MemberCenterRouter" // 个人中心 
import "../../global/Account/scss/account-theme-red.scss" // 个人中心主题
import "./stuff/priv.scss"

export default class Requirement extends BaseRequirement { 
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon); 
        this.r("Router", Router); 
        this.r("Frame", Frame); 
        this.r("AffixHongbao", AffixHongbao); 
        this.r("FirstPagePromotionAlert", PromotionAlert);
        this.r("LoginPage", LoginPage);
        this.r("NavigationBar", NavigationBar);
        // this.r("NoticeBar", NoticeBar,{width:"550px"});
        // this.r("AffixService", AffixService);
        this.r("AffixService", AffixService);
        this.r("AffixService2", AffixService2);
        {
            this.r("LootoPage",TurntablePage,{isHaveSurplus:false})
            this.r("Turntable",Turntable)               
        }
        {
            this.r("GamesPage", GamesPage);
            this.r("GamesPageTop", GamesPageTop);
            //this.r("GamesPageNoticeBar", NoticeBar);
            this.r("GameListPanel", GameListPanel);
        }
        {
            this.r("SportPage", SportPage);
            this.r("ESportPage", ESportPage);
            this.r("CasinoPage", CasinoPage);
            this.r("BingoPage", BingoPage); 
            this.r("FishGamePage", FishGamePage);
            this.r("PromotionPage", PromotionPage);
            this.r("StreetMachinePage",StreetMachine); 
            this.r("RegisterPage", RegisterPage);    
        }
        {
            this.r("FirstPage", FirstPage);
            this.r("Header", Header);
            this.r("Footer", Footer);
            this.r("ImageGallery", ImageGallery, {gamesHeight:"170px",gameHeight:"360px",bingoHeight:"360px",gameEnabled:true,casinoEnabled2:true, casinoHeight: "360px",agPageHeight:"380px",showBanner:true});
        }
        this.r("MemberCenterRouter", MemberCenterRouter);
    }
}