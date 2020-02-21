
/*
    _____________________________ 19/7/11 Update
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./AffixService4.scss";
import QRCode from 'qrcode.react';
import {Link,browserHistory} from 'react-router';

class SidebarTem extends Component{
    constructor(props) {
        super(props);        
        this.state={
            SidebarTop:"50%",
            totalH:document.documentElement.scrollHeight,// 文檔高度，總高度
            windowH:document.documentElement.clientHeight,// 窗口高度，可視高度
        }
    }  
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=800,height=700,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(e){
        let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        this.setState({
            SidebarTop:(document.documentElement.clientHeight)/2+scrollTop
        })
    }
}
class SRS extends SidebarTem{
    constructor(props) {
        super(props);        
    }
    render(){
        return (
            <div className="floatBar rightSb" style={{"top":this.state.SidebarTop}} ref='rightSb'>
                <div className="float_bg float_right_bg">
                    <a className="float_log float_right_log" onClick={this.serversOpen.bind(this)}></a>
                    <a className='float-service' onClick={this.serversOpen.bind(this)}></a>
                    <a className='float-font' href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"}>
                        <span>客服QQ</span><br/>
                        <span>
                            { 
                                this.props.remoteSysConfs.online_service_qq?
                                this.props.remoteSysConfs.online_service_qq:
                                ""
                            }
                        </span>
                    </a>
                    <a className='float-font' href={"tencent://message/?uin="+this.props.remoteSysConfs.agent_service_qq+"&Menu=yes"}>
                        <span>代理QQ</span><br/>
                        <span>
                            {
                                this.props.remoteSysConfs.agent_service_qq?
                                this.props.remoteSysConfs.agent_service_qq:
                                ""
                            }
                        </span>
                    </a>
                    <a className='float-code'>
                        <p>客服微信二维码</p>
                        <QRCode includeMargin={true} size={90} value={this.props.remoteSysConfs.online_service_wechat || ""} className="codeSide" alt="扫描联系微信客服"  />
                    </a>
                </div>
            </div>
        );
    }
}
class SLS extends SidebarTem{
    constructor(props) {
        super(props);     
    }
    render(){
        return (
            <div className="floatBar leftSb" style={{"top":this.state.SidebarTop}} ref='leftSb'>
                <div className="float_bg float_left_bg">
                    <a className="float_log float_left_log" href={this.props.remoteSysConfs.channel_push_url?this.props.remoteSysConfs.channel_push_url:""} ></a>
                    <a className='float-service' onClick={this.serversOpen.bind(this)}></a>
                    <Link className='float-font' to="/register">
                        <span className='linkSpan'>免费注册</span>
                    </Link>
                    <Link className='float-font' to="/promotions">
                        <span className='linkSpan'>优惠活动</span>
                    </Link>
                    <a className='float-code'>
                        <p>扫码下载APP</p>
                        <QRCode includeMargin={true} size={90} value={this.props.remoteSysConfs.channel_push_url || ""} className="codeSide" alt="扫描下载APP"  />
                    </a>
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

export const SideBarRight = connect(mapStateToProps)(SRS)
export const SideBarLeft = connect(mapStateToProps)(SLS)