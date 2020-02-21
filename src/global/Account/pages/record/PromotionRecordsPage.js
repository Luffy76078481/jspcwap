/**
 * 优惠记录
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import BaseRecordsPage from "./BaseRecordsPage";

class BetRecordsPage extends BaseRecordsPage {
    constructor(){
        super("北京时间","优惠记录");
    }
    // 表单内容
    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
            ret.push(
                <tr key={i}>
                    <td >{log.BonusName}</td>
                    <td >{log.Amount}¥</td>
                    <td >{(log.OperatTime.replace('T',' '))}</td>
                </tr>
            );
        }
        if (ret.length === 0) {
            ret.push(
                <tr key="no_msg">
                    <td colSpan="3">很抱歉，没有您查找的记录.</td>
                </tr>
            );
        }
        return ret;
    }
    // 查询
    renderQuery() {
        return null 
    }
   
    // 表单头部
    renderHeader() {
        return(
            <tr>
                <th>优惠内容</th>
                <th>优惠金额</th>
                <th>时间</th>
            </tr>           
        ) 
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        game : state.game,
        records : state.records.myPromoRecords
    }
);

export default connect(mapStateToProps, {

})(BetRecordsPage);