import {MuiTheme, PreferencesIcon} from "../common/theme";
import Router from "globalRouter";
import BaseRequirement          from "../common/base";

import Frame                    from "../../global/Pages/Frame/Frame"; // 主题
import NoticeBar                from "../../global/Components/NoticeBar/NoticeBar"; // 走马灯
import LoginPage                from "../../global/Pages/LoginPage/LoginPage"; // 登录
import PromotionAlert           from "../../global/Components/PromotionAlert-swiper/PromotionAlert"
import ImageGallery             from "../../global/Components/ImageGallery/ImageGallery";

import AffixHongbao             from "../../global/Components/AffixHongbao/AffixHongbao";         //红包入口
import TurntablePage            from "../../global/Pages/Turntable/Turntable" //转盘页
import Turntable                from "../../global/Components/Turntable/Turntable"                  // 转盘入口
import FirstPage                from "../../global/Pages/FirstPage/amyh/FirstPage";         //首页
import Header                   from "../../global/Components/Header/amyh/Header";                //头部
import Footer                   from "../../global/Components/Footer/amyh/Footer";              //底部
import NavigationBar            from "../../global/Components/NavigationBar/amyh/NavigationBar";  //导航
import ESportPage               from "../../global/Pages/eSport/ElectronicSport";         //电竞
import RegisterPage             from "../../global/Pages/RegisterPage/RegisterPage";      //注册
import BingoPage                from "../../global/Pages/bingo/BingoPage";                //彩票
import StreetMachine            from "../../global/Pages/chess/Chess1";                   //棋牌
import FishGamePage             from "../../global/Pages/fish/FishPage";                  //捕鱼
import SportPage                from "../../global/Pages/sport/sport";                    //体育
import PromotionPage            from "../../global/Pages/PromotionPage/PromoDrop";       //优惠
import CasinoPage               from "../../global/Pages/casino/CasinoGame";       //现场荷官
import AffixService             from "./stuff/AffixService/AffixService2";                //侧栏

import MemberCenterRouter       from "../../global/Account/router/MemberCenterRouter" // 个人中心 
import "../../global/Account/scss/account-theme-orange.scss" // 个人中心主题
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
        this.r("NoticeBar", NoticeBar,{width:"550px"});
        this.r("AffixService", AffixService);
        {
            this.r("LootoPage",TurntablePage,{isHaveSurplus:false})
            this.r("Turntable",Turntable)               
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