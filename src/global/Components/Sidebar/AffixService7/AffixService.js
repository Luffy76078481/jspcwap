import React, {Component} from 'react';
import {connect} from 'react-redux';
import {serversOpen,backTop} from "commonFunc"
import QRCode from 'qrcode.react';
import "./AffixService.scss";

class AffixService extends Component{
    constructor(props) {
        super(props);        
    }
    render(){
        const online_service_link = this.props.remoteSysConfs.online_service_link || "";
        return(
            <div className='floatWindow'>
                <a href="javascript:void(0)" className='item'>
                    <span><i className="fa fa-server" aria-hidden="true"></i></span>
                    <div className='hoverContent'>
                        <div className='hoverFont' onClick={()=>{serversOpen(online_service_link)}}>联系<br/>客服</div>                  
                    </div>
                </a>
                {
                   this.props.remoteSysConfs.online_service_qq &&
                   <a href="javascript:void(0)" className='item'>
                        <span><i className="fa fa-qq" aria-hidden="true"></i></span>
                        <div className='hoverContent'>
                            <div className='hoverFont'>QQ<br/>客服</div>    
                            <div className='customer'>
                                <div className='customer-care-arrow'></div>
                                <a className='customer-content' href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                                    <span>{this.props.remoteSysConfs.online_service_qq}</span>
                                </a>
                            </div>                 
                        </div>
                    </a>                    
                }
                                {
                   this.props.remoteSysConfs.agent_service_qq &&
                   <a href="javascript:void(0)" className='item'>
                        <span><i className="fa fa-qq" aria-hidden="true"></i></span>
                        <div className='hoverContent'>
                            <div className='hoverFont'>代理<br/>QQ</div>    
                            <div className='customer'>
                                <div className='customer-care-arrow'></div>
                                <a className='customer-content' href={"tencent://message/?uin="+this.props.remoteSysConfs.online_service_qq+"&Menu=yes"} target="_blank">
                                    <span>{this.props.remoteSysConfs.agent_service_qq}</span>
                                </a>
                            </div>                 
                        </div>
                    </a>                    
                }
                {
                    this.props.remoteSysConfs.online_service_phone &&
                    <a href="javascript:void(0)" className='item'>
                        <span><i className="fa fa-mobile" aria-hidden="true"></i></span>
                        <div className='hoverContent'>
                            <div className='hoverFont'>联系<br/>方式</div>    
                            <div className='customer'>
                                <div className='customer-care-arrow'></div>
                                <a className='customer-content' href={"javascript:void(0)"}>
                                    <span>{this.props.remoteSysConfs.online_service_phone}</span>
                                </a>
                            </div>                 
                        </div>
                    </a>                         
                }
                {
                    this.props.remoteSysConfs.online_service_wechat &&
                    <a href="javascript:void(0)" className='item'>
                        <span><i className="fa fa-weixin" aria-hidden="true"></i></span>
                        <div className='hoverContent'>
                            <div className='hoverFont'>微信<br/>客服</div>    
                            <div className='customer'>
                                <div className='customer-care-arrow'></div>
                                <a className='customer-content' href={"javascript:void(0)"}>
                                    <span>{this.props.remoteSysConfs.online_service_wechat}</span>
                                </a>
                            </div>                 
                        </div>
                    </a>                         
                }
                {
                    this.props.remoteSysConfs.online_service_wechat &&
                    <a href="javascript:void(0)" className='item'>
                        <span><i className="fa fa-weixin" aria-hidden="true"></i></span>
                        <div className='hoverContent'>
                            <div className='hoverFont'>微信<br/>扫码</div>    
                            <div className='customer'>
                                <div className='customer-care-arrow'></div>
                                <a className='customer-content' href={"javascript:void(0)"}>
                                    <span>{this.props.remoteSysConfs.online_service_wechat}</span>
                                </a>
                            </div>                 
                        </div>
                    </a>                       
                }
                {
                    this.props.remoteSysConfs.agent_wecaht &&
                    <a href="javascript:void(0)" className='item'>
                        <span><i className="fa fa-weixin" aria-hidden="true"></i></span>
                        <div className='hoverContent'>
                            <div className='hoverFont'>微信<br/>代理</div>    
                            <div className='customer'>
                                <div className='customer-care-arrow'></div>
                                <a className='customer-content' href={"javascript:void(0)"}>
                                    <span>{this.props.remoteSysConfs.agent_wecaht}</span>
                                </a>
                            </div>                 
                        </div>
                    </a>                         
                }
                {
                    this.props.remoteSysConfs.online_service_email &&
                    <a href="javascript:void(0)" className='item'>
                        <span><i className="fa fa-envelope" aria-hidden="true"></i></span>
                        <div className='hoverContent'>
                            <div className='hoverFont'>邮箱<br/>地址</div>    
                            <div className='customer'>
                                <div className='customer-care-arrow'></div>
                                <a className='customer-content' href={"javascript:void(0)"}>
                                    <span>{this.props.remoteSysConfs.online_service_email}</span>
                                </a>
                            </div>                 
                        </div>
                    </a>                         
                }
                {
                    this.props.remoteSysConfs.online_wechat_link &&
                    <a href="javascript:void(0)" className='item'>
                        <span><i className="fa fa-weixin" aria-hidden="true"></i></span>
                        <div className='hoverQrcode'>
                            <div className='hoverFont'>微信<br/>扫码</div>   
                            <div className='customerQrcode'>
                                <div className='customer-content-qrcode'>
                                    <QRCode includeMargin={false} size={120} value={this.props.remoteSysConfs.online_wechat_link || ""} alt="微信客服二维码"  />                                    
                                </div>
                            </div>
                        </div>
                    </a>
                }
                {
                    this.props.remoteSysConfs.channel_push_url &&
                    <a href="javascript:void(0)" className='item'>
                        <span><i className="fa fa-download" aria-hidden="true"></i></span>
                        <div className='hoverContent'>
                            <a className='hoverFont' href={this.props.remoteSysConfs.channel_push_url}>手机<br/>下载</a>                    
                        </div>
                    </a>                         
                }
                <a href="javascript:void(0)" className='item ReturnTop' onClick={()=>backTop()}>
                    <span><i className="fa fa-arrow-up" aria-hidden="true"></i></span>
                    <div className='hoverContent'>
                        <div className='hoverFont'>回到<br/>顶部</div>                
                    </div>                   
                </a>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(AffixService)