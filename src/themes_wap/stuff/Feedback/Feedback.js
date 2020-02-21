// 业务难度： ★

import React, { Component } from 'react';
import {TextareaItem, NavBar, Icon, Modal, Toast} from 'antd-mobile';
import {ApiFeedBackAction} from 'globalAction'
import {browserHistory} from 'react-router';
import connect from "react-redux/es/connect/connect";
import "./Feedback.scss";


class Feedback extends Component{
    constructor(props) {
        super(props);
        this.state={
            disabled:true
        }
    }
    onChange(val){
        let newVal = val.replaceAll(' ','')
        if(newVal.length>0){
            this.setState({
                disabled:false
            })
        }else{
            this.setState({
                disabled:true
            })
        }
    }
    submit(){
       let val =  this.refs.textarea.state.value;
       Toast.loading('反馈提交中...',300);
       new ApiFeedBackAction(val).fly(resp=>{
           Toast.hide();
           if(resp.StatusCode==0){
               Modal.alert('问题提交成功!','',[{text:"确认",onPress:()=>window.wapHistoryType.goBack()}]);

           }else{
               Modal.alert('问题提交失败!',resp.Message);
           }
       })
    }
    render(){
        return(
            <div className="feedbackPage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={window.wapHistoryType.goBack}
                >意见建议</NavBar>
                <div className="scroll-content Feedback" >
                    <TextareaItem
                        placeholder="问题描述(不得超过150字)"
                        rows={7}
                        ref="textarea"
                        count={150}
                        onChange={this.onChange.bind(this)}
                    />
                    <button disabled={this.state.disabled} onClick={this.submit.bind(this)} className="btn">
                        提交
                    </button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
    }
);

export default connect(mapStateToProps)(Feedback)