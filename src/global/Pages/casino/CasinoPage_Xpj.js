
import CasinoPage from './CasinoCommonPage'
import {connect} from 'react-redux';
import './css/CasinoPage_Xpj.scss'

class CasinoPageVns extends CasinoPage {
    constructor(props){
        super(props);
        this.state={
           
        }
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        gameLayout:state.gameLayout,
        user:state.user
    }
);

export default connect(mapStateToProps, {})(CasinoPageVns);
