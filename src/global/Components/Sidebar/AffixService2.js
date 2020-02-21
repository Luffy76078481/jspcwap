
import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./AffixService2.scss";
import QRCode from 'qrcode.react';

class AffixService extends Component{
    constructor(){
        super();
        this.state = {
            show: true
        }
    }
    close(){
        this.setState({show: false});
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render(){
        return (
            <div className="affix-online-server-2" style={{display: this.state.show ? "block":"none"}}>
                <div className="hd serversOpenimg" onClick={this.serversOpen.bind(this)}></div>
                <div className="bd">
                    <div className="block online-service" onClick={this.serversOpen.bind(this)}>
                        <div className="title">
                            <i className="fa fa-headphones"></i>
                            <span className="num">&nbsp;7x24</span>
                        </div>
                        <div className="content"><span>在线客服</span></div>
                    </div>
                    {
                        this.props.remoteSysConfs.online_service_qq &&
                        <div className="block online-qq">
                            <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                                <div className="title QQ1"><i className="fa fa-qq"></i>&nbsp;<span>客服QQ</span></div>
                                <div className="content"><span>{this.props.remoteSysConfs.online_service_qq}</span></div>
                            </a>
                        </div>
                    }
                    {
                        this.props.remoteSysConfs.online_service_phone &&
                        <div className="block online-phone">
                            <div className="title"><i className="fa fa-phone"></i>&nbsp;<span>客服电话</span></div>
                            <div className="content"><span>&nbsp;{this.props.remoteSysConfs.online_service_phone}</span>
                            </div>
                        </div>
                    }

                    {
                        this.props.remoteSysConfs.online_service_wechat &&
                        <div className="block online-phone">
                            <div className="title"><i className="fa fa-weixin"></i>&nbsp;<span>客服微信</span></div>
                            <div className="content"><span>&nbsp;{this.props.remoteSysConfs.online_service_wechat}</span>
                            </div>
                        </div>
                    }
                    <div className="qrcode">
                     <QRCode includeMargin={true} size={90} value={this.props.remoteSysConfs.channel_push_url || ""} className="qrImg" alt=""  />
                        <div className="text">扫一扫下载APP</div>
                    </div>               
                </div>
                <div className="block ft">
                    <span className="left-span"></span>
                    <span className="center" onClick={this.close.bind(this)}>关&nbsp;闭</span>
                    <span className="right-span"></span>
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