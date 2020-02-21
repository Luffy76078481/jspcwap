import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Paging.scss'

class Paging extends Component{
    constructor(props){
        super(props)
        this.state = {
            pageNo:this.props.pageNo,
            pageNoNow:1,
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.props.pageNo != nextProps.pageNo){
            this.setState({
                pageNo:nextProps.pageNo
            })
        }
        if(this.props.gameType != nextProps.gameType){
            this.setState({
                pageNoNow:1,
            })
        }
    }
    
   
    toNextPage() {
        if (this.state.pageNoNow >= this.state.pageNo) {
            return;
        }
        this.props.toPage(this.state.pageNoNow + 1);
        this.state.pageNoNow = this.state.pageNoNow+1;
    }
    toPrevPage() {
        if (this.state.pageNoNow <= 1) {
            return;
        }
        this.props.toPage(this.state.pageNoNow - 1);
        this.state.pageNoNow = this.state.pageNoNow-1;
    }

    toPage(pageNo){
        this.setState({
            pageNoNow:pageNo
        })
        this.props.toPage(pageNo);
    }
 

    
    
    // 总共几页
    renderGamePage() {
        var ret = [];
        var invalidTag = false;
        for (var i = 1; i <= this.props.pageNo; i++) {
            if (i !== 1 && i !== this.props.pageNo && Math.abs(this.state.pageNo - i) >= 3) {
                invalidTag = true;
                continue;
            }
            if (invalidTag) {
                ret.push(
                    <div key={"ex" + i} className="number_icon">
                        <a　className="BGcolor-third border-type color-main" href="javascript:void(0)">...</a>
                    </div>
                )
                invalidTag = false;
            }
            ret.push(
                <div key={i} className={i === this.state.pageNoNow ? "active" : "number_icon"}>
                    <a className={i === this.state.pageNoNow ? "  border-type" : " border-type"} href="javascript:void(0)" onClick={this.toPage.bind(this, i)}>{i}</a>
                </div>
            )
        }
        return ret;
    }
    
    render(){
        return(
            <nav id="game-page" className="wow" style={{visibility: "visible", animationName: "fadeInUp"}}>
                <div className="pager_box">
                    <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toPrevPage.bind(this)}>上一页</a></div>
                    {this.renderGamePage()}
                    <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toNextPage.bind(this)}>下一页</a></div>
                </div>
           </nav> 
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
    }
);

export default connect(mapStateToProps,{})(Paging);











