import React, { Component } from 'react';
import {Icon,Flex,List, InputItem,NavBar,Modal,Toast,Switch} from "antd-mobile";
import {
    ApiGamePlatformBalanceAction,
    ApiPlayerInfoAction,
    ApiTransferAction
} from "globalAction";
import connect from "react-redux/es/connect/connect";

class TransferPage extends Component{
    constructor(props) {
        super(props);
        this.submitState=true;//防止多次提交
        this.state={
            Balance:0,
            money:"",
            transferType:true,
        }
    }
    componentWillMount(){
        let _this =this;
        new ApiGamePlatformBalanceAction(this.props.params.platformID).fly(resp=>{
            if(resp.StatusCode==0){
                this.setState({
                    Balance:resp.Balance
                })
            }
        })
    }
    moneyChange(val){
        this.setState({
            money:parseInt(val-0)
        })
    }
    reload(platformId){
        new ApiPlayerInfoAction().fly();
        new ApiGamePlatformBalanceAction(platformId).fly(resp=>{
            if(resp.StatusCode==0){
                this.setState({
                    Balance:resp.Balance
                })
                Toast.hide();
                Modal.alert('恭喜您转账成功！')
            }
        });
    }
    transferIn(platformId,total){
        if(!this.submitState) return;
        new ApiTransferAction (platformId,"in", total).fly((resp)=>{
            if (resp.StatusCode === 0) {
                this.reload(platformId);
            }else{
                Toast.hide();
                Modal.alert(resp.Message);
            }
            this.submitState = true;
        }, "transfer_in_" + platformId);
    }
    transferOut(platformId,total){
        if(!this.submitState) return;
        this.submitState = false;
        new ApiTransferAction (platformId,"out", total).fly((resp)=>{
            if (resp.StatusCode === 0) {
                this.reload(platformId);
            }else{
                Toast.hide();
                Modal.alert(resp.Message);
            }

            this.submitState = true;
        }, "transfer_out_" + platformId);
    }
    transfer(){
        let type = this.state.transferType;
        let total = this.refs.money.state.value;
        let totalMoney = type?this.props.user.amount:this.state.Balance;
        let text = type?"转入":"转出";
        if (!total) {
            Modal.alert('请填写转账金额!');
            return;
        }else if(total<1){
            Modal.alert('转账金额必须大于1元!');
            return;
        }else if(total>totalMoney){
            Modal.alert('您的'+text+'金额超出了余额!');
            return;
        }
        Toast.loading(text+'中,请稍后...',300);
        if(type){
            this.transferIn(this.props.params.platformID,total)
        }else{
            this.transferOut(this.props.params.platformID,total)
        }
    }

    render(){
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push('/money')}
                >{this.props.params.platformID}</NavBar>
                <div className="scroll-content MoneyManage">
                    <div className="profile">
                        <Flex className="userCash">
                            <Flex.Item>
                                <i className="icon icon-credit-card"></i>
                                <div className="itemR">
                                    <span className="title">主账户余额</span>
                                    <span>{this.props.user.amount}<em> RMB</em></span>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <i className="icon icon-money"></i>
                                <div className="itemR">
                                    <span className="title">总财富</span>
                                    <span>{this.props.user.userBalance}<em> RMB</em></span>
                                </div>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <List>
                        <List.Item extra={this.state.Balance}>
                            平台余额
                        </List.Item>
                        <List.Item
                            extra={<Switch
                                checked={this.state.transferType}
                                onChange={() => {
                                    this.setState({
                                        transferType: !this.state.transferType,
                                    });
                                }}
                            />
                            }
                        >
                            转入转出
                        </List.Item>
                        <InputItem
                            type="Number"
                            ref="money"
                            onChange={this.moneyChange.bind(this)}
                            value={this.state.money}
                            maxLength={15}
                            placeholder="请填写转账金额"
                            extra={<span className='allM' onClick={() => { this.setState({ money: (this.state.transferType ?  parseInt(this.props.user.amount) : parseInt(this.state.Balance)) }) }}>全部</span>}
                            clear
                        >转账金额</InputItem>
                    </List>
                    <button onClick={this.transfer.bind(this)} className="btn">{this.state.transferType?"转入":"转出"}{this.props.params.platformID}</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        platforms:state.game.platforms,
    }
);

export default connect(mapStateToProps)(TransferPage)