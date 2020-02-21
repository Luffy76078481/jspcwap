/**
 * Created by sobi on 2017/10/17.
 */
import React, {Component} from 'react';
import {config} from "globalConfig";



class Payout extends Component {



    render() {
        const appName = config.appName;
        return (
            <div id="payout" className="contents">
                <div className="helpContent">
                    <div className="payoutimg"></div>
                </div>
            </div>


        )
    }
}



export default (Payout);


