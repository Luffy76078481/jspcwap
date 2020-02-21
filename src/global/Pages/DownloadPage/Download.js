
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {config} from 'globalConfig';
import './download.scss';
import QRCode from 'qrcode.react';

class DownloadPage extends Component {
    constructor (props){
        super(props);
        this.affix = config.gameTag
        this.state = {
            tabs: [
                {
                    id: 1,
                    tabName: "PC端",
                    tabClass: "pc_icon",
                    tabText1: "适应Windows主流系统，客户端在游戏",
                    tabText2: "投注稳定性和便捷性方面相比网页有很大提升",
                },
                {
                    id: 2,
                    tabName: "Android",
                    tabClass: "ad_icon",
                    tabText1: "兼容各种品牌Android系统的手",
                    tabText2: "引领同行业移动互联网潮流，娱乐完美体验",
                },
            ],
            currentIndex: 1,
            pcContent: [
                {
                    id: 1,
                    gameLogo: require("./images/pt_logo.png"),
                    downloadUrl: "http://cdn.silvereagle88.com/generic/setupglx.exe",
                    gameName: "PT客户端",
                    gameDetail: "bet365与PlayTech技术公司合作，为了提供客户PC端游戏的体验感，玩老虎机更快捷， 很好的防掉线、稳定快速投注游戏等优点，为大家提供更好的游戏体验。",
                    gamePic: require("./images/md_win_pt.png"),
                },
                { 
                    id: 2,
                    gameLogo: require("./images/mg_logo.png"),
                    downloadUrl: "https://dl.fortunabase.com/download.php?file_name=MIP_Launch98.exe&ul=en&btag2=689781",
                    gameName: "MG客户端",
                    gameDetail: "bet365与PlayTech技术公司合作，为了提供客户PC端游戏的体验感，玩老虎机更快捷， 很好的防掉线、稳定快速投注游戏等优点，为大家提供更好的游戏体验。",
                    gamePic: require("./images/md_win_mg.png"),
                }
            ],
            androidContent: [
                {
                    id: 1,
                    gameDevice: "BET365手机端",
                    gameDetail: "兼容各种品牌的Android5.0以上手机，让玩家在手机端也能掌握娱乐的激情与快乐， 娱乐无处不在！",
                    showDownloadBtn: true,
                    downloadWay1_1: '方法一：使用手机自带浏览器或其它浏览器中输入',
                    downloadUrl: this.props.remoteSysConfs ? this.props.remoteSysConfs.channel_push_url : "",
                    downloadWay1_2: '然后在弹出提示框中点击 "安装" 即可。',
                    warning_0: "",
                    warning_1: "",
                    warning_2: "",
                    warning_3: "",
                    warning_4: "",
                    downloadWay2: "方法二： 使用专用扫码器对准以下二维码一扫，弹出提示框中进行下载安装，根据安装和游戏教程进行安装游戏",
                    gameLogo: require("./images/md_bet.png"),
                    showGameIcon: true,
                    gameIcon: require("./images/app_icon.png"),
                    gameBg: require("./images/md_and_bg.png"),
                },
                {
                    id: 2,
                    gameDevice: "PT老虎机",
                    gameDetail: "PT电子游戏手机端，兼容各种品牌的Android手机，让玩家在手机端也能掌握娱乐的激情与快乐， 娱乐无处不在！（手机IOS系统不支持手机客户端下载）",
                    showDownloadBtn: true,
                    downloadWay1_1: '方法一：Android4.0以上手机及其他设备在自带浏览器中输入',
                    downloadUrl: "http://m.ls226588.com/download.html",
                    downloadWay1_2: '然后在弹然后按照教程，填写登陆用户名和密码。',
                    warning_0: "温馨提示：",
                    warning_1: "然后点击右上角->“在主屏幕上添加快捷方式”",
                    warning_2: "点击桌面应用图标快速游戏出提示框中点击 '安装' 即可。",
                    warning_3: "",
                    warning_4: "",
                    downloadWay2: "方法二：使用扫码器app，扫描左侧二维码，弹出提示框中进行下载安装，根据安装和游戏教程进行安装游戏",
                    gameLogo: require("./images/md_pt.png"),
                    showGameIcon: false,
                    gameBg: require("./images/md_andP_game.png"),
                },
                {
                    id: 3,
                    gameDevice: "PT真人现场",
                    gameDetail: "PT真人现场手机端，兼容各种品牌的Android手机，让玩家在手机端也能掌握娱乐的激情与快乐， 娱乐无处不在！（手机IOS系统不支持手机客户端下载）",
                    showDownloadBtn: true,
                    downloadWay1_1: '方法一：Android4.0以上手机及其他设备在自带浏览器中输入',
                    downloadUrl: "http://m.ls226588.com/live/download.html",
                    downloadWay1_2: '第一次登入客户端前必需要先至 安全中心 同步PT密码',
                    warning_0: "",
                    warning_1: "登入使用 前缀"+this.affix+"帐号与安全中心设置的PT密码登入",
                    warning_2: "",
                    warning_3: "",
                    warning_4: "",
                    downloadWay2: "方法二：使用扫码器app，扫描左侧二维码，弹出提示框中进行下载安装，根据安装和游戏教程进行安装游戏",
                    gameLogo: require("./images/md_pt.png"),
                    showGameIcon: false,
                    gameBg: require("./images/md_andP_casino.png"),
                },
                {
                    id: 4,
                    gameDevice: "MG手机端",
                    gameDetail: "兼容各种品牌的Android手机，让玩家在手机端也能掌握娱乐的激情与快乐， 娱乐无处不在！ 娱乐无处不在！",
                    showDownloadBtn: true,
                    downloadWay1_1: '方法一：Android4.0以上手机及其他设备在自带浏览器中输入',
                    downloadUrl: "http://resigner22.qfcontent.com/mobilecasino1/download?btag2=689781",
                    downloadWay1_2: '登入使用 前缀'+this.affix+' + 帐号与网站的密码登入',
                    warning_0: "",
                    warning_1: "",
                    warning_2: "",
                    warning_3: "",
                    warning_4: "",
                    downloadWay2: "方法二：使用扫码器app，扫描左侧二维码，弹出提示框中进行下载安装，根据安装和游戏教程进行安装游戏",
                    gameLogo: require("./images/md_mg.png"),
                    showGameIcon: false,
                    gameBg: require("./images/md_andP_game.png"),
                },
                {
                    id: 5,
                    gameDevice: "BBIN手机端",
                    gameDetail: "兼容各种品牌的Android手机，让玩家在手机端也能掌握娱乐的激情与快乐， 娱乐无处不在！",
                    showDownloadBtn: true,
                    downloadWay1_1: '方法一：Android4.0以上手机及其他设备在自带浏览器中输入',
                    downloadUrl: " http://m.ls226588.com/download.html",
                    downloadWay1_2:   "",
                    warning_0: "",
                    warning_1: "前缀"+this.affix+"+帐号＠bb9",
                    warning_2: "前缀跟帐号字母大写小写皆可登入",
                    warning_3: "下载安装完毕后即可进入游戏APP内点选游戏进行游玩",
                    warning_4: "",
                    downloadWay2: "方法二：使用扫码器app，扫描左侧二维码，弹出提示框中进行下载安装，根据安装和游戏教程进行安装游戏",
                    gameLogo: require("./images/md_bbin.png"),
                    showGameIcon: false,
                    gameBg: require("./images/md_andP_game.png"),
                },
                {
                    id: 6,
                    gameDevice: "AG手机端",
                    gameDetail: "兼容各种品牌的Android手机，让玩家在手机端也能掌握娱乐的激情与快乐， 娱乐无处不在！",
                    showDownloadBtn: true,
                    downloadWay1_1: '方法一：Android4.0以上手机及其他设备在自带浏览器中输入',
                    downloadUrl: "http://agmbet.com/",
                    downloadWay1_2: "然后在弹出提示框中点击“安装”即可。 ",
                    warning_0: "",
                    warning_1: "打开手机客户端，然后登入电脑网页进入AG平台，点击左下角立即体验，然后用手机扫描二维码按照提示设置手势密码后即可进入游戏。",
                    warning_2: "登入使用前缀"+this.affix+"+ 帐号。",
                    warning_3: "",
                    warning_4: "",
                    downloadWay2: "方法二：请使用网页版扫码或者其他扫码软件进行操作，弹出提示框中进行下载安装，根据安装和游戏教程进行安装游戏",
                    gameLogo: require("./images/md_ag.png"),
                    showGameIcon: false,
                    gameBg: require("./images/md_andP_game.png"),
                },
                {
                    id: 7,
                    gameDevice: "AB手机端",
                    gameDetail: "兼容各种品牌的Android5.0以上手机，让玩家在手机端也能掌握娱乐的激情与快乐， 娱乐无处不在！",
                    showDownloadBtn: true,
                    downloadWay1_1: '方法一：使用手机自带浏览器或其它浏览器中输入',
                    downloadUrl: "https://www.allbetgaming.com/zh_tw/agent/download.html",
                    downloadWay1_2: "前缀加"+this.affix+"+账号+ch5",
                    warning_0: "首次登入请先至会员中心设置Allbet密码",
                    warning_1: "建议配备",
                    warning_2: "型号：iPhone 6 或以上",
                    warning_3: "系统版本：iOS 8 或以上",
                    warning_4: "系统版本：Android 6.0 以上",
                    downloadWay2: "方法二：使用手机网页版扫码和手机QQ扫码，弹出提示框中进行下载安装，根据安装和游戏教程进行安装游戏",
                    gameLogo: require("./images/md_ab.png"),
                    showGameIcon: false,
                    gameBg: require("./images/md_andP_game.png"),
                },
                /*
                    {
                        id: 8,
                        gameDevice: "eBET手机端",
                        gameDetail: "智能终端的游戏发展已是锐不可挡的趋势，eBET跟著时代的潮流，致力于发展符合客户需求的产品， 尽心尽力的为客户打造公平、安全及简便的游戏环境，让玩家享受著尊贵的游戏体验。",
                        showDownloadBtn: true,
                        downloadWay1_1: '方法一：Android4.0以上手机及其他设备在自带浏览器中输入',
                        downloadUrl: "https://www.ebetapp.com/bgebst",
                        downloadWay1_2: "登入使用 前缀"+this.affix+" + 帐号",
                        warning_0: "",
                        warning_1: "",
                        warning_2: "",
                        warning_3: "",
                        warning_4: "",
                        downloadWay2: "方法二：使用扫码器app，扫描左侧二维码，弹出提示框中进行下载安装，根据安装和游戏教程进行安装游戏",
                        gameLogo: require("./images/md_ebet.png"),
                        showGameIcon: false,
                        gameBg: require("./images/md_andP_casino.png"),
                    },
                    {
                        id: 9,
                        gameDevice: "OPUS真人视讯",
                        gameDetail: "OPUS真人视讯手机端，兼容各种品牌的Android手机，让玩家在手机端也能掌握娱乐的激情与快乐， 娱乐无处不在！",
                        showDownloadBtn: true,
                        downloadWay1_1: '方法一：Android4.0以上手机及其他设备在自带浏览器中输入',
                        downloadUrl: "",
                        downloadWay1_2: "登入使用 前缀"+this.affix+" + 帐号",
                        warning_0: "",
                        warning_1: "",
                        warning_2: "",
                        warning_3: "",
                        warning_4: "",
                        downloadWay2: "方法二：使用扫码器app，扫描左侧二维码，弹出提示框中进行下载安装，根据安装和游戏教程进行安装游戏",
                        gameLogo: require("./images/md_opus.png"),
                        showGameIcon: false,
                        gameBg: require("./images/md_andP_casino.png"),
                    },                               
                */
            ]
        }
    }

