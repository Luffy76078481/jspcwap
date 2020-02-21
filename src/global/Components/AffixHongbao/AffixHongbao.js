

import React, {Component} from 'react';
import "./AffixHongbao.scss";
export default class AffixHongbao extends Component {
    render(){
        var options = window.r.props("AffixHongbao");
        return (<div className="affix-hongbao"><a target="_blank" href='/hongBao.html'><span>抢红包</span></a></div>);
    }
}