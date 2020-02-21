import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import "./FirstPage.scss";

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:1}
    }
    changePT(LinkID){
        window.actions.ChangeLinkID(LinkID);
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const NoticeBar = window.r.get("NoticeBar");
        const promotionLink = this.props.remoteSysConfs.channel_push_url;
        const FirstPagePromotionAlert = window.r.get("FirstPagePromotionAlert");
        return (
            <div className="gdhFirst">
                {FirstPagePromotionAlert && <FirstPagePromotionAlert/>}
                <div className="main">
                    <div className="note"><NoticeBar ></NoticeBar></div>
                    <div className="pa1">
                        <div className="slider"><ImageGallery height="340px" imgtype='slider'></ImageGallery></div>
                        <div className="inter">
                            <div className="wap"><a href={promotionLink} target="_blank"></a></div>
                            <ul>
                                <li><a href="/help.html#deposit" target="_blank"></a></li>
                                <li><a href="/help.html#withdrawal" target="_blank"></a></li>
                                <li><Link to="/promotions"></Link></li>
                                <li><a href="/agent.html" target="_blank"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pa2">
                        <div className="nav">
                            <ul>
                                <li onClick={this.changePT.bind(this,"AG")}><Link to="/games"></Link></li>
                                <li onClick={this.changePT.bind(this,"MG2")}><Link to="/games"></Link></li>
                                <li onClick={this.changePT.bind(this,"BBIN")}><Link to="/games"></Link></li>
                            </ul>
                        </div>
                        <div className="games">
                            <div className="person"></div>
                            <div className="items">
                                <ul>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"BBIN")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"PT")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"HB")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"BBIN")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"AG")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"BBIN")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"BBIN")}><span>开始游戏</span></Link></li>
                                    <li><Link to="/games" onClick = {this.changePT.bind(this,"BBIN")}><span>开始游戏</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="pa3">
                        <ul>
                            <li><Link to="/casino"></Link></li>
                            <li><Link to="/sport"></Link></li>
                            <li><Link to="/bingo"></Link></li>
                        </ul>
                    </div>
                    <div className="pa4">
                        <div className="text">
                            <div className="group">
                                <div className="icons"></div>
                                <p>全新模式，新颖设计更耐玩，汇集诸多精彩壹壹呈现；各国博彩精英、世界顶级博彩服务团队打造，享受随时随地、足不出户的博彩“游戏人生”!</p>
                                <div className="more"><a href={promotionLink} target="_blank">更多</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        views:state.views,
        global: state.global,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(FirstPage);