
import React, {Component} from 'react';
import {config} from "globalConfig";
import * as help from "../../../help/helpJson.js";

class AboutUs extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const appName = config.appName;
        return (
            <div id="AboutUs" className="mainCon show">
                <div className="title"></div>
                <div className="center">
                    <div className="cont">
                        <div className="tit">{appName}娱乐场</div>
                        <div className="txt">
                            <span>
                                {
                                    help.renderProfile()
                                }
                            </span>
                        </div>
                        <div className="tit">经营理念</div>
                        {
                            help.render_tittxt()
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default (AboutUs);