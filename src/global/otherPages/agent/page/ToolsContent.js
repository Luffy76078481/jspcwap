/**
 * Created by b3 on 2017/6/27.
 */
import React, {Component} from 'react';
import {config} from "globalConfig";
import * as help from "../../help/helpJson";


class ToolsContent extends Component {

    render() {
        const appName = config.appName;
        return (
            <div id="ToolsContent" className="show">
                <div className="marke-fousImg">
                    {/*<img src="//www.p9113.com/assets/images/marke/marke_02.jpg" width="100%"/>*/}
                </div>
                <div className="fnameCenter marke-text heiti juzhong tool">
                    <p><span className="heiti">营销工具</span><br/>
                        加入{appName}合作共赢，您可以获取各种各样的推广资源，注册一个代理帐号，并登录即可领取推广链接，推广横幅与中转页面。<br/>
                        作为{appName}的代理，您可以跟踪横幅和中转链接数据。依据这些得来的信息与数据，{appName}代理专员将协助您，将您推广转化率提高。
                    </p>
                    <a onClick={this.props.onClickJoin} href="#" className="productMix">现在加入</a>
                </div>
                <div className="borderHeng"></div>
                <div className="fnameCenter heiti promo">
                    {help.renderToolTitle()}
                    <p className="juzhong f18">您可以通过邮箱发送您的建议和要求，我们可以专门为您定制推广优惠</p>
                    {/*<p className="juzhong ">市场部邮箱：886666com@gmail.com</p>*/}
                    <br/>
                </div>
            </div>
        )
    }
}



export default (ToolsContent);