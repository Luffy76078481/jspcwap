
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router";
import {ApiAllSysConfigAction} from 'globalAction'
import "./AffixService.scss";
import slotGame1 from "./images/slot-game1.png";
import slotGame2 from "./images/slot-game2.png";
import slotGame3 from "./images/slot-game3.png";
import slotGame4 from "./images/slot-game4.png";
import slotGame5 from "./images/slot-game5.png";
class AffixService extends Component{
    componentWillMount(){
        new ApiAllSysConfigAction().fly();
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    render(){
        return (
            <div className="affix-left">
                <Link to="/games" className="slotGame1">
                    <img src={slotGame1} />
                    {/*<div className="hideGif">*/}
                        {/*<img src={slotGame1Hover} />*/}
                    {/*</div>*/}
                </Link>
                <Link to="/games" className="slotGame2">
                    <img src={slotGame2} />
                    {/*<div className="hideGif">*/}
                        {/*<img src={slotGame2Hover} />*/}
                    {/*</div>*/}
                </Link>
                <Link to="/games" className="slotGame3">
                    <img src={slotGame3} />
                    {/*<div className="hideGif">*/}
                        {/*<img src={slotGame3Hover} />*/}
                    {/*</div>*/}
                </Link>
                <Link to="/games"  className="slotGame4">
                    <img src={slotGame4} />
                    {/*<div className="hideGif">*/}
                        {/*<img src={slotGame4Hover} />*/}
                    {/*</div>*/}
                </Link>
                <Link to="/games" className="slotGame5">
                    <img src={slotGame5} />
                    {/*<div className="hideGif">*/}
                        {/*<img src={slotGame5Hover} />*/}
                    {/*</div>*/}
                </Link>
            </div>
        );
    }


}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(AffixService)