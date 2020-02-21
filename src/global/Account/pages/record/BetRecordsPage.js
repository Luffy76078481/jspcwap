/**
 * 投注记录
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import BaseRecordsPage from "./BaseRecordsPage";

class BetRecordsPage extends BaseRecordsPage {
    constructor(){
        super("美东时间","投注记录");
    }
    // 平台
    renderPlatforms() {
        var ret = [];  
        console.log(333333333,this.props.game.platforms)
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            if(platform.Name == "YOPLAY")
            continue;
            ret.push(
                <option key={i} value={platform.ID}>{platform.Name}</option>
            );
        }
        return ret;
    }
    // 表单内容
    renderRecords() {
        var ret = [];
        for (var i = 0; i < this.props.records.rows.length; i++) {
            var log = this.props.records.rows[i];
            ret.push(<tr key={i}>
                    <td >{log.OrderNumber}</td>
                    <td >{log.GamePlatform}</td>
                    <td >{log.Bet}</td>
                    <td >{log.RealBet}</td>
                    <td >{log.PayOut}</td>
                    {log.CreateTimeDateText == "0001-01-01"?<td></td>:<td >{log.CreateTimeDateText +" "+ log.CreateTimeTimeText}</td>}
                </tr>
            );
        }
        if (ret.length === 0) {
            ret.push(
                <tr key="no_msg">
                    <td colSpan="6">很抱歉，没有您查找的记录.</td>
                </tr>
            );
        }
        return ret;
    }
  
    // 查询
    renderQuery() {
        return(
            <div className='i-block'>
                <label>平台：</label>
                <select ref="platformId" className='normalInput recordSelect'>
                    <option value="">选择游戏类别</option>
                    {
                        this.renderPlatforms()
                    }
                </select>  
            </div>          
        ) 
    }
    // 表单头
    renderHeader() {
        return <tr>
            <th>单号</th>
            <th>游戏类别</th>
            <th>投注额</th>
            <th>有效投注</th>
            <th>派彩</th>
            <th>时间</th>
        </tr>;
    }

}

const mapStateToProps = (state, ownProps) => (
    {
        game: state.game,
        records: state.records.betRecords
    }
);

export default connect(mapStateToProps, {})(BetRecordsPage);