import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import QRCode from 'qrcode.react';
import "./FirstPage.scss";

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "MgPart",
        }
    }
    renderSubPage() {
        if (this.state.tab === "MgPart") {
            return (
                <div id="MgPart" className="leftBox">
                    <h2><img className="Mg" alt=""/></h2>
                    <p>MG平台是欧美最流行的电子游艺平台之一，提供超过百款游戏，以丰富玩法、视觉及声光效果提供顶级娱乐享受,只为你提供极致的游戏体验...</p>
                    <ul>
                        <li>
                            <Link to="/games?tab=mg2" activeClassName="active">
                                <img className="MgGame1" alt=""/>
                                <h3>宝石迷阵</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/games?tab=mg2" activeClassName="active">
                                <img className="MgGame2" alt=""/>
                                <h3>女仕之夜</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/games?tab=mg2" activeClassName="active">
                                <img className="MgGame3" alt=""/>
                                <h3>摆脱</h3>
                            </Link>
                        </li>
                    </ul>
                    <Link to="/games?tab=mg2" activeClassName="active" className="moreBtn">
                        更多
                        <span className="three"></span>
                    </Link>
                </div>
            )
        } else if (this.state.tab === "PtPart") {
            return (
                <div id="PtPart" className="leftBox">
                    <h2><img className="PT" alt=""/></h2>
                    <p>PT（palytech）平台是欧美最热门的游戏平台之一，该平台开发的漫威主题系列游戏深受广大玩家喜爱，风靡全球，精彩刺激，爱不释手...</p>
                    <ul>
                        <li>
                            <Link to="/games?tab=pt" activeClassName="active">
                                <img className="Ptgame1" alt=""/>
                                <h3>古怪猴子</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/games?tab=pt" activeClassName="active">
                                <img className="Ptgame2" alt=""/>
                                <h3>湛蓝深海</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/games?tab=pt" activeClassName="active">
                                <img className="Ptgame3" alt=""/>
                                <h3>海洋公主</h3>
                            </Link>
                        </li>
                    </ul>
                    <Link to="/games?tab=pt" activeClassName="active" className="moreBtn">
                        更多
                        <span className="three"></span>
                    </Link>
                </div>
            )
        } else if (this.state.tab === "BbinPart") {
            return (
                <div id="BbinPart" className="leftBox">
                    <h2><img className="BBIN" alt=""/></h2>
                    <p>BBIN电子是全亚洲最流行的电子平台之一，游戏多达上千种，连环夺宝，糖果派对，三国等系列游戏，画面精美，独树一帜，深受广大玩家喜爱..</p>
                    <ul>
                        <li>
                            <Link to="/games" activeClassName="active">
                                <img className="BbinGame1" alt=""/>
                                <h3>连环夺宝</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/games" activeClassName="active">
                                <img className="BbinGame2" alt=""/>
                                <h3>糖果派对</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/games" activeClassName="active">
                                <img className="BbinGame3" alt=""/>
                                <h3>喜福猴年</h3>
                            </Link>
                        </li>
                    </ul>
                    <Link to="/games" activeClassName="active" className="moreBtn">
                        更多
                        <span className="three"></span>
                    </Link>
                </div>
            )
        } else if (this.state.tab === "BattlePart") {
            return (
                <div id="BattlePart" className="leftBox">
                    <h2><img className="Battle" alt=""/></h2>
                    <p>新葡京对战游戏是我们为玩家独立开发的热门游戏，含VG斗地主以及AG捕鱼王，画质高清，玩法丰富，中奖容易，是玩家首选娱乐的游戏...</p>
                    <ul>
                        <li>
                            <Link to="/games" activeClassName="active">
                                <img className="Battle1" alt=""/>
                                <h3>斗地主</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/games" activeClassName="active">
                                <img className="Battle2" alt=""/>
                                <h3>AG捕鱼王</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/games" activeClassName="active">
                                <img className="Battle3" alt=""/>
                                <h3>梭哈</h3>
                            </Link>
                        </li>
                    </ul>
                    <Link to="/games" activeClassName="active" className="moreBtn">
                        更多
                        <span className="three"></span>
                    </Link>
                </div>
            )
        } else if (this.state.tab === "AgPart") {
            return (
                <div id="AgPart" className="leftBox">
                    <h2><img className="Ag" alt=""/></h2>
                    <p>AG捕鱼达人是亚洲最热门平台AG开发的热门游戏，操作简单，上手容易，精美的UI设计，搭配好听的音乐，让玩家乐在其中，无法自拔...</p>
                    <ul>
                        <li>
                            <Link to="/games" activeClassName="active">
                                <img className="AgGame1" alt=""/>
                                <h3>AG捕鱼王</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/games" activeClassName="active">
                                <img className="AgGame2" alt=""/>
                                <h3>野生捕魚</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/games" activeClassName="active">
                                <img className="AgGame3" alt=""/>
                                <h3>皇家捕鱼</h3>
                            </Link>
                        </li>
                    </ul>
                    <Link to="/games" activeClassName="active" className="moreBtn">
                        更多
                        <span className="three"></span>
                    </Link>
                </div>
            )
        }
        return (
            <div id="MgPart" className="leftBox">
                <h2><img className="Mg" alt=""/></h2>
                <p>MG平台是欧美最流行的电子游艺平台之一，提供超过百款游戏，以丰富玩法、视觉及声光效果提供顶级娱乐享受,只为你提供极致的游戏体验...</p>
                <ul>
                    <li>
                        <a href="#">
                            <img className="MgGame1" alt=""/>
                            <h3>宝石迷阵</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img className="MgGame2" alt=""/>
                            <h3>女仕之夜</h3>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img className="MgGame3" alt=""/>
                            <h3>摆脱</h3>
                        </a>
                    </li>
                </ul>
                <Link to="/games?tab=mg2" activeClassName="active" className="moreBtn">
                    更多
                    <span className="three"></span>
                </Link>
            </div>
        )
    }
    mouseOverTab(tab) {
        this.setState({tab: tab});
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const HomeAnnouncement = window.r.get("HomeAnnouncement")
        // const FirstPagePromotionAlert = window.r.get("FirstPagePromotionAlert");
        return (
            <div className="XPJBlackFirstPage">
                {/* {FirstPagePromotionAlert && <FirstPagePromotionAlert/>} */}
                <HomeAnnouncement/>
                <ImageGallery height="450px"></ImageGallery>
                <div className="content content2">
                    <ul className="fromCenter center2">
                        <li>
                            <div className="items item1">
                                <h2>SPORTS</h2>
                                <h3>体育赛事</h3>
                                <Link activeClassName="active" to="/sport" className="more">更多<span className="three2"></span></Link>
                            </div>
                            <div className="item-text">提供足球、篮球、曲棍球、排球等,多种体育赛事....</div>
                            <div className="icons">
                                <dl className="icos ico-1">
                                    <dt><Link activeClassName="active" to="/sport"></Link></dt>
                                    <dd><Link activeClassName="active" to="/sport">足球</Link></dd>
                                </dl>
                                <dl className="icos ico-2">
                                    <dt><Link activeClassName="active" to="/sport"></Link></dt>
                                    <dd><Link activeClassName="active" to="/sport">篮球</Link></dd>
                                </dl>
                                <dl className="icos ico-3">
                                    <dt><Link activeClassName="active" to="/sport"></Link></dt>
                                    <dd><Link activeClassName="active" to="/sport">曲棍球</Link></dd>
                                </dl>
                                <dl className="icos ico-4">
                                    <dt><Link activeClassName="active" to="/sport"></Link></dt>
                                    <dd><Link activeClassName="active" to="/sport">排球</Link></dd>
                                </dl>
                            </div>
                        </li>
                        <li>
                            <div className="items item2">
                                <h2>CASINO</h2>
                                <h3>真人视讯</h3>
                                <Link activeClassName="active" to="/casino" className="more">更多<span
                                    className="three2"></span></Link>
                            </div>
                            <div className="item-text">
                                提供真人百家乐、轮盘、骰宝、龙虎斗、二八杠等,美女荷官在线发牌....
                            </div>
                            <div className="icons">
                                <dl className="icos ico-5">
                                    <dt><Link to="/casino" activeClassName="active"></Link></dt>
                                    <dd><Link to="/casino" activeClassName="active">百家乐</Link></dd>
                                </dl>
                                <dl className="icos ico-6">
                                    <dt><Link to="/casino" activeClassName="active"></Link></dt>
                                    <dd><Link to="/casino" activeClassName="active">牛牛</Link></dd>
                                </dl>
                                <dl className="icos ico-7">
                                    <dt><Link to="/casino" activeClassName="active"></Link></dt>
                                    <dd><Link to="/casino" activeClassName="active">德州扑克</Link></dd>
                                </dl>
                                <dl className="icos ico-8">
                                    <dt><Link to="/casino" activeClassName="active"></Link></dt>
                                    <dd><Link to="/casino" activeClassName="active">二八红</Link></dd>
                                </dl>
                            </div>
                        </li>
                        <li>
                            <div className="items item3">
                                <h2>LOTTERY</h2>
                                <h3>彩票游戏</h3>
                                <Link activeClassName="active" to="/bingo" className="more">更多<span
                                    className="three2"></span></Link>
                            </div>
                            <div className="item-text">
                                时时彩、快乐彩、六合彩、3D彩等，彩票游戏丰富，所有赛果依据官方开奖结果...
                            </div>
                            <div className="icons">
                                <dl className="icos ico-9">
                                    <dt><Link to="/bingo" activeClassName="active"></Link></dt>
                                    <dd><Link to="/bingo" activeClassName="active">时时彩</Link></dd>
                                </dl>
                                <dl className="icos ico-10">
                                    <dt><Link to="/bingo" activeClassName="active"></Link></dt>
                                    <dd><Link to="/bingo" activeClassName="active">11选5</Link>></dd>
                                </dl>
                                <dl className="icos ico-11">
                                    <dt><Link to="/bingo" activeClassName="active"></Link></dt>
                                    <dd><Link to="/bingo" activeClassName="active">福彩</Link></dd>
                                </dl>
                                <dl className="icos ico-12">
                                    <dt><Link to="/bingo" activeClassName="active"></Link></dt>
                                    <dd><Link to="/bingo" activeClassName="active">六合彩</Link></dd>
                                </dl>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="content content1">
                    <div className="fromCenter center1">
                        {this.renderSubPage()}
                        <ul className="rightBox">
                            <li className="btn1" onMouseOver={this.mouseOverTab.bind(this, "MgPart")}>
                                <Link to="/games?tab=mg2" activeClassName="active">
                                    <span className={this.state.tab === "MgPart" ? "btn111" : "btn11"}></span>
                                    <p>MG电子</p>
                                </Link>
                            </li>
                            <li className="btn2" onMouseOver={this.mouseOverTab.bind(this, "PtPart")}>
                                <Link to="/games?tab=pt" activeClassName="active">
                                    <span className={this.state.tab === "PtPart" ? "btn222" : "btn22"}></span>
                                    <p>PT电子</p>
                                </Link>
                            </li>
                            <li className="btn3" onMouseOver={this.mouseOverTab.bind(this, "BbinPart")}>
                                <Link to="/games?tab=bbin" activeClassName="active">
                                    <span className={this.state.tab === "BbinPart" ? "btn333" : "btn33"}></span>
                                    <p>BBIN电子</p>
                                </Link>
                            </li>
                            <li className="btn4" onMouseOver={this.mouseOverTab.bind(this, "BattlePart")}>
                                <Link to="/games" activeClassName="active">
                                    <span className={this.state.tab === "BattlePart" ? "btn444" : "btn44"}></span>
                                    <p>对战游戏</p>
                                </Link>
                            </li>
                            <li className="btn5" onMouseOver={this.mouseOverTab.bind(this, "AgPart")}>
                                <Link to="/fish" activeClassName="active">
                                    <span className={this.state.tab === "AgPart" ? "btn555" : "btn55"}></span>
                                    <p>捕鱼游戏</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="content content3">
                    <div className="fromCenter center3">
                        <div className="textBox">
                            <h2><img className="textBox-title" alt=""/></h2>
                            <p>全新模式，新颖设计更耐玩，汇集诸多精彩一一呈现;各国博彩精英、世界顶级博彩服务团队打造，享受随时随地、足不出户的博彩“游戏人生”!</p>
                        </div>
                        <div className="qrcode">
                            <QRCode includeMargin={true} size={100}
                                    value={this.props.remoteSysConfs.channel_push_url || ""} className="qrImg"
                                    style={{verticalAlign: "middle"}} alt=""/>
                            <h4>移动装置APP下载 </h4>
                        </div>

                    </div>
                </div>
                <div className="content content4">
                    <div className="fromCenter center4">
                        <div className="content4_left">
                            <div className="left-4">
                                <img className="left-4Img" alt=""/>
                            </div>
                            <div className="right-4">
                                <h2><img className="title4" alt=""/></h2>
                                <p>
                                    新葡京娱乐场已取得了菲律宾政府唯一认可的发牌及监管单位First Cagayan Leisure Resort Corporation(FCLRC)和 Cagayan
                                    Economic Zone Authority(CEZA)联合颁发的网络博彩游戏运营牌照。新葡京娱乐场严格按照这些管理机构发布的规则进行运营.....
                                </p>
                            </div>

                        </div>
                        <div className="content4_right">
                            <img className="content4_rightImg" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="content content5">
                    <div className="fromCenter center5">
                        <div className="payIcons"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        views: state.views,
        global: state.global,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(FirstPage);