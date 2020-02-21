
import Router from "globalRouter";
import BaseRequirement from "../common/base";
import {MuiTheme, PreferencesIcon} from "../common/theme";

// ______________________________________________________ 优化组件 ______________________________________________________

import Frame                from "../../global/Pages/Frame/Frame";
import ImageGallery         from "../../global/Components/ImageGallery/ImageGallery";
import NoticeBar            from "../../global/Components/NoticeBar/NoticeBar";
import LoginPage            from "../../global/Pages/LoginPage/LoginPage";
import PromotionAlert       from "../../global/Components/PromotionAlert/PromotionAlert";
import AffixHongbao         from "../../global/Components/AffixHongbao/AffixHongbao";

// ______________________________________________________ 旧电子 ______________________________________________________

import GamesPage            from "../../global/Pages/GamesPage/GamesPage";
import GamesPageTop         from "../../global/Pages/GamesPage/GamesPageTop/GamesPageTop2"
import GameListPanel        from "../../global/Components/GameListPanel/GameListPanel"

// ______________________________________________________ 新组件-通版 ______________________________________________________

import PromotionPage        from "../../global/Pages/PromotionPage/PromoDrop";   //最新下拉优惠页面
import ChessPage            from "../../global/Pages/chess/Chess1";
import BingoPage            from "../../global/Pages/bingo/BingoPage";
import ESportPage           from "../../global/Pages/eSport/ElectronicSport";
import RegisterPage         from "../../global/Pages/RegisterPage/RegisterPage"; //最新公用注册
import FishGamePage         from "../../global/Pages/fish/FishPage"; //最新公用捕鱼
import SportPage            from "../../global/Pages/sport/sport"; // 体育

import FirstPage            from "../../global/Pages/FirstPage/xpj_brown/FirstPage";
import CasinoPage           from "../../global/Pages/casino/CasinoPage_Xpj";
import Header               from "../../global/Components/Header/xpj_brown/Header";
import Footer               from "../../global/Components/Footer/xpj_brown/Footer";
import AffixService         from "../../global/Components/Sidebar/AffixService2";
import NavigationBar        from "../../global/Components/NavigationBar/NavigationBar_Xpj";

// ______________________________________________________ 个人中心 ______________________________________________________

import MemberCenterRouter   from "../../global/Account/router/MemberCenterRouter" // 最新个人中心 
import "../../global/Account/scss/account-theme-brown.scss" // 个人中心主题

// ______________________________________________________ 私有样式 ______________________________________________________

import "./stuff/priv.scss"

export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon);
        this.r("Router", Router);
        this.r("Frame", Frame);
        {
            this.r("AffixService", AffixService);
            this.r("Header", Header);
            {
                this.r("NavigationBar", NavigationBar,{wapDownloadName:"手机app下载"});
                this.r("AffixHongbao", AffixHongbao, {page:"/hongbao/hongbao.htm"});

            }
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery, {sportHeight: "251px", bingoHeight: "240px", gameHeight: "200px",showBanner:true});
        }
        this.r("RegisterPage", RegisterPage);
        this.r("LoginPage", LoginPage);
        this.r("FirstPage", FirstPage);
        {
            this.r("FirstPagePromotionAlert", PromotionAlert);
        }
        this.r("SportPage", SportPage);
        this.r("ESportPage", ESportPage);
        this.r("CasinoPage", CasinoPage, {hideCasinoTitle:false,bgAnimate:false});
        this.r("GamesPage", GamesPage);
        {
            this.r("GamesPageTop", GamesPageTop);
            this.r("GamesPageNoticeBar", NoticeBar);
            this.r("GameListPanel", GameListPanel,{disableImageGallery:true,pgsize:18});
        }
        this.r("BingoPage", BingoPage, {supportKG:true,supportCG:true,supportFC:true});
        this.r("FishGamePage", FishGamePage);
        this.r("PromotionPage", PromotionPage);
        this.r("ChessPage",ChessPage);
        this.r("MemberCenterRouter", MemberCenterRouter,{moneyPlacehoder:true});
    }
}