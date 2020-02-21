import React from 'react'
import { render } from 'react-dom'
import { createHistory } from 'history';
import { browserHistory, useRouterHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { config } from "../config/config_Wap";
import * as cache from "./store/CacheHelper";
import * as actions from "globalAction";
// import * as configHelper from "../config/config_helper";

// import { requirement } from "../config/requirementWap"
// import "./wapSrc/wapGlobal/style/index.scss"; 
import {requirement} from "../config/requirementConfigWap" // WAP端文件整合，请用上面
import "./themes_wap/style/style.scss"; // WAP端文件整合，请用上面

// 前端版本控制.
window.version = "V2.0917";
window.Promise = Promise;//解决IE下Promise报错 【1.install babel-runtime和babel-plugin-transform-runtime 2.添加在主页之前添加window.Promise = Promise】
injectTapEventPlugin();
const store = configureStore();
init();

function init() {
    actions.setStorage(store.dispatch, store.getState);
    var state = store.getState();
    window.store = store;
    var stateUser = cache.get("user") || {};
    state.user = stateUser;
    document.title = config.title;
    window.actions = actions;     
    //如果是开发环境就是用browserHistory,如果是build环境，则添加根目录BASENAME
    let baseHistory = browserHistory;
    if(BASENAME !== '/') {
        baseHistory = useRouterHistory(createHistory)({
            basename: BASENAME,
        });
    }else{
        baseHistory = useRouterHistory(createHistory)({
        });
    }
    window.wapHistoryType = baseHistory
    const history = syncHistoryWithStore(baseHistory, store);
    // window.browserHistory = appHistory;
    let referer = getUrlParam("referer");
    if(referer){
        cache.set("referer", referer);
    }
    function loop() {
        let state = store.getState();
        if (state.user && state.user.token) {
            new actions.ApiSitemsgUnreadCountAction().fly();//未读数量
        }
    }
    setInterval(() => {
        loop();
    }, 60000);
    new actions.LoadBackConfigsAction().fly(resp => {
        if (resp.StatusCode == 0) {
            if (resp.SiteStatus == false) {//是否跳转網站维护中
                if(config.isApp){
                    location.href = "/maintainPage.html";
                }else{
                    location.href = "/m/maintainPage.html";
                }
            }
        }
    });
    window.config = config;
    if( location.search.includes('channel') || cache.getCookie("channel") ){
        if(!state.user.token){
            window.wapHistoryType.push("./register")
        }
    }
    new actions.ApiGetConfigImgAction(3).fly(); // 获取配置图片
    new window.actions.PageNavAction("wapSideBar").fly(); //获取首页左侧列表
    new window.actions.PageNavAction("wapHome").fly(); //获取首页游戏列表
    new actions.ApiImageAction('mobile_home_images').fly();
    new actions.ApiNoticeAction().fly();
    new actions.ApiNoticeAction("app_home_promotion").fly();
    new actions.ApiWapGameCategoriesAction().fly();
    new actions.ApiQueryPromotionTypesAction().fly();
    new actions.ApiWapGameCategoriesAction("mobile_home_more").fly();
    new actions.ApiGamePlatformsAction().fly();
    if (state.user.token) {
        new actions.LoginAfterInit();
    }
    new actions.ApiAllSysConfigAction().fly(resp => {
        if (resp.StatusCode == 0 && resp.Config['statistics_script']) {
            $("body").append(resp.Config['statistics_script']);
        }
    })
    loop();
    store.subscribe(() => {
        var getState = store.getState;
        var dispatch = store.dispatch;
        actions.setStorage(dispatch, getState);
    });
    actions.signalR.Init();
    let CusRouter = requirement.get("RouterWap");
    render(
        <CusRouter store={store} history={history}></CusRouter>,
        document.getElementById('root')
    );
}

