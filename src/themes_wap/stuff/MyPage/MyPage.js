import React, { Component } from 'react';
import {NavBar,Toast} from 'antd-mobile';
import {Link} from "react-router";
import './MyPage.scss';
import {config} from "globalConfig";
import connect from "react-redux/es/connect/connect";

class MyPage extends Component{
    constructor(props) {
        super(props);
        this.transferAllOutState = true;
        this.state = {
            userData: [
                {
                    id: 0,
                    route: '/PlatFromAnnounce',
                    className: 'icon fa fa-bullhorn fa-4x',
                    func_name: '平台公告'
                },
                {
                    id: 1,
                    route: '/cardManage',
                    className: 'icon icon-credit-card',
                    func_name: '绑定银行卡'
                },
                {
                    id: 2,
                    route: '/history',
                    className: 'icon icon-file-text',
                    func_name: '交易记录'
                },
                {
                    id: 3,
                    route: '/message',
                    className: 'icon icon-gift',
                    func_name: '优惠活动'
                },
                {
                    id: 4,
                    route: '/editPassword',
                    className: 'icon icon-shield',
                    func_name: '安全中心'
                },
                {
                    id: 5,
                    route: '/sharePage',
                    className: 'icon icon-group',
                    func_name: '好友推荐'
                },
                {
                    id: 6,
                    route: '/privateInfo',
                    className: 'icon icon-user',
                    func_name: '个人资料'
                },
                {
                    id: 7,
                    route: 'siteLetter',
                    className: 'icon icon-comment',
                    func_name: '站内信'
                },
                {
                    id: 8,
                    route: '/feedback',
                    className: 'fa fa-envelope-o icon',
                    func_name: '意见建议'
                }
            ],
            platformsIdLoading: [],
        }
    }
    openSildeBar(){
        this.props.params.openSilde()
    }
    //渲染头部导航右侧部分
    renderRightCon() {
        let number = this.props.sitemsg.unread || 0;
        let dom = [];
        if (this.props.user.token) {
            dom = [
                <Link to='/siteLetter' className="userInfo" key={'userInfo'}>
                    <i className="title-message">
                        <span className="msg_no">{number > 99 ? "99+" : number}</span>
                    </i>
                </Link>
            ]
        } else {
            dom = [
                <Link to='/login' key={"firstLogin"}>登录</Link>,
                <Link to='/register' key={"firstRegister"}>注册</Link>
            ]
        }
        return dom;
    }
    reload(platformsId) {
        let nowArr = this.state.platformsIdLoading;
        nowArr.push(platformsId);
        this.setState({platformsIdLoading:nowArr});
        new window.actions.ApiPlayerInfoAction().fly();
        new window.actions.ApiGamePlatformBalanceAction(platformsId).fly(resp=>{
            let newArr = this.state.platformsIdLoading;    //因爲是異步調用所以需要獲取最新的platformsIdLoading；
            newArr = newArr.filter(id => id != platformsId)
            this.setState({
                platformsIdLoading: newArr
            })
        },platformsId);
        Toast.hide();
    }

    withdrawMoney() {
        let {AutoTransfer} = this.props.user;
        if(AutoTransfer){
            window.wapHistoryType.push('/money/withdraw');
        }else {
            window.wapHistoryType.push('/money/withdraw');
        }
    }
    depositMoney() {
        window.wapHistoryType.push("/money/deposit");
    }

    transferMoney(){
        window.wapHistoryType.push("/money");
    }
    refresh = ()=> {
        Toast.loading('总财富刷新中...');
        new window.actions.ApiGamePlatformAllBalanceAction().fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiPlayerInfoAction().fly(resp=>{
                        if (resp.StatusCode === 0) {
                            Toast.success('总财富刷新成功', 1);
                        } else{
                            Toast.fail('总财富刷新失败', 1);
                        }
                })
            }
        });
    }
    render(){
        let rightCon = this.renderRightCon();
        let {imagesConfig} = this.props;
        return(
            <div className="MyPage">
                <NavBar
                    mode="light"
                    icon={
                        <img style={{"width": ".42rem", "height": ".42rem"}}
                        src={require("../../images/hamburger.png")}
                        alt="" />
                    }
                    onLeftClick={this.openSildeBar.bind(this)}
                    rightContent={rightCon}
                >
                    我的
                </NavBar>
                <div className="scroll-content">
                    <div className='user_info_top'>
                        <img src={config.devImgUrl + imagesConfig.Avatar} className='user_avatar' alt='' />
                        <span className='user_level'>{this.props.user.userLevelName}</span>
                        <span className='user_name'>{this.props.user.username}</span>
                    </div>
                    <div className='user_info_mid'>
                        <div className='money_info'>
                            <div className='money_num'>
                                <span>账户余额： <i>{this.props.user.amount || '0'}</i></span>
                                <span>总财富： <i>{this.props.user.userBalance || '0'}</i></span>

                            </div>
                            <div className='btns'>
                                <Link to="/money" className='check_all'>查看全部</Link>
                                <a href="javascript:;" className='refresh' onClick={()=>this.refresh()}>刷新</a>
                            </div>
                        </div>
                        <div className='deposit_func'>
                            <Link className='func_item' onClick={this.depositMoney.bind(this)}>
                                <div className='iconbg iconbg1'>
                                    <i className="icon zm zm-tixian"></i>
                                </div>
                                <span className='text'>充值</span>
                            </Link>
                            <Link className='func_item' onClick={this.withdrawMoney.bind(this)}>
                                <div className='iconbg iconbg2'>
                                    <i className="icon zm zm-tixianchongzhi"></i>
                                </div>
                                <span className='text'>提款</span>
                            </Link>
                            <Link className='func_item' onClick={this.transferMoney.bind(this)}>
                                <div className='iconbg iconbg3'>
                                    <i className="icon zm zm-zhuanzhanghuikuan"></i>
                                </div>       
                                <span className='text'>转账</span>
                            </Link>
                        </div>
                    </div>
                    <div className='user_info_btm'>
                        {
                            this.state.userData.map((item)=>{
                                return (
                                    <Link key={item.id} className='box' to={item.route}>
                                        <i className={item.className}></i>
                                        <span className="txt_style">{item.func_name}</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        sitemsg: state.sitemsg,
        noticesUnRead: state.noticesUnRead,
        remoteSysConfs: state.remoteSysConfs,
        imagesConfig: state.imagesConfig,
        platforms: state.game.platforms,
    }
);

export default connect(mapStateToProps)(MyPage)