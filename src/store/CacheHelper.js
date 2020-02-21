/**
 * 
 */
function setCookie(cname,cvalue,exdays)
{
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


export const  getCookie = (cname)=>
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name)===0) return c.substring(name.length,c.length);
    }
    return "";
}
export const set = (key, value) => {
    if (!value) {
        value = "";
    } else {
        value = JSON.stringify(value);
    }
    if (window.localStorage) {
        window.localStorage.setItem(key, value);
    } else {
        setCookie(key, value, 1);
    }
}
export const get = (key) => {
    var ret = "";
    if (window.localStorage && window.localStorage.getItem(key)) {
        ret = window.localStorage.getItem(key);
    } else {
        ret = getCookie(key);
    }
    if (!ret) {
        return null;
    }
    return JSON.parse(ret);
}

export const getSession = (key) => {
    var ret = "";
    if(window.sessionStorage && window.sessionStorage.getItem(key)){
        ret = window.sessionStorage.getItem(key);
    } else {
        ret = getCookie(key);
    }
    if (!ret) {
        return null;
    }
    return JSON.parse(ret);
}
export const setSession = (key, value) => {
    if (!value) {
        value = "";
    }
    if (window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
    } else {
        setCookie(key, value, 1);
    }
}


export const remove = (key)=>{
    if(!key){
        return;
    }
    if (window.localStorage) {
        window.localStorage.removeItem(key);
    } else {
        window.sessionStorage.removeItem(key);
    }
}


