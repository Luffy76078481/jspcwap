/**
 *  所有记录内容-   分页处理 - 子组件表单继承本组件
 */

import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { Collapse ,Panel } from 'antd';
import {TimeZone} from "pui";
import MyDatePicker from '../../../Components/Calendar/CalendarTem'

class BaseRecordsPage extends Component {
    constructor(defaultZone,queryType){
        super()
        this.state = {
            pathName:browserHistory.getCurrentLocation().pathname, // this.props.location.pathname 4.0
            //startTime:window.Util.formatTime( new Date(new Date(new Date().toLocaleDateString()).getTime()) ), // 默认开始时间 今天的00点
            startTime:window.Util.getNowDate(-7), // 默认开始时间，调整到往7天
            endTime:window.Util.getNowDate(),// 默认结束时间
            TimeZone:defaultZone,
            queryType        
        }
    }
    // 查询
    toPage(pageNo = 0,NeedAlert) {   
        new window.actions.ApiQueryHistoryAction(
            {
                FromDateTime:this.refs.startT.getValue(),
                ToDateTime:this.refs.endT.getValue(),
                GamePlatform:this.refs.platformId?this.refs.platformId.value:"",
                PageIndex:pageNo,
                TimeZone:this.state.TimeZone=="美东时间"?-4:8
            },
            this.state.queryType,
            NeedAlert
        ).fly(resp=>{

        });
    }

    componentDidMount() {
        this.toPage();
    }
    // 查询
    onQuery(event) {
        event.preventDefault();
        this.toPage(0,true);
    }
    // 下一页
    nextP() {
        if (this.props.records.pageNo+1 == this.props.records.totalPage) {
            return null;
        }
        this.toPage(this.props.records.pageNo + 1);
    }
    // 上一页
    preP() {
        if (this.props.records.pageNo <= 0) {
            return null;
        }
        this.toPage(this.props.records.pageNo - 1);
    }

    // 分页计算
    renderPage() {
        var ret = [];
        var invalidTag = false;
        for (var i = 1; i <= this.props.records.totalPage; i++) {
            if (i !== 1 && i !== this.props.records.totalPage && Math.abs(this.props.records.pageNo - i) >= 3) {
                invalidTag = true;
                continue;
            }
            if (invalidTag) {
                ret.push(
                    <li key={"_" + i}><a href="javascript:void(0)">...</a></li>
                )
                invalidTag = false;
            }
            ret.push(
                <li key={i}><a onClick={this.toPage.bind(this, i-1)}
                       className={i-1 === this.props.records.pageNo ? "active" : ""} href="javascript:void(0)">{i}</a>
                </li>
            )
        }
        return ret;
    }
    render() {
        return (
            <div>
                <form onSubmit={e=>{e.preventDefault()}}>
                    <label>时区：</label>
                    <TimeZone 
                    defaultVal={this.state.TimeZone}
                    getVal={
                        val=>{
                            this.setState({
                                TimeZone:val
                            })
                        }
                    }/>
                    {
                        this.renderQuery() // 子组件继承 —— 选择时间
                    }  
                    <label>起止时间：</label>
                    <div className="i-block">
                        <MyDatePicker placeholder="查询开始时间" ref="startT" startTime={this.state.startTime}></MyDatePicker>
                    </div>
                    <div className="i-block">-</div>
                    <div className="i-block">
                        <MyDatePicker placeholder="查询结束时间" ref="endT" times={[23,59,59]} endTime={this.state.endTime}></MyDatePicker>
                    </div>
                    <button type="submit" className="btn ml10 bgColor" style={{"color":"white"}} onClick={this.onQuery.bind(this)}>查询</button>   
                </form>
                {
                    this.state.pathName=='/records_message'?
                    <div className='pt20 pb20'><div className='labels'>时间筛选：</div>    
                        <Collapse defaultActiveKey={['1','2','3','4','5','6','7','8','9','10']}>
                            {
                                this.renderRecords()
                            }
                        </Collapse>                        
                    </div>

                    :
                    <div className="table-responsive">
                        <table className="table mt20">
                            <thead>
                                {
                                    this.renderHeader() // 表单头部
                                }
                            </thead>
                            <tbody>
                                {
                                    this.renderRecords() // 表单内容
                                }
                            </tbody>
                        </table>
                    </div>                    
                }

                <div className="paging f14">
                    <div className="fl">
                        从
                        <span>{this.props.records.startRowIndex}</span>
                        到
                        <span>{this.props.records.endRowIndex}</span>
                        条记录, 总计
                        <span>{this.props.records.total}</span>
                        条记录.
                    </div>
                    <ul className="pagination clearfix">
                        <li onClick={this.preP.bind(this)}>上一页</li>
                        {
                            this.renderPage() // 计算分页
                        }
                        <li onClick={this.nextP.bind(this)}>下一页</li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default BaseRecordsPage;