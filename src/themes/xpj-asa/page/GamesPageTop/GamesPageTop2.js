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
        const ImageGallery = window.r.get("ImageGallery");
        const height = ImageGallery.gameHeight  || "170px";
        return (
            <article id="game">
            <ImageGallery width="100%" height={height} type="games-imgs" class="game_list_top_img" imgtype='banner'></ImageGallery>

                <div className="container">
                    <div className="game-header-focus">
                      
                    </div>
                </div>
            </article>
        )
    }
}