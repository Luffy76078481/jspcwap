/**
 *  BBT 404
 */
import React, {Component} from 'react';
import {config} from "globalConfig";
import "./NoServicePageBBT.scss"

class NoServicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
        }
    }
    componentWillMount(){
        this.state.online_service_link = " IP : " + sessionStorage.getItem("serIP")
    }
    render() {
        return (
            <div className='do_U_Know_This_Is_bbTNoServicePage'>
                <img src={require("./images/365.png")}/>
                <h2>禁止访问</h2>
                <p>你没有权限访问这个页面！</p>
                <span>{this.state.online_service_link}</span>
                <notice>访问的地区不在服务范围内</notice>
            </div>
        )
    }
}



export default (NoServicePage);
