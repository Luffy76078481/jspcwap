
import React, { Component } from 'react';
import './GamePage.scss'
import { connect } from 'react-redux';
import { transferTip } from 'commonFunc';
import { Tabs , Pagination } from 'antd';
const { TabPane } = Tabs;



class GamePage extends Component {
    constructor() {
        super();
        this.state = {
            defaultActiveKey:'0'
        }
    }

   
   
    render() {
        return (
            <div className='NewGamesPage'>
                <div className="gameHead">
                    <p className="jackpot">2651312561</p>
                </div>
                <div className="gameBody">
                    {this.leftTabs()}
                    {this.rigthTopTabs()}
                    {this.rightContent()}
                    {this.rigthBottom()}
                </div>
            </div>
        )
    }

    leftTabs(){
        const TabIcon = ()=>{
            return(
                <div className="custom-tab-item">
                    {/* <img src={window.config.prdImgUrl + item.IconUrl} alt=""/>
                    {item.SubTitle} */}
                    12314
                    <img src="http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%B5%8B%E8%AF%95%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=28&spn=0&di=28710&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3565682627%2C2876030475&os=1316705073%2C2251783149&simid=4238778763%2C528074881&adpicid=0&lpn=0&ln=764&fr=&fmq=1564559443540_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&oriquery=&objurl=http%3A%2F%2Fthumbs.dreamstime.com%2Fz%2F%E6%9C%89%E5%AD%A6%E5%91%98%E6%B5%8B%E8%AF%95-11577385.jpg&gsm=5a&rpstart=0&rpnum=0&islist=&querylist=&force=undefined" alt=""/>
                </div>
            )
        }
        return(
            <div className="leftTabs">
                <Tabs onChange={this.tabsHandleChange} defaultActiveKey={'1'} activeKey={this.state.defaultActiveKey}  tabPosition='left'>
                    {/* {
                        this.props.data.map((item, index) => (
                            <TabPane tab={<TabIcon item={item} />} key={index}></TabPane>
                        ))
                    } */}
                    <TabPane tab={<TabIcon/>} key={1}></TabPane>
                    <TabPane tab={<TabIcon/>} key={2}></TabPane>
                    <TabPane tab={<TabIcon/>} key={3}></TabPane>
                    <TabPane tab={<TabIcon/>} key={4}></TabPane>
                    <TabPane tab={<TabIcon/>} key={5}></TabPane>
                    <TabPane tab={<TabIcon/>} key={6}></TabPane>
                </Tabs>
                
            </div>
        )
    }

    tabsHandleChange =(index) =>{
        this.setState({
            defaultActiveKey: index
        })
    }


    rigthTopTabs(){
        return(
            <ul className="rigthTopTabs">
                <li>全部</li>
                <li>最新</li>
                <li>热门</li>
                <li>特色</li>
            </ul>
        )
    }


    rightContent(){
        return(
            <div>
                <ul className="rightContent">
                    <li>1111</li>
                    <li>2222</li>
                    <li>3333</li>
                    <li>4444</li>
                    <li>1111</li>
                    <li>2222</li>
                    <li>3333</li>
                    <li>4444</li>
                    <li>1111</li>
                    <li>2222</li>
                    <li>3333</li>
                    <li>4444</li>
                    <li>1111</li>
                    <li>2222</li>
                    <li>3333</li>
                    <li>4444</li>
                </ul>
            </div>
        )
    }


    rigthBottom(){
        const pageSize = 20,total = 200;
        return(
            <div className="rigthBottom">
                <Pagination showQuickJumper defaultCurrent={1} pageSize={pageSize} total={total} onChange={this.rightBottomChange} />
            </div>
        )
    }

    rightBottomChange(pageNumber){
        console.log(pageNumber-1)
    }

}

const mapStateToProps = (state, ownProps) => (
    {
        gameLayout: state.gameLayout,
        user: state.user,
    }
);

export default connect(mapStateToProps, {})(GamePage);