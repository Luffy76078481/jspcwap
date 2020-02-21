import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {serversOpen} from "commonFunc"
import "./NavigationBar.scss"

class NavigationBar extends Component {
    // 导航可能配置红包出口页，也有可能为跳转在线客服，判断其导航配置
    whatsThisNav(val){
        if(val.GotoUrl.indexOf('html')>0){ // 红包页或者其他页面
            window.open(mainNavData.GotoUrl)
        }else if(val.Tag=="server"){
            serversOpen(this.props.remoteSysConfs.online_service_link)
        }else{
            return null
        }
    }
    renderNav(){
        let mainNav = this.props.mainNav;
        let mainNavDom = [];
        const channel_push_url = this.props.remoteSysConfs.channel_push_url; // 手机投注
        for(let i=0;i<mainNav.length;i++){
            let mainNavData = mainNav[i]
            let classNames = "mainTitle " + mainNavData.ClassName + (mainNavData.IsHot?" hot":"") + (mainNavData.IsNew?" new":"");
            mainNavDom.push(
                <li className={classNames} key={i}>
                    <div>
                        <Link 
                            activeClassName={mainNavData.GotoUrl?"active":null} // 没路由没资格
                            to={mainNavData.GotoUrl.indexOf('html')==-1?mainNavData.GotoUrl:null}// 跳转路由
                            href={mainNavData.Tag=="mobile"&&!mainNavData.GotoUrl?channel_push_url:null} // 跳转手机投注
                            onClick={this.whatsThisNav.bind(this,mainNavData)}
                        >
                            {mainNavData.Title}
                        </Link>
                    </div>
                </li>
            )
        }
        return mainNavDom;
    }
    render() {
        return(
            <div className="navMenu">
                <ul className="main-menu">
                    {this.renderNav()}
                </ul>
            </div>
        )        
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        mainNav:state.gameLayout.mainNav,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(NavigationBar)