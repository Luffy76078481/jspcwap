
import React,{Component} from 'react';
import {render} from 'react-dom';
import {config} from "globalConfig";
import AgentPage1 from "./agent1"; // 通用
import AgentPage2 from "./agent2"; // 新濠天地
//import AgentPageTYC from "./agent_tyc" // 太阳城
import "./global/otherPages/agent/css/agent.scss" // 公共CSS
import 'isomorphic-fetch';

/*
    解决IE下Promise报错 
    【
        1.install babel-runtime和babel-plugin-transform-runtime 
        2.添加在主页之前添加window.Promise = Promise
    】
*/
window.Promise = Promise; 

// ★★★★★
//__start import "./themes/#{spec}/otherPages/agent/skin.scss";
import "./themes/bet365-bee/otherPages/agent/skin.scss";
//__end

let agentPage = AgentPage1;
if ( config.spec.indexOf('xhtd')>-1 ) {
    agentPage = AgentPage2;
}else if( config.spec.indexOf('tyc')>-1 ){
    //agentPage = AgentPageTYC;
}
render(
    React.createElement(agentPage),
    document.getElementById('agent')
);