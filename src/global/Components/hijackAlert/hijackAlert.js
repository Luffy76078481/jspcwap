

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import "./hijackAlert.scss";

class HijackAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPop:true,
            showYWZ:false,
            showQKM:false,
        }
    }

    closePop(){
        this.setState({
            showPop:false
        });
    }

    submitUrl(){
        if(this.checkQKM() || this.checkYWZ())return;
        new window.actions.ApiChangeSourceWithdrawalPasswordAction(this.refs.YWZ.value,this.refs.QKM.value).fly(resp=>{
            if (resp.StatusCode === 0) {
                new window.actions.ApiPlayerInfoAction().fly();
            }
        });
    }

    routerTobroush(){
        browserHistory.push("deposit")
    }

    checkQKM(){
        if(this.refs.QKM.value == ""){
            this.setState({
                showQKM:true
            })
            return true;
        }else{
            this.setState({
                showQKM:false
            })
            return false;
        }
    }

    checkYWZ(){
        if(this.refs.YWZ.value == ""){
            this.setState({
                showYWZ:true
            })
            return true;
        }else{
            this.setState({
                showYWZ:false
            })
            return false;
        }
    }

    render() {
        return (
            <div >
                {this.state.showPop && this.props.user.IsSourceUser == 1&&!this.props.user.SourceWithdrawalPassword?
                    <div className="hijack-alert">
                        <div className="hijack-box">
                            <p>为了保证您的账号安全,请做第二次验证</p>
                            <button onClick={this.closePop.bind(this)} type="button" className="close"><i className="fa fa-close"></i></button>
                            <ul>
                                <li>
                                    <span>原网址</span>
                                    <input ref="YWZ" onBlur={this.checkYWZ.bind(this)} type="text"/>
                                    <div className="hijack-ywz" style={{"display":this.state.showYWZ?"block":"none"}}>请正确填写您的原网址</div>
                                </li>
                                <li>
                                    <span>原取款密码</span>
                                    <input ref="QKM" onBlur={this.checkQKM.bind(this)} type="password"/>
                                    <div className="hijack-qkm" style={{"display":this.state.showQKM?"block":"none"}}>请正确填写您的原取款密码</div>
                                </li>
                                <li>
                                    <button onClick={this.submitUrl.bind(this)} className="hijack-button" type="button">提交</button>
                                    <button onClick={this.routerTobroush.bind(this)} className="hijack-button" type="button">存款</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                :null}

            </div>
        )

    }
}


const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
    }
);

export default connect(mapStateToProps)(HijackAlert)