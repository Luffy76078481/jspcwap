
import React, { Component } from 'react';
import { render } from 'react-dom'
import {config} from "globalConfig";
import * as cache from "./store/CacheHelper";
import "./global/otherPages/maintain/maintain.css";
import 'isomorphic-fetch';

window.Promise = Promise;//解决IE下Promise报错 【1.install babel-runtime和babel-plugin-transform-runtime 2.添加在主页之前添加window.Promise = Promise】

class ApiSysConfAction {
    fly(callback){
        let user = cache.get("user") || {};
        let authorization="";
        if (user && user.token) {
            authorization = user.username+' '+user.token;
        }
        fetch(config.apiPath+"Config/GetItems"+config.webSiteTag, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":authorization
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            callback(data);
        });
    }

}

class MaintainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            OnlineServiceUrl: "",
            text:''
        }
    }
    componentDidMount() {

        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({
                    OnlineServiceUrl: resp.OnlineServiceUrl,
                    text:resp.TainPageHtml,
                });
            }
        });
    }

    serversOpen(e){
        e.preventDefault();
        window.open(this.state["OnlineServiceUrl"],'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    render() {
        return (
            <div id="root" className="maintainPage">
                <div className='img'></div>
                <div className="item">
                    {
                        this.state.text ?(<p className='text'>{this.state.text}</p>):null
                    }
                    {
                        this.state.OnlineServiceUrl ?(<a href="#" className='OnlineService' onClick={this.serversOpen.bind(this)}>在线客服</a>):null
                    }
                </div>
            </div>
        )
    }
}

render(<MaintainPage/>, document.getElementById('root'));
