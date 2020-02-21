/**
 * Created by b3 on 2017/12/1.
 */
import React, {Component} from 'react';
import Registered from '../Registered';
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

class Deposit extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({online_service_link: resp.Config.online_service_link});
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
        const appName = config.appName;
        return (
            <div id="Deposit" className=" mainCon show">
                <div className="title"></div>
                <div className="center">
                    <div className="cont">
                        <div className="txt">
                            <span>{appName}提供两种充值方式，点击【线上存款】后，您可以任选一种给您的会员账号充值：</span><br/>
                            <span style={{lineHeight: "35px"}}>方式一、公司入款/转账到银行卡</span><br/>
                            <div className="ml">
                                <span>【公司入款/转账到银行卡】是将款项直接存入{appName}指定的银行账户，我们收到您的款项和您提交的入款信息后，
                                   再人工为您添加相应额度的充值方式。您可以使用网银转帐、手机银行，或者柜台汇款等方式转账或汇款到本公司银行账户，具体步骤如下：</span><br/>
                                <span>1、登陆会员帐号，点击“线上存款”，选择“公司入款/转账到银行卡”，进入查看{appName}最新的收款银行账户信息，依系统提示完成提交入款申请。</span><br/>
                                <span>2、使用网银转帐、手机银行，或者柜台汇款等方式将款项打入本公司银行账号上。
                                  跨行转账麻烦您使用跨行加急或快汇处理。</span><br/>
                                <span>3、转账成功后，请您立即联系24小时在线客服未您查询与添加款项。</span><br/>
                                <span><i className=" icons fa fa-circle"style={{fontSize:"1px"}} ></i> &nbsp;&nbsp;推荐会员使用农行进行存款，更加高效快捷。</span><br/>
                                <span><i className=" icons fa fa-circle"style={{fontSize:"1px"}} ></i> &nbsp;&nbsp;汇款金额请添加零头，如 103.01 或 1500.80，便于财务查收，加快到账速度。</span><br/>
                                <span><i className=" icons fa fa-circle"style={{fontSize:"1px"}} ></i> &nbsp;&nbsp;收款帐户不定期更新，请在每次存款前，点击“公司入款”页面查询最新收款账号。</span><br/>
                                <span>存款至过期账户造成财务无法查收，会员需自行承担损失。</span><br/>
                            </div>
                            <div className="block"></div>
                        </div>
                        <div className="txt">
                            <span style={{lineHeight: "35px"}}>方式二、 在线支付-网银支付</span><br/>
                            <div className="ml">
                                <span>【在线支付】的网银支付到与本公司合作的第三方平台，
                                    第三方平台再自动为您的会员账号充值的充值方式，步骤简单，方便快捷，无需手续费。具体步骤如下：</span><br/>
                                <span>1、进入【线上存款】页面后，点选”在线支付”。</span><br/>
                                <span>2、填写预充值金额。</span><br/>
                                <span>3、选择”支付银行”。</span><br/>
                                <span>4、确认送出后，将载入网络银行页面。载入时将自动对该笔交易进行加密，请耐心等待。</span><br/>
                                <span>5、进入网上银行页面，确实填写您的银行帐号资讯。支付成功后，额度将立即加入您的会员帐号。</span><br/>
                            </div>
                            <div className="block"></div>
                        </div>
                        <div className="txt">
                            <span style={{lineHeight: "35px"}}>方式三、 在线支付-微信、支付宝、QQ支付</span><br/>
                            <div className="ml">
                                <span>【微信、支付宝、QQ】的支付到与本公司合作的第三方平台，第三方平台再自动为您的会员账号充值的充值方式，步骤简单，方便快捷，无需手续费。具体步骤如下：</span><br/>
                                <span>1、进入【线上存款】页面后，点选”在线支付”，選擇微信支付或支付宝支付或QQ支付。</span><br/>
                                <span>2、填写预充值金额。请注意：由于微信风控严格，请填入带有尾数的金额入款，较易成功。</span><br/>
                                <span>3、扫二维码进行入款，支付成功后，额度将立即加入您的会员帐号。</span><br/>
                                <span><i className=" icons fa fa-circle"style={{fontSize:"1px"}} ></i>&nbsp;&nbsp;在线支付仅供小额度存款。跨行汇款或存款金额低于3000元建议使用在线支付，无需手续费，支付完成，立即到账。</span><br/>
                                <span><i className=" icons fa fa-circle"style={{fontSize:"1px"}} ></i>&nbsp;&nbsp;支付成功后，请等待几秒钟，提示「支付成功」按确认键后再关闭支付窗口，款项会即时存入您的会员账号。</span><br/>
                            </div>
                            <div className="block"></div>
                        </div>
                        <div className="txt">
                            <span style={{lineHeight: "40px"}}><i className="fa fa-hand-o-right"></i>&nbsp;&nbsp;温馨提示:</span><br/>
                            <span>会员充值或游戏时，如遇线路拥挤无法正常开启，登录{appName}线路检测中心查看更多备用网址。</span><br/>
                            <span>存款遇到问题？点击联络<a className="service" href="#" onClick={this.serversOpen.bind(this)}>在线客服</a>，我们将竭诚为您服务。</span><br/>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}



export default (Deposit);