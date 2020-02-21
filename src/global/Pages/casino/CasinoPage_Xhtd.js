
import CasinoPage from './CasinoCommonPage'
import {connect} from 'react-redux';
import './css/CasinoPage_Xhtd.scss'

class CasinoPageVns extends CasinoPage {
    constructor(props){
        super(props);
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        gameLayout:state.gameLayout
    }
);

export default connect(mapStateToProps, {})(CasinoPageVns);
