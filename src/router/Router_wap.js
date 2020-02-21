import React, {Component} from 'react';
import {Route, Router, IndexRoute ,Redirect} from 'react-router'
import {wapAuth,wapLogin} from "globalAction";
import {Provider} from 'react-redux'
// 登录验证
const isLogin = (params, replace) => {
    if(!wapAuth())replace('/login');//如果要跳转到登录页面
}

const scrollToTop = () => {
    $(".am-drawer-content").scrollTop(0)
}

export default class CusRouter extends Component {
    render() {
        const r = window.r;
        return (
            <Provider store={this.props.store} basename="/m">
                <Router history={this.props.history} basename="/m">
                    <Route path="/" component={r.get("Frame")}>
                        <IndexRoute component={r.get('FirstPage')}/>
                        <Route path="/login" component={r.get('LoginPage')}/>
                        <Route path="/register" component={r.get('RegisterPage')}/>
                        <Route path="/service">
                            <IndexRoute component={r.get('ServicePage')}/>
                            <Route path="agentReg" component={r.get('AgentReg')}/>
                        </Route>
                        <Route path="/hotActivity">
                            <IndexRoute component={r.get('HotActivity')}/>
                            <Route path="lotto" component={r.get('LottoPage')} onEnter={isLogin}/>
                        </Route>
                        <Route path="/help" component={r.get('HelpPage')}/>
                        <Route path="/allGame(/:PlatformIds&:GameType&:GameName)" component={r.get('AllGamePage')}/>
                        {/* 我的页面下的路由 */}
                        <Route path="/myPage" component={r.get('MyPage')} onEnter={isLogin}/>
                        <Route path="/sharePage" component={r.get('SharePage')}  />
                        <Route path="/privateInfo" component={r.get('PrivateInfo')} onEnter={scrollToTop}/>
                        <Route path="/editPassword" component={r.get('EditPassword')} onEnter={scrollToTop}/>
                        <Route path="/feedback" component={r.get('Feedback')} onEnter={scrollToTop}/>
                        <Route path="/money" component={r.get('MoneyManage')} onEnter={isLogin}/>
                        <Route path="/money/deposit" component={r.get('DepositPage')}  onEnter={isLogin}/>
                        <Route path="/money/withdraw" component={r.get('WithdrawPage')} onEnter={scrollToTop}/>
                        <Route path="/money/transfer/:platformID" component={r.get('TransferPage')} />
                        <Route path="/history" component={r.get('HistoryPage')}  />
                        <Route path="cardManage" onEnter={isLogin}>
                            <IndexRoute component={r.get('CardManage')} onEnter={scrollToTop}/>
                            <Route path="addCard" component={r.get('AddCard')} onEnter={isLogin}/>
                            <Route path="addQrCode" component={r.get('AddQrCode')} onEnter={isLogin}/>
                        </Route>
                        <Route path="/message" component={r.get('MyMessage')} onEnter={scrollToTop}/>
                        <Route path="/siteLetter" component={r.get('SiteLetter')} onEnter={scrollToTop}/>
                        <Route path="/platFromAnnounce" component={r.get('PlatFromAnnounce')}  onEnter={scrollToTop}/>
                        <Route path="/read/:messageType&:messageId&:fromUrl" component={r.get('ReadMessage')}/>
                    </Route>
                </Router>
            </Provider>
        )
    }
}