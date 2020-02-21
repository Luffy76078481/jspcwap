/**
 *  
 * 
 *      修改密码公共组件
 */

import React, {Component} from 'react';
import {PassWord} from 'pui'; // 自定义微型组件
import { browserHistory } from 'react-router';

export class ChangePwdComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldWithdrawalPwd:"0000", // 取款原密码（下拉类型）
            WithdrawalPwd:"0000",    // 修改的取款密码（下拉类型）
        }
    }
    // 提交修改密码
    onSubmit(e) {
        e.preventDefault();
        // 支付密码
        if(this.props.isPayPassword){
            //  如果不是新站，-原始支付密码判空
            if(!window.config.isNewSite && !this.refs.oldPassword.value){
                window.swal("错误", "未输入原密码", "error");
                return;
            }
        }else{ 
            // 登录密码判空
            if(!this.refs.oldPassword.value){
                window.swal("错误", "未输入原密码", "error");
                return;
            }
            // 新登录密码判空
            if (!this.refs.password.value) {
                window.swal("错误", "未输入新密码", "error");
                return;
            }
            // 两次密码输入判断
            if (this.refs.password.value !== this.refs.password2.value) {
                window.swal("错误", "新密码与确认密码不匹配", "error");
                return;
            }            
        }
        // 输入的原始密码
        let oldPassword = window.config.isNewSite?this.state.oldWithdrawalPwd:this.refs.oldPassword.value;
        // 修改的新密码
        let newPassWord = this.props.isPayPassword?this.state.WithdrawalPwd:this.refs.password.value;
        new this.actionCls(oldPassword,newPassWord).fly(
            res=>{
                if(res.StatusCode === 0){
                    setTimeout(()=>{
                        browserHistory.replace("/member")
                    },500)
                }else{
                    window.swal("修改失败", res.Message, "error");
                }
            }
        );
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label>{this.title}原密码：</label>
                    {
                        // 取款密码并且为新站（isNewSite判断），为Select下拉类型，非input。
                        window.config.isNewSite && this.title == "取款"?
                        <PassWord defaultVal = {[0,0,0,0]} getVal={val=>{ this.setState({oldWithdrawalPwd:val})}}/>:
                        <input ref="oldPassword" type="password"/>
                    }
                </div>
                <div className="form-group">
                    <label>{this.title}新密码：</label>    
                    {
                        this.props.isPayPassword?
                        <PassWord defaultVal = {[0,0,0,0]} getVal={val=>{ this.setState({WithdrawalPwd:val})}}/>:
                        <input ref="password" type="password"  placeholder="密码必须为6-12位数字和字母的组合"/> 
                    }              
                </div>
                <div className="form-group" style={{"height":"36px"}}>
                    {
                        this.props.isPayPassword?
                        <label></label>:
                        <label>{this.title}确认密码：</label>
                    }                
                    {
                        (
                            ()=>{
                                if(this.props.isPayPassword){
                                    return null
                                }
                                else{
                                    return(
                                        <input ref="password2" type="password"  placeholder="请再次输入密码"/>
                                    )
                                }
                            }                            
                        )()
                    } 
                </div>
                <div className="form-group mt30" >
                    <button className="SubBut">提交</button><br/>
                </div>
            </form>
        );
    }
}


export default ChangePwdComponent;