

import React,{Component} from 'react';
import "./AgentTyc.scss"
import {config} from "globalConfig";
class ApiSysConfAction {
    fly(callback){
        let authorization="";
        fetch(config.apiPath+"client/all_sys_cfg?Tag="+config.webSiteTag, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":authorization
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            callback(data);
        });
    }

}
export default class AgentTyc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
            online_sevice_email:"",
            sectionOpen:false
        }
    }

    componentDidMount(){
        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({
                    online_service_link:resp.Config.online_service_link,
                    online_service_email:resp.Config.online_service_email,
                });
            }
        });

    }
    serversOpen(e){
        e.preventDefault();
        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                },
                ()=>{
                    window.open(this.state["online_service_link"],'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.state["online_service_link"],'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render() {
        return (
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><a href="/" className="a-menu"><div className="logo"></div></a></li>
                            <li><a href="#commissiondivided" className="a-menu">佣金分成</a></li>
                            <li><a href="#termsofservice" className="a-menu">服务条款</a></li>
                            <li><a href="#commonquestions" className="a-menu">常见问题</a></li>
                            <li><a href="javascript:;" className="txtlink2" onClick={this.serversOpen.bind(this)}>联系我们</a></li>
                            <li><a href="/register" className="a-menu">立即注册</a></li>
                        </ul>
                    </nav>
                </header>
                <section>
                    <a href="/home/register"><div className="w101"/></a>
                </section>
                <div className="marquee-box">
                    <marquee ref="notice1" direction="left"  onMouseOver={(ele)=>{this.refs.notice1.stop();}} onMouseOut={(ele)=>{this.refs.notice1.start();}} className="NewNoticeList color-highlight">
                        <a className="app_color">
                            敬请注意：近期有玩家反映收到假冒网站的诈骗短信或电话， 太阳城亚洲官网在此提醒您，切勿对此类诈骗短信或电话做出回应，以防泄露您的账户信息。
                        </a>
                    </marquee>
                </div>
                <span id="commissiondivided" className="anchor-overlap-fix"></span>
                <img alt="Affiliate Chart" src={require("./images/aff-chart.jpg")} className="w100"/>
                <span id="termsofservice" className="anchor-overlap-fix" ></span>
                <section className="custome">
                    <div className="custome-content">
                        <h2>
                            <span className="icon-list"></span>
                            服务条款
                        </h2>
                        <div className="show-hide-content">
                            <div className={this.state.sectionOpen?"custome-container custome-container--expanded":"custome-container"} id="content">
                                <ol>
                                    <li>
                                        1.每月必须最少有5个活跃会员（指当月有进行存款并于相关项目最少投注一次（有效投注）才会判定为是“活跃的玩家”）。若未满足最低的活跃会员要求，合作伙伴的盈利将会累计到下个月，并且只能在满足活跃会员条件后才能申请取款。
                                    </li>
                                    <li>
                                        2.单月佣金必須最低达到人民币500元，您的提成条件才能成立，佣金最快将于该月最后一天完结后的15个工作日内进行结算，经核数完毕后佣金将於结算后5个工作天内存入合作伙伴所提供的指定账户内。
                                    </li>
                                    <li>
                                        3.所有未领取的佣金，将会在6个月后归零。
                                    </li>
                                    <li>
                                        4.合作伙伴需支付会员所得的优惠红利或其他促销活动所产生的费用。
                                    </li>
                                    <li>
                                        5.合作伙伴本身的游戏账号不可以在自己的合作伙伴旗下。如有上述情况发生，我们将会扣除该账户所得到的输赢，并将该账户从您合作伙伴下线里注销。
                                    </li>
                                    <li>
                                        6.任何使用不诚实的方法以骗取佣金将会永久冻结账户，所有佣金一概不予发还。
                                    </li>
                                    <li>
                                        7.在进行合作伙伴账号违规行为调查的期间，太阳城亚洲将会暂停向合作伙伴付款，直到对该账号审核完毕。
                                    </li>
                                    <li>
                                        8.在没有获得太阳城亚洲批准的情况下，合作伙伴不可以提供任何红利及优惠活动，如违反规定我们将会永久关闭账户。
                                    </li>
                                    <li>
                                        9.合作伙伴总月佣金的50%不能只来自于一个活跃玩家的净盈利，否则只能按15%进行佣金计算。
                                    </li>
                                    <li>
                                        10.我们会时刻关注所有合作伙伴的表现，如果客户在规定的6个月内不符合我们预期的表现，太阳城亚洲有权随时冻结或取消其合作伙伴账户，而不需要任何理由或者提前通知。
                                    </li>
                                    <li>11.任何无法控制的情况下，若合作伙伴账号不能按照原计划执行，太阳城亚洲将冻结合作伙伴账户，并且将不承担任何责任和不支付任何佣金。</li>
                                    <li>12.未预先通知的情况下，太阳城亚洲将有权更改以上条款与条例。</li>
                                    <li>13.如您需要了解更多关于如何发展二级合作伙伴获取额外10%佣金，请发送邮件至<a href={`mailto: ${this.state.online_service_email}`}>{this.state.online_service_email}</a> 咨询详情。</li>
                                </ol>
                            </div>
                            <div className={this.state.sectionOpen?"custome-container__toggler icon-closed":"custome-container__toggler icon-open"} onClick={()=>{this.setState({sectionOpen:!this.state.sectionOpen})}}></div>
                        </div>
                    </div>
                </section>
                <span id="commonquestions" className="anchor-overlap-fix"></span>
                <section className="faq">
                    <div className="faq-content">
                        <h2>
                            <div className="icon-question-mark"></div>
                            常见问题
                        </h2>
                        <ul id="faqFullList">
                            <li>
                                <div className="icon-min collapsed" data-toggle="collapse" data-target="#faq1" aria-expanded="false"></div>
                                <h4>什么是合作伙伴？</h4>
                                <span id="faq1" className="collapse" aria-expanded="false" style={{"height": "0px"}}>
                                    太阳城亚洲为申博旗下的现金网。<br/>
                                    1.	合作伙伴无需投入任何资金，只需要通过专属链接介绍新玩家进入太阳城亚洲网站进行游戏。<br/>
                                    2.	旗下玩家遇到的任何游戏问题或存取款问题，可直接联系24小时在线客服进行协助。<br/><br/>
                                </span>
                            </li>
                            <li>
                                <div className="icon-expand collapsed" data-toggle="collapse" data-target="#faq2"></div>
                                <h4>什么是占成代理？</h4>
                                <span id="faq2" className="collapse">
                                    占成代理需要先投入资金，旗下玩家的存取款需要通过代理自行处理。是自负盈亏的代理方式，有一定的风险。<br/>
                                    如果您想成为集团代理，详细的信息您需要发送邮件至 <a href="mailto:sunbet.cs@gmail.com">sunbet.cs@gmail.com</a> 或者拨打sunbet总部热线 0063-9991788888 咨询代理事宜。<br/><br/>
                                </span>
                            </li>
                            <li>
                                <div className="icon-expand collapsed" data-toggle="collapse" data-target="#faq3"></div>
                                <h4>如何推广/如何发展更多的玩家？</h4>
                                <span id="faq3" className="collapse">
                                    您可以尝试使用以下几种推广方式：<br/>
                                    1.	充分利用您的网站，将太阳城亚洲的广告素材放置在网站明显的位置进行推广。<br/>
                                    2.	充分利用建站技巧，建立一个专用于宣传太阳城亚洲的网站或信息页，透过SEO关键词的知识，提高搜索排名，让玩家快速搜到您的信息页。<br/>
                                    3.	充分利用网络社交媒体，如微信，微博，QQ，人人网等，将太阳城亚洲进行宣传。<br/>
                                    4.	充分利用下线人脉优势， 透过您丰富的人脉资源，向您的朋友圈内喜欢游戏的朋友们介绍太阳城亚洲，告知他们关于太阳城亚洲精彩的游戏与活动。<br/><br/>
                                </span>
                            </li>
                            <li>
                                <div className="icon-expand collapsed" data-toggle="collapse" data-target="#faq4"></div>
                                <h4>如何知道会员是否在我的旗下？</h4>
                                <span id="faq4" className="collapse">
                                    一旦您的合作伙伴账号被启动，您将会获得一条“专属链接”。凡是通过您专属链接注册，或是在注册时填写您的专属代码都会成为您旗下的会员。<br/><br/>
                                </span>
                            </li>
                            <li>
                                <div className="icon-expand collapsed" data-toggle="collapse" data-target="#faq5"></div>
                                <h4>佣金如何结算？</h4>
                                <span id="faq5" className="collapse">
                                    佣金按月结算，佣金 = (公司输赢 – 会员所享红利或优惠 + 上月累计输赢) x 佣金比率，当月佣金最快将会于次月15～20个工作日内进行结算。<br/><br/>
                                </span>
                            </li>
                            <li>
                                <div className="icon-expand collapsed" data-toggle="collapse" data-target="#faq6"></div>
                                <h4>如果我有负盈利会怎么样？</h4>
                                <span id="faq6" className="collapse">
                                    如果您旗下玩家赢钱，负盈利将会为您累积至下月，直到您负盈利抵消并且为公司带来正盈利才会有佣金产生。<br/><br/>
                                </span>
                            </li>
                            <li>
                                <div className="icon-expand collapsed" data-toggle="collapse" data-target="#faq7"></div>
                                <h4>如何发展合作伙伴下线？</h4>
                                <span id="faq7" className="collapse">
                                    您推荐的下线合作伙伴，需在注册合作伙伴账号时填写您的6位数合作代码，即可成为您的合作伙伴下线，下线合作伙伴当月获取佣金的10%将作为您的奖励。<br/><br/>
                                </span>
                            </li>
                            <li>
                                <div className="icon-expand collapsed" data-toggle="collapse" data-target="#faq8"></div>
                                <h4>如何更改后台密码？</h4>
                                <span id="faq8" className="collapse">
                                    登录后台系统后，点击“更改密码”可更改密码。<br/><br/>
                                </span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        );
    }
}


