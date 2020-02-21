/**
 * 
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

class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            online_service_worktime: "周一至周五 11:00/21:00(GMT+8)",
            online_service_link: "",
            online_service_qq: config.qq || "",
            online_service_email: "xp9677@gmail.com" || "",
            online_service_phone: config.phone || "",
            online_service_skype: config.skype || ""
        }
    }
    componentDidMount(){

        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({
                    online_service_skype:  resp.Config.online_service_skype,
                    online_service_worktime: resp.Config.online_service_worktime,
                    online_service_link:resp.Config.online_service_link,
                    online_service_email:resp.Config.online_service_email,
                    online_service_qq:resp.Config.online_service_qq,
                    online_service_phone:resp.Config.online_service_phone,
                    agent_service_qq:resp.Config.agent_service_qq
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
            <div id="ContactUs" className="mainCon show">
                <div className="title"></div>
                <div className="center">
                    <div className="cont">
                        <p className="info">謝謝浏览本網站。若您有任何需要或意见，请與我们联络。</p>
                        {this.state["online_service_phone"]?
                            <div className=" items phone">
                                <span><i className="fa fa-phone-square  iconGroup tab_inco6"></i>&nbsp;&nbsp;客服专线:</span>
                                <span style={{marginLeft: "10px"}} >{this.state["online_service_phone"]}</span>
                            </div>:null}
                        {this.state["online_service_email"]?
                            <div className=" items email">
                                <span><i className="fa fa-at  iconGroup tab_inco6"></i>&nbsp;&nbsp;客服信箱:</span>
                                <span style={{marginLeft: "10px"}} >{this.state["online_service_email"]}</span>
                            </div>:null}

                        {this.state["online_service_qq"]?
                            <div className="items qq">
                            <span><i className="fa fa-qq  iconGroup tab_inco6" ></i>&nbsp;&nbsp;QQ客服专线:</span>
                            {this.state["agent_service_qq"]?
                                <span style={{marginLeft: "10px"}} >{this.state["agent_service_qq"]}</span>:
                                <span style={{marginLeft: "10px"}} >{this.state["online_service_qq"]}</span>
                            }
                            </div>:null}

                        <p className="items"><span className=" iconGroup tab_inco6"><i className="fa fa-clock-o" ></i></span>&nbsp;&nbsp;工作时间：{this.state["online_service_worktime"]}<br/></p>
                        <p className="items"><span className=" iconGroup tab_inco7"><i className="fa fa-headphones"></i></span>&nbsp;&nbsp;需要协助-<a id="test1" target="_parent" href="#" onClick={this.serversOpen.bind(this)} ><b className="huang">我要协助</b></a></p>
                    </div>
                </div>
            </div>
        )
    }
}



export default (ContactUs);