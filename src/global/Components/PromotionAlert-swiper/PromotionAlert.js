
import React, {Component} from 'react';
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import "./PromotionAlert.scss";

export default class PromotionAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            message: "",
            showPop:true,
            promotionList: [],
            promotionTitleList: [],
        }
    }
    componentDidMount(){
        if(sessionStorage.getItem("homePopState")){
            window.$(this.refs.popBox).removeClass('popout');
            return;
        }
        new window.actions.ApiNoticeAction("home-promotion").fly(resp=>{
            if (resp.StatusCode == 0 && resp.NewsInfo.length > 0) {

                let promotionTitleList = JSON.parse(JSON.stringify(resp.NewsInfo))
                promotionTitleList = [ promotionTitleList[promotionTitleList.length-1], ...promotionTitleList, promotionTitleList[0]]
                this.setState({
                    promotionList: resp.NewsInfo,
                    promotionTitleList: promotionTitleList
                });
            }
        }, "home-promotion");
    }


    componentDidUpdate(prevProps, prevState) {

        if (prevState.promotionList!==this.state.promotionList && this.state.promotionList.length){
            let _this = this,
                autoplay={delay: 4000,stopOnLastSlide: false,disableOnInteraction: true,},
                loop = true,
                pagination = {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            ;

            // 一张不自动轮播
            if(this.state.promotionList.length===1) {
                pagination = {}
                autoplay=false
                loop = false
            }
            if (this.swiper) {
                this.swiper.slideTo(0, 0)
                this.swiper.destroy()
                this.swiper = null;
            }
            this.swiper = new Swiper(this.mySwiper, {
                autoplay,
                loop,
                on: {
                    slideChangeTransitionEnd: function(){
                        _this.setState({
                            title:  _this.state.promotionTitleList[this.activeIndex].Title
                        })
                    },
                },
                pagination
            });
        }
    }
    // 關閉彈窗
    hidNotice(){
        sessionStorage.setItem("homePopState",true)
        window.$(this.refs.popBox).removeClass('popout');
    }
    promotionAlertRender(){
        if(this.state.promotionList.length && this.state.showPop){
            return (
                <div key={'promo'} ref="popBox" className={"promotionAlert popBox popout"}>
                    {/* <div className="popBox_title">
                        <i className="fa fa-circle-o-notch" aria-hidden="true"></i>&nbsp;&nbsp;{this.state.title}
                        <i className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></i>
                    </div> */}

                    <div className="swiper-container" ref={mySwiper => {this.mySwiper = mySwiper}}>
                        <div className="swiper-wrapper">
                            {
                                this.state.promotionList.map((item,index) => (
                                    <div key={index} className="swiper-slide">
                                        <a href={ item.externalLink } target="blank" className="mainBody">
                                            <div className="popBox_body" style={!item.Content.includes('<img')?{'padding':"10px"}:{"padding":0}} dangerouslySetInnerHTML={{__html: item.Content}}></div>
                                            <div className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></div>
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </div>                
            )
        }else {
            return null
        }
    }
    render() {
        return (
            <div>
                {this.promotionAlertRender()}
            </div>
        )
    }
}