
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory } from 'react-router';
import MyDatePicker from '../../Components/Calendar/CalendarTem' // 自创日历
import {PassWord} from 'pui';
import "./RegisterPage.scss";

class RegisterPage extends Component {
    constructor (props){
        super();
        this.state = {
            AuthCode:"",
            noUserName: true,
            notMatchPswHid: true,
            noPassword: true,
            noPassword2: true,
            noWithdrawalPassword: true,
            noWithdrawalPassword2: true,
            notMatchPayPassword: true,
            noPhone: true,
            noAuthCode: true,
            noTrueName: true,
            noEmail: true,
            noBirthday:true,
            noWechat:true,
            noQQ: true,
            noUsernameMessage:"*此项不能为空",
            required:{},//必填集合
            getLock:false,//验证码锁
            commitVal:{//提交注册的参数         
            }
        }
    }
    componentWillMount(){
        new window.actions.ApiGetRegistrySettingAction().fly();
    }
    componentDidMount(){
        let storeChannel = "";
        if(window.sessionStorage){
            storeChannel = sessionStorage.getItem("channel");
        }
        const channel = storeChannel || window.channel || "";
        if(!!channel){
            this.setState({
                commitVal:Object.assign(this.state.commitVal,{"ExtendCode":channel}
                )
            })
        }
    }
    handleChange(key,event){
        if(key==='Phone'&&event.target.value.length>11)return
        this.setState({
            commitVal:Object.assign(this.state.commitVal,{
                [key]: event.target.value
            })
        });
    }
    chexboxChange(key){
        this.setState({
            commitVal:Object.assign(this.state.commitVal,{
                [key]: !this.state.commitVal[key]
            })
        });
    }
    // 注册内容
    registryList(){
        let setting = this.props.register.Fields?this.props.register.Fields:[];
        let regList = [];
        const config = window.config;
        for(let i=0;i<setting.length;i++){
            switch(setting[i].Field){
                case "UserName":
                if(setting[i].Required)this.state.required.UserName = true;
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p ><i className="fa fa-star" aria-hidden="true" />{setting[i].Title} </p>
                        <div>
                            <input onChange={this.handleChange.bind(this,"UserName")} 
                            type="text" placeholder="6-12位由字母和数字组成" 
                            onInput={this.checkUserName} maxLength="12" className="input member-input"/>
                            <span className="ml5 f14" hidden={this.state.noUserName}>{this.state.noUsernameMessage}</span>
                        </div>
                    </div>
                );
                continue;
                case "Password":
                if(setting[i].Required)this.state.required.Password = true;
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p ><i className="fa fa-star" aria-hidden="true"></i>{setting[i].Title} </p>
                        <div >
                            <input onChange={this.handleChange.bind(this,"Password")} ref="password" type="password" placeholder="6-12位由字母和数字组成" maxLength="12" className="input member-input"/>
                            <span className="ml5 f14" hidden={this.state.noPassword} >*此项不能为空</span>
                        </div>
                    </div>
                );
                continue;
                case "Password2":
                if(setting[i].Required)this.state.required.Password2 = true;
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p ><i className="fa fa-star" aria-hidden="true"></i>{setting[i].Title} </p>
                        <div >
                            <input onChange={this.handleChange.bind(this,"Password2")} type="password" placeholder="6-12位由字母和数字组成" maxLength="12" className="input member-input"/>
                            <span className="ml5 f14" hidden={this.state.noPassword2} >*此项不能为空</span>
                            <span className="ml5 f14" hidden={this.state.notMatchPswHid} >*密码不相符</span>
                        </div>
                    </div>
                );
                continue;
                case "TrueName":
                if(setting[i].Required)this.state.required.TrueName = true;
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p >
                        { //是否显示星号图标
                            setting[i].Required ? <i className="fa fa-star" aria-hidden="true"></i>:""
                        }
                        {setting[i].Title} 
                        </p>
                        <div >
                            <input onChange={this.handleChange.bind(this,"TrueName")} type="text" placeholder="请输入姓名" className="input member-input"/>
                            <span className="ml5 f14" hidden={this.state.noTrueName} >*此项不能为空</span>
                        </div>
                    </div>
                );
                continue;
                case "Phone":
                if(setting[i].Required)this.state.required.Phone = true;
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p >
                            { //是否显示星号图标
                                setting[i].Required ? <i className="fa fa-star" aria-hidden="true"></i>:""
                            }
                            {setting[i].Title} 
                        </p>
                        <div >
                            <input value={this.state.commitVal.Phone?this.state.commitVal.Phone.substr(0,11):""} 
                            onChange={this.handleChange.bind(this,"Phone")} 
                            type="number" 
                                placeholder={config.spec.includes("j98") ? "填写真实手机号码，接收优惠服务" : '请输入您的常用手机'} 
                            className="input member-input"/>
                            <span className="ml5 f14" hidden={this.state.noPhone}>*此项不能为空,并且必须符合手机号码格式</span>
                        </div>
                    </div>
                );
                continue;
                case "Email":
                if(setting[i].Required)this.state.required.Email = true;
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p >
                            { //是否显示星号图标
                                setting[i].Required ? <i className="fa fa-star" aria-hidden="true"></i>:""
                            }
                            {setting[i].Title} 
                        </p>
                        <div >
                            <input onChange={this.handleChange.bind(this,"Email")} type="text" placeholder="请输入您的常用邮箱" className="input member-input"/>
                            <span className="ml5 f14" hidden={this.state.noEmail}>*此项不能为空</span>
                        </div>
                    </div> 
                );
                continue;
                case "Birthday":
                if(setting[i].Required)this.state.required.Birthday = true;
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p >
                            { //是否显示星号图标
                                setting[i].Required ? <i className="fa fa-star" aria-hidden="true"></i>:""
                            }
                          {setting[i].Title} 
                        </p>
                        <div >
                            <MyDatePicker placeholder="请填写您的生日" ref="Birthday" clearHhmmss="true"></MyDatePicker>   
                            <span style={{"verticalAlign":"10px"}} className="ml5 f14" hidden={this.state.noBirthday} >*此项不能为空</span>
                        </div>
                    </div>
                );
                continue;
                case "QQ":
                if(setting[i].Required)this.state.required.QQ = true;
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p >
                            { //是否显示星号图标
                                setting[i].Required ? <i className="fa fa-star" aria-hidden="true"></i>:""
                            }
                            {setting[i].Title} 
                        </p>
                        <div >
                            <input onChange={this.handleChange.bind(this,"QQ")} type="text" placeholder="请输入您的QQ" className="input member-input"/>
                            <span className="ml5 f14" hidden={this.state.noQQ} >*此项不能为空</span>
                        </div>
                    </div> 
                );
                continue;
                case "Wechat":
                if(setting[i].Required)this.state.required.Wechat = true;
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p >
                            { //是否显示星号图标
                                setting[i].Required ? <i className="fa fa-star" aria-hidden="true"></i>:""
                            }
                            {setting[i].Title} 
                        </p>
                        <div >
                            <input onChange={this.handleChange.bind(this,"Wechat")} type="text" placeholder="请输入您的微信" className="input member-input"/>
                            <span className="ml5 f14" hidden={this.state.noWechat} >*此项不能为空</span>
                        </div>
                    </div> 
                );
                continue;
                case "WithdrawalPassword":
                if(setting[i].Required)this.state.required.WithdrawalPassword = true;
                if(!this.state.commitVal.WithdrawalPassword)this.state.commitVal.WithdrawalPassword = "0000";
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p >
                        { //是否显示星号图标
                            setting[i].Required ? <i className="fa fa-star" aria-hidden="true"></i>:""
                        }
                        {setting[i].Title} 
                        </p>
                        <div >
                            <PassWord
                            defaultVal = {[0,0,0,0]}
                            getVal={val=>{
                                this.setState({
                                    commitVal:Object.assign(this.state.commitVal,{
                                        WithdrawalPassword: val
                                    })
                                });
                            }}/>
                            <span className="ml5 f14" hidden={this.state.noWithdrawalPassword} >*此项不能为空</span>
                        </div>
                    </div> 
                );
                continue;
                case "WithdrawalPassword2":
                if(setting[i].Required)this.state.required.WithdrawalPassword2 = true;
                if(!this.state.commitVal.WithdrawalPassword2)this.state.commitVal.WithdrawalPassword2 = "0000";
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p >
                        { //是否显示星号图标
                            setting[i].Required ? <i className="fa fa-star" aria-hidden="true"></i>:""
                        }
                        {setting[i].Title} 
                        </p>
                        <div >
                            <PassWord
                            defaultVal = {[0,0,0,0]}
                            getVal={val=>{
                                this.setState({
                                    commitVal:Object.assign(this.state.commitVal,{
                                        WithdrawalPassword2: val
                                    })
                                });
                            }}/>
                            <span className="ml5 f14" hidden={this.state.noWithdrawalPassword2} >*此项不能为空</span>
                            <span className="ml5 f14" hidden={this.state.notMatchPayPassword} >*密码不相符</span>
                        </div>
                    </div>
                );
                continue;
                case "ExtendCode":
                if(setting[i].Required)this.state.required.ExtendCode = true; 
                var channel = sessionStorage.getItem('channel')||"";
                regList.push(
                    (
                        <div className="InputWrap" key={setting[i].Field}>
                            <p >
                            { //是否显示星号图标
                                setting[i].Required ? <i className="fa fa-star" aria-hidden="true"></i>:""
                            }
                            {setting[i].Title} 
                            </p>
                            <div >
                            {channel?
                                <input onChange={this.handleChange.bind(this,"ExtendCode")} readOnly  type="text" placeholder="请输入推广码(可不填写)" defaultValue={channel} className="input member-input"/>
                                : 
                                <input onChange={this.handleChange.bind(this,"ExtendCode")}  type="text" placeholder="请输入推广码(可不填写)" defaultValue={channel} className="input member-input"/>}
                            </div>
                        </div>
                    ) 
                );
                continue;
                case "IsReceiveEmail":
                if(this.state.commitVal.IsReceiveEmail == undefined)this.state.commitVal.IsReceiveEmail = true;
                regList.push(
                    <div className="checkboxWrap text-center" key={setting[i].Field}>
                        <input 
                        type="checkbox" 
                        id="disreceiveEmail"
                        onChange={this.chexboxChange.bind(this,"IsReceiveEmail")} 
                        defaultChecked={this.state.commitVal.IsReceiveEmail}
                        /> 
                        <span className='RegNotice'>是的，我想收到{config.appName}的邮件消息</span>     
                    </div>
                );
                continue;
                case "IsReceiveSMS":
                if(this.state.commitVal.IsReceiveSMS == undefined)this.state.commitVal.IsReceiveSMS = true;
                regList.push(
                    <div className="checkboxWrap text-center" key={setting[i].Field}>
                        <input 
                        type="checkbox" 
                        id="disreceiveSMS"
                        onChange={this.chexboxChange.bind(this,"IsReceiveSMS")} 
                        defaultChecked={this.state.commitVal.IsReceiveSMS}/> 
                        <span className='RegNotice'>是的，我想收到{config.appName}的短信消息</span>
                    </div>
                );
                continue;
                case "AuthCode":
                if(setting[i].Required)this.state.required.AuthCode = true;
                this.getAuthCode();
                this.state.getLock = true;
                regList.push(
                    <div className="InputWrap" key={setting[i].Field}>
                        <p >
                        { //是否显示星号图标
                            setting[i].Required ? <i className="fa fa-star" aria-hidden="true"></i>:""
                        }
                        {setting[i].Title} 
                        </p>
                        <div >
                            <input onChange={this.handleChange.bind(this,"AuthCode")} type="text"  className="input member-input codeIpt" placeholder="请输入验证码"/>
                            <img style={{"width":"84px"}} onClick={this.getAuthCode.bind(this,true)} src={this.state.AuthCode} alt="验证码"/>
                            <span className="ml5 f14" hidden={this.state.noAuthCode} >*此项不能为空</span>
                        </div>
                    </div> 
                );
                continue;
            }      
        }
        return regList;
    }
    getAuthCode(refreshCode=false){
        if(this.state.getLock && !refreshCode)return;
        new window.actions.ApiAuthCodeAction().fly(resp=>{
            if(resp.StatusCode === 0){
                this.setState({
                    AuthCode:resp.AuthImg,
                    commitVal:Object.assign(this.state.commitVal,{
                        AuthToken:resp.AuthToken
                    })
                })
            }
        })
    }
    handleRegister(e) {
        e.preventDefault();
        this.setState({
            noUserName: true,
            notMatchPswHid: true,
            noPassword: true,
            noPassword2: true,
            noWithdrawalPassword: true,
            noWithdrawalPassword2: true,
            notMatchPayPassword: true,
            noPhone: true,
            noAuthCode: true,
            noTrueName: true,
            noEmail: true,
            noBirthday:true,
            noWechat:true,
            noQQ: true,
        });
        let notPass = false;
        for(let require in this.state.required){
            if(require == "Birthday"){//日历插件特殊处理
                this.state.commitVal[require] = this.refs.Birthday.getValue()
            }
            if(!!!this.state.commitVal[require]){
                this.setState({
                    ["no"+require]:false
                });
                notPass = true;
            }
        }

        if(this.state.required.Password2){//二次输入密码
            if(this.state.commitVal.Password !== this.state.commitVal.Password2){
                this.setState({
                    notMatchPswHid:false
                });
                notPass = true;
            }
        }
        if(this.state.required.WithdrawalPassword2){//二次输入密码
            if(this.state.commitVal.WithdrawalPassword !== this.state.commitVal.WithdrawalPassword2){
                this.setState({
                    notMatchPayPassword:false
                });
                notPass = true;
            }
        }
        if (this.state.required.Phone) { //如果需要输入手机号,则进行验证
            if(!(/^1[3456789]\d{9}$/.test(this.state.commitVal.Phone))){
                this.setState({
                    noPhone: false
                });
                return;              
            }
        }
        if(notPass)return;   
        new window.actions.ApiSignUpAction(this.state.commitVal).fly((respond)=>{
            if (respond.StatusCode === 0) {
                browserHistory.push("/");
            }else{
                if(respond.StatusCode === 512){//验证码过期
                    this.getAuthCode(true);
                }
                window.swal("注册失败", respond.Message, "error");
            }
        });
    }
    checkUserName = (e) =>{
        // let _this=this;
        let val = (e.target.value).replace(/\s+/g,"");
        let reg = /^[0-9a-zA-Z]+$/;   //正则判断只能是字母或数字
        if(!val){
            this.setState({
                noUserName: false,
                noUsernameMessage:"*用户名不能为空!"
            })
            return;
        }else {
            if(!reg.test(val)){
                this.setState({
                    noUserName: false,
                    noUsernameMessage:"*用户名不能是中文!",
                });
                this.refs.username.value = "";
                return;
            }else if(val.length < 6){
                this.setState({
                    noUserName: false,
                    noUsernameMessage:"*用户名不能少于6位!",
                });
                return;
            }
        }
        new window.actions.ApiCheckUserNameAction(val).fly(resp=>{
            if(resp.StatusCode === 0){
                if(resp.Registered){
                    this.setState({
                        noUserName: false,
                        noUsernameMessage: "账号已注册,请更换！", //用户名不能为空 用户名不能是中文!  用户名不能少于6位!
                    })
                }else{
                    this.setState({
                        noUserName: true
                    })
                }
            }
        });
    }
    render() {
        return (
            <main className="RegisterNewPage" id="RegisterNewPage">
                <div className="RegisterContent mAuto">
                    <div className="RegisterTitle">
                        <h1>
                            &nbsp;会员注册
                        </h1>
                        <p>欢迎成为{ window.config.spec.substr(0,window.config.spec.indexOf('-')).toUpperCase() }线上娱乐场的会员，请填写下列信息</p>
                    </div>
                    <form onSubmit={this.handleRegister.bind(this)} className='clearfix'>
                        {this.registryList()}
                        <div className="checkboxWrap text-center">
                            <input type="checkbox" id="dacceptService" ref="acceptService" defaultChecked="defaultChecked"/> 
                            <span className='RegNotice'>
                                确认已年满18岁并已阅读和接受本网站政策、隐私声明、条款和条件。
                            </span>
                        </div>
                        <div className='ButtonWrap text-center'>
                            <button type="Submit" >立即注册</button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        apiResult: state.apiResult,
        registerSetting: state.registerSetting,
        register:state.getRegisterSetting,
        remoteSysConfs: state.remoteSysConfs,
        backConfigs: state.backConfigs,
    }
);

export default connect(mapStateToProps, {})(RegisterPage);