
import {MuiTheme, PreferencesIcon} from "../common/theme";
import BaseRequirement      from "../common/base";
import Router               from "globalRouter";

import NoticeBar            from "../../global/Components/NoticeBar/NoticeBar";
import ImageGallery         from "../../global/Components/ImageGallery/ImageGallery";
import LoginPage            from "../../global/Pages/LoginPage/LoginPage";
import PromotionAlert       from "../../global/Components/PromotionAlert-swiper/PromotionAlert"

import Frame                from "../../global/Pages/Frame/Frame";
import GamesPage            from "../../global/Pages/GamesPage/GamesPage";
import GameListPanel        from "../../global/Components/GameListPanel/GameListPanel2";

// ___________________________________________________________________ （ 新版组件与页面 ）

import RegisterPage             from "../../global/Pages/RegisterPage/RegisterPage";          //注册
import BingoPage                from "../../global/Pages/bingo/BingoPage";                    //彩票
import ChessPage                from "../../global/Pages/chess/Chess1";                       //棋牌
import FishGamePage             from "../../global/Pages/fish/FishPage";                      //捕鱼
import SportPage                from "../../global/Pages/sport/sport";
import PromotionPage            from "../../global/Pages/PromotionPage/PromoDrop";            // 優惠
import NavigationBar            from "../../global/Components/NavigationBar/mgm/NavigationBar";     //主导航
import Header                   from "../../global/Components/Header/mgm/Header";                   
import FirstPage                from "../../global/Pages/FirstPage/mgm/FirstPage";
import Footer                   from "../../global/Components/Footer/mgm/Footer";
import CasinoPage               from "../../global/Pages/casino/CasinoPage_Xpj";
import TurntablePage            from "../../global/Pages/Turntable/Turntable"//大转盘
import ESportPage           from "../../global/Pages/eSport/ElectronicSport";

import AffixService             from "../../global/Components/Sidebar/AffixService5/AffixService";
import AffixService2            from "../../global/Components/Sidebar/AffixService5/AffixService2";

import MemberCenterRouter       from "../../global/Account/router/MemberCenterRouter" // 最新个人中心 
import "../../global/Account/scss/account-theme-brown.scss" // 个人中心主题
import "./stuff/priv.scss";


export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon);
        this.r("Router", Router);
        this.r("Frame", Frame);
        this.r("LoginPage", LoginPage);
        this.r("LootoPage", TurntablePage);
        this.r("ESportPage", ESportPage);
        {
            this.r("AffixService", AffixService);
            this.r("AffixService2", AffixService2);
            this.r("Header", Header,{xpj4_pwd:true,loginTxt:'登入',agentName:'代理加盟',agentLogin:true,vipName:'尊享VIP'});      
            this.r("NavigationBar", NavigationBar);        
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery, {sportHeight: "220px", bingoHeight: "200px", gameHeight: "200px",showBanner:false});
        }
        {
            this.r("FirstPage", FirstPage);
            this.r("FirstPagePromotionAlert", PromotionAlert);
        }
        {
            this.r("GamesPage", GamesPage);
            this.r("GameListPanel", GameListPanel,{disableImageGallery:true,pgsize:12});
        }
        this.r("RegisterPage", RegisterPage);
        this.r("BingoPage", BingoPage);
        this.r("FishGamePage", FishGamePage);
        this.r("PromotionPage", PromotionPage);
        this.r("ChessPage",ChessPage);
        this.r("SportPage", SportPage);
        this.r("CasinoPage", CasinoPage);
        this.r("MemberCenterRouter", MemberCenterRouter);
    }
}