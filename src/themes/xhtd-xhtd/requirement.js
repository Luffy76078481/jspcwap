
import Router from "globalRouter";
import BaseRequirement from "../common/base";
import {MuiTheme, PreferencesIcon} from "../common/theme";

import ImageGallery2        from "../../global/Components/ImageGallery2/ImageGallery" // 3D轮播
import ImageGallery         from "../../global/Components/ImageGallery/ImageGallery"
import NoticeBar            from "../../global/Components/NoticeBar/NoticeBar"; 
// import PromotionAlert       from "../../global/Components/PromotionAlert/PromotionAlert";
import PromotionAlert       from "../../global/Components/PromotionAlert-swiper/PromotionAlert"
import Frame                from "../../global/Pages/Frame/Frame";
import LoginPage            from "../../global/Pages/LoginPage/LoginPage";

import GameListPanel        from "./stuff/Components/GameListPanel/GameListPanel2"; 
import GamesPage            from "./stuff/Pages/GamesPage/GamesPage"; 
import GamesPageTop         from "./stuff/Pages/GamesPage/GamesPageTop/GamesPageTop"; 

// 新 ———————————————————————————————————————————————————————————————————————————————————————————————————————————————— 
import Header               from "../../global/Components/Header/xhtd_yellow/Header";
import NavigationBar        from "../../global/Components/NavigationBar/xhtd/NavigationBar"; 
import Footer               from "../../global/Components/Footer/xhtd_yellow/Footer";
import AffixHongbao         from "../../global/Components/AffixHongbao/AffixHongbao";
import AffixService         from "../../global/Components/Sidebar/AffixService6/AffixServiceStaticQr";
import AffixService2        from "../../global/Components/Sidebar/AffixService6/AffixService";
import FirstPage            from "../../global/Pages/FirstPage/xhtd_yellow/FirstPage";
import ChessPage            from "../../global/Pages/chess/Chess1";
import BingoPage            from "../../global/Pages/bingo/BingoPage";
import ESportPage           from "../../global/Pages/eSport/ElectronicSport";
import RegisterPage         from "../../global/Pages/RegisterPage/RegisterPage"; 
import FishGamePage         from "../../global/Pages/fish/FishPage"; 
import SportPage            from "../../global/Pages/sport/sport"; 
import PromotionPage        from "../../global/Pages/PromotionPage/PromoDrop";
import TurntablePage        from "../../global/Pages/Turntable/Turntable"
import CasinoPage           from "../../global/Pages/casino/CasinoPage_Xhtd";

// 个人中心
import MemberCenterRouter        from "../../global/Account/router/MemberCenterRouter"
import "../../global/Account/scss/account-theme-yellow.scss"
import "./stuff/index/skin.scss"

export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon)
        this.r("Router", Router)
        this.r("Frame", Frame);
        this.r("LootoPage", TurntablePage,{isHaveSurplus:true});
        {
            this.r("AffixService", AffixService ,{togame:true,toAG:true,procenterimg:true,Hongbao:true,QQ2:true});
            this.r("AffixService2", AffixService2);
            this.r("Header", Header ,{linetest:true});
            {
                this.r("NavigationBar", NavigationBar,{sub:true,onlinserv:true,homeaddText:true});
            }
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar);
            this.r("ImageGallery", ImageGallery ,{bingoHeight:"240px",promotionEnabled:true,promotionHeight:"240px",sportHeight:"251px"});
            this.r("ImageGallery2", ImageGallery2 );
        }
        this.r("RegisterPage", RegisterPage ,{banner:true});
        this.r("LoginPage", LoginPage);
        this.r("FirstPage", FirstPage);
        {
            this.r("FirstPagePromotionAlert", PromotionAlert);
        }
        this.r("SportPage", SportPage);
        this.r("ESportPage", ESportPage);
        this.r("CasinoPage", CasinoPage);
        this.r("GamesPage", GamesPage);
        this.r("ChessPage", ChessPage);
        this.r("AffixHongbao",AffixHongbao)
        {
            this.r("GamesPageTop", GamesPageTop);
            this.r("GamesPageNoticeBar", NoticeBar);
            this.r("GameListPanel", GameListPanel);
        }
        this.r("BingoPage", BingoPage,  {supportKG:true,supportCG:true,banner:true});
        {
            this.r("MgGamesNoticeBar", NoticeBar);
        }
        this.r("FishGamePage", FishGamePage);
        this.r("PromotionPage", PromotionPage);
        this.r("MemberCenterRouter", MemberCenterRouter,{hideInfo:true,select_Default:true,userName:true});
    }
}