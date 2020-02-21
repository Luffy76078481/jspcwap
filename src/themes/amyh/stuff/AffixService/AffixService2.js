
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, Button } from 'antd';
import {ApiAllSysConfigAction} from 'globalAction'
import "./AffixService.scss";
import col from './images/cms_1118.png'
import cont from './images/cms_1120.png';
class AffixService extends Component{
    componentWillMount(){
        new ApiAllSysConfigAction().fly();
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    show(){}
    render(){
        return (
            <div className="affix-right">
                <div className="cols" onClick={this.show.bind(this)}>
                    <img src={col}/>

                </div>
                <div onClick={this.serversOpen.bind(this)} className="cont">
                    <img src={cont} />
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
