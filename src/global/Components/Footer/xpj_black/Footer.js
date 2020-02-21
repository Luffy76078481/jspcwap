
import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Footer.scss";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
        }
        this.userCount = this.num1();
    }
    num1(){
        var num1 =  ("219" + Math.floor(Math.random()*889 + 103));
        return num1;
    }
    render() {
        const appName = window.config.appName;
        return (
            <div className="FootPage">
                <article id="footer" className="BGcolor-main">
                    <div className="container">
                        <div className="row footer-help-share wow fadeInUp">
                            <div id="foot_help">
                                <h3 ><i className="glyphicon glyphicon-question-sign mr5 "></i>使用帮助 <span>GUIDE</span></h3>
                                <div className="guide-list">
                                    <p>
                                        <a href="/help.html#deposit" target="_blank" >如何存款</a>
                                        <a href="/help.html#responsibility" target="_blank" >责任条款</a>
                                        <a href="/help.html#rule" target="_blank" >游戏帮助</a>
                                    </p>
                                    <p>
                                        <a href="/help.html#myAccount" target="_blank" >隐私保护</a>
                                        <a href="/help.html#withdrawal" target="_blank" >如何提款</a>
                                        <a href="/help.html#terms" target="_blank" >规则与条款</a>
                                    </p>
                                </div>
                            </div>
                            <div id="foot_share" className="fadeInUp">
                                <h3 ><i className="glyphicon glyphicon-share-alt mr5"></i>社交分享 <span>SHARE</span></h3>
                                <div className="share-list">
                                    <a href="http://weibo.com/" target="_blank" className="share-weibo " title="微博"></a>
                                    <a href="http://user.qzone.qq.com/" target="_blank" className="share-qzone " title="QQ空间"></a>
                                    <a href="https://www.facebook.com/" target="_blank" className="share-fackbook " title="fackbook"></a>
                                    <a href="https://twitter.com/" target="_blank" className="share-twitter " title="twitter"></a>
                                </div>
                            </div>
                            <div id="foot-mobile-img" className=" footer-mobile-img wow fadeInUp ;"></div>
                        </div>
                        <div id="foot-Cagayan" className="row wow fadeInUp ;">
                            <div className="text-center">
                                <a href="/help.html" className=" f12 "target="_blank">关于{appName}</a> |
                                <a href="/help.html#deposit" className=" f12 " target="_blank">开户与存提款</a>|
                                <a href="/agent.html" className=" f12 " target="_blank">合作经营条款与规则</a>|
                                <a href="/help.html#yibanrule" className=" f12 " target="_blank">优惠活动规则</a> |
                                <a href="/help.html#responsibility" className=" f12 "target="_blank">博彩责任</a> |
                                <a href="/agent.html" className=" f12 "target="_blank">代理中心</a>
                                <p>本网站属于菲律宾政府授权和监管所有版权归{appName}所有，违者必究。</p>
                                <p>©2004-2018 {appName}. All rights reserved &nbsp;&nbsp;当前注册人数：<span id="reg_count">{this.userCount}</span></p>
                            </div>                          
                        </div>
                    </div>
                </article>

                <article id="platform-inco">
                    <div className="container">
                        <div className="row">
                            <img className="footer_bottom_img"/>
                        </div>
                    </div>
                </article>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        message:state.message,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(Footer)