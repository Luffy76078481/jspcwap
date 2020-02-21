import React, {Component} from 'react';
import {config} from "globalConfig";
import * as help from "../../help/helpJson.js";

// 以后重构
class AllianceContent extends Component {
    render() {
        const appName = config.appName;
        const spec = config.spec;
        return (
            <div id="AllianceContent" className="show">
                <div className="money-fousImg"></div>
                <div className="fnameCenter juzhong">
                    <p>
                        <span style={{"fontSize":"35px"}}>合作共赢计划</span><br/>
                        只需简单步骤，就能带领您迈向成功之路！
                    </p>
                </div>
                <div className="borderHeng"></div>
                <div className="fnameCenter">
                    <div className="moneyStep">
                        <div className="moneyStepList">
                            <h3>1. 注册账号</h3>
                            <p>在线注册代理会员账号<br/>
                                等待审核通过
                            </p>
                        </div>
                        <div className="moneyBorderSan"></div>
                        <div className="moneyStepList">
                            <h3>2. 开始推广</h3>
                            <p>申请代理连接条或者宣传代码<br/>
                                或者代理代码，进行推广
                            </p>
                        </div>
                        <div className="moneyBorderSan"></div>
                        <div className="moneyStepList">
                            <h3>3. 赚取佣金</h3>
                            <p>按照代理合作计划<br/>
                                赢取丰厚的佣金
                            </p>
                        </div>
                        <div className="clear"></div>
                        <div className="moneStepAdd">
                            <a onClick={this.props.onClickJoin} href="#" className="productMix">现在加入</a>
                        </div>
                        {
                            config.spec.includes('j98')?
                            <div>
                                <p>
                                金沙娱乐城期待一切有胆量、有才略、有远见的有识之士加入我们的同富共荣圈。<br/>
                                现诚邀您拥有的网络资源或是人脉资源，都欢迎您成为我们的合作伙伴，0门槛0投资0风险高回报！<br/>
                                快速简单赚钱！我们为您提供多方位支援，两种代理方案任选，
                                赚取最高35%且金额无上限的代理佣金或选择从有效投注额中抽水的代理方案，让您游刃有余，无本生利！<br/>
                                现在您需要进行的是[代理注册]——开始！请点击以上[代理注册]在线提出申请，
                                填写正确的各项资料，姓名、手机、邮箱务必真实有效，以便为您支付佣金。<br/>
                                成功注册后3日内由专员与您联系开通，并提供您的代理账号及推广链接/推广码，
                                金沙娱乐城代理联系QQ：3387600092
                                0风险，高回报，每月准时出佣；<br/>
                                全年度优惠不断，满足各种类型玩家需求；<br/>
                                金沙娱乐城营运多年，深受百万玩家信赖；<br/>
                                多年大力推广，品牌热度十足，代理可坐享广告品牌效应；<br/>
                                我们提供顶级产品：老虎机、真人娱乐城、棋牌游戏、体育投注、彩票等多种游戏。<br/>
                                我们的市场策略为业界最佳，口碑也是我们最好的营销方式。<br/>
                                我们的合营团队竭诚为您服务！
                                代理联系QQ：3387600092.<br/>
                                还等什么？马上加盟吧。注册加入，开始推广，赚取佣金，简单三步开始成就梦想之旅。<br/>
                                建议您可以通过QQ动态、空间、微信朋友圈、微聊、微博、51、新浪、等各大知名论坛进行简简单单推广，
                                轻轻松松赚钱，月入百万不是问题！<br/>
                                【温馨提示：推广时，必须推出 j599.com 官方网址，
                                注册会员的时候必须使用推广代码即可成为您的线下会员，等待领取佣金！】<br/>
                                注：新增会员需要有效投注10000以上才可以计算为有效会员，否则视为无效

                                </p>
                            </div>
                            :
                            <div>
                                <p className="f18 yahei juzhong moneyTextStyle">您可能已经发现，{appName}合营计划为我们的合营伙伴提供了业界最具吸引力的共赢计划。<br/>
                                    在{appName}，我们所有的合营伙伴都有可能赚到最高达40%的合营佣金!</p>
                                <h3 className="f28  juzhong font300" style={{margin:"20px 0"}} >我如何赚取佣金？</h3>
                                <p className="yongjin f16">
                                    当您注册成为{appName}的合营伙伴后，基于您每月推荐到{appName}体育博彩和娱乐场的玩家所产生的盈利，
                                    通过您的用户名，我们可以追踪到流量、
                                下载量、注册数量、有参与投注的会员数量等信息，基于所有的数据来计算佣金。
                                通过我们的市场营销工具，您的合营事业将会很容易建立起来。</p>
                            </div>           
                        }
                    </div>
                </div>
                <div className="borderHeng"></div>
                <div className="fnameCenter">
                    <p className="moneyPstyle juzhong f18 "><span className="huang">佣金计划</span>（分层佣金结构）</p>
                    <p className="juzhong f14 textListText">注：合营伙伴除了要达到上表中提及的活跃会员数以外，
                    {config.appName}还制定了一套针对会员质量的审核标准，以考核您拥有会员的质量。<br/>
                    对于部分会员质量不达标，且未能达到最低自身活跃玩家要求的合营伙伴，我们将不会发放推介佣金。计算示例
                    </p> 
                    {
                        help.renderAllianceTable()
                    }
                    {  
                        spec=='bet365-bee'?
                        <p className="f14 textListText">
                            1.彩票、棋牌类游戏抽成按有效投注计算！<br/>

                            2.当月总纯盈利收入定义： 当月总纯盈利收入＝当月下线会员有效活跃数总派彩－当月下线会员有效活跃数总优惠红利。<br/>

                            当月有效活跃会员数定义：<br/>
                            当月必须最少5个活跃会员数且每位会员当月最少投注RMB 1,000元；存款不低于RMB 500元。<br/>

                            优惠红利定义：<br/>
                            bet365给予玩家的现金红利或是折扣。<br/>
                            我们会时刻关注所有合营联盟伙伴的表现，如果客户在规定的时间内（90天）不符合我们
                            预期的表现，bet365合营联盟有权随时冻结或取消其合营联盟合作伙伴账户，而不需要任何
                            理由或者提前通知。<br/>
                            请紧记任何使用不诚实的方法以骗取佣金将会永久冻结账户，所有佣金一概不予发还。<br/>
                            例1: 加入bet365合营联盟合作计划后单月佣金达到500元，达到最少5个活跃用户，佣金将会于该月最后一天完结后5个工作日内存入联盟合作伙伴的指定账户内。<br/>
                            例2: 达到5个活跃会员的要求，但佣金少于人民币500元，将会累计到下一个月的佣金一起发放。<br/>
                            例3: 假若本月佣金出现负数，将会带到下一个月继续累计，直至获得正数并高于人民币500元。 <br/>
                            支付方法 只要将您的银行个人账户信息绑定于合营系统，您的合营佣金将会自动转到账户上，让您安枕无忧。<br/> 
                            佣金结算周期： 每个自然月第一天至最后一天（美东时间）<br/>
                            佣金核对时间： 每月10日 <br/>
                            佣金发放时间： 每月12日（自动派发至绑定银行卡，如需更换请提前联系代理专员）<br/>
                        </p>:spec==='js-j98'?
                        <p>
                            代理条款：<br/>
                            注：新增会员需要存款300以上并且达到5倍打码以上才可以计算为有效会员，否则视为无效。<br/>
                            请谨记任何使用不诚实方法以骗取佣金将会永久冻结账户，佣金一律不予发还！<br/>
                            新合营商正式确立合作关系之后，须用心推广，否则公司有权终止合作关系。<br/>
                            佣金结算结算之时我司将扣除部分反水优惠，以及运营成本，详情请和代理专员了解！<br/>
                            佣金支付方式：<br/>
                            结算期为本月一号至每月最后一天结算周期为美东时间，佣金结算每月10号请联系代理专员审批，我司将直接汇入您的账户。

                        </p>:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                        <p className="f14 textListText">
                        
                            1.佣金计算方法：【负派彩金额-费用】×佣金比例=所得佣金。【负派彩金额减掉费用大于0为有佣金，正派彩的金额加费用将会累积到下个月】 
                            例如：派彩是 -1,200,000 ， 费用为200,000， 
                            <br/>
                            2.系统自动结算初始条件：5个存款会员和5个有效投注会员（注：每个会员有效投注≥1000；公司盈利＞1）<br/>
                            3.我们会时刻关注合作商的表现，会及时地调整佣金比率并通知合作商。<br/>
                            4.负收益将被带入下一月。<br/>
                            5.合作伙伴需要的支付费用,优惠和市场费用,这些费用将会累计并会在代理每月的佣金中扣除。这些费用包括:<br/>
                            （1）转账费用 - 包括所有代理会员的存款和提款费用。<br/>
                            （2）媒介费用 - 任何费用支出为{appName}支持或协助代理与促销或营销目的。<br/>
                            （3）优惠红利 - 给予代理会员的现金红利或是折扣。<br/>
                        </p>
                    }
                </div>
                <div className="borderHeng"></div>
                {
                    config.spec == 'bet365-bee'?
                    null:
                    <div className="fnameCenter moneyPaddingFot">
                        <p className="juzhong">
                            <span className="huang f18 ">支付方式</span> 只要提供您的银行个人账户信息给我们，您的合营佣金将会自动转到账户上，让您安枕无忧。
                        </p>
                        <p className="juzhong">
                            <span className="huang f18 ">我何时才能收到佣金？</span> {appName}将会在次月5日统一支付佣金到合营伙伴的代理帐户，提交提款就可以
                        </p>
                    </div>                    
                }
                <div className="borderHeng xx"></div>
            </div>
        )
    }
}

export default (AllianceContent);