
import React, {Component} from 'react';
import {connect} from 'react-redux';

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
                {
                    GamesPageTop?
                    <GamesPageTop></GamesPageTop>:null
                }
                {
                    NoticeBar && !options.hideNotice?
                    <div className="broadcast">
                        <div className="broadcast-bg"></div>
                        <div className="container">
                            <NoticeBar marqueeCls="broadcast-content z_in" marqueeWidth="905px" type="notice_slot"></NoticeBar>
                        </div>
                    </div>
                    :null
                }
                <div id="Gamebg">
                    <GameListPanel routeParams={this.props.routeParams} selPlatformId={this.state.selPlatformId} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps, {})(GamesPage);