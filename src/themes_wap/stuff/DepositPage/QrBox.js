import React, { Component } from 'react';
import {ApiOfflineDepositAction,} from "globalAction";
import {InputItem, List, Modal, Toast,Button} from 'antd-mobile';
import {config} from "globalConfig";


class QrcodeDeposit extends Component{
    constructor(props){
        super(props)
        this.state={
            AccountName:"",
            hide:false,
        }
    }
    hide(){
        let _this = this;
        this.setState({
            hide:true
        },()=>{
            setTimeout(()=>{
                _this.props.hide();
            },500)
        })
    }
    offlinePay(e){
        e.preventDefault();
        let _this = this;
        let depositMoney = this.props.depositMoney;
        let TransType;
        if(this.props.offPay.Bank.BankCode.indexOf('ALIPAY')>-1){//如果是支付宝
            TransType=6;
        }else if(this.props.offPay.Bank.BankCode.indexOf('WECHAT')>-1){//如果是微信
            TransType=7;
        }else{//如果是其他
            TransType=1;
        }
        Toast.loading('支付申请中,请稍后...');
        let filter = {//后台要接收的参数
            BankId:this.props.offPay.Id,
            TransType,
            Amount:depositMoney,
            AccountName:this.state.AccountName
        };
        new ApiOfflineDepositAction(filter).fly((resp)=>{
            Toast.hide();
            if(resp.StatusCode===0) {
                Modal.alert(
                    "线下支付申请成功",
                    "支付单号: " + resp.OrderNo + ";\n\n帐户名: " + _this.props.offPay.AccountName + ";\n\n银行: " + _this.props.offPay.Bank.BankName+ ";\n\n银行卡号: " + _this.props.offPay.AccountNo,
                    [{text:'确定',onPress:()=>{
                        _this.hide();
                        window.wapHistoryType.push('/history');
                    }}]
                );
            }else{
                Modal.alert('线下支付申请失败',resp.Message);
            }
        });
    }
    AccountNameChange(val){
        if(val==" ") return;
        this.setState({
            AccountName:val
        })
    }
    AsaVn2Copy(){
        let ret = []

        return ret;
    }
    // 复制copyCode
    copyCode(copyId){
        var copyObj = document.getElementById(copyId);
        copyObj.select();
        copyObj.setSelectionRange(0, copyObj.value.length)
        document.execCommand("Copy");
    }
    render(){
        let className = this.state.hide?"atmbox slideOutDown":"atmbox slideInUp";
        let BankName = this.props.offPay.Bank.BankName;
        
        let winHeight = $(window).height();
        $(window).resize(function(){
            let thisHeight = $(this).height();
            if(winHeight - thisHeight > 50){
                $('.overflow').css({'height':'40%'})
            }else {
                $('.overflow').css({'height':'auto'})
            }
        })
        
        return(
            <div className={className}>
                <div className="mask"></div>
                <div className="dom">
                    <div className="title">
                        <i className="icon icon-remove" onClick={this.hide.bind(this)}></i>
                        银行转账
                    </div>
                    <div className="overflow">
                        <div className="amount">
                            请扫描下面的二维码转账:<span>￥{this.props.depositMoney}</span>
                        </div>
                        <div className="con">
                            <div className="qrcode">
                               <img src={config.devImgUrl+this.props.offPay.ImageUrl } />
                            </div>
                            <div className="text">
                                <i className="icon icon-info-sign"></i>
                                <strong>长按保存二维码</strong>，或使用 <strong>截屏保存</strong>，打开{BankName}<strong>扫描相册二维码</strong>完成支付。如无法充值，请联系客服。
                            </div>
                            {/* 
                                给我全部上复制功能 
                                ======== 
                                <List>
                                    <InputItem value={this.props.offPay.AccountName} editable={false}>收款姓名:</InputItem>
                                    <InputItem value={this.props.offPay.AccountNo} editable={false}>收款账号:</InputItem>
                                    <InputItem value={this.props.offPay.Bank.BankName} editable={false}>收款银行:</InputItem>
                                </List>   
                            */}
                            <div className="am-list UserBankInfo">
                                <div className="am-list-body">
                                    <div className="am-list-item am-input-item am-list-item-middle">
                                        <div className="am-list-line">
                                            <div className="am-input-label am-input-label-5">收款姓名:</div>
                                            <div className="am-input-control">
                                                <input type="text" id='account_name' style={{width:"75%"}} defaultValue={this.props.offPay.AccountName} contentEditable ={true} readOnly={false} />
                                                <Button 
                                                    onClick={this.copyCode.bind(this,'account_name')}  
                                                    shape="round"
                                                    size="small"
                                                    type="warning"
                                                    style={{"padding":0}}
                                            
                                                >复制</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="am-list-item am-input-item am-list-item-middle">
                                        <div className="am-list-line">
                                            <div className="am-input-label am-input-label-5">收款账号:</div>
                                            <div className="am-input-control">
                                                <input type="text" id='account_no' style={{width:"75%"}} defaultValue={this.props.offPay.AccountNo} contentEditable ={true} readOnly={false}/>
                                                <Button 
                                                    onClick={this.copyCode.bind(this,'account_no')}  
                                                    shape="round"
                                                    size="small"
                                                    type="warning"
                                                    style={{"padding":0}}
                                            
                                                >复制</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="am-list-item am-input-item am-list-item-middle">
                                        <div className="am-list-line">
                                            <div className="am-input-label am-input-label-5">收款银行:</div>
                                            <div className="am-input-control">
                                                <input type="text" id='account_BankName' style={{width:"75%"}} defaultValue={this.props.offPay.Bank.BankName} contentEditable ={true} readOnly={false}/>
                                                <Button 
                                                    onClick={this.copyCode.bind(this,'account_BankName')}  
                                                    shape="round"
                                                    size="small"
                                                    type="warning"
                                                    style={{"padding":0}}
                                            
                                                >复制</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                            <h3>转账信息</h3>
                            <List>
                                <InputItem
                                    defaultValue={this.state.AccountName}
                                    // value={this.state.AccountName}
                                    placeholder="请输入转账人姓名"
                                    onChange={this.AccountNameChange.bind(this)}
                                >转账人姓名:</InputItem>
                            </List>
                            {
                                this.state.AccountName?
                                <a onClick={this.offlinePay.bind(this)} className="btn FinishAddMoneyBtn">转账完成点这里</a>
                                :<a className={"disabled btn"}>转账完成点这里</a>
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default QrcodeDeposit;