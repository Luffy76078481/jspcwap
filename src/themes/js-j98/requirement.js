
import {MuiTheme, PreferencesIcon} from "../common/theme";
import Router from "globalRouter";
import BaseRequirement      from "../common/base";

import Frame                from "../../global/Pages/Frame/Frame";
import NoticeBar            from "../../global/Components/NoticeBar/NoticeBar";
import LoginPage            from "../../global/Pages/LoginPage/LoginPage";
// import PromotionAlert       from "../../global/Components/PromotionAlert-swiper/PromotionAlert";

import HomeAnnouncement from "../../global/Components/HomeAnnouncement/HomeAnnouncement"
import AffixHongbao         from "../../global/Components/AffixHongbao/AffixHongbao";
import ImageGallery         from "../../global/Components/ImageGallery/ImageGallery";

import GamesPage                from "../bet365-bee/stuff/GamesPage";                       //电子游艺-主页面
import GamesPageTop             from "../bet365-bee/stuff/GamesPageTop/GamesPageTop2";      //电子游艺
import GameListPanel            from "../bet365-bee/stuff/GameListPanel/GameListPanel";     //电子游艺游戏列表

import Turntable            from "../../global/Components/Turntable/Turntable"                  // 转盘入口
import Header               from "../../global/Components/Header/jinsha/Header";
import Footer               from "../../global/Components/Footer/jinsha/Footer";
import AffixService         from "../../global/Components/Sidebar/AffixService";                //侧栏

import TurntablePage        from "../../global/Pages/Turntable/Turntable"
import FirstPage            from "../../global/Pages/FirstPage/jinsha/FirstPage";
import SportPage            from "../../global/Pages/sport/sport";
import CasinoPage           from "../../global/Pages/casino/CasinoPage_Xpj";
import PromotionPage        from "../../global/Pages/PromotionPage/PromoDrop";
import ChessPage            from "../../global/Pages/chess/Chess1";
import BingoPage            from "../../global/Pages/bingo/BingoPage";
import ESportPage           from "../../global/Pages/eSport/ElectronicSport";
import RegisterPage         from "../../global/Pages/RegisterPage/RegisterPage"; //最新公用注册
import FishGamePage         from "../../global/Pages/fish/FishPage"; //最新公用捕鱼

import MemberCenterRouter       from "../../global/Account/router/MemberCenterRouter" // 最新个人中心 
import "../../global/Account/scss/account-theme-black.scss" // 个人中心主题
import "./page/index/skin.scss"

export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon);
        this.r("Router", Router);
        this.r("Frame", Frame);
        this.r("AffixHongbao",AffixHongbao)
        this.r("LoginPage", LoginPage);
        this.r("HomeAnnouncement",HomeAnnouncement)
        {
            this.r("AffixService", AffixService,{weixinName:'官方微信号'});
            this.r("Header", Header);     
            //this.r("NavigationBar", NavigationBar,{isNotSecondNav:true});         
            this.r("Footer", Footer);
            this.r("GamesPageTop", GamesPageTop);
            this.r("ImageGallery", ImageGallery, {sportHeight: "170px", bingoHeight: "200px", gameHeight: "170px",showBanner:false});
            this.r("NoticeBar", NoticeBar);
        }
        {
            this.r("LootoPage",TurntablePage,{isHaveSurplus:false})
            this.r("Turntable",Turntable)               
        }
        {
            this.r("FirstPage", FirstPage);
            // this.r("FirstPagePromotionAlert", PromotionAlert);
        }
        this.r("RegisterPage", RegisterPage);
        this.r("SportPage", SportPage);
        this.r("CasinoPage", CasinoPage);
        this.r("ESportPage", ESportPage);
        this.r("GamesPage", GamesPage);
        this.r("BingoPage", BingoPage);
        this.r("FishGamePage", FishGamePage);
        this.r("PromotionPage", PromotionPage);
        this.r("ChessPage",ChessPage);
        this.r("MemberCenterRouter", MemberCenterRouter);        
        {
            this.r("GamesPageNoticeBar", NoticeBar);
            this.r("GameListPanel", GameListPanel,{disableImageGallery:true,pgsize:20});
        }
    }
}