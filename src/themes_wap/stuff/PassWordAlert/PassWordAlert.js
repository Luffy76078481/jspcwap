
/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                首页-业务逻辑难度为：★★
          
*/



import React, { Component } from 'react';
import {Modal} from "antd-mobile";
import connect from "react-redux/es/connect/connect";
import {NumIconPicker} from 'pui';
import "./PassWordAlert.scss"

class PassWordAlert extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
        this.state = {
            trueName:"",
            inputType: 1,
            withdrawalPassword:['0','0','0','0'],
        }
    }
    verifyName(){//先验证真实姓名
        if(!!!this.state.trueName){
            Modal.alert('真实姓名不能为空')
            return;
        }
        let obj = {...this.props.needCheck,trueName:this.state.trueName}
        new window.actions.ApiCheckTrueNameAction(obj).fly(resp=>{
            if(resp.StatusCode === 0){//验证成功先登录再下一步重置密码
                this.onLogin(this);
                this.setState({
                    inputType:2
                });
            }else{//否则提示
                Modal.alert('用户名错误,请重试或联系在线客服')
            }
        });
    }
    swicthInput(){
        if(this.state.inputType === 1){//第一步验证真实姓名
            return(
                <div className='alertContent'>
                    <div className='info'>
                        <label>真实姓名:</label>
                        <input type="text" placeholder="请输入您的真实姓名" onChange={e=>{this.setState({trueName:e.target.value})}}/>
                    </div>
                    <div>
                        <button>联系客服</button>
                        <button onClick={this.verifyName.bind(this)}>下一步</button>                        
                    </div>
                </div>
            )
        }else{//第二步重置取款密码
            return(
                <div className='secondDoing'>
                    <NumIconPicker
                    
                        value={this.state.withdrawalPassword}
                        onOk={v=>{
                            this.setState({
                                withdrawalPassword:v
                            })
                        }}
                        tipText={'支付密码重置'}
                    />
                    <button onClick={this.changePass.bind(this)}>确定</button>
                </div>
            )
        }  
    }
    changePass(){//修改取款密码
        new window.actions.ApiChangePayPwdAction("0000",this.state.withdrawalPassword.join('')).fly(resp=>{
            if(resp.StatusCode === 0){
                Modal.alert('验证成功!')
                this.props.closeWindow();
            }else{//否则提示
                Modal.alert(resp.Message)
            }
        });
    }
    onLogin() {
        new window.actions.ApiLoginAction(this.props.needCheck.userName,this.props.needCheck.cipher).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiPlayerInfoAction().fly();
                new window.actions.ApiBankAccountsAction().fly();
            }else if(resp.StatusCode === 1 ){
                Modal.alert(resp.Message)
            }
        });
    }
    render(){
        return (
            <div className='passwordAlert'>
                <div className='FrameMask'></div>
                <div className="passwordChange">
                    <div className='title'>
                        账号安全验证
                        {/* <a className="close"></a> */}
                    </div>
                    <div className='contents'>
                        {this.swicthInput()}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps)(PassWordAlert)