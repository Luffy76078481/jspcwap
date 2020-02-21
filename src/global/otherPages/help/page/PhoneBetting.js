

import React, {Component} from 'react';
import {config} from "globalConfig";

class PhoneBetting extends Component {
    render() {
        const appName = config.appName;
        return (
            <div id="phoneBetting" className="contents">
                <div className="helpContent">
                    <h3  className="title1">手机下注</h3>
                    <ul className="contentul">
                        <li><a href="#a">1、此功能可否运用于所有手机？</a></li>
                        <li><a href="#b">2、登入时显示密码错误的提示。怎么办？</a></li>
                        <li><a href="#c">3、我的个人资料安全吗？</a></li>
                        <li><a href="#d">4、什么是WAP和GPRS?</a></li>
                    </ul>
                </div>
                <h4 className="title2" id="a">
                    1. 此功能可否运用于所有手机？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>您的手机必须开启 GPRS 和 WAP 功能此外，您的手机还须具备 JAVA 技术。<br /></p>
                </div>
                <h4 className="title2" id="b">
                    2. 登入时显示密码错误的提示。怎么办？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>.登录时，显示密码错误的提示怎么办？</p>
                    检查并确认输入的你们是否正确 （注意大小写字母，有存在空格的情况）<br />
                    如问题持续，请点击首页的找回密码。<br />
                    咨询在线客服提供相关信息进行修改。
                </div>
                <h4 className="title2" id="c">
                    3. 我的个人资料安全吗？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        我的个人资料安全吗?<br />
                        {appName}线上娱乐场绝不泄露您的个人资料给任何第三方，除非收到法庭<br />
                        传单或可行性法律的要求及判决。<br />
                        我们有权通过网站向有关付款平台服务提供商以及金融保险机构提供必要的个人信息以完成付款要求。<br />
                        所有用户提供的个人信息，其传送都将通过安全端口（SSL 128 bit encryption Standard）并存放在公众无法进入的保密环境之下。所有数据的内部出入都受到限制及严密的监控。
                    </p>
                </div>
                <h4 className="title2" id="d">
                    4. 什么是 WAP 和 GPRS?
                    <a href="#top"className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p
                        >WAP (无线应用通讯协定)<br />
                        手机无线上网技术<br />
                        GPRS (通用无线技术) <br />
                        一种在现有GSM网络下的高速数据连接，只根据您所下载的数据量收费，与上网时间长短无关。 
                    </p>
                </div>
            </div>
        )
    }
}



export default (PhoneBetting);


