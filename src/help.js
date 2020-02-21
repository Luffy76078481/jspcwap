import React, { Component } from 'react';
import {render} from 'react-dom'
import {config} from "globalConfig";
import About from './global/otherPages/help/page/About'; // 关于我们
import CommonQ from './global/otherPages/help/page/CommonQ'; // 一般常见问题
import Deposit from './global/otherPages/help/page/Deposit'; // 存款
import Withdrawal from './global/otherPages/help/page/Withdrawal'; // 取款
import MyAccount from './global/otherPages/help/page/MyAccount'; // 我的账号
import Sport from './global/otherPages/help/page/Sport'; // 体育
import LiveCasino from './global/otherPages/help/page/LiveCasino'; // 娱乐城
import PhoneBetting from './global/otherPages/help/page/PhoneBetting'; // 手机下注
import Yibanrule from './global/otherPages/help/page/Yibanrule';
import Rule from './global/otherPages/help/page/Rule'; // 投注规则
import PtRule from './global/otherPages/help/page/PtRule';
import Responsibility from './global/otherPages/help/page/Responsibility';
import Terms from './global/otherPages/help/page/Terms';
import Contact from './global/otherPages/help/page/Contact';
import Payout from './global/otherPages/help/page/Payout';
import HowPlay from './global/otherPages/help/page/HowPlay';
import PayInfo from './global/otherPages/help/page/PayInfo';
import "./global/otherPages/help/index";
import "./global/otherPages/help/css/style.scss"
import 'isomorphic-fetch';
/*
    解决IE下Promise报错 
    【
        1.install babel-runtime和babel-plugin-transform-runtime 
        2.添加在主页之前添加window.Promise = Promise
    】
*/
window.Promise = Promise;

// ★★★★★
//__start import "./themes/#{spec}/otherPages/help/skin.scss";
import "./themes/bet365-bee/otherPages/help/skin.scss";
//__end

class HelperPage extends Component {
    render() {
        const appName = config.appName;
        return (
            <div id="root">
                <div className="helpPage" id='helpPage'>
                    <div className="main">
                        <div className="header">
                            <a href="/" target="_blank" className="logoBtn"> <div className="header_left"></div></a>
                            <div className="header_right"></div>
                        </div>
                        <div className="title_img">帮助中心</div>
                        <div className="main_content">
                            <div className="menu">
                                <ul className="navigation menuBtn">
                                    <li data-tab="about" id="aboutBtn"><a href="#" >关于我们</a></li>
                                    <li>
                                        <a href="#">常见问题<div className="arrow-bottom"></div></a>
                                        <ul id="common_item" className="menuBtn">
                                            <li data-tab="commonQ" id="commonQBtn"><a href="#">一般常见问题</a></li>
                                            <li data-tab="deposit" id="depositBtn"><a href="#">存款</a></li>
                                            <li data-tab="withdrawal" id="withdrawalBtn"><a href="#">提款</a></li>
                                            <li data-tab="myAccount" id="myAccountBtn"><a href="#">我的账号</a></li>
                                            {config.spec == "dafa-dbb" && <li data-tab="howPlay" id="dafaPlayBtn"><a href="#">如何游戏</a></li>}
                                            {config.spec == "dafa-dbb" && <li data-tab="payInfo" id="dafaPayInfoBtn"><a href="#">支付方式</a></li>}
                                            {config.spec !== "xpj2" && <li data-tab="sport" id="xpjPEBtn"><a href="#">{appName}体育</a></li>}
                                            <li data-tab="liveCasino" id="liveCasinoBtn"><a href="#">娱乐城</a></li>
                                            <li data-tab="phoneBetting" id="phoneBettingBtn"><a href="#">手机下注</a></li>
                                        </ul>
                                    </li>
                                    <li ><a href="#" className="Menu-inco">规则 <div className="arrow-bottom"></div></a>
                                        <ul className="menuBtn">
                                            {config.spec == "dafa-dbb" && <li data-tab="payout" id="dafaPayoutBtn"><a href="#">出金数额</a></li>}
                                            <li data-tab="yibanrule" id="yibanruleBtn"><a href="#">优惠的一般条款及规则</a></li>
                                            <li data-tab="rule" id="ruleBtn"><a href="#">投注规则</a></li>
                                            <li data-tab="PtRule" id="PtRuleBtn"><a href="#">欧洲厅PT游戏</a></li>
                                        </ul>
                                    </li>
                                    <li data-tab="responsibility" id="responsibilityBtn"><a href="#">责任博彩</a></li>
                                    <li data-tab="terms" id="termsBtn"><a href="#">使用条款</a></li>
                                    <li data-tab="contact" id="contactBtn"><a href="#">联系我们</a></li>
                                    <li data-tab="partner" id="partnerBtn"><a href="agent.html"  target="_blank">合作伙伴</a></li>
                                </ul>
                            </div>
                            <About id="about"/>
                            <CommonQ id="commonQ"/>
                            <Deposit id="deposit"/>
                            <Withdrawal　id="withdrawal"/>
                            <MyAccount  id="myAccount"/>
                            <Sport id="sport"/>
                            <LiveCasino id="liveCasino"/>
                            <PhoneBetting id="phoneBetting"/>
                            <Yibanrule id="yibanrule"/>
                            <Rule id="rule"/>
                            <PtRule id="PtRule"/>
                            <Responsibility id="responsibility"/>
                            <Terms id="terms" />
                            <Contact id="contact"/>
                            <Payout id="payout"/>
                            <HowPlay id="howPlay"/>
                            <PayInfo id="payInfo"/>
                        </div>
                    </div>
                    <div className="foot">
                        <div className="footer-bg"></div>
                    </div>
                </div>
            </div>
        )
    }
}

render(<HelperPage/>, document.getElementById('root'));
