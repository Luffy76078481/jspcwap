
import BaseRequirement              from "../common/base";
import {MuiTheme, PreferencesIcon} from "../common/theme";
import Router from "globalRouter";
import Frame                        from "../../global/Pages/Frame/Frame";
// import PromotionAlert               from "../../global/Components/PromotionAlert/PromotionAlert";
import PromotionAlert       from "../../global/Components/PromotionAlert-swiper/PromotionAlert"
import NoticeBar                    from "../../global/Components/NoticeBar/NoticeBar";
import LoginPage                    from "../../global/Pages/LoginPage/LoginPage";
import ImageGallery                 from "../../global/Components/ImageGallery/ImageGallery";
import GamesPage                    from "../../global/Pages/GamesPage/GamesPage";
import GameListPanel                from "./page/GameListPanel/GameListPanel2";

// 新
import PromotionPage        from "../../global/Pages/PromotionPage/PromoDrop";   //最新下拉优惠页面
import NavigationBar        from "../../global/Components/NavigationBar/NavigationBar_Vns";
import ChessPage            from "../../global/Pages/chess/Chess1";
import BingoPage            from "../../global/Pages/bingo/BingoPage";
import ESportPage           from "../../global/Pages/eSport/ElectronicSport";
import RegisterPage         from "../../global/Pages/RegisterPage/RegisterPage"; //最新公用注册
import FishGamePage         from "../../global/Pages/fish/FishPage"; //最新公用捕鱼
import SportPage            from "../../global/Pages/sport/sport"; // 体育
import CasinoPage           from "../../global/Pages/casino/CasinoPage_Vns"; // 真人
import TurntablePage        from "../../global/Pages/Turntable/Turntable"
import FirstPage            from "../../global/Pages/FirstPage/vns/FirstPage";
import Header               from "../../global/Components/Header/vns/Header";
import Footer               from "../../global/Components/Footer/vns/Footer";
import {SideBarRight}       from "../../global/Components/Sidebar/AffixService3";
import {SideBarLeft}        from "../../global/Components/Sidebar/AffixService3";
import AffixHongbao         from "../../global/Components/AffixHongbao/AffixHongbao";

import MemberCenterRouter       from "../../global/Account/router/MemberCenterRouter" // 个人中心 
import "../../global/Account/scss/account-theme-brown.scss" 
import "./page/index/skin.scss"
import "./page/index/newSkin.scss"

export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon);
        this.r("Router", Router);
        this.r("Frame", Frame);
        this.r("LoginPage", LoginPage);
        this.r("AffixHongbao", AffixHongbao);
        {
            this.r("SideBarRight", SideBarRight);
            this.r("SideBarLeft", SideBarLeft);    
            this.r("Header", Header);        
            this.r("NavigationBar", NavigationBar);         
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar,{width:"850px"});
            this.r("ImageGallery", ImageGallery, {sportHeight: "220px", bingoHeight: "200px", gameHeight: "200px",showBanner:true});
        }
        {
            this.r("FirstPage", FirstPage);
            this.r("FirstPagePromotionAlert", PromotionAlert);
        }
        {
            this.r("GamesPage", GamesPage);
            this.r("GameListPanel", GameListPanel,{disableImageGallery:true,pgsize:12});
        }
        this.r("SportPage", SportPage);
        this.r("CasinoPage", CasinoPage);
        this.r("BingoPage", BingoPage,);
        this.r("RegisterPage", RegisterPage);
        this.r("FishGamePage", FishGamePage);
        this.r("ESportPage", ESportPage);
        this.r("PromotionPage", PromotionPage);
        this.r("ChessPage",ChessPage);
        this.r("MemberCenterRouter", MemberCenterRouter);
        this.r("LootoPage", TurntablePage);
    }
}