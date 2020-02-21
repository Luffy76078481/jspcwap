
import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Footer.scss";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registration: 3000000,
        }
    }
    componentDidMount() {
        this.setState({
            registration: parseInt((new Date()).getTime()/(1000*60*60)*3 +2200000)
        });
    }
    render() {
        const config = window.config;
        const appName = config.appName;
        return (
            <footer className="FootPage">
                <div className="Footerline"></div>
                <article id="footer">
                    <div className="w1200 mAuto pr">
                        <div className="footer-help-share fadeInUp">
                            <div className="foot_help">
                                <h3>
                                    <i className="glyphicon glyphicon-question-sign mr5 "></i>使用帮助 
                                    <span>GUIDE</span>
                                </h3>
                                <div>                     
                                    <a href="/help.html#deposit" target="_blank" >如何存款</a>
                                    <a href="/help.html#responsibility" target="_blank" >责任条款</a>
                                    <a href="/help.html#rule" target="_blank" >游戏帮助</a>                  
                                    <a href="/help.html#myAccount" target="_blank" >隐私保护</a>
                                    <a href="/help.html#withdrawal" target="_blank" >如何提款</a>
                                    <a href="/help.html#terms" target="_blank" >规则与条款</a>  
                                    <a href="/help.html" target="_blank">关于{appName}</a>
                                    <a href="/help.html#deposit" target="_blank">开户与存提款</a>
                                    <a href="/agent.html" target="_blank">合作经营条款与规则</a>
                                    <a href="/help.html#yibanrule" target="_blank">优惠活动规则</a>
                                    <a href="/help.html#responsibility" target="_blank">博彩责任</a>
                                    <a href="/agent.html" target="_blank">代理中心</a>
                                </div>
                            </div>
                            <div className="foot_share">
                                <h3 >
                                    <i className="glyphicon glyphicon-share-alt mr5"></i>社交分享 
                                    <span>SHARE</span>
                                </h3>
                                <div className="share-list">
                                    <a href="http://weibo.com/" target="_blank" className="share-weibo color-third" title="微博"></a>
                                    <a href="http://user.qzone.qq.com/" target="_blank" className="share-qzone color-third" title="QQ空间"></a>
                                    <a href="https://www.facebook.com/" target="_blank" className="share-fackbook color-third" title="fackbook"></a>
                                    <a href="https://twitter.com/" target="_blank" className="share-twitter color-third" title="twitter"></a>   
                                </div>
                            </div>
                            <div className="foot-mobile-img"></div>
                        </div>
                        <div className="footCagayan">                          
                            <p>本网站属于菲律宾政府授权和监管所有版权归{appName}所有，违者必究。</p>
                            <p>©2004-2018 {appName}. All rights reserved &nbsp;&nbsp;当前注册人数：<span id="reg_count">{this.state.registration}</span></p>                   
                        </div>
                    </div>
                </article>   
                <div className="footer_bottom_img"/>     
            </footer>
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