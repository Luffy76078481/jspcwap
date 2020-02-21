
import React, {Component} from 'react';
import {config} from "globalConfig";

// APi
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
class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_email: "xp9677@gmail.com" || "",
        }
    }
    componentDidMount() {
        window.$(".txt h4").click(function(){
            var ele = $(this).parent().find(".ans");
            if(window.$(ele).is(":visible")) {
                window.$(ele).slideUp();

            }else{
                window.$(ele).slideToggle();
            }
        });
        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({
                    online_service_email: resp.Config.online_service_email,
                    online_service_link:resp.Config.online_service_link
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
    renderService(){
        return(
            <a className="service" href="#" onClick={this.serversOpen.bind(this)}>在线客服</a>
        )
    }
    render() {
        const appName = config.appName;
        const service = this.renderService();
        return (
            <div id="Faq" className="show">
                <div className="title"></div>
                <div className="center">
                    <div className="cont">
                        <div className="tit"><i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;一般问题</div>
                        <div className="txt">
                            <h4>如何加入？</h4>
                            <span className="ans">您可以于{appName}首页点击 "免费注册"，如实填写基本会员资料后，即可立即登记成为会员。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>如果忘记密码怎么办？</h4>
                            <span className="ans">如果您忘记密码，请点击联系在线客服，客服人员会协助您修改密码。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>我可以直接在网络上存款吗？</h4>
                            <span className="ans">可以，存款方式包含【在线支付】以及【公司入款】两种，请登入会员中心，在〝我要存款〞页面里选择适合您的存款方式，填妥资料，按照提示一步步进行即可。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>请问我要怎么存款？</h4>
                            <span className="ans">您必须要先成为正式会员，并拥有网络银行，登入网站至会员中心的〝我要存款〞页面里选择适合您的存款方式，填妥资料，按照提示一步步进行即可。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>目前公司提供哪些银行入款？</h4>
                            <span className="ans">目前仅提供一间银行公司入款，您也可以使用在线支付的网银转账，即可选择您所使用的银行进行入款。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>如果我存款后，款项并未加入会员账号？</h4>
                            <span className="ans">您存入的每笔款项，都会即时加上你的帐户，如因网路问题或其他状况而延误，请您洽询24小时{service}。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>出款多久可以到帐？</h4>
                            <span className="ans">取款全年无休，周一至周日或是国定假日的取款，都照常处理，一般出款皆为15分钟内到账。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>您申请出款后，久久未到款该怎么办？</h4>
                            <span className="ans">每笔出款公司都会审核后处理，逾时未收到出款皆有可能是，会员提供的"取款银行账号资料有误"或是"首次出款的会员需核对基本资料及银行帐户"等问题所造成。财务人员在无法出款时，都会给予会员通知。若会员未填写有效的联络方式，也会造成财务无法联系的情况发生，请会员务必保持正确有效的联系资讯。会员也可随时洽询24小时{service}人员，为您查询您的取款状态。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>取款银行账号一定要本人的吗？</h4>
                            <span className="ans">为保障会员能确实顺利取得款项，取款账号必须绑定会员本人的银行账号；在顾及会员权利与安全考量下，非本人的银行账号是无法取款的。因此，取款账号的户名必须要与注册时所填写的真实姓名一样。真实姓名是无法变更的。若注册时因真实姓名没有确实填写而造成无法取款，恕不负责。</span><br/>
                        </div>

                        <div className="tit"><i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;游戏相关问题</div>
                        <div className="txt">
                            <h4>我在哪里可以找到游戏的规则？</h4>
                            <span className="ans">在未登入前，您可以在游戏的最外层看到"游戏规则"选项，点击该选项后，里面清楚地告诉您游戏的玩法、规则及派彩方式。 在游戏窗口中，也有"规则"选项，让您在享受游戏乐趣的同时，可以弹跳窗口随时提醒您游戏规则。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>我可以只参观而不下注吗？</h4>
                            <span className="ans">可以，我们诚挚邀请您登入了解我们的电子游戏。所有游戏都是可以进行观看了解哦。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>您们的游戏会用多少副牌？</h4>
                            <span className="ans">百家乐我们会用8副牌，其他游戏则会根据其性质有所调整。</span><br/>
                        </div>
                        <div className="txt">
                            <h4>您们何时会洗牌？</h4>
                            <span className="ans">所有纸牌游戏，当红的洗牌记号出现或游戏因线路问题中断时便会进行重新洗牌。(依据各项游戏项目不同而定。请可参考各项游戏规则说明)</span><br/>
                        </div>
                        <div className="txt">
                            <h4>你们如何判断无效投注及对打？</h4>
                            <span className="ans">投注在体育赛事/视讯直播/电子游艺/彩票游戏中的--对冲、对打或对押存在无风险投注的注单与和局或取消的注单不计算有效投注额，风控部门会去判别您账号登入以及投注状况的合理性，公司并保留最后出款之权利。例：无风险投注包括在百家乐同时投注庄家，闲家，轮盘同时投注黑色，红色，单，双，大，小等注单</span><br/>
                        </div>
                        <div className="txt">
                            <h4>有效投注额计算方式</h4>
                            <span className="ans">有产生『输』『赢』的投注即為有效投注；有效投注额以派彩金额计算，但有效投注额不会大于投注额。例：实际产生的输赢大于投注金额，则有效投注额=投注金额。</span><br/>
                        </div>
                        <div className="tit"><i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;技术相关问题</div>
                        <div className="txt">
                            <h4>最低的硬件系统要求是什么?</h4>
                            <span className="ans">
                                任何可以接上互联网的计算机。<br/>
                                SVGA显示适配器–最少要1204x768像素256色彩以上。<br/>
                                区域宽带。<br/>
                                Windows , Mac OS X , Linux操作系统。<br/>
                                Internet Explorer浏览器v10.0 或以上 (版本11.0 或以上更好)，Mozilla Firefox (浏览器v5.0 或以上)，Opera (浏览器v12.0 或以上)，Chrome(浏览器v40.0 或以上)，Safari (浏览器v6.0 或以上)。<br/>
                                要浏览在线娱乐城，你可以在Macromedia网站下载Macromedia Flash Player浏览器附加程序(10.0或以上版本)。
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default (Faq);
