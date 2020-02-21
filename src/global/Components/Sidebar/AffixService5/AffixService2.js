
import React, { Component } from 'react';
import {connect} from 'react-redux';
import "./AffixService2.scss";
import {serversOpen} from "commonFunc"

class AffixService2 extends Component{
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
        const online_service_link = this.props.remoteSysConfs.online_service_link || "";
        return (

            window.config.spec.includes("tyc") ? (
                <div className="onlineServer-left-body" style={{ display: this.state.show ? "block" : "none" }}>
                    <div className="hd serversOpenimg" onClick={() => { serversOpen(online_service_link) }}></div>
                    <div className="bd">
                        <div className="block promotion-btn">
                            <a href="/promotions" target="_blank"></a>
                        </div>
                        <div className="block register-btn">
                            <a href="/register" target="_blank"></a>
                        </div>
                        <div className="weiChat">
                            <img className="qr" alt="" />
                        </div>
                    </div>
                    <div className="block ft">
                        <span className="left-span"></span>
                        <span className="center" onClick={this.close.bind(this)}>关&nbsp;闭</span>
                        <span className="right-span">2</span>
                    </div>
                </div>
            ) :
            (<div className="onlineServer-left" style={{display: this.state.show ? "block":"none"}}>
                <div className="hd serversOpenimg" onClick={()=>{serversOpen(online_service_link)}}>
                </div>
                <div className="bd">
                    <div className="block promotion-btn">
                        <a href="/promotions" target="_blank"></a>
                    </div>
                    <div className="block register-btn">
                        <a href="/register" target="_blank"></a>
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
            </div>)
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(AffixService2)