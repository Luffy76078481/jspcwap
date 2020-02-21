

import React, {Component} from 'react';
import "./PasswordAlert.scss";
import {PassWord} from 'pui';

export default class PasswordAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trueName:"",
            inputType: 1,
            WithdrawalPwd:"0000"
        }
    }  
    render() {
        return (
            <div className="PasswordAlert">
                <div className="alertBox">
                    <p>账号安全验证</p>
                    {this.swicthInput()}
                </div>
            </div>
        )
    }
    swicthInput(){
        if(this.state.inputType === 1){//第一步验证真实姓名
            return(
                <div className='alertContent'>
                    <div className='info mt10'>
                        <span>真实姓名:</span>
                        <input type="text" placeholder="请输入您的真实姓名" onChange={e=>{this.setState({trueName:e.target.value})}}/>
                    </div>
                    <div className='text-center mt20'>
                        <button className='mr5'>联系客服</button>
                        <button onClick={this.verifyName.bind(this)}>下一步</button>                        
                    </div>
                </div>
            )
        }else{//第二步重置取款密码
            return(
                <div className='mt20 text-center'>
                    <span>重置收款密码:</span>
                    <PassWord
                    defaultVal = {[0,0,0,0]}
                    getVal={val=>{
                        this.setState({
                            WithdrawalPwd:val
                        });
                    }}/>
                    <br/>
                    <button className='mt20' onClick={this.changePass.bind(this)}>确定</button>
                </div>
            )
        }     
    }
    verifyName(){//先验证真实姓名
        if(!!!this.state.trueName){
            swal("真实姓名不能为空");
            return;
        }

        let obj = {...this.props.checkVal,trueName:this.state.trueName}
        new window.actions.ApiCheckTrueNameAction(obj).fly(resp=>{
            if(resp.StatusCode === 0){//验证成功先登录再下一步重置密码
                this.onLogin();
                this.setState({
                    inputType:2
                });
            }else{//否则提示
                swal("用户名错误,请重试或联系在线客服")
            }
        });
    }

    onLogin() {
        new window.actions.ApiLoginAction(this.props.checkVal.userName,this.props.checkVal.cipher).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiBankAccountsAction().fly();
            }else if(resp.StatusCode === 1 ){
                swal(resp.Message)
            }
        });
    }
    changePass(){//修改取款密码
        new window.actions.ApiChangePayPwdAction("0000",this.state.WithdrawalPwd).fly(resp=>{
            console.log(resp);
            if(resp.StatusCode === 0){
                swal("验证成功")
                this.props.closeWindow();
            }else{//否则提示
                swal(resp.Message)
            }
        });
    }
}