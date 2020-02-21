
import React, {Component} from 'react';
import {config} from "globalConfig";

class MyAccount extends Component {
    render() {
        const appName = config.appName;
        return (
            <div id="myAccount" className="contents">
                <div className="helpContent">
                    <h3 className="title1">我的账户</h3>
                    <ul className="contentul">
                        <li><a href="#26">1、如何在{appName}线上娱乐场建立帐户？</a></li>
                        <li><a href="#27">2、我注册账号或保留账号需要支付管理费吗？</a></li>
                        <li><a href="#28">3、登录时，显示密码错误的提示，怎么办？</a></li>
                        <li><a href="#29">4、我的个人资料安全吗？</a></li>
                    </ul>
                </div>
                <h4 className="title2" id="26">
                    1.<a href="#top" className="ReturnTop">返回顶部</a> 
                    如何在{appName}线上娱乐场建立帐户？
                </h4>
                <div className="helpContent"> 
                    如何在{appName}线上娱乐场建立帐户？
                    <p> 
                        非常简单，只需您几分钟时间。首先在主页的上方点击"免费注册"。<br />
                        进入注册页面，并填写以下项目：<br />
                        用户名 – 用来识别身份登入帐户<br />
                        密码 - 有大小写之分，必须是8到10个含字母和数字的混合字符。请谨慎保存您的密码。<br />
                        电话号码 – 为方便与您联系，以便通知您有关产品与重要信息。<br />
                        您必需接受{appName}线上娱乐场的规则与条款，确认您已年满18岁，以完成协议。<br />
                        您可以选择是否节后，{appName}给您的一些优惠活动。<br />
                    </p>
                </div>
                <h4 className="title2" id="27">
                    2.我注册账号或保留账号需要支付管理费吗？
                    <a href="#top" className="ReturnTop">返回顶部</a>
                </h4>
                <div className="helpContent">
                    <p>我注册账号需要支付管理费吗？</p>
                    关于注册账号，我们网站不收取任何的管理费用。
                </div>
                <h4 className="title2" id="28">
                    3.登录时，显示密码错误的提示，怎么办？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>.登录时，显示密码错误的提示怎么办？</p>
                    检查并确认输入的你们是否正确 （注意大小写字母，有存在空格的情况）<br />
                    如问题持续，请点击首页的找回密码。<br />
                    咨询在线客服提供相关信息进行修改。
                </div>
                <h4 className="title2" id="29">
                    4.我的个人资料安全吗？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        我的个人资料安全吗?<br/>
                        {appName}线上娱乐场绝不泄露您的个人资料给任何第三方，除非收到法庭<br />
                        传单或可行性法律的要求及判决。<br />
                        我们有权通过网站向有关付款平台服务提供商以及金融保险机构提供必要的个人信息以完成付款要求。<br />
                        所有用户提供的个人信息，其传送都将通过安全端口（SSL 128 bit encryption Standard）并存放在公众无法进入的保密环境之下。所有数据的内部出入都受到限制及严密的监控。
                    </p>
                </div>
            </div>
        )
    }
}



export default (MyAccount);


