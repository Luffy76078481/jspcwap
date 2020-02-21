
import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import "./NavigationBar.scss"

class NavigationBar extends Component {
    renderNav(){
        let mainNav = this.props.mainNav;
        let mainNavDom = [];
        for(let i=0;i<mainNav.length;i++){
            let mainNavData = mainNav[i];
            let classNames = "mainTitle " + mainNavData.ClassName + (mainNavData.IsHot?" hot":"") + (mainNavData.IsNew?" new":"");
            mainNavDom.push(
                <li key={i} className={classNames}>
                    <div>
                        <Link 
                            activeClassName={mainNavData.GotoUrl?"active":null} // 没路由没资格
                            to={mainNavData.GotoUrl.indexOf('html')==-1?mainNavData.GotoUrl:null}// 跳转路由
                            href={mainNavData.Tag=="mobile" && !mainNavData.GotoUrl?this.props.remoteSysConfs.channel_push_url:null} // 跳转手机投注
                            onClick={ mainNavData.GotoUrl.indexOf('html')>0?()=>{  window.open(mainNavData.GotoUrl)}:null } // 跳转其他页面（红包页）
                        >
                            {mainNavData.Title}
                        </Link>
                    </div>
                </li>
            );
        }
        return mainNavDom;
    }
    render() {
        return (
            <nav role="navigation" className="Navigation">
                <ul>
                    {this.renderNav()}
                </ul>
            </nav>
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