import React, { Component } from 'react';
import {NavBar, Icon, InputItem, Toast, List, Modal, Picker} from 'antd-mobile';
import {browserHistory} from 'react-router';
import connect from "react-redux/es/connect/connect";
import './EditPassword.scss';
import {NumPicker} from 'pui';


class EditPassword extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
        this.state={
            type: this.props.routeParams.editType,//如果type为1:修改登录密码,2:修改支付密码
            log_password: false,
            newPassword: false,
            newPassword2: false,
            pay_password: false,
            newPayPassword: false,
            newPayPassword2: false,
            old_with_pwd: ['0','0','0','0'],
            new_with_pwd: ['0','0','0','0'],
            confirm_new_pwd: ['0','0','0','0'],
        }
    }

    componentDidMount(){

    }

    //修改登录密码
    onEditLogPwd = event => {
        event.preventDefault();
        let checknom = 0;
        let log_password = this.refs.log_password.state.value; //旧密码
        let newPassword = this.refs.newPassword.state.value;
        let newPassword2 = this.refs.newPassword2.state.value;

        if(!log_password){ //旧密码为空,报错提示
            this.setState({ log_password:true });
            checknom++;
        }
        if(!newPassword || log_password === newPassword){ //新密码为空,或新密码==旧密码,报错提示
            this.setState({ newPassword:true });
            checknom++;
        }
        if(!newPassword2 || newPassword!=newPassword2){ //确认新密码为空,或新密码!==新密码,报错提示
            this.setState({
                newPassword2:true
            });
            checknom++;
        }
        if(checknom!=0){
            return;
        }
        if(!this.submitStateLock) return;
        this.submitStateLock=false;
        Toast.loading('密码修改中,请稍后...');
        new window.actions.ApiChangePwdAction (log_password,newPassword).fly((respond)=>{
            Toast.hide();
            this.submitStateLock=true;
            if (respond.StatusCode === 0) {
                Modal.alert('密码修改成功,请重新登录!','',
                    [
                        {
                            text: '确定',
                            onPress: ()=>{
                                new window.actions.LogoutAction().fly();
                                window.wapHistoryType.push('/');
                                window.wapHistoryType.push('/login');
                            }
                        }
                    ]
                )
            }else{
                Modal.alert("密码修改失败！", respond.Message);
            }
        })
    }
    //修改提款密码
    onEditMoneyPwd = event => {
        event.preventDefault();
        let checknom = 0;
        let pay_password = this.refs.pay_password.state.value; //旧密码
        let newPayPassword = this.state.new_with_pwd.join('');
        // let newPayPassword2 = this.state.confirm_new_pwd.join('');
        
        if(!pay_password){ //旧密码为空,报错提示
            this.setState({ pay_password:true });
            checknom++;
        }
        if(!newPayPassword || pay_password === newPayPassword){ //新密码为空,或新密码==旧密码,报错提示
            this.setState({ newPayPassword:true });
            checknom++;
        }
        if(checknom!=0){
            return;
        }

        if(!this.submitStateLock) return;
        this.submitStateLock=false;
        Toast.loading('密码修改中,请稍后...');

        new window.actions.ApiChangePayPwdAction (pay_password ,newPayPassword).fly((respond)=>{
            Toast.hide();
            this.submitStateLock=true;
            if (respond.StatusCode === 0) {
                window.wapHistoryType.goBack();
            } else {
                Modal.alert("密码修改失败！", respond.Message);
            }
        });
    }

    //错误信息提示
    errorInfos(which){
        let log_password = this.refs.log_password.state.value;
        let newPassword = this.refs.newPassword.state.value;

        let pay_password = this.refs.pay_password.state.value;
        let new_with_pwd = this.state.new_with_pwd.join('');
        let confirm_new_pwd = this.state.confirm_new_pwd.join('');

        //旧登录密码
        if(this.state.log_password && which == "log_password"){
            if(log_password == ""){
                Toast.info('请填写旧密码！');
            }else{
                Toast.info('旧密码长度必须为6-12位！')
            }
        }
        //新登录密码
        if(this.state.newPassword && which=="newPassword"){
            if(newPassword == ""){
                Toast.info('请填写新密码！');
            }else if(newPassword.length < 6){
                Toast.info('新密码长度必须为6-12位！')
            }else{
                Toast.info('新密码于旧密码不能相同！')
            }
        }
        //确认新登录密码
        if(this.state.newPassword2 && which=="newPassword2"){
            Toast.info('两次输入的新密码不相符！');
        }

        //旧取款密码
        if(this.state.pay_password && which == "pay_password"){
            if(pay_password == ""){
                Toast.info('请填写旧密码！');
            }else{
                Toast.info('旧密码长度必须为6-12位！')
            }
        }
        //新取款密码
        if(this.state.newPayPassword && which=="newPayPassword"){
            if(new_with_pwd == pay_password){
                Toast.info('新密码与旧密码不能相同！')
            }
        }
    }
    /* 输入验证 */
    validateInput(which,val){
        //旧登陆密码
        if(which =="log_password"){
            if(val == "" || val.length < 6){
                this.setState({ log_password: true })
            }else{
                this.setState({ log_password: false });
            }
        }
        //新登录密码
        if( which == "newPassword"){
            let oldVal = this.refs.log_password.state.value;
            if(val == "" || val.length < 6 || oldVal === val){
                this.setState({ newPassword: true })
            }else{
                this.setState({ newPassword: false });
            }
        }
        //确认登录密码
        if(which == "newPassword2"){
            let oldVal = this.refs.newPassword.state.value;
            if(val=="" ||oldVal !== val){
                this.setState({ newPassword2:true })
            }else{
                this.setState({ newPassword2:false });
            }
        }
        //旧取款密码
        if(which =="pay_password"){
            if(val == ""){
                this.setState({ pay_password: true })
            }else{
                this.setState({ pay_password: false });
            }
        }
        //新取款密码
        if( which == "newPayPassword"){
            let val = this.state.new_with_pwd.join('');
            let oldVal = this.refs.pay_password.state.value;
            if(val == "" || oldVal === val){
                this.setState({ newPassword:true })
            }else{
                this.setState({ newPassword: false });
            }
        }
    }

    render(){
        return(
            <div className="EditPassword">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push('/myPage')}
                >安全中心</NavBar>
                <div className="scroll-content">
                    <form onSubmit={this.onEditLogPwd}>
                        <List className="formCon">
                            <div className='edit_log_pwd'>
                                <InputItem
                                    placeholder="旧密码（必填，长度6到12位）"
                                    clear
                                    maxLength={12}
                                    type="password"
                                    ref="log_password"
                                    error={this.state.log_password}
                                    onErrorClick={this.errorInfos.bind(this,'log_password')}
                                    onChange={this.validateInput.bind(this,'log_password')}
                                >
                                    <label className="label">旧登录密码</label>
                                </InputItem>
                                <InputItem
                                    placeholder="新密码（必填，长度6到12位）"
                                    clear
                                    maxLength={12}
                                    type="password"
                                    ref="newPassword"
                                    error={this.state.newPassword}
                                    onErrorClick={this.errorInfos.bind(this,'newPassword')}
                                    onChange={this.validateInput.bind(this,'newPassword')}
                                >
                                    <label className="label">确认新密码</label>
                                </InputItem>
                                <InputItem
                                    placeholder="确认新密码"
                                    clear
                                    maxLength={12}
                                    type="password"
                                    ref="newPassword2"
                                    error={this.state.newPassword2}
                                    onErrorClick={this.errorInfos.bind(this,'newPassword2')}
                                    onChange={this.validateInput.bind(this,'newPassword2')}
                                >
                                    <label className="label">确认新密码</label>
                                </InputItem>
                                <button className="btn">确认修改</button>
                            </div>
                        </List>
                    </form>
                    <form onSubmit={this.onEditMoneyPwd}>
                        <List className="formCon">
                            <div className='edit_pay_pwd'>
                                <InputItem
                                    placeholder="旧密码（必填）"
                                    clear
                                    maxLength={12}
                                    type="password"
                                    ref="pay_password"
                                    error={this.state.pay_password}
                                    onErrorClick={this.errorInfos.bind(this,'pay_password')}
                                    onChange={this.validateInput.bind(this,'pay_password')}
                                >
                                    <label className="label">旧取款密码</label>
                                </InputItem>

                                <NumPicker 
                                    value={this.state.new_with_pwd}
                                    onOk={v=>this.setState({new_with_pwd: v})}
                                    error={this.state.newPayPassword}
                                    onErrorClick={this.errorInfos.bind(this,'newPayPassword')}
                                    onChange={this.validateInput.bind(this,'newPayPassword')}
                                    tipText='新取款密码'
                                />
                                <button className="btn">确认修改</button>
                            </div>
                        </List>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
    }
);

export default connect(mapStateToProps)(EditPassword)