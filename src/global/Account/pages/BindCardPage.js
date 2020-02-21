/**
 *   个人中心1-绑定银行卡             ==> 新站共用
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link ,browserHistory} from 'react-router'
import PlaceComponent from "./PlaceComponent";
import {PassWord} from 'pui';
class BindCardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickFlag:false, // 锁
            bankNum:"", // 银行账号 inputVal
            accountName:this.props.user.realName?this.props.user.realName:"", // 账户名称 InputVal
            branchName:"", // 支行地址 InputVal
            WithdrawalPwd:"0000"
        }
    }
    componentDidMount() {
        new window.actions.ApiBankAccountsAction().fly(); // 获取会员绑定的银行卡
    }
    // 刷新
    reload() {
        new window.actions.ApiBankAccountsAction().fly(); // 获取会员绑定的银行卡
        new window.actions.ApiPlayerInfoAction().fly();// 刷新个人信息 
    }
    isChinese(str) {
        var han = /^[\u4e00-\u9fa5]+$/;
        if (!han.test(str)) {
            return false;
        };
        return true;
    }
    // Input修改状态
    handleChange(val,event){
        this.setState({
            [val]:event.target.value
        })
    }
    //  提交绑定
    onSubmit(e) {
        e.preventDefault();
        if(this.state.clickFlag)return;
        this.state.clickFlag = true;
        let that = this;
        //return
        // 如果没有真实姓名
        if(!this.props.user.realName){
            let trueName = this.state.accountName; // 用户输入的账户名
            if(!trueName){
                window.swal('错误',"为确保正常提款,请认真填写您的真实姓名",'error');
                this.state.clickFlag = false;
                return;
            }
            if(!this.isChinese(trueName)){
                window.swal("输入错误","请输入中文的真实姓名","error");
                return
            }
            // 修改用户真实姓名
            new window.actions.ApiUpdateInfoAction(trueName).fly((resp)=>{
                if(resp.StatusCode === 0){
                    // 修改完信息后再绑定银行卡
                    new window.actions.ApiBindCardAction(
                    {
                        BankId:this.refs.bank.value,
                        Province:this.refs.place.getSelProvince(),
                        City:this.refs.place.getSelCity(),
                        BranchName:this.state.branchName, // 支行
                        AccountNo:this.state.bankNum, // 银行卡号
                        AccountName:trueName
                    }
                    ).fly(resp=>{
                        if (resp.StatusCode === 0) {
                            that.reload();
                            browserHistory.replace("/withdraw")
                        }else{
                            window.swal('错误',resp.Message,'error');
                        }
                    });
                }else{
                    window.swal('错误',resp.Message,'error');
                }
            })
        }else{
            let obj = {
                BankId:this.refs.bank.value, // 银行ID
                Province:this.refs.place.getSelProvince(), // 开户省
                City:this.refs.place.getSelCity(),  // 开户城市
                BranchName:this.state.branchName, // 支行
                AccountNo:this.state.bankNum, // 银行卡号
                AccountName:this.props.user.realName // 真实姓名
            }
            if(!this.props.user.HasWithdrawalPassword){//首次设置取款密码
                obj.WithdrawalPwd = this.state.WithdrawalPwd;
            }
            new window.actions.ApiBindCardAction(obj).fly(resp=>{
                if (resp.StatusCode === 0) {
                    that.reload();
                    that.setState({
                        WithdrawalPwd:"0000",
                        bankNum:"",
                        accountName:that.props.user.realName?that.props.user.realName:"",
                        branchName:""
                    })
                }else{
                    window.swal('错误',resp.Message,'error');
                }
            });
        }
        this.state.clickFlag = false;
    }
    // 选择银行
    renderBankInfos (){
        var bankInfos = [];
        for (var i = 0; i < this.props.bankInfos.length; i++){
            var  bank = this.props.bankInfos [i] ;
            bankInfos.push(
                <option key={bank.Id} value={bank.Id}>{bank.BankName}</option>
            )
        }
        return bankInfos;
    }
    // 绑定的银行卡
    renderUserBank (){
        var ret = [];
        if (this.props.user.bankAccounts) {
            for (var j = 0; j < this.props.user.bankAccounts.length; j++) {
                var userBank = this.props.user.bankAccounts[j];
                if(userBank.PayType == 1){
                ret.push(<tr key={j}>
                    <td>{userBank.Bank.BankName}</td>
                    <td>{userBank.AccountName}</td>
                    <td>{ window.Util.AsteriskProcessing(userBank.AccountNo,'bank')}</td>
                    <td>{userBank.Province + " " + userBank.City}</td>
                    <td>{userBank.BranchName}</td>
                </tr>)
                }
            }
        }
        return ret;
    }
    render() {
        return (
        <div className="bindCardPage">     
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>开户银行</th>
                            <th>开户人 </th>
                            <th>帐号</th>
                            <th>开户地</th>
                            <th>开户支行</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.renderUserBank()
                        }
                    </tbody>
                </table>
            </div>  
            <form onSubmit={this.onSubmit.bind(this)} className='text-center'>
                <p className="title">绑定银行卡</p>
                <div className="mt20 mb20">
                    <label>选择银行: </label>
                    <select className="normalInput" ref='bank'>
                        {
                            this.renderBankInfos()
                        }
                    </select>
                </div>
                <PlaceComponent ref="place"/>
                <div className="mb20">
                    <label className="lbl">开户支行: </label>  
                    <input ref="branchName" type="text" placeholder="请输入开户支行名称" value={this.state.branchName} onChange = {this.handleChange.bind(this,"branchName")}/>
                </div>
                <div className="mb20">
                    <label className="lbl">账户名称: </label>
                    {
                        this.props.user.realName?
                        <input className="warning-placehoder" type="text" defaultValue={this.props.user.realName} readOnly/>   
                        :
                        <input className="warning-placehoder" type="text" value={this.state.accountName} onChange = {this.handleChange.bind(this,"accountName")} placeholder="对应您的真实姓名"/>
                    }
                </div>      
                {
                    !this.props.user.HasWithdrawalPassword &&
                    <div className="mb20">
                        <label className="lbl">取款密码: </label>
                        <PassWord
                        defaultVal = {[0,0,0,0]}
                        getVal={val=>{
                            this.setState({
                                WithdrawalPwd:val
                            });
                        }}/>
                    </div>
                }          
                <div className="mb20">
                    <label className="lbl">银行帐号: </label>
                    <input ref="accountNo" type="tel" placeholder="请输入银行卡号" value={this.state.bankNum} onChange = {this.handleChange.bind(this,"bankNum")} maxLength='19' minLength='16'/>
                </div>
                <span className="FontColor f14">
                    *初始提款密码默认为登录密码或0000，为了保障资金安全，建议您立即去修改密码页面重新修改
                    <Link to='/editPassWord'>设置提款密码。</Link>
                </span>
                <div className="mt20">
                    <Link to="/withdraw" className="SubBut mr10">返回提款</Link>
                    <button className="SubBut ml10">绑定新卡</button>
                </div>
            </form>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        bankInfos:state.bankInfos,
        user:state.user
    }
);

export default connect(mapStateToProps, {})(BindCardPage);