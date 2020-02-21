
import NavigationBar from './CommonNav'
import {connect} from 'react-redux';
import './css/NavigationBar_Xpj.scss'

class NavigationBarXPj extends NavigationBar {
    constructor(props){
        super(props);
        const NavigationBar = window.r.props('NavigationBar')
        this.state={
            // isNotSecondNav 是否没有2级导航
            DropNav:NavigationBar.isNotSecondNav?false:true,//下拉型2级导航
            FontIcon:true,//首页字体图标
        }
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        remoteSysConfs:state.remoteSysConfs,
        mainNav:state.gameLayout.mainNav,
     }
);

export default connect(mapStateToProps)(NavigationBarXPj)
