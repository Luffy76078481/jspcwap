    /**
 * Created by jamen on 2017/4/30.
 */
import * as cache from "../store/CacheHelper";
import {browserHistory} from 'react-router';
import {Modal,Toast} from 'antd-mobile';
import {_dispatch} from "globalAction";
import {config} from "globalConfig";
import 'isomorphic-fetch';//解决IE不支持fetch

const modalAlert = Modal.alert;
let flag =false;
const apiLink = (method) => {
    return config.apiPath + method;
}
const apiRequest = (action, callback) => {
    action.params = action.params || {};
    let user = cache.get("user") || {};
    let authorization="";
    let method  = action.method.toLocaleUpperCase();
    let url = action.url;
    let timeOutId=null;
    if (user && user.token) {
        authorization = user.username+' '+user.token;
    }
    let obj = {
        method:method,
        headers :{
            "Authorization":authorization,
            "Content-Type":"application/json"
        },

    };

    if(method == "GET"){
        // obj.
        url = url+'?'+$.param(action.params);
    }else if(method=="POST"){
        if(url === "common/uploadafile"){//目前只有上传二维码需要这种mime类型
            obj.headers = {
                "Authorization":authorization,
                // "Content-Type":"multipart/form-data"   ///百度了一下fetch不设置类型才能上传。。。
            }
            obj.body = action.params;
        }else{
            obj.body = JSON.stringify(action.params);
        }
    }
    Promise.race([
        fetch(apiLink(url), obj),
        new Promise((resolve,reject)=>{
            timeOutId= setTimeout(()=> {
                if(url.indexOf('User/GetUnreadSiteMsgs')<0){
                    reject(
                        new Error('请求超时!')
                    )
                }
            },120000)
        }
    )])
        .then((res)=>{
            if (timeOutId) {
                 clearTimeout(timeOutId);
                timeOutId = null;
            }
            return res;
        })
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res;
            }

            const error = new Error(res.statusText);
            error.status = res.status;
            if(res.url.indexOf('User/GetUnreadSiteMsgs')>=0){//如果是请求未读信息是错误 忽略
                error.url='User/GetUnreadSiteMsgs';
            }
            throw error;
        })
        .then(res => {
            return res.json();
        })
        .then(resJson => {
            if (resJson.StatusCode === 0) {
                if (resJson.token) {
                    user.token = resJson.token;
                    cache.set("user", user);
                }
            }
            callback(resJson);
        })
        .catch(err=>{
            console.error("catchError！~：",err)
            if(err.message == "请求超时!"){
                Toast.hide();
                if(!flag){
                    flag=true;
                    modalAlert('请求超时!','请您稍后再试！',[
                        {text:"确认",onPress:()=>{
                            flag =false;
                        }}
                    ])
                }
                return;
            }
            if(err.status>300 ){
                callback({status:err.status,url:err.url});
                return;
            }
            callback({StatusCode:-888,Message:err});
        })
}
export default store => next => action => {
    if (action.type !== "api_start") {
        return next(action);
    }
    next(action);
    if (action.loadMsg) {
        next(action.loadMsg);
    }
    apiRequest(action, (resp)=>{
        if(resp.StatusCode === -1 && resp.Message =="未登录" && cache.get("user")){
            if(window.location.pathname=="/login") return;
            if(!flag){
                flag=true;
                modalAlert('未登录或登录超时，请重新登录！','',[
                    {text:"确认",onPress:()=>{
                            _dispatch({type:"Account_Logout"});
                            window.wapHistoryType.push('/login');
                            // browserHistory.push('/login');//如果要跳转到登录页面 可以放开此注释
                            flag =false;
                        }
                    }
                ])
            }
        }
        else if(resp.status >300 && resp.url !="User/GetUnreadSiteMsgs" ){
            Toast.hide();
            if(!flag){
                flag=true;
                modalAlert('接口请求错误！','请您稍后再试！',[
                    {text:"确认",onPress:()=>{
                            flag =false;
                        }
                    }
                ]);
            }
            return;
        }
        else if (resp.StatusCode === -888){
            Toast.hide();
            if(!flag){
                flag=true;
                modalAlert('网络异常,请稍候再试!','请检查您的网路是否已连接！错误代码'+resp.Message,[
                    {text:"确认",onPress:()=>{
                            flag =false;
                        }
                    }
                ]);
            }
            return;
        }
        action.response = resp;
        action.type = "api_finish";
        next(action);
    })
}