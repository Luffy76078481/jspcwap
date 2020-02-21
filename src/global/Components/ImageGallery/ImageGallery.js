
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link,browserHistory} from 'react-router';
import ImageSlider from "../widget/ImageSlider/ImageSlider";
var idCounter = 1;

class ImageGallery extends Component {
    constructor(props) {
        super(props);
        this.id = "ig_" + idCounter;
        idCounter++;
        this.state = {
            imgs: []
        };
    }
    componentDidMount(){
        // this.props.type，决定某一页的轮播图
        new window.actions.ApiImageAction(this.props.type).fly(resp=>{
            if (resp.StatusCode === 0) {
                this.setState({
                    imgs:resp.List
                });
            }
        }, this.id)
    }
    // 轮播图链接
    onClickImg(img) {
        if (img.Link) {
            if (img.Link.indexOf("http") != 0) {
                browserHistory.push(img.Link);
            } else {
                window.open(img.Link, "_blank");
            }
        }
    }
    renderImgs() {
        var ret = [];
        let hasOption ="";
        if(this.props.hasOption){
            hasOption = "hasOption";
        }
        for (var i = 0; i < this.state.imgs.length; i++) {
            var img = this.state.imgs[i];    
            var ss = {
                width:"100%",
                height:"100%",
                position:"relative", 
                backgroundSize: "auto 100%", 
                backgroundPosition: "center center", 
                backgroundImage:"url("+window.config.prdImgUrl+img.ImgUrl+")"
            };
            if (img.Link) {
                ss.cursor = "pointer";
            }
            ret.push(
                <div onClick={this.onClickImg.bind(this, img)} key={i} data-Title={img.Title} style={ss}>
                    <div className={["bannerTextCon "+hasOption]}  key={i+'HtmlDom'} dangerouslySetInnerHTML={{__html: img.Description}}></div>
                </div>
            )
        }
        return ret;
    }
    render(){
        var mul = this.state.imgs.length > 1 ? true : false;      
        return (
            <ImageSlider 
                width={this.props.width || "100%"} 
                height={this.props.height} 
                autoPlay={mul} 
                showTitle={this.props.showTitle} 
                showNav={mul} 
                showAction={mul}>
                {
                    this.renderImgs()
                }
            </ImageSlider>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {

    }
);

export default connect(mapStateToProps)(ImageGallery)