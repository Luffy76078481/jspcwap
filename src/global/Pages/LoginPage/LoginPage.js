
import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import './LoginPage.scss'

class LoginPage extends Component {
    constructor (props){
        super();
        this.state = {
            errorPassword:false,
            reqLock:false, // 防止连续点击登录，锁
        }
    }
    // 登录
    onLogin(e) {
        e.preventDefault();
        if(this.state.reqLock)
        return;
        this.state.reqLock =true;
        var _self = this;
        new window.actions.ApiLoginAction(this.refs.username.value,this.refs.password.value).fly(resp=>{
           if (resp.StatusCode === 0) {
               location.reload();
            } else {
                this.setState({
                    errorPassword : true
                })
            }
            _self.state.reqLock = false;
        });
    }
    // 点击注册关闭登录弹窗
    regis(e){
        e.preventDefault();
        window.$(this.refs.dlg).modal("hide");
        browserHistory.push('/register')
    }
    // 关闭登录弹窗
    close(){
        this.setState({
            errorPassword:false
        })
    }
    render() {
        return (
            <div ref="dlg" id="reserveDialog_login" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content custom_modal_content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" onClick={()=>{this.close()}}>
                                <i className="fa fa-times" />
                            </button>
                            <h4 className="modal-title">
                                {
                                    window.config.spec == "dafa-bt6" || window.config.spec== "dafa-ldl"?null:"会员登录"
                                }
                            </h4>
                        </div>
                        <div className="modal-body" >
                            <form className='text-center' onSubmit={this.onLogin.bind(this)}>             
                                <div className='mb10'>
                                    <p>用户名</p>
                                    {
                                        window.config.spec == "bet365-bbt"?               
                                        <input ref="username" type="text" placeholder="用户名"/>
                                        :
                                        <input ref="username" type="text" placeholder="6-12位由字母和数字组成"/>
                                    }
                                </div>
                                <div className='mb10'>
                                    <p>密码</p>
                                    {
                                        window.config.spec == "bet365-bbt"?
                                        <input ref="password" type="password" placeholder="密码"/>
                                        :
                                        <input ref="password" type="password" placeholder="6-12位由字母和数字组成"/>
                                    }
                                </div>
                                <div className='i-block mr5'>
                                    <button type="Submit" className="loginbtn">登录</button>
                                    {
                                        (window.config.spec == 'dafa-bt6' || window.config.spec== "dafa-ldl") 
                                        && this.state.errorPassword?<span style={{display: 'block',marginTop:'20px'}}>
                                        用户名或密码错误</span>:null
                                    }
                                </div>
                                <div className='i-block ml5'>
                                    <button type="button" className="regisbtn" onClick={this.regis.bind(this)}>注册</button>                                                                                                  
                                </div>                                  
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        login: state.login,
        sitemsg: state.sitemsg,
        global:state.global,
        remoteSysConfs:state.remoteSysConfs,
        verifycode: state.verifycode
    }
);

export default connect(mapStateToProps)(LoginPage) ;