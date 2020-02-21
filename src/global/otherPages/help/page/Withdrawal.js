
import React, {Component} from 'react';
import {config} from "globalConfig";

class Withdrawal extends Component {
    render() {
        const appName = config.appName;
        return (
            <div id="withdrawal" className="contents">
                <div className="helpContent">
                    <h3 className="title1">提款</h3>
                    <p >1.如何从{appName}线上娱乐场账户中提款？</p>
                </div>
                <h4 className="title2">
                    1.如何从{appName}线上娱乐场账户中提款？<a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        第一步：会员登入后，进入会员中心银行提款。<br/>
                        输入取款密码，确认提款人姓名与您银行帐号持有人相符。如果提款人的姓名和银行账号的持有人不符的话，将拒绝出款。<br/>
                        谢谢合作，有任何问题请第一时间联系我们的在线客服。<br/>
                        输入出款额度（最少提款100元），如有任何问题，请您联系线上客服，我们将在第一时间为您解答问题。<br/>
                        <br/>
                        <br/>
                        重要提示：因考虑用户财产安全因素，嘱咐您需要牢记保管好您的取款密码以及账户密码。<br/>
                        同时避免在任何平台泄露您的这些密码，若因个人因素出现问题公司将不予负责！
                        <br/>
                        <br/>
                        <br/>
                    </p>
                </div>
            </div>
        )
    }
}
export default (Withdrawal);


