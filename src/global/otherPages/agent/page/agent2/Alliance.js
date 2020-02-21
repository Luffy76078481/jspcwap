
import React, {Component} from 'react';
import Registered from './Register';
import {config} from "globalConfig";
import AlliancePlan from "./AlliancePlan"
import * as help from "../../../help/helpJson.js";

// 客户信息API
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
class AllianceContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab:"plan",
            online_service_link: "",
            online_service_qq: config.qq || "",
            online_service_email: "xp9677@gmail.com" || "",
            online_service_phone: config.phone || "",
            online_service_skype: config.skype || ""
        }
    }
    componentDidMount(){
        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({
                    online_service_skype:  resp.Config.online_service_skype,
                    online_service_worktime: resp.Config.online_service_worktime,
                    online_service_link:resp.Config.online_service_link,
                    online_service_email:resp.Config.online_service_email,
                    online_service_qq:resp.Config.online_service_qq,
                    online_service_phone:resp.Config.online_service_phone,
                    agent_service_qq:resp.Config.agent_service_qq
                });
            }
        });
    }
    // 内容
    renderSubPage() {
        if(this.state.tab === "plan"){
            const appName = config.appName;
            if(config.spec=="xhtd-bt6" || config.spec == "xhtd-ldl" || config.spec == "xhtd-xhtd"){
                return(
                    <div className="cont plan">
                        {
                            config.spec=='xhtd-xhtd'?
                            <div>
                                <p className="tit">代理详情：</p>
                                <div className="txt">
                                    官方直营【澳门新濠天地娱乐场】作为国际驰名品牌之一的在线博彩公司，
                                    提供最广范围并最具有竞争力的产品。我们真诚的为您打造最高档次的合作平台，
                                    最好的代理加盟方案。8大加盟优势让您轻松享受月入百万！                                    
                                </div>
                            </div>:null
                        }
                        <div className="tit">全网最高返佣方式</div>
                        <div>
                            {help.renderAllianceTable()}
                        </div>
                        {
                            config.spec=="xhtd-xhtd"?<p className="tit">发展10个以上有效会员，即可免费申请短位域名一条！</p>:null
                        }
                        <p className="tit">注：代理佣金每月2-5号结算，届时请联系业务经理结算即可，QQ ：{this.state.agent_service_qq}</p>
                        <div className="txt">
                            {
                               config.spec=="xhtd-xhtd"?
                               <div>
                                   <p>1、高达55%的代理佣金，让你轻松月入百万</p>
                                   <p>2、零风险、零投资、高回报，每月准时返佣；</p>
                                   <p>3、全年度优惠不断，满足各种类型玩家需求</p>
                                   <p>4、提款快速金额不封顶，实力雄厚资金有保障；</p>
                                   <p>5、运营多年，深受百万玩家信赖；</p>
                                   <p>6、拥有博彩与线上博彩执照，信誉保证；</p>
                                   <p>7、多年大力推广，品牌热度十足，代理可坐享广告品牌效应；</p>
                                   <p>8、数据信息详尽，可查阅线下投注记录；</p>
                                   <p>
                                        把握时机，马上加盟吧；注册代理加入，开始推广，赚取佣金，简单三步上手。
                                        点击【代理加盟】按钮，提出注册申请，填写正确的各项资料，姓名、手机、邮箱务必真实有效，以便为您支付佣金。
                                        注册成功后联系代理专员即可开启赚钱之路。
                                        如有任何问题，请随时咨询。
                                   </p>
                               </div>
                               :
                               `例如：假设代理第一个月，负盈利100万(就是我们亏)、第二个月盈利90万，这两月是无佣金、第三月盈利50万，减负盈利10万，等于40万，分为（5+5+30）；
                                按比例算：5万*40%+5万*40%+30万*45%=175000元`
                            }
                        </div>                  
                        {
                            config.spec=='xhtd-xhtd'?
                            <div>
                                <p className="tit">代理禁令：</p>
                                <div className="txt">
                                    <p>a、代理本人不得使用他人姓名或本人姓名在自己线下注册账号投注，一旦被检测，将取消代理资格没收所有可返佣佣金</p>
                                    <p>b、本代理模式为正规合作渠道，如发现代理使用不规范手段来促使线下投注，我司有权限冻结线下所有账号，并没收资金</p>
                                    <p>c、本代理模式以亏损进行返佣，如上下月分别有亏损或盈利，将抵扣后再进行结算返佣，实际数据以我司为准</p>
                                </div>
                            </div>
                            :null
                        }
                        {
                            config.spec=='xhtd-xhtd'?
                            null:
                            <div>
                                <p className="tit">优惠规则与条款：</p>
                                <div className="txt">
                                    {
                                        config.spec=="xhtd-xhtd"?
                                        "澳门新濠天地免费为大家提供赚钱平台，只要您成为我们的代理，只要您拥有人脉或用心推广，发展线下，无需任何操作，也不会占用您太多时间，坐等高额收益。"
                                        :
                                        "成为澳门新濠天地代理商无需负担任何费用，就可以开始无上限的收入，无论您拥有的是网络资源，或是人脉资源，不管您是在家里还是出差在外，随时随地都可以轻松赚大钱。"
                                    }
                                </div>
                                <div className="tit">每月结算：</div>
                                <div className="txt">
                                    澳门新濠天地和其他单一的返水方式不同，澳门新濠天地推出的独家全新升级模式让客户真正享受到丰厚的回报。
                                </div>
                                <div className="tit">怎么玩都赚钱：</div>
                                <div className="txt">
                                    澳门新濠天地免费为大家提供赚钱平台，只要您成为我们的代理，只要您拥有人脉或用心推广，发展线下，无需任何操作，也不会占用您太多时间，更不用担心线下盈亏，您都可以坐等高收益。
                                </div>
                                <div className="tit">代理优惠 ：</div>
                                <div className="txt">
                                    <span>
                                        {
                                        config.spec=="xhtd-xhtd"?
                                        "1.澳门新濠天地代理商，拥有线下会员越多，佣金越多，可享受最高60%佣金分成。您只需要通过网络发展和介绍身边的朋友加入并成为线下会员，佣金收入每月2-5日结算，无需任何手续费，结算完毕系统自动将佣金转入您的账号。":
                                        "1.澳门新濠天地代理商，拥有线下会员越多，佣金越多，不必担心线下输赢，只要线下投注，您就可享受最高60%佣金分成，您只需要通过网络发展和介绍身边的朋友加入并成为线下会员，佣金收入每月2-5日结算，无需任何手续费，结算完毕系统自动将佣金转入您的账号。"
                                        }
                                    </span>
                                    <br/>
                                    <span>2.每个月我们将会评比出优秀代理，根据每个代理线下的会员（有充值有投注）的数量，选出前五名优秀代理，给与一定金额特别返佣。并且对于有自己所在的QQ群，微信群，私人网站的进行大力推广澳门新濠天地的代理商，会根据实际作用赞助一定内容。</span><br/>
                                    <span>3.每周佣金总额达 20 万元，可获得1080元激励佣金，每月返佣累计总额达 50 万元，可获得5888元激励佣金，每月返佣累积总额达80 万以上，可获得12888 元激励佣金。</span><br/>
                                </div>                                
                            </div>
                        }
                    </div>
                )
            }else if(config.spec =="xhtd"){
                return( <AlliancePlan onClickJoin={this.onClickTab.bind(this,"agentRegister")}/>)
            }else{
                return(
                    <div className="cont plan">
                        <p className="info">代理计划 携手共赢 0风险0费用 每月领取百万佣金</p>
                        <h4>代理方案</h4>
                        <div className="inter">
                            <p>{appName}为合法注册之博彩公司。拥有多元化的产品，拥有最公平、公正、公开的系统，及最亲切的服务人员，在市场上的众多博彩网站中，我们自豪的提供会员最优惠的回馈，
                                给予合作伙伴最优势的营利回报，让每位合作伙伴都能获取最高的经济报酬。无论您拥有的是网络资源，或是人脉资源，无须负担任何费用，就可以开始无上限的收入，加入{appName}是您最佳的选择。</p>
                        </div>
                        <div className="tit">一、 注册申请：</div>
                        <div className="txt">
                            <span>1、请点击合作伙伴的 <span className="yy">【代理注册】</span>。</span><br/>
                            <span>2、在线提出申请，确实填写各项资料，2日内将有专员与您联系。</span><br/>
                            <span>3、专员与您联系后，将提供您注册账号、密码及代理推广链接。</span><br/>
                        </div>
                        <div className="tit">二、代理佣金计算：</div>
                        <div className="txt">
                            <span>1、代理佣金计算表： ( 当月退佣比例 )</span><br/>
                            <div>
                                {help.renderAllianceTable()}
                            </div>
                            <span style={{lineHeight: "35px"}}>2、佣金计算：</span><br/>
                            <span>A.视讯直播、体育赛事、电子游艺以报表中【损益】字段，扣除相应费用后（净利），再依照上表规则X佣金百分比；彩票则以报表中【实际投注】X 0.1%</span><br/>
                            <span>B.相应费用包含：会员各项活动优惠、反水优惠、存/取款相应手续费 ..等等</span><br/>
                            <span>C.<span className="yy">【当月最低实动会员】</span>定义为：在月结区间内进行过最少500RMB有效投注额
                                的会员。若代理合营体系内【当月未达最低实动会员3名的门坎，则该月无法领取回馈佣金。而代理合营体系内月损益达标准
                                ，但实动会员未达相对应门坎，则该月佣金比例，将依照实动会员数所相对应之百分比进行退佣。
                            </span><br/>
                            <span style={{lineHeight: "35px"}}>3、佣金计算方式：</span><br/>
                            <span>当月代理合营体系以：视讯直播、体育赛事、电子游艺、彩票游戏等项目的<span className="yy">【损益】</span>扣除相应费用后产生净损益总计，乘以相应退佣百分比。</span><br/>
                            <span>A.例一：</span><br/>
                            <span>代理合营体系当月净损益300,000元，实动会员5人（净损益虽为300,000元，实动会员却未达相应人数10名，故依照实动会员人数3人之门坎退佣比计算当月代理合营体系获利）。</span><br/>
                            <div>
                                {help.rederAllianceTable2()}
                            </div>
                            <span>B.例二：</span><br/>
                            <span>代理合营体系当月损益：视讯直播500,000元、体育赛事-120,000元、电子游艺120,000元、彩票游戏有效投注800,000，
                                实动会员22人，当月相应费用总计为135,000元。以上，可得净损益数字为365,000元。</span><br/>
                            <span>因此当月佣金计算如下：(净损益365,000 X 35% 相对应佣金比)
                                + ( 彩票投注800,000 X 0.1% ）= 128,550元（可获得当月佣金）</span><br/>
                        </div>
                        <div className="tit">※附注：</div>
                        <div className="txt">
                            <span>（佣金百分比），依当月总派彩扣除相应费用后之净损益对应为准。
                                假若当月可获得佣金为负数，则将会继续累计至下个月，直至可获得佣金为正数并高于200元即可领取。
                            </span><br/>
                            <span>
                                代理佣金计算结算区间为：当月的第一周周一至下月的第一周周一前的周日，将代理合营总损益，
                                以代理佣金计算表计算，佣金由承办专员于每个月的第一周周三开始与代理确认金额后
                                ，我们将于周五前会将佣金直接汇入代理所登记之银行账号。</span><br/>
                        </div>
                        <div className="tit">※其他注意事项：</div>
                        <div className="txt">
                            <span>已开户的客户不能成为被推荐客户。</span><br/>
                            <span>一人只能开出一个合作伙伴账户。</span><br/>
                            <span>如果出现骗取佣金的行为，将扣除本金并关闭该合作伙伴账户。</span><br/>
                            <span>合作伙伴账户姓名不能修改，请使用真实姓名申请合作伙伴账户。</span><br/>
                            <span>同一IP/同一姓名/同一收款账号的会员只能是一个合作伙伴的下线。</span><br/>
                            <span>代理帐户启用后起三个月内，代理线下无实动会员者，{appName}将有权收回代理账号之权限。</span><br/>
                        </div>         
                    </div>
                )
            }
        }else if(this.state.tab ==="allianceRule"){
            const appName = config.appName;
            return(
                <div className="cont allianceRule">
                    <div className="tit">一、{appName}对代理联盟的权利与义务</div>
                    <div className="txt">
                            <span>1、{appName}的客服部会登记联盟的会员并会观察他们的投注状况。联盟及会员必须同意并遵守{appName}的会员条例，
                                政策及操作程式。{appName}保留拒绝或冻结联盟/会员帐户权利。</span><br/>
                        <span>2、代理联盟可随时登入介面观察旗下会员的下注状况及会员在网站的活动概况。
                            {appName}的客服部会根据代理联盟旗下的会员计算所得的佣金。</span><br/>
                        <span>3、{appName}保留可以修改合约书上的任何条例，包括: 现有的佣金范围、佣金计划、付款程式、及参考计划条例的权力，{appName}会以电邮、网站公告等方法通知代理联盟。 代理联盟对于所做的修改有异议，代理联盟可选择终止合约，或洽客服人员反映意见。 如修改后代理联盟无任何异议
                                ，便视作默认合约修改，代理联盟必须遵守更改后的相关规定。</span><br/>
                    </div>
                    <div className="tit">二、代理联盟对{appName}的权力及义务</div>
                    <div className="txt">
                            <span>1、代理联盟应尽其所能，广泛地宣传、销售及推广{appName}，使代理本身及{appName}的利润最大化。代理联盟可在不违反法律下，以正面形象宣传、销售及推广{appName}，
                                并有责任义务告知旗下会员所有{appName}的相关优惠条件及产品。</span><br/>
                        <span>2、代理联盟选择的{appName}推广手法若需付费，则代理应承担该费用。</span><br/>
                        <span>3、任何{appName}相关资讯包括: 标志、报表、游戏画面、图样、文案等，代理联盟不得私自复制、公开、分发有关材料，{appName}保留法律追诉权。
                                如代理在做业务推广有相关需要，请随时洽{appName}。</span><br/>
                    </div>
                    <div className="tit">三、规则条款</div>
                    <div className="txt">
                            <span>1、各阶层代理联盟不可在未经{appName}许可情况下开设双/多个的代理帐号，也不可从{appName}帐户或相关人士赚取佣金。请谨记任何阶层代理不能用代理帐户下注，
                                {appName}有权终止并封存帐号及所有在游戏中赚取的佣金。</span><br/>
                        <span>2、为确保所有{appName}会员账号隐私与权益，{appName}不会提供任何会员密码，或会员个人资料。各阶层代理联盟亦不得以任何方式取得会员资料，或任意登入下层会员账号，如发现代理联盟有侵害{appName}会员隐私行为，
                            {appName}有权取消代理联盟红利，并取消代理联盟账号。</span><br/>
                        <span>3、代理联盟旗下的会员不得开设多于一个的帐户。{appName}有权要求会员提供有效的身份证明以验证会员的身份，并保留以IP判定是否重复会员的权利。如违反上述事项，
                            {appName}有权终止玩家进行游戏并封存帐号及所有于游戏中赚取的佣金。</span><br/>
                        <span>4、代理联盟不可为自己或其他联盟下的有效投注会员,只能是公司直属下的有效投注会员, 代理每月需有5个下线有效投注（有效投注为每月至少上线5次进行正常投注），
                                如有违反联盟协议{appName}有权终止并封存帐号及所有在游戏中赚取的佣金。</span><br/>
                        <span>5、如代理联盟旗下的会员因为违反条例而被禁止享用{appName}的游戏，或{appName}退回存款给会员，{appName}将不会分配相应的佣金给代理联盟。如代理联盟旗下会员存款用的信用卡、
                                银行资料须经审核，{appName}保留相关佣金直至审核完成。</span><br/>
                        <span>6、合约内的条件会以{appName}通知接受代理联盟加入后开始执行。{appName}及代理联盟可随时终止此合约，在任何情况下，代理联盟如果想终止合约，都必须以书面/电邮方式提早于七日内通知{appName}。
                                代理联盟的表现会3个月审核一次，如代理联盟已不是现有的合作成员则本合约书可以在任何时间终止。如合作伙伴违反合约条例，{appName}有权立即终止合约。</span><br/>
                        <span>7、在没有{appName}许可下，代理联盟不能透露及授权{appName}相关密资料，包括代理联盟所获得的回馈、佣金报表、
                                计算等;代理联盟有义务在合约终止后仍执行机密档及资料秘密。</span><br/>
                        <span>8、在合约终止后，代理联盟及{appName}将不须要履行双方的权利及义务。
                                终止合约并不会解除代理联盟于终止合约前应履行的义务。</span><br/>
                    </div>

                </div>
            )
        }else if(this.state.tab ==="agentRegister"){
            return(
                <div className="cont agentRegister">                
                    <p className="info">現在註冊即刻拥有专属域名，以利推广！</p>         
                    <Registered onClickJoin={this.onClickTab.bind(this,"allianceRule")}/>
                </div>
            )
        }
    }
    onClickTab(tab) {
        this.setState({tab:tab});
    }
    render() {
        const agentLoginUrl = config.agentLoginUrl;
        return (
            <div id="AllianceContent" className="mainCon show">
                <div className="title"></div>
                <div className="center">
                    <div className="menuBar">
                        <ul>
                            <li onClick={this.onClickTab.bind(this,"plan")}><a href="#" className={this.state.tab === "plan"?"now":""}>联盟方案</a></li>
                            <li onClick={this.onClickTab.bind(this,"allianceRule")}><a href="#" className={this.state.tab === "allianceRule"?"now":""}>联盟协议</a></li>
                            <li><a href={agentLoginUrl} target="_blank">代理登入</a></li>
                            <li onClick={this.onClickTab.bind(this,"agentRegister")}><a href="#" className={this.state.tab === "agentRegister"?"now":""}>代理注册</a></li>
                        </ul>
                    </div>
                    {this.renderSubPage()}
                </div>
            </div>
        )
    }
}

export default (AllianceContent);