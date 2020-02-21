/**
 * Created by sobi on 2017/11/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {config} from "globalConfig";
import {Link} from 'react-router';

import "./AffixService_Download.scss";

class AffixService_Download extends Component{
    constructor(){
        super();
        this.state = {
            show: true
        }
    }

    close(){
        this.setState({show: false});
    }
    componentDidMount(){

    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    
    render(){
        return (
            <div className="download_fix">
                {
                window.config.spec == 'dafa-bt6'?
                <div className="fix_text">
                    <a href="http://cdn.silvereagle88.com/generic/setupglx.exe"><div className="download_li download_poker"><a className="download_poker_a">PT老虎机</a></div></a>
                    <a href={window.configHelper.getPromotionUrl()} ><div className="download_li download_send"><a className="download_send_a" target="_blank">手机APP</a></div></a>
                    <a href="https://sbet.bet/down/down.exe" ><div className="download_li download_game"><a className="download_game_a">资讯端</a></div></a>
                    <a href="http://dafazixun.com" target='_blank'><div className="download_li download_khd"><a className="download_khd_a">线路检测</a></div></a>
                 </div>
                :
                <div className="fix_text">
                    <a href="http://cdn.silvereagle88.com/generic/setupglx.exe"><div className="download_li download_poker"><a className="download_poker_a">PT老虎机</a></div></a>
                    <a href={this.props.remoteSysConfs.channel_push_url+"?openLink="+location.href} ><div className="download_li download_send"><a className="download_send_a" target="_blank">{config.appName}app</a></div></a>
                    <a href="https://dafa-app.app" ><div className="download_li download_game"><a className="download_game_a">资讯端</a></div></a>
                    <a href="https://dafa-app.app" target='_blank'><div className="download_li download_khd"><a className="download_khd_a">游戏客户端</a></div></a>
                 </div>
                }
                <div className="fix_title download_fix_title">下<br/>载</div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(AffixService_Download)