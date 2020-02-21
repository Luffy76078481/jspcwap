//import RouterWap from "globalRouter"; // 路由集
import BaseRequirement from "./base"; // 继承构造

import RouterWap        from "../router/Router_wap"; // 路由集
import Frame            from "./stuff/Frame/Frame_directer";                    // 架构层
import FirstPage        from "./stuff/FirstPage/FirstPage";                     // 首页
import HomeGameList     from "./stuff/FirstPage/HomeGameList_new";              // 游戏列表
import AllGamePage      from "./stuff/AllGamePage/AllGamePage";                 // 游戏展示页
import SideBar          from "./stuff/SideBar/SideBar";                         // 侧边栏导航
import FooterBar        from "./stuff/FooterBar/FooterBar";                     // 底部导航
import LoginPage        from "./stuff/LoginPage/LoginPage";                     // 登录页
import RegisterPage     from "./stuff/RegisterPage/RegisterPage";               // 注册页
import ServicePage      from "./stuff/ServicePage/ServicePage";                 // 联系我们
import AgentReg         from "./stuff/AgentReg/AgentReg";                       // 代理注册
import HelpPage         from "./stuff/HelpPage/HelpPage";                       // 帮助页
import LottoPage        from "./stuff/LottoPage/LottoPage";                     // 幸运大转盘
import PassWordAlert    from "./stuff/PassWordAlert/PassWordAlert";             // 修改密码弹窗

import MyPage           from "./stuff/MyPage/MyPage";                  //我的页面
import SharePage        from "./stuff/SharePage/SharePage";            //好友推荐
import PrivateInfo      from "./stuff/PrivateInfo/PrivateInfo";        //个人资料
import EditPassword     from "./stuff/EditPassword/EditPassword";      //安全中心
import Feedback         from "./stuff/Feedback/Feedback"               //反馈
import MoneyManage      from "./stuff/MoneyManage/MoneyManage"         //资金管理
import DepositPage      from "./stuff/DepositPage/DepositPage"         //存款
import WithdrawPage     from "./stuff/WithdrawPage/WithdrawPage"       //提款
import TransferPage     from "./stuff/TransferPage/TransferPage"       //转账
import HistoryPage      from "./stuff/HistoryPage/HistoryPage"         //历史记录
import AddCard          from "./stuff/CardManage/AddCard"              //绑定银行卡
import MyMessage        from "./stuff/MyMessage/MyMessage"             //优惠活动
import ReadMessage      from "./stuff/MyMessage/ReadMessage"           //消息内容
import CardManage       from "./stuff/CardManage/CardManage"           //添加银行卡
import AddQrCode        from "./stuff/CardManage/AddQrCode"            
import SiteLetter       from "./stuff/SiteLetter/SiteLetter"            // 站内信
import PlatFromAnnounce from "./stuff/PlatFromAnnounce/PlatFromAnnounce"      // 站内信

export default class Requirement extends BaseRequirement {
    constructor() {
        super();
        this.r("Frame", Frame);
        this.r("RouterWap", RouterWap);
        {
            this.r("SideBar",SideBar);
            this.r("FooterBar", FooterBar);
            this.r('AgentReg',AgentReg);
            this.r('PassWordAlert',PassWordAlert);
        }
        {
            this.r("FirstPage", FirstPage);
            this.r("HomeGameList", HomeGameList);
            this.r("LoginPage",LoginPage);
            this.r("RegisterPage",RegisterPage);
            this.r("HelpPage",HelpPage);
            this.r("ServicePage",ServicePage);
            this.r("AllGamePage",AllGamePage);
        }
        {
            this.r('LottoPage',LottoPage);
        }
        {
            this.r('MyPage',MyPage)
            this.r('SharePage',SharePage)
            this.r('PrivateInfo',PrivateInfo)
            this.r('EditPassword',EditPassword)
            this.r('Feedback',Feedback)
            this.r('MoneyManage',MoneyManage)
            this.r('DepositPage',DepositPage)
            this.r('WithdrawPage',WithdrawPage)
            this.r('TransferPage',TransferPage)
            this.r('HistoryPage',HistoryPage)
            this.r('AddCard',AddCard)
            this.r('MyMessage',MyMessage)
            this.r('ReadMessage',ReadMessage)
            this.r('CardManage',CardManage)
            this.r('AddQrCode',AddQrCode)
            this.r('SiteLetter',SiteLetter)
            this.r('PlatFromAnnounce',PlatFromAnnounce)
        }
    }
}