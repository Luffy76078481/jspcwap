/**
 *
 * 弹窗方式的优惠 
 * 
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./PromoPopup.scss";
import PromoTab from "./PromoTab" // 优惠导航

class PromotionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPromoDetail:false, // 是否进入优惠内容详情页
            selPromoId: "", // 当前选择的优惠的ID
            content: "", // 优惠内容富文本，显示在优惠内容弹窗中
        };
    }
    componentDidMount(){
        if(this.props.promotions.rows.length == 0) {
            new window.actions.ApiQueryPromotionsAction(1, 20, null).fly();
        }
    }
    // 选择优惠内容，跳转优惠弹窗显示优惠内容，_____________________提醒自己：注释
    onSelectPromo(promo) {
        var promoId = promo.Id;
        if (this.state.selPromoId === promoId) {
            promoId = "";
        }
        this.setState(
            prevState => ({
                isPromoDetail: !prevState.isPromoDetail, // 取反
                selPromoId: promoId,
                content: promo.Content
            }
        ));
    }
    // 关闭弹窗
    closeDetailPage(){
        this.setState(prevState => ({
            isPromoDetail: !prevState.isPromoDetail
        }));
    }
    //  渲染优惠内容列表 _____________________提醒自己：注释
    renderPromotions() {
        var ret = [];
        for (var i = 0; i < this.props.promotions.rows.length; i++) {
          var promo = this.props.promotions.rows[i];
          ret.push(
            <div key={i} className="col-4 fadeInUp animated">
              <div
                className="promotion-thumbnail-info"
                onClick={this.onSelectPromo.bind(this, promo)}
              >
                <div className="promotion-list-img">
                  <a onClick={() => false}>
                    <img src={window.config.prdImgUrl + promo.Img} />
                  </a>
                </div>
                <div className="promotion-list-title">
                  <h3>{promo.Title} </h3>
                  <span>{promo.Description}</span>
                </div>
              </div>
            </div>
          );
        }
        return ret;
    }
    render() {
      if (!this.state.isPromoDetail){
          return (
              <article className="promotions">
                  <PromoTab/>
                  <div className="promotionContainer">{this.renderPromotions()}</div>
              </article>
          );
      }
      return (
        <div className="promoDetail fadeInDown animated">
            <a className="goBack" onClick={this.closeDetailPage.bind(this)}>
            x
            </a>
            <div
            className="content text-center"
            dangerouslySetInnerHTML={{ __html: this.state.content }}
            />
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    promotions: state.promotions.promotions,
  };
};

export default connect(mapStateToProps,{})(PromotionPage);
