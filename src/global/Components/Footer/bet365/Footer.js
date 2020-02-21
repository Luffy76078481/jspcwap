

/*
    非主页
    Update on 7/10， Bet365 Footer

*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';
import logo from './images/footer-logo.png';
import Gamblingaware from './images/footer-Gamblingaware.png';
import GamCare from './images/footer-GamCare.png';
import footer18plus from './images/footer-18plus.png';
import gibraltar from './images/footer-gibraltar.png';
import Thwate from './images/footer-Thwate.png';
import SQS from './images/footer-SQS.png';
import essa from './images/footer-essa.png';
import IBAS from './images/footer-IBAS.png';
import footergt from './images/footer-gt.png';
import iTechLabs from './images/footer-iTechLabs.png';
import PIXIU from './images/footer-PIXIU.png';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state={
            isUnderLine:'none',
            fontColor:this.props.fontColor
        } 
    }          
    // 在线客服
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render() {
        let dateTime = new Date();
        let year = dateTime.getFullYear();
        const agentLoginUrl = window.config.agentLoginUrl;
        return (
                <footer>                               
                    <div className="FooterContainer">
                        <div className="LogoContainer">
                            <img src={logo} />
                        </div>
                        <div className="FooterLinks">
                            <a href="/help.html" target="_blank" className  >关于我们</a>
                            <a href="/help.html#deposit" target="_blank" >常见问题</a>
                            <a href='javascript:void(0);' onClick={this.serversOpen.bind(this)} >在线客服</a>
                            {/* BEE的联系我们要用帮助中心里的 */}
                            {
                                config.spec.includes('bee')?<a href="/help.html#contact">联系我们</a>
                                :<a href="/agent.html?tab=ContactContent">联系我们</a>
                            }
                            <a href="/help.html#yibanrule" target="_blank" >条款与协议</a>
                            <a href="/help.html#responsibility" target="_blank" >免责声明</a>
                            <a href="/help.html#myAccount" target="_blank" >隐私政策</a>
                            <a href="/agent.html?tab=ContactContent" target="_blank" >合营联盟</a>
                            <a href="/agent.html?tab=Registered" target="_blank?" >代理注册</a>
                            <a href={agentLoginUrl} target="_blank" >代理登入</a>      
                        </div>
                        <div className="FooterIcons">
                            <img src={Gamblingaware} width="120" height="14" />
                            <img src={gibraltar} width="33" height="34" />
                            <img src={GamCare} width="26" height="29" />
                            <img src={Thwate} width="100" height="25" />
                            <img src={SQS} width="48" height="24" />
                            <img src={essa} width="82" height="32" />
                            <img src={footer18plus} width="30" height="30" />
                            <img src={footergt} width="37" height="32" />
                            <img src={IBAS} width="92" height="36" />
                            <img src={iTechLabs} width="32" height="32" />
                            <img src={PIXIU} width="42" height="32" />
                        </div>
                        <div className="FooterContent mb15">
                            <span className="infoTextContainer" >
                                通过进入、继续使用或浏览此网站，您即被认定接受：我们将使用特定的浏览器cookies优化您的客户享用体验。bet365仅会使用优化您服务体验的cookies，
                                <br/>而不是可侵犯您隐私的cookies。关于我们使用cookies，以及您如何取消、管理cookies使用的更多详情，请参考我们的 
                                <a href="javascript:window.open('/about/cookies',950,750);" title="COOKIES政策" data-productid="1">COOKIES 政策</a>。
                            </span>
                        </div>
                        <div className="FooterContent">
                            <p className="pb5" ><b>注册办公地址：</b>Hillside（Gaming）LP（注册编号120），Unit 1.1, First Floor, Waterport Place, 2 Europort Avenue, Gibraltar。</p>
                            <p className="pb5" ><b>Hillside（Gaming）LP</b>是由直布罗陀政府颁发执照并受直布罗陀博彩委员会监管（RGL编号077）。</p>
                        <p className="pb5" >© 2001-{year} bet365 版权所有</p>
                        </div>                                   
                    </div>                    
                </footer> 

        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        message:state.message,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {

})(Footer)