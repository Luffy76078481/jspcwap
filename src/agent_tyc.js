
import React,{Component} from 'react';
import AgentTyc from './global/otherPages/agent/page/agent_tyc/AgentTyc';
// TYC 代理页
export default class AgentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {tab:"IndexContent"}
    }
    render() {
        return (
            <AgentTyc/>        
        );
    }
}


