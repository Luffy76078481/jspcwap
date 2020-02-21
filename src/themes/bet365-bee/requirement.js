

import {MuiTheme, PreferencesIcon} from "../common/theme";
import Router from "globalRouter";
import BaseRequirement from "../common/base";

import Frame                    from "../../global/Pages/Frame/Frame";                      // 主题
import NoticeBar                from "../../global/Components/NoticeBar/NoticeBar";         // 走马灯
import LoginPage                from "../../global/Pages/LoginPage/LoginPage";              // 登录
import PromotionAlert           from "../../global/Components/PromotionAlert-swiper/PromotionAlert"

import GamesPage                from "../bet365-bee/stuff/GamesPage";                       //电子游艺-主页面
import GamesPageTop             from "../bet365-bee/stuff/GamesPageTop/GamesPageTop2";      //电子游艺
import GameListPanel            from "../bet365-bee/stuff/GameListPanel/GameListPanel";     //电子游艺游戏列表

import FirstPage                from "../../global/Pages/FirstPage/bet365/FirstPage";     //首页
import ESportPage               from "../../global/Pages/eSport/ElectronicSport";         //电竞
import RegisterPage             from "../../global/Pages/RegisterPage/RegisterPage";      //注册
import BingoPage                from "../../global/Pages/bingo/BingoPage";                //彩票
import StreetMachine            from "../../global/Pages/chess/Chess1";                   //棋牌
import FishGamePage             from "../../global/Pages/fish/FishPage";                  //捕鱼
import SportPage                from "../../global/Pages/sport/sport";                            //体育
import PromotionPage            from "../../global/Pages/PromotionPage/PromoPopup";               //优惠
import CasinoPage               from "../../global/Pages/casino/CasinoPage_Bet365";               //现场荷官
import Header                   from "../../global/Components/Header/bet365/Header";                    //头部
import NavigationBar            from "../../global/Components/NavigationBar/bet365/NavigationBar";      //导航
import Footer                   from "../../global/Components/Footer/bet365/Footer";                    //底部
import AffixService             from "../../global/Components/Sidebar/AffixService";                    //侧栏

import MemberCenterRouter       from "../../global/Account/router/MemberCenterRouter" // 个人中心 
import "../../global/Account/scss/account-theme-green.scss" // 个人中心主题
import "./stuff/priv.scss"

export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("MuiTheme", MuiTheme);
        this.r("PreferencesIcon", PreferencesIcon);
        this.r("Router", Router);
        this.r("Frame", Frame);
        this.r("AffixService", AffixService);
        {
            this.r("Header", Header);           
            this.r("NavigationBar", NavigationBar);         
            this.r("Footer", Footer);
            this.r("NoticeBar", NoticeBar,{width:"550px"});
        }
        this.r("RegisterPage", RegisterPage);
        this.r("LoginPage", LoginPage);
        this.r("FirstPage", FirstPage);
        this.r("SportPage", SportPage);
        this.r("ESportPage", ESportPage)
        this.r("CasinoPage", CasinoPage);
        this.r("GamesPage", GamesPage);
        this.r("FirstPagePromotionAlert", PromotionAlert);
        {
            this.r("GamesPageTop", GamesPageTop);
            this.r("GamesPageNoticeBar", NoticeBar);
            this.r("GameListPanel", GameListPanel,{disableImageGallery:true,pgsize:20});
        }
        this.r("BingoPage", BingoPage); 
        this.r("FishGamePage", FishGamePage);
        this.r("PromotionPage", PromotionPage);
        this.r("StreetMachinePage",StreetMachine);
        this.r("MemberCenterRouter", MemberCenterRouter,{moneyPlacehoder:true});
    }
    
}