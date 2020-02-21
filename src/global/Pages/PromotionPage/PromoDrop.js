
import React, { Component } from "react";
import { connect } from "react-redux";
import "./PromoDrop.scss";
import PromoTab from "./PromoTab" // 优惠导航

class PromotionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selPromoId:"",// 当前优惠ID
        };
    }
    componentDidMount(){
        if(this.props.promotions.rows.length == 0) {
            new window.actions.ApiQueryPromotionsAction(1, 50, null).fly();
        }
    }
    // 优惠内容下拉列表
    renderPromotions(){
        var ret = [];
        const PromotionPage = window.r.props("PromotionPage")
        const PromoImgHeight = PromotionPage.height;
        for (var i=0; i< this.props.promotions.rows.length; i++) {
            var promo = this.props.promotions.rows[i];
            ret.push(
                <li key={i} className="wow fadeInUp animated">
                    <div 
                        className="promotionsListImg" onClick={this.onSelectPromo.bind(this,promo.Id)} 
                        style={{"backgroundImage": "url("+window.config.prdImgUrl + promo.Img + ")","height":PromoImgHeight}}
                    > 
                    </div>
                    <div 
                        className="promotionsListView" 
                        style={{"height":this.state.selPromoId==promo.Id?"auto":"0"}}
                        dangerouslySetInnerHTML={{__html:promo.Content}}
                    >
                    </div>
                </li>
            )
        }
        return ret
    }
    // 选择优惠下拉
    onSelectPromo(promoId,e) {
        if (this.state.selPromoId === promoId) {
            promoId = "";
        }
        this.setState({selPromoId:promoId});
    }
    render() {
        if (!this.state.isPromoDetail){
            return (
                <article className="promotions">
                    <PromoTab/>
                    <div className="promotionContainer">
                        <ul className='promotionsContent'>
                            {this.renderPromotions()}                            
                        </ul>
                        <div className="clear"></div>
                    </div>
                </article>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        promotions: state.promotions.promotions,
    };
};

export default connect(mapStateToProps,{})(PromotionPage);
