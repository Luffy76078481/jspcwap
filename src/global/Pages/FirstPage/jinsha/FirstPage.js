import React, { Component } from 'react';
import "./FirstPage.scss";
import { connect } from 'react-redux';
import { Link,browserHistory } from 'react-router';
import QRCode from 'qrcode.react';
import {RedAllMsg,serversOpen} from "commonFunc";
import {config} from "globalConfig";

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reqLock:false
        }
    }
    onLogin(event){
        event.preventDefault();
        if(this.state.reqLock)return;
        this.state.reqLock =true;
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value, this.refs.password.value).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiBankAccountsAction().fly();
            }
            _self.state.reqLock = false;
        });
    }
    // 登录表单
    renderLoginForm(){
        let agent_link=this.props.remoteSysConfs.agent_link;
        return(
            <form onSubmit={this.onLogin.bind(this)}>
                <div className='loginNameWrap'>
                    <img src={require('./images/login_text.png')}></img>
                    <a className='toAgent' href={agent_link} target='_blank'>代理登入</a>
                </div>
                <div className='loginNameWrap'>
                    <input type="text" ref="username" placeholder="用户名"/>
                </div>
                <div className='loginNameWrap'>
                    <input type="password" ref="password" placeholder="密码"/>
                    <a className='forgetPass' onClick={()=>serversOpen(this.props.remoteSysConfs.online_service_link)}>忘记密码</a>
                </div>
                <div className='mt20'>
                    <button type="submit" className="custom-btn-login"></button>
                    <Link to="/register" className="link-register" title="立即注册"></Link>
                </div>
            </form>
        )
    }
    onLogout() {
        new window.actions.LogoutAction().fly(()=>{
            browserHistory.push("/");
        });
    }
    // 登录后
    renderUserInfo(){
        const user = this.props.user;
        const userLevel = user.userLevelName && user.userLevelName.indexOf("黑名单") !== -1 ? "会员":user.userLevelName|| "欢迎您";
        return(
            <div className='success-login-box'>
                <div className='mb10'>
                    <img src={require('./images/sl-bg.png')}/>
                </div>
                <div className='signin-success-form'>
                    <ul className='mb10 topUl'>
                        <li><span>{userLevel}：<Link to="/member">{user.username}</Link></span></li>
                        <li><span>余额：</span><a>{this.props.user.amount} RMB</a></li>
                    </ul>
                    <ul className='bUl'>
                        <li><Link to="/member">账户中心</Link></li>
                        <li><Link to="/deposit">线上存款</Link></li>
                        <li><Link to="/withdraw">线上取款</Link></li>
                        <li><Link to="/transfer">额度转换</Link></li>
                        <li><Link to="/records">往来记录</Link></li>
                        <li onClick={ ()=>RedAllMsg()}><Link to="/records_message">未读讯息<span>({this.props.sitemsg.unread})</span></Link></li>
                    </ul>
                    <a className='loginOut' onClick={this.onLogout.bind(this)}></a>
                </div>
            </div>
        )
    }
    onClickCasino(val){
        if (!window.actions.auth()){return;}       
        let param = val;
        Object.assign(param,{GameType:val.PlatformId=="MG2"?'casino':'Trueman'})
        cache.setSession("GameParam",JSON.stringify(param))            
        return       
    }
    casinosGames(){
        let FirstPageCasino = [];
        let shwoGame = ['BBIN','AG','OG','AB']
        for(let i=0;i<this.props.casinos.length;i++){
            let casino = this.props.casinos[i];
            for(let t=0;t<shwoGame.length;t++){
                if(casino.PlatformId.includes(shwoGame[t])){
                    FirstPageCasino.push(
                        <a key={i} 
                        onClick={this.onClickCasino.bind(this,casino)} 
                        target={this.props.user.token?"_blank":""} 
                        href={this.props.user.token?'/games.html':'javascript:void(0)'} 
                        className={casino.PlatformId + " js-ele-firstgame-fade"}></a>
                    )
                }
            }
        }
        return FirstPageCasino
    }
    // 哈哈哈哈，电子特殊写法
    intoGames(tag){
        this.toPage(1,tag)
        setTimeout(()=>{
            browserHistory.push("/games?tab="+tag);            
        })
    }
    toPage(pageNo=1,tag) {
        let filter = {};
        filter.GamePlatform = tag;
        filter.GameType = 4;
        new window.actions.ApiQueryGameAllCountAction(filter.GamePlatform,filter.YoPlay).fly();
        new window.actions.ApiQueryGamesAction(filter,pageNo,12).fly();
    }
    render() {
        // const FirstPagePromotionAlert = window.r.get("FirstPagePromotionAlert");
        const HomeAnnouncement = window.r.get("HomeAnnouncement")
        const ImageGallery = window.r.get("ImageGallery");
        const PopNews = window.r.get("NoticeBar");
        return(
            <main className='main-content'>
                {/* {FirstPagePromotionAlert&&<FirstPagePromotionAlert/>} */}
                {<HomeAnnouncement/>}
                <div className="notice">
                    <div className="pr w1000 mAuto">                                        
                        <i className="newNotice">最新公告：</i>                      
                        <div className="noticeCenter">
                            <PopNews ></PopNews>
                        </div>
                    </div>                
                </div>
                <div className='banner_wrap'>
                    <ImageGallery height="474px"></ImageGallery>
                    <div className="paAuto w1000">
                        <div className={this.props.user.token?"success-login first-login-wrap":"first-login-wrap"}>
                            {this.props.user.token? this.renderUserInfo():this.renderLoginForm()}
                        </div>                       
                    </div>
                </div>
                <div className='FirstContents'>
                    <div className='first-top-btns clearfix'>
                        <a href="/help.html#deposit" target="_blank" className='top-save-btn'></a>
                        <div className="top-btn-line"></div>
                        <a href="/help.html#withdrawal" target="_blank" className='top-take-btn'></a>
                        <div className="top-btn-line"></div>
                        <a className='top-download-btn' href={this.props.remoteSysConfs.channel_push_url} target="_blank" ></a>
                        <div className="top-btn-line"></div>
                        <a className='top-guide-btn' onClick={e=>alert('暂无教程')}></a>
                    </div>
                    <div className='two_style_bg'>
                        <div className='first-casino-wrap'>
                            <div className='casino-text-wrap clearfix'>
                                <div className="casino-left-text">
                                    <div className="casino-title">BBIN电子游艺平台</div>
                                    <div className="casino-content">BBIN提供多款机率游戏，以丰富玩法、视觉及声光效果提供顶级的娱乐享受，只为你提供充满娱乐享受的游戏体验。</div>
                                </div>
                                <div className="casino-right-text">
                                    <div className="casino-title">MG电子游艺平台</div>
                                    <div className="casino-content">欧美最流行的游戏平台之一，已经成为世界上3D视频老虎机的顶尖开放商。游戏画面精致，丰富好玩，让玩家爱不释手。</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gameTOgame"> 
                        <div className="first-casino-wrap">
                            <div className="casino-game-wrap clearfix">
                                <div className="casino-game-link">
                                    <div className="casino-game-pic game-duobao"></div>
                                    <div className="casino-game-right">
                                        <div className="casino-game-title" title="三倍猴子">糖果派对2</div>
                                        <a className="play-link" onClick={this.intoGames.bind(this,"BBIN")}>PLAY</a>
                                    </div>
                                </div>
                                <div className="casino-game-link">
                                    <div className="casino-game-pic game-candyparty"></div>
                                    <div className="casino-game-right">
                                        <div className="casino-game-title" title="糖果多多">多宝鱼虾蟹</div>
                                        <a className="play-link" onClick={this.intoGames.bind(this,"AG")}>PLAY</a>
                                    </div>
                                </div>
                                <div className="casino-game-link">
                                    <div className="casino-game-pic game-cockfighting"></div>
                                    <div className="casino-game-right">
                                        <div className="casino-game-title">新年快乐</div>
                                        <a className="play-link"  onClick={this.intoGames.bind(this,"MG2")}>PLAY</a>
                                    </div>
                                </div>
                                <div className="casino-game-link">
                                    <div className="casino-game-pic game-breakaway"></div>
                                    <div className="casino-game-right">
                                        <div className="casino-game-title" title="疯狂管弦乐">飞天财神</div>
                                        <a className="play-link"  onClick={this.intoGames.bind(this,"CQ")}>PLAY</a>
                                    </div>
                                </div>
                                <div className="casino-game-link">
                                    <div className="casino-game-pic casino-reeldems"></div>
                                    <div className="casino-game-right">
                                        <div className="casino-game-title" title="机器外星人">六福兽</div>
                                        <a className="play-link" onClick={this.intoGames.bind(this,"PT")}>PLAY</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="first-game-title">澳门金沙&nbsp;官方直营</div>
                    <div className='first-game-wrap'>
                        <div className='clearfix ele-firstgame pr'>
                            {this.casinosGames()}
                        </div>
                    </div>
                    <div className="first-bottom-bg">
                        <div className="first-bottom-btn clerfix">
                            <Link className="bottom-game-sport" to="/sport"></Link>
                            <Link className="bottom-game-lottery" to="/bingo"></Link>
                            <a className="bottom-join-agent" target="_blank" href="/agent.html"></a>
                        </div>
                        <div className="first-bottom-line"></div>
                    </div>
                    <div className="first-qrcode-bg">
                        <div className="first-qrcode-wrap">
                            <div className="first-qrcode-text">
                                我们的手机投注平台面向全网玩家，
                                提供近百款老虎机·百家乐·以及彩票游戏投注，
                                线上存款及线上取款，一键操作，运用3D即时运算创造真实场景结合立体影像，
                                完整规划的跨系统娱乐平台，整合同步帐号和资料传输，
                                达到随时随地不间断娱乐的享受概念。</div>
                            <a className="first-mobile-link" href={this.props.remoteSysConfs.channel_push_url} target="_blank"></a>
                            <div className="first-qrcode">
                                <QRCode includeMargin={true} size={110} value={this.props.remoteSysConfs.channel_push_url || ""} alt="扫描下载APP"  />
                            </div>
                        </div>
                    </div>
                    <div className="first-about-bg">
                        <div className="first-about-wrap">
                            <div className="first-about-title">关于金沙<span className="about-sub-title">ABOUT US</span></div>
                            <div className="first-about-content">在市场上众多的博彩网站中，
                            玩家选择澳门金沙sands娱乐场除了多元化的产品，也是因为我们在业界拥有良好的信誉口碑，
                            以及高质量的服务，我们的用心随处可见，绝无任何恶意软件，并获得GEOTRUST国际认证，
                            确保网站公平公正性，所有会员数据均经过加密，保障玩家隐私。我们以服务会员不打烊的精神，
                            24小时处理会员出入款相关事宜，令我们骄傲的客服团队，亲切又专业，解决玩家对于网站、游戏的种种疑难杂症，
                            让每位玩家有宾至如归的感觉！您所想要的，就是我们一直在追求的，我们绝对是您的最佳选择。</div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        sitemsg: state.sitemsg,
        remoteSysConfs: state.remoteSysConfs,
        casinos:state.views.casinos,
    }
);

export default connect(mapStateToProps, {})(FirstPage);