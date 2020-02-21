/**
 * 
 */
import {config} from "globalConfig";
import {_getState} from "globalAction";

export function getGamePlayLink(gameId, tryPlay) {
    var state = _getState();
    tryPlay = tryPlay || false;
    var autoTransfer = state.systemConfig.autoTransfer || false;
    var token = state.user && state.user.token || "";
    return config.apiPath + "play.html?gameId=" + gameId + "&token=" + token
        + "&platform=PC&tryPlay=" + tryPlay+"&transferFlag="+autoTransfer;
}
//   配置优惠链接,或者代理链接？
export function getPromotionUrl() {
    var promotionUrl = "/_promotion/web/index.html";
    if(window.channel){
        promotionUrl += "?channel=" + window.channel;
    }
    return promotionUrl;
}
export function getPromotionUrlQRCode() {
    var loc = location.href;
    var i = loc.indexOf("/", 9);
    var webHost = loc.substr(0, i);
    var link = webHost + getPromotionUrl();
    return "/api/v0/qcode.png?code=" + encodeURIComponent(link);
}