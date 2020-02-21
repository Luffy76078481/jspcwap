
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {config} from "globalConfig";
import "./AffixService2.scss";

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
class AffixService2 extends Component{
    constructor(){
        super();
        this.state = {
            show:true,
            online_service_link: "",
            online_service_qq: config.qq || "",
            online_service_email: "xp9677@gmail.com" || "",
            online_service_phone: config.phone || "",
            online_service_skype: config.skype || ""
        }
    }
    close(){
        this.setState({show: false});
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
    render(){
        return (
            <div className="affix-online-server-2" style={{display: this.state.show ? "block":"none"}}>
                <div className="hd" onClick={this.serversOpen.bind(this)}></div>
                <div className="bd">
                    <div className="block online-service" onClick={this.serversOpen.bind(this)}>
                        <div className="title"><i className="fa fa-headphones"></i><span>&nbsp;7x24</span></div>
                        <div className="content"><span>在线客服</span></div>
                    </div>
                    <div className="block online-qq">
                        <a href={"tencent://message/?uin="+this.state["online_service_qq"]+"&Menu=yes"} target="_blank">
                        <div className="title"><i className="fa fa-qq"></i>&nbsp;<span>客服QQ</span></div>
                        <div className="content"><span>{this.state["online_service_qq"]}</span></div>
                        </a>
                    </div>
                    <div className="net">
                        <a href="/nav.html" target="_blank"></a>
                   </div>
                </div>
                <div className="block ft">
                    <span className="left-span"></span>
                    <span className="center" onClick={this.close.bind(this)}>关&nbsp;闭</span>
                    <span className="right-span">2</span>
                </div>
            </div>
        );
    }



}

export default (AffixService2)