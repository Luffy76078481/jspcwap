
import React, { Component } from 'react';
import "./ImageSlider.scss";

/**
 * props:
 *  width       100px or 100%
 *  height      400px
 *  showNav     true
 *  showAction  true
 *  autoPlay    true
 *  duration    5000(ms)
 *  className   自定义className
 */

export default class ImageSlider extends Component{
    constructor(props){
        super(props);
        this.state = {
            height: 0,
            width: 0,
            currentSelect: 0
        }
        this.onResize = this.onResize.bind(this);
    }
    onResize() {
        if (!this.refs.container) {
            return;
        }
        let height = this.refs.container.clientHeight;
        let width = this.refs.container.clientWidth;
        this.setState({ height, width });
    }
    componentDidMount(){
        window.addEventListener("resize", this.onResize);
        setTimeout(()=>{
            this.onResize();
        }, 0);
        this.autoPlay();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    componentWillReceiveProps(nextProps){
        this.componentDidMount();
    }

    prev(){
        let children = this.props.children;
        let number = children.length;
        if(this.state.currentSelect > 0){
            this.setState({currentSelect: this.state.currentSelect-1});
        }else{
            this.setState({currentSelect: number - 1});
        }
    }
    next(){
        let children = this.props.children;
        let number = children.length;
        if(this.state.currentSelect < number - 1){
            this.setState({currentSelect: this.state.currentSelect+1});
        }else{
            this.setState({currentSelect: 0});
        }
    }
    sliderTo(index){
        this.setState({currentSelect: index});
    }

    autoPlay(){
        if(this.props.autoPlay && !this.timer){
            this.timer = setInterval(()=>{
                this.next();
            }, this.props.duration || 5000);
        }
    }

    pausePlay(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
    }


    render(){
        let children = this.props.children;
        let props = Object.assign({
            height: "400px",
            width: "100%",
            showNav: true,
            showAction: true,
            className: ""
        }, this.props);

        let number = React.Children.count(children) || 0;

        return (
            <div className={"image-slider " + props.className || ''} ref="container" style={{height: props.height, width: props.width}} onMouseEnter={this.pausePlay.bind(this)} onMouseLeave={this.autoPlay.bind(this)}>

                {this.state.width && this.state.height ?
                <ul className="content" style={{width: number*this.state.width+"px", height: this.state.height+"px", top: 0, left: "-" + this.state.width * this.state.currentSelect + "px"}}>

                    {React.Children.map(children, (child, i) => {
                        return (<li key={i} className={"slider-item item-"+i} style={{width: this.state.width+"px", height: this.state.height+"px"}}>{child}</li>)
                    })}
                </ul>:null}

                {props.showNav &&
                <ul className="slider-nav">
                    {React.Children.map(children, (child, i) => {
                        return (<li key={i} onClick={this.sliderTo.bind(this, i)} className={"slider-nav-item item-"+i+" "+(i==this.state.currentSelect ? "on":"")}><span>{i}</span></li>)
                    })}
                </ul>}

                {/*{props.showTitle &&*/}
                    {/*<div className="slider-title">*/}
                        {/*{React.Children.map(children, (child, i) => {*/}
                            {/*return (<li key={i} onClick={this.sliderTo.bind(this, i)} className={"slider-Title-item item-"+i+" "+(i==this.state.currentSelect ? "on":"")}><span>{child.props['data-Title']}</span></li>)*/}
                        {/*})}*/}
                    {/*</div>*/}
                {/*}*/}
                {props.showAction &&
                <div className="slider-action">
                    <span className="prev" onClick={this.prev.bind(this)}></span>
                    <span className="next" onClick={this.next.bind(this)}></span>
                </div>
                }
            </div>
        )
    }
}
