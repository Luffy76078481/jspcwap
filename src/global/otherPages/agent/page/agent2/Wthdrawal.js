/**
 * Created by b3 on 2017/12/1.
 */
import React, {Component} from 'react';
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

class Wthdrawal extends Component {
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
    renderService(){
        return(
            <a className="service" href="#" onClick={this.serversOpen.bind(this)}>在线客服</a>
        )
    }

    render() {
        const appName = config.appName;
        const service = this.renderService();
        return (
            <div id="Wthdrawal" className=" mainCon show">
                <div className="title"></div>
                <div className="center">
                    <div className="cont">
                        <div className="txt">
                            <span style={{lineHeight: "35px"}}>您可以通过以下方式取款：</span><br/>
                            <div className="ml">
                                <span>1、会员登入后点选<span className="yy">“线上取款”</span>。</span><br/>
                                <span>2、核对优惠稽查，确认是否有通过常态稽查以及优惠稽查，如有任何疑问，请联系24小时
                                    {service}咨询。</span><br/>
                                <span>3、输入您的“取款密码”，并确认提款人姓名与您银行帐号持有人相符。</span><br/>
                                <span>4、输入“取款金额”，如有任何问题，可联系 {service}协助。</span><br/>
                                <span>5、可以选择以下方式取款：</span><br/>
                                <span>-绑定中国工商银行(优先)、中国农业银行、交通银行、中国银行、中国建设银行、中国光大银行、兴业银行、
                                    中国民生银行总行、招商银行、中信银行、广东发展银行、中国邮政、上海浦东发展银行等等为出款银行的会员﹐{appName}提供24小时不限次数、不限金额，全免费手续费在线提款。<span className="yy">15分钟</span>达到指定银行。如有任何问题，
                                    请联系24小时在线客服，谢谢！</span><br/>
                            </div>
                        </div>
                        <div className="txt">
                            <span style={{lineHeight: "35px"}}>【取款注意事项】</span><br/>
                            <div className="ml">
                                <span>1、最低取款为$100人民币，单笔取款上限为$100000人民币 。</span><br/>
                                <span>2、{appName}保留权利审核会员帐户，若由上次出款起，有效下注金额未达“每次存款额度”，而申请出款者，公司讲收取“存款额度”50％的行政费用，以及50RMB出款手续费，
                                    若出现开提示，系统会自动取消出款申请，出款金额返还到个人帐户。</span><br/>
                                <span>3、会员可以享24小时内可享受免费出款2次，若出款第3次以上除需审核外，每次出款须承担出款的20％手续费。（如会员出款1000RMB 手续费200＝1200）</span><br/>
                                <span>4、如有任何问题，请洽24小时 {service}，谢谢！</span><br/>
                                <span>5、可以选择以下方式取款：</span><br/>
                                <span>-绑定中国工商银行(优先)、中国农业银行、交通银行、中国银行、中国建设银行、中国光大银行、兴业银行、
                                    中国民生银行总行、招商银行、中信银行、广东发展银行、中国邮政、上海浦东发展银行等等为出款银行的会员﹐{appName}提供24小时不限次数、不限金额，全免费手续费在线提款。<span className="yy">15分钟</span>达到指定银行。如有任何问题，
                                    请联系24小时{service}，谢谢！</span><br/>
                                <span><i className=" icons fa fa-circle"style={{fontSize:"1px"}} ></i> &nbsp;&nbsp;请注意各游戏和局/未接受/取消注单，不纳入有效投注计算。运动博弈游戏项目，大赔率玩法计算有效投注金额，小赔率玩法计算输赢金额为有效投注。</span><br/>
                                <span><i className=" icons fa fa-circle"style={{fontSize:"1px"}} ></i> &nbsp;&nbsp;大赔率产品包括: 过关、波胆、总入球、半全场、双胜彩、冠军赛。</span><br/>
                                <span><i className=" icons fa fa-circle"style={{fontSize:"1px"}} ></i> &nbsp;&nbsp;{appName}相关优惠，请详见"<a className="service" href="/promotions">优惠活动</a>"</span><br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Wthdrawal);