
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, Button } from 'antd';
import {ApiAllSysConfigAction} from 'globalAction'
import QRCode from 'qrcode.react';
import "./AffixService.scss";
import SSS from './images/SSS.png'
import sunbet from './images/sunbet.png'
class AffixService extends Component{
    componentWillMount(){
        new ApiAllSysConfigAction().fly();
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render(){
        let downloadCon = (
            <div className="download_con">
                <a className="sss" target="_blank" href={this.props.remoteSysConfs.channel_push_url}>
                    <img src={SSS} /><br/>
                    <span>手机客户端</span>
                </a>
                {/*<a className="sunbet">*/}
                    {/*<img src={sunbet} /><br/>*/}
                    {/*<span>客户端</span>*/}
                {/*</a>*/}
            </div>
        );
        let qrCon = (
            <div className="qrCon">
                <QRCode className="qrImg"
                        includeMargin={true} //内部是否有margin
                        size={130}  //图片大小
                        value={this.props.remoteSysConfs.channel_push_url  || "" } //地址
                />
                <div><span className="dirty-yellow">手机版</span><span>扫一扫</span></div>
            </div>
        )
        return (
            <div className="affix-right">
                <a onClick={this.serversOpen.bind(this)} className="servers"></a>
                <Popover overlayClassName="Popover" placement="left"  content={downloadCon} trigger="hover">
                    <a className="download" target="_blank" href={this.props.remoteSysConfs.channel_push_url}></a>
                </Popover>
                <Popover overlayClassName="Popover" placement="left"  content={qrCon} trigger="hover">
                    <a className="qrCode"></a>
                </Popover>
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