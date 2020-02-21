/**
 * 消息记录,站内信
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Collapse  } from 'antd';
import BaseRecordsPage from "./BaseRecordsPage"; // 继承

class MessagePage extends BaseRecordsPage {  
    constructor(){
        super("北京时间","站内信");
    }
    // 查询记录表单内容 tbody
    renderRecords(){
        var ret = [];
        const Panel = Collapse.Panel;
        var msg = this.props.sitemsgs.rows;
        for (let i = 0; i < this.props.sitemsgs.rows.length; i++) {
            var msg = this.props.sitemsgs.rows[i];
            ret.push(
                <Panel header={msg.Title} key={i+1}>
                    <p className='i-block w-8' dangerouslySetInnerHTML={{__html:msg.Message}}></p>
                    <p className='i-block'>{msg.SendTime.replace('T',' ')}</p>
                </Panel>
            );
        }    
        return ret;
    }
    
    // 时间区域选择
    renderQuery() {
        return null
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        sitemsgs:state.sitemsg.sitemsgs,
        records : state.records.myMsgsRecords
    }
);


export default connect(mapStateToProps, {})(MessagePage);