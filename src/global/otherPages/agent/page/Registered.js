/**
 * 代理页面-注册-Agent1
 */
import React, {Component} from 'react';
import {config} from "globalConfig";
class Registered extends Component {
    constructor (props){
        super(props);
        this.state = {
            BankList:[], // 银行数据列表
            // 默认配置项
            Setting:{
                AgentExtendCodeIsVisible: {
                    IsVisible: true,
                    IsRequire: true
                },
                TrueName: {
                    IsVisible: true,
                    IsRequire: true
                },
                Birthday: {
                    IsVisible: true,
                    IsRequire: true
                },
                Email: {
                    IsVisible: true,
                    IsRequire: true
                },
                QQ: {
                    IsVisible: true,
                    IsRequire: true
                },
                Phone: {
                    IsVisible: true,
                    IsRequire: true
                }              
            },
            fr_username: true,      // 账号输入提示
            fr_username_ch: true,   //账号中文提示
            fr_username_lt: true,   //账号少于6位提示
            fr_username_repeat: true, //账号重复提示
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
            fr_webSite:true//推广码判断
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
    // 银行列表
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

    //判断用户名
    usernameVerify = ()=> {
        this.setState({
            fr_username: true,
            fr_username_ch: true,
            fr_username_lt: true,
            fr_username_repeat: true,
        });

        let inputVal = (this.refs.fr_username.value).replace(/\s+/g,"");    //去除所有空格
        let reg = /^[0-9a-zA-Z]+$/;   //正则判断只能是字母或数字

        if(!inputVal){
            this.setState({fr_username: false});
        } else {
            if(!reg.test(inputVal)){    //判断不能是中文
                this.setState({fr_username_ch: false});
                this.refs.fr_username.value = '';
                this.setState({fr_username_lt: true});
            } else if(inputVal.length < 6){    //判断不能少于6位
                this.setState({fr_username_lt: false});
            }
        }
        
    }

    // 注册
    forcheck(e){
        e.preventDefault();
        // 提示语隐藏
        this.setState({
            fr_username:true,
            fr_username_ch:true,
            fr_username_lt:true,
            fr_username_repeat:true,
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
            fr_webSite:true     
        });
        // 判断注册信息
        var count = 0;

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
        if(this.state.Setting.TrueName.IsVisible){
            if(!this.refs.fr_first_name.value && this.state.Setting.TrueName.IsRequire){
                this.setState({fr_first_name:false});
                count++;
            }       
        }

        if(this.state.Setting.Birthday.IsVisible){
            if(!this.refs.fr_dob.value && this.state.Setting.Birthday.IsRequire){
                this.setState({fr_dob:false});
                count++;
            }     
        }

        if(this.state.Setting.Email.IsVisible){
            if(!this.refs.fr_email.value && this.state.Setting.Email.IsRequire){
                this.setState({fr_email:false});
                count++;
            }         
        }

        if(this.state.Setting.QQ.IsVisible){
            if(!this.refs.fr_qq.value && this.state.Setting.QQ.IsRequire){
                this.setState({fr_qq:false});
                count++;
            }            
        }


        if(this.state.Setting.Phone.IsVisible){
            if(!this.refs.fr_contact_number.value && this.state.Setting.Phone.IsRequire){
                this.setState({fr_contact_number:false});
                count++;
            }            
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
        if(this.state.Setting.AgentExtendCodeIsVisible){
            if( this.state.Setting.AgentExtendCodeIsVisible && !this.refs.fr_webSite.value && !this.refs.fr_otherWebSite.value ){
                this.setState({fr_webSite:false});
                count++;
            }            
        }

        // 协议判断
        if(!document.getElementById('fr_tongyi').checked){
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
            <div id="Registered">           
                <div className="register_title_img"></div>     
                <div className="reg-fnameContent">
                    <form id="regForm" action="reg_ajax" method="post">
                        {/* 用户名 */}
                        <div className='form-group inptdivm'  >
                            <label className="col-md-2 inptfont">用户名<span>*</span></label>
                            <div className="col-md-7 inptdivt">
                                <input onBlur={this.usernameVerify} type="text" className="form-control inptfix" id="fr_username" ref="fr_username" maxLength="12" placeholder="6-12位，由字母或数字组成。" title="6-12位，字母或数字"/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_username}>用户名不能为空</p>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_username_ch}>用户名不能是中文!</p>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_username_lt}>用户名不能少于6位!</p>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_username_repeat}>用户名重复!</p>
                        </div>
                        {/* 密码 */}
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">密码<span>*</span></label>
                                <div className="col-md-7 inptdivt">
                                <input type="password" className="form-control inptfix" id="fr_password" ref="fr_password" maxLength="15" placeholder="密码长度最少6个字符，符号不被接纳。" title="密码长度最少6个字符，符号不被接纳。"/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_password}>密码不能为空</p>
                        </div>
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">确认密码<span>*</span></label>
                                <div className="col-md-7 inptdivt">
                                <input type="password" className="form-control inptfix" id="fr_password2" ref="fr_password2" maxLength="15" placeholder="请重复输入登录密码" title="请重复输入登录密码"/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_password2}>密码不能为空</p>
                            <p className='col-md-3 tiShi'  hidden={this.state.password_notmach}>两次输入不一致</p>
                        </div>
                        {/* 真实姓名 */}
                        {this.state.Setting.TrueName.IsVisible?
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">真实姓名<span>{this.state.Setting.TrueName.IsRequire?'*':''}</span></label>
                                <div className="col-md-7 inptdivt">
                                <input type="text" className="form-control inptfix"  ref="fr_first_name" id="fr_first_name" maxLength="20" placeholder="必须与您的银行账户名称相同﹐否则不能出款!" title="必须与您的银行账户名称相同﹐否则不能出款!"/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_first_name}>真实姓名不能为空</p>
                        </div>:null}
                        {/* 生日 */}
                        {this.state.Setting.Birthday.IsVisible?
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">出生日期<span>{this.state.Setting.Birthday.IsRequire?'*':''}</span></label>
                                <div className="col-md-7 inptdivt">
                                <input type="text" className="form-control inptfix" ref="fr_dob" id="fr_dob"  title="请输入出生日，您必须年满18岁" maxLength="10" placeholder="请输入出生日，您必须年满18岁" readOnly/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_dob}>出生日期不能为空</p>
                        </div>:null}
                        {/* 邮箱 */}
                        {this.state.Setting.Email.IsVisible?
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">电子邮件<span>{this.state.Setting.Email.IsRequire?'*':''}</span></label>
                                <div className="col-md-7 inptdivt">
                                <input type="text" className="form-control inptfix"  ref="fr_email" id="fr_email" maxLength="40" placeholder="请避免使用新浪免费邮箱" title="请避免使用新浪免费邮箱，会收不到重要的系统邮件"/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_email}>邮箱不能为空</p>
                        </div>:null}
                        {/* QQ号 */}
                        {this.state.Setting.QQ.IsVisible?
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">QQ号<span>{this.state.Setting.QQ.IsRequire?'*':''}</span></label>
                                <div className="col-md-7 inptdivt">
                                <input type="text" className="form-control inptfix"  ref="fr_qq" id="fr_QQ" maxLength="40" placeholder="" title=""/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_qq}>QQ号不能为空</p>
                        </div>:null}
                        {/* 手机号码 */}
                        {this.state.Setting.Phone.IsVisible?
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">手机号码<span>{this.state.Setting.Phone.IsRequire?'*':''}</span></label>
                                <div className="col-md-7 inptdivt">
                                <input type="text" className="form-control inptfix" ref="fr_contact_number" id="fr_contact_number" maxLength="20" placeholder="此为您取回登入密码的唯一途径, 务必真实!" title="此为您取回登入密码的唯一途径, 请注意安全, 务必真实!"/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_contact_number}>手机号码不能为空</p>
                        </div>:null}
                        {/* 推广 */}
                        {this.state.Setting.AgentExtendCodeIsVisible?
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">推广网站<span>（推广网站与其他推广必填一项）</span></label>
                                <div className="col-md-7 inptdivt">
                                <input type="text" className="form-control" ref="fr_webSite" id="fr_webSite" maxLength="11" placeholder="推广网站" title="推广网站"/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_webSite}>推广与其他推广都不能为空</p>
                        </div>:null}
                        {this.state.Setting.AgentExtendCodeIsVisible?
                        <div className='form-group'>
                            <label className="col-md-2 inptfont">其他推广<span>（推广网站与其他推广必填一项）</span></label>
                                <div className="col-md-7 inptdivt">
                                <input type="text" className="form-control" ref="fr_otherWebSite" id="fr_otherWebSite" maxLength="11" placeholder="其他推广" title="其他推广"/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_webSite}>推广与其他推广都不能为空</p>
                        </div>:null}
                        {/* 银行下拉 */}
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">出款银行<span>*</span></label>
                                <div className="col-md-7 inptdivt">
                                <select id="fr_get_bank" className="form-control inptfix" ref="fr_get_bank" title="选择您的出款银行">
                                    {this.BankList()}
                                </select>
                            </div>
                        </div>
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">银行账号<span>*</span></label>
                                <div className="col-md-7 inptdivt">
                                <input id="fr_bankaccountno" type="number" className="form-control inptfix" ref="fr_bankaccountno"  maxLength="25" placeholder="输入您出款银行的帐号" title="输入您出款银行的帐号"/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_bankaccountno}>银行账号不能为空</p>
                        </div>
                        <div className='form-group inptdivm'>
                            <label className="col-md-2 inptfont">取款密码<span>*</span></label>
                                <div className="col-md-7 inptdivt">
                                <input type="password" className="form-control inptfix" id="fr_get_code" ref="fr_get_code" maxLength="15" placeholder="取款密码" title="密码长度最少6个字符，符号不被接纳。"/>
                            </div>
                            <p className='col-md-3 tiShi'  hidden={this.state.fr_get_code}>取款密码不能为空</p>
                        </div>
                        <div className="check_tongyi" >
                            <label className={this.state.fr_tongyi == true?'remember not_checked':'remember'}>
                                <input type="checkbox"  name="fr_tongy" ref="fr_tongyi"   id="fr_tongyi"/>
                                    我看过并同意 <a onClick={this.props.onClickJoin}>代理协议</a> <span>*</span>
                            </label>
                            <input type="hidden" ref="_token" value="K9wj11ThwOSrDUTTuoPrR0SLhKz6IVGJc8SWF8jh"/>
                        </div>
                        <div className="submit_btn">
                            <div className="col-md-12">
                                <input type="submit" className="pull-right btn btn-default submit_btn_input" onClick={this.forcheck.bind(this)} ref="fr_submit" id="fr_submit" value="提交申请"/>
                                <input type="hidden" ref="fr_action" value="add_ag"/>
                            </div>
                        </div>
                        <div className='clear'></div>
                    </form>
                </div>     
            </div>
        )
    }
}


export default (Registered);