// 大转盘入口，和红包一样

import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';
import "./Turntable.scss";

export default class Turntable extends Component {
    constructor() {
        super();        
        this.state={
            isShow:true
        }
    }  
    render(){
        if(this.state.isShow){
            return (
                <div className="affix-Turntable">
                    <Link to="/LootoPage"></Link>
                    <span onClick={ ()=>{ this.setState({isShow:false}) }}></span>
                </div>
            )
        }
        return null
    }
}