
import React, {Component} from 'react';
import { Route,IndexRoute } from 'react-router'

import MemberPage             from "../pages/MemberFrame";                    // 导航页
import MemberIndexPage        from "../pages/MemberFirstPage";                // 基本信息页
import WithdrawPage           from "../pages/WithdrawPage";                   // 取款页
import DepositPage            from "../pages/DepositPage";                    // 存款页
import DepositPageNew         from "../pages/DepositPageNew";                 // 新存款页
import BindCardPage           from "../pages/BindCardPage";                   // 绑定银行卡
import BindThirdPayPage       from "../pages/BindThirdPayPage";               // 绑定支付宝，微信
import TransferPage           from "../pages/TransferPage";                   // 转入转出
import EditPassWordPage       from "../pages/password/EditPassWordPage";      // 修改密码
import RecordsPage            from "../pages/record/RecordsPage";             // 查询——————记录
import TransferRecordsPage    from "../pages/record/TransferRecordsPage";     // 转账记录
import DepositRecordsPage     from "../pages/record/DepositRecordsPage";      // 存款记录
import WithdrawRecordsPage    from "../pages/record/WithdrawRecordsPage";     // 取款记录
import MessagePage            from "../pages/record/MessagePage";             // 站内信
import BetRecordsPage         from "../pages/record/BetRecordsPage";          // 投注记录
import PromoRecordsPage       from "../pages/record/PromotionRecordsPage"    // 优惠记录

export default function MemberCenterRouter(requireAuth, requireAuthAndBankAccounts) {
    return (
        <Route path="/member" component={MemberPage} onEnter={requireAuth}>
            <IndexRoute component={MemberIndexPage}  onEnter={requireAuth}/>
            <Route path="/withdraw" component={WithdrawPage} onEnter={requireAuthAndBankAccounts}></Route>
            <Route path="/person_bind_card" component={BindCardPage} onEnter={requireAuth}/>
            <Route path="/bindThirdPay" component={BindThirdPayPage}  onEnter={requireAuth}/>
            <Route path="/transfer" component={TransferPage} onEnter={requireAuth}/>
            <Route path="/editPassWord" component={EditPassWordPage} onEnter={requireAuth}/>
            <Route path="/deposit" component={DepositPageNew} onEnter={requireAuth}/>         
            <Route path="/records" component={RecordsPage}  onEnter={requireAuth}>
                <IndexRoute component={BetRecordsPage}  onEnter={requireAuth}/>
                <Route path="/records_transfer" component={TransferRecordsPage}  onEnter={requireAuth}/>
                <Route path="/records_deposit" component={DepositRecordsPage}  onEnter={requireAuth}/>
                <Route path="/records_withdraw" component={WithdrawRecordsPage} onEnter={requireAuth}/>
                <Route path="/records_message" component={MessagePage}  onEnter={requireAuth}/>
                <Route path="/records_promotion" component={PromoRecordsPage} onEnter={requireAuth}/>
            </Route>
        </Route>
    )
}
