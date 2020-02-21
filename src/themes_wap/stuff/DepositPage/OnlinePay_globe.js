import React, {Component} from 'react';
import {Modal, List, InputItem, Picker, Toast, Flex} from 'antd-mobile';
import {config} from "globalConfig";
import connect from "react-redux/es/connect/connect";
import {ApiSubmitOnlinePayAction, ApiPlayerInfoAction,ApitempSubmitOnlinePayAction} from "globalAction";
import QRCode from 'qrcode.react';

class onlinePay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isQrCode: false,
            qrCodeImg: "",
            onlinePayItem: this.props.onlinePayList,
            FixedAmountList: [],
            FixedAmountValue: "",
            depositMoney: "",
            hide: false,
            selectAmount: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.onlinePayList,1111111)
        if (nextProps.onlinePayList.Id !== this.props.onlinePayList.Id) {
            this.setState({
                onlinePayItem: nextProps.onlinePayList,
                depositMoney:'',
                selectAmount: '',
            })
        }
    }

    hide() {
        this.setState({
            hide: true
        }, () => {
            setTimeout(() => {
                this.props.hide();
            }, 500)
        })
    }

    changeAmountInput(val) {
        this.setState({
            depositMoney: val
        }, () => {
            if (!!!this.state.depositMoney) this.setState({selectAmount: ''})
        })

    }

    setAmount(item, i) {

        if (item < this.state.onlinePayItem.MinAmount || item > this.state.onlinePayItem.MaxAmount) return;

        this.setState({
            depositMoney: item,
            selectAmount: i
        })
    }

    queryOrder() {
        new ApiPlayerInfoAction().fly();
        window.wapHistoryType.push('/history');
    }

    savePay() {
        let self = this;
        let Thirdpay = this.state.onlinePayItem;
        if (!Thirdpay) {
            Modal.alert(
                "错误",
                "请选择支付方式和支付渠道！"
            );
            return false;
        }
        let depositMoney = this.state.depositMoney;
        let isPayLink = Thirdpay.IsJumpScanCode === 1;
        if (!depositMoney) {
            Modal.alert(
                "存款金额错误",
                "未输入存款金额"
            );
            return false;
        }

        if (depositMoney < Thirdpay.MinAmount || depositMoney > Thirdpay.MaxAmount) {
            Modal.alert(
                "存款金额错误",
                "允许存款金额范围：" + Thirdpay.MinAmount + "～" + Thirdpay.MaxAmount
            );
            return false;
        }
        let param = {  //提交传参
            Amount: depositMoney,
            Id: Thirdpay.Id,
            thirdPayId: Thirdpay.ThirdPayId,
            ReturnType: Thirdpay.IsJumpScanCode === 1 ? "QRLink" : "QRCode",
            Tag: config.webSiteTag,
            BankNo: Thirdpay.BankNo
        };
        if (this.props.isBank) {
            param.ReturnType = "Online";
        }
        Toast.loading(Thirdpay.IsJumpScanCode === 1 ? "支付连接获取中,请稍候！" : "二维码获取中,请稍候！", 300);
        new ApiSubmitOnlinePayAction(param).fly((resp) => {
            Toast.hide();
            if (resp.StatusCode === 0) {
                if (isPayLink) {
                    Modal.alert(
                        "获取支付成功，前往支付?",
                        "",
                        [
                            {text: '取消'},
                            {
                                text: '前往', onPress: () => {
                                    if (config.isApp) {
                                        window.Util.appOpen(resp.Content)
                                    } else {
                                        window.open(resp.Content, '_blank');
                                    }
                                    setTimeout(() => {
                                        Modal.alert(
                                            "支付反馈",
                                            "",
                                            [
                                                {
                                                    text: '支付失败',
                                                    onCancel: () => {
                                                        return
                                                        if (config.isApp) {
                                                            window.Util.appOpen(self.props.remoteSysConfs.online_service_link)
                                                        } else {
                                                            window.open(self.props.remoteSysConfs.online_service_link, '_blank');
                                                        }
                                                    }, style: 'default'
                                                },
                                                {
                                                    text: '支付完成', onPress: () => {
                                                        new ApiPlayerInfoAction().fly();
                                                        window.wapHistoryType.push('/history');
                                                    }
                                                }
                                            ]
                                        )
                                    }, 1000)
                                }
                            },
                        ]
                    );
                } else {
                    self.setState({
                        isQrCode: true,
                        qrCodeImg: resp.Content
                    })
                }
            } else {
                if (resp.Message) {
                    Modal.alert("错误", resp.Message);
                } else {
                    Modal.alert("错误", "二维码生成失败，请稍后再试或联系客服");
                }
            }

        })
    }

    hide() {
        this.setState({
            isQrCode: false
        })
    }

    render() {
        let className = this.state.isQrCode ? "QrcodeDeposit slideInUp" : "QrcodeDeposit slideOutDown";
        // 优先 FixedAmount  其次quickPrice 再次 前端固定的金额
        let quickAmountArr = (
            !!this.state.onlinePayItem.FixedAmount && this.state.onlinePayItem.FixedAmount.split(',')
        ) || (
            (!!this.props.quickPrice && this.props.quickPrice.split(',')) || [51, 101, 201, 501, 1001, 2001, 5001, 10001]
        );
        return (
            <div>
                <div>
                    <p className='addMoney'>充值金额</p>
                    {/*注释*/}
                    {
                        !!!this.state.onlinePayItem.FixedAmount &&
                        <List.Item className="depositMoney">
                            <InputItem
                                ref="money"
                                clear
                                value={this.state.depositMoney}
                                maxLength={15}
                                type="digit"//原生的number类型支持小数
                                onChange={this.changeAmountInput.bind(this)}
                                placeholder={"请填写存款金额，范围" + (this.state.onlinePayItem.MinAmount || ' ') + '~' + (this.state.onlinePayItem.MaxAmount || ' ')}
                            >￥</InputItem>
                        </List.Item>
                    }
                    {/* <div className="hit-text"></div> */}
                    {/*注释*/}
                    <Flex className="quick-amount" wrap="wrap" justify="center">
                        {
                            quickAmountArr.map((item, i) => {
                                let minAmount = this.state.onlinePayItem.MinAmount;
                                let maxAmount =this.state.onlinePayItem.MaxAmount;
                                let className= 'inline';
                                if(this.state.selectAmount === i) className='inline active';
                                if( item < minAmount  || item > maxAmount) className='inline disable';
                                return (
                                    <div key={i} className={className} onClick={this.setAmount.bind(this, item, i)}>{item}元</div>
                                )
                            })
                        }
                    </Flex>
                    {/*注释*/}
                    <a onClick={this.savePay.bind(this)} className="btn">确定存款</a>
                    <p className={'reminderTxt'}>{!!this.props.reminder && this.props.reminder}</p>
                </div>
                {this.state.isQrCode ?
                    <div className={className} style={{position: "fixed"}}>
                        <div className="mask"/>
                        <div className="dom">
                            <div className="title">
                                <i className="icon icon-remove" onClick={this.hide.bind(this)}/>
                                {this.props.BankName}
                                <a onClick={this.queryOrder.bind(this)}>支付完成</a>
                            </div>
                            <div className="amount">
                                支付金额:<span>￥{this.state.depositMoney}</span>
                            </div>
                            <div className="con">
                                <div className="qrcode">
                                    <QRCode className="qrImg"
                                            includeMargin={true} //内部是否有margin
                                            size={200}  //图片大小
                                            value={this.state.qrCodeImg || ""} //地址
                                    />
                                </div>
                                <div className="text">
                                    <i className="icon icon-info-sign"/>
                                    <strong>长按保存二维码</strong>，或使用 <strong>截屏保存</strong>，打开{this.props.BankName}<strong>扫描相册二维码</strong>完成支付。如无法充值，请联系客服。
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        remoteSysConfs: state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(onlinePay)