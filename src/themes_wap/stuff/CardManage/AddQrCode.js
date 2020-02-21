import React, { Component } from 'react';
import {NavBar, Icon, List, InputItem,Picker,Toast,Modal,ImagePicker} from 'antd-mobile';
import {browserHistory,Link} from 'react-router';
import connect from "react-redux/es/connect/connect";
import {provinces} from "provincesJson";
import './CardManage.scss';

class AddQrCode extends Component{
    constructor(props) {
        super(props);
        this.submitStateLock = true;
        let Channel = [
            {
                label:"支付宝",
                value:2,
            },
            {
                label:"微信",
                value:3
            }
        ];
        this.state={
            Channel:Channel,
            ChannelValue:[2],
            QRpath:"",
            files:[]
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
    channelChange(val){
        let index=val[0];
        this.setState({
            ChannelValue:[index],
        })
    }
    onChangeFile(files, type, index){
        let _self = this;
        if(files.length>0){
            let formData = new FormData();
            formData.append("dirName","withdraw");
            formData.append("file", files[0].file);
            Toast.loading('图片上传中,请稍候...',300)
            new window.actions.ApiUploadafileAction(formData).fly((resp)=>{
                Toast.hide();
                if(resp.StatusCode === 0){
                    _self.setState({
                        files,
                        QRpath:resp.Data.filePath
                    });
                }else{
                    Modal.alert('上传错误！',resp.Message);
                }
            })
        }else {
            _self.setState({
                files,
                QRpath:""
            });
        }
    }
    bindCardAction(){
        let _this = this;
        let params = {//后台要接收的参数
            CodeType:this.state.ChannelValue[0],
            CodePath:this.state.QRpath,
            AccountName:this.refs.username.state.value,
            AccountNo:this.refs.accountName.state.value
        };
        new window.actions.ApiAddBankCardExtAction(params).fly(
            resp=>{
                _this.submitStateLock=true;
                Toast.hide();
                if (resp.StatusCode === 0) {
                    Modal.alert('二维码添加成功!','是否继续添加？',[
                            {
                                text:"返回",onPress:()=>{
                                new window.actions.ApiBankAccountsAction().fly();
                                window.wapHistoryType.push('/cardManage')
                            }
                            },
                            {text:"继续添加",onPress:()=>{
                                new window.actions.ApiBankAccountsAction().fly();
                                _this.setState({
                                    QRpath:"",
                                    files:[]
                                })
                            }}
                        ]
                    )
                }else{
                    Modal.alert('上传错误！',resp.Message);
                }

            });
    }
    submit(){
        let _this = this;
        if(!this.submitStateLock){
            return;
        }
        let realName = !this.props.user.realName? this.refs.realName.state.value:null;
        let username=  this.refs.username.state.value;
        if(realName!=null && realName==""){
            Modal.alert('错误!',"为确保正常提款,请认真填写您的真实姓名!");
            return;
        }
        if(!username){
            Modal.alert('错误!',"帐户名不能为空!");
            return;
        }
        if(!this.refs.accountName.state.value){
            Modal.alert('错误!','请填写您的账号！');
            return;
        }
        if(this.state.files.length==0){
            Modal.alert('错误!','请先上传您的二维码图片！');
            return;
        }
        this.submitStateLock=false;
        if(!this.props.user.realName){
            Toast.loading('二维码添加中，请稍候...',300)
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
            Toast.loading('二维码添加中，请稍候...',300)
            _this.bindCardAction();
        }
    }

    render(){
        return(
            <div className="CardManage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push('/cardManage')}
                >绑定支付宝、微信</NavBar>
                <div className="scroll-content">
                    <List>
                        {
                            this.props.user.realName?null:
                                <InputItem
                                    placeholder="为确保正常提款，请输入您的真实姓名"
                                    defaultValue={this.props.user.realName}
                                    clear
                                    maxLength={12}
                                    type="text"
                                    className="warning-placehoder"
                                    ref="realName"
                                >
                                    真实姓名
                                </InputItem>
                        }
                        <Picker extra="选择渠道"
                                data={this.state.Channel}
                                value={this.state.ChannelValue}
                                ref="channel"
                                cols={1}
                                onOk={(val)=>{this.channelChange(val)}}
                        >
                            <List.Item arrow="down">选择渠道:</List.Item>
                        </Picker>
                        <InputItem
                            placeholder="为确保正常提款，账户名请对应您的真实姓名"
                            defaultValue={this.props.user.realName}
                            clear
                            type="text"
                            className="warning-placehoder"
                            ref="username"
                        >
                            帐户名
                        </InputItem>
                        <InputItem
                            placeholder="支付宝、微信收款帐户名"
                            clear
                            ref="accountName"
                        >
                            账号:
                        </InputItem>
                        <div className="updateCode">
                            <ImagePicker
                                length="1"
                                files={this.state.files}
                                onChange={this.onChangeFile.bind(this)}
                                accept="image/gif,image/jpeg,image/jpg,image/png"
                                selectable={this.state.files.length <1}
                            />
                            <p className="tips">*请上传的对应的二维码图片,您可以通过手机截图您的二维码,然后在图库中选择！</p>
                        </div>
                    </List>
                    <button onClick={this.submit.bind(this)} className="btn">绑定新渠道</button>
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

export default connect(mapStateToProps)(AddQrCode)