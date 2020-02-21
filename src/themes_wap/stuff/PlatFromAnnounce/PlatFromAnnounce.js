/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                公告详情页-业务逻辑难度为：★
          
*/


import React, { Component } from 'react';
import {NavBar, Icon, List, Badge,ListView,Accordion} from 'antd-mobile';
import { _dispatch } from "globalAction";
import connect from "react-redux/es/connect/connect";
import * as cache from "CacheHelper";
import './PlatFromAnnounce.scss';

let listData=[];
const clearHtml = function (html) {//清楚html中的style
    var rel = /style\s*?=\s*?([‘"])[\s\S]*?\1/g;
    var newHtml = '';
    if (html) {
        newHtml = html.replace(rel, '')
    }
    return newHtml;
};
class PlatFromAnnounce extends Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state={
            firstLoading: true,
            dataSource: dataSource.cloneWithRows({}),
            isLoading: false,
            hasMore: true,
        }
    }
    componentWillMount(){
        let notices = this.props.notices;
        listData =  JSON.parse(JSON.stringify(this.props.notices));
        this.getList(listData,notices.length);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.notices !== nextProps.notices) {
            let notices = nextProps.notices;
            listData = JSON.parse(JSON.stringify(listData.concat(notices)));
            this.getList(listData);
        }
    }
    accordionReadNew(id){
        let isReadNews = cache.get('isReadNews')?cache.get('isReadNews'):"";
        let isRedList = isReadNews.split(",");
        if(!isRedList.includes(id+"")){
            cache.set('isReadNews',isReadNews+id+',');
            _dispatch({type:"changeReadNewsNum",tabsType:'1'});
        }
    }
    onEndReached = () => {
        if(!this.state.hasMore || this.state.isLoading)  return false;
        this.setState({ isLoading: true });
    };
    // 获取数据
    getList(listData) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(listData),
            hasMore: false,
            isLoading: false,
            firstLoading: false
        });
    }
    // 公告内容
    renderList(){
        let isReadNews = cache.get('isReadNews')?cache.get('isReadNews'):"";
        if(this.state.firstLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }
        let row = (rowData) => {
            let tittle = <div className='AnnounceHeader'>
                {isReadNews.indexOf(rowData.Id + ',') > -1 ? '' : (
                    <span className='newIcon'><Badge text="新" className="Badge"/></span>)}
                <span className='title'>{rowData.Title}</span>
                <span className='text'>{rowData.CreateTime.slice(0, 10)}</span>
            </div>;
            return (
                <List.Item className='messageAnnounce' onClick={this.accordionReadNew.bind(this, rowData.Id)}>
                    <Accordion className="my-accordion">
                        <Accordion.Panel header={tittle} className="pad">
                            <p dangerouslySetInnerHTML={{__html: clearHtml(rowData.Content)}}></p>
                        </Accordion.Panel>
                    </Accordion>
                </List.Item>
            )
        };
        const renderFooter = ()=>{
            let con;
            if(this.state.hasMore){
                con=(<div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>)
            }else {
                con=(<div style={{textAlign:'center',lineHeight:'2rem'}}>我没有更多数据了! (ㄒoㄒ)~</div>)
            }
            return con;
        };
        return(
            <ListView
                dataSource={this.state.dataSource}
                className="myListView"
                renderFooter={renderFooter}
                renderRow={row}
                pageSize={30}//每次事件循环（每帧）渲染的行数
                scrollRenderAheadDistance={200}//当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached.bind(this)}//当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                onEndReachedThreshold={100}//调用onEndReached之前的临界值，单位是像素
            />
        )
    }
    render(){
        return(
            <div className="PlatFromAnnounce">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push("/myPage")}
                >平台公告</NavBar>
                <div className="scroll-content">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => (
    {
        notices:state.notices,
        noticesUnRead:state.noticesUnRead,
    }
);

export default connect(mapStateToProps)(PlatFromAnnounce)