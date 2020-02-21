import React, {Component} from 'react';
import {NavBar, Icon, List, Picker ,Flex} from 'antd-mobile';
import {ApiGetAllPayAction} from "globalAction";
import OnlinePay from './OnlinePay_globe';   //在线支付
import OfflinePay from './OfflinePay_globe'; //银行转账
import connect from "react-redux/es/connect/connect";
import './DepositPage.scss';
import {config} from 'globalConfig';

class DepositPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payTab: "", //支付方式切换
            remark: '', //
            reminder: '', //
            payMethodValue: [0],//支付方式的值
            showOnlinePay: false,//true 第三方 false 银行转账
            OnlinePay: {
                bankName: "",
                onlinePayList: [],
                quickPrice:'',
                hintMsg: '',
            },
            OfflinePay: {
                bankName: "",
                offlinePayItem: {},
                quickPrice:'',
                hintMsg: '',
            }
        };
        this.payMethodList = [];
    }
    componentWillMount() {
        new ApiGetAllPayAction(true).fly()
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.pay !== nextProps.pay && nextProps.pay[0]) {
            this.tabChange(nextProps.pay[0].PayTypeCode, nextProps.pay[0].Remark, nextProps.pay[0].PayBanks,nextProps.quickPrice)
        }
    }
    tabChange(TypeCode,remark,banks,nextQuickPrice) {

        let quickPrice = nextQuickPrice;
        this.payMethodList = [...banks.AdminBanks, ...banks.ThirdPayBanks].map((item, i) => {
            let styleSheet = {
                // background: 'url(' + config.devImgUrl + ((item.LogoImg || item.LogoImg == '') || item.Bank.LogoImg) + ') 0 0 / cover',
                width:'18px',
                height:'18px',
                marginRight:'5px',
                display: 'inline-block',
                verticalAlign: 'middle',
            };
            // item.hintMsg =
            //     TypeCode == 'alipay_bank' ||
            //         TypeCode == 'wechat' ||
            //         TypeCode == 'bankpay'
            //         ? "为了您的存款快速到账，请输入非整百带小数的金额。":'';
            return ({
                label: (
                    <div key={i}>
                        <span style={styleSheet}/>
                        <span>{(item.BankName || item.Bank.BankName) + (item.AliasName ? ' - ' + item.AliasName : "")} </span>
                    </div>
                ),
                selfObj: item,
                value: i
            });
        });
        this.setState({
            payTab: TypeCode,
            remark: remark,
        });
        this.setBankMsg(this.payMethodList[0].selfObj,quickPrice)
    }
    changePay(val) {
        let {quickPrice} = this.props;
        this.setBankMsg(this.payMethodList[val[0]].selfObj,quickPrice,val[0])
    }
    setBankMsg(bank,quickPrice,i = 0) {
        let bankName = bank.BankName || bank.Bank.BankName;
        this.setState({
            payMethodValue: [i],
            showOnlinePay: (bank.PayType === 2 ? false : bank.PayType !== 2),
            OnlinePay: {
                bankName,
                quickPrice,
                reminder: bank.Reminder,
                onlinePayList: bank,
                hintMsg: bank.hintMsg,
            },
            OfflinePay: {
                bankName,
                quickPrice,
                reminder: bank.Reminder,
                id: bank.Id,
                offlinePayItem: bank,
                hintMsg: bank.hintMsg,
            },
        });
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    leftContent={'返回'}
                    onLeftClick={() => window.wapHistoryType.push('/myPage')}
                >存款</NavBar>
                <div className=" DepositPage">
                    {/*选择支付方式-start*/}
                    <p className='choosePay'>选择支付方式</p>
                    {this.state.remark && <p className='remark'>{this.state.remark}</p>}          
                    <Flex className="payTabs" wrap="wrap">
                        {
                            !this.props.pay ?null:
                            this.props.pay.map((item, i) => {
                                let className = "tabsItem";
                                if (this.state.payTab === item.PayTypeCode) className = "tabsItem active";
                                return (
                                    <div key={i} className={className + (item.Discounted ? ' iscounted' : '')+ (item.Recommend ? ' recommend' : '') }
                                            onClick={this.tabChange.bind(this, item.PayTypeCode, item.Remark, item.PayBanks,this.props.quickPrice)}>
                                        {
                                            item.Id === 0 ?
                                                <div className={'img'}/>
                                                :
                                                <img src={config.devImgUrl + item.ImageUrl}/>
                                        }
                                        <div className={'text'}>{item.PayTypeName}</div>
                                        <div className='checkIcon'/>
                                        <div className='recommendImg'/>
                                    </div>
                                )
                            })
                        }
                    </Flex>
                    {/*选择支付方式-  end*/}
                    <List className='payMethodValue'>
                        {/*选择银行-start*/}
                        {
                            this.payMethodList.length === 1 ?
                                null
                                :
                                <div className="fuckyou">
                                    <p style={{ display: "block", padding: '0 15px', fontWeight: 'bold', margin: '.2rem 0'}}>选择通道</p>
                                    <Picker extra={"请选择银行"}
                                            data={
                                                this.payMethodList.length === 0 ?
                                                    [{label: (<span style={{color: '#ccc'}}>抱歉,暂无数据!</span>), value: -1}]
                                                    :
                                                    this.payMethodList
                                            }
                                            value={this.state.payMethodValue}
                                            ref="payMethod"
                                            cols={1}
                                            onOk={(val) => this.changePay(val)}
                                    >
                                        <List.Item arrow="down"/>
                                    </Picker>
                                </div>
                        }
                        {/*选择银行-  end*/}
                        {/*切换支付方式-start*/}
                        {
                            this.state.showOnlinePay ?
                                <OnlinePay {...this.state.OnlinePay}/>:
                                <OfflinePay showAtmBox={() => this.setState({showAtmBox: true})} {...this.state.OfflinePay}/>
                        }
                        {/*切换支付方式-  end*/}

                    </List>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        payOnline: state.payOnline,
        pay: state.getAllPay.PayList,
        quickPrice:state.getAllPay.QuickPrice,
        allOfflineAccount: state.allOfflineAccount.allOfflineBanks,
    }
);

export default connect(mapStateToProps)(DepositPage)