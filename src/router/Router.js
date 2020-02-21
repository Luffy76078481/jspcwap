import React, {Component} from 'react';
import { Route,Router,IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export default class CusRouter extends Component {
    render() {
        const r = window.r;
        const muiTheme = r.get("MuiTheme");
        const requireAuth = this.props.requireAuth;
        const requireAuthAndBankAccounts = this.props.requireAuthAndBankAccounts;
        const Frame = r.get("Frame");
        const MemberCenterRouter = r.get("MemberCenterRouter");
        const RequireSelfRouter = r.get("RequireSelfRouter");
        return (
            <Provider store={this.props.store}>
                 <MuiThemeProvider muiTheme={muiTheme}>
                    <Router onUpdate={() => window.scrollTo(0, 0)}  history={this.props.history}>
                        <Route path="/" component={Frame}>
                            <IndexRoute component={r.get("FirstPage")}/>
                            {RequireSelfRouter?RequireSelfRouter():null}
                            <Route path="/index.html" component={r.get("FirstPage")}/>
                            <Route path="/sport(/:GamePlatform)" component={r.get("SportPage")}/>
                            <Route path="/eSport(/:GamePlatform)" component={r.get('ESportPage')}/>{/*电竞*/}
                            <Route path="/casino" component={r.get("CasinoPage")}/>
                            <Route path="/playground" component={r.get("PlaygroundPage")}/>
                            <Route path="/games(/tab=:id)" component={r.get("GamesPage")}/>
                            <Route path="/bingo" component={r.get("BingoPage")}/>
                            <Route path="/pt" component={r.get("PtGamesPage")}/>
                            <Route path="/mg" component={r.get("MgGamesPage")}/>
                            <Route path="/mt" component={r.get("MtGamesPage")}/>
                            <Route path="/promotions(/tab=:id)" component={r.get("PromotionPage")}/>
                            <Route path="/bigevent" component={r.get("BigEventPage")}/>
                            <Route path="/gameplatform" component={r.get("GamePlatformPage")}/>
                            <Route path="/teach" component={r.get("TeachPage")}/>
                            <Route path="/ag" component={r.get("AgPage")}/>
                             {/* 新捕鱼页，ag以前的 */}
                            <Route path="/fish" component={r.get("FishGamePage")}/>
                            <Route path="/register" component={r.get("RegisterPage")}/>
                            <Route path="/Appdow" component={r.get("Appdow")}/>
                            <Route path="/information/:name" component={r.get("information")}/>
                            <Route path="/vip" component={r.get("VipPage")}/>
                            <Route path="/streetMachine" component={r.get('StreetMachinePage')} />
                            <Route path="/streetMachine2" component={r.get('StreetMachinePage2')} />
                            {/* 新棋牌页，streetMachine以前的 */}
                            <Route path="/chess" component={r.get('ChessPage')} />
                            <Route path="/SstateMent" component={r.get('SstateMent')} />
                            <Route path="/LootoPage" component={r.get('LootoPage')} />

                            /*网站介绍相关*/
                            <Route path="/aboutUs" component={r.get("AboutUsPage")}/>
                            <Route path="/termsOfUse" component={r.get("termsOfUse")}/>
                            <Route path="/responsibleGaming" component={r.get("responsibleGaming")} />
                            <Route path="/security" component={r.get("security")} />
                            <Route path="/privacy" component={r.get("privacy")} />
                            <Route path="/spotFakeWebsite" component={r.get("spotFakeWebsite")} />

                            /*会员中心的router*/
                            {MemberCenterRouter(requireAuth, requireAuthAndBankAccounts)}/>

                        </Route>
                        {/*积分商城*/}
                        <Route path="/shop" component={r.get('ShopFrame')}>
                            <IndexRoute component={r.get('ShopIndex')}/>
                            <Route path="vip" component={r.get("VipPage")} />
                            <Route path="mall">
                                <IndexRoute component={r.get("ShopMall")} />
                                <Route path=":typeId"  component={r.get("ShopMall")}/>
                            </Route>
                        </Route>
                    </Router>
                 </MuiThemeProvider>
            </Provider>
        )
    }
}