/**
 * 方法
 */

import swal from '../../../node_modules/sweetalert';

window.Util = {
    /*初始化函数*/
    init: function () {
        var me = this;
        /*当前时间*/
        if ($("#clock").length > 0) {
            setInterval("Util.updatedate()", 1000);
        }
        /*data*/
        $('span[isnum=true]').attr('now', '0');
        $('span[isnum=true]').each(function (index, element) {
            var thisrel = parseInt($(this).attr('rel'));
            var thistime = parseInt(thisrel / 300);
            if ($(this).attr('isdate') == 'true') {
                thistime = thisrel / 200;
            }
            $(this).attr('time', thistime + 1);
        }).each(function (index, element) {
            me.time($(this), $(this).attr("type"), '天', '时', '分', '秒', false);
        });

    },
    b64EncodeUnicode: (str) => { //base64转码
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    },
    b64DecodeUnicode: (str) => { //base64解码
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    },
    /**/
    formatTime: function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second;
    },
    /*转换.net接口返回的时间格式*/
    formatNetTime: function (time) {
        time = time.split('.')[0].replace('T', ' ').replaceAll('-', '/');
        return time;
    },
    /*当前时间*/
    updatedate: function () {
        var dd1 = new Date();
        var tgetMonth = dd1.getMonth() + 1,
            tdate = dd1.getDate(),
            tmin = dd1.getHours(),
            minutes = dd1.getMinutes(),
            Seconds = dd1.getSeconds();
        if (tdate < 10) {
            tdate = "0" + tdate;
        }
        if (tmin < 10) {
            tmin = "0" + tmin;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (Seconds < 10) {
            Seconds = "0" + Seconds;
        }
        $("#clock").html(tgetMonth + "-" + tdate + " " + tmin + ":" + minutes + ":" + Seconds + " GMT+8");
    },

    /*获取当前网站的host域名*/
    getHost(str) {
        return window.location.host + str;
    },
    /*获取当前时间day=-1前一天，day=1后一天*/
    getNowDate(day) {
        var d = new Date();
        var date = day ? new Date(d.getTime() + day * 24 * 60 * 60 * 1000) : d;
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second;
    },

    // appOpen(link, openPlus = false,isPayLink=false) {
    //     console.log(link);
    //     var baiduWV;
    //     if (window.jsq) {
    //         clearInterval(window.jsq);
    //     } else {
    //         window.jsq = null;
    //     }

    //     if (openPlus) {
    //         link = location.protocol + "//" + location.host + link;
    //     }

    //     if (!window.config.isApp) {
    //         window.open(link, "blank");
    //         return;
    //     }

    //     if(isPayLink){
    //         plus.runtime.openURL(link);
    //         return;
    //     }

    //     if(window.ios){
    //         specWindow();
    //         return;
    //     }


    //     if (link.indexOf("DragonFishing") != -1) {
    //         console.log("龙王游戏特殊窗口");
    //         specWindow();
    //     } else if (link.indexOf("CaiShenFishing") != -1) {
    //         console.log("财神捕鱼");
    //         specWindow();
    //     }else if (link.indexOf("FiveDragonsFishing") != -1) {
    //         console.log("五龙捕鱼");
    //         specWindow();
    //     }else if (link.indexOf("ForwardGameH5By30") != -1) {
    //         console.log("捕鱼达人");
    //         specWindow();
    //     }else if (link.indexOf("AT01") != -1) {
    //         console.log("一炮捕鱼");
    //         specWindow();
    //     }else if (link.indexOf("ForwardGameH5By38") != -1) {
    //         console.log("捕鱼大师");
    //         specWindow();
    //     }else {
    //         sessionStorage.setItem("test", link)
    //         $('#fuckmeme').attr('src', '/test1.html');
    //         $("#fuckmeme1").show();
    //     }

        

    //     function specWindow() {
    //         baiduWV = plus.webview.create(link, "asdz", {
    //             width: "100%",
    //             kernel: "WKWebview"
    //         });

    //         baiduWV.show(); // 显示窗口  
    //         baiduWV.addEventListener("loaded", function () {
    //             window.jsq = setInterval(function () {//向窗口内容强制注入JS
            
    //                 baiduWV.evalJS("if (!document.getElementById('laozideguanbi')) {; var appOpenX = document.createElement('div'); var node = document.createTextNode('X');appOpenX.appendChild(node); appOpenX.style.height = '5vh'; appOpenX.style.width = '5vh'; appOpenX.style.borderRadius = '100%';appOpenX.style.background = 'rgba(202, 179, 179, 0.86)'; appOpenX.style.color = 'white'; appOpenX.style.lineHeight = '5vh';appOpenX.style.textAlign = 'center'; appOpenX.style.position = 'fixed'; appOpenX.style.top = '0'; appOpenX.style.right = '0';appOpenX.style.zIndex = '99999999'; appOpenX.setAttribute('id', 'laozideguanbi'); var element = document.body; element.appendChild(appOpenX);appOpenX.addEventListener('click', function (e) { plus.webview.close('asdz'); }, false);appOpenX.addEventListener('touchmove', function (e) {var movex = e.touches[0].pageX - 11;var movey = e.touches[0].pageY - 11;var Cwidth = document.getElementById('laozideguanbi').clientWidth;var maxX = document.documentElement.clientWidth  - Cwidth;var maxY = document.documentElement.clientHeight - Cwidth;if (movex > maxX) {movex = maxX} else if (movex < 0) {movex = 0}if (movey > maxY) {movey = maxY} else if (movey < 0) {movey = 0}appOpenX.style.top = movey + 'px';appOpenX.style.left = movex + 'px';}, false);}")
    //                 baiduWV.evalJS("if(document.getElementById('alphaContainer')) {document.getElementById('alphaContainer').style.display = 'none';document.getElementById('laozideguanbi').style.width = '5vh';;document.getElementById('laozideguanbi').style.height = '5vh';document.getElementById('laozideguanbi').style.lineHeight = '5vh';document.getElementById('laozideguanbi').style.fontSize = '26px'}")
    //                 baiduWV.evalJS("if(document.getElementById('fullscreen_div')) {document.getElementById('fullscreen_div').style.display = 'none';document.getElementById('laozideguanbi').style.width = '5vh';;document.getElementById('laozideguanbi').style.height = '5vh';document.getElementById('laozideguanbi').style.lineHeight = '5vh';document.getElementById('laozideguanbi').style.fontSize = '26px'}")
    //                 baiduWV.evalJS("if(document.getElementById('landscape')) {document.getElementById('landscape').style.display = 'none'")
    //                 // document.getElementById("landscape").style.display = "none"
    //             }, 2000)
    //         }, false);
    //     }





    // },


    appOpen(link, openPlus = false) {
        // sessionStorage.setItem("test",link)
        // $('#fuckmeme').attr('src','/test1.html');
        // $("#fuckmeme1").show();
        // return;
        if(!window.config.isApp){
            window.open(link,"blank");
            return;
        }
        // var testPhone = true;
        // if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //     testPhone = true;
        // } else if (/(Android)/i.test(navigator.userAgent)) {
        //     testPhone = false;
        // }
        var testPhone = false;
        if (testPhone) { //返回true为IOS端
            if (openPlus) {
                // ▲▲▲▲▲▲调用原生浏览器打开页面
                plus.runtime.openURL(location.protocol + "//" + location.host + link);
            } else {
                // ▲▲▲▲▲▲调用原生浏览器打开页面
                plus.runtime.openURL(link);
            }
        } else { //返回false为安卓
            var baiduWV;
            if (window.jsq) {
                clearInterval(window.jsq);
            } else {
                window.jsq = null;
            }
            if (openPlus) {
                // ▲▲▲▲▲▲APP内部打开游戏
                baiduWV = plus.webview.create(location.protocol + "//" + location.host + link, "asdz", {
                    width: "100%",
                    kernel: "WKWebview"
                });
            } else {
                // ▲▲▲▲▲▲APP内部打开游戏
                baiduWV = plus.webview.create(link, "asdz", {
                    width: "100%",
                    kernel: "WKWebview"
                });
            }
            baiduWV.show(); // 显示窗口  
            baiduWV.addEventListener("loaded", function () {
                window.jsq = setInterval(function () {//向窗口内容强制注入JS
                    baiduWV.evalJS("if (!document.getElementById('laozideguanbi')) {var appOpenX = document.createElement('div'); var node = document.createTextNode('X');appOpenX.appendChild(node); appOpenX.style.height = '5vh'; appOpenX.style.width = '5vh'; appOpenX.style.borderRadius = '100%';appOpenX.style.background = 'rgba(202, 179, 179, 0.86)'; appOpenX.style.color = 'white'; appOpenX.style.lineHeight = '5vh';appOpenX.style.textAlign = 'center'; appOpenX.style.position = 'fixed'; appOpenX.style.top = '0'; appOpenX.style.right = '0';appOpenX.style.zIndex = '99999999'; appOpenX.setAttribute('id', 'laozideguanbi'); var element = document.body; element.appendChild(appOpenX);appOpenX.addEventListener('click', function (e) {if(document.exitFullscreen) {document.exitFullscreen();} else if(document.mozCancelFullScreen) {document.mozCancelFullScreen();} else if(document.webkitCancelFullScreen) {document.webkitCancelFullScreen();} else if(document.msExitFullscreen) {document.msExitFullscreen();}; plus.webview.close('asdz'); }, false);appOpenX.addEventListener('touchmove', function (e) {var movex = e.touches[0].pageX - 11;var movey = e.touches[0].pageY - 11;var Cwidth = document.getElementById('laozideguanbi').clientWidth;var maxX = document.documentElement.clientWidth  - Cwidth;var maxY = document.documentElement.clientHeight - Cwidth;if (movex > maxX) {movex = maxX} else if (movex < 0) {movex = 0}if (movey > maxY) {movey = maxY} else if (movey < 0) {movey = 0}appOpenX.style.top = movey + 'px';appOpenX.style.left = movex + 'px';}, false);}")
                    baiduWV.evalJS("if(document.getElementById('alphaContainer')) {document.getElementById('alphaContainer').style.display = 'none';document.getElementById('laozideguanbi').style.width = '5vh';;document.getElementById('laozideguanbi').style.height = '5vh';document.getElementById('laozideguanbi').style.lineHeight = '5vh';document.getElementById('laozideguanbi').style.fontSize = '26px'}")
                    baiduWV.evalJS("if(document.getElementById('fullscreen_div')) {document.getElementById('fullscreen_div').style.display = 'none';document.getElementById('laozideguanbi').style.width = '5vh';;document.getElementById('laozideguanbi').style.height = '5vh';document.getElementById('laozideguanbi').style.lineHeight = '5vh';document.getElementById('laozideguanbi').style.fontSize = '26px'}")        
                    // document.getElementById("landscape").style.display = "none"
                }, 2000)
            }, false);
        }
    },




    windowOpen(name = "_blank") {
        let newOpenObj = window.open('/gameUrlLoading.html', '_blank');
        newOpenObj.urlError = function (message) {
            let r = newOpenObj.confirm(message + '！是否要关闭窗口？');
            if (r) {
                newOpenObj.close();
            }
        }
        return newOpenObj;
    },
    /*奖池函数*/
    time: function (obj, type, TitleResourceDay, TitleResourceHour, TitleResourceMinute, TitleResourceSecond, jackpost) {
        var me = this;
        var thisrel = parseFloat(obj.attr('rel'));
        var thisnow = parseInt(obj.attr('now'));
        var isjackpot = obj.attr('isjackpot');
        thisnow += parseInt(obj.attr('time'));
        if (thisnow >= thisrel) {
            thisnow = thisrel;
            if (isjackpot) {
                me.addJackpot(obj, 1000);
            }
        } else {
            setTimeout(function (obj) {
                return function () {
                    me.time(obj, type, TitleResourceDay, TitleResourceHour, TitleResourceMinute, TitleResourceSecond, jackpost);
                }
            }(obj), 10);
        }
        obj.attr('now', thisnow);
        if (obj.attr('isdate') == 'true') {
            var tstr = '';
            if (thisnow >= 60 * 60 * 24) {
                var day = parseInt(thisnow / (60 * 60 * 24));
                tstr += day + TitleResourceDay;
                var hour = thisnow % (60 * 60 * 24);
                var mint = parseInt(hour / (60 * 60));
                if (mint > 0)
                    tstr += mint + TitleResourceHour;
                var sec = hour % (60 * 60);
                if (sec > 0)
                    tstr += sec + TitleResourceMinute;
                var h = parseInt(sec / (60));
                if (h > 0)
                    tstr += h + TitleResourceSecond;
            } else if (thisnow >= 60 * 60) {
                var mint = parseInt(thisnow / (60 * 60));
                if (mint > 0)
                    tstr += mint + TitleResourceHour;
                var sec = hour % (60 * 60);
                if (sec > 0)
                    tstr += sec + TitleResourceMinute;
                var h = parseInt(sec / (60));
                if (h > 0)
                    tstr += h + TitleResourceSecond;
            } else if (thisnow >= 60) {
                var sec = parseInt(thisnow / (60));
                if (sec > 0)
                    tstr += sec + TitleResourceMinute;
                var h = thisnow % (60)
                if (h > 0)
                    tstr += h + TitleResourceSecond;
            } else {
                tstr = thisnow + TitleResourceSecond;
            }
            obj.html(tstr);
        } else {
            obj.html(me.fmoney(thisnow, 2, type));
        }
    },
    /*格式化金额*/
    fmoney: function (s, n, type) {
        var me = this;
        if (typeof type != "undefined") {
            if (type == "currency") {
                n = 2;
                s = "￥" + me.numberWithCommas(parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "", n);
            } else if (type == "integer") {
                n = 0;
                s = me.numberWithCommas(parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "", n);
            }
        } else {
            n = 0;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        }
        return s;
    },
    /*奖池金额*/
    numberWithCommas: function (x, fix) {
        var me = this;
        var value = parseFloat(x).toFixed(fix);
        if (isNaN(value)) return x;
        var tmp = value.toString().split(".");
        value = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (tmp.length > 1) {
            if (fix > 0) {
                tmp[1] = tmp[1].substring(0, fix);
            }
            value += "." + tmp[1];
        } else if (fix > 0) {
            value += ".";
            for (var i = 0; i < fix; i++) {
                value += "0";
            }
        }
        return value;
    },
    /*奖池定时器*/
    addJackpot: function (className, time) {
        setInterval(function () {
            var thisNum = Number(className.text().replace(/,/g, "")) + Util.GetRandomNum(1, 6),
                thisNum = thisNum.toString(),
                $strval = Util.splitStringVal(thisNum);
            className.html($strval);
        }, time);
    },
    /*随机数*/
    GetRandomNum: function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    },
    /*格式化金额1000=1,000*/
    splitStringVal: function (val) {
        return val.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('')
    },
    /*收藏本站*/
    AddFavorite: function (title, favoriteUrl) {
        var url = favoriteUrl ? favoriteUrl : window.location.origin;
        try {
            window.external.addFavorite(url, title);
        } catch (e) {
            try {
                window.sidebar.addPanel(title, url, "");
            } catch (e) {
                // xhtd收藏本站内容
                if (window.config.spec == "xhtd-xhtd") {
                    swal({
                        title: "新濠天地",
                        text: "请使用Ctrl+D快捷键进行收藏",
                        confirmButtonColor: "#c5841f",
                        confirmButtonText: "确认",

                    })
                } else {
                    swal("抱歉，您所使用的浏览器无法完成此操作。", "加入收藏失败，请使用Ctrl+D进行添加");
                }

            }
        }
    },
    /*首页初始化*/
    index: function () {
        var bingo = $(".content-bingo-list");
        bingo.owlCarousel({
            items: 1,
            dots: false,
            loop: true
        });

        $(".content-bingo-title a").hover(function () {
            var num = $(this).index(".content-bingo-title a");
            $(this).addClass("active").siblings().removeClass("active");
            bingo.trigger('next.owl.carousel', num);
        });
    },
    // 全屏模式
    launchFullscreen: function (element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else {
            return false
        }
        window.Util.changeOrientation();
        return true;
    },
    // 退出全屏模式
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        window.Util.changeOrientation();
    },
    // 棋牌包网rem换算
    convertPixel: function () {
        const _html = document.getElementsByTagName("html")[0];
        const orientation = window.orientation;
        switch (orientation) {
            case 90:
            case -90:
                DoConvertPixel(false)
                break;
            default:
                DoConvertPixel(true)
                break;
        }

        function DoConvertPixel(type) {
            setTimeout(() => {
                let width = document.documentElement.clientWidth;
                let height = document.documentElement.clientHeight;
                let devicePixelRatio = type ? (height / width) : (width / height); // 屏幕宽高率
                let whichSide = type ? height : width; // 竖屏用高度计算，横屏用宽度计算
                // iphoneX 812*375
                if (devicePixelRatio > 2) {
                    _html.style.fontSize = whichSide / 13.34 * 0.9 + "px";
                } else if (devicePixelRatio > 1.8) {
                    _html.style.fontSize = whichSide / 13.34 * 0.85 + "px";
                } else {
                    _html.style.fontSize = whichSide / 13.34 + "px";
                }
            }, 300)
        }
        // 执行横竖屏判断
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) != 0) {
            window.Util.changeOrientation()
        }
    },
    // 横竖屏监听
    changeOrientation: function (ele) {
        const orientation = window.orientation;
        let $rotatingPage;
        if (ele) $rotatingPage = ele
        else $rotatingPage = document.getElementById("rotatingPage")
        switch (orientation) {
            case 90:
            case -90:
                DoChangeOrientation(0)
                break;
            default:
                DoChangeOrientation(1)
                break;
        }

        function DoChangeOrientation(val) {
            setTimeout(function () {
                let style = "";
                let width = document.documentElement.clientWidth;
                let height = document.documentElement.clientHeight;
                if (val) {
                    //竖屏
                    style += "width:" + height + "px;";
                    style += "height:" + width + "px;";
                    style += "top:" + (height - width) / 2 + "px;";
                    style += "left:" + -(height - width) / 2 + "px;";
                    style += "-webkit-transform: rotate(90deg); transform: rotate(90deg);";
                    style += "transform-origin: 50% 50%";
                } else {
                    style += "width:" + width + "px;";
                    style += "height:" + height + "px;";
                    style += "top:" + 0 + "px;";
                    style += "left:" + 0 + "px;";
                    style += "transform:" + "none";
                    style += "transform-origin:" + "50% 50%";
                }
                $rotatingPage.style = style;
            }, 300)
        }
    },
    // 是否是中文
    isChinese: function (str) {
        var han = /^[\u4e00-\u9fa5]+$/;
        if (!han.test(str)) {
            return false;
        };
        return true;
    },
    // 星号
    AsteriskProcessing: function (val, type) {
        if (!val) return "";
        let str = '';
        let reg_bank = /^(\d{4})\d+(\d{4})$/;
        switch (type) {
            case "phone":
                str = val.replace(/\s/g, "").substr(0, 3) + " **** " + val.replace(/\s/g, "").substr(-4);
                break;
            case "qq":
                str = val.replace(/\s/g, "").substr(0, 3) + " **** " + val.replace(/\s/g, "").substr(-2);
                break;
            case "bank":
                str = val.replace(reg_bank, "$1 **** **** $2");
                break;
            default:
                str = val.length < 8 ? "**** " + val.replace(/\s/g, "").substr(-1) : val.replace(/\s/g, "").substr(0, 3) + " **** " + val.replace(/\s/g, "").substr(-3);
        }
        return str;
    }
}
window.Util.init();