import React, { Component } from 'react';
import {NavBar, Icon, List,ListView,Accordion} from 'antd-mobile';
import connect from "react-redux/es/connect/connect";
import './SiteLetter.scss';
import {wapAuth} from "globalAction";


let pageIndex = 0;
let listData=[];
const clearHtml = function (html) {//清楚html中的style
    var rel = /style\s*?=\s*?([‘"])[\s\S]*?\1/g;
    var newHtml = '';
    if (html) {
        newHtml = html.replace(rel, '')
    }
    return newHtml;
};
class SiteLetter extends Component{
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
            tabsType: this.props.params.messageType === undefined ? 0 : parseInt(this.props.params.messageType)
        }
    }
    componentWillMount(){
        pageIndex=0;
        listData=[];
        this.getList();
    }

    onEndReached = () => {
        if(!this.state.hasMore || this.state.isLoading)  return false;
        this.setState({ isLoading: true });
        this.getList();
    };

    getList() {
        if (!wapAuth(true)) return false;
        new window.actions.ApiQuerySitemsgsAction("", "", pageIndex, 30).fly(resp => {
            if (resp.StatusCode === 0) {
                pageIndex++;
                listData = listData.concat(resp.List);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(listData),
                    hasMore: resp.Count > pageIndex * 30,
                    isLoading: false,
                    tabLoading: false
                });
                new actions.ApiReadAllSiteMsgAction().fly(resp=>{
                    if (resp.StatusCode === 0) {
                        new window.actions.ApiSitemsgUnreadCountAction().fly();
                    }
                });
            }
        });

    }
    renderList(){
        if(this.state.tabLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }
        let row = (rowData) => {
                let tittle = <div className='AnnounceHeader'>
                    <span className='title'>{rowData.Title}</span>
                    <span className='AnnounceTime'>{rowData.SendTime.slice(0,10)}</span>
                </div>;
                return (
                    <List.Item className='messageAnnounce'>
                        <Accordion defaultActiveKey="0" className="my-accordion">
                            <Accordion.Panel header={tittle} className="pad" >
                                <p dangerouslySetInnerHTML={{__html:clearHtml(rowData.Message)}}></p>
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
            <div className="SiteLetter">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push("/myPage")}
                >站内信</NavBar>
                <div className="scroll-content">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => (
    {
        // unread:state.sitemsg.unread,
        // noticesUnRead:state.noticesUnRead,
        // promoUnRead:state.promotions.promoUnRead,
        // promotions:state.promotions.promotions.rows
    }
);

export default connect(mapStateToProps)(SiteLetter)