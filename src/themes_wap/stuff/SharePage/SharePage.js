import React, { Component } from 'react';
import {NavBar,Icon,Toast} from 'antd-mobile';
import connect from "react-redux/es/connect/connect";
import './SharePage.scss';
import QRCode from 'qrcode.react';

class SharePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            recommended_num:0
        }
    }
    componentDidMount(){
        new window.actions.ApiPeopleCount().fly(res=>{
            if(res.StatusCode===0){
                this.setState({
                    recommended_num:res.Count
                })
            }
        })
    }
    copyCode(copyId){
        var copyObj = document.getElementById(copyId);
        copyObj.select();
        copyObj.setSelectionRange(0, copyObj.value.length);
        document.execCommand("Copy");
        Toast.success('复制成功',1);
    }

    render(){
        let host = window.location.host;
        let promo_url = host + '/register?channel='+this.props.user.recommendCode;
        console.log(promo_url,11111111111111)
        return(
            <div className="SharePage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.goBack()}
                >好友推荐</NavBar>
                <div className="wrapper">
                    <div className='copy_link_box' onClick={this.copyCode.bind(this,'code_content')}>
                        <span className='text_tip'>复制推荐链接</span>
                        <div className='url_code'>
                            <input id="code_content" className='link_url' value={promo_url} readOnly />
                            <i className='icon icon-paste' onClick={this.copyCode.bind(this,'code_content')} />
                        </div>
                    </div>
                    <div className='recmmended_num'>已推荐好友人数: {this.state.recommended_num}</div>
                    <div className='qr_code_box'>
                        <QRCode includeMargin={false} size={157} value={promo_url} className="qrImg" alt=""  />
                        <p style={{marginTop:'0.6rem'}}>请使用带有扫码功能的浏览器进行扫码</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
    }
);

export default connect(mapStateToProps)(SharePage)