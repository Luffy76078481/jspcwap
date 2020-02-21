/**
 *                个人中心1 - 导航页               ==> 仅供新站使用
 */

import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router';
import loadAmount from '../images/loading_wellbet.gif';
import QRCode from 'qrcode.react' // 二维码图生成插件
import {transferAllOut} from './transferAllOut'

class MemberFrame extends Component {
    constructor(props) {
        super(props);
        this.transferAllOutState = true; 
        this.state={
            loadAmount:false, // false显示余额，true显示请求API时Gif图
            closeCloud:false, // 筋斗云显示和隐藏
            webName:window.location.host, // 该站点域名
            phoneVerifyClickFlag:false, // 获取验证码-开关锁
            emailVerifyClickFlag:false, // 获取验证码-开关锁
            phoneSubmitFlag:false, // 提交手机验证-开关锁
            emailSubmitFlag:false, // 提交手机验证-开关锁
            phoneCodeTimeInter:null, // 验证码倒计时-定时器
            sendPhoneVerifyButtonMes:"点击获取", // 验证码倒计时
            emailCodeTimeInter:null, // 验证码倒计时-定时器
            sendEmailVerifyButtonMes:"点击获取", // 验证码倒计时
        }
    }
    componentDidMount(){
        new window.actions.ApiGamePlatformAllBalanceAction().fly();// 获取所有余额，计算总财富
    }
    // 导航 ACtive
    activeCls() {
        for (var i = 0; i < arguments.length; i++) {
            var name = arguments[i];
            if (this.props.location.pathname.indexOf(name)> -1 ) {
                return "selected_bac_tabs";
            }
        }
        return "";
    }
    // 刷新余额
    loadAmount(){
        this.setState({
            loadAmount:true
        })
        new window.actions.ApiPlayerInfoAction().fly(resp=>{
            console.log(222222222,resp)
            if (resp.StatusCode === 0) {
                this.setState({
                    loadAmount:false
                })
            }
        });
    }
    // 验证弹窗
    isAuth(val){
        window.swal(val+"已认证", "", "info");
    }
    // 提交手机验证
    onSubmitPhone(e){
        let inputVCode = this.refs.inputVCode.value;
        if(!inputVCode){
            window.swal("错误", "验证码不能为空");
            return;
        }
        if(this.state.phoneSubmitFlag)return;
        this.state.phoneSubmitFlag = true;
        new window.actions.ApiValidatePhoneAction(this.props.user.phone,inputVCode).fly((resp)=>{
            if(resp.StatusCode === 0){
                $("#PhoneModalClose").trigger('click');
                new window.actions.ApiPlayerInfoAction().fly();
                window.swal("成功", "恭喜验证成功，现在您可以进行提款");
            }else{
                window.swal("错误", resp.Message);
            }
            this.state.phoneSubmitFlag = false;
        });
    }
    // 提交邮箱验证
    onSubmitEmail(e){
        let emailVCode = this.refs.emailVCode.value;
        if(!emailVCode){
            window.swal("错误", "验证码不能为空");
            return;
        }
        if(this.state.emailSubmitFlag)return;
        this.state.emailSubmitFlag = true;
        new window.actions.ApiValidateEmailAction(this.props.user.email,emailVCode).fly((resp)=>{
            if(resp.StatusCode === 0){
                $("#EmailModalClose").trigger('click');
                new window.actions.ApiPlayerInfoAction().fly();
                window.swal("成功", "恭喜验证成功");
            }else{
                window.swal("错误", resp.Message);
            }
            this.state.emailSubmitFlag = false;
        });
    }
    // 获取手机验证码
    getPhoneCode(){
        var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(this.props.user.phone)) {
            window.swal("错误", "手机号码错误，请联系在线客服");
            return;
        }
        if(this.state.phoneVerifyClickFlag)return;
        this.state.phoneVerifyClickFlag = true;
        if(this.state.phoneCodeTimeInter){
            clearInterval(this.state.phoneCodeTimeInter);
            this.state.phoneCodeTimeInter = null;
        }
        new window.actions.ApiSendMobileVCodeAction().fly((resp)=>{
            if(resp.StatusCode === 0){
                window.swal("成功", "发送成功，请注意查收");
                this.state.phoneCodeTimeInter = setInterval(()=>{
                    if(this.state.sendPhoneVerifyButtonMes==1){
                        this.setState({sendPhoneVerifyButtonMes:"点击获取"})
                        this.state.phoneVerifyClickFlag = false; 
                        clearInterval(this.state.phoneCodeTimeInter);
                        this.state.phoneCodeTimeInter = null;
                        return;
                    }else{
                        if(typeof this.state.sendPhoneVerifyButtonMes ==="string"){
                            this.setState({sendPhoneVerifyButtonMes:60}) 
                        }else{
                            this.setState({sendPhoneVerifyButtonMes:this.state.sendPhoneVerifyButtonMes-1}) 
                        }
                    }
                },1000)
                
            }else{
                window.swal("错误", resp.Message);
                this.state.phoneVerifyClickFlag = false;
            }         
        })
    }
    getEmailCode(){
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailReg.test(this.props.user.email)) {
            window.swal("错误", "邮箱错误，请联系在线客服");
            return;
        }
        if(this.state.emailVerifyClickFlag)return;
        this.state.emailVerifyClickFlag = true;
        if(this.state.emailCodeTimeInter){
            clearInterval(this.state.emailCodeTimeInter);
            this.state.emailCodeTimeInter = null;
        }
        new window.actions.ApiSendEmailVCodeAction().fly((resp)=>{
            if(resp.StatusCode === 0){
                window.swal("成功", "发送成功，请注意查收");
                this.state.emailCodeTimeInter = setInterval(()=>{
                    if(this.state.sendEmailVerifyButtonMes==1){
                        this.setState({sendEmailVerifyButtonMes:"点击获取"})
                        this.state.emailVerifyClickFlag = false;
                        clearInterval(this.state.emailCodeTimeInter);
                        this.state.emailCodeTimeInter = null;
                        return;
                    }else{
                        if(typeof this.state.sendEmailVerifyButtonMes ==="string"){
                            this.setState({sendEmailVerifyButtonMes:60})
                        }else{
                            this.setState({sendEmailVerifyButtonMes:this.state.sendEmailVerifyButtonMes-1})
                        }
                    }
                },1000)

            }else{
                window.swal("错误", resp.Message);
                this.state.emailVerifyClickFlag = false;
            }
        })
    }
    // 在线客服弹窗服务
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    // 总财富
    totalMoney(){
        var total = this.props.user.amount;
        for (var i = 0; i < this.props.game.platforms.length; i++) {
            var platform = this.props.game.platforms[i];
            if(platform.Name2.indexOf('YOPLAY')==-1){
                total += (platform.Balance || 0);
            }
        }
        return <span className='FontColor ml5'>{total.toFixed(2)}元</span>
    }
    AllOut(){
        transferAllOut(this.props.platforms)
    }
    render() {
        const promotionLink = this.props.remoteSysConfs.channel_push_url; // APP下载页链接
        return (
            <div className={`accountCenter`} id='account'>
                <div className="account_container w1000">
                    {/* 顶部 */}
                    <div className="accountTop pt50 pr">
                        <div className="myPurse fl">
                            <p className='m0'>
                                账户余额
                                {
                                    this.state.loadAmount?(<img className="loadAmount" src={loadAmount} />):
                                    (<span className="FontColor ml10">{this.props.user.amount}元 
                                        <i onClick={this.loadAmount.bind(this)} className="glyphicon glyphicon-repeat fr i-block mr15 pointer"></i>
                                    </span>)
                                }                                
                            </p>
                            <p>
                                总财富
                                {
                                    //this.props.user.userBalance
                                    this.totalMoney()
                                }
                                <span onClick={this.AllOut.bind(this)} className="transferAllOut mr10">转出</span>
                            </p>
                        </div>
                        <div className="colsline fl"></div>
                        <div className="iconsVerify fl">
                            <div className="verifyItems clearfix">
                                {
                                    this.props.user.realName?
                                        <a className="realNameIcon isAuth" title="实名已认证" onClick={this.isAuth.bind(this,'实名')}></a>
                                    :
                                        <a className="realNameIcon" title="实名未认证"></a>
                                }
                                {
                                    this.props.user.verfyPhone?
                                        <a className="mobileIcon isAuth" title="手机已验证" id='shwoPhone' onClick={this.isAuth.bind(this,'手机')}></a>
                                    :
                                        <a className="mobileIcon" title="手机未验证" id='shwoPhone' data-toggle="modal" data-target="#PhoneVerifyModal"/>
                                }
                                {
                                    this.props.user.verfyEmail?
                                    <a className="emailIcon isAuth" title="邮箱已验证" id='showEmail'  onClick={this.isAuth.bind(this,'邮箱')}></a>
                                    :
                                    <a className="emailIcon" title="邮箱未验证" id='showEmail' data-toggle="modal" data-target="#EmailVerifyModal" ></a>
                                }
                                {/*{*/}
                                {/*    this.props.user.verfyPhone?*/}
                                {/*    <Link to="/bindCard" className="cardIcon isAuth" title="银行卡已验证"></Link>*/}
                                {/*    :*/}
                                {/*    <Link to="/bindCard" className="cardIcon" title="银行卡未绑定"></Link>*/}
                                {/*}*/}
                            </div>
                        </div>
                        <div className="colsline fl"></div>
                        <QRCode className='QRCode' includeMargin={false} size={80} value={this.props.remoteSysConfs.channel_push_url || ""}/>
                        <a href={promotionLink} target='_bland' className='toDownApp'></a>
                        <div className="clearfix"></div>
                        <div className="accountTabs mt10 pl10">
                            <ul>
                                <li className={this.activeCls("/member")}><Link to="/member">基本信息</Link></li>
                                <li className={this.activeCls("/editPassWord")}><Link to="/editPassWord">修改密码</Link></li>
                                <li className={this.activeCls("/deposit")}><Link to="/deposit">存款</Link></li>
                                <li className={this.activeCls("/withdraw","/bindThirdPay")}><Link to="/withdraw">提款</Link></li>
                                <li className={this.activeCls("/person_bind_card")}><Link to="/person_bind_card">银行卡</Link></li>
                                <li className={this.activeCls("/transfer")}><Link to="/transfer">游戏转帐</Link></li>
                                <li className={this.activeCls("/records")}><Link to="/records">历史记录</Link></li>
                            </ul>
                        </div>
                        {/* 手机短信验证弹框 */}
                        <div id="PhoneVerifyModal" className="PhoneVerifyModal modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        &nbsp;&nbsp;手机短信验证
                                        <button type="button" id="PhoneModalClose" className="close" data-dismiss="modal">
                                            <i className="fa fa-close"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="modalbox">
                                            <label>手机号码：</label>
                                            <input type="number" disabled value={this.props.user.phone}/>
                                            <a className="callService" onClick={this.serversOpen.bind(this)}>联系在线客服</a>
                                        </div>
                                        <div className="modalbox">
                                            <label>验证码：</label>
                                            <input ref="inputVCode" type="number" placeholder="请输入验证码"/>
                                            <a onClick={this.getPhoneCode.bind(this)} >{this.state.sendPhoneVerifyButtonMes}</a>
                                        </div>
                                        <button onClick={this.onSubmitPhone.bind(this)} type="submit">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 邮箱短信验证弹框 */}
                        <div id="EmailVerifyModal" className="EmailVerifyModal modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        &nbsp;&nbsp;邮箱验证
                                        <button type="button" id="EmailModalClose" className="close" data-dismiss="modal">
                                            <i className="fa fa-close"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="modalbox">
                                            <label>邮箱：</label>
                                            <input type="email" disabled value={this.props.user.email}/>
                                            <a className="callService" onClick={this.serversOpen.bind(this)}>联系在线客服</a>
                                        </div>
                                        <div className="modalbox">
                                            <label>验证码：</label>
                                            <input ref="emailVCode" type="email" placeholder="请输入验证码"/>
                                            <a onClick={this.getEmailCode.bind(this)} >{this.state.sendEmailVerifyButtonMes}</a>
                                        </div>
                                        <button onClick={this.onSubmitEmail.bind(this)} type="submit">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 路由内容 */}
                    <div className="accountCon">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        remoteSysConfs:state.remoteSysConfs,
        game : state.game,
        platforms: state.game.platforms.filter((item)=>{
            if(item.Enabled){
                return item;// 各个平台
            }
        })
    }
);

export default connect(mapStateToProps) (MemberFrame);