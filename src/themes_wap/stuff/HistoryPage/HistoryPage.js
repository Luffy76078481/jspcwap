
/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                业务逻辑难度为：★★★
          
*/

import React, { Component } from 'react';
import {NavBar, Icon, SegmentedControl,DatePickerView, Modal, Flex, Toast,ListView} from 'antd-mobile';
import connect from "react-redux/es/connect/connect";
import './HistoryPage.scss';
import {FastTimeSelect} from 'pui';
let pageIndex = 0;
let listData=[];
class HistoryPage extends Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state={
            dataSource: dataSource.cloneWithRows({}),
            hasMore:true,
            isLoading: false,
            tabLoading:false,
            refreshing: false,
            tabsType:0,
            timeZone:8,
            queryType:'充值记录',
            QSelectTabsType:0,
            timeZoneIndex:[0],//[1] 美东时间，[0] 北京时间
            showTimeChoose:false,
            beginValue:new Date(new Date().getTime() - 0*24*60*60*1000),
            endValue:new Date(),
            fromDate:window.Util.getNowDate(0).slice(0,10),
            toDate:window.Util.getNowDate().slice(0,10),
            maxDate:new Date(new Date().getTime()),
        }
    }
    componentWillMount(){
        pageIndex=0;
        listData=[];
        Toast.loading('数据加载中,请稍候...');
       this.getData();
    }
    openSildeBar(){
        this.props.params.openSilde()
    }
    onEndReached = () => {
        if(!this.state.hasMore || this.state.isLoading)  return false;
        this.getData();
    };
    getData(){
        this.setState({isLoading:true});
        new window.actions.ApiQueryHistoryAction(
            {
                FromDateTime:this.state.fromDate,
                ToDateTime:this.state.toDate,
                GamePlatform:"",
                PageIndex:pageIndex,
                TimeZone:this.state.timeZone
            },
            this.state.queryType,
        ).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode ==0){
                this.succesCallback(resp)
            }else{
                if(this.state.queryType === '优惠记录'){
                    this.setState({isLoading:false},()=>{
                                        this.onEndReached();
                    });
                }else{
                    this.setState({isLoading:false});
                }

            }
        });
    }
    succesCallback (resp){
        pageIndex++;
        listData=listData.concat(resp.List);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(listData),
            hasMore: resp.Count>pageIndex*10,
            isLoading: false,
            tabLoading:false,
        })
    }
    renderList(){
        const _this = this;
        let tabsType = _this.state.tabsType;
        if(this.state.tabLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }

        const row = (item) => {
            if(tabsType==0){
                let className= "badg";
                //0：未支付，1：处理中，2：审核中，3：拒绝，4：成功，5：取消
                if(item.Status==1 ||item.Status==3 || item.Status==5 ){
                    className="badg red"
                }else if(item.Status == 4){
                    className="badg blue"
                }
                return (
                    <Flex className="listItem">
                        <div className="itemL">
                            {item.CreateTime.split('T')[0]}<br/>
                            {item.CreateTime.split('T')[1].slice(0,8)}
                        </div>
                        <div className="itemC">
                            <span>{item.TypeText}{item.Amount}</span>
                            <span className="bot">{item.OrderNo}</span>
                        </div>
                        <div className="itemR">
                            <span className={className}>{item.StatusText}</span>
                        </div>
                    </Flex>
                )
            }
            else if(tabsType==1){
                let className= "badg";
                //0：失败，1：成功
                if(item.Status==1){
                    className="badg blue"
                }
                return (
                    <Flex className="listItem" >
                        <div className="itemL">
                            {item.CreateTime.split('T')[0]}<br/>
                            {item.CreateTime.split('T')[1].slice(0,8)}
                        </div>
                        <div className="itemC">
                            <span>平台{item.GameType} {item.TypeText} ￥{item.Amount}</span>
                        </div>
                        <div className="itemR">
                            <span className={className}>{item.StatusText}</span>
                        </div>
                    </Flex>
                )
            }
            else if(tabsType==2){
                let className= "badg";
                //0：未支付，1：处理中，2：审核中，3：拒绝，4：成功，5：取消
                if(item.Status==1 ||item.Status==3 || item.Status==5 ){
                    className="badg red"
                }else if(item.Status == 4){
                    className="badg blue"
                }
                return (
                    <Flex className="listItem" >
                        <div className="itemL">
                            {item.CreateTime.split('T')[0]}<br/>
                            {item.CreateTime.split('T')[1].slice(0,8)}
                        </div>
                        <div className="itemC">
                            <span>提款金额:￥{item.Amount}</span>
                            <span className="bot">{item.OrderNo}</span>
                        </div>
                        <div className="itemR">
                            <span className={className}>{item.StatusText}</span>
                        </div>
                    </Flex>
                )
            }
            else if(tabsType==3){
                if(item.GamePlatform =="总计" ){
                    return (
                        <Flex className="listItem" style={{background:'#ddd',position:'fixed',bottom:'1.1rem',width:'100%'}} >
                            <div className="itemL">
                                {item.GamePlatform}投注:{item.Num}次<br/>
                            </div>
                            <div className="itemC" style={{width:'75%'}}>
                                <span>总投注￥{item.Bet}元,总有效投注￥{item.RealBet}元</span>
                            </div>
                        </Flex>
                    )
                }
                let className= "badg";
                let name=""
                //1输 2赢 3和 4无效,其他的默认为空
                if(item.ResultType == 1){
                    className="badg red"
                    name="输"
                }else if(item.ResultType == 2){
                    className="badg blue"
                    name="赢"
                }else if(item.ResultType == 3){
                    className="badg green"
                    name="和"
                }else if(item.ResultType == 4){
                    className="badg gray"
                    name="无效"
                }else {
                    className=""
                    name=""
                }

                return (
                    <Flex className="listItem" >
                        <div className="itemL">
                            {item.CreateTimeDateText}<br/>
                            {item.CreateTimeTimeText}
                        </div>
                        <div className="itemC">
                            <span>{item.GamePlatform} 投注￥{item.Bet},有效￥{item.RealBet}</span>
                            <span>{item.OrderNumber}</span>
                        </div>
                        <div className="itemR">
                            <span className={className}>{name}</span>
                        </div>
                    </Flex>
                )
            }
            else if(tabsType==4){
                return(
                    <Flex className="listItem" >
                        <div className="itemL">
                            {item.OperatTime.split('T')[0]}<br/>
                            {item.OperatTime.split('T')[1].slice(0,8)}
                        </div>
                        <div className="itemC">
                            <span>活动-{item.BonusName}</span>
                        </div>
                        <div className="itemR">
                            <span>优惠金额:{item.Amount}￥</span>
                        </div>
                    </Flex>
                )
            }           
        }

        const renderFooter = ()=>{
            let con;
            if(_this.state.hasMore){
                con=(<div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>)
            }else {
                con=(<div style={{textAlign:'center',lineHeight:'2rem'}}>我没有更多数据了! (ㄒoㄒ)~</div>)
            }
            return con;
        };

        return(
            <ListView
                dataSource={_this.state.dataSource}
                className="myListView"
                renderFooter={renderFooter}
                renderRow={row}
                initialListSize={16}
                pageSize={30}//每次事件循环（每帧）渲染的行数
                scrollRenderAheadDistance={200}//当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached.bind(this)}//当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                onEndReachedThreshold={120}//调用onEndReached之前的临界值，单位是像素
            />
        )
    }
    // 记录选项卡
    tabChange(val){
        listData=[];
        pageIndex=0;
        Toast.loading('数据加载中,请稍候...');

        if(val.key === '3'){
            this.state.timeZone = -4;
            this.setState({
                timeZoneIndex:[1],

            })
        }else {
            this.state.timeZone = 8;
            this.setState({
                timeZoneIndex:[0],
            })
        }
        this.setState({
            tabLoading:true,
            queryType:val.props.children,
            tabsType:val.key-0,
            beginValue:new Date(new Date().getTime() - 0*24*60*60*1000),
            endValue:new Date(),
            fromDate:window.Util.getNowDate(0).slice(0,10),
            toDate:window.Util.getNowDate().slice(0,10),
            QSelectTabsType:0
        },()=>{
            this.getData();
        })
        setTimeout(()=>{

        })
    }
    //快选时间
    QSelectTabChange(val){
        listData=[];
        pageIndex=0;

        if(val.key ==='0'){
            this.setState({
                beginValue:new Date(new Date().getTime() - 0*24*60*60*1000),
                endValue:new Date(),
                fromDate:window.Util.getNowDate(0).slice(0,10),
                toDate:window.Util.getNowDate().slice(0,10)
            })
        }else if(val.key ==='1') {
            this.setState({
                beginValue:new Date(new Date().getTime() - 1*24*60*60*1000),
                endValue:new Date(new Date().getTime() - 1*24*60*60*1000),
                fromDate:window.Util.getNowDate(-1).slice(0,10),
                toDate:window.Util.getNowDate(-1).slice(0,10)
            })
        }else if(val.key ==='2'){
            this.setState({
                beginValue:new Date(new Date().getTime() - 6*24*60*60*1000),
                endValue:new Date(),
                fromDate:window.Util.getNowDate(-6).slice(0,10),
                toDate:window.Util.getNowDate().slice(0,10)
            })
        }else if(val.key ==='3'){
            this.setState({
                beginValue:new Date(new Date().getTime() - 13*24*60*60*1000),
                endValue:new Date(new Date().getTime() - 7*24*60*60*1000),
                fromDate:window.Util.getNowDate(-13).slice(0,10),
                toDate:window.Util.getNowDate(-7).slice(0,10)
            })
        }

        Toast.loading('数据加载中,请稍候...');
        this.setState({
            tabLoading:true,
            QSelectTabsType:val.key-0
        },()=>{
            this.getData();
        })
    }
    showTimeChoose(){
        this.setState({
            showTimeChoose:true
        })
    }
    hideTimeChoose(){
        this.setState({
            showTimeChoose:false
        })
    }
    onBeginChange(value){
        this.setState({
            beginValue:value
        })
    }
    onEndChange(value){
        this.setState({
            endValue:value
        })
    }
    chooseTime(){
        let beginTime = this.state.beginValue;
        let endTime = this.state.endValue;
        if(beginTime>endTime){
            Modal.alert('结束时间不能小于开始时间','');
            return;
        }
        if(endTime-beginTime> 30*24*60*60*1000){
            Modal.alert('查询时间请小于1个月！','');
            return;
        }
       this.setState({
           fromDate:window.Util.formatTime(beginTime).slice(0,10),
           toDate:window.Util.formatTime(endTime).slice(0,10),
           showTimeChoose:false,
           tabLoading:true
       },()=>{
           pageIndex=0;
           listData=[];
           this.getData();
       })
    }

   
    render(){
        const formerlyTime = new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000).toLocaleString().slice(0, 10).replaceAll('/', '-');
        return(
            <div className="HistoryPage">
                <NavBar
                    mode="light"
                    rightContent={<div className="goHome" onClick={()=>window.wapHistoryType.push('/')}><i className="icon icon-home"></i></div>}
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.goBack()}
                >历史记录</NavBar>
                <div className='fastSelection'>
                    <SegmentedControl
                        values={
                            [
                                <div className="tabsItem" key={0}>充值记录</div>,
                                <div className="tabsItem" key={1}>转账记录</div>,
                                <div className="tabsItem" key={2}>提款记录</div>,
                                <div className="tabsItem" key={3}>投注记录</div>,
                                <div className="tabsItem" key={4}>优惠记录</div>,
                            ]
                        }
                        selectedIndex={this.state.tabsType-0}
                        onValueChange={this.tabChange.bind(this)}
                        className="Segmented"
                    />
                    <div className='timeZone-date'>
                        <FastTimeSelect
                            timeZone = {this.state.timeZoneIndex}
                            getVal={val => {
                                this.setState({
                                    timeZone: val[0] === 0 ? 8:-4,
                                })
                            }}
                            disable={this.state.FastTimeSelectDisable}
                        />
                        <div className="timeBtn" onClick={this.showTimeChoose.bind(this)}>                
                            <span className='date'>区间 : {this.state.fromDate} ~ {this.state.toDate} </span>
                            <Icon size='sm' type='down'/>               
                        </div>
                    </div>
                    <SegmentedControl
                        values={[
                            <div className="tabsItem" key={0}>今日</div>,
                            <div className="tabsItem" key={1}>昨日</div>,
                            <div className="tabsItem" key={2}>本周</div>,
                            <div className="tabsItem" key={3}>上周</div>,
                        ]}
                        selectedIndex={this.state.QSelectTabsType-0}
                        onValueChange={this.QSelectTabChange.bind(this)}
                        className="Segmented SegmentedQSelect"
                    />
                </div>
                <div className="record-list">
                    {this.renderList()}
                </div>
                {
                    this.state.showTimeChoose?
                    <div className="timeChoose">
                        <div className="mask"
                                onClick={this.hideTimeChoose.bind(this)}
                        ></div>
                        <div className="timeCon">
                            <div className="timeConBtn">
                                <a className="left" onClick={this.hideTimeChoose.bind(this)}>取消</a>
                                <a className="right" onClick={this.chooseTime.bind(this)}>确定</a>
                            </div>
                            <div className="sub-title">开始时间</div>
                            <DatePickerView
                                mode="date"
                                value={this.state.beginValue}
                                onChange={this.onBeginChange.bind(this)}
                                // minDate={new Date(formerlyTime)}
                                // maxDate={this.state.maxDate}
                            />
                            <div className="sub-title">结束时间</div>
                            <DatePickerView
                                mode="date"
                                value={this.state.endValue}
                                onChange={this.onEndChange.bind(this)}
                                // minDate={new Date(formerlyTime)}
                                // maxDate={this.state.maxDate}
                            />
                        </div>
                    </div>:null
                }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        records:state.records
    }
);

export default connect(mapStateToProps)(HistoryPage)