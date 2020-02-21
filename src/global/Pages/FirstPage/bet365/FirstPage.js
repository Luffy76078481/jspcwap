import React, {Component} from 'react';
import "./FirstPage.scss";
import {connect} from 'react-redux';
import {Link, IndexLink, browserHistory} from 'react-router';
import {config} from "globalConfig";


class ApiSysConfAction {
    fly(callback) {
        let authorization = "";
        fetch(config.apiPath + "client/all_sys_cfg?Tag=" + config.webSiteTag, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": authorization
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            callback(data);
        });
    }

}

class FirstPage_BEE extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: '#004531',
            fontColor: '#417667',
            borderNone: 'none',
            borBottom: 'solid 1px #275a4b',
            pxRuler: '20px',
            lang:[
                {id:0,lang:'English',Sekect:"javascript:Util.languageSekect(0)",},
                {id:1,lang:'Español',Sekect:"javascript:Util.languageSekect(1)",},
                {id:2,lang:'Deutsch',Sekect:"javascript:Util.languageSekect(2)",},
                {id:3,lang:'Italiano',Sekect:"javascript:Util.languageSekect(3)",},
                {id:4,lang:'Português',Sekect:"javascript:Util.languageSekect(4)",},
                {id:5,lang:'Dansk',Sekect:"javascript:Util.languageSekect(5)",},
                {id:6,lang:'Svenska',Sekect:"javascript:Util.languageSekect(6)",},
                {id:7,lang:'Norsk',Sekect:"javascript:Util.languageSekect(7)",},
                {id:8,lang:'简体中文',Sekect:"javascript:void(0);",},
                {id:9,lang:'繁體中文',Sekect:"javascript:Util.languageSekect(9)",},
                {id:10,lang:'Български',Sekect:"javascript:Util.languageSekect(10)",},
                {id:11,lang:'Ελληνικά',Sekect:"javascript:Util.languageSekect(11)",},
                {id:12,lang:'Polski',Sekect:"javascript:Util.languageSekect(12)",},
                {id:13,lang:'Română',Sekect:"javascript:Util.languageSekect(13)",},
                {id:14,lang:'Česky',Sekect:"javascript:Util.languageSekect(14)",},
                {id:15,lang:'Magyar',Sekect:"javascript:Util.languageSekect(15)",},
                {id:16,lang:'Slovenčina',Sekect:"javascript:Util.languageSekect(16)",},
                {id:17,lang:'Nederlands',Sekect:"javascript:Util.languageSekect(17)",},
            ],
            agentLoginUrl: "",
        }
    }


    componentDidMount() {
        new ApiSysConfAction().fly(resp => {
            if (resp.StatusCode === 0) {
                this.setState({
                    agentLoginUrl: resp.Config.agent_link,
                });
            }
        }); 
    }

    // 跳转链接
    onTo(path) {
        browserHistory.push(path);
    }
    render() {
        let dateTime = new Date();
        let year = dateTime.getFullYear();
        const PromotionAlert = window.r.get("FirstPagePromotionAlert")
        window.Util.languageSekect = function () {
            window.swal("提示", "您目前的地区不支持该语言！", "info");
        }
        return (
            <div className="FirstPage" id='FirstPage'>
                <PromotionAlert/>
                <div className="FirstPanel">
                    <div className="indexLeft">
                        <ul>
                            {
                                this.state.lang.map((item,i)=>{
                                    if(item.id === 8){
                                        return <li key={item.id}><a href={item.Sekect} className="hoverSelect">{item.lang}</a></li>
                                    }else {
                                        return <li key={item.id}><a href={item.Sekect}>{item.lang}</a></li>
                                    }
                                })
                            }
                        </ul>
                    </div>
                    <div className="indexRight">
                        <div className="indexRightContent">             
                            {/*体育*/}
                            <div className="sportsContent" onClick={this.onTo.bind(this, "/sport")}>
                                <div className="sportsContentHead">
                                    <img src={require("./images/bg-sports-title-white.gif?v=1")}/>
                                </div>
                                <div className="sportsContentRight">
                                    <div>
                                        <Link to="/sport">
                                            {
                                                window.config.spec.includes('aaa')?
                                                <img src={require("./images/index_365.png")}/>:
                                                <img src={require("./images/NCDBP_210x204.gif?v=1")}/>
                                            }                                      
                                        </Link>
                                    </div>
                                    <div className="sportsContentHref">
                                        <Link to="/sport">
                                            <img src={require("./images/liveinplay.gif?v=1")}/>
                                            <span className="CatchingColor">比赛开始即可进行投注</span>
                                            <span >我们提供最广泛的滚球盘服务。</span>
                                            <span className="CatchingColor">立即投注</span>
                                        </Link>
                                        <Link to="/sport">
                                            <img src={require("./images/204x30-live-streaming-02.gif?v=1")}/>
                                            <span className="CatchingColor">观看现场体育</span>
                                            <span >
                                                每年我们向您的电脑提供超过<br/>70,000场的现场赛事链接。
                                            </span>
                                            <span className="CatchingColor">立即投注</span>
                                        </Link>
                                    </div>
                                    <div className="clear"/>
                                </div>
                            </div>        
                            <div className="contentList">
                                {/*娱乐场*/}
                                <div className="contentListOl" onClick={this.onTo.bind(this, "/casino")}>
                                    <div className="game">
                                        <img src={require("./images/bg-casino.jpg?v=1")}/>
                                        <div className="casino-content">
                                            <img src={require("./images/bg-casino-title.png?v=1")}/>
                                            <h4>新玩家奖金</h4>
                                            <p>超过250种精选游戏，包括最经典的现场荷官，精彩内容面向全部玩家。</p>
                                        </div>
                                    </div>
                                </div>
                                {/*棋牌*/}
                                <div className="contentListOl" onClick={this.onTo.bind(this, "/streetMachine")}>
                                    <div className="game">     
                                        <img src={require("./images/bg-poker.jpg?v=1")} />                  
                                        <div className="casino-content">
                                            <img src={require("./images/bg-liveCasino-title.png?v=1")}/>
                                            <h4>新玩家奖金</h4>
                                            <p>体验全球最奢华的真人娱乐世界，九大真人平台，全球首发，无忧博彩尽在Bet365。</p>
                                        </div>
                                    </div>
                                </div>
                                {/*电子游艺*/}
                                <div className="contentListOl" onClick={this.onTo.bind(this, "/games")}>
                                    <div className="game">                       
                                        <img src={require('./images/PharaohTreasure.jpg')}/>                           
                                        <div className="casino-content">
                                            <img src={require("./images/bg-games-title.png?v=1")}/>
                                            <h4>新玩家奖金</h4>
                                            <p>从老虎机到刮奖卡，我们种类丰富的在线游戏将让您体验娱乐无限的欢乐感受。</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="clear"/>
                            </div>               
                        </div>
                        <div className="FirstPageFooter">
                            <div className="footer-desion">
                                <div className="footerLinks">
                                    <a href="/help.html" target="_blank">关于我们</a>&nbsp;|&nbsp;
                                    <a href="/help.html#deposit" target="_blank">常见问题</a>&nbsp;|&nbsp;
                                    <a href='javascript:void(0);'
                                       onClick={this.serversOpen.bind(this)}>在线客服</a>&nbsp;|&nbsp;
                                    {/* BEE的联系我们要用帮助中心里的 */}
                                    {
                                        config.spec.includes('bee')?<a href="/help.html#contact">联系我们</a>
                                        :<a href="/agent.html?tab=ContactContent">联系我们</a>
                                    }
                                        &nbsp;|&nbsp;
                                    <a href="/help.html#yibanrule" target="_blank">条款与协议</a>&nbsp;|&nbsp;
                                    <a href="/help.html#responsibility" target="_blank">免责声明</a>&nbsp;|&nbsp;
                                    <a href="/help.html#myAccount" target="_blank">隐私政策</a>&nbsp;|&nbsp;
                                    <a href="/agent.html" target="_blank">合营联盟</a>&nbsp;|&nbsp;
                                    <a href="/agent.html?tab=Registered" target="_blank">代理注册</a>&nbsp;|&nbsp;
                                    <a href={this.state.agentLoginUrl} target="_blank">代理登入</a>
                                    <span className="ban">© 2001-{year} bet365 版权所有 | 18+</span>
                                </div>
                                <div className="FooterContent">
                                    <span >
                                        通过进入、继续使用或浏览此网站，您即被认定接受：我们将使用特定的浏览器COOKIES优化您的客户享用体验。Bet365仅会使用优化您服务体验的COOKIES，而不是可侵犯您隐私的COOKIES。关于我们使用COOKIES，以及您如何取消、管理COOKIES使用的更多详情，请参考我们的COOKIES政策。
                                    </span>
                                    <span >
                                        Bet365是世界领先的网络博彩集团之一，提供体育投注、金融、娱乐场、扑克牌及游戏等丰富选择。
                                    </span>
                                    <span >
                                        我们向客户提供全部体育范围内的丰富投注，内容涵盖足球、网球、篮球、斯诺克及乒乓球等。投注一系列丰富的赛前及滚球盘盘口，无限精彩尽在每一场英超联赛和欧冠联赛足球现场比赛中，且我们的欧洲精英足球奖金优惠同样适用。此外，您还可以使用网球过关投注奖金尽享ATP网球顶级赛事带来的众多诱人投注机会。您可同时通过手机或平板电脑访问“移动中的Bet365”，体验一系列同样精彩诱人的赛事及盘口，包括现场滚球盘服务。为增加滚球盘的兴奋感受，我们还特别推出了现场链接，每年向您的电脑直播70,000多场精彩赛事。精选包括大师系列赛网球锦标赛和来自世界各地顶尖的国家级足球联赛。如想查看最新的体育投注信息，请访问我们全新的投注新闻站点。
                                    </span>
                                    <span >
                                        {/*除了类别多样的体育投注之外，我们还提供丰富多种的精彩优惠。比如激动人心的欧洲精英足球奖金，如果您在英超、意甲、西甲、德甲或欧洲冠军联赛上进行过关投注，即有机会获取最高可达您彩金100％比例的奖金。另外，还有我们的零分平局退本大赠送优惠；如果您在赛前投注了“正确比分”、“半场/全场”或“比分预测”等足球赛事盘口，且假如比赛结果为0-0，我们将把输的投注取消，不惜退本大赠送！*/}
                                    </span>
                                    <span >
                                        为何不尝试我们惊喜不断的在线娱乐场？250多种精彩游戏任您选择，包括21点等各种游戏。如想进行轮盘或百家乐，请立即访问现场荷官。而且，我们的扑克室是世界最大的在线扑克网络，您可在此挑战数千名现金比赛玩家或参加在线大型锦标赛事。
                                    </span>
                                    <span >
                                        我们是由直布罗陀政府颁发执照并受直布罗陀博彩委员会监管。
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    serversOpen(e) {
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link, 'servers', 'width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        platform: state.game.platform,
        backConfigs: state.backConfigs,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(FirstPage_BEE)