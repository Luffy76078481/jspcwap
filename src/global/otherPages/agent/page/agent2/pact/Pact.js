/**
 * Created by b3 on 2017/12/8.
 */
/**
 * Created by b3 on 2017/11/30.
 */
import React, {Component} from 'react';
import { render } from 'react-dom'
import "./pact.scss";
import {config} from "globalConfig";
// import * as help from "../../../../../util/help";

class Pact extends Component {
    componentDidMount() {

    }
    render() {
        const appName = config.appName;
        return (
            <div id="root">
                <div className="modal_title">会员注册-开户协议</div>
                <div className="modal-p">
                    <p>立即开通银宝博账户,享受最优惠的各项红利!</p>
                    <ul>
                        <li>银宝博只接受合法博彩年龄的客户申请。同时我们保留要求客户提供其年龄证明的权利。银宝博只接受合法博彩年龄的客户申请。同时我们保留要求客户提供其年龄证明的权利。</li>
                        <li>若姓名遇到有重复的现象，系统将会在名字后面自动加上1.2.3，例：范冰冰1〜3，若超过3位名字相同的会员要注册名字，需提供相关证件给银宝博客服人员，客服人员将在会员名字后面加上数字4以上数字才可做申请。（数字需照顺序，无法跳号或选号）。</li>
                        <li>在银宝博进行注册时所提供的全部信息必须在各个方面都是准确和完整的。在使用借记卡或信用卡时，持卡人的姓名必须与在网站上注册时的一致。</li>
                        <li>在开户后进行一次有效存款50元，玩游戏打码量达50元者，恭喜您成为银宝博的有效会员！</li>
                        <li>公司入款免手续费，开户最低入款金额50元人民币。</li>
                        <li>成为银宝博有效会员后，客户有责任以电邮，联系在线客服，在银宝博网站上留言等方式，随时向本公司提供最新的个人资料。</li>
                        <li>经银宝博发现会员有重复申请账号行为时，有权将这些账户视为一个联合账户。我们保留取消，收回会员所有优惠红利，以及优惠红利所产生的盈利之权利。每位玩家，每一住址 ，每一电子号码，相同支付卡/信用卡号码，以及共享计算机环境（例如：网吧，其他公共用电算机等）只能拥有一个会员账号，各项优惠只适用于每位客户在银宝博唯一的账户。</li>
                        <li>银宝博是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在银宝博注册，下注，为会员个人行为，银宝博将不负责及承担任何相关责任。</li>
                        <li>无论是个人或是团体，如有任何威胁，滥用银宝博优惠的行为，银宝博将保留杈利取消，收回由优惠产生的红利，并保留权利追讨最高50％手续费。</li>
                        <li>所有银宝博的优惠是特别为玩家而设,在玩家注册信息有争议时,为确保双方利益、杜绝身份盗用行为,银宝博保留权利要求客户向我们提供充足有效的档, 并以各种方式辨别客户是否符合资格享有我们的任何优惠。
                        </li>
                        <li>客户一经注册开户,将被视为接受所有颁布在银宝博网站上的规则与条例。</li>
                        <li>若发现您在同系统的娱乐城上开设多个会员账户,并进行套利下注;本公司有权取消您的会员账号并将所有下注营利取消!</li>
                    </ul>
                </div>
            </div>
        )
    }
}

render(<Pact/>, document.getElementById('root'));

