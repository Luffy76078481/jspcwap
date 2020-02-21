
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ApiAllSysConfigAction} from "globalAction";
import QRCode from 'qrcode.react'
import {serversOpen} from "commonFunc"
import "./AffixService.scss";

class AffixService2 extends Component{
    componentWillMount(){
        new ApiAllSysConfigAction().fly();
    }
    constructor(){
        super();
        this.state = {
            show: true
        }
    }
    close(){
        this.setState({show: false});
    }
    render(){
        const {SiteMainUrl} = this.props.backConfigs;
        const online_service_link = this.props.remoteSysConfs.online_service_link || "";
        return (

            window.config.spec.includes("tyc") ? 
            (
                    <div className="onlineServer-right-body" style={{ display: this.state.show ? "block" : "none" }}>
                        <div className="SidebarTop-top" onClick={() => { serversOpen(online_service_link) }}>
                            <span>{SiteMainUrl}</span>
                        </div>
                        <div className="serversOpen-open">
                            <div className="block online-service" onClick={() => { serversOpen(online_service_link) }}></div>
                            {
                                this.props.remoteSysConfs.online_service_qq &&
                                <div className="online-qq">
                                    <a href={"tencent://message/?uin=" + this.props.remoteSysConfs.online_service_qq + "&Menu=yes"} target="_blank">
                                        <span className='faqQQ'>{this.props.remoteSysConfs.online_service_qq}</span>
                                    </a>
                                </div>
                            }
                            {
                                this.props.remoteSysConfs.online_service_phone &&
                                <div className="block online-phone">
                                    <div style={{ "height": "35px" }}></div>
                                    <QRCode includeMargin={true} size={70} value={this.props.remoteSysConfs.channel_push_url} className="qrImg" />
                                </div>
                            }
                            {
                                this.props.remoteSysConfs.online_service_wechat &&
                                <div className="block online-phone">
                                    <div className="title"
                                    ><i className="fa fa-weixin"></i>&nbsp;<span>客服微信</span>
                                    </div>
                                    <div className="content"><span>&nbsp;{this.props.remoteSysConfs.online_service_wechat}</span> </div>
                                </div>
                            }
                        </div>
                        <div className="block closeButton">
                            <span className="left-span"></span>
                            <span className="center" onClick={this.close.bind(this)}>关&nbsp;闭</span>
                            <span className="right-span">2</span>
                        </div>
                    </div>
            )
            : 
            (<div className="onlineServer-right" style={{display: this.state.show ? "block":"none"}}>
                <div className="SidebarTop" onClick={()=>{serversOpen(online_service_link)}}></div>
                <div className="serversOpen">
                    <div className="block online-service" onClick={()=>{serversOpen(online_service_link)}}></div>
                    {
                        this.props.remoteSysConfs.online_service_qq &&
                        <div className="online-qq">
                            <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                                <span className='faqQQ'>{this.props.remoteSysConfs.online_service_qq}</span>
                            </a>
                        </div>
                    }
                    {
                        this.props.remoteSysConfs.online_service_phone &&
                        <div className="block online-phone">
                            <div style={{"height":"42px"}}></div>
                            <QRCode includeMargin={true} size={90} value={this.props.remoteSysConfs.channel_push_url} className="qrImg"/>
                        </div>
                    }
                    {
                        this.props.remoteSysConfs.online_service_wechat &&
                        <div className="block online-phone">
                            <div className="title"
                                ><i className="fa fa-weixin"></i>&nbsp;<span>客服微信</span>
                            </div>
                            <div className="content"><span>&nbsp;{this.props.remoteSysConfs.online_service_wechat}</span> </div>
                        </div>
                    }
                </div>
                <div className="block closeButton">
                    <span className="left-span"></span>
                    <span className="center" onClick={this.close.bind(this)}>关&nbsp;闭</span>
                    <span className="right-span">2</span>
                </div>
            </div> )
            
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs,
        backConfigs: state.backConfigs,
    }
);

export default connect(mapStateToProps)(AffixService2)