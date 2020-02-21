
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {ApiAllSysConfigAction} from "globalAction";
import {Link} from 'react-router';
import QRCode from 'qrcode.react';
import {serversOpen} from "commonFunc"
import "./AffixService3.scss";

class AffixService extends Component{
    componentWillMount(){
        new ApiAllSysConfigAction().fly();
    }
    constructor(){
        super();
        this.state = {
            show_r: true,
            show_l: true,
        }
    }
}
class AffixService_Right extends AffixService{
    close(){
        this.setState({show_r:false});
    }
    render(){
        return (
            <div className="affix-online-server-right" style={{display: this.state.show_r ? "block":"none"}}>
                <div className="bd">
                    <div className="block online-service" onClick={()=>{serversOpen(this.props.remoteSysConfs.online_service_link)}} >
                        <div className="title">
                            <i className="fa fa-headphones"></i>
                            <span className="num">&nbsp;7x24小时</span>
                        </div>
                        <div className="content"><span>在线客服</span></div>
                    </div>
                    {
                        this.props.remoteSysConfs.online_service_qq &&
                        <div className="block online-qq">
                            <a href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                                <div className="title QQ1"><i className="fa fa-qq"></i>&nbsp;<span>客服QQ</span></div>
                            </a>
                            <div className="content"><span>{this.props.remoteSysConfs.online_service_qq}</span></div>
                        </div>
                    }
                    {
                        this.props.remoteSysConfs.online_service_phone &&
                        <div className="block online-phone">
                            <div className="title"><i className="fa fa-phone"></i>&nbsp;<span>客服电话</span></div>
                            <div className="content"><span style={{fontSize:'14px'}}>&nbsp;{this.props.remoteSysConfs.online_service_phone}</span>
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
        )
    }
}
class AffixService_Left extends AffixService{
    close(){
        this.setState({show_l:false});
    }
    render(){
        return(
            <div className="affix-online-server-left" style={{display: this.state.show_l ? "block":"none"}}>
                <div className="bd">
                    <div className="block pay-box" style={{height:'120px'}}>
                        <Link to="/deposit" style={{textDecoration:'none'}}>
                            <div ><span className="titlr_font" >全程担保支付</span></div>
                            <div className="content content1">
                                <img alt="pay"/>
                            </div>
                        </Link>
                    </div>
                    <div className="block promotion-btn" style={{height:'83px'}}>
                        <a href="/promotions"style={{textDecoration:'none'}}>
                        <div className="title"><span >优惠活动大厅</span></div>
                        </a>
                    </div>
                    <div className="block agent-btn" >
                        <a href="/agent.html" target="_blank" style={{textDecoration:'none'}}><div className="title_agent"><span>代理加盟</span></div></a>
                    </div>
                    <div className="block register-btn" style={{height:'83px',background:'#2c1810',borderBottom:'1px solid #4f3317'}}>
                        <a href="/register" target="_blank"><div className="title"><span>免费注册</span></div></a>
                    </div>
                </div>
                <div className="block ft">
                    <span className="left-span"></span>
                    <span className="center" onClick={this.close.bind(this)}>关&nbsp;闭</span>
                    <span className="right-span">2</span>
                </div>
            </div>                 
        )
   
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);
export const SideBarRight = connect(mapStateToProps)(AffixService_Right)
export const SideBarLeft = connect(mapStateToProps)(AffixService_Left)