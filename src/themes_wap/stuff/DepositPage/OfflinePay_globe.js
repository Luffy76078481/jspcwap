import React, { Component } from 'react';
import {Modal, List, InputItem,Flex} from 'antd-mobile';
import connect from "react-redux/es/connect/connect";
import AtmBox from './AtmBox';//银行转账表单组件
import QrBox from "./QrBox";//银行转账二维码组件asdasd AAASasasa
import { config } from '../../../../config/config_Wap';

class offlinePay extends Component{
    constructor(props){
        super(props);
        this.state={
            offlinePayItem:this.props.offlinePayItem,
            depositMoney:"",
            boxData:{},
            showQrBox:false,
            showBox:false
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.id !== this.props.id){
            this.setState({
                offlinePayItem:nextProps.offlinePayItem,
                depositMoney:'',
            })
        }
    }
    changeAmountInput(val) {
        this.setState({
            depositMoney: val
        })
    }
    setAmount(item, i) {
        let minAmount = this.state.offlinePayItem.MinAmount;
        let maxAmount = this.state.offlinePayItem.MaxAmount;
        if (item < minAmount || item > maxAmount) return;   
        this.setState({
            depositMoney:Number(this.props.backConfigs.isDecimal)===1?(item-0+Math.random()+0.01).toFixed(2):item,
            //selectAmount:i
        })
    }
    nextBox(){//显示银行信息表单
        let offPay = this.state.offlinePayItem;
        let depositMoney = this.state.depositMoney;

        if (!depositMoney || depositMoney === 0 || depositMoney < offPay.MinAmount || depositMoney > offPay.MaxAmount) {
            Modal.alert(
                "存款金额错误",
                offPay.Bank.BankName + "允许存款金额范围：" + offPay.MinAmount + "～" + offPay.MaxAmount
            );
            return;
        } else  if(config.spec.includes("bbt")) {
            Modal.alert("温馨提示", "公司银行卡不定期更换，每次充值请根据提交订单生成的银行卡转账，切勿直接转账至之前转入的银行卡，否则无法到账，概不负责！", [
                {
                    text: '确定', onPress: () => {
                        this.setState({
                            showBox: true,
                            showQrBox: (this.state.offlinePayItem.Type === 3),
                            boxData: {
                                offPay,
                                depositMoney,
                                user: this.props.user
                            }
                        });} },
            ] )
        }else {
        this.setState({
            showBox: true,
            showQrBox: (this.state.offlinePayItem.Type === 3),
            boxData: {
                offPay,
                depositMoney,
                user: this.props.user
            }
        });
        }
    }
    render(){  
        let quickAmountArr = (!!this.props.quickPrice && this.props.quickPrice.split(',')) || [51, 101, 201, 501, 1001, 2001, 5001, 1000001];
        return (
            <div className='payMethod'>
                <div className="fuckyou">
                    {/*金额输入-start*/}
                    <p className='addMoney'>充值金额</p>
                    <List.Item className="depositMoney">
                        <InputItem
                            ref="money"
                            clear
                            value={this.state.depositMoney}
                            maxLength={15}
                            type="digit"//原生的number类型支持小数
                            onChange={this.changeAmountInput.bind(this)}
                            placeholder={"请填写存款金额，范围为" + (this.state.offlinePayItem.MinAmount || ' ') + '~' + (this.state.offlinePayItem.MaxAmount || ' ')}
                        >￥</InputItem>
                    </List.Item>
                    {
                        Number(this.props.backConfigs.isDecimal)===1?
                        <div className="hit-text">*（快捷/固定）选取的金额会随机生成2位小数。</div>:
                        <div className="hit-text"></div>
                    }
                    <Flex className="quick-amount" wrap="wrap" justify="center">
                        {
                            quickAmountArr.map((item,i) => {
                                let minAmount = this.state.offlinePayItem.MinAmount;
                                let maxAmount =this.state.offlinePayItem.MaxAmount;
                                let className= 'inline';
                                if(item-0 === parseInt(this.state.depositMoney)-0) className='inline active';
                                if( item < minAmount  || item > maxAmount) className='inline disable';
                                return(
                                    <div key={i} className={className} onClick={this.setAmount.bind(this,item,i)}>{item}元</div>
                                )
                            })
                        }
                    </Flex>
                    {/*下一步-start*/}
                    <a onClick={this.nextBox.bind(this)} className="btn">下一步</a>
                    {/*下一步-  end*/}
                    {/*金额输入-  end*/}
                    <p className={'reminderTxt'}>{!!this.props.reminder && this.props.reminder}</p>
                    {/*金额快选-start*/}
                </div>
                {
                    this.state.showBox && (
                        this.state.showQrBox ?
                        <QrBox hide={() => this.setState({showBox: false})} {...this.state.boxData} />
                        :
                        <AtmBox hide={() => this.setState({showBox: false})} {...this.state.boxData} />
                    )
                }

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
{
    user:state.user,
    remoteSysConfs:state.remoteSysConfs,
    backConfigs:state.backConfigs
}
);

export default connect(mapStateToProps)(offlinePay)