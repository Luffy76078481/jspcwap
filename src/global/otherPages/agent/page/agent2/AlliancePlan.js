/**
 * Created by b3 on 2018/4/3.
 */

import React, {Component} from 'react';
import {config} from "globalConfig";


class AlliancePlan extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const appName = config.appName;
        return (
            <div id="AlliancePlan" className="mainCon show">
                <div className="plan-main">
                    <div className="top">
                        <h3>合作共赢计划</h3>
                        <p>只需简单步骤，就能带领您迈向成功之路！</p>
                    </div>
                    <div className="step">
                        <ul>
                            <li>
                                <span>1.注册账号</span><br/>
                                <span>在线注册代理会员账号</span><br/>
                                <span>等待审核通过</span><br/>
                            </li>
                            <li>
                                <span>2.开始推广</span><br/>
                                <span>申请代理连接条或者宣传代码</span><br/>
                                <span>或者代理代码，进行推广</span><br/>
                            </li>
                            <li>
                                <span>3.赚取佣金</span><br/>
                                <span>按照代理合作计划</span><br/>
                                <span>赢取丰厚的佣金</span><br/>
                            </li>
                        </ul>
                        <div className="s-btn" onClick={this.props.onClickJoin}>现在加入</div>
                    </div>
                    <div className="p-content">
                        <p>您可能已经发现，{appName}合营计划为我们的合营伙伴提供了业界最具吸引力的共赢计划。</p><br/>
                        <p>在{appName}，我们所有的合营伙伴都有可能赚到最高达40%的合营佣金!</p><br/>
                        <h3>我如何赚取佣金？</h3>
                        <p>当您注册成为{appName}的合营伙伴后，基于您每月推荐到{appName}体育博彩和娱乐场的玩家所产生的盈利</p><br/>
                        <p>，通过您的用户名，我们可以追踪到流量、下载量、注册数量、有参与投注的会员数量等信息，</p><br/>
                        <p>基于所有的数据来计算佣金。通过我们的市场营销工具，您的合营事业将会很容易建立起来。</p>
                        <h3>佣金计划</h3>
                        <p style={{lineHeight:'20px'}}>注：合营伙伴除了要达到上表中提及的活跃会员数以外，{appName}还制定了一套针对会员质量的审核标准，以考核您拥有会员的质量。</p><br/>
                        <p>对于部分会员质量不达标，且未能达到最低自身活跃玩家要求的合营伙伴，我们将不会发放推介佣金。计算示例</p><br/>
                        <table className="tableList" cellPadding="0" cellSpacing="0" >
                            <tbody> 
                            <tr>
                                <td>存款会员数</td> 
                                <td>有效投注会员</td>
                                <td>最小公司盈利(&gt;)</td>
                                <td>最大公司盈利(≦)</td>
                                <td>公司盈利佣金比例(%)</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>5</td>
                                <td>1</td>
                                <td>150000</td>
                                <td>25</td>
                            </tr>
                            <tr>
                                <td>25</td>
                                <td>25</td>
                                <td>150000</td>
                                <td>600000</td>
                                <td>30</td>
                            </tr>
                            <tr>
                                <td>50</td>
                                <td>50</td>
                                <td>600000</td>
                                <td>1200000</td>
                                <td>35</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>100</td>
                                <td>1200000</td>
                                <td>12000000</td>
                                <td>40</td>
                            </tr>
                            </tbody>
                        </table>
                        <p style={{lineHeight:'27px'}}>
                            1.佣金计算方法：【负派彩金额-费用】×佣金比例=所得佣金。【负派彩金额减掉费用大于0为有佣金，正派彩的金额加费用将会累积到下个月】
                            例如：派彩是 -1,200,000 ， 费用为200,000，佣金比例为40%，佣金计算为 【1,200,000-200,000】×40%=400,000<br/>

                            2.系统自动结算初始条件：5个存款会员和5个有效投注会员（注：每个会员有效投注≥1000；公司盈利＞1）<br/>

                            3.我们会时刻关注合作商的表现，会及时地调整佣金比率并通知合作商。<br/>

                            4.负收益将被带入下一月。<br/>

                            5.合作伙伴需要的支付费用,优惠和市场费用,这些费用将会累计并会在代理每月的佣金中扣除。这些费用包括:<br/>

                            （1）转账费用 - 包括所有代理会员的存款和提款费用。<br/>

                            （2）媒介费用 - 任何费用支出为{appName}支持或协助代理与促销或营销目的。<br/>

                            （3）优惠红利 - 给予代理会员的现金红利或是折扣。<br/>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}



export default (AlliancePlan);