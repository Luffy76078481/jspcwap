
import React, { Component } from 'react';
import {connect} from 'react-redux';
import QRCode from 'qrcode.react'
import "./AffixServiceStaticQr.scss";
import {serversOpen} from "commonFunc"

class AffixServiceStaticQr extends Component{
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
        return (
            <div className="affix-online-server-r" style={{display: this.state.show ? "block":"none"}}>
                <div className="bd">
                    <div className="block online-service" onClick={()=>serversOpen(this.props.remoteSysConfs.online_service_link)}></div>
                    {
                        this.props.remoteSysConfs.online_service_qq?
                        <div className="block online-qq">
                            <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                                <div className='newQQ'>
                                    <span>{this.props.remoteSysConfs.online_service_qq}</span>
                                </div>
                            </a>
                        </div>:null
                    }            
                    {
                        this.props.remoteSysConfs.online_service_phone?
                        <div className="block online-phone">
                            <div className='newTEL'>
                                <span>{this.props.remoteSysConfs.online_service_phone}</span>
                            </div>
                        </div>:null
                    }
                    <div className="newScan">
                        <QRCode includeMargin={true} size={90} value={this.props.remoteSysConfs.channel_push_url || ""} className="qrImg" alt=""  />
                    </div>
                </div>
                <div className="newclose" onClick={this.close.bind(this)}></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(AffixServiceStaticQr)