/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                帮助说明-业务逻辑难度为：★
          
*/


import React, { Component } from 'react';
import {NavBar, Icon} from 'antd-mobile';
import connect from "react-redux/es/connect/connect";
import BScroll from "better-scroll"
import './HelpPage.scss';

class HelpPage extends Component{
    constructor(props) {
        super(props);
    }
    state={
        contentHeight: 0
    }
    componentDidMount() {
        //初始化滚动插件
        window.homeScroll = new BScroll(this.refs.wrapper, {
            click:true
        })
    }
    render(){
        return(
            <div className="HelpPage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push('/myPage')}
                >帮助说明</NavBar>
                <div className='wrapper' ref="wrapper">
                    <div className="helpPage content" dangerouslySetInnerHTML={{__html:this.props.remoteSysConfs.app_help_text}}></div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(HelpPage)