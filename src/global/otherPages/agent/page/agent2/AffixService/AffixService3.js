
import React, { Component } from 'react';
import "./AffixService3.scss";

class AffixService3 extends Component{
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
            <div className="affix-online-server-3" style={{display: this.state.show ? "block":"none"}}>
                <div className="hd" onClick={this.serversOpen.bind(this)}>

                </div>
                <div className="bd">
                    <div className="block pay-box">
                        <div className="title"><span>全程担保支付</span></div>
                        <div className="content content1">
                            <img alt="pay"/>
                        </div>
                    </div>
                    <div className="block promotion-btn">
                        <a href="/promotions" target="blank">
                        <div className="title"><span>优惠活动大厅</span></div>
                        </a>
                    </div>
                    <div className="block agent-btn">
                        <a href="/agent.html" target="_blank"><div className="title"><span>代理加盟</span></div></a>
                    </div>
                    <div className="block register-btn">
                        <a href="/register" target="_blank"><div className="title"><span>免费注册</span></div></a>
                    </div>

                    <div className="wapPromotion">
                        <a href="/_promotion/web/index.html" target="_blank"></a>
                    </div>
                    <div className="weiChat">
                        <img className="qr" alt=""/>
                    </div>
                </div>
                <div className="block ft">
                    <span className="left-span"></span>
                    <span className="center" onClick={this.close.bind(this)}>关&nbsp;闭</span>
                    <span className="right-span">2</span>
                </div>

            </div>
        );
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

}
export default (AffixService3)