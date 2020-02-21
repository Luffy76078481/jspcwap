
import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Footer.scss";
import {serversOpen} from 'commonFunc'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const appName = window.config.appName;
        const QQ =this.props.remoteSysConfs.online_service_qq;
        const mail = this.props.remoteSysConfs.online_service_email;
        const phone = this.props.remoteSysConfs.online_service_phone;
        return (
            <div className="gdhFooter">
                <div id="footerimg">
                    <div className="content">
                        <div className="fc info">
                            <div className=" mail"><i className="fa fa-envelope"></i>&nbsp;<span>联络信箱:</span><span>{mail}</span></div>
                            <div className="call"><i className="fa fa-phone" ></i>&nbsp;<span>客服热线:</span><sapn>{phone}</sapn></div>
                            <div className="servers" onClick={ ()=>{serversOpen(this.props.remoteSysConfs.online_service_link)} }><i className="fa fa-headphones" ></i>&nbsp;<span>7x24小时在线客服</span></div>
                        </div>
                        <div className="fc partner">
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                        <div className="fc about">
                            <img className="pic" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="top">
                    <div className="center">
                        <div className="links">
                            <a href="/help.html" target="_blank">关于{appName}</a>
                            <a href="/help.html#contact" className="copyColor2 f12 color-third" target="_blank">联系我们</a>
                            <a href="/agent.html" target="_blank">合作夥伴</a>
                            <a href="/help.html#deposit" target="_blank">存款帮助</a>
                            <a href="/help.html#withdrawal" target="_blank">取款帮助</a>
                            <a href="/help.html#commonQ" target="_blank" >常见问题</a>
                            <a href="#" onClick={()=>{serversOpen(this.props.remoteSysConfs.online_service_link)}}>客服中心</a>
                        </div>
                        <div className="copyRight">Copyright © {appName} Reserved</div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        message:state.message,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(Footer)