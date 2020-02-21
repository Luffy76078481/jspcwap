
import React, {Component} from "react";
import {connect} from "react-redux";
import {Tabs} from "antd";
const { TabPane } = Tabs;
import "./PromoTab.scss";

class PromoTab extends Component {
  constructor(props) {
      super(props);
      this.state = {  
        promotionTypesLengthMin: 9,// 优惠导航在不能拉动时的最大长度
        ret: [{Id: "",TypeName:"全部优惠",type:""}],  // 初始化默认优惠类型分类
        selTypeId: "",// 当前导航选择的类型（当前选择的导航）
        defaultActiveKey: '0',  // antd 组件 当前激活 tab 面板的 key
        isHavePromoData:true, // 判斷是否有優惠類型
    }
  }
  componentDidMount() {
    if (this.props.promotionTypes.length && this.state.isHavePromoData) {
      this.setState(
        {
          isHavePromoData: false,
          ret: [...this.state.ret, ...this.props.promotionTypes]
        }
      );
    }
  }
  componentDidUpdate() {
    if (this.props.promotionTypes.length && this.state.isHavePromoData) {
      this.setState(prveState => ({
        isHavePromoData: false,
        ret: [...prveState.ret, ...this.props.promotionTypes]
      }));
    }
  }
  // 获取导航选择类型下的所有优惠活动 , GET API
  onSelectType(item) {
    this.setState(() => ({
      selTypeId: item.Id
    }));
    new window.actions.ApiQueryPromotionsAction(1, 50, item.Id).fly();
  }
  // 类型,8条类型以下的展示方式
  renderLittleTypes() {
    return this.state.ret.map((item, index) => (
      
      <div
        key={index}
        className={
          this.state.selTypeId == item.Id
            ? "active promotion-tab-item"
            : "promotion-tab-item"
        }
        onClick={this.onSelectType.bind(this, item)}
      >
        <a href="javascript:void(0)">{item.TypeName}</a>
      </div>
    ));
  }
  // 导航中8条优惠类型以上的展示方式
  renderManyTypes() {
    const {mode} = this.state;
    return (
      <div id="PromotionTab-wrap" className='mAuto'>
        <Tabs onChange={this.onTabClickHandle} id="PromotionTab-Tab" defaultActiveKey={this.state.defaultActiveKey} tabPosition={mode}>
          {this.state.ret.map((item,index) => (
            <TabPane tab={item.TypeName} key={index}></TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
  // Antd组件 8条优惠以上时，点击时切换优惠类型对应的内容，API
  onTabClickHandle = (index) => {
      this.setState({
        defaultActiveKey: index + ''
      })
    this.onSelectType(this.state.ret[index])
  }
  // 渲染优惠导航列表
  renderTypes(){
    // 总数8条或以下
    if (this.state.ret.length < this.state.promotionTypesLengthMin) {
      return this.renderLittleTypes();
    }
    // 8条以上需要swiper展示
    if (this.state.ret.length >= this.state.promotionTypesLengthMin) {          
      return this.renderManyTypes();
    }
  }
  render() {
    return (
      <div className="promoTypesContainer">
        {this.renderTypes()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      promotionTypes: state.promotions.promoTypes,
    };
};

export default connect(mapStateToProps,{})(PromoTab);
