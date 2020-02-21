/**
 *  个人中心1 => 查询记录-导航页
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';

class RecordsPage extends Component {
    // Get ActiveClassName
    activeCls() {
        for (var i = 0; i < arguments.length; i++) {
            var name = arguments[i];
            if (this.props.location.pathname === name) {
                return "active";
            }
        }
        return "";
    }
    render() {
        return (
            <div className="recordsHistorys">           
                <ul className="nav clearfix">
                    <li className={this.activeCls("/records")}><Link to="/records">投注记录</Link></li>
                    <li className={this.activeCls("/records_deposit")}><Link to="/records_deposit">充值记录</Link></li>
                    <li className={this.activeCls("/records_withdraw")}><Link to="/records_withdraw">提款记录</Link></li>
                    <li className={this.activeCls("/records_transfer")}><Link to="/records_transfer">转账记录</Link></li>
                    <li className={this.activeCls("/records_promotion")}><Link to="/records_promotion">优惠记录</Link></li>
                    <li className={this.activeCls("/records_message")}><Link to="/records_message">站内信</Link></li>
                </ul>
                <div className="tabContent">
                    {this.props.children}
                </div>    
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps, {

})(RecordsPage);