
import React, {Component} from 'react';
import {config} from "globalConfig";

class BrandContent extends Component {
    render() {
        const appName = config.appName;
        return (
            <div id="BrandContent">
               <div className="banner">
                   <div className="brandBanner"></div>
                   <div className="bannerBtn">
                       <a onClick={this.props.onClickJoin} data-tab="Registered" className="productMix">现在加入</a>
                   </div>
               </div>
                <div className="contentText1">
                    <div className="introduce content1">
                        <div className="productIntList-left">
                            <div className="leftImg icon1"></div>
                            <p>
                                <span className="iconTitle">1. 注册账号</span>
                                <span>在线注册代理会员账号</span>
                                <span>等待审核通过</span>
                            </p>
                            <div className="clear"></div>
                        </div>
                        <div className="productIntList-left ">
                            <div className="leftImg icon2 "></div>
                            <p>
                                <span className="iconTitle">2. 开始推广</span>
                                <sapn>申请代理连接条或者宣传代码</sapn>
                                <span>或者代理代码，进行推广</span>
                            </p>
                            <div className="clear"></div>
                        </div>
                        <div className="productIntList-left ">
                            <div className="leftImg icon3 "></div>
                            <p>
                                <span className="iconTitle">3. 赚取佣金</span>
                                <span>按照代理合作计划</span>
                                <span>赢取丰厚的佣金</span>
                            </p>
                            <div className="clear"></div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="contentText2">
                    <div className="introduce">
                        <h3>{appName}产品</h3>
                        <p>加入{appName}合作联盈无须任何费用，不需承担任何风险。我们为您提供市场上最具竞争力的佣金提成。{appName}绝对是您的不二选！立即加入我们合作计划，您就是永远第一</p>
                    </div>
                </div>
                <div className="contentText3 productImgList">
                    <div className="introduce ">
                        <a href="javascript:;" className="productListImgTy imgA">       
                            <span>
                                <h3>亚洲两大体育平台</h3>
                                <p>BBIN体育 沙巴体育</p>
                                <a target="_blank" className="LocaHref" href="/sport">立即开始</a>
                            </span>
                        </a>
                        <a href="javascript:;" className="productListImgZr imgA">
                            <span>
                                <h3>八大真人娱乐场平台</h3>
                                <p> MG厅 AG厅 BBIN厅 PT厅 AB厅 AG厅</p>
                                <a target="_blank" className="LocaHref" href="/casino">立即开始</a>
                            </span>
                        </a>
                        <a href="javascript:;" className="productListImgLhj imgA">
                            <span>
                                <h3>八大老虎机平台</h3>
                                <p> 上千种游戏任你选   </p>
                                <a target="_blank" className="LocaHref" href="/pt">立即开始</a>
                            </span>
                        </a>
                        <a href="javascript:;" className="productListImgCp imgA">
                            <span>  
                                <h3>BBIN彩票 KENO彩票</h3>         
                                <p>全球独创日历式期号投注</p>
                                <a target="_blank" className="LocaHref" href="/bingo" >立即开始</a>
                            </span>
                        </a>
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="contentText4">
                    <div className="introduce productSuper">
                        <h3 className="h3Title">选择{appName}优势</h3>
                        <ul>
                            <li>
                                <div className="productListImg productListImg1 "></div>
                                <h3>国际顶级品牌</h3>
                                <p>{appName}强大的品牌优势， 多年业界运营实际经验，资源丰富！</p>
                            </li>
                            <li className="productSuperMar">
                                <div className="productListImg productListImg2"></div>
                                <h3>信誉卓越</h3>
                                <p>资金保障，多年赔付 保证，无任何负面消息，玩家评 价优良。</p>
                            </li>
                            <li>
                                <div className="productListImg productListImg3"></div>
                                <h3>傲视亚洲双体育</h3>
                                <p>最高水位，最全赛事，最多走地，24小时全天全 球赛事投注无忧。</p>
                            </li>
                            <li className="productSuperMar">
                                <div className="productListImg productListImg4"></div>
                                <h3>最具品牌竞争力的产品</h3>
                                <p>涵盖体育，娱乐场，彩票，老虎机，十大平台 超强结合，陆续上线将更多！</p>
                            </li>
                            <li>
                                <div className="productListImg productListImg5"></div>
                                <h3>24小时全年无休服务</h3>
                                <p>多种支付渠道，存提款处理迅速，业界一流， 可亲自体验!</p>
                            </li>
                            <li className="productSuperMar">
                                <div className="productListImg productListImg6"></div>
                                <h3>公平准确合营系统</h3>
                                <p>行业领先的客户系统及合作伙伴系统，并不断创新，可定制化!</p>
                            </li>
                        </ul>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
        )
    }
}



export default (BrandContent);