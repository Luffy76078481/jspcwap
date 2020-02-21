import React from 'react'
import Swal from 'sweetalert2';
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'configureStore';
import { config } from "../config/config";
import { requirement } from "../config/requirementConfig"
import * as cache from "./store/CacheHelper";
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as actions from "globalAction";
import * as configHelper from "../config/config_helper";
import "./style/index.scss";
//框架全局css
window.Promise = Promise;//解决IE下Promise报错 【1.install babel-runtime和babel-plugin-transform-runtime 2.添加在主页之前添加window.Promise = Promise】

injectTapEventPlugin();
const store = configureStore();
init();
function init() {
    document.title = config.title;
    window.store = store;
    window.config = config;
    window.configHelper = configHelper;
    window.actions = actions;
    window.cache = cache;
    window.Swal = Swal;
    const history = syncHistoryWithStore(browserHistory, store);
    let referer = getUrlParam("referer");
    if (referer) {
        cache.set("referer", referer);
    }
    actions.setStorage(store.dispatch, store.getState);
    var state = store.getState();
    window.store = store;
    // init user
    var stateUser = cache.get("user") || {};
    state.user = stateUser;
    var protocol = location.protocol, hostname = location.hostname, pathname = location.pathname, needRelocation = false;
    // if (protocol == "http:" && !window.useHttp && location.port != "8080") {
    //     protocol = "https:";
    //     needRelocation = true;
    // }
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        // hostname = "m." + hostname.replace("www.", "");
        hostname = hostname.replace(pathname, "") + "/m/";
        needRelocation = true;
    }
    if (needRelocation) {
        location.href = protocol + "//" + hostname + location.search;
        return false;
    }
    function loop() {
        let state = store.getState();
        if (state.user && state.user.token) {
            new actions.ApiSitemsgUnreadCountAction().fly();
        }
        //（因为都是假数据建议业务代码中自己造吧）
        // new actions.ApiRealtimeStatAction().fly();
    }
    setInterval(() => {
        loop();
    }, 60000);
    new actions.LoadBackConfigsAction().fly(resp => {
        if (resp.StatusCode == 0) {
            if (resp.SiteStatus == false) {//是否跳转網站维护中
                location.href = "/maintainPage.html";
            }
        }
    })
    if (state.user.token) {
        new actions.ApiPlayerInfoAction().fly((resp) => {
            if (resp.StatusCode == '-1') {
                new actions.LogoutAction().fly();
            } else if (resp.StatusCode == 0) {
                new actions.ApiBankAccountsAction().fly();
                new actions.ApiPayBanksAction().fly();

            }
        });
    }
    if (location.search.includes('channel') || cache.getCookie("channel")) {
        if (!state.user.token) {
            browserHistory.push("/register");
        }
    }
    new actions.ApiAllSysConfigAction().fly(resp => {
        if (resp.StatusCode == 0 && resp.Config['statistics_script']) {
            $("body").append(resp.Config['statistics_script']);
        }
    })
    new actions.ApiGetConfigImgAction(3).fly(); // 获取配置图片
    new window.actions.PageNavAction().fly(); //获取N级导航以及首屏游戏
    new actions.ApiNoticeAction().fly();
    new actions.ApiPcGameCategoriesAction().fly();
    new actions.ApiQueryPromotionTypesAction().fly();
    new actions.ApiLoadCasinoViewsAction().fly();
    new actions.ApiGamePlatformsAction().fly();
    new actions.ApiBanksAction().fly();
    if (window.cache.get("user")) {
        //如果登录了才访问用户的银行信息以及所有银行信息
        new actions.ApiOfflineAccountsAction().fly();
        new actions.ApiGamePlatformAllBalanceAction().fly();
    }
    new actions.ApiQueryTabGamesAction().fly();
    new actions.ApiQueryAgGamesAction().fly();
    new actions.ApiQueryGamesAction({ GameType: 3 }).fly();//体育
    new actions.ApiQueryGamesAction({ GameType: 2 }).fly();//彩票
    new actions.ApiQueryGamesAction({ GameType: 6 }).fly();// 电竞
    loop();

    store.subscribe(() => {
        var getState = store.getState;
        var dispatch = store.dispatch;
        actions.setStorage(dispatch, getState);
    });
    function requireAuth(nextState, replace) {
        let state = store.getState();
        if (!state.user || !state.user.token) {
            replace({
                pathname: '/'
            });
            window.swal('无权限访问', '您未登录，请从首页登录', 'error');
        } else {
            // 点击到个人中心后，读取存款API
            if (state.getAllPay.PayList.length < 1) {
                new actions.ApiGetAllPayAction().fly();
            }
        }
    }
    function requireAuthAndBankAccounts(nextState, replace) {
        let state = store.getState();
        if (!state.user || !state.user.token) {
            replace({
                pathname: '/'
            });
            window.swal('无权限访问', '您未登录，请从首页登录', 'error');
        }
        if (!state.user.bankAccounts || state.user.bankAccounts.length === 0) {
            window.swal({
                title: "无法取款",
                text: "因没有绑定取款信息，需完善个人取款信息即可执行取款操作",
                confirmButtonColor: "#403e39",
                confirmButtonText: "关闭"
            },
                () => {
                    browserHistory.push("/person_bind_card")
                }
            );
            return;
        }
        if (!state.user.verfyPhone && config.webSiteTag && state.backConfigs.IsBindingPhone && config.spec.indexOf('ldl') < 0) {
            window.swal({
                title: "无法取款",
                text: "因为没有验证手机号码，需验证手机号码即可执行取款操作",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "手机验证",
                showCancelButton: true,
                cancelButtonText: "关闭",
            },
                () => {
                    document.getElementById("shwoPhone").click();
                    // browserHistory.push("/member?phone=true");
                });
        }
    }
    actions.signalR.Init();
    let CusRouter = requirement.get("Router");
    render(
        <CusRouter store={store} history={history} requireAuth={requireAuth}
            requireAuthAndBankAccounts={requireAuthAndBankAccounts}></CusRouter>,
        document.getElementById('root')
    );
}








