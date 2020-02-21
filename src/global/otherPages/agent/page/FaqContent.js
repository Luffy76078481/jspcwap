
import React, {Component} from 'react';
import {config} from "globalConfig";

class FaqContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_email: "xp9677@gmail.com" || "",
        }
    }
    componentDidMount() {
        $("li a.titleBtn").click(function(){
            var ele = $(this).parent().find(".contntP");
            if (window.$(ele).is(":visible")) {
                window.$(ele).slideUp();
            } else {
                window.$(ele).slideToggle();
            }
        });
        this.setState({
            online_service_email:this.props.online_service_email || ""
        });
    }

    render() {
        const appName = config.appName;
        const email = "xp9677@gmail.com";
        return (
            <div id="FaqContent" className="show">
                <div className="help-fousImg">
                   <div className="img"></div>
                </div>
                <div className="fnameCenter helpStyle">
                    <h3>合营计划</h3>
                    <div className="helpList">
                        <ul>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 什么是{appName}线上娱乐城（简称{appName}）的合营伙伴计划？ </a>
                                <p className="contntP">
                                    极具诱惑力的{appName}合营计划是指您通过推介的客户或玩家来到我们网站进行投注和消费，根据具体金额而产生相应收益的合作伙伴关系。<br/>
                                    这项合营计划非常简单，只要您通过网站链接广告推广{appName}的产品，便可从您推介的玩家中获得利润；<br/>
                                    而推介的玩家在{appName}的娱乐场、体育投注、老虎角子机等进行消费（当然越多越好），我们会每月根据这些玩家的表现来支付相应佣金给您。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 为什么我要成为{appName}的合营伙伴？ </a>
                                <p className="contntP">
                                    {appName}的合营伙伴计划可谓博彩业当今利润最高的合营计划，只要加入，您就将有望获得相当可观的佣金！<br/>
                                    而且将有我们顶级出色的服务团队来帮助您解决遇到的一切困难！ <br/>
                                    这是一种您可通过现有的客户群和网站流量来赚钱的极好方式！<br/>
                                    依据我们的三级分类计划，无论任何时候推荐的玩家，我们都会据其消费量来按相应百分比来付给您酬劳——甚至包括他们介绍给我们的新玩家。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 成为{appName}的合营伙伴有什么意义？ </a>
                                <p className="contntP">
                                    加入{appName}的合营计划意味着您成为了我们最珍贵的合作伙伴。<br/>
                                    您将拥有我们提供的高品质服务，而您所需要的仅仅是一个网站和一份邮件联络名单即能开始合作了！<br/>
                                    当您注册完成登录后，只需在我们提供的网络广告、文字宣传中等不同媒介选择合适的大小形式，然后在您的网站上添加{appName}的链接即可。<br/>
                                    是不是很简单？
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 这项合营计划能使我赚多少钱？ </a>
                                <p className="contntP">
                                    事实上能挣到多少钱完全取决于您自己；或者说这其实是没有任何上限封顶的。一般情况下，只要更多的时间和努力，您就会赢得您想要的。<br/>
                                    当您注册成我们的合营伙伴后，我们会提供大量各种类型的必要市场营销工具，让您的网站真正变成一台赚钱的机器！
                                </p>
                            </li>
                        </ul>
                    </div>
                    <h3>常见问题</h3>
                    <div className="helpList">
                        <ul>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; {appName}的合营计划如何运作？ </a>
                                <p className="contntP">
                                    当有人在您的网站点击我们提供给您的图片广告或文字链接后，便会链接到我们相关的网页上来。<br/>
                                    如果他/她在{appName}上有注册并开始下注娱乐，那么您将因他/她的表现而真正获得收益，包括他们每次的存款和消费。<br/>
                                    您可以收取一定比例的佣金和酬劳！
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 我怎样注册？ </a>
                                <p className="contntP">
                                    在想成为{appName}的合作伙伴之前，请确保有一个{appName}的账号。<br/>
                                    然后请到直接在合作联营的界面输入{appName}的账号激活代理账号，之后将由我们的合营计划代表与您联系，讨论各方面的具体情况。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 有任何加盟费用吗？ </a>
                                <p className="contntP">
                                    您不用花一分钱就能加入我们的合营计划！成为我们的合营伙伴是完全免费的，并且丝毫不用担心会遇上什么骗局。<br/>
                                    仅仅只需点击加入，注册后您将拥有一个独一无二的合营伙伴代码，然后便能开始向您的客户宣传推广而赚取佣金了。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 合营计划是否能在线下开展？ </a>
                                <p className="contntP">
                                    我们一直在寻找全新、充满潜力的合营伙伴，无论是线上还是线下，只要您拥有相关资源，不要犹豫，请和我们联系吧！<br/>
                                    目前我们接受的申请都是以互联网为基础的，并且需要在{appName}网站通过注册才能成为我们的合营伙伴。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 合营计划里最简单赚钱的方式是什么？ </a>
                                <p className="contntP">
                                    最简单的方式就是建立一个网站，在您的网站上链接我们的广告。<br/>
                                    创建网站是最直截了当的方式，特别是注意要能在搜索引擎上通过关键词找到您的网站。<br/>
                                    请不要忘记，搜索引擎上产生的流量基本是免费的，您可以尽可能地设定合适的关键词来争取。<br/>
                                    例如，您可能在博客上发布一篇在线扑克技巧，在每条技巧之间，您就可以添加一个链接到{appName}上来。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 我能添加更多不同的{appName}产品吗？ </a>
                                <p className="contntP">
                                    您可以选择一切您想要推广的。<br/>
                                    不论是娱乐场、体育博彩、Keno，还是我们为玩家推出的其他新游戏，我们都欢迎您去尝试推广。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 支付佣金的周期是怎样的？</a>
                                <p className="contntP">
                                   我们会在每个月（每个月第一个周一至下个月第一个周一的前一天）。<br/>
                                    您每次提取佣金的最低金额为RMB 100<br/>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <h3>关于佣金 </h3>
                    <div className="helpList">
                        <ul>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 我如何知道我挣了多少钱？ </a>
                                <p className="contntP">
                                    您独一无二的伙伴代码将能够追踪到您推介给{appName}的每个玩家的任何消费行动上，无论是点击广告、文字连接还是发送的邮件，这些信息将一直通过您的伙伴代码而保存在您的合营账户里。<br/>
                                    一旦这些您推介的玩家在{appName}进行消费，您都将收到相应的统计报告，并能准确追踪了解到玩家们每日的投注消费记录。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 我如何跟踪自己的表现呢？</a>
                                <p className="contntP">
                                    我们会提供一个科学的系统来在线评价和优化您的表现。<br/>
                                    您只需登录进入代理平台，查看代理数据和报表，就可以了解到所推介的玩家的投注情况从而了解到获得了多少收入。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 我的佣金是怎样构成的？ </a>
                                <p className="contntP">
                                    您所推介的玩家在{appName}上的消费都将被终身记在您的帐下，只要合作关系稳定，他们所输钱数额的5％、10％、15％将成为您的佣金。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 如何能保证有玩家点击我网站上的{appName}广告后而付款给我？ </a>
                                <p className="contntP">
                                    独特的加盟追踪代码将确保我们始终能追踪到由您推介的所有玩家。<br/>
                                    一旦他们点击您网站上{appName}的相关链接，他们都将被实时追踪。<br/>
                                    所有通过您伙伴代码链接产生的交易信息，都将在反馈到您的账户中。
                                </p>
                            </li>
                        </ul>
                    </div>
                    <h3>技术问题 </h3>
                    <div className="helpList">
                        <ul>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 怎样才能使网站来访者点击相关链接呢？ </a>
                                <p className="contntP">
                                    有太多的方法供您选择！<br/>
                                    首先，您完全可以添加一条以上的{appName}链接，并将这些链接放置在网站显眼位置。<br/>
                                    您也可以在用户分享、推荐和评价内容后设置链接；同时将链接设置在网页顶端，也会为您带来更高的点击率。<br/>
                                    当然，您还可以自己构想一些有创意的链接设置方式；{appName}一直致力于提供更先进、新颖的广告链接。<br/>
                                    我们将其中最棒的理念，拿来与您一同共享。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 哪些类型的链接可以有助于{appName}娱乐场的推广？ </a>
                                <p className="contntP">
                                    HTML链接或GIF广告和文字链接这些营销工具都可以在不同的平台上使用。<br/>
                                    你会发现更多的工具，可以包含您的链接，如单机游戏与Flash教程等。<br/>
                                    请务必让您的伙伴跟踪代码的链接出现在您的网站上，以确保您的网站流量能得到实时追踪。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; {appName}能为客户玩家提供几种语言支持？ </a>
                                <p className="contntP">
                                    {appName}一直以来不断发展壮大，在全球范围内都获得了更大的市场份额，目前我们暂时能够提供中文的支持服务。<br/>
                                    客户可以通过多种语言支持的信息页面可以了解到我们的产品。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 在哪里可以找到适合的广告和文字链接添加到我网站？ </a>
                                <p className="contntP">
                                    {appName}将会全力支持并提供您一切推广我们产品所必要的广告和文字。<br/>
                                    您只需登录{appName}的合营网站，再点击“支持”部分，便能找到您所需要的营销工具。<br/>
                                    您甚至可以依据我们现有的广告基础上尝试新的广告创意。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 关于垃圾邮件的问题？ </a>
                                <p className="contntP">
                                    {appName}的合营伙伴必须承诺不会向玩家或其他玩家发送垃圾邮件。<br/>
                                    所有的合营伙伴必须同意并认可我们的“抵制垃圾邮件”条例，同时任何触犯此项条例的合营伙伴将被终止本合营计划。<br/>
                                    如果您有相关问题或疑虑，
                                    一旦发现违反条例，我们将发送事态报告给您，并立即停止一切合作关系。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 如果我没有网站还能开设账户吗？ </a>
                                <p className="contntP">
                                    当然可以！如果在线下您能接触到玩家或者已有目标对象的地址列表，甚至准备好了特别的方式在线下进行宣传推广，{appName}会非常乐意与您共同讨论并提供你所需要的实质性帮助。<br/>
                                    如果真是这样，还犹豫什么，赶快和我们的合营账户经理谈谈您的创想吧！
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 无法登录 </a>
                                <p className="contntP">
                                    如果您确定输入用户名和密码无误后仍然无效，可以去检查您的互联网浏览器的配置：如果它被设定成阻拦相关数据文件，则您将无法登录。您可以尝试删除浏览器里现存的所有的网络临时文件和cookies，并重新打开浏览器并尝试重新登录。如果实在无法登陆，请您联络{appName}在线客服。<br/>
                                    我还没有收到{appName}发来的任何邮件，怎么办？ <br/>
                                    请通过{this.state["online_service_email"]}联系我们。
                                </p>
                            </li>
                        </ul>
                    </div>
                    <h3>报告和统计 </h3>
                    <div className="helpList" style={{ marginBottom: "30px"}}>
                        <ul>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 在哪里可以找到我的统计资料？ </a>
                                <p className="contntP">
                                    一旦建立账户并激活，就可以登录{appName}代理平台，里面可以查看到详细的代理数据和报表。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 如何更新我的个人账户信息？ </a>
                                <p className="contntP">
                                    若想更新您的个人账户信息，请登录到我们的合营代理平台，并点击“基本资料”标签进行相关操作。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 支持和帮助 </a>
                                <p className="contntP">
                                    我不知道我的链接/标记是否正常，我如何知道是否依然能追踪到我推介的玩家？<br/>
                                    请告诉我们您网站完整网址和{appName}链接的相关位置，我们会帮助您检查是否有技术方面的问题。
                                </p>
                            </li>
                            <li>
                                <a className="titleBtn" href="javascript:void(0);">&gt; 意见，建议，投诉 </a>
                                <p className="contntP">
                                    {appName}十分注重并尽可能地为每位合营伙伴和玩家提供最优质的客户服务。<br/>
                                    我们知道，想要成功建立运行合营项目必须与每位合营伙伴建立积极良好的相互关系，服务的完整性、准确性、及时付款和解决您遇到的问题，这些都是我们非常重视的。<br/>
                                    {appName}真切希望各位玩家和合营伙伴都能提出自己宝贵的意见、疑问和建议。你可以点击这里与联系我们。
                                </p>
                            </li>
                        </ul>
                    </div>
            </div>
            </div>
        )
    }
}



export default (FaqContent);