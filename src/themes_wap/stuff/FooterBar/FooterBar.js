/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                底部组件-业务逻辑难度为：★
          
*/



import React, { Component } from 'react';
import { Link,IndexLink} from 'react-router';
import { Flex,Modal} from 'antd-mobile';
import "./FooterBar.scss";
import connect from "react-redux/es/connect/connect";
import {config} from "globalConfig";

class FooterBar extends Component {
    constructor(props) {
        super(props);
    }
    // 客服链接
    serviceOpen = () => {
        Modal.alert('是否联系在线客服？','',[
            {text:"确认",onPress:()=>{
                    if(config.isApp){
                        plus.runtime.openURL(this.props.remoteSysConfs.online_service_link)
                    }else {
                        window.open(this.props.remoteSysConfs.online_service_link,'_blank');
                    }
                }
            },
            { text: '取消'}
        ])
    }
    render() {
        return (
            <div className="footerBar" >
                <Flex className="navTabs">
                    <Flex.Item >
                        <IndexLink to="/" activeClassName="active"><i className="icon icon-home"/><span className='nav_txt'>首页</span></IndexLink>
                    </Flex.Item>                 
                    <Flex.Item>
                        <Link to="/money/deposit" activeClassName="active"><i className="icon icon-money"/><span className='nav_txt'>存款</span></Link>
                    </Flex.Item>
                    <Flex.Item>
                        <Link to="/message" activeClassName="active"><i className="icon icon-gift"/><span className='nav_txt'>活动</span></Link>
                    </Flex.Item>
                    <Flex.Item onClick = {this.serviceOpen}>
                        <Link ><i className="icon icon-headphones"/><span className='nav_txt'>客服</span></Link>
                    </Flex.Item>
                    <Flex.Item>
                        <Link to="/myPage" activeClassName="active"><i className="icon icon-user" /><span className='nav_txt'>我的</span></Link>
                    </Flex.Item>
                </Flex>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(FooterBar)