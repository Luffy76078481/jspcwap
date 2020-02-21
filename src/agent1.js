
import React,{Component} from 'react';
import IndexContent from './global/otherPages/agent/page/IndexContent'; // 首页
import BrandContent from './global/otherPages/agent/page/BrandContent'; // 品牌介绍
import AllianceContent from './global/otherPages/agent/page/AllianceContent'; // 合营计划
import Registered from './global/otherPages/agent/page/Registered';// 注册页
import ToolsContent from './global/otherPages/agent/page/ToolsContent'; // 营销工具
import FaqContent from './global/otherPages/agent/page/FaqContent'; // 常见问题
import ContactContent from './global/otherPages/agent/page/ContactContent';// 联系我们
import XpjAllianceContent from './global/otherPages/agent/page/xpj/AllianceContent'; // xpj合营计划
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

export default class AgentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab:"IndexContent",
            agentLoginUrl:"",
            contactData:{}
        }
    }

    // 判断初始进入某个页面
    componentDidMount() {
        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({
                    agentLoginUrl: resp.Config.agent_link,
                    contactData:{
                        online_service_skype: resp.Config.online_service_skype,
                        online_service_worktime: resp.Config.online_service_worktime,
                        online_service_link:resp.Config.online_service_link,
                        online_service_email:resp.Config.online_service_email,
                        online_service_qq:resp.Config.online_service_qq,
                        online_service_phone:resp.Config.online_service_phone,
                        agent_service_qq:resp.Config.agent_service_qq,
                    }
                });
            }
        }); 
        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
        var web = getUrlParameter('tab');
        this.setState({tab:web});
    }
    // 点击导航切换页面
    onClickTab(tab) {
        this.setState({tab:tab});
    }
    // 页面内容部分
    renderSubPage() {
        if(this.state.tab === "IndexContent"){
           return <IndexContent {...this.state} onClickJoin={this.onClickTab.bind(this, "Registered")}></IndexContent>
        }else if(this.state.tab === "BrandContent"){
            return <BrandContent onClickJoin={this.onClickTab.bind(this, "Registered")}/>
        }else if(this.state.tab ==="Registered"){
            return <Registered onClickJoin={this.onClickTab.bind(this, "AllianceContent")}/>
        }else if(this.state.tab ==="AllianceContent"){
            if(config.spec =="xpj-bt6" || config.spec =="xpj-ldl" ||config.spec =="xpj-xpj"){
                return <XpjAllianceContent onClickJoin={this.onClickTab.bind(this, "Registered")}/>
            }else {
                return <AllianceContent onClickJoin={this.onClickTab.bind(this, "Registered")}/>
            }
        }else if(this.state.tab ==="ToolsContent"){
             return <ToolsContent onClickJoin={this.onClickTab.bind(this, "Registered")}/>
        }else if(this.state.tab ==="FaqContent"){
            return <FaqContent {...this.state.contactData} />
        }else if(this.state.tab ==="ContactContent"){
            return <ContactContent {...this.state.contactData}></ContactContent>
        }
        return <IndexContent {...this.state} onClickJoin={this.onClickTab.bind(this, "Registered")}/>;
    }
    // 如果我没有记错的话，这是传说中render渲染。
    render() {
        return (
            <div id="IndexContent">
                <div className="header_bg">
                    <div className="header">
                        <div className="logo_img">
                            <a href="/">
                                <div className="header_left fl"></div>
                            </a>
                            <div className="header_right fr"></div>
                        </div>
                    </div>
                    <div className="menuNav">
                        <div className="menuBtn">
                            <ul >
                                <li className={this.state.tab==="IndexContent"?"active":''} onClick={this.onClickTab.bind(this,"IndexContent")}  data-tab="IndexContent" ><a className={this.state.tab==="IndexContent"?"now":''} href="#">网站首页</a></li>
                                <li className={this.state.tab==="BrandContent"?"active":''} onClick={this.onClickTab.bind(this,"BrandContent")}  data-tab="BrandContent" ><a className={this.state.tab==="BrandContent"?"now":''} href="#">品牌介绍</a></li>
                                <li className={this.state.tab==="AllianceContent"?"active":''} onClick={this.onClickTab.bind(this,"AllianceContent")}  data-tab="AllianceContent"><a className={this.state.tab==="AllianceContent"?"now":''} href="#">合营计划</a></li>
                                <li><a href={this.state.agentLoginUrl} target="_blank">代理登录</a></li>
                                <li className={this.state.tab==="Registered"?"active":''} onClick={this.onClickTab.bind(this,"Registered")}  data-tab="Registered" ><a className={this.state.tab==="Registered"?"now":''} href="#">立即加入</a></li>
                                <li className={this.state.tab==="ToolsContent"?"active":''} onClick={this.onClickTab.bind(this,"ToolsContent")}  data-tab="ToolsContent" ><a className={this.state.tab==="ToolsContent"?"now":''} href="#">营销工具</a></li>
                                <li className={this.state.tab==="FaqContent"?"active":''} onClick={this.onClickTab.bind(this,"FaqContent")}  data-tab="FaqContent" ><a className={this.state.tab==="FaqContent"?"now":''} href="#">常见问题</a></li>
                                <li className={this.state.tab==="ContactContent"?"active":''} onClick={this.onClickTab.bind(this,"ContactContent")} data-tab="ContactContent" ><a className={this.state.tab==="ContactContent"?"now":''}  href="#">联系我们</a></li>
                            </ul>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                {
                    this.renderSubPage()
                }
                <div className="footerNav">
                    <div className="footerNavBtn">
                        <a onClick={this.onClickTab.bind(this,"AllianceContent")}  data-tab="IndexContent" href="#" > 代理专区 </a> /
                        <a onClick={this.onClickTab.bind(this,"ContactContent")}   data-tab="ContactContent" href="#" > 联系我们 </a> /
                        <a onClick={this.onClickTab.bind(this,"FaqContent")}  data-tab="FaqContent" href="#" > 帮助中心 </a>
                    </div>
                </div>
                <div className="footer">
                    <div className="footer_bg"></div>
                </div>
            </div>
        );
    }
}
