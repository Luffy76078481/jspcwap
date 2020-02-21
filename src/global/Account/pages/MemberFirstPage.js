/**
 *                 个人中心1 - 基本信息页               ==> 仅供新站使用
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CopyButton} from 'pui';
import MyDatePicker from '../../Components/Calendar/CalendarTem'
import {serversOpen} from "commonFunc"

class MemberIndexPage extends Component {
    constructor(props) {
        super(props);
        //new ApiQueryBetRecordsAction().fly(); 投注记录
        this.state = { 
            isAddInfo:false,
            startTime:window.Util.formatTime( new Date(new Date(new Date().toLocaleDateString()).getTime()) ), // 默认开始时间 今天的00点       
            changeName:"",
            changeEmail:"",
            changeQ:"",
            changeWachat:"",
            changePhone:""
        }
    }
    // 新手指南、注意点，每个站不同
    renderHelp(){
        if( window.config.spec.includes('dafa') ){
            return "/help/helpcenter.html"
        }else if( window.config.spec.includes('xhtd') ){
            return "/agent.html?tab=Faq"
        }else{
            return "/help.html#commonQ"
        }
    }
    // 跳转修改个人资料页
    changeInfo(){
        this.setState({
            isAddInfo:!this.state.isAddInfo
        })
    }
    // 个人资料
    UserInfos(){
        let ret = []
        let allowChange = true;
        if( this.props.user.realName && this.props.user.email && this.props.user.qq && this.props.user.webChat && this.props.user.birthday && this.props.user.phone){
            allowChange = false
        }
        ret.push(
            <div className="userInfos_wrap pr w clearfix" key='userInfo'>
                <div className="userInfos_top">
                    <h4 className='FontColor m0'>个人资料</h4>
                    <a href={this.renderHelp()} target="_blank" className="btn btn-lg fr bgColor">新手指南</a>
                </div>
                <ul>
                    <li><label>账户名称： </label><span>{this.props.user.username}</span></li>
                    <li><label>等级： </label><span>{this.props.user.userLevelName}</span></li>                    
                    <li>
                        <label>手机：</label>
                        {
                            this.props.user.verfyPhone?
                            <span>{window.Util.AsteriskProcessing(this.props.user.phone,'phone')}"  验证通过"</span>:
                            <span>
                                {window.Util.AsteriskProcessing(this.props.user.phone,'phone')}
                                {
                                    window.config.spec.includes('bee')?null:
                                    <span className='FontColor pointer' onClick={()=>{ document.getElementById("shwoPhone").click()}}>  尚未验证</span>
                                }
                            </span>
                        }
                    </li>   
                    <li><label>姓名： </label><span>{window.Util.AsteriskProcessing(this.props.user.realName)}</span></li>
                    <li>
                        <label>邮箱： </label>
                        {
                            this.props.user.verfyEmail?
                            <span>{window.Util.AsteriskProcessing(this.props.user.email)}"  验证通过"</span>:
                            <span>
                                {window.Util.AsteriskProcessing(this.props.user.email)}
                                <span className='FontColor pointer' onClick={()=>{ document.getElementById("showEmail").click()}}> 尚未验证</span>
                            </span>
                        }
                    </li>
                    <li><label>QQ： </label><span>{this.props.user.qq?window.Util.AsteriskProcessing(this.props.user.qq,'qq'):"未填写"}</span></li>
                    <li><label>微信： </label><span>{this.props.user.webChat?window.Util.AsteriskProcessing(this.props.user.webChat):"未填写"}</span></li>
                    <li><label>生日： </label><span>{this.props.user.birthday?this.props.user.birthday.substr(0,this.props.user.birthday.indexOf("T")):"未填写"}</span></li>
                    <li className="extensionUrl">
                        <label>推广链接： </label>
                        <input ref='recommendCode' id="recommendCode" type="text" value={location.protocol+"//"+ location.hostname + "/register?channel=" +this.props.user.recommendCode} readOnly />
                        <CopyButton copyEle="recommendCode"/>
                    </li>   
                    {
                        allowChange?
                        <li>
                            <p className='addMaterials FontColor mt10 pl30 pointer'>温馨提示：如果您需要补充您的基本信息，请点击<span className="noticeFont" onClick={this.changeInfo.bind(this)}>补充资料</span>进行修改。</p>
                        </li>:
                        null
                    }     
                </ul>
            </div> 
        )
        return ret;
    }
    // 修改资料
    handleChangeInfo=(e,val)=>{
        this.setState({
            [val]:e.target.value
        })
    }
    // 修改资料
    ChangeMaterials(){
        let ret = []
        ret.push(
            <form className="userInfos_wrap pr w clearfix" key='changeInfo' action='' onSubmit = {this.changeUserInfoApi.bind(this)}>
                <div className="userInfos_top">
                    <h4 className='FontColor m0'>资料修改</h4>
                </div>
                <ul>                  
                    <li className='mb10'>
                        <label>真实姓名： </label>
                        {
                            this.props.user.realName?
                            <input type='text' defaultValue={this.props.user.realName} readOnly/>:
                            <input type='text' onChange={e=>this.handleChangeInfo(e,'changeName')} placeholder='真实姓名只允许修改一次'/>
                        }
                    </li>
                    <li className='mb10'>
                        <label>邮箱： </label>
                        {
                             this.props.user.email?
                             <input type='text' defaultValue={this.props.user.email} readOnly/>:
                             <input type='email' onChange={e=>this.handleChangeInfo(e,'changeEmail')} placeholder='邮箱只允许修改一次'/>                           
                        }
                    </li>
                    <li className='mb10'>
                        <label>QQ： </label>
                        {
                             this.props.user.qq?
                             <input type='text' defaultValue={this.props.user.qq} readOnly/>:
                             <input type='number' onChange={e=>this.handleChangeInfo(e,'changeQ')} placeholder='QQ只允许修改一次'/>                           
                        }                        
                    </li>
                    <li className='mb10'>
                        <label>微信： </label>
                        {
                             this.props.user.webChat?
                             <input type='text' defaultValue={this.props.user.webChat} readOnly/>:
                             <input type='text' onChange={e=>this.handleChangeInfo(e,'changeWachat')} placeholder='微信只允许修改一次' maxLength='20'/>                           
                        }    
                    </li>
                    <li className='mb10'>
                        <label>手机： </label>
                        {
                            this.props.user.phone?
                            <input type='text' defaultValue={this.props.user.phone} readOnly/>:
                            <input type='text' onChange={e=>this.handleChangeInfo(e,'changePhone')} placeholder='手机号码只允许填写一次' maxLength='20'/>                          
                        }    
                    </li>  
                    <li className='mb10'>
                        <label>生日： </label>
                        {
                            this.props.user.birthday?
                            <input type='text' defaultValue={this.props.user.birthday.replace("T","  ")} ref='changeBirthday' readOnly/>:
                            <div className='i-block'>
                                <MyDatePicker clearHhmmss="true" placeholder="生日只允许修改一次" ref="changeBirthday"></MyDatePicker>         
                            </div>                      
                        }    
                    </li>  
                    <li style={{"paddingLeft":"120px"}}>
                        <button className='SubBut' style={{"width": "250px"}}>提交修改</button>
                    </li>
                    <li style={{"paddingLeft":"120px"}} className='FontColor mt10'>
                        <p>如果需要修改手机号码请点击<span onClick={()=>serversOpen(this.props.remoteSysConfs.online_service_link)} className='noticeFont pointer'>联系客服</span>进行操作。</p>
                    </li>
                </ul>
            </form> 
        )
        return ret;       
    }
    changeUserInfoApi(e){
        e.preventDefault();
        let _this = this;
        let changeName = this.state.changeName; 
        let changeEmail = this.state.changeEmail; 
        let changeQ = this.state.changeQ; 
        let changeWachat = this.state.changeWachat; 
        let changePhone = this.state.changePhone; 
        let changeBirthday = this.props.user.birthday?"":this.refs.changeBirthday.getValue(); 
        // 如果注册时没有填写真实姓名，且本次可以修改，进行中文判断！
        if( !this.props.user.realName && !window.Util.isChinese(changeName)){
            window.swal("输入错误","请输入中文的真实姓名","error");
            return
        }
        // 注意，以下判断 reducer-user中是否曾经注册填写过这些信息，如果没有且没有补充新的值，提示错误
        if(!changeEmail && !this.props.user.email){
            window.swal("温馨提示","尚未邮箱信息","error");     
            return    
        }
        if(!changeQ && !this.props.user.qq){
            window.swal("温馨提示","尚未QQ信息","error");     
            return    
        }
        if(!changeWachat && !this.props.user.webChat){
            window.swal("温馨提示","尚未微信信息","error");     
            return    
        }
        if(!changeBirthday && !this.props.user.birthday){
            window.swal("温馨提示","尚未生日信息","error");     
            return    
        }
        if(!changePhone && !this.props.user.phone){
            window.swal("温馨提示","尚未手机信息","error");     
            return    
        }
        new window.actions.ApiUpdateInfoAction(changeName,changeQ,changeEmail,changeWachat,changeBirthday,changePhone).fly(resp=>{
            if(resp.StatusCode===0){
                new window.actions.ApiPlayerInfoAction().fly(resp=>{
                    setTimeout(()=>{_this.changeInfo()},300)// 回到首页                    
                });// 刷新个人信息 
            }else{ window.swal("修改失败",resp.Message , "error");}
        });
    }
    render() {
        return (            
            <div>
                {this.state.isAddInfo?this.ChangeMaterials():this.UserInfos()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        login: state.login,
        records: state.records.betRecords.rows,
        remoteSysConfs:state.remoteSysConfs,
    }
);


export default connect(mapStateToProps, {})(MemberIndexPage);