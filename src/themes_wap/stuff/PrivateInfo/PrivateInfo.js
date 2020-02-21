import React, { Component } from 'react';
import {NavBar, Icon, Modal, DatePicker, InputItem} from 'antd-mobile';
import {Link} from 'react-router';
import {wapAuth} from 'globalAction';
import connect from "react-redux/es/connect/connect";
import {config} from "globalConfig";
import './PrivateInfo.scss';
const prompt = Modal.prompt;

class PrivateInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendPhoneButtonMes: "获取",
            sendEmailButtonMes: "获取",
            input_code: '',
            emailVerifyCode:'',
            phoneVerifyClickFlag: false,
            emailVerifyClickFlag: false,
            submitFlag: false,
            timerPhoneCode: null,
            timerEmailCode: null,
            input_qq: '',
            input_email: '',
            input_phone:'',
            input_webChat: '',
            input_pwd: '',
            birthday: "",
        }
    }

    showBindPhoneModal = ()=> {
        $('#bindPhoneModal').fadeIn(500);
    }
    closeBindPhoneModal = ()=> {
        $('#bindPhoneModal').fadeOut(500)
    }
    showBindEmailModal = ()=> {
        $('#bindEmailModal').fadeIn(500);
    }
    closeBindEmailModal = ()=> {
        $('#bindEmailModal').fadeOut(500)
    }

    getPhoneCode = (e)=> {
        const phone_reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!phone_reg.test(this.props.user.phone)) {
            window.swal("错误", "手机号码错误，请联系在线客服");
            return;
        }
        if(this.state.phoneVerifyClickFlag)return;
        this.state.phoneVerifyClickFlag = true;
        if(this.state.timerPhoneCode){
            clearInterval(this.state.timerPhoneCode);
            this.state.timerPhoneCode = null;
        }
        new window.actions.ApiSendMobileVCodeAction().fly(resp=>{
            console.log(9999,resp)
            if(resp.StatusCode === 0){
                //window.swal("成功", "发送成功，请注意查收，今日还可发送短信"+resp.RemainCount+"次");
                window.swal("成功", "发送成功，请注意查收");
                this.state.timerPhoneCode = setInterval(()=>{
                    if(this.state.sendPhoneButtonMes == 1){
                        this.setState({sendPhoneButtonMes: "获取"})
                        this.state.phoneVerifyClickFlag = false; 
                        clearInterval(this.state.timerPhoneCode);
                        this.state.timerPhoneCode = null;
                        return;
                    }else{
                        if(typeof this.state.sendPhoneButtonMes === "string"){
                            this.setState({sendPhoneButtonMes: 60})
                        }else{
                            this.setState({sendPhoneButtonMes: this.state.sendPhoneButtonMes - 1})
                        }
                    }
                },1000)
                
            }else{
                window.swal("错误", resp.Message);
                this.state.phoneVerifyClickFlag = false;
            }
            
        })
    }

    getEmailCode = (e)=> {
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailReg.test(this.props.user.email)) {
            window.swal("错误", "邮箱格式错误，请联系在线客服");
            return;
        }

        if(this.state.emailVerifyClickFlag)return;
        this.state.emailVerifyClickFlag = true;
        if(this.state.timerEmailCode){
            clearInterval(this.state.timerEmailCode);
            this.state.timerEmailCode = null;
        }
        new window.actions.ApiSendEmailVCodeAction().fly(resp=>{
            if(resp.StatusCode === 0){
                //window.swal("成功", "发送成功，请注意查收，今日还可发送短信"+resp.RemainCount+"次");
                window.swal("成功", "发送成功，请注意查收");
                this.state.timerEmailCode = setInterval(()=>{
                    if(this.state.sendEmailButtonMes == 1){
                        this.setState({sendEmailButtonMes: "获取"})
                        this.state.emailVerifyClickFlag = false;
                        clearInterval(this.state.timerEmailCode);
                        this.state.timerEmailCode = null;
                        return;
                    }else{
                        if(typeof this.state.sendEmailButtonMes === "string"){
                            this.setState({sendEmailButtonMes: 60})
                        }else{
                            this.setState({sendEmailButtonMes: this.state.sendEmailButtonMes - 1})
                        }
                    }
                },1000)

            }else{
                window.swal("错误", resp.Message);
                this.state.emailVerifyClickFlag = false;
            }

        })
    }
    confirmBindPhone = (e)=> {
        let inputVCode = this.state.input_code;
        if(!inputVCode){
            window.swal("错误", "验证码不能为空");
            return;
        }

        if(this.state.submitFlag)return;
        this.state.submitFlag = true;
        new window.actions.ApiValidatePhoneAction(this.props.user.phone,inputVCode).fly(resp=>{
            if(resp.StatusCode === 0){
                $("#PhoneModalClose").trigger('click');
                new window.actions.ApiPlayerInfoAction().fly();
                window.swal("成功", "恭喜验证成功，现在您可以进行提款");
            }else{
                window.swal("错误", resp.Message);
            }
            this.state.submitFlag = false;
        });
    }

    confirmBindEmail = (e)=> {
        let emailVerifyCode = this.state.emailVerifyCode;
        if(!emailVerifyCode){
            window.swal("错误", "验证码不能为空");
            return;
        }

        if(this.state.submitFlag)return;
        this.state.submitFlag = true;
        new window.actions.ApiValidateEmailAction(this.props.user.email,emailVerifyCode).fly(resp=>{
            if(resp.StatusCode === 0){
                $("#EmailModalClose").trigger('click');
                new window.actions.ApiPlayerInfoAction().fly();
                window.swal("成功", "恭喜验证成功");
            }else{
                window.swal("错误", resp.Message);
            }
            this.state.submitFlag = false;
        });
    }

    serversOpen = (e)=> {
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=800,height=700,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    getPhoneInput(e) {
        e.preventDefault();
        this.setState({input_code: e.target.value})
    }

    getEmailInput(e) {
        e.preventDefault();
        this.setState({emailVerifyCode: e.target.value})
    }

    //QQ
    showQQModal = () => {
        if(!wapAuth(true)) return;
        $('.editQQ').fadeIn(500);
    }

    dismissQQModal = () => {
        $('.editQQ').fadeOut(500);
    }

    showBirthdayModal = () => {
        if(!wapAuth(true)) return;
        $('.editBirthday').fadeIn(500);
    }
    dismissBirthdayModal = () => {
        $('.editBirthday').fadeOut(500);
    }

    confirmQQ = ()=> {
        let {realName} = this.props.user;
        let qq = this.state.input_qq;

        if(!qq){
            window.swal("错误", "QQ不能为空!");
            return;
        }

        if(realName){
            new window.actions.ApiUpdateInfoAction(realName,qq).fly(res => {
                if(res.StatusCode ==0){
                    window.swal("QQ号修改成功!");
                    this.dismissQQModal();
                    new window.actions.ApiPlayerInfoAction().fly();
                }else {
                    window.swal("错误", resp.Message); 
                }
            })
        }
    }
    confirmBrithday = ()=> {
        let {realName} = this.props.user;
        let birthday = this.state.birthday;
        if(!birthday){
            window.swal("错误", "请填写生日");
            return;
        }

        if(realName){
            new window.actions.ApiUpdateInfoAction(realName,'','','',birthday).fly(res => {
                if(res.StatusCode ==0){
                    window.swal("生日修改成功");
                    this.dismissBirthdayModal();
                    new window.actions.ApiPlayerInfoAction().fly();
                }else {
                    window.swal("错误", resp.Message);
                }
            })
        }
    }

    getUserQQ = (e)=> {
        e.preventDefault();
        this.setState({input_qq: e.target.value})
    }

    //微信
    showWeChat = () => {
        if(!wapAuth(true)) return;
        $('.editWeChat').fadeIn(500);
    }
    closeWeChat = ()=> {
        $('.editWeChat').fadeOut(500);
    }
    getWeChat = (e)=> {
        e.preventDefault();
        this.setState({input_webChat: e.target.value})
    }
    confirmWeChat = ()=> {
        let {realName} = this.props.user;
        let webChat = this.state.input_webChat;

        if(!webChat){
            window.swal("错误", "微信不能为空!");
            return;
        }

        if(realName){
            new window.actions.ApiUpdateInfoAction(realName,'','',webChat).fly(res => {
                if(res.StatusCode ==0){
                    window.swal("微信修改成功!");
                    this.closeWeChat();
                    new window.actions.ApiPlayerInfoAction().fly();
                }else {
                    window.swal("错误", resp.Message); 
                }
            })
        }
    }
    
    getUserEmail = (e)=> {
        e.preventDefault();
        this.setState({input_email: e.target.value})
    }

    getUserPhone = (e)=> {
        e.preventDefault();
        this.setState({input_phone: e.target.value})
    }

    showEmailModal = () => {
        if(!wapAuth(true)) return;
        $('.editEmail').fadeIn(500);
    }

    dismissEmailModal = () => {
        $('.editEmail').fadeOut(500);
    }


    showPhoneModal = () => {
        if(!wapAuth(true)) return;
        $('.editPhone').fadeIn(500);
    }

    dismissPhoneModal = () => {
        $('.editPhone').fadeOut(500);
    }

    confirmEmail = ()=> {
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let {realName} = this.props.user;

        let email = this.state.input_email;
        if(!email){
            window.swal("错误", "邮箱不能为空!");
            return;
        }

        if (!emailReg.test(email)) {
            window.swal("错误", "邮箱格式错误，请联系在线客服");
            return;
        }

        if(realName) {
            new window.actions.ApiUpdateInfoAction(realName,'',email).fly(res => {
                if(res.StatusCode == 0){
                    window.swal("邮箱修改成功!");
                    this.dismissEmailModal();
                    new window.actions.ApiPlayerInfoAction().fly();
                }else {
                    window.swal("错误",res.Message);
                }
            })
        }
    }

    confirmPhone = ()=> {
        let {realName} = this.props.user;
        let phone = this.state.input_phone;

        if(!phone){
            window.swal("错误", "手机不能为空!");
            return;
        }
        if (!(/^1[1-9][0-9]\d{4,8}$/.test(phone))) {
            window.swal("错误", "手机号码格式错误!");
            return;
        }
        new window.actions.ApiUpdateInfoAction(realName,'','','','',phone).fly(res => {
            if(res.StatusCode == 0){
                window.swal("手机修改成功!");
                this.dismissPhoneModal();
                new window.actions.ApiPlayerInfoAction().fly();
            }else {
                window.swal("错误",res.Message);
            }
        })
    }

    //登录密码验证
    closeVerify = ()=> {
        $('.verify_log_pwd').fadeOut(500);
    }
    getLogPwd = (e)=> {
        e.preventDefault();
        this.setState({input_pwd: e.target.value})
    }
    confirmPwd = ()=> {

    }

    subString = value => {
        var strValue = value.toString();
        var len = strValue.length;
        var subVal,newVal;

        if(len <= 4){
            subVal = strValue.substring(0);
            newVal = strValue.replace(subVal,"****");
        }else if(len == 5){
            subVal = strValue.substring(1,5);
            newVal = strValue.replace(subVal,"****");
        }else if(len == 6){
            subVal = strValue.substring(1,5);
            newVal = strValue.replace(subVal,"****");
        }else if(len == 7){
            subVal = strValue.substring(2,6);
            newVal = strValue.replace(subVal,"****");
        }else {
            subVal = strValue.substring(3,len-4);
            newVal = strValue.replace(subVal,"****");
        }
        return newVal;
    }

    formatter = (value)=> { //格式化字符串
        var strValue = value.toString();
        var newVal;
        var i = strValue.indexOf('@');

        if(i == -1){
            newVal = this.subString(strValue);
        }else{
            let emailVal = strValue.substring(0,i); //获取@前面部分
            let newEmail = this.subString(emailVal);    //获取隐藏后@前面部分
            newVal = newEmail + strValue.substring(i);
        }
        return newVal;
    }

    validateInput(val) {
        this.setState({
            birthday: val.format("yyyy-MM-dd")
        });
    }

    render(){
        let {qq,email,verfyPhone,verfyEmail,username,realName,webChat,phone,birthday} = this.props.user;
        let newWebChat = this.formatter(webChat);
        let newQQ = this.formatter(qq);
        let newPhone = this.formatter(phone);
        let newEmail = this.formatter(email);
        let {backConfigs} = this.props;
 

        let winHeight = $(window).height();
        birthday = birthday ? birthday.substr(0, 10) : '****';

        $(window).resize(function(){
            let thisHeight = $(this).height();
            if(winHeight - thisHeight > 50){
                $('.modal-dialog').css({'top':'1.1rem','transform':'translateY(0)','height':'86vh'});
                $('.footerBar').css({'display':'block'});
            }else {
                $('.modal-dialog').css({'top':'50%','transform':'translateY(-50%)','height':'33vh'});
            }
        })

        const CustomChildren = ({extra, onClick, children}) => (
            <InputItem
                placeholder={extra}
                value={this.state.birthday}
                onClick={onClick}
            >
                {children}
            </InputItem>
        );

        return(
            <div className="PrivateInfo">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.goBack()}
                >个人资料</NavBar>
                <div className="scroll-content">
                    <div className='item_box'>
                        <div className='line'>
                            <span className="title">游戏账号</span>
                            <span className="content">{username}</span>
                        </div>
                        <div className='line_no_btm'>
                            <span className="title">真实姓名</span>
                            <span>{realName}</span>
                        </div>
                    </div>
                    <div className='item_box'>
                        <div className='line no_bottom_border' style={{paddingTop:0}}>
                            <span className="title">生日</span>
                            <span className='content'>{birthday}</span>
                            {
                                birthday === '****' ? <span className="edit" onClick={()=>this.showBirthdayModal()}>修改生日<i className='icon icon-pencil'/></span> : null

                            }
                        </div>
                    </div>
                    <div className='item_box'>
                        <div className='line'>
                            <span className="title">微信</span>
                            <span className='content'>{newWebChat}</span>
                            {
                                webChat ? null:<span className="edit" onClick={()=>this.showWeChat()}>修改微信<i className='icon icon-pencil'/></span>
                            }
                        </div>
                        <div className='line no_bottom_border'>
                            <span className="title">QQ</span>
                            <span className='content'>{newQQ}</span>
                            {
                                qq ? null:<span className="edit" onClick={()=>this.showQQModal()}>修改QQ<i className='icon icon-pencil'/></span>
                            }
                        </div>
                    </div>
                    <div className='item_box'>
                        <div className='line'>
                            <span className="title">手机号码</span>
                            <span className="content">{newPhone}</span>
                            {
                                phone ?
                                    (
                                        config.gameTag === 'BEE' ?
                                            null
                                            :
                                            (verfyPhone ? <i className='verified'>已验证</i> : <i className='unverified' onClick={() => this.showBindPhoneModal()}>未验证</i>)
                                    )
                                    :
                                    <span className="edit" onClick={() => this.showPhoneModal()}>填写手机<i
                                        className='icon icon-pencil'/></span>
                            }
                        </div>
                        <div className='line no_bottom_border'>
                            <span className="title">电子邮箱</span>
                            <span className='content'>{newEmail}</span>
                            {
                                email ?
                                    (
                                       verfyEmail ? <i className='verified'>已验证</i> : <i className='unverified' onClick={()=>this.showBindEmailModal()}>未验证</i>
                                    )
                                    :
                                    <span className="edit" onClick={()=>this.showEmailModal()}>填写邮箱<i className='icon icon-pencil'/></span>
                            }
                        </div>
                    </div>
                    <p className="moring">如资料有误，请联系在线客服修改</p>

                    {/*手机短信验证弹框*/}
                    <div id="bindPhoneModal" className="modal fade" role="dialog">
                        <div className="modal-backdrop fade"></div>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    手机短信验证
                                    <button type="button" id="PhoneModalClose" onClick={()=>this.closeBindPhoneModal()}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="forms">
                                        <div className='user_phone'>
                                            <span className="text">手机号码：</span>
                                            <input type="number" className="cust_input" value={phone} disabled />
                                        </div>
                                        <div className='verify_code'>
                                            <span className="text">验证码:</span>
                                            <div className="user_input">
                                                <input className="input_code_box" value={this.state.input_code} onChange={this.getPhoneInput.bind(this)} type="number" placeholder="请输入验证码"/>
                                                <input className="get_code_btn" type="button" onClick={()=>this.getPhoneCode()} value={this.state.sendPhoneButtonMes}/>
                                            </div>
                                        </div>    
                                    </div>
                                    <div className="confirm_btn">
                                        <button className="button" onClick={()=>this.confirmBindPhone()} type="submit">确定</button>
                                        <a className="button" onClick={(e)=> this.serversOpen(e)}>联系在线客服</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*邮箱短信验证弹框*/}
                    <div id="bindEmailModal" className="modal fade" role="dialog">
                        <div className="modal-backdrop fade"></div>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    邮箱验证
                                    <button type="button" id="EmailModalClose" onClick={()=>this.closeBindEmailModal()}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="forms">
                                        <div className='user_phone'>
                                            <span className="text">邮箱：</span>
                                            <input type="email" className="cust_input" value={newEmail} disabled />
                                        </div>
                                        <div className='verify_code'>
                                            <span className="text">验证码:</span>
                                            <div className="user_input">
                                                <input className="input_code_box" value={this.state.emailVerifyCode} onChange={this.getEmailInput.bind(this)} type="email" placeholder="请输入验证码"/>
                                                <input className="get_code_btn" type="button" onClick={()=>this.getEmailCode()} value={this.state.sendEmailButtonMes}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="confirm_btn">
                                        <button className="button" onClick={()=>this.confirmBindEmail()} type="submit">确定</button>
                                        <a className="button" onClick={(e)=> this.serversOpen(e)}>联系在线客服</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 修改微信弹窗 */}
                    <div className='editWeChat' role='dialog'>
                        <div className='modal-backdrop fade'></div>
                        <div className='modal-dialog'>
                            <div className="modal-content">
                                <div className='modal-header'>
                                    请输入您的微信号
                                    <button className='dismiss' onClick={()=>this.closeWeChat()}>&times;</button>
                                </div>
                                <div className='modal-body'>
                                    <input type='text' className='input_qq' value={this.state.input_webChat} onChange={this.getWeChat} placeholder='微信' />
                                    <div className='confirm_btn'>
                                        <a className='button' onClick={()=>this.closeWeChat()}>取消</a>
                                        <a className='button' onClick={()=>this.confirmWeChat()}>确定</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 修改QQ弹框 */}
                    <div className='editQQ' role='dialog'>
                        <div className='modal-backdrop fade'></div>
                        <div className='modal-dialog'>
                            <div className="modal-content">
                                <div className='modal-header'>
                                    请输入您的QQ号
                                    <button className='dismiss' onClick={()=>this.dismissQQModal()}>&times;</button>
                                </div>
                                <div className='modal-body'>
                                    <input type='number' className='input_qq' value={this.state.input_qq} onChange={this.getUserQQ} placeholder='QQ' />
                                    <div className='confirm_btn'>
                                        <a className='button' onClick={()=>this.dismissQQModal()}>取消</a>
                                        <a className='button' onClick={()=>this.confirmQQ()}>确定</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 修改生日弹框 */}
                    <div className='editBirthday' role='dialog'>
                        <div className='modal-backdrop fade'></div>
                        <div className='modal-dialog'>
                            <div className="modal-content">
                                <div className='modal-header'>
                                    请输入您的生日
                                    <button className='dismiss' onClick={()=>this.dismissBirthdayModal()}>&times;</button>
                                </div>
                                <div className='modal-body'>
                                    <DatePicker
                                        mode="date"
                                        title="日期选择"
                                        extra="请填写您的生日"
                                        ref="Birthday"
                                        // value={}
                                        minDate={new Date(1900, 1, 1)}
                                        maxDate={new Date()}
                                        onOk={this.validateInput.bind(this,)}
                                    >
                                        <CustomChildren/>
                                    </DatePicker>
                                    <div className='confirm_btn'>
                                        <a className='button' onClick={()=>this.dismissBirthdayModal()}>取消</a>
                                        <a className='button' onClick={()=>this.confirmBrithday()}>确定</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 修改邮箱弹框 */}
                    <div className='editEmail' role='dialog'>
                        <div className='modal-backdrop fade'></div>
                        <div className='modal-dialog'>
                            <div className="modal-content">
                                <div className='modal-header'>
                                    请输入您的邮箱
                                    <button className='dismiss' onClick={()=>this.dismissEmailModal()}>&times;</button>
                                </div>
                                <div className='modal-body'>
                                    <input type='email' className='input_email' value={this.state.input_email} onChange={this.getUserEmail} placeholder='Email地址' />
                                    <div className='confirm_btn'>
                                        <a className='button' onClick={()=>this.dismissEmailModal()}>取消</a>
                                        <a className='button' onClick={()=>this.confirmEmail()}>确定</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 修改手机弹框 */}
                    <div className='editPhone' role='dialog'>
                        <div className='modal-backdrop fade'></div>
                        <div className='modal-dialog'>
                            <div className="modal-content">
                                <div className='modal-header'>
                                    请输入您的手机号码
                                    <button className='dismiss' onClick={()=>this.dismissPhoneModal()}>&times;</button>
                                </div>
                                <div className='modal-body'>
                                    <input type='number' className='input_phone' value={this.state.input_phone} onChange={this.getUserPhone} placeholder='请填写手机号码' />
                                    <div className='confirm_btn'>
                                        <a className='button' onClick={()=>this.dismissPhoneModal()}>取消</a>
                                        <a className='button' onClick={()=>this.confirmPhone()}>确定</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* 登录密码输入框-暂没用到 */}
                    <div className='verify_log_pwd' role='dialog'>
                        <div className='modal-backdrop fade'></div>
                        <div className='modal-dialog'>
                            <div className="modal-content">
                                <div className='modal-header'>
                                    请输入您的登录密码
                                    <button className='dismiss' onClick={()=>this.closeVerify()}>&times;</button>
                                </div>
                                <div className='modal-body'>
                                    <input type='text' className='input_qq' value={this.state.input_pwd} onChange={this.getLogPwd} placeholder='微信' />
                                    <div className='confirm_btn'>
                                        <a className='button' onClick={()=>this.closeVerify()}>取消</a>
                                        <a className='button' onClick={()=>this.confirmPwd()}>确定</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        remoteSysConfs: state.remoteSysConfs,
        backConfigs: state.backConfigs,
    }
);

export default connect(mapStateToProps)(PrivateInfo)