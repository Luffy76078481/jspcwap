
import React, {Component} from 'react';
import {config} from "globalConfig";

class Deposit extends Component {
    render() {
        const appName = config.appName;
        return (
            <div id="deposit" className="contents">
                <div className="helpContent">
                    <h3 className="title1">存款</h3>
                    <ul className="contentul">
                        <li><a href="#23">1、如何通过国内存款进行存款？</a></li>
                        <li><a href="#24">2、如何使用快速转账方式进行存款？</a></li>
                        <li><a href="#25">3、如何采用第三方支付存款？</a></li>
                    </ul>
                </div>
                <h4 className="title2" id="23">
                    1.我如何通过国内存款进行存款？<a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>国内存款服务是提供给在以下国家注册的{appName}线上娱乐场客户：<br />
                        •	马来西亚，持有{appName}线上娱乐场户口<br />
                        •	越南，持有{appName}线上娱乐场人民币户口<br />
                        •	泰国，持有{appName}线上娱乐场人民币户口<br />
                        •	印尼，持有{appName}线上娱乐场人民币户口<br />
                        •	以及持有中国人民币账户的{appName}线上娱乐场户口。<br />
                        步骤 1：登录{appName}线上娱乐场官方网址，到用户中心-》存款-》银行转账，获取银行转账账号，如遇到问题，请及时联系在线客服。<br />
                        步骤 2：把您想存入的金额转入所告知的账号。请在转账或存款时明示您的{appName}线上娱乐场用户名。<br />
                        步骤 3：登录您的{appName}线上娱乐场账户，在存款目录下选择国内存款，并填写所有被要求的信息。<br />
                        步骤 4：及时到账的话，我们会在3-5分钟会将金额存入到您在{appName}线上娱乐场的账号，您可以在存款记录中及时的跟踪存款记录的状态。
                        如果银行转账没能及时到账。请允许我们在一至两个的工作日来办理您的银行转账存款。
                    </p>
                </div>
                <h4 className="title2" id="24">
                    2、如何使用快速转账方式进行存款？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        下列类型账户可以通过快速转账方式进行存款：
                        <br /><br />
                        <span className="address">
                            1、在中国注册的人民币账户<br />
                        </span>
                        步骤 1：登录{appName}线上娱乐场官方网址，到用户中心 -》我的存款 -》银行转帐，获取银行转帐帐号，如遇到问题，请即时联系在线客服。<br />
                        步骤 2：将款项转账到我们提供给您的银行账号中。<br />
                        步骤 3：登录您的{appName}线上娱乐场账户，点击主页上方的"提款/存款/转账"，存款类型选择"银行转账"根据页面提示完整填写快速转账存款信息并提交。<br />
                        快速转账存款金额到账后，会自动显示在中心钱包中。
                    </p>
                </div>
                <h4 className="title2" id="25">
                    3. 如何采用第三方支付进行存款
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        第三方支付方式采用环迅第三方支付，快捷、方便、安全！如遇任何问题随时联系在线客服！
                        <br />
                    </p>
                </div>
            </div>
        )
    }
}



export default (Deposit);