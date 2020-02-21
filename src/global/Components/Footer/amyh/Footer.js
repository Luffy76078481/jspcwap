
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import "./Footer.scss";
import icon_bottom from './images/icon-bottom.png'
import padIcon from './images/pad_bottom.png'
import slogan from './images/slogan.png';
import QRCode from "qrcode.react";
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
                <div className="bottom-top clear">
                    <div className="mAuto pr w1000 bottom-topdiv">
                        <img className="bottomBg" src={icon_bottom}  width="1000" height="108"/>
                    </div>
                </div>
                <div className="bottom-div">
                    <div className="mAuto pr w1000">
                        <div className="bottom-about left">
                            关于我们
                            <ul>

                                <li>
                                    <Link to="/AboutUs">关于我们</Link>
                                </li>
                                <li>
                                    <Link to="/ContactUs">联系我们</Link>
                                </li>
                                <li>
                                    <Link to="/Responsible">负责博彩</Link>
                                </li>
                                <li>
                                    <Link to="/TermsConditions">使用条款</Link>
                                </li>
                                <li>
                                    <a href="/Disclaimer">免责声明</a>
                                </li>
                                <li>
                                    <a href="/Privacy">隐私政策</a>
                                </li>
                            </ul>
                        </div>
                        <div className="bottom-member left">
                            会员操作
                            <ul>
                                <li>
                                    <Link to="/FAQ">常见问题</Link>
                                </li>
                                <li>
                                    <Link to="/Gamerules">游戏规则</Link>
                                </li>
                                <li>
                                    <Link to="/FAQ">如何存款</Link>
                                </li>
                                <li>
                                    <Link to="/FAQ">如何取款</Link>
                                </li>
                                <li>
                                    <a href="/agent.html">合作伙伴</a>
                                </li>
                                <li>
                                    <Link to="/promotions">优惠中心</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="bottom-contact left">
                            联系我们
                            <ul>
                                <li>
                                    <a onClick={this.serversOpen.bind(this)}><span className="icon-service"></span>在线客服 </a>
                                </li>
                                <li>
                                    <a><span className="icon-QQ"></span>QQ:{this.props.remoteSysConfs.online_service_qq}</a>
                                </li>
                                <li>
                                    <a><span className="icon-wx"></span>微信:{this.props.remoteSysConfs.online_service_wechat}<i></i></a>
                                </li>
                                <li>
                                    <a><span className="icon-hy"></span>邮箱:{this.props.remoteSysConfs.online_service_email}<i></i></a>
                                </li>
                            </ul>
                        </div>

                        <div className="bottom-card-div right">
                            <div className="bottom-card-web-div">
                                记住{appName}易记网址 <span>http://www.y68.com</span>
                            </div>
                            <div className="bottom-card-pad-div">
                                <div className="bottom-card-pad-ewm">
                                    <QRCode className="qrImg"
                                            includeMargin={false} //内部是否有margin
                                            size={80}  //图片大小
                                            value={this.props.remoteSysConfs.channel_push_url || "" } //地址
                                    />
                                </div>
                                <div className="bottom-card-pad-msg">
                                    <div className="bottom-card-pad-msg-bold">
                                        手机平板电脑
                                    </div>
                                    <div>
                                        扫描网站二维码快速访问网站
                                    </div>
                                </div>
                                <div className="bottom-card-pad-pad">
                                    <img src={padIcon} width="80"
                                         height="80" />
                                </div>
                            </div>
                            <div className="bottom-card-tel-div fontst">
                                <div>
                                    <span className="icon-tel"></span>{this.props.remoteSysConfs.online_service_qq}
                                </div>
                                <div>
                                    <span className="icon-addr"></span>{appName}亚洲网投事业部
                                </div>
                            </div>
                            <div style={{textAlign:'center'}}>
                                <img src={slogan} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <div>
                        澳门银河网站属于菲律宾卡格杨(Cagayan)授权和监管 所有版权归澳门银河所有，违者必究。 请使用IE8以上浏览器观看本站
                    </div>
                    <div>
                        2002-2019Galaxy Macau by GALAXY Mayfair LIMITED.RCBC Plaza,6819Sen.Gil Puyat corner Ayala
                        Avenue,Mak
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