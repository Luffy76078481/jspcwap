
import React, { Component } from 'react';
import { Link, IndexLink,browserHistory } from 'react-router';
import { connect } from 'react-redux'
import './Footer.scss';
import footerPartners from './images/footer-partners_3.png';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.userCount = this.num1();
    }

    num1(){
        var num1 =  ("219" + Math.floor(Math.random()*889 + 103));
        return num1;
    }

    kyyFooter(){
        const config = window.config;
        const appName = config.appName;

        return(
            <div className="Cagayan">
                <a href="/help.html" className="copyColor2 f12 color-third"
                   target="_blank">关于我们</a> |
                <a href="/help.html#deposit" className="copyColor2 f12 color-third" target="_blank">常见问题</a>
                |
                <a href="/agent.html" className="copyColor2 f12 color-third" target="_blank">联系我们</a>
                |
                <a href="/help.html#yibanrule" className="copyColor2 f12 color-third">条款与协议</a> |
                <a href="/help.html#responsibility" className="copyColor2 f12 color-third"
                   target="_blank">免责声明</a> |
                <a href="/agent.html" className="copyColor2 f12 color-third"
                   target="_blank">代理中心</a>
                <p className="lh25 color-third">本网站属于菲律宾政府授权和监管所有版权归{appName}所有，违者必究。</p>
                <p className=" c_right  lh25 color-third">
                    ©2004-2017 {appName}. All rights reserved &nbsp;&nbsp;当前注册人数：<span id="reg_count">219003</span>
                </p>
            </div>
        )
    }

    render() {
        const config = window.config;
        const appName = config.appName;
        const promotionLink = window.configHelper.getPromotionUrl();
        const options =  window.r.props("Footer");
        const kyyFooter =this.kyyFooter();

        return (
            <div className="FootPage">
                <article id="footer" className="BGcolor-main">
                    <div className="footer-help-share fadeInUp"></div>
                    <div className="grid">
                        <section className="col-4 site-keyword">
                            <h4 className="mb-40"> 关于 DAFABET </h4>
                            <p>欢迎来到Dafabet，亚洲领先在线娱乐投注网站，为您呈现不一样的在线投注体验，包括体育投注，在线娱乐场，真人娱乐场游戏，快乐彩，在线扑克，老虎机游戏和更多世界顶级投注游戏。</p>
                        </section>
                        <section className="col-4 quicklinks">
                            <h4 className="mb-40">快速链接</h4>
                            <div className="grid">
                                <ul className="col-6">
                                    <li><Link to="/aboutUs" target="_blank">关于我们</Link></li>
                                    <li><Link to="/termsOfUse" target="_blank">使用条款</Link></li>
                                    <li><Link to="/responsibleGaming" target="_blank">游戏责任</Link></li>
                                    {/*<li><Link to="/" target="_blank">支付方式</Link></li>*/}
                                    <li><Link to="/security" target="_blank">安全</Link></li>
                                </ul>
                                <ul className="col-6">
                                    <li><a href="/agent.html" className="specpeop" target="_blank">代理中心</a></li>
                                    <li><Link to="/privacy" target="_blank">隐私政策</Link></li>
                                    {/*<li><Link to="/" target="_blank">代理</Link></li>*/}
                                    {/*<li><Link to="/" target="_blank">联系我们</Link></li>*/}
                                    <li><Link to="/spotFakeWebsite" target="_blank">辨别真假大发网站</Link></li>
                                </ul>
                            </div>
                        </section>
                        <section className="col-4 text-center">
                            <div className="partners-logo">
                                <img src={footerPartners} />
                            </div>
                        </section>
                    </div>
                 
                </article>
                <div id="foot-Cagayan">
                    <p>©2004-2018 {appName}. All rights reserved &nbsp;&nbsp;当前注册人数：<span id="reg_count">{this.userCount}</span></p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        message:state.message
    }
);

export default connect(mapStateToProps, {

})(Footer)