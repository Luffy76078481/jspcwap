
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Tabs} from 'antd'
import "./GameTabs.scss";
const { TabPane } = Tabs;

class GameTabs extends Component{
    constructor(props){
        super();
        this.state = {
            tabActive:window[props.id]?window[props.id]:"",
            defaultActiveKey: '0'
        }
    }
    // 切换导航
    changeTab(val){
        if(val === this.state.tabActive)return;
        this.setState({
            tabActive:val
        });
        window[this.props.id] = val;
        this.props.activeAllBack({id:val})
    }
    // 导航数超过4
    tabsHandleChange =(index) =>{
        let tag = this.props.data[parseInt(index)].Tag
        console.log('tag',tag)
        this.changeTab(tag)
        this.setState({
            defaultActiveKey: index
        })
    }
    componentWillReceiveProps(nextProps){
        if(this.props.gameType != nextProps.gameType){
            this.changeTab(nextProps.gameType)
            // 传入平台，设置初始选中状态
            this.setDefaultActiveKey(nextProps.gameType)
        }
    }
    // 判断当前选中的tab
    setDefaultActiveKey = (gameType) => {
        if(!this.props.data.length) return;
        this.props.data.forEach((item, index)=>{
            if(item.Tag===gameType) {
                this.setState({
                    defaultActiveKey: index + ''
                })
            }
        })
    }
    // 判断展示类型
    renderNavList = () => {
        if (!this.props.data.length) return null;
        if (this.props.data.length <= 4) {
            return (
                <div className="tabsBox">
                    {this.props.data.map((data, index) => {
                        if (this.state.tabActive == "") {
                            this.state.tabActive = data.Tag;
                            window[this.props.id] = data.Tag;
                        }
                        return <div 
                        key={index} 
                        onClick={this.changeTab.bind(this, data.Tag)}
                        className={this.state.tabActive == data.Tag ? "tabActive" : ""}><img
                        src={window.config.prdImgUrl + data.IconUrl}/>{data.SubTitle}</div>
                    })}
                </div>
            )
        }
        if (this.props.data.length > 4) {
            return (
                <div className="tabsBox">
                    <Tabs onChange={this.tabsHandleChange} defaultActiveKey={'0'} activeKey={this.state.defaultActiveKey} tabPosition='top'>
                        {
                            this.props.data.map((item, index) => (
                                <TabPane tab={<TabIcon item={item} />} key={index}></TabPane>
                            ))
                        }
                    </Tabs>
                </div>
            )
        }
        return null
    }
    render(){
        return (
            <div className="GameTabs">
                {
                    this.renderNavList()
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        gameType:state.gameTabs
    }
);
export default connect(mapStateToProps)(GameTabs)

class TabIcon extends React.Component{
    render() {
        const {item} = this.props
        return(
            <div className="custom-tab-item">
                <img src={window.config.prdImgUrl + item.IconUrl} alt=""/>
                {/* {item.SubTitle} */}
            </div>
        )
    }
}