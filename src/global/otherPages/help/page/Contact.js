// help 聯繫我們

import React, {Component} from 'react';
import {config} from "globalConfig";
import * as cache from "../../../../store/CacheHelper";

class ApiSysConfAction{
    constructor(key){
        this.key = key;
    }
    fly(callback){
        let user = cache.get("user") || {};
        let authorization="";
        if (user && user.token) {
            authorization = user.username+' '+user.token;
        }
        return fetch(config.apiPath+"client/all_sys_cfg?Tag="+config.webSiteTag, 
            {
                method: "get",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization":authorization
                }
            }
        ).then(function(response){
            return response.json();
        }).then(function(data){
            callback(data);
        });
    }
}

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_worktime: "周一至周五 11:00/21:00(GMT+8)",
            online_service_link: "",
            online_service_email: "xp9677@gmail.com" || "",
        }
    }

    componentDidMount(){
        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({
                    online_service_link: resp.Config.online_service_link,
                    online_service_email:resp.Config.online_service_email
                });
            }
        });
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.state["online_service_link"],'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    render() {
        const appName = config.appName;
        return (
            <div id="contact" className="contents ">
                {
                    config.spec == "xpj-bt6"  || 
                    config.spec == "xpj-ldl"  ||
                    config.spec == "vns-uzi"  ||
                    config.spec == "mgm-vv8"  ||
                    config.spec == "xpj-asa"  ||
                    config.spec == "ldgj-kyy" ||
                    config.spec == "jhgj-jjh"?
                <div>
                    <div className="content-contact">
                        <h3>联系我们</h3>
                        <p className="contact-p">邮箱</p>
                        <table cellpadding="0" cellspacing="0" className="contact_tab" style={{border: '0px'}}>
                            <tr>
                                    <td style={{border: '0px'}}><span className="huang">{this.state["online_service_email"]}</span>
                                            <br/>有关服务问题，请联系以上电邮。
                                    </td>
                                    <td style={{border: '0px'}}><span className="huang">{this.state["online_service_email"]}</span>
                                    <br/>
                                        有关存款/提款问题，请联系以上电邮。
                                    </td>
                                    </tr>
                                    <tr>
                                <td style={{border: '0px'}}><span className="huang">{this.state["online_service_email"]}</span>
                                    <br/>
                                    询问会员奖励计划
                                </td>
                                <td style={{border: '0px'}}>
                                    <span className="huang">{this.state["online_service_email"]}</span>
                                    <br/>
                                    如您有任何意见、建议、未解决或不满意的问题，请联系以上电邮。
                                    <br/>
                                    我们将在24小时内回复您。
                                </td>
                            </tr>
                            <tr>
                                <td style={{border: '0px'}}>
                                    <span className="huang">{this.state["online_service_email"]}</span>
                                    如果您有好的广告资源或者好的合作关系，可以联系以上电邮
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="line"></div>
                    <div className="content">
                        <div className="contact-font" id="test1" ><b  onClick={this.serversOpen.bind(this)} >即时咨询</b>
                            <div className="contact-text"><span></span>
                            您好，我能否为您服务嘛？
                            </div>
                            <a id="test1" className="clic-btn" target="_parent" href="#">
                                <input type="submit" value="点击这里" onClick={this.serversOpen.bind(this)} className="contact-btn"  />
                            </a>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div className="helpContent">
                        <h3 className="title1">联系我们  
                            <a id="test1" className="help-btn right" onClick={this.serversOpen.bind(this)}>
                                <span>即时咨询</span>
                            </a>
                        </h3>
                        <ul className="contentul">
                            <li><a href="#57">1.我们的联系电话</a></li>
                            <li><a href="#58">2.存款/提款问题</a></li>
                            <li><a href="#59">3.意见/建议</a></li>
                            <li><a href="#60">4.建立合作关系</a></li>
                        </ul>
                    </div>

                    <h4 className="title2" id="57">1.我们的联系电话<a href="#top" className="ReturnTop">返回顶部</a></h4>
                    <div className="helpContent">
                        <p className="contact-p">
                有关{appName}的服务问题，请联系电话：<span>{config.spec.includes('bee')?"0063 9089818888":"0063 90891888"}</span>
                        </p>
                    </div>

                    <h4 className="title2" id="58">2.存款/提款问题<a href="#top" className="ReturnTop">返回顶部</a></h4>
                    <div className="helpContent">
                        <p className="contact-p">
                有关{appName}的存款/提款问题，请联系QQ：<span>{config.spec.includes('bee')?236018888:692799961}</span>
                        </p>
                    </div>

                    <h4 className="title2" id="59">3.意见/建议<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                    <div className="helpContent">
                        <p className="contact-p">
                            如您有任何意见、建议、未解决或不满意的问题，请联系电邮：<span>{config.spec.includes('bee')?"beecomplain@gmail.com":"36536588vip@gmail.com"}</span>
                        </p>
                    </div>

                    <h4 className="title2" id="60">4.建立合作关系<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                    <div className="helpContent">
                        <p className="contact-p">
                如果您有好的广告资源或者好的合作关系，请联系QQ：<span>{config.spec.includes('bee')?"582037776":"70528883"}</span>
                        </p>
                    </div>
                </div>
            }        
            </div>
        )
    }
}



export default (Contact);