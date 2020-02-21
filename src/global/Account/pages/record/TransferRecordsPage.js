/**
 *              转账记录——————————
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import BaseRecordsPage from "./BaseRecordsPage"; // 父级组件

class TransferRecordsPage extends BaseRecordsPage {
    constructor(){
        super("北京时间","转账记录");
    }
    
    // 游戏平台
    renderPlatforms() {
        var ret = [];
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
    // 表单头部
    renderHeader(){
        return(
            <tr>
                <th>游戏类别</th>
                <th>操作方式</th>
                <th>操作金额</th>
                <th>状态</th>
                <th>时间</th>
            </tr>           
        )
    }
    // 查询表单内容
    renderRecords(){
        var ret = [];
        for (var i= 0; i< this.props.records.rows.length ; i++){
            var log = this.props.records.rows[i];
            ret.push(<tr key={i}>
                    <td>{log.GameType}</td>
                    <td>{log.TypeText}</td>
                    <td>{log.Amount}</td>
                    <td>{log.StatusText}</td>
                    <td>{log.CreateTime.replace("T"," ")}</td>
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
}

const mapStateToProps = (state, ownProps) => (
    {
        game : state.game,
        records : state.records.transferRecords
    }
);

export default connect(mapStateToProps, {

})(TransferRecordsPage);