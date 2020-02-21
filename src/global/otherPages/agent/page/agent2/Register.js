/**
 * Agent2 - xhtd-xhtd xhtd-xin used
 */
import React, {Component} from 'react';
import {config} from "globalConfig";

class Register extends Component {
    constructor (props){
        super(props);
        this.state = {
            BankList:[], // 银行数据列表
            // 默认配置项
            Setting:{
                AgentExtendCodeIsVisible: {
                    FieldDescription: "",
                    IsVisible: true,
                    IsRequire: true
                },
                TrueName: {
                    FieldDescription: "",
                    IsVisible: true,
                    IsRequire: true
                },
                Birthday: {
                    FieldDescription: "",
                    IsVisible: true,
                    IsRequire: true
                },
                Email: {
                    FieldDescription: "",
                    IsVisible: true,
                    IsRequire: true
                },
                QQ: {
                    FieldDescription: "",
                    IsVisible: true,
                    IsRequire: true
                },
                Phone: {
                    FieldDescription: "",
                    IsVisible: true,
                    IsRequire: true
                }              
            },
            fr_username:true,// 账号输入提示
            fr_password:true, // 密码
            fr_password2:true,// 确认密码
            password_notmach:true, // 两次输入密码判断
            fr_first_name:true, // 真实姓名
            fr_email:true, // 邮箱
            fr_dob:true, // 生日
            fr_qq:true, // QQ
            fr_contact_number:true, // 手机号码
            fr_get_bank:true, // 银行
            fr_bankaccountno:true, // 取款账号
            fr_get_code:true, // 取款密码
            fr_webSite:true,//推广码判断
            fr_tongyi:true
        }
    }
    componentDidMount() {
        // 日期控件
        window.$('#fr_dob').datepicker({
            defaultDate: '1980-01-01',
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            yearRange: "1900:2017",
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            dayNames: ["日", "一", "二", "三", "四", "五", "六"],
        });
        let _this = this;
        // 银行列表获取
        window.$.ajax
        ({
            type: "GET",
            url: config.apiPath+'Agent/Portal_Bank',
            contentType : 'application/json',
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.StatusCode == 0) {
                    _this.setState({
                        BankList:data.Data
                    })
                } else {
                    
                }
            }
        });
        // 获取设置项
        window.$.ajax
        ({
            type: "GET",
            url: config.apiPath+'Agent/GetRegistSetting',
            contentType : 'application/json',
            dataType: 'json',
            async: false,   
            success: function (data) {
                if (data.StatusCode == 0) {
                    _this.setState({
                        Setting:data.Setting
                    })
                } else {
                    console.log('API 出错错啦')
                }
            }         
        })
    }
    BankList(){
        let ret = []
        if(this.state.BankList){
            for( let i = 0; i < this.state.BankList.length; i++ ){
                let item = this.state.BankList[i];
                ret.push(
                    <option key={item.Id} value={JSON.stringify(item)}>{item.BankName}</option>
                )                
            }
        }
        return ret;
    }
    forcheck(e){
        e.preventDefault();
        // 提示语隐藏
        this.setState({
            fr_username:true,
            fr_password:true,
            fr_password2:true,
            password_notmach:true,
            fr_first_name:true,
            fr_dob:true,
            fr_qq:true,
            fr_email:true,
            fr_contact_number:true,
            fr_get_bank:true,
            fr_bankaccountno:true,
            fr_get_code:true,
            fr_webSite:true,
            fr_tongyi:true
        });
        // 判断注册信息
        var count = 0;
        // 登录信息判断
        if(!this.refs.fr_username.value){
            this.setState({fr_username:false});
            count++;
        }
        if(!this.refs.fr_password.value){
            this.setState({fr_password:false});
            count++;
        }
        if(!this.refs.fr_password2.value){
            this.setState({fr_password2:false});
            count++;
        }
        if(this.refs.fr_password.value!=this.refs.fr_password2.value){
            this.setState({password_notmach:false});
            count++;
        }
        // 用户信息判断
        if(!this.refs.fr_first_name.value && this.state.Setting.TrueName.IsRequire){
            this.setState({fr_first_name:false});
            count++;
        }
        if(!this.refs.fr_dob.value && this.state.Setting.Birthday.IsRequire){
            this.setState({fr_dob:false});
            count++;
        }
        if(!this.refs.fr_email.value && this.state.Setting.Email.IsRequire){
            this.setState({fr_email:false});
            count++;
        }
        if(!this.refs.fr_qq.value && this.state.Setting.QQ.IsRequire){
            this.setState({fr_qq:false});
            count++;
        }
        if(!this.refs.fr_contact_number.value && this.state.Setting.Phone.IsRequire){
            this.setState({fr_contact_number:false});
            count++;
        }
        // 银行信息
        if(!this.refs.fr_get_bank.value){
            this.setState({fr_get_bank:false});
            count++;
        }
        // 银行账号
        if(!this.refs.fr_bankaccountno.value){
            this.setState({fr_bankaccountno:false});
            count++;
        }
        // 提款密码
        if(!this.refs.fr_get_code.value){
            this.setState({fr_get_code:false});
            count++;
        }
        // 推广码判断
        if( this.state.Setting.AgentExtendCodeIsVisible && !this.refs.fr_webSite.value && !this.refs.fr_otherWebSite.value ){
            this.setState({fr_webSite:false});
            count++;
        }
        // 协议判断
        if(!document.getElementById('fr_tongyi').checked){
            this.setState({fr_tongyi:false})
            count++;
        }
        if(count==0){
            window.$.ajax
            ({
                type: "POST",
                url: config.apiPath+'Agent/Apply',
                contentType : 'application/json',
                dataType: 'json',
                async: false,
                data: JSON.stringify({  
                    UserName: this.refs.fr_username.value, // 用户名
                    TrueName: this.refs.fr_first_name && this.refs.fr_first_name.value?this.refs.fr_first_name.value:"", // 真实姓名
                    Password:this.refs.fr_password.value, // 密码
                    Phone:this.refs.fr_contact_number && this.refs.fr_contact_number.value ? this.refs.fr_contact_number.value:"", // 手机
                    Email:this.refs.fr_email && this.refs.fr_email.value ? this.refs.fr_email.value:"", // 邮箱
                    QQ:this.refs.fr_qq && this.refs.fr_qq.value?this.refs.fr_qq.value:"", // QQ
                    Birthday:this.refs.fr_dob && this.refs.fr_dob.value ? this.refs.fr_dob.value : "", // 生日
                    AgentBankId:JSON.parse(this.refs.fr_get_bank.value).Id, // 银行ID
                    AgentBankNo:this.refs.fr_bankaccountno.value, // 银行账号
                    WithdrawPwd:this.refs.fr_get_code.value, // 取款密码
                    WebSite:this.refs.fr_webSite && this.refs.fr_webSite.value ? this.refs.fr_webSite.value : "", // 推广
                    ExtendDesc:this.refs.fr_otherWebSite && this.refs.fr_otherWebSite.value ? this.refs.fr_otherWebSite.value : "" // 其他推广     
                }),
                success: function (data) {
                    if (data.StatusCode != 0) {
                        window.swal({
                            title: data.Message,
                            type: "warning",
                            confirmButtonColor: "#c5841f",
                            confirmButtonText: "確定",
                            closeOnConfirm: false
                        });
                    } else {
                        swal("操作成功!", "您已经成功加入", "success");
                    }
                }
            });
            return;
        }
        return;
    }
    render() {
        return (
            <div id="Register2">       
                <div className="row" >
                    <div className="col-md-12 bs-example">
                        <form id="regForm" action="reg_ajax" method="post">
                            <p className="tit"><i className="fa fa-pencil-square-o"></i>&nbsp;&nbsp;合作夥伴申请资料</p>
                            {/* 用户名 */}
                            <div className='form-group'>
                                <label>用户名<span>（必填）</span></label>
                                <div>
                                    <input type="text" className="form-control" id="fr_username" ref="fr_username" maxLength="12" placeholder="请输入帐号" title="请输入帐号"/>
                                </div>
                                <p hidden={this.state.fr_username}>用户名不能为空</p>
                            </div>
                            {/* 密码 */}
                            <div className='form-group'>
                                <label>密码<span>（必填）</span></label>
                                <div>
                                    <input type="password" className="form-control" id="fr_password" ref="fr_password" minLength="6" maxLength="15" placeholder="请输入密码" title="请输入密码"/>
                                </div>
                                <p hidden={this.state.fr_password}>密码不能为空</p>
                            </div>
                            <div className="form-group">
                                <label className="userinfo inptfont">确认密码<span>（必填）</span></label>
                                <div>
                                    <input type="password" className="form-control" id="fr_password2" ref="fr_password2" minLength="6" maxLength="15" placeholder="确认密码" title="确认密码"/>
                                </div>
                                <p hidden={this.state.fr_password2}>确认密码不能为空</p>
                                <p hidden={this.state.password_notmach}>两次输入密码不一致</p>
                            </div>
                            <p className="tit"><i className="fa fa-user"></i>&nbsp;&nbsp;合作夥伴基本资料</p>
                            {/* 真实姓名 */}
                            {this.state.Setting.TrueName.IsVisible?
                            <div className="form-group">
                                <label>真实姓名<span>{this.state.Setting.TrueName.IsRequire?'（必填）':'（选填）'}</span></label>
                                <div>
                                    <input type="text" className="form-control"  ref="fr_first_name" id="fr_first_name" maxLength="20" placeholder="真实姓名" title="真实姓名"/>
                                </div>
                                <p hidden={!this.state.fr_first_name}>填写真实姓名必须与银行户口姓名相同，以方便客户提款佣金。</p>
                                <p hidden={this.state.fr_first_name}>真实姓名不能为空。</p>
                            </div>:null}
                             {/* 生日 */}
                            {this.state.Setting.Birthday.IsVisible?
                            <div className='form-group'>
                                <label>出生日期<span>{this.state.Setting.Birthday.IsRequire?'（必填）':'（选填）'}</span></label>
                                <div>
                                    <input type="text" className="form-control" ref="fr_dob" id="fr_dob"  title="出生日期" maxLength="10" placeholder="出生日期" readOnly/>
                                </div>
                                <p hidden={!this.state.fr_dob}>温馨提示：您必须年满18岁！</p>
                                <p hidden={this.state.fr_dob}>出生日期不能为空。</p>
                            </div>:null}
                            {/* 邮箱 */}
                            {this.state.Setting.Email.IsVisible?
                            <div className='form-group'>
                                <label className="userinfo inptfont">邮箱<span>{this.state.Setting.Email.IsRequire?'（必填）':'（选填）'}</span></label>
                                <div>
                                    <input type="email" className="form-control"  ref="fr_email" id="fr_email" maxLength="40" placeholder="邮箱" title="邮箱"/>
                                </div>
                                <p hidden={!this.state.fr_email}>邮箱是您取回登入密码的唯一途径, 请注意安全, 务必真实。</p>
                                <p hidden={this.state.fr_email}>邮箱输入不能为空。</p>
                            </div>:null}
                            {/* QQ号 */}
                            {this.state.Setting.QQ.IsVisible?
                            <div className='form-group'>
                                <label>QQ号<span>{this.state.Setting.QQ.IsRequire?'（必填）':'（选填）'}</span></label>
                                <div>
                                    <input type="text" className="form-control"  ref="fr_qq" id="fr_QQ" maxLength="12" placeholder="QQ号" title="QQ號"/>
                                </div>
                                <p hidden={this.state.fr_qq}>QQ号输入不能为空。</p>
                            </div>:null}
                            {/* 手机号码 */}
                            {this.state.Setting.Phone.IsVisible?
                            <div className='form-group'>
                                <label>手机号码<span>{this.state.Setting.Phone.IsRequire?'（必填）':'（选填）'}</span></label>
                                <div>
                                    <input type="text" className="form-control" ref="fr_contact_number" id="fr_contact_number" maxLength="11" placeholder="手机号码" title="手机号码"/>
                                </div>
                                <p hidden={!this.state.fr_contact_number}>此为您取回登入密码的唯一途径, 请注意安全, 务必真实!</p>
                                <p hidden={this.state.fr_contact_number}>手机号码不能为空</p>
                            </div>:null}
                            {this.state.Setting.AgentExtendCodeIsVisible?
                            <div className='form-group'>
                                <label>推广网站<span>（推广网站与其他推广必填一项）</span></label>
                                <div>
                                    <input type="text" className="form-control" ref="fr_webSite" id="fr_webSite" maxLength="11" placeholder="推广网站" title="推广网站"/>
                                </div>
                                <p hidden={this.state.fr_webSite}>推广与其他推广两项都不能为空</p>
                            </div>:null}
                            {this.state.Setting.AgentExtendCodeIsVisible?
                            <div className='form-group'>
                                <label>其他推广<span>（推广网站与其他推广必填一项）</span></label>
                                <div>
                                    <input type="text" className="form-control" ref="fr_otherWebSite" id="fr_otherWebSite" maxLength="11" placeholder="其他推广" title="其他推广"/>
                                </div>
                                <p hidden={this.state.fr_webSite}>推广与其他推广两项都不能为空</p>
                            </div>:null}
                            {/* 银行下拉 */}
                            <div className='form-group'>
                                <label>出款银行<span>*</span></label>
                                <div className="user-input inptdivt">
                                    <select id="fr_get_bank" className="form-control" ref="fr_get_bank" title="选择您的出款银行">
                                        {this.BankList()}
                                    </select>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label>银行账号<span>（必填）</span></label>
                                <div>
                                    <input id="fr_bankaccountno" className="form-control" ref="fr_bankaccountno"  maxLength="28" placeholder="输入您出款银行的帐号" title="输入您出款银行的帐号"/>
                                </div>
                                <p hidden={this.state.fr_bankaccountno}>银行账号不能为空</p>
                            </div>
                            <div className='form-group'>
                                <label>取款密码<span>（必填）</span></label>
                                <div>
                                    <input type="password" className="form-control" id="fr_get_code" ref="fr_get_code" minLength="6" maxLength="15" placeholder="取款密码" title="密码长度最少6个字符，符号不被接纳。"/>
                                </div>
                                <p hidden={this.state.fr_get_code}>取款密码不能为空</p>
                            </div>
                            <div className="form-group" >
                                <input type="checkbox" name="fr_tongy" ref="fr_tongyi"  id="fr_tongyi"/>
                                <label>我看过并同意代理协议  </label>
                                <p hidden={this.state.fr_tongyi}>请勾选代理协议</p>
                            </div>
                            <div className="form-group">
                                <input type="" className="pull-right btn btn-default submit_btn_input" onClick={this.forcheck.bind(this)} ref="fr_submit" id="fr_submit" value="注册代理"/>
                            </div>
                        </form>
                    </div>
                </div>       
            </div>
        )
    }
}



export default (Register);