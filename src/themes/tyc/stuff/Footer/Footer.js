

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import QRCode from 'qrcode.react';
import "./Footer.scss";
import logotext_grey from "./images/left_grey.png";
import footer_logo_top from './images/footer_logo-top.png';
import jianguan_logo from './images/jainguan.png';
import hezuo_logo from './images/hezuo.png';
import app1 from './images/app store-01.png';
import app2 from './images/app store-02.png';
import mobile from './images/mobile.png';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
        }
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    render() {
        const appName = window.config.appName;
        return (
            <div id="footer">
                <div className="footer-info-wrapper">
                    <div className="foot-all">
                        <div className="foot-all-parent">
                            <div className="foot-all-l">
                                <div className="e-photo-text footer-section e-table-middle">
                                    <div className="e-photo"><img src={logotext_grey} alt="footer logo" />
                                    </div>
                                    <div className="e-text">
                                        <p className="e-text-title">永利国际 亚洲在线娱乐</p>
                                        <p>永利国际 乃正式注册的网上博彩公司。</p>
                                        <p className="mt-s">版权为 永利国际 所有©2018</p>
                                    </div>
                                </div>
                                <div className="foot-left footer-section">
                                    <div className="foot-left-l">
                                        <div className="e-photo-text pd-s">
                                            <div className="e-photo"><i className="fa fa-phone"></i></div>
                                            <div className="e-text">
                                                <a className="e-text-title">{this.props.remoteSysConfs.online_service_phone}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="foot-left-r zindex500" id="zindex500">
                                        <div className="e-photo-text pd-s">
                                            <div className="e-photo"><i className="fa fa-qq"></i></div>
                                            <div className="e-text"><a className="e-text-title">{this.props.remoteSysConfs.online_service_qq}</a></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="foot-all-m">
                                <div className="foot-middle">
                                    <div className="foot-middle-l">
                                        <div className="footer-section">
                                            <p className="footer-title">官网平台</p>
                                            <ul className="footer-list--horizen">
                                                <li><img src={footer_logo_top} alt="" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="foot-middle-r">
                                        <div className="footer-section" >
                                            <p className="footer-title">监管机构</p>
                                            <ul className="footer-list--horizen">
                                                <li><img src={jianguan_logo}  alt="" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="footer-section">
                                    <p className="footer-title">合作平台</p>
                                    <ul className="footer-list--horizen">
                                        <li><img src={hezuo_logo}  className="img" /></li>
                                    </ul>
                                </div>

                            </div>
                            <div className="foot-all-r">
                                <div className="foot-right">
                                    <div className="foot-right-l">
                                        <p className="footer-title">信息中心</p>
                                        <ul className="footer-list sssv28-footer-font">
                                            <li><Link  to="/register">免费注册</Link></li>
                                            <li><Link to="/promotions">优惠</Link></li>
                                            <li><Link to="/FAQ">常见问题</Link></li>
                                            <li> <Link to="/ContactUs">联系我们</Link></li>
                                            <li><a href="/agent.html" target="_blank">合作伙伴</a></li>
                                        </ul>
                                    </div>
                                    <div className="foot-right-m">
                                        <p className="footer-title">产品</p>
                                        <ul className="footer-list sssv28-footer-font ng-scope">
                                            <li><Link to="/sport">体育博彩</Link>
                                            </li>
                                            <li><Link to="/casino">真人娱乐场</Link>
                                            </li>
                                            <li><Link to="/PT">电子游戏</Link></li>
                                            <li><Link to="/bingo" >彩票</Link></li>
                                            <li><Link to="/streetMachine">Ky棋牌</Link></li>
                                        </ul>
                                    </div>
                                    <div className="foot-right-r">
                                        <p className="footer-title">投注资料</p>
                                        <ul className="footer-list sssv28-footer-font">
                                            <li><Link to="/Gamerules">赛果</Link></li>
                                            <li><Link to="/Gamerules">体育博彩规则</Link></li>
                                            <li><Link to="/casino">真人娱乐场游戏介绍</Link></li>
                                            <li><Link to="/Responsible">责任博彩</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="footer-link-wrapper ">
                    <div className="container1 ">
                        <div className="mobile-qrcode-wrapper ">
                            <div className="mobile-qrcode">
                                <QRCode className="qrImg"
                                        includeMargin={true} //内部是否有margin
                                        size={120}  //图片大小
                                        value={this.props.remoteSysConfs.channel_push_url || "" } //地址
                                />
                                <div className="qr-code">
                                    <div className="qr-code-l">
                                        <img src={app1} />
                                    </div>
                                    <div className="qr-code-r">
                                        <img src={app2} />
                                    </div>
                                </div>
                            </div>
                            <div className="phone">
                                <div className="phone-l">
                                    <img src={mobile} />
                                </div>
                                <div className="phone-r">
                                    <div className="mobile-txt">
                                        <span className="css-arrow"></span>
                                        <br/>手机版<br/>扫一扫
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-link">
                            <Link to="/AboutUs">关于{appName}</Link>
                            <a target="_blank" href="/agent.html?tab=FaqContent">常见问题</a>
                            <a target="_blank" href="/agent.html?tab=ContactContent">联系我们</a>
                            <a target="_blank" href="/help.html#terms" >使用条款</a>
                            <a href="/help.html#myAccount" target="_blank" >隐私政策</a>
                            <a target="_blank" href="/help.html?#responsibility">责任博彩</a>
                            <a href="/agent.html?tab=ContactContent" target="_blank" >合营联盟</a>
                            <a href="/agent.html?tab=Registered" target="_blank?" >代理注册</a>
                            <a href="/help.html" target="_blank" className  >关于我们</a>
                        </div>
                    </div>
                </div>

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