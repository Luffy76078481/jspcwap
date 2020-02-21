/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                滑动侧边栏-业务逻辑难度为：★
          
*/



import React, { Component } from 'react';
import { Flex,List,Icon} from 'antd-mobile';
import connect from "react-redux/es/connect/connect";
import './SideBar.scss';
import {config} from "globalConfig";
const Item = List.Item;

class SideBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        }
        this.submitStateLock = true;
    }

    // 退出账号
    userQuit(){
        if(!this.submitStateLock) return;
        this.submitStateLock = false;
        new window.actions.LogoutAction().fly(resp=>{
            this.submitStateLock = true;
        });
        window.wapHistoryType.push('/');
        this.props.closeSide();
    }
    // 侧栏点击跳转
    linkTo(router){
        if(router.startsWith('http')) {
            window.Util.appOpen(router);
            return
        }
        window.wapHistoryType.push(router)
        this.props.closeSide();
    }
    // 跳转APP下载页
    downLoad() {
        window.open(this.props.remoteSysConfs.channel_push_url, "_blank");
    } 
    // 刷新按钮
    refresh(){
        new window.actions.ApiPlayerInfoAction().fly(resp=>{
            if (resp.StatusCode === 0) {
                this.setState({refreshing: false});
            }else{
                alert(resp.Message);
                this.setState({refreshing: false});
            }
        });
    }
    render(){
        // console.log(this.props.sideBarNav,'----');
        var cur_ver = window.version;
        let {imagesConfig,user} = this.props;
        return(
            <div className="SideBar">
                <Flex className="item-inner" >
                    <Flex.Item className="rightCon">
                        <img src={config.devImgUrl + imagesConfig.Avatar} className='avatar' alt='' />
                        <div className="userName">
                            <span className="text_style">{this.props.user.username?this.props.user.username:"游客"}, 欢迎您!</span>
                            <span className="account_label">
                                {
                                    this.state.refreshing ?
                                    <span>
                                        <Icon type='loading' /><span className='waiting_txt'>请稍后...</span>
                                    </span> :
                                    <span>主帐户余额 ￥{this.props.user.amount?this.props.user.amount:"0"}</span>
                                }
                                {
                                    user.token ? 
                                        <a className='refresh_btn' onClick={()=> {
                                            this.refresh();
                                            this.setState({refreshing: true})
                                        }}>刷新</a> : null
                                }
                            </span>
                        </div>
                    </Flex.Item>
                </Flex>
                <Flex>
                    <List className="sideList">
                        <div>
                            {
                               this.props.sideBarNav.map((data,index)=>{
                                   return(
                                        <Item key={index} arrow="horizontal"  onClick={this.linkTo.bind(this,data.GotoUrl)}>
                                            <i className={data.ClassName}/>{data.Title}
                                        </Item>
                                   )

                               })
                            }
                            {
                                config.isApp ? null :
                                <Item arrow="horizontal"  onClick={this.downLoad.bind(this)}>
                                    <i className="icon icon-cloud-download"/>APP下载
                                </Item>
                            }
                            {
                                this.props.user.token?
                                <Item arrow="horizontal"  onClick={this.userQuit.bind(this)}>
                                    <i className="icon icon-off"></i>登出
                                </Item>:""
                            }
                        </div>
                        <div className='version_info'>当前版本号: {cur_ver}</div>
                    </List>
                </Flex>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        remoteSysConfs: state.remoteSysConfs,
        imagesConfig: state.imagesConfig,
        sideBarNav:state.gameLayout.sideBarNav,
    }
);

export default connect(mapStateToProps)(SideBar)