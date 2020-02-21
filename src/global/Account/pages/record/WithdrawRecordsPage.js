/**
 *  取款记录
 */

import React from 'react';
import {connect} from 'react-redux';
import BaseRecordsPage from "./BaseRecordsPage"; // 父组件

// 继承父级组件
class WithdrawRecordsPage extends BaseRecordsPage {
    constructor(){
        super("北京时间","提款记录");
    }
    // 表单内容
    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
            ret.push(<tr key={i}>
                    <td >{log.OrderNo}</td>
                    <td >{log.Amount}</td>
                    <td >{log.StatusText}</td>
                    <td >{log.CreateTime.replace("T"," ")}</td>
                </tr>
            );
        }
        if (ret.length === 0) {
            ret.push(
                <tr key="no_msg">
                    <td colSpan="4">很抱歉，没有您查找的记录.</td>
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
        return <tr>
            <th>取款单号</th>
            <th>取款金额</th>
            <th>取款状态</th>
            <th>时间</th>
        </tr>;
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        game : state.game,
        records : state.records.withdrawRecords
    }
);

export default connect(mapStateToProps, {

})(WithdrawRecordsPage);