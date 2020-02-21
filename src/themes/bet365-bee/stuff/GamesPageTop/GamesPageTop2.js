/**
 * Created by sobi on 2017/6/30.
 */
import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux'
import "./GamesPageTop2.scss"
 class GamePagesTop extends Component {

    constructor(props) {
        super(props);
    }
    initAll(){
        window.renderOwl('.content-game-list2', {
            items:1,
            dots:false,
            autoplay:true,
            autoplayHoverPause:true,
            autoplayTimeout:5000,
            loop:true,
            dots:true
        });
    }
    componentDidMount() {
        
        this.initAll();
    }
    render() {
        const promotionLink =this.props.remoteSysConfs.channel_push_url;
        return (
            <article id="game">
                <div className="divSubHeaderContainer">
                    <div className="navigation clearfix" id="navigation">
                        <ul>
                            <li className="active"><a title="娱乐场">娱乐场</a></li>
                            <li><Link to="/casino" title="真人娱乐场" href="live_casino.html">真人娱乐场</Link></li>
                            <li> <Link to="/promotions" href="Promotions.html">优惠</Link></li>
                            <li><a title="移动版" target="_blank" href={promotionLink} >移动版</a></li>
                            <li><a title="帮助" href="/help.html">帮助</a></li>
                        </ul>
                    </div>
                </div>
                <div id="banner" >
                    <div className="bannerRightDiv0"><Link to="/casino" id="SubHeaderRightInco0" href="New_Casino.html"></Link></div>
                    <div className="bannerRightDiv1"><Link to="/casino" id="SubHeaderRightInco1" href="New_Casino.html"></Link></div>
                    <div className="bannerRightDiv2"><Link to="/casino" id="SubHeaderRightInco2" href="New_Casino.html"></Link></div>
                    <div className="bannerRightContentStyle">
                        <div id="CustomContentPodContentWrapper" className="CustomContentPodContentWrapper CCP_flexheight">
                            <div id="playBox">
                                <div className="pre"></div>
                                <div className="next"></div>
                                <div className="owl-dots">
                                    <div className="owl-dot active"><span></span></div>
                                    <div className="owl-dot"><span></span></div>
                                    <div className="owl-dot"><span></span></div>
                                </div>
                                <ul className="oUlplay content-game-list2">
                                    <li className="item an1" style={{"color":"#FFF"}}>
                                        <div className="aspan1"></div>
                                    </li>
                                    <li className="item an2" style={{"color":"#FFF"}}>
                                        <div className="aspan2"></div>
                                    </li>
                                    <li className="item an3" style={{"color":"#FFF"}}>
                                        <div className="aspan3"></div>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps, {})(GamePagesTop);