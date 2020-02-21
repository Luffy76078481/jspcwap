/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                优惠页面-业务逻辑难度为：★★
          
*/

import React, { Component } from 'react';
import {NavBar, Icon, List, Badge,ListView,Tabs} from 'antd-mobile';
import { _dispatch } from "globalAction";
import connect from "react-redux/es/connect/connect";
import * as cache from "CacheHelper";
import './MyMessage.scss';
import {config} from "globalConfig";

let pageIndex = 0;
let listData=[];
class MyMessage extends Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state={
            tabLoading: false,
            dataSource: dataSource.cloneWithRows({}),
            isLoading: false,
            hasMore: true,
            promoTabType:'',
        }
    }
    componentWillMount(){
        pageIndex = 0;
        listData = [];
        if (this.props.promoData.length === 0) {//首次进来获取数据
            new window.actions.ApiQueryPromotionTypesAction().fly();
            this.getList();
        } else {//N次进来不用获取首屏数据
            pageIndex++;
            // listData = listData.concat(this.props.promoData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.promoData),
                hasMore: true,
                isLoading: false,
                tabLoading: false
            });
        }
    }

    readNew(id){
        let isReadNews = cache.get('isReadNews')?cache.get('isReadNews'):"";
        let isRedList = isReadNews.split(",");
        if(!isRedList.includes(id+"")){
            cache.set('isReadNews',isReadNews+id+',');
            _dispatch({type:"changeReadNewsNum",tabsType:0});
        }
        window.wapHistoryType.push('/read/0&'+id+'&message')
    }

    onEndReached = () => {
        if(!this.state.hasMore || this.state.isLoading)  return false;
        this.setState({ isLoading: true });
        this.getList();
    };

    getList() {
        new window.actions.ApiQueryPromotionsAction(pageIndex,50,this.state.promoTabType).fly(resp=>{
            if(resp.StatusCode ==0){
                pageIndex++;
                listData=listData.concat(resp.List);
                let cloneListData = JSON.parse(JSON.stringify(listData));
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(cloneListData),
                    hasMore: resp.Count>pageIndex*50,
                    isLoading: false,
                    tabLoading:false
                });
            }
        })
    }
    // 优惠活动渲染
    renderList(){
        let isReadNews = cache.get('isReadNews')?cache.get('isReadNews'):"";
        if(this.state.tabLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }
        let row = (rowData) => {
            return (
                <List.Item onClick={this.readNew.bind(this, rowData.Id)} className="listItem listformessage">
                    <img className="promoImg" src={config.devImgUrl + rowData.Img}/>
                    <div className={'content'}>
                        {
                            isReadNews.indexOf(rowData.Id + ',') > -1 ? "" : <Badge text="新" hot className="Badge"/>
                        }
                        <span className={'txt'}>{rowData.Title}</span>
                        <small className="time">{rowData.StartTime.slice(0, 10)}</small>
                    </div>
                </List.Item>
            )

        };
        const renderFooter = ()=>{
            return (<div style={{textAlign:'center',lineHeight:'2rem'}}>我没有更多数据了! (ㄒoㄒ)~</div>)         
        };
        return(
            <ListView
                dataSource={this.state.dataSource}
                className="myListView"
                renderFooter={renderFooter}
                renderRow={row}
                pageSize={20}//每次事件循环（每帧）渲染的行数
                scrollRenderAheadDistance={200}//当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached.bind(this)}//当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                onEndReachedThreshold={100}//调用onEndReached之前的临界值，单位是像素
            />
        )
    }
    changepPromoType (tab) {
        listData=[];
        pageIndex=0;
        this.setState({
            promoTabType:tab.Key,
            tabLoading:true,
            hasMore:true,
        },()=>{
            this.getList();
        });
    }
    render(){
        const tabs = [{ title: '全部优惠',Key:''},...(
            this.props.promoType.map(i => (
                    {title:i.TypeName,Key:i.Id}
                ))
        )];
        return(
            <div className="MyMessage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.goBack()}
                >优惠活动</NavBar>
                <Tabs tabs={tabs} onChange={this.changepPromoType.bind(this)}></Tabs>
                <div className="scroll-content">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        promoData: state.promotions.promoData,
        promoType:state.promotions.promoTypes,
        promotions:state.promotions.promotions.rows
    }
);

export default connect(mapStateToProps)(MyMessage)