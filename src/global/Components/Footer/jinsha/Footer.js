import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Footer.scss";
import {serversOpen} from "commonFunc";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <footer>
                <div className="footer-top-bg">
                    <div className="footer-top-wrap clearfix">
                        <div className="footer-top-box maocao">电话热线&nbsp;
                            <span className="footer-top-highlight">{this.props.remoteSysConfs.online_service_phone || "无"}</span>
                        </div>
                        <div className="footer-top-box tel">
                            <a href={"tencent://message/?uin="+this.props.remoteSysConfs.agent_service_qq+"&Menu=yes"}>
                                客服QQ&nbsp;<span className="footer-top-highlight">{this.props.remoteSysConfs.online_service_qq || "无"}</span>
                            </a>
                        </div>
                        <div className="footer-top-box mail">联系邮箱&nbsp;
                            <span className="footer-top-highlight">{this.props.remoteSysConfs.online_service_email || "无"}</span>
                        </div>
                        <a className="footer-top-link" onClick={()=>serversOpen(this.props.remoteSysConfs.online_service_link)}>
                            <span className="footer-top-highlight">7×24小时</span>&nbsp;在线客服
                        </a>
                    </div>
                </div>     
                <div className="footer-content-style">
                    <div className="footer-bottom-wrap">
                        <div className="footer-bottom-top clearfix">
                            <a id="browser-logo" >
                                <img src={require('./images/ublogo.png')} width="146" />
                            </a>
                            <div className="footer-pic"></div> 
                        </div>
                        <div className="article-menu">
                            <a href="/help.html#deposit" target="_blank">存取款帮助</a>
                            <a href="/help.html#commonQ" target="_blank">常见问题</a>
                            <a href="/help.html#partner" target="_blank">合作伙伴</a>
                            <a href="/help.html" target="_blank">关于我们</a>
                            <a href="/help.html#contact" target="_blank">联系我们</a>                      
                        </div>
                        <div className="footer-info"></div>
                        <div className="copyright">Copyright (c) 金沙城娱乐城 Reserved</div>                
                    </div>
                </div>
            </footer>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(Footer)