    //切换Tab
    tabSelected = (id) => {
        this.setState({currentIndex: id})
    }
    
    render() {
        const host = window.location.host;
        const url = host.includes('localhost') ? 'localhost' : url;
        
        const tabList = this.state.tabs.map((res,i,arr)=>{
            let tabStyle = res.id === this.state.currentIndex ? 'device active' : 'device';

            return (
                <li key={res.id} className={tabStyle} onClick={()=>this.tabSelected(res.id)}>
                    <i className={res.tabClass}></i>
                    <b>{res.tabName}</b>
                    <span>{res.tabText1}<br/>{res.tabText2}</span>
                </li>
            );
        });

        let isPCShow = this.state.currentIndex === 1 ? 'block' : 'none';
        let isAndroidShow = this.state.currentIndex === 2 ? 'block' : 'none';

        return (
            <div id="downloadPage">
                <div className="clientDownload"></div>
                <ul className="downloadNav">
                    {tabList}
                </ul>
                <div className="showContent">
                    <div style={{"display": isPCShow}} className="pcContent">
                        <ul>
                            {
                                this.state.pcContent.map((item,i)=>{
                                    return (
                                        <li key={item.id}>
                                            <div className="pcLeft">
                                                <div className="pcHead">
                                                    <img src= {item.gameLogo} width="354" height="109" />
                                                    <h3>{item.gameName}</h3>
                                                </div>
                                                <p className="pcBody">
                                                    {item.gameDetail}
                                                    <br/>
                                                    登入使用 前缀{config.gameTag} + 帐号,比如账号为test,加前缀后为: {config.gameTag}test
                                                </p>
                                                <a href={item.downloadUrl} className="pcptBtn" target="_blank">
                                                    <img src={require("./images/download_btn.png")} width="148" height="47"/>
                                                </a>
                                            </div>
                                            <div className="pcRight">
                                                <img src={item.gamePic} width="454" height="310"  />
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div style={{"display": isAndroidShow}} className="androidContent">
                        <ul>
                            {
                                this.state.androidContent.map((item,i)=>{
                                    return (
                                        <li key={item.id}>
                                            <div className="adLeft">
                                                <h3 className="adTitle">{item.gameDevice}</h3>
                                                <p className="adDesc">{item.gameDetail}</p>
                                                {
                                                    item.showDownloadBtn ? <a className="downloadBtn" href={item.downloadUrl} target="_blank"><img src={require("./images/step_btn.png")}/></a> : null
                                                }
                                                <div className="step1">
                                                    <div className="stepNum">01</div>
                                                    <div className="stepText">
                                                        <span>{item.downloadWay1_1}</span>
                                                        <i>{item.downloadUrl}</i>
                                                        <span>{item.downloadWay1_2}</span>
                                                    </div>
                                                </div>
                                                <div className="warning">
                                                    <span>{item.warning_0}</span>
                                                    <span>{item.warning_1}</span>
                                                    <span>{item.warning_2}</span>
                                                    <span>{item.warning_3}</span>
                                                    <span>{item.warning_4}</span>
                                                </div>
                                                <div className="step2">
                                                <div className="stepNum">02</div>
                                                    <div className="stepText">
                                                        <span>{item.downloadWay2}</span>
                                                        <div className="qrcode">
                                                            <QRCode size={120} value={item.downloadUrl || ""} className="qrImg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="adRight">
                                                <img src={item.gameLogo} width="454" height="86" />
                                                {
                                                    item.showGameIcon ? <img src={item.gameIcon} width="63" height="63" className="appIcon" /> : null
                                                }
                                                <img src={item.gameBg} width="454" height="310" />
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(DownloadPage);