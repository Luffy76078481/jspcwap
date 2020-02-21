/**
 *      ________________ ________________ ________________ 新存款页  ________________  ________________  ________________
 * 
 *      业务逻辑难度：★★★★★
 */

import React, {Component} from 'react';
import QRCode from 'qrcode.react';
import {connect} from 'react-redux';
import {ApiGetAllPayAction,ApiOfflineDepositAction,ApiSubmitOnlinePayAction} from "globalAction";
import {browserHistory} from 'react-router'
import {CopyButton} from 'pui';
import {Spin} from 'antd';
import {serversOpen} from "commonFunc"

class DepositPage extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            Transferor:"",          // 银行转账中点击下一步后的输入框，（转账人,转出人）
            depositMoney:"",        // 存款金额
            isCanNavSwitch:"all",   // 一级导航，控制样式 pointer-events，避免发送API回调未返回时切换其他支付方式。
            reqLock:false,          // 存款锁，防止用户连续点击
            PaymentCode:"",         // 当前支付类型对应的支付代码,例：Wechat,JDpay,alipay，用于一级导航ActiveClassname。
            hint:"",                // 每一种支付类型附带提示语（一级导航对应的提示备注语）
            payBanks:[],            // 支付银行与第三方支付银行的合并集（Select下拉银行选项）
            PayMentBank:{},         // 当前选择的银行。
            payType:0,              // 用于区别银行转账(AdminBanks)和第三方支付(ThirdPayBanks)
            isPayLink:0,            // 用于区别银行转账中(AdminBanks)是否是二维扫码或者银行卡转账（直接发送请求）。
            isOenpLink:true,        // 用于区别第三方支付（ThirdPayBanks）是否是打开链接还是扫描二维码。    
            isLoading:false,        // 用于控制是否是第三方返回二维码    
            showBankForm:false,     // 控制银行转账表单显示隐藏（点击下一步）
            payTips:"" ,            // 每一个支付银行携带的提示语
            thirdPayImg:"",         // 第三方支付返回的二维码链接
            thirdPayRecordId:"",    // 第三方支付二维码返回的单号
        };
    }
    componentDidMount(){
        // 开局默认第一个为当前支付类型。
        if(this.props.getAllPay.length==0){
            // 获取支付类型，将获取的支付类型组，进行数据初步处理。
            new ApiGetAllPayAction().fly(resp=>{
                let payList = resp.PayList;
                if(payList.length>0){
                    this.SelectPayment(payList[0])
                }
            })
        }else{
            this.SelectPayment(this.props.getAllPay[0])        
        }
    }
    // 以下方法对返回的支付数据进行初步处理（切换到存款页面componentDidMount时，选择支付类型（1级导航）时触发以下函数）
    // 欲知以下变量为何物，请到constructor state查看。
    SelectPayment(data){
        let allBanks = new Array();
        let AdminBanks = data.PayBanks.AdminBanks.length>0?data.PayBanks.AdminBanks:[];   // 银行转账银行
        let ThirdPayBanks = data.PayBanks.ThirdPayBanks.length>0?data.PayBanks.ThirdPayBanks:[]// 第三方支付银行
        allBanks = allBanks.concat(AdminBanks,ThirdPayBanks);
        this.setState({                   
            PaymentCode:data.PayTypeCode,       
            hint:data.Remark?data.Remark:"",      
            payBanks:allBanks,                  
            PayMentBank:allBanks[0],            
            payType:allBanks[0].PayType,      
            isPayLink:allBanks[0].Type?allBanks[0].Type:0,  
            showBankForm:false, 
            payTips:allBanks[0].Reminder?allBanks[0].Reminder:"",
            isOenpLink:true,
            depositMoney:""
        })
        setTimeout(()=>{
            console.log(this.state)
        },1)
    }
    // 支付类型渲染（一级导航），注：微信，支付宝，京东，银行卡，苏宁等
    renderPaymentMethod(){
        let ret=[];
        for(let i=0;i<this.props.getAllPay.length;i++){
            let payDom = this.props.getAllPay[i];
            let whichIcon = payDom.Discounted?"hasDiscounted":(payDom.Recommend?"hasRecommend":"")
            ret.push(
                <li 
                    key={i} 
                    style={{pointerEvents:this.state.isCanNavSwitch}} 
                    className={this.state.PaymentCode==payDom.PayTypeCode?"active "+whichIcon:whichIcon} 
                    onClick={this.SelectPayment.bind(this,payDom)}>
                    {
                        payDom.PayTypeCode!='Other'?
                        <span className='payicon' style={{backgroundImage:`url(${window.config.prdImgUrl+payDom.ImageUrl})`}}></span>:
                        <span className='payicon otherpay'></span>

                    }
                    <span>{payDom.PayTypeName}</span>
                </li>
            )                           
        }
        return ret;
    }
    // 下拉Select选择银行
    SelectPayBank=(event)=>{
        this.setState({
            PayMentBank:JSON.parse(event.target.value),
            payType:JSON.parse(event.target.value).PayType,
            isPayLink:JSON.parse(event.target.value).Type?JSON.parse(event.target.value).Type:0,
            payTips:JSON.parse(event.target.value).Reminder?JSON.parse(event.target.value).Reminder:"",
            showBankForm:false,
        })
    }
    // 当前支付类型（1级导航）对应的银行，（第三方或客户收款银行）
    renderPayBank(){
        let Options = this.state.payBanks.map(
            payBank => <option key={payBank.Id} value={JSON.stringify(payBank)}>
                { (payBank.Bank?payBank.Bank.BankName:payBank.BankName)+(payBank.AliasName?" "+payBank.AliasName:"") }
            </option>
        )
        // 如果银行只有一个，只显示存款余额
        if(this.state.payBanks.length==1 || this.state.payBanks.length<1){
            return null
        }
        return(
            <select defaultValue={this.state.PayMentBank} onChange={(e)=>this.SelectPayBank(e)} className="normalInput">
                {Options}
            </select>
        )
    }
    // 点击下一步或存款，如何存款
    howToPay(){
        if( Number(this.state.payType)===2 ){
            this.BankTransfer() //银行转账
        }else{
            this.ThirdPayment() //第三方支付
        }
    }
    //银行转账支付
    BankTransfer(){
        var depositmoney = this.state.depositMoney;
        if(this.state.reqLock)
        return;
        this.state.reqLock=true;
        var self = this;
        // 传入支付类型
        let TransType = 1;       
        if(this.state.PayMentBank.Bank.BankCode.indexOf('ALIPAY')!=-1)TransType = 6;
        else if(this.state.PayMentBank.Bank.BankCode.indexOf('WECHAT')!=-1)TransType = 7;
        else TransType = 1;
        // 参数
        let filter = {
            BankId:this.state.PayMentBank.Id,
            TransType:TransType,
            Amount:depositmoney,
            AccountName:this.state.Transferor || this.props.user.realName || "",// 转账人姓名
        };
        new ApiOfflineDepositAction(filter).fly(
            (resp)=>{
                if(resp.StatusCode===0){
                    // 非二维码
                    if(this.state.isPayLink){
                        window.swal({
                            title: "线下支付申请成功",
                            text: "支付单号: " + resp.OrderNo + "\n\n帐户名: " + self.state.Transferor + "\n\n银行卡号: " + self.state.PayMentBank.AccountNo + "\n\n银行: " + self.state.PayMentBank.Bank.BankName + "\n\n支行: " + self.state.PayMentBank.OpeningBank,
                            type: "success",
                            confirmButtonColor: "#c5841f",
                            confirmButtonText: "OK",
                        },
                        (isClick)=>{
                            if(isClick){
                                browserHistory.push("/records_deposit")
                            }   
                        });
                    }else{ // 二维码
                        window.swal({
                            title: self.state.PayMentBank.AccountName+"支付申请成功",
                            text: "支付单号: " + resp.OrderNo + "\n\n帐户名: " + 
                            self.state.PayMentBank.AccountName + "\n\n银行卡号: " + 
                            self.state.PayMentBank.AccountNo + "\n\n银行: " + 
                            self.state.PayMentBank.Bank.BankName,
                            type: "success",
                            confirmButtonColor: "#c5841f",
                            confirmButtonText: "OK",             
                        },
                        (isClick)=>{
                            if(isClick){
                                browserHistory.push("/records_deposit")
                            }   
                        });
                    }
                    this.setState({
                        showBankForm:false,
                    });
                }else{
                    if(resp.Message){
                        window.swal("错误",resp.Message, "error");
                    }else{
                        window.swal("错误","支付链接，请稍后再试或联系客服", "error");
                    }
                }
                self.state.reqLock = false;
            }
        )
    }
    //第三方支付API
    ThirdPayment(){
        var self = this;
        var depositmoney = this.state.depositMoney; // 输入的存款金额
        var Thirdpay =  this.state.PayMentBank;     // 当前选择的银行
        if(!depositmoney||depositmoney==null){
            window.swal({
                title: "存款金额错误",
                text: "未输入存款金额",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }
        if(depositmoney==0||depositmoney < Thirdpay.MinAmount || depositmoney > Thirdpay.MaxAmount){
            window.swal({
                title: "存款金额错误",
                text: Thirdpay.BankName+"允许存款金额范围："+Thirdpay.MinAmount+"～"+Thirdpay.MaxAmount,
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }
        if(this.state.reqLock)
        return;
        this.state.reqLock=true;// 防止用户多次点击存款
        this.state.isCanNavSwitch='none'; // 1级导航无法点击
        // 筛选在线支付或者在线网银
        const fifter = ['WECHAT','ALIPAY','QQPAY','JDPAY','WECHAT_WAP','ALIPAY_WAP','QQPAY_WAP','JDPAY_WAP','YLPAY','BAIDUPAY','ETH','BTC']
        let isOnline=0;
        fifter.map(
            item=>Thirdpay.BankNo.indexOf(item)>-1?isOnline++:isOnline+0
        )      
        let param ={
            Amount:depositmoney,
            Id:Thirdpay.Id,
            thirdPayId:Thirdpay.ThirdPayId,
            ReturnType:isOnline>0?(Thirdpay.IsJumpScanCode == 1?"QRLink":"QRCode"):"online",// 傻X参数,在线网银online,在线支付二维码或跳转
            Tag:window.config.webSiteTag,
            BankNo:Thirdpay.BankNo
        }
        if(Thirdpay.IsJumpScanCode){
            new ApiSubmitOnlinePayAction(param).fly((resp)=>{
                if(resp.StatusCode ===0) {
                    window.swal({
                        title: "获取支付成功，前往支付?",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonColor: "#c5841f",
                        confirmButtonText: "前往",
                        cancelButtonText: "取消",
                        closeOnConfirm: true,
                        closeOnCancel: true
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            window.open(resp.Content,'_blank');
                            setTimeout(() => {
                                Swal.fire({
                                    title: '<strong>支付反馈</strong>',
                                    type: 'question',
                                    timer:'5000',
                                    confirmButtonText: '支付完成', // 确认按钮文字
                                    cancelButtonText: '支付失败', // 取消按钮文字
                                    showCancelButton: true,// 取消按钮
                                    showCloseButton: true, // X
                                }).then( 
                                    function(isConfirm){
                                        try{
                                            //判断 是否 点击的 充值 按钮->去充值
                                            if (isConfirm.value) {
                                                browserHistory.push("/records_deposit");
                                            }else{ //点击取消按钮 -> 判断是否直接进入
                                                if(isConfirm.dismiss === 'overlay' || isConfirm.dismiss === 'esc' || isConfirm.dismiss === 'cancel' ){
                                                    window.open(self.props.remoteSysConfs.online_service_link,'servers');
                                                }else {                                     
                                                    Swal.close();
                                                }
                                            }
                                        }catch(e){
                                            console.log('警告：弹窗错误')
                                        }
                                    }
                                )
                            }, 1000);
                        }          
                    });
                }else{
                    if(resp.Message){
                        window.swal("错误",resp.Message, "error");
                    }else{
                        window.swal("错误","支付链接，请稍后再试或联系客服", "error");
                    }
                }
                self.setState({
                    reqLock:false,
                    isCanNavSwitch:"all"
                })
            })
        }else{
            this.setState({
                isLoading:true
            },()=>{
                new ApiSubmitOnlinePayAction(param).fly((resp)=>{
                    if(resp.StatusCode ===0) {
                        self.setState({
                            isLoading:false,
                            isOenpLink:false,
                            thirdPayImg:resp.Content,
                            thirdPayRecordId:resp.OrderNo
                        })
                    }else{
                        self.setState({
                            isLoading:false
                        },()=>{
                            if(resp.Message){
                                window.swal("错误",resp.Message, "error");
                            }else{
                                window.swal("错误","二维码生成失败，请稍后再试或联系客服", "error");
                            }
                        })
                    }
                    self.setState({
                        reqLock:false,
                        isCanNavSwitch:"all"
                    })
                })
            })
        }
    }
    // 返回的二维码如果是图片则用图片，否则用QRCODE（返回的链接用QRCODE插件）
    PictureType(){
        let ret;
        let reg = /\.(gif|jpg|png)\??.*$/;
        reg.test(this.state.PayMentBank.ImageUrl)?
        ret = <img src={window.config.prdImgUrl + this.state.PayMentBank.ImageUrl} width='200'/>:
        ret = <QRCode includeMargin={false} size={160} value={window.config.prdImgUrl + this.state.PayMentBank.ImageUrl || ""}/> 
        return ret; 
    }
    // 转账人，转出账户名，输入金额等input框 Onchange事件改变值
    handleChangeInputVal=(event,val)=>{
        this.setState({
            [val]:event.target.value
        })
    }
    // 支付信息表单
    renderDepositForm(){
        let DepositForm;
        if(Number(this.state.isPayLink)===3&&Number(this.state.payType)===2){ // 银行转账，二维扫码
            DepositForm = (
                <div className='pr'>
                    <p>
                        <label>收款银行:</label>
                        <input value={this.state.PayMentBank.Bank.BankName} id='BankName' readOnly/>
                        <CopyButton copyEle="BankName" />                            
                    </p>   
                    <p>
                        <label>收款姓名:</label>
                        <input value={this.state.PayMentBank.AccountName} id='AccountName' readOnly/>
                        <CopyButton copyEle="AccountName" />
                    </p>     
                    <p>
                        <label>收款账号:</label>
                        <input value={this.state.PayMentBank.AccountNo} id='AccountNo' readOnly/>
                        <CopyButton copyEle="AccountNo" />
                    </p>   
                    <p>
                        <label>转账人姓名:</label>
                        <input placeholder="请输入转账人姓名" value={this.state.Transferor} onChange={e=>this.handleChangeInputVal(e,'Transferor')}/>
                    </p>  
                    <div className="qrcodePay">         
                        {this.PictureType()}      
                    </div>
                </div>
            )
        }else if(Number(this.state.isPayLink)===1&&Number(this.state.payType)===2){ // 银行转账，卡号转账
            DepositForm = (
                <div>
                    <p>
                        <label>帐户名:</label>
                        <input value={this.state.PayMentBank.AccountName} id='AccountName' readOnly/>
                        <CopyButton copyEle="AccountName"/> 
                    </p>                  
                    <p>
                        <label>银行卡号:</label>
                        <input value={this.state.PayMentBank.AccountNo} id='AccountNo' readOnly/>
                        <CopyButton copyEle="AccountNo" />
                    </p>       
                    <p>
                        <label>银行:</label>
                        <input value={this.state.PayMentBank.Bank.BankName} id='BankName' readOnly/>
                        <CopyButton copyEle="BankName" />
                    </p>
                    <p>
                        <label>支行:</label>
                        <input value={this.state.PayMentBank.OpeningBank} id='OpeningBank' readOnly/>
                        <CopyButton copyEle="OpeningBank"/>
                    </p>  
                    <p>
                        <label>转出帐户名:</label>
                        <span>
                            <input type="text" value={this.state.Transferor} onChange={e=>this.handleChangeInputVal(e,'Transferor')} placeholder="(如果非本人卡，请填写)" />
                        </span>
                    </p>
                </div>
            )
        }else{
            DepositForm = (
                <div></div>
            )
        }
        return(
            <div className='depositForm'>
                {DepositForm}
            </div>
        )
    }
    // 点击下一步，只有银行转账，payType==2的时候出现。
    NextStep(){
        var depositmoney = this.state.depositMoney;
        if(!this.state.PayMentBank){
            window.swal({
                title: "请选择您的银行",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        }
        if(!depositmoney||depositmoney==0||depositmoney < this.state.PayMentBank.MinAmount || depositmoney > this.state.PayMentBank.MaxAmount){
            window.swal({
                title: "存款金额错误",
                text: this.state.PayMentBank.Bank.BankName+"允许存款金额范围："+this.state.PayMentBank.MinAmount+"～"+this.state.PayMentBank.MaxAmount,
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return;
        } else if (config.spec.includes("bbt")) {
            window.swal({
                title: "温馨提示",
                text: "公司银行卡不定期更换，每次充值请根据提交订单生成的银行卡转账，切勿直接转账至之前转入的银行卡，否则无法到账，概不负责！",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            }, () => {
                this.setState({
                    showBankForm: true
                })});
        }else {
        this.setState({
            showBankForm:true
        })
       }
    }
    // 第三方支付二维码DOM渲染
    renderThirdDom(){
        let self = this;
        let recordId =self.state.thirdPayRecordId;
        let imgCode = self.state.thirdPayImg;
        let money = this.state.depositMoney;
        return(
            <div className="thirdFrom">
                <QRCode 
                    style={{"float":"right"}}
                    includeMargin={false} //内部是否有margin
                    size={180}  //图片大小
                    value={imgCode || ""} //地址
                />
                <p>
                    您的单号为:<strong>{recordId}</strong>
                    存款账户随时变更，请勿保存当前二维码。<br/>
                    请您用软件扫描二维码进行支付，即可实时到帐！<br/>
                    您需要支付的金额为：<strong style={{color:'#f00'}}>{money}</strong>元
                </p>
                <div>
                    <button onClick={()=>{browserHistory.push("/records_deposit")}}>支付完成</button>
                    <button onClick={()=>{serversOpen(this.props.remoteSysConfs.online_service_link)}}>支付失败</button>
                </div>
            </div>
        )
    }
    // 快捷金额DOM
    renderQuickPay(){
        let arr = [];
        if(this.state.PayMentBank.FixedAmount){
            arr = this.state.PayMentBank.FixedAmount.split(',');// 固定金额
        }else{
            // 如果没有固定金额，则为快捷金额
            arr = this.props.QuickPrice?this.props.QuickPrice.split(','):[5,100,200,500,1000,2000,5000,10000];            
        }
        const that = this;
        function changeDepositMoney(val){
            let addMoney;
            if(that.state.payType===2 && Number(that.props.backConfigs.isDecimal)===1){ // 银行转账的情况下，快捷金额或者固定金额后，添加一个2位小数。
                addMoney = (JSON.parse(val)-0+Math.random()+0.01).toFixed(2); // 快进金额后随机添加一个小数
            }else{
                addMoney = JSON.parse(val)
            }
            that.setState({
                depositMoney:addMoney
            })
        }
        let QuickDom = arr.map(
            item=>{
                return(
                    <span 
                        key={item}               
                        className={
                            // 如果快捷金额超过支付方最大金额或小于支付方最小金额，成灰色显示，并无法点击。
                            Number(this.state.PayMentBank.MaxAmount)<Number(item)||
                            Number(this.state.PayMentBank.MinAmount)>Number(item)?"invalid":
                            (parseInt(this.state.depositMoney)==item?"active":"")
                        } 
                        style={{
                            "pointerEvents":Number(this.state.PayMentBank.MaxAmount)<Number(item)||
                            Number(this.state.PayMentBank.MinAmount)>Number(item)?'none':"all"}}
                        onClick={()=>changeDepositMoney(JSON.stringify(item))}>{item}元
                    </span>
                )
            }
        )
        return(
            <div className='qucikPay clearfix'>
                <label>{this.state.PayMentBank.FixedAmount?"固定":"快捷"}金额:</label>
                <div className='kuaijie'>
                {QuickDom}
                </div>
            </div>
        )
    }
    render(){
        if(this.props.getAllPay.length<1){
            return <p className='text-center' style={{"padding":"20px 0 300px 0"}}>找不到存款方式...</p>
        }
        return(
            <div className='depositNew'>
                <ul className='payMents clearfix'>
                    {this.renderPaymentMethod()}
                </ul>
                {
                    /*
                        三种支付方式，银行转账，在线支付，在线网银。
                        在线支付，在线网银两种支付情况：
                        1、返回二维码，并显示于网页中。
                        2、返回链接，跳转第三方网站。
                        isOenpLink：当前支付方式为第三方链接，
                    */ 
                    this.state.isOenpLink?
                    (
                        this.state.isLoading?
                        <div className="loading-container" style={{"textAlign":"center","color":"black"}}>
                            <Spin wrapperClassName="loadText" tip="拼命加载二维码中..."/>
                        </div>
                        :
                        <div>
                            {/* 支付类型提示语 */}
                            {this.state.hint && <p className='hint'>{this.state.hint}</p>}
                            {
                                // 如果当前支付银行数小于2，固隐藏。
                                this.state.payBanks.length==1 || this.state.payBanks.length<1?
                                null:
                                <p>      
                                    <label>支付方式:</label>           
                                    {this.renderPayBank()}
                                </p>                            
                            }                  
                            {
                                // 如果不存在固定金额，可以输入存款金额
                                !this.state.PayMentBank.FixedAmount?
                                <p>                 
                                    <label>存款金额:</label>
                                    <input value={this.state.depositMoney} onChange={e=>this.handleChangeInputVal(e,'depositMoney')} id='depositNum' placeholder="请输入存款金额" type="number"/>
                                    <CopyButton copyEle="depositNum" /> 
                                    {
                                        this.state.PayMentBank.MinAmount &&
                                        <span className="FontColor ml10 f14">*单笔转账限额 {this.state.PayMentBank.MinAmount}.00~{this.state.PayMentBank.MaxAmount}.00元</span>
                                    }
                                </p> 
                                :null                                      
                            }     
                            {/* 银行转账支付信息表单 */}
                            {this.state.showBankForm && this.renderDepositForm()}
                            {this.state.payType===2 && Number(this.props.backConfigs.isDecimal)===1 ?<p className="FontColor f14" style={{"margin":"-10px 0 10px 0","padding":"0 0 0 120px"}}>温馨提示：为了方便您能快速存款，（快捷/固定）金额选取的金额数会随机加入两位小数。</p>:null}
                            {/* 快捷金额或固定金额 */}
                            {this.renderQuickPay()}
                            {/* 提示语 */}
                            {this.state.payTips && <ins className="remindTexts FontColor">{this.state.payTips}</ins>}        
                            {
                                // payType2为银行转账，1为第三方支付，只有银行转账有下一步，固用state.showBankForm控制显示隐藏。
                                Number(this.state.payType)===2&&!this.state.showBankForm?
                                <button className='SubBut' onClick={this.NextStep.bind(this)} disabled={this.state.payBanks.length<1}>下一步</button>:
                                <button className='SubBut' onClick={this.howToPay.bind(this)} disabled={this.state.payBanks.length<1}>存款</button>
                            }                                                                      
                        </div>                
                    ):
                    //渲染在线支付，在线网银发送API后返回的二维码图。
                    this.renderThirdDom()
                }                        
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        getAllPay:state.getAllPay.PayList,
        QuickPrice:state.getAllPay.QuickPrice,
        user: state.user,
        remoteSysConfs:state.remoteSysConfs,
        backConfigs:state.backConfigs
    }
);


export default connect(mapStateToProps, {})(DepositPage);