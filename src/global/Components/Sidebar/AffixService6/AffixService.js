
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import "./AffixService.scss";

class AffixService2 extends Component{
    constructor(){
        super();
        this.state = {
            show: true
        }
    }
    close(){
        this.setState({show: false});
    }
    render(){
        return (
            <div className="affix-online-server-l" style={{display: this.state.show ? "block":"none"}}>
                <a href="/hongbao.html" target="_blank"><div className="hd"></div></a>          
                <div className="bd">
                    <Link to="/promotions" ><div className="togame"></div></Link>
                    <Link to="/register" ><div className="togame2"></div></Link>
                    <Link to="/deposit" ><div className="toAG"></div></Link>
                </div>
                <div className="newclose" onClick={this.close.bind(this)}></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps)(AffixService2)