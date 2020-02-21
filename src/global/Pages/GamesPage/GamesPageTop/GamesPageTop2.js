/**
 * Created by sobi on 2017/6/30.
 */
import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';
import "./GamesPageTop2.scss"
export default class GamePagesTop extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const num = window.numbers["games"] || ("888," + Math.floor(Math.random()*899 + 100) + "," + Math.floor(Math.random()*899 + 100));
        const kyy_num = window.numbers["games"] || ("178," + Math.floor(Math.random()*899 + 100) + "," + Math.floor(Math.random()*899 + 100));
        const options = window.r.props("GamesPageTop");
        return (
            <article id="game">
                <div className="container">
                    {window.config.spec != "kyy"?
                    <div className="game-jackpot-num"><span className="jackpot" data-key="games">{num}</span></div>
                    :<div className="game-jackpot-num"><span className="jackpot" data-key="games">{kyy_num}</span></div>}
                    <div className="game-header-focus">
                        <div className="row">
                            <div className="game-header-focus-left">
                                <div className="game-promotions owl-carousel owl-theme owl-loaded">
                                    <div className="owl-stage-outer">
                                        <div className="owl-stage" style={{
                                            transform: "translate3d(-1815px, 0px, 0px)",
                                            transition: "0.25s",
                                            width: "3630px"
                                        }}>
                                            <div className="owl-item cloned"
                                                 style={{width: "605px", marginRight: "0px"}}>
                                                <div className="item">
                                                <span className="mgJpg"></span>
                                                {/* <img src="/images/mg.jpg?v=2"/> */}
                                                </div>
                                            </div>
                                            <div className="owl-item cloned"
                                                 style={{width: "605px", marginRight: "0px"}}>
                                                <div className="item">
                                                <a className="mgJpg"></a>
                                                {/* <img src="./images/pt.jpg?v=2"/> */}
                                                </div>
                                            </div>
                                            <div className="owl-item" style={{width: "605px", marginRight: "0px"}}>
                                                <div className="item"><a className="mgJpg"></a></div>
                                            </div>
                                            <div className="owl-item active"
                                                 style={{width: "605px", marginRight: "0px"}}>
                                                <div className="item">
                                                <a className="mgJpg"></a>
                                                    {/* <img src="./images/game/pt.jpg?v=2"/> */}
                                                       
                                                </div>
                                            </div>
                                            <div className="owl-item cloned"
                                                 style={{width: "605px", marginRight: "0px"}}>
                                                <div className="item">
                                                {/* <img src="./images/mg.jpg?v=2"/> */}
                                                </div>
                                            </div>
                                            <div className="owl-item cloned"
                                                 style={{width: "605px", marginRight: "0px"}}>
                                                <div className="item">
                                                {/* <img src="./images/pt.jpg?v=2"/> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="owl-controls">
                                        <div className="owl-nav">
                                            <div className="owl-prev" style={{right: "2.5%", opacity: 0}}></div>
                                            <div className="owl-next" style={{left: "2.5%", opacity: 0}}></div>
                                        </div>
                                        <div className="owl-dots">
                                            <div className="owl-dot"><span></span></div>
                                            <div className="owl-dot active"><span></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="game-header-focus-right wow fadeInUp animated"
                                 style={{visibility: "visible", animationName: "fadeInUp"}}>
                                <ul>
                                    <li>
                                        <p className="color-main">神的时代：激情四</p>
                                        <div className="game-header-focus-right-jackpot"><i></i>￥<span
                                            className="jackpot">474,776,721.78</span></div>
                                        <div className="clear"></div>
                                    </li>
                                    <li>
                                        <p className="color-main">金色召集</p>
                                        <div className="game-header-focus-right-jackpot"><i></i>￥<span
                                            className="jackpot">6,109,587.47</span></div>
                                        <div className="clear"></div>
                                    </li>
                                    <li>
                                        <p className="color-main">高速公路之王</p>
                                        <div className="game-header-focus-right-jackpot color-highlight"><i></i>￥<span
                                            className="jackpot  color-highlight">31,969,303</span></div>
                                        <div className="clear"></div>
                                    </li>
                                    <li>
                                        <p className="color-main">疯狂水果</p>
                                        <div className="game-header-focus-right-jackpot"><i></i>￥<span
                                            className="jackpot">101,501.55</span></div>
                                        <div className="clear"></div>
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