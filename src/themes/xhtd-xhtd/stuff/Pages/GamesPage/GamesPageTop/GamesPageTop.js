/**
 * Created by sobi on 2017/6/30.
 */
import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';

export default class GamesPageTop extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const options = window.r.props("ImageGallery");
        var height = options.gameHeight || options.height || "170px";
        return (
            <div className="banner">
                <ImageGallery id="game-pt" width="100%" height={height} type="games-imgs" imgtype='banner'></ImageGallery>
            </div>
        )
    }
}