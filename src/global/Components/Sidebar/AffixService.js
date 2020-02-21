

import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./AffixService.scss";
import QRCode from 'qrcode.react';
import { config } from '../../../../config/config';

class AffixService extends Component{
    constructor(props) {
        super(props);        
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=800,height=700,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render(){
        return (
            <div className="Sidebar">
                <div className="SidebarLeft fl" style={config.spec.includes("j98") ? {padding:"120px 0", lineHeight:"80px"} : null}>
                    在线客服
                </div>
                <div className="SidebarRight fr">
                    <div>
                        <i className="fa fa-headphones"/>&nbsp;<span>在线客服：</span>        
                        <span className="label-warning" onClick={this.serversOpen.bind(this)}>
                            <i className="fa fa-headphones"/>&nbsp;点击联系客服
                        </span>
                    </div>
                    {
                        this.props.remoteSysConfs.online_service_qq ?
                            <div>
                                <i className="fa fa-qq"/>&nbsp;
                                <span>客服QQ：</span>
                                <span className="label-warning">
                                    <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                                        <i className="fa fa-qq"/>&nbsp;
                                        {this.props.remoteSysConfs.online_service_qq}
                                    </a>
                                </span>
                            </div> : null
                    }
                    {config.spec.includes("j98") ?
                        <div className="picture">
                            <img src={require("./images/photo_2020-01-13_qq.jpg")} alt="" />
                            {/* <img src={require("./images/photo_2020-01-13_qq1.jpg")} alt="" /> */}
                        </div>
                        : null}
                    {
                        this.props.remoteSysConfs.agent_service_qq ?
                            <div>
                                <i className="fa fa-qq"/>&nbsp;<span>代理QQ：</span>
                                <span className="label-warning">
                                    <a href={"tencent://message/?uin="+this.props.remoteSysConfs.agent_service_qq+"&Menu=yes"} target="_blank">
                                        <i className="fa fa-qq"/>
                                        &nbsp;{this.props.remoteSysConfs.agent_service_qq}
                                    </a>
                                </span>
                            </div> : null
                    }

                    {
                        this.props.remoteSysConfs.agent_wecaht?
                        (config.spec.includes("asa") ?  null :
                        <div>
                            <i className="fa fa fa-weixin"></i>&nbsp;<span>代理微信号：</span>
                            <span className="label-warning">
                                <i className="fa  fa-weixin"></i>&nbsp;{this.props.remoteSysConfs.agent_wecaht}
                            </span>
                        </div>) : null
                    }
                    {
                        this.props.remoteSysConfs.online_service_wechat ?
                            <div><i className="fa fa fa-weixin"/>&nbsp;<span>微信公众号：</span>         
                                <span className="label-warning">
                                    <i className="fa  fa-weixin"/>
                                    &nbsp;{this.props.remoteSysConfs.online_service_wechat}
                                </span>
                            </div> : null
                    }
                    {config.spec.includes("j98") ?
                        <div className="picture">
                            <img src={require("./images/photo_2020-01-13_weixin.jpg")} alt="" />
                        </div>
                        : null}
                    {
                        this.props.remoteSysConfs.online_service_phone ?
                            <div>
                                <i className="fa fa-phone"/>&nbsp;<span>24小时客服：</span>  
                                <span className="label-warning">
                                    <i className="fa fa-phone"/>
                                    &nbsp;{this.props.remoteSysConfs.online_service_phone}
                                </span>
                            </div> : null
                    }
                    {
                        this.props.remoteSysConfs.online_service_email ?
                            <div>
                                <i className="fa fa-envelope"/>&nbsp;<span>客服信箱：</span>  
                                <span className="label-warning">
                                    <i className="fa fa-envelope"/>
                                    &nbsp;{this.props.remoteSysConfs.online_service_email}
                                </span>
                            </div> : null
                    }
                    <div>
                        <i className="fa fa-mobile"/>&nbsp;<span>手机下载：</span> 
                        <a className="label-warning" href={this.props.remoteSysConfs ? this.props.remoteSysConfs.channel_push_url : ""}>
                            <i className="fa fa-download"/>
                            &nbsp;手机下载地址
                        </a>
                    </div>
                    <div className="SidebarCode">
                        <QRCode includeMargin={true} size={100} value={this.props.remoteSysConfs.channel_push_url || ""} className="qrImg" alt="扫描下载APP"  />
                        <div>扫一扫下载APP</div>
                    </div>                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(AffixService)