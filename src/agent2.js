
import React,{Component} from 'react';
import Alliance from './global/otherPages/agent/page/agent2/Alliance';
import AboutUs from './global/otherPages/agent/page/agent2/AboutUs';
import ContactUs from './global/otherPages/agent/page/agent2/ContactUs';
import Deposit from './global/otherPages/agent/page/agent2/Deposit';
import Wthdrawal from './global/otherPages/agent/page/agent2/Wthdrawal';
import Faq from './global/otherPages/agent/page/agent2/Faq'; // 常见问题
import BetRule from './global/otherPages/agent/page/agent2/BetRule'; // 责任

export default class AgentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab:"AboutUs", // 内容板块
        }
    }
    // 判断内容
    componentDidMount() {
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        var web = getUrlParameter('tab');
        this.setState({tab:web});
    }
    // 返回内容板块
    renderSubPage() {
        if (this.state.tab === "Alliance") {
           return <Alliance id="AllianceContent"/>
        }else if(this.state.tab ==="AboutUs"){
            return <AboutUs id="AboutUs"/>
        }else if(this.state.tab ==="ContactUs"){
            return <ContactUs id="ContactUs"/>
        }else if(this.state.tab ==="Deposit"){
            return <Deposit id="Deposit"/>
        }else if(this.state.tab ==="Wthdrawal"){
            return <Wthdrawal id="Wthdrawal"/>
        }else if(this.state.tab ==="Faq"){
            return <Faq id="Faq"/>
        }else if(this.state.tab ==="BetRule"){
            return <BetRule id="BetRule"/>
        }
        return <AboutUs/>;
    }
    onClickTab(tab) {
        this.setState({tab:tab});
    }
    render() {
        return (
            <div id="IndexContent" className="agent2">
                <div className="header_bg">
                    <div className="header">
                        <div className="logo_img">
                            <a href="/"><div className="header_left fl"></div></a>
                            <div className="header_right fr"></div>
                        </div>
                    </div>
                    <div className="menuNav">
                        <div className="menuBtn">
                            <ul >
                                <li onClick={this.onClickTab.bind(this,"WebRegister")}><a className={this.state.tab==="WebRegister"?"now":''} href="/register">会员注册</a></li>
                                <li onClick={this.onClickTab.bind(this,"WebPromotion")}><a className={this.state.tab==="WebPromotion"?"now":''} href="/promotions">优惠活动</a></li>
                                <li onClick={this.onClickTab.bind(this,"Alliance")}  ><a className={this.state.tab==="Alliance"?"now":''} href="#">代理合作</a></li>
                                <li onClick={this.onClickTab.bind(this,"AboutUs")}   ><a className={this.state.tab==="AboutUs"?"now":''} href="#">关于我们</a></li>
                                <li onClick={this.onClickTab.bind(this,"ContactUs")}  ><a className={this.state.tab==="ContactUs"?"now":''} href="#">联络我们</a></li>
                                <li onClick={this.onClickTab.bind(this,"Wthdrawal")}  ><a className={this.state.tab==="Wthdrawal"?"now":''} href="#">如何取款</a></li>
                                <li onClick={this.onClickTab.bind(this,"Deposit")}  ><a className={this.state.tab==="Deposit"?"now":''}  href="#">如何存款</a></li>
                                <li onClick={this.onClickTab.bind(this,"Faq")}  ><a className={this.state.tab==="Faq"?"now":''}  href="#">常见问题</a></li>
                                <li onClick={this.onClickTab.bind(this,"BetRule")}  ><a className={this.state.tab==="BetRule"?"now":''}  href="#">责任博彩</a></li>
                            </ul>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="banner"></div>
                    <div className="content">
                        <div className="leftBar">
                            <div className="sideNav">
                                <ul>
                                    <li className="sportnav"><a href="/sport"></a></li>
                                    <li className="bingonav"><a href="/bingo"></a></li>
                                    <li className="casinonav"><a href="/casino"></a></li>
                                    <li className="gamesnav"><a href="/games"></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="rightContent">
                            {this.renderSubPage()}
                        </div>
                    </div>
                </div>
                <div className="b-footer">
                    <div className="footer">
                        <div className="footer_bg"></div>
                    </div>
                    <div className="footerNav">
                        <div className="footerNavBtn">
                            <a href="#" onClick={this.onClickTab.bind(this,"AboutUs")} >关于我們</a>&nbsp;&nbsp;|
                            <a href="#" onClick={this.onClickTab.bind(this,"ContactUs")}>联络我們</a>&nbsp;&nbsp;|
                            <a href="#" onClick={this.onClickTab.bind(this,"Alliance")}>代理合作</a>&nbsp;&nbsp;|
                            <a href="#" onClick={this.onClickTab.bind(this,"Deposit")}>如何存款</a>&nbsp;&nbsp;|
                            <a href="#" onClick={this.onClickTab.bind(this,"Wthdrawal")}>如何取款</a>&nbsp;&nbsp;|
                            <a href="#" onClick={this.onClickTab.bind(this,"Faq")}>常见问题</a>&nbsp;&nbsp;|
                            <a href="#" onClick={this.onClickTab.bind(this,"BetRule")}>责任博彩</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
