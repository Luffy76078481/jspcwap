/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                所有页面顶层容器-业务逻辑难度为：★
          
*/

import React, { Component } from 'react';
import {Drawer,Carousel} from "antd-mobile";
import {browserHistory} from 'react-router';
import connect from "react-redux/es/connect/connect";
import {config} from "globalConfig";
import "./Frame_directer.scss";
import * as cache from "CacheHelper";

class Frame extends Component{
    constructor(props) {
        super(props);
        this.state={
            open:false,
            footTabs:"/",
            shortCut:cache.getSession('shortCut')?cache.getSession('shortCut'):false,
            showShortCut:false,
            showPromotion:true,// 控制系统公告弹窗显示或隐藏
        }
    }
    // 当侧栏发生变化时触发
    onOpenChange(flag){
        this.setState({open:flag==undefined?!this.state.open:flag})
    }
    // 我真不知道这是啥，但又不敢动。
    changeFootTabs(name){
        this.setState({footTabs:name})
    }
    // 展示桌面快捷GIF图
    shortCut(){
        this.setState({
            showShortCut:true,
            shortCut:true
        });
    }
    // 隐藏桌面快捷
    closeShortCut(){
        cache.setSession('shortCut',true);
        this.setState({
            shortCut:true
        })

    }
    // 桌面快截图关闭
    isLooking(){
        cache.setSession('shortCut',true);
        this.setState({
            showShortCut:false,
            shortCut:true
        })
    }
    // 关闭侧栏
    closeSide(event){
        event.preventDefault();
        event.stopPropagation();
        $(event.currentTarget).closest('a').remove();
    }
    // 打开公告详情
    openPromotion(link){
        if(!link) return;
        if(config.isApp){
            window.Util.appOpen(link)
        }else{
            window.open(link,'_blank');
        }
    }
    // 关闭系统公告弹窗
    _closeHomePromotion(){
        this.setState({ showPromotion:false });
        // 首次进入网站时保存状态为true, 收藏提示和首页弹窗提示判断是否为true,如果为true则当前网站不再弹出
        sessionStorage.setItem("visit_website","true");
    }
    // 公告弹窗
    showNotice(){
        let {homePromotion} = this.props;
        if( homePromotion.length > 0){
            return (
                <div className='overLay' style={{display:this.state.showPromotion ? "block" : "none"}}>
                    <div className='FrameMask' onClick={this._closeHomePromotion.bind(this)}></div>
                    <div className="homePromotion">
                        <div className='title'>
                            系统公告
                            <a className="close" onClick={this._closeHomePromotion.bind(this)}></a>
                        </div>
                        <Carousel autoplay={true} infinite autoplayInterval={300000} swipeSpeed={30}>
                            {this.renderContent()}
                        </Carousel>
                    </div>
                </div>
            );
        }
    }
    // 渲染系统公告内容
    renderContent(){
        let content = [];
        let {homePromotion} = this.props;
        homePromotion.length > 0 && homePromotion.forEach((item,i) => (
            content.push(
                <a 
                    className="promotionCon"
                    key={item.Id}
                    onClick={this.openPromotion.bind(this,item.ExternalLink)}
                    dangerouslySetInnerHTML={{
                        __html: item.Content
}}
                ></a>
            )
        ))
        return content;
    }
    componentDidMount(){
        // 侧栏滑动效果-佛系写法。
        let Y = 0,_this = this;
        $('.am-drawer-overlay').on('touchstart',function(e) {
            var touch = e.originalEvent.targetTouches[0]; 
            Y = touch.pageX;
        });
        $('.am-drawer-overlay').on('touchend',function(e) {
            var touch = e.originalEvent.changedTouches[0]; 
            var y = touch.pageX;
            if(Y-y>50){
                _this.setState({
                    open:false
                })
            }
        });
        $('.am-drawer-sidebar').on('touchstart',function(e) {
            var touch = e.originalEvent.targetTouches[0]; 
            Y = touch.pageX;
        });
        $('.am-drawer-sidebar').on('touchend',function(e) {
            var touch = e.originalEvent.changedTouches[0]; 
            var y = touch.pageX;
            if(Y-y>50){
                _this.setState({
                    open:false
                })
            }
        });    
    }
    render(){
        let FooterBar = window.r.get("FooterBar");
        let SideBar = window.r.get("SideBar");
        let _this = this; 
        let pathname = browserHistory.getCurrentLocation().pathname;
        return (
            <div>
                {/* 首页系统公告弹窗 */}
                {sessionStorage.getItem("visit_website") == "true" ? null : this.showNotice() }
                <Drawer
                    className="my-drawer"
                    enableDragHandle
                    sidebarStyle = {{width:"4.5rem"}} // 侧栏宽度
                    // 侧栏内容
                    sidebar={<SideBar changeFootTabs={this.changeFootTabs.bind(this)} closeSide={this.onOpenChange.bind(this)} />}
                    open={this.state.open} // 是否打开侧栏
                    onOpenChange={this.onOpenChange.bind(this)} // 侧栏发生变化时
                    >
                    {
                        // 桌面快捷
                        (!this.state.shortCut && !config.isApp && !config.spec.includes('bee') && !config.spec.includes('cbd')) &&
                        <div className="sideFloat left">
                            <a className="item shortCutImg" onClick={this.shortCut.bind(this)}></a>
                            <span onClick={this.closeShortCut.bind(this)}></span>
                        </div>
                    }   
                    {
                        // 桌面快捷展示图
                        this.state.showShortCut &&
                        <div onClick={this.isLooking.bind(this)} className={window.ios?"ios shortCutGif":"shortCutGif"}></div>
                    }            
                    {
                        // 子路由组件
                        React.Children.map(this.props.children,function(child,index){
                            child.props.params.openSilde = _this.onOpenChange.bind(_this);
                            return (<div key={index}>{child}</div>)
                        })
                    }
                    {
                        pathname!='/m/register' && 
                        pathname!='/m/hotActivity/lotto' && 
                        pathname!='/m/login'&& 
                        /* pathname!='/m/message' &&  */
                        pathname!='/m/service/agentReg' &&
                        pathname!='/m/editPassword'
                        ?
                        <FooterBar footTabs={this.state.footTabs}></FooterBar>:null
                    }
 
                </Drawer>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        popup:state.message.popup,
        remoteSysConfs:state.remoteSysConfs,
        homePromotion:state.homePromotion
     }
);

export default connect(mapStateToProps)(Frame)
