/*

    个人中心1 ==> 取款页
*/ 

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router'
import {ApiWithdrawAction} from "globalAction";
import {PassWord} from 'pui'; // 自定义微型组件
import {transferAllOut} from './transferAllOut'

class TransferPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            accountValue:this.props.user.bankAccounts.length>0?this.props.user.bankAccounts[0].Id:null,
            PayType:"",
            WithdrawalPwd:"0000",
            Audit:0 // 稽核数
        }
    }
    componentDidMount(){
        new window.actions.ApiBankAccountsAction().fly();//银行
        new window.actions.ApiGetAuditAction().fly(resp=>{
            this.setState({
                Audit:resp.TotalFee>1?resp.TotalFee:0
            })
        });
        new actions.ApiGamePlatformAllBalanceAction().fly(res=>{
            if(this.props.user.AutoTransfer){
                transferAllOut(this.props.platforms,false)
            }
        })
    }
    componentWillReceiveProps(nextProps){
        
    }
    // 提款
    onSubmit(e) {
        // 新个人中心用Swal2
        e.preventDefault();
        let self = this;
        let accountValue = this.state.accountValue;// 選擇的銀行ID
        if (!this.refs.amount.value) {
            window.swal("温馨提示", "未输出提款金额", "error");
            return;
        }
        if( parseInt(this.refs.amount.value) < 100){
            window.swal("温馨提示", "最小的金额不得小于100", "error");
            return;
        }
        if(this.props.user.amount < this.refs.amount.value){
            window.swal("温馨提示", "提款金额大于账户余额", "error");
            return;
        }
        if (!accountValue) {
            window.swal("温馨提示", "提款帐号未指定", "error");
            return;
        }
        // 老站点验证输入框密码，新站为下拉。
        if (!window.config.isNewSite && !this.refs.password.value) {
            window.swal("温馨提示", "提款密码未输入", "error");
            return;
        }
        if (!this.props.user.verfyPhone && this.props.backConfigs.IsBindingPhone ) {
            window.swal({
                title: "无法取款",
                text: "因为没有验证手机号码，需验证手机号码即可执行取款操作",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "手机验证",
                showCancelButton: true,
                cancelButtonText: "关闭",
            },
            ()=>{
                document.getElementById("shwoPhone").click();// 头部手机图标，不要迷路了
            });
            return;
        }
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        let getAmount = this.refs.amount.value;// 提款金额
        let filter = {
            BankAccountId:accountValue,
            Amount:this.refs.amount.value,
            WithdrawalPwd:window.config.isNewSite?this.state.WithdrawalPwd:this.refs.password.value,// 老站取输入框值，新站取下拉框值
            CodeType:this.state.PayType,
            UserAuditConfirm:false,
        };
        new window.actions.ApiWithdrawAction(filter).fly(resp=>{
            // 首先判断成功，如果成功，直接不做以下处理
            if (resp.Success) {
                Swal.fire({
                    title: '<strong>您的提款成功</strong>',
                    type: 'success',
                    confirmButtonText:  '回到首页',
                    cancelButtonText:  '继续提款',
                    showCancelButton: true,
                    showCloseButton: true,
                    focusConfirm: false,
                    cancelButtonAriaLabel:'down'
                }).then((result)=>{
                    if(result.value){
                        location.href = '/';
                    }
                })
                self.state.reqLock = false;
                return;
            }     
            // 没有成功 ，需要完成稽核
            if (resp.NeedToAudit && resp.TotalFee>0 && resp.StatusCode == 0) {
                if(getAmount - resp.TotalFee<100){
                    window.swal("错误","提款金额不足。 您的稽核未完成，提款需核减稽核金额¥"+resp.TotalFee, "error");
                }else if(resp.AllowWithdrawals){
                    window.swal({
                        title: "提款稽核确认",
                        text: "<span class='jihe-text'>" + "提款需核减金额¥"+ resp.TotalFee + ", 实际提款金额¥" +(getAmount - resp.TotalFee) + "</span>",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#c5841f",
                        confirmButtonText: "确认",
                        cancelButtonText: "取消",
                        closeOnConfirm: true,
                        closeOnCancel: true,
                        html: true
                    },
                    function(isConfirm){
                        if(isConfirm){
                            let filtertwo = {
                                BankAccountId:accountValue,
                                Amount:self.refs.amount.value,
                                WithdrawalPwd:window.config.isNewSite?this.state.WithdrawalPwd:self.refs.password.value,// 老站取输入框值，新站取下拉框值
                                CodeType:self.state.PayType,
                                UserAuditConfirm:true
                            };
                            new ApiWithdrawAction(filtertwo).fly(resp=>{
                                if (resp.StatusCode === 0) {
                                    window.swal({
                                        title: "提款成功",
                                        text: "",
                                        confirmButtonColor: "#c5841f",
                                        confirmButtonText: "前往游戏",
                                        showCancelButton: true,
                                        cancelButtonText: "继续提款",
                                    },
                                    ()=>{
                                        location.href = '/';
                                    });
                                }
                            });
                        }else{
                            new UnLoadingMsgAction("withdraw").fly();
                        }
                    });
                }else{
                    window.swal("错误","您的稽核未完成，提款需核减稽核金额¥"+resp.TotalFee, "error");
                } 
            }else{
                window.swal("错误",resp.Message+(resp.StatusCode) || "提款申请失败"+(resp.StatusCode), "error");
            }
            self.state.reqLock = false;
        });
    }
    // 选择银行
    changeAccountValue(PayType,e){
        let accountValue = e.currentTarget.id;
        this.setState({
            accountValue:accountValue,
            PayType
        })
    }
    // 绑定的银行
    renderAccounts() {
        var ret = [];
        if (this.props.user.bankAccounts) {
            for (var i = 0; i < this.props.user.bankAccounts.length; i++) {
                var account = this.props.user.bankAccounts[i];
                ret.push(
                    <div key={i} className={this.state.accountValue==account.Id?"bankOptions isSel":"bankOptions"} id={account.Id} onClick={this.changeAccountValue.bind(this,account.PayType)}>
                        {account.Bank.BankName + " [************" + account.AccountNo.substr(-4) + "]"}
                        <div className="selCard"></div>
                    </div>
                );
            }
        }
        return ret;
    }
    render() {
        return (
            <div className="WithdrawPage p20">         
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="mb20">
                        <label>提款金额：</label>           
                        <input ref="amount" type="number" placeholder="请输入提款金额"/> 
                        <span className="FontColor ml10 f14">单笔最低提款100元，{this.state.Audit>0?`您的稽核金额${this.state.Audit}`:""}</span>
                    </div>
                    <div className="mb20">
                        <label>提款密码：</label>
                        {
                            window.config.isNewSite?
                            <PassWord
                                defaultVal = {[0,0,0,0]}
                                getVal={val=>{
                                    this.setState({
                                        WithdrawalPwd:val
                                    })
                                }}
                            />:
                            <input ref="password" type="password" placeholder="请输入提款密码"/>
                        }
                    </div>
                    <div className="mb20">
                        <label>提款帐号：</label>
                        <div className="accountBanks">         
                            {
                                this.renderAccounts()
                            }
                            <br className="clear"></br>
                            <Link to="/person_bind_card" className="addBanks">+ 添加银行卡</Link>                
                            {/* <Link to="/bindThirdPay" className="addPay">+ 添加支付宝、微信二维码</Link>       */}
                            <br className="clear"></br>         
                            <br/> 
                            <span className="FontColor f14">
                                *初始提款密码默认为登录密码或者0000，为了保障资金安全，
                                建议您立即去修改密码页面重新修改
                                <Link to='/editPassWord'>设置提款密码。</Link>
                            </span>
                        </div>
                    </div>
                    <button className="WithdrawButton SubBut">提交</button>
                </form>         
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        game: state.game,
        backConfigs:state.backConfigs,
        platforms: state.game.platforms.filter((item)=>{
            if(item.Enabled){
                return item;// 各个平台
            }
        })
    }
);


export default connect(mapStateToProps, {})(TransferPage);