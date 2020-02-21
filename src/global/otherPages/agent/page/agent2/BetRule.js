
import React, {Component} from 'react';
import {config} from "globalConfig";

class BetRule extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const appName = config.appName;
        return (
            <div id="BetRule" className="mainCon show">
                <div className="title"></div>
                <div className="center">
                    <div className="cont">
                        <div className="txt">
                            <span>
                                <span className="yy">【{appName}】</span>
                                <br/>
                                致力于推行有节制博彩。我们把博彩作为娱乐性社交活动推广且我们认为如果您能控制好自身博彩且对自己负责，则博彩即可一直保持其娱乐性。
                                <br/>
                                然而我们知道对于一部分人来说，博彩不仅不再是无害的娱乐活动，而且已经成为问题。
                            </span>
                            <br/>
                        </div>
                        <div className="txt">
                            <span>我们认为博彩应该一直是一种娱乐性的社交活动。记住这些简单的小建议能帮助您确保自身的博彩不成为问题。</span><br/>
                        </div>
                        <div className="txt">
                            <span>1、博彩只是一种娱乐，不应被视为赚钱的方法。</span><br/>
                            <span>2、理智投注并避免想赢回所输的钱。</span><br/>
                            <span>3、只投注您有能力支付的金额。使用存款限额以管理您花费的金钱。</span><br/>
                            <span>4、控制您花费在博彩上的时间。设置活动提醒以提醒您已登录账户的时间。</span><br/>
                            <span>5、平衡博彩和其他活动。如果博彩是您唯一的娱乐方式，想想您是否还可从中体会到乐趣。</span><br/>
                            <span>6、博彩时定时休息。持续博彩可导致您在博彩时间和认知上的偏差。</span><br/>
                            <span>7、不要在酒后或您心烦沮丧时进行博彩。</span><br/>
                            <span>8、想一想您花费在博彩上的金钱。在您的在线账户历史中追踪您的活动。</span><br/>
                            <span>9、如果您需要咨询问题博彩，请联系我们的客服小组或问题博彩支持服务机构。</span><br/>
                            <span></span>
                            <br/>
                        </div>
                        <div className="txt">
                            <span>未满18周岁的人士进行博彩属非法行为，【{appName}】将严肃处理未成年博彩。我们会对所有客户进行年龄验证，并要求不确定的客户提交年龄证明文件。</span><br/>
                            <span>若发现任何未满18周岁的客户在【{appName}】进行博彩，其账户都将被关闭，且没收所有彩金。</span><br/>
                            <span>如果您怀疑有未满18周岁的客户在【{appName}】进行博彩，请联系我们报告此事。网站拦截软件</span><br/>
                        </div>
                        <div className="txt" >
                            <span>您可使用一系列的第三方软件来监控或者限制访问互联网：</span><br/>
                            <div>
                                <span>1、Net Nanny（www.netnanny.com）：通用拦截软件用来防止儿童浏览不适宜的网站内容。iOS和Android设备也同样适用。</span><br/>
                                <span>2、CYBERsitter（www.cybersitter.com）：过滤软件允许父母选择自定义过滤网站。</span><br/>
                                <span>3、GamBlock（www.gamblock.com）：专用拦截软件用来阻止使用者进入博彩网站。Android设备也同样适用。</span><br/>
                                <span>4、Betfilter（www.betfilter.com）：专用拦截软件用来阻止使用者进入博彩网站。Android设备也同样适用。</span><br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default (BetRule);