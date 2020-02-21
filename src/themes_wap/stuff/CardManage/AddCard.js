import React, { Component } from 'react';
import {NavBar, Icon, List, InputItem,Picker,Toast,Modal} from 'antd-mobile';
import {browserHistory,Link} from 'react-router';
import connect from "react-redux/es/connect/connect";
import {provinces} from "provincesJson";
import './CardManage.scss';
import {NumPicker} from 'pui';

class AddCard extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
        let Province = [];
        for (var i = 0; i < provinces.length; i++) {
            var p = provinces[i];
            Province.push({
                label: p.name,
                value: i
            });
        }
        this.state={
            selProvince:Province,
            selCity:[],
            ProvinceValue:[],
            ProvinceName:"",
            CityValue:[],
            CityName:"",
            bankData:[],
            bankValue:[],
            bankId:"",
            WithdrawalPwd: ['0','0','0','0'],
            // input_code: '',
            // sendPhoneButtonMes: "获取",
            // submitFlag: false,
        }
    }

    componentWillMount(){
        new window.actions.ApiBanksAction().fly();
    }

    componentWillReceiveProps (nextProps) {
        if(this.props.bankInfos !== nextProps.bankInfos){
            let bankData=[];
            nextProps.bankInfos.forEach((item,index)=>{
                bankData.push({
                    label:item.BankName,
                    trueValue:item.Id,
                    value:index
                })
            })
            this.setState({
                bankData:bankData
            })
        }
    }

    provinceChange(val){
        let index=val[0];
        let city = [];
        for (var i = 0; i < provinces[index].cities.length; i++) {
            var p = provinces[index].cities[i];
            city.push({
                label:p.name,
                value:i
            });
        }
        this.setState({
            selCity:city,
            ProvinceName:this.state.selProvince[index].label,
            ProvinceValue:[index],
            CityValue:[],
            CityName:"",
        })
    }

    cityChange(val){
        let index=val[0];
        this.setState({
            CityName:this.state.selCity[index].label,
            CityValue:[index]
        })
    }

    bankChange(val){
        let index=val[0];
        this.setState({
            bankValue:[index],
            bankId:this.state.bankData[index].trueValue
        })
    }

    bindCardAction(){
        let _this = this;
        let params = {//后台要接收的参数
            BankId:this.state.bankId,
            Province:this.state.ProvinceName,
            City:this.state.CityName,
            BranchName:this.refs.branchName.state.value,
            AccountNo:this.refs.cardNo.state.value,
            AccountName:this.refs.username.state.value
        };

        if(!this.props.user.HasWithdrawalPassword){ //首次设置取款密码
            params.WithdrawalPwd = this.state.WithdrawalPwd.toString().replace(/\,/g,"");
        }

        new window.actions.ApiBindCardAction(params).fly(resp=>{
            _this.submitStateLock=true;
            Toast.hide();
            if (resp.StatusCode === 0) {
                new window.actions.ApiBankAccountsAction().fly(); // 获取会员绑定的银行卡
                new window.actions.ApiPlayerInfoAction().fly();// 刷新个人信息 
                Modal.alert('银行卡添加成功!','是否继续添加？',
                    [
                        {
                            text: "返回",
                            onPress: ()=>{
                                new window.actions.ApiBankAccountsAction().fly();
                                window.wapHistoryType.push('/cardManage')
                            }
                        },
                        {text: "继续添加"}
                    ]
                )
            }else{
                Modal.alert("添加失败！", resp.Message);
            }
        });
    }

    // getPhoneInput(e) {
    //     e.preventDefault();
    //     this.setState({ input_code: e.target.value })
    // }

  

    submit(){
        let _this = this;

        if(!this.submitStateLock){
            return;
        }
        let realName = !this.props.user.realName ? this.refs.realName.state.value : null;
        let bankId = this.state.bankId;
        let ProvinceName =this.state.ProvinceName;
        let CityName = this.state.CityName;
        let branchName = this.refs.branchName.state.value;
        let cardNo = this.refs.cardNo.state.value;
        let username=  this.refs.username.state.value;
        let cardNum = this.refs.cardNo.state.value.replace(/\s+/g,'');
        if(realName != null && realName == ""){
            Modal.alert('错误!',"为确保正常提款,请认真填写您的真实姓名!");
            return;
        }
        if(!bankId){
            Modal.alert('',"开户银行信息不能为空!");
            return;
        }
        if(!username){
            Modal.alert('错误!',"帐户名不能为空!");
            return;
        }
        if(!cardNo){
            Modal.alert('错误!',"银行卡号不能为空!");
            return;
        }
        if(cardNum.length < 16 || cardNum.length > 19){
            Modal.alert('错误!','银行卡号限16~19位')
            return;
        }
        if(!ProvinceName){
            Modal.alert('错误!',"开户省不能为空!");
            return;
        }
        if(!CityName){
            Modal.alert('错误!',"开户市不能为空!");
            return;
        }
        if(!branchName){
            Modal.alert('错误!',"开户支行不能为空!");
            return;
        }

        this.submitStateLock=false;
        if(!this.props.user.realName){
            Toast.loading('银行卡添加中...',300);
            new window.actions.ApiUpdateInfoAction(realName).fly((resp)=>{
                if(resp.StatusCode === 0){
                    _this.bindCardAction();
                }else{
                    Toast.hide();
                    this.submitStateLock=true;
                    Modal.alert('错误!',resp.Message)
                }
            })
        }else{
            Toast.loading('银行卡添加中...',300);
            _this.bindCardAction();
        }
    }

    //验证银行卡号 放在提交后去判断了
    // verifyBankCard = ()=> {
    //     let cardNum = this.refs.cardNo.state.value.replace(/\s+/g,'');
    //     if(cardNum.length < 16 || cardNum.length > 19){
    //         Modal.alert('错误!','银行卡号限16~19位')
    //         return;
    //     }
    // }


    render(){
        let { realName, phone, verfyPhone} = this.props.user;
        let {bankData,bankValue,selProvince,ProvinceValue,selCity,CityValue} = this.state;
        return(
            <div className="CardManage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.goBack()}
                >绑定银行卡</NavBar>
                <div className="scroll-content">
                    <List>
                        <div className='circle-wrap'>
                            <Picker extra="请选择开户银行"
                                    data={bankData}
                                    value={bankValue}
                                    ref="bank"
                                    cols={1}
                                    onOk={(val)=>{this.bankChange(val)}}
                            >
                                <List.Item arrow="down">选择银行</List.Item>
                            </Picker>
                            <InputItem
                                placeholder="请输入您的银行卡号"
                                ref="cardNo"
                                // type="bankCard"
                                type="number"
                                maxLength={19}
                                // onBlur={this.verifyBankCard}
                            >
                                银行卡号
                            </InputItem>
                            <InputItem
                                placeholder="为确保正常提款，账户名请对应您的真实姓名"
                                defaultValue={realName}
                                editable={realName == "" ? true : false}
                                type="text"
                                className="warning-placehoder"
                                ref="username"
                            >
                                帐户名
                            </InputItem>      
                            {
                                realName ? null:
                                <InputItem
                                    placeholder="为确保正常提款，请输入您的真实姓名"
                                    defaultValue={realName}
                                    clear
                                    maxLength={12}
                                    type="text"
                                    className="warning-placehoder"
                                    ref="realName"
                                >
                                    真实姓名
                                </InputItem>
                            }      
                            {
                                !this.props.user.HasWithdrawalPassword &&
                                <NumPicker 
                                    value={this.state.WithdrawalPwd}
                                    onOk={v=>this.setState({WithdrawalPwd: v})}
                                    tipText='取款密码'
                                />
                            }     
                        </div>

                        <div className='circle-wrap'>
                            <Picker extra="请选择开户省"
                                    data={selProvince}
                                    value={ProvinceValue}
                                    ref="province"
                                    cols={1}
                                    onOk={(val)=>{this.provinceChange(val)}}
                            >
                                <List.Item arrow="down">开户省</List.Item>
                            </Picker>   
                            <Picker extra="请选择开户市"
                                    data={selCity}
                                    value={CityValue}
                                    ref="city"
                                    cols={1}
                                    onOk={(val)=>{this.cityChange(val)}}
                            >
                                <List.Item arrow="down">开户市</List.Item>
                            </Picker>      
                            <InputItem
                                placeholder="开户支行"
                                clear
                                type="text"
                                ref="branchName"
                            >
                                开户支行
                            </InputItem>                                                                               
                        </div>
                    </List>
                    {/* { !verfyPhone ?
                    <div className="modal-body">
                        <div className="forms">
                            <div className='user_phone'>
                                <span className="text">手机号码：</span>
                                <input type="number" className="cust_input" value={phone} disabled />
                            </div>
                            <div className='verify_code'>
                                <span className="text">验证码:</span>
                                <div className="user_input">
                                    <input className="input_code_box" value={this.state.input_code} onChange={this.getPhoneInput.bind(this)} type="number" placeholder="请输入验证码" />
                                    <input className="get_code_btn" type="button" onClick={() => this.getPhoneCode()} value={this.state.sendPhoneButtonMes} />
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
                       } */}
                    <button onClick={this.submit.bind(this)} className="btn">提交</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        bankInfos:state.bankInfos
    }
);

export default connect(mapStateToProps)(AddCard)