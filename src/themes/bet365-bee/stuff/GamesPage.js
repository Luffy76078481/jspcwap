
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
        const GameListPanel = window.r.get("GameListPanel");
        const GamesPageTop = window.r.get("GamesPageTop");
        return (
            <div className="Games-content">
                <GamesPageTop></GamesPageTop>
                <div id="Gamebg">
                    <GameListPanel selPlatformId={this.state.selPlatformId} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(GamesPage);