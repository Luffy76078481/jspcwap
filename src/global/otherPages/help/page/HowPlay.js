/**
 * Created by sobi on 2017/10/17.
 */

import React, {Component} from 'react';
import {config} from "globalConfig";
import * as cache from "../../../../store/CacheHelper";


class ApiSysConfAction {
    constructor(key) {
        this.key = key;
    }
    fly(callback){
        let user = cache.get("user") || {};
        let authorization="";
        if (user && user.token) {
            authorization = user.username+' '+user.token;
        }
        return fetch(config.apiPath+"client/all_sys_cfg?Tag="+config.webSiteTag, {
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
class HowPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
        }
    }
    componentDidMount(){

        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({
                    online_service_link: resp.Config.online_service_link,
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
            <div id="howPlay" className="contents ">
                <div className="helpContent">
                    <p className="title1">开始玩</p>

                    <div className="helpContent">
                        <h3>
                            <strong>系统要求<br/><br/></strong>
                        </h3>
                        <p>
                            安装{appName}客户端最低系统配置要求:<br/>
                        </p>
                        <p>
                                        1.6GHz的CPU（双核处理器）<br/>
                                        至少1GB的内存<br/>
                                        16MB 16位的显卡 (分辨率为1200x800或更高)<br/>
                                        至少3GB的可用硬盘空间<br/>
                                        Windows XP, SP2或更新的系统<br/>
                                        网速要达到512Kbit/s（仅对现场游戏）<br/>
                                        需在IE上安装Flash Player &nbsp;11.0.1.152或最新版本<br/><br/>
                                    </p>
                                    <h3>
                                        <strong>下载安装{appName}<br/><br/></strong>
                                    </h3>
                                    <p>
                                        安装{appName}客户端方便又快捷！
                                    </p>
                                    <p>
                                        请按以下步骤下载安装：<br/><br/><br/>
                                    </p>
                                    <ol>
                                        <li>
                                            点击下载，会弹出一个下载对话框，请将游戏软件保存在您的硬盘中。
                                        </li>
                                        <li>
                                            之后会出现“另存为 (Save As)”提示窗口，请将此游戏软件存放在您的电脑桌面上，我们建议您不要擅自修改软件名称。
                                        </li>
                                        <li>
                                            现在请点击“下载免费软件”的图标，然后请您依照第1和第2步的程序下载游戏。
                                        </li>
                                        <li>
                                            下载完毕后，请双击图标，开始安装娱乐城游戏。在您安装游戏的过程中，{appName}的图标就会自动的在您电脑荧幕上显示。
                                        </li>
                                        <li>
                                            如果您有任何问题，请您随时与我们的 <a onClick={this.serversOpen.bind(this)}>24小时在线客服联系</a>
                                        </li>
                                        <li>
                                            在您成功的安装游戏之后，请双击{appName}的图标，接着您就可以开始进行游戏！
                                        </li>
                                    </ol>
                                    <p>
                                        在您下载好软件后就可以体验各种娱乐城游戏！您也可以先看游戏简介进行更多了解。<br/><br/>
                                    </p>
                                    <p className="center123-1">
                                        <img alt="getting_started_01" src="/content/images/files/getting-started/getting_started_01.gif" width="700"/>
                                    </p>
                                    <p className="center123-2">
                                        <img alt="getting_started_02" src="/content/images/files/getting-started/installation-sc.png" height="251" width="383"/>
                                    </p>
                                    <h3>
                                        <strong><br/><br/>注册大发娱乐场真钱账户<br/><br/></strong>
                                    </h3>
                                    <p>
                                        您现在可以通过以下两种方式注册{appName}真钱账户。
                                    </p>
                                    <p>
                                        <span>在{appName}网站上注册</span>
                                    </p>
                                    <ol>
                                        <li>
                                            <a href="http://www.067287.com/regist.html" target="_blank">点击这里</a>即可在{appName}的网站上进行注册。
                                        </li>
                                        <li>
                                            填写表格里的注册信息。
                                        </li>
                                        <li>
                                            在网站上注册成功后，您可以在{appName}进行游戏。
                                        </li>
                                    </ol>
                                    <h3>
                                        <span><br/><br/>客户端注册<br/><br/></span>
                                    </h3>
                                    <ol>
                                        <li>
                                            下载{appName}客户端后即可注册真钱账户。
                                        </li>
                                        <li>
                                            您只需打开软件点击“真钱游戏”。
                                        </li>
                                        <li>
                                            填写您的个人信息。
                                        </li>
                                        <li>
                                            注册{appName}真钱账户就这么简单，您现在即可进行真钱游戏。
                                        </li>
                                    </ol>
                                    <p>
                                        <strong>注册{appName}娱乐账户</strong>
                                    </p>
                                    <p>
                                        如果在真钱游戏前您想先熟悉游戏，您可选择注册娱乐账户，娱乐账户和真钱账户里的游戏情况相同，不同之处是在真钱账户中，您赢到的是真钱人民币。
                                    </p>
                                    <ol>
                                        <li>
                                            下载{appName}客户端后即可注册娱乐账户。
                                        </li>
                                        <li>
                                            您只需打开软件选择“娱乐账户”。
                                        </li>
                                        <li>
                                            填写您的个人信息。
                                        </li>
                                        <li>
                                            注册{appName}娱乐账户就这么简单，您现在即可进行娱乐游戏。
                                        </li>
                                    </ol>
                    </div>
                </div>

            </div>
        )
    }
}



export default (HowPlay);