/*
        个人中心1 —————————————————— 修改密码
*/

import React, {Component} from 'react';
import { connect } from 'react-redux'
import ChangePayPwdComponent from './ChangePayPwdComponent';
import ChangeLoginPwdComponent from './ChangeLoginPwdComponent';

class EditPassWordPage extends Component {
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render(){
        return(
            <div className="reportWrapper">
                <div className="row">
                    <div className="col-md-6" style={{padding:'0 40px'}}>
                        <h2 className="title">修改登录密码</h2>
                        <ChangeLoginPwdComponent></ChangeLoginPwdComponent>
                    </div>
                    <div className="col-md-6" style={{padding:'0 40px'}}>
                        <h2 className="title">修改取款密码</h2>
                        <ChangePayPwdComponent isPayPassword="true"></ChangePayPwdComponent>
                    </div> 
                    <p className="FontColor f14 text-center">
                        *若注册时没有填写支付密码，且无更动过支付密码，支付密码则与帐号登入密码相同或者“0000”<br/>
                        修改密码过程中，如遇问题请联系
                        <a className='noticeFont' onClick={this.serversOpen.bind(this)}>在线客服</a>。
                    </p>         
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps) (EditPassWordPage);