
//import { EEXIST } from 'constants';
import React, { Component } from 'react';
import { render } from 'react-dom'
import{config} from "globalConfig"
import NoservicePageBBT from "./global/otherPages/servicePage/NoservicePageBBT"
import NoservicePageDefault from "./global/otherPages/servicePage/NoServicePage"
 
class NoServicePage extends Component {
    constructor(){
        super();
    }
    componentDidMount(){
        if(config.gameTag == "dafa"){
            location.href="/NoservicePage-other.html";
        }
    }
    render(){
        return (
            <div>
                {
                    config.gameTag=="BBT"?
                    <NoservicePageBBT/>:
                    <NoservicePageDefault/>
                }
            </div>
        )
    }
}

render(<NoServicePage/>, document.getElementById('root'));
