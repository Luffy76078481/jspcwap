
import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {config} from "globalConfig";
import * as cache from "../../../store/CacheHelper";
import './css/CasinoPage_Bet365.scss';

class CasinoPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameLink:""
        }
    }
    onClickCasino(val){
        if (!window.actions.auth()){return;}       
        let param = val;
        Object.assign(param,{GameType:val.PlatformId=="MG2"?'casino':'Trueman'})
        cache.setSession("GameParam",JSON.stringify(param))            
        return       
    }
    renderCansinoList() {
        var CansinoLists = [];
        for (var i = 0; i <  this.props.casinos.length; i++) {
            var CansinoList =  this.props.casinos[i];
            CansinoLists.push(
                <div key={i} className='casinoGame'>
                    <div className={" c_"+CansinoList.PlatformId+" c-items wow fadeInUp animated"} style={{visibility: "visible", animationName: "fadeInUp", float:'left', marginLeft:'40px'}}>
                        <div className={ "c_"+CansinoList.PlatformId+" casino-platform-list-img"} style={{backgroundSize:"100%", background: "url("+config.prdImgUrl+ CansinoList.ImageUrl + ") no-repeat"}}></div>
                        <span className="hengBg"></span>
                        <div className={CansinoList.ID+" casino-platform-list-link"}>
                            <a 
                            className='togame' 
                            target={this.props.user.token?"_blank":""} 
                            href={this.props.user.token?'/games.html':'javascript:void(0)'} 
                            onClick={this.onClickCasino.bind(this,CansinoList)}>
                                进入游戏
                            </a>
                        </div>
                    </div>
                </div>
            );
        }
        return CansinoLists;
    }
    render() {
        const hostname = window.location.hostname;
        const url = hostname.includes('localhost') ? 'local' : url;
        const promotionLink =this.props.remoteSysConfs.channel_push_url;
        const {SiteMainUrl} = this.props.backConfigs;
        return (
            <article id="casino">
                <div className="fnameCenter">
                    <div className="contentHeadNav">
                        <Link to="/casino" className="xchgNavStyle"></Link>
                        <Link to="/casino" className="lpNavStyle"></Link>
                        <Link to="/bingo" className="cpNavStyle"></Link>
                        <Link to="/games" className="dzNavStyle"></Link>
                        <Link to="/sport" className="tyNavStyle"></Link>
                    </div>
                    <div className="contentFousImg">
                        <a href="javascript:;"><img src={require("../images/casino/newCasino_03.jpg")} /></a>
                    </div>
                </div>
                <div className="listWrap">
                    <div className="subNavWrap">
                        <a className="subCtrl active" href="/help.html"><i className="website"></i>网页版</a>
                        <a className="subCtrl" href={promotionLink} target="_blank"><i className="download"></i>下载版</a>
                        <a className="subCtrl" href="/help.html" target="_blank"><i className="liveg"></i>帮助</a>
                    </div>
                    <div className="showUrl">
                        <span className='textDes'>移动版：无须下载,在IPHONE和ANDROID浏览器上也能进行游戏</span>
                        <div className="textUrl">
                            <span>{SiteMainUrl}</span>
                            <i className='device_icon' />
                        </div>
                    </div>
                </div>
                <div className="newsList">                
                    <div className="container" style={{"clear":"both"}}>
                        <div className="casino-Content">
                            <div className="row casino-platform-list">
                                {this.renderCansinoList()}
                            </div>
                        </div>
                    </div>
                </div>         
            </article>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        casinos:state.views.casinos,
        remoteSysConfs:state.remoteSysConfs,
        backConfigs: state.backConfigs,
        platforms: state.game.platforms,
    }
);

export default connect(mapStateToProps, {})(CasinoPage);