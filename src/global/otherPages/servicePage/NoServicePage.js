/**
 * 
 */
import React, {Component} from 'react';
import {config} from "globalConfig";
import "./NoServicePage.scss"

class ApiSysConfAction {
    fly(callback){
        fetch(config.apiPath+"client/all_sys_cfg?Tag="+config.webSiteTag, {
            method: "get",
        }).then(function(response){
            return response.json();
        }).then(function(data){
            callback(data);
        });
    }

}
class NoServicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
        }
    }
    componentWillMount(){
        // document.getElementById("iperror").innerHTML = " Your IP details : " + sessionStorage.getItem("serIP")
        this.state.online_service_link = " Your IP details : " + sessionStorage.getItem("serIP");
    }
    render() {
        return (
            <div>
                <p className="title1">403 Forbidden</p>
                <p className="title2">You don't have permission to access / on this server！</p>
                <a id="iperror">{this.state.online_service_link}</a>
            </div>
        )
    }
}



export default (NoServicePage);
