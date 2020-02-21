
import NavigationBar from './CommonNav'
import {connect} from 'react-redux';
import './css/NavigationBar_Vns.scss'

class NavigationBarVNS extends NavigationBar {
    constructor(props){
        super(props);
        this.state={
            DropNav:true,//下拉型2级导航
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

export default connect(mapStateToProps)(NavigationBarVNS)
