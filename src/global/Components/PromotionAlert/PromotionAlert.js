
/*
    update by 19/7/6
*/
import React, {Component} from 'react';
import "./PromotionAlert.scss";

export default class PromotionAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            message: "",
            showPop:true
        }
    }
    componentDidMount(){
        if(sessionStorage.getItem("homePopState")){
            window.$(this.refs.popBox).removeClass('popout');
            return;
        }
        new window.actions.ApiNoticeAction("home-promotion").fly(resp=>{
            if (resp.StatusCode == 0 && resp.NewsInfo.length > 0) {
                this.setState({
                    message: resp.NewsInfo[0].Content, 
                    title: resp.NewsInfo[0].Title,
                    externalLink: resp.NewsInfo[0].ExternalLink
                });
            }

        }, "home-promotion");
    }
    // 關閉彈窗
    hidNotice(){
        sessionStorage.setItem("homePopState",true)
        window.$(this.refs.popBox).removeClass('popout');
    }
    promotionAlertRender(){
        let ret = [];
        if(this.state.message && this.state.showPop){
            ret.push(
                <div key={'promo'} ref="popBox" className={"promotionAlert popBox popout"}>
                    <div className="popBox_title">
                        <i className="fa fa-circle-o-notch" aria-hidden="true"></i>&nbsp;&nbsp;{this.state.title}
                        <i className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></i>
                    </div>
                    <a href={ this.state.externalLink } target="blank" className="mainBody">
                        <div className="popBox_body" dangerouslySetInnerHTML={{__html: this.state.message}}></div>
                    </a>
                </div>                
            )
        }
        return ret;
    }
    render() {
        return (
            <div>
                {this.promotionAlertRender()}
            </div>
        )
    }
}