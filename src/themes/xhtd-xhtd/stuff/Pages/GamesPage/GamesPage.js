
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './GamesPage.scss'

class GamesPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            selPlatformId: null
        }
    }
    render() {
        const NoticeBar = window.r.get("GamesPageNoticeBar");
        const GameListPanel = window.r.get("GameListPanel");
        const GamesPageTop = window.r.get("GamesPageTop");
        const options = window.r.props("GamesPage");
        return (
            <div className="Games-content">
                {GamesPageTop?
                <GamesPageTop></GamesPageTop>:null}
                {NoticeBar && !options.hideNotice?
                <div className="broadcast">
                    <div className="broadcast-bg"></div>
                    <div className="container">
                        <NoticeBar marqueeCls="broadcast-content z_in" marqueeWidth="905px" type="notice_slot"></NoticeBar>
                    </div>
                </div>:null}
                <div id="Gamebg">
                    <GameListPanel selPlatformId={this.state.selPlatformId} />                               
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        slot_platforms: state.game.slot_platforms
    }
);

export default connect(mapStateToProps, {})(GamesPage);