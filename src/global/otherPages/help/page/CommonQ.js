
import React, {Component} from 'react';
import {config} from "globalConfig";

class CommonQ extends Component {
    render() {
        const appName = config.appName;
        return (
            <div id="commonQ" className="contents ">
                <div className="helpContent">
                    <p className="title1">一般常见问题</p>
                    <ul className="contentul">
                        <li><a href="#17">1、{appName}线上娱乐场接受哪些货币？</a></li>
                        <li><a href="#18">2、如何在{appName}线上娱乐场账户中存款？</a></li>
                        <li><a href="#19">3、如何从{appName}线上娱乐场账户中提款？</a></li>
                        <li><a href="#20">4、多久可以到款项？</a></li>
                        <li><a href="#21">5、存款与提款时，需缴交手续费吗？</a></li>
                        <li><a href="#22">6、为何有不同的钱包账户？</a></li>
                    </ul>
                </div>
                <h4 className="title2" id="17">
                    1.{appName}线上娱乐场接受哪些货币？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>{
                        appName}线上娱乐场接受以下所有列出的货币种类:<br/>
                        暂时只支持 人民币  (RMB)<br />
                        即将开放的货币：
                        <span className="address">
                            1、欧元 (EUR)<br />
                            2、印度卢比 (INR)<br />
                            3、印尼卢比 (IDR)*<br />
                            4、日元 (JPY)<br />
                            5、马来西亚令吉 (MYR)*<br />
                            6、泰铢 (THB)<br />
                            7、美金 (USD)<br />
                            8、越南盾 (VND)*<br />
                        </span>
                    </p>
                </div>
                <h4 className="title2" id="18">
                    2. 如何在{appName}线上娱乐场账户中存款？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>在您准备在{appName}线上娱乐场下注之前，您可以使用以下几种方法存入资金到您的账户:<br />
                        <span className="address">
                            1、在线存款-第三方支付线上支付<br />
                            2、网银转账<br />
                            3、ATM自动柜员机<br />
                            4、ATM现金入款<br />
                            5、银行柜台<br />
                            6、手机银行<br />
                        </span>
                        注意：<br />
                        管理者将不接受任何银行支票或者信用卡银行存款<br />
                        更快的存款到账您的账户，请使用以上推荐的存款方式<br />
                    </p>
                </div>
                <h4 className="title2" id="19">
                    3.如何从{appName}线上娱乐场账户中提款？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        只提供一种提款方式，就是银行转账，提交请求之后，5-30分钟会给您处理提款到账服务。<br />
                        有任何问题及时联系在线客服<br />
                    </p>
                </div>
                <h4 className="title2" id="20">
                    4.提款申请多久之后能到账？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        一旦收到和办理{appName}线上娱乐场的提款申请，任何提款要求都将被发送到我们的财务部进行办理。提款手续将按照以下的时间表进行：
                    </p>
                    从收到提款要求算起，所需办理时间：5-30分钟，具体到账时间要根据具体跨行转账时间
                    <p>
                        <br />
                        <strong>第一次提款</strong>
                        如果您是第一次提款，并根据{appName}线上娱乐场提款条例发送资料。
                    </p>
                </div>
                <h4 className="title2" id="21">
                    5.存款与提款时，需缴交手续费吗？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        无需缴交手续费。但请注意，您使用的银行，这笔费用并不是{appName}线上娱乐场收取的。<br />
                        所有存提款银行收取费用均由用户自行承担和偿付我们将不予办理。<br />
                    </p>
                </div>
                <h4 className="title2" id="22">
                    6.为何有多个不同钱包帐户？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        我们设有两种钱包类型——中心钱包 / 产品钱包<br />
                        1、	中心钱包是{appName}线上娱乐场所有产品的现金钱包，存款和提款操作必须在中心钱包进行。您可以将中心钱包的有效资金进行提款或者转账到其他产品钱包。<br />
                        2、产品钱包中的有效资金可以直接进行投注, 也可以转账到中心钱包或者其他产品钱包。<br /><br />
                        产品钱包对应游戏如下：<br />
                        {/* ·188体育： 针对体育平台。<br /> */}
                        ·{appName}直营娱乐平台：{appName}直营娱乐场<br />
                        ·欧洲厅（PT平台）：可在PT平台进行老虎机，角子机、真人娱乐、扑克等小游戏<br />
                        ·美洲厅（MG平台）：可在MG平台进行老虎机，角子机、刮刮卡等小游戏<br />
                        ·台湾厅（BBIN）： 可在BBIN平台进行体育、真人娱乐、彩票等游戏<br />
                        .亚洲厅（AG）：可在AG平台进行真人娱乐、小游戏等<br />
                        {/* .广州厅（188）：可在188金宝博平台进行真人娱乐、体育彩票。<br /> */}
                        您可以选择从中心钱包至其他产品钱包进行转账 或在各个产品钱包间进行转账。<br />
                        在转账面板"转账从"中下拉目录，选择需要的产品钱包进行转账。 
                    </p>
                </div>
            </div>
        )
    }
}



export default (CommonQ);