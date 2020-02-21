/**
 * 存款记录
 */

import React from 'react';
import {connect} from 'react-redux';
import BaseRecordsPage from "./BaseRecordsPage";

class DepositRecordsPage extends BaseRecordsPage {
    constructor(){
        super("北京时间","充值记录");
    }
    // 表单内容
    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
            ret.push(<tr key={i}>
                    <td >{log.OrderNo}</td>
                    <td >{log.TypeText}</td>
                    <td >{log.Amount}</td>
                    <td >{log.StatusText}</td>
                    <td >{log.CreateTime.replace("T"," ")}</td>
                </tr>
            );
        }
        if (ret.length === 0) {
            ret.push(
                <tr key="no_msg">
                    <td colSpan="5">很抱歉，没有您查找的记录.</td>
                </tr>
            );
        }
        return ret;
    }
   
    // 查询
    renderQuery() {
        return null
    }
    // 表单头
    renderHeader() {
        return <tr>

            <th>存款单号</th>
            <th>存款方式</th>
            <th>存款金额</th>
            <th>存款状态</th>
            <th>时间</th>
        </tr>;
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        game : state.game,
        records : state.records.depositRecords
    }
);

export default connect(mapStateToProps, {

})(DepositRecordsPage);