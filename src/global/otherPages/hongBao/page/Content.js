
import React, { Component } from 'react';
import {config} from "globalConfig";
import {default as swal} from "sweetalert2"
import {activityDetails}  from "./ActivityContent.js"
var allLetter = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",0,1,2,3,4,5,6,7,8,9];
// API
class ApiSysConfAction {
    fly(callback){
        let authorization="";
        fetch(config.apiPath+"client/all_sys_cfg?Tag="+config.webSiteTag, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":authorization
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            callback(data);
        }).catch(function (err) {

        });
    }
}

class AwardslistAction {
    fly(callback){
        let authorization="";
        fetch(config.apiPath +"Lucky/GetWinners?-PageIndex=1&pageSize=50&LuckyNo=LuckyMoney1", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization":authorization
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            callback(data);
        }).catch(function (err) {

        });
    }
}
var NowTimeOld = new Date("2017-08-09 11:12:51");
var startDateTime = new Date("2017-08-08 16:00:00");
var endDateTime = new Date("2017-08-08 23:59:00");
var one,two,NowTime,waveTime,timerhb,Timerr,isClick;

// 获取当前时间day=-1前一天，day=1后一天
function getNowDate(day){
    var d = new Date();
    var date = day?new Date(d.getTime() + day*24*60*60*1000):d;
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second=date.getSeconds();
    second=second < 10 ? ('0' + second) : second;
    return y + '/' + m + '/' + d+' '+h+':'+minute+':'+second;
}
// 日历格式化
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,               //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 后台返回时间字符串处理
function changeTime(s) {
    s= s.replace('T',' ').replace('-','/').replace('-','/');
    var t = Date.parse(s);
    //t += 12 * 3600000; // 以前是+12小时换算成北京时间
    return new Date(t).format("yyyy/MM/dd hh:mm:ss");
}
// 获得活动时间API
function ajaxLottery(){
    $.ajax({
        url: config.apiPath+'Lucky/Get?LuckyNo=LuckyMoney1',
        dataType: 'json',
        cache: false,
        type: 'get',
        success: function (obj) {
            if(obj.StatusCode == 0){
                var startTime = new Date(changeTime(obj.LuckyInfo.StartTime.replace('T',' ')));
                var endTime = new Date(changeTime(obj.LuckyInfo.EndTime.replace('T',' ')));
                $("#startTimeSpan").html(changeTime(obj.LuckyInfo.StartTime.replace('T',' ')));
                $("#endTimeSpan").html(changeTime(obj.LuckyInfo.EndTime.replace('T',' ')));
                var now = new Date();
                if(now.getTime() > endTime.getTime()){
                    clearInterval(Timerr);
                    $("#hb_start").hide();
                    $("#hb_for").hide();
                    $("#hb_next").hide();
                    $("#hb_end").hide();
                    $("#today_end").show();
                    window.clearInterval(timerhb);
                }else if(now.getTime() < startTime.getTime()){//下一波倒计时
                    NowTimeOld = now;//new Date(c_time);
                    startDateTime =  startTime; //new Date(start_time);
                    one = setInterval(getRTimeOne,1000);
                    window.clearInterval(timerhb);
                    $("#hb_start").hide();
                    $("#hb_for").hide();
                    $("#hb_end").hide();
                    $("#today_end").hide();
                    $("#hb_next").show();
                }else if(now.getTime()<endTime.getTime()){//活动进行中
                    
                    NowTimeOld = now;//new Date(c_time);
                    waveTime =  endTime; //new Date(end_time);
                    two = setInterval(getRTimeTwo,1000);
                    timerhb = setInterval(hby,200);
                    $("#hb_start").hide();
                    $("#hb_end").hide();
                    $("#today_end").hide();
                    $("#hb_next").hide();
                    $("#hb_for").show();
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        }
    })
}
// 红包雨
function hby() {
    var wh = $(window).height();
    var f = $(document).width();
    var e = Math.random() * f - 100;//
    var o = 0.5 + Math.random();//
    var fon = 10 + Math.random() * 30;//
    var l = e - 100 + 200 * Math.random();//
    var k = 2000 + 5000 * Math.random();
    var html;
    switch (Math.floor(Math.random() * 3 + 1)) {
        case 1:
            html = "<div data-key='logn' class='snow snow-1'><div>";
            break;
        case 2:
            html = "<div data-key='logn' class='snow snow-2'><div>";
            break;
        case 3:
            html = "<div data-key='logn' class='snow snow-3'><div>";
            break;
    }
    $(html).clone().appendTo(".banner").css({
        left: e + "px",
        opacity: o,
        "font-size": fon,
    }).animate({
        top: (wh * 1) + "px",
        left: l + "px",
        opacity: 0.1,
    }, k, "linear", function () {
        $(this).remove();
    })
}
// 活动进行中时间倒计时
function getRTimeTwo() {
    var t_s = NowTimeOld.getTime();
    var NowTime = NowTimeOld.setTime(t_s + 1000);
    var t = waveTime - NowTime;
    if (t <= 0) {
        clearInterval(two);
        ajaxLottery();
        return;
    }
    var d = Math.floor(t / 1000 / 60 / 60 / 24);
    var h = Math.floor(t / 1000 / 60 / 60 % 24);
    var m = Math.floor(t / 1000 / 60 % 60);
    var s = Math.floor(t / 1000 % 60);
    var h = d * 24 + h;
    document.getElementById("t_d_2").innerHTML = "<em>" + d + "</em>" + "天";
    document.getElementById("t_h_2").innerHTML = "<em>" + h + "</em>" + "小时";
    document.getElementById("t_m_2").innerHTML = "<em>" + m + "</em>" + "分";
    document.getElementById("t_s_2").innerHTML = "<em>" + s + "</em>" + "秒";
}
// 下次活动的倒计时
function getRTimeOne() {
    var t_s = NowTimeOld.getTime();
    var NowTime = NowTimeOld.setTime(t_s + 1000);
    var t = startDateTime - NowTime;

    if (t <= 0) {
        clearInterval(one);
        ajaxLottery();
        return;
    }
    var d = Math.floor(t / 1000 / 60 / 60 / 24);
    var h = Math.floor(t / 1000 / 60 / 60 % 24);
    var m = Math.floor(t / 1000 / 60 % 60);
    var s = Math.floor(t / 1000 % 60);
    document.getElementById("t_d_3").innerHTML = "<em>" + d + "</em>" + "天";
    document.getElementById("t_h_3").innerHTML = "<em>" + h + "</em>" + "小时";
    document.getElementById("t_m_3").innerHTML = "<em>" + m + "</em>" + "分";
    document.getElementById("t_s_3").innerHTML = "<em>" + s + "</em>" + "秒";
}

// 检查用户帐号，查询中奖剩余次数API
function checkUser(){
    var _username = $("#username").val();
    if(_username == ""){
        swal("输入会员帐号不能为空!",'','info');
        return false;
    }
    $.ajax({
        url:  config.apiPath+'Lucky/GetCount?LuckyNo=LuckyMoney1'+'&UserName='+_username,
        dataType: 'json',
        cache: false,
        type: 'get',
        success: function(result){
            if(result.StatusCode == 0){
                if(result.Count>0){
                    $('#hb_count').html('您还有<span>'+result.Count+'</span>次机会');
                    $('#j-packet').show();
                    $('#j-packet-bg').show();
                    $('#j-dailog-bag').hide();
                    $('.dailog-bag-bg').hide();
                }else{
                    swal('您没有抢红包的机会!','','info');
                }
            }else{
                swal('网络错误,请稍后再抽奖','','error');
            }
        }
    });
}
//获取手机投注链接
function urlLink(){
    $.ajax({
        url:  config.apiPath+'client/all_sys_cfg',
        dataType: 'json',
        cache: false,
        type: 'get',
        headers:{
            "Content-Type": "application/json"
        },
        data:{
            tag:''
        },
        success:function(data){
            if (data.StatusCode == 0) {
                var html = ''
                html = `<a target='_blank' href=${data.Config.channel_push_url} >手机投注</a>`
                $("#aLink").html(html)
            }
           
        }
    })
}
//拆紅包
function startGame(pullDoneHongBao,getHongBaoWindow,hongBaoWrap,getHongBaoNum){
    if(isClick){
        return;
    }
    var _username = $("#username").val();
    if(_username == ""){
        swal("输入会员帐号不能为空!",'','error');
        return false;
    }
    isClick = true;
    $.ajax({
        url:  config.apiPath+'Lucky/Draw',
        dataType: 'json',
        cache: false,
        type: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        data: JSON.stringify({LuckyNo:'LuckyMoney1',username: _username}),
        success: function (obj) {
            if(obj.StatusCode == 0){
                if(obj.Winning == true || obj.Winning == 'true' ){
                    $(hongBaoWrap).addClass('animated shake');
                    $(hongBaoWrap).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                        $(hongBaoWrap).removeClass('animated shake');
                        $(getHongBaoNum).html("<span>"+ obj.Prize +"</span>元");
                        $(getHongBaoWindow).show();
                        $(pullDoneHongBao).hide();
                        //swal('恭喜您,中奖了!',obj.Message,'success')
                    });
                }else{
                    swal('很抱歉，本次未中奖!');
                    checkUser();
                }
            }else{
                swal(obj.Message,'','info');
                checkUser();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            swal('网络故障,请联系管理员');
        }
    })
}
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
            jackpot :false,
            pages:false,
            jackpotData:null,
            nowPage:1,
            awradsList:[], //获奖名单
        }
    }
    serversOpen(e){
        e.preventDefault();
        window.open(this.state["online_service_link"],'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }
    componentWillMount(){
        ajaxLottery();
        urlLink();
    }
    componentDidMount(){
        new ApiSysConfAction().fly(resp => {
            if(resp.StatusCode === 0){
                this.setState({online_service_link: resp.Config.online_service_link});
            }
        });
        new AwardslistAction().fly(resp=>{
            if(resp.StatusCode===0){
                let arr = [];
                let list = [];
                let count = Math.floor(Math.random() * 8880 + 1);
                let awardsMoney = [1, 30, 5,188 , 38, 8,158, 18, 338, 58, 88, 598 , 78, 99,10, 28, 668, 158, 8888, 488, 1, 18, 2768, 38, 288, count];
                for(let i=0;i<resp.List.length;i++){
                    let l = resp.List[i];
                    if(!isNaN(Number(l.LuckyItem.Prizes))){
                        list.push(l)
                    }
                }
                for(let t=0;t<60-list.length;t++){
                    let rand1 = Math.floor((Math.random()*36));
                    let rand2 = Math.floor((Math.random()*36));
                    let rand3 = Math.floor((Math.random()*36));
                    let rand4 = Math.floor((Math.random()*36));
                    let UserName = allLetter[rand1]+allLetter[rand2]+"****"+allLetter[rand3]+allLetter[rand4];
                    let num = parseInt(Math.random()*awardsMoney.length);
                    let Prizes = awardsMoney[num]
                    arr.push({
                        User:{UserName:UserName},
                        LuckyItem:{Prizes:Prizes},
                        Id:t+'awards'
                    })
                }
          
                let val = list.concat(arr);
                this.setState({
                    awradsList:val,
                })                
            }
        })
        //红包雨被点击时
        $(".banner").on("click", "[data-key='logn']", function () {
            $('#j-logn').show();
            $('#j-packet-bg').show();
        });

        //悬浮广告
        var duilian = $("div.duilian");
        var duilian_close = $("a.duilian_close");

        var screen_w = screen.width;
        if (screen_w > 1024) {
            duilian.show();
        }
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            duilian.stop().animate({top: scrollTop + 160});
        });
        duilian_close.click(function () {
            $(this).parent().hide();
            return false;
        });
        // 拆红包关闭按钮
        $('.packet-close').click(function () {
            $('#j-packet').hide();
            $('#j-packet-bg').hide();
            $('.packet-2').hide();
            $('.packet-1').show();
            isClick = false;
        })
    }
    // 紅包中將查询
    queryBtn(){
        var _bonuscode = $("#querycode").val();
        if(_bonuscode == "") {
            swal("输入会员帐号不能为空!");
            return false;
        }
        this.queryPage(0);
    }
    // 红包中奖数据
    queryPage(page){
        // 清空状态
        this.setState({
            jackpotData:null,
            nowPage:page
        })
        // 指针
        let that = this;
        $.ajax({
            url:  config.apiPath+'Lucky/GetWinners?',
            dataType: 'json',
            headers:{
                "Content-Type": "application/json"
            },
            data : {LuckyNo:"LuckyMoney1",UserName:$("#querycode").val(), pageIndex: page, pageSize: 5},
            cache: false,
            type: 'GET',
            success: function (obj) {
                if(obj.List && obj.List.length >0){
                    that.setState({
                        jackpot:true,
                        pages:true,       
                        jackpotData:obj // 返回数据
                    })
                }else{
                    that.setState({
                        jackpot:true,
                        pages:false
                    })
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

            }
        })
    }
    // 中奖表单
    renderList(){
        let list = [];
        if(this.state.jackpotData){
            for (var i = 0; i < this.state.jackpotData.List.length; i++) {
                var g = this.state.jackpotData.List[i]; 
                list.push(
                    <tr key={"ss"+i}><td>{g.LuckyItem['Prizes']}</td><td>{g.CreateTime.replace("T"," ")}</td><td>{g.StatusText}</td></tr>
                )
            }
        }
        else{
            list.push(
                <tr key={999}><td colSpan="3">未找到相关信息</td></tr>
            );
        }
        return list;
    }
    // 分页
    renderPageList(){
        var ret = [];
        var invalidTag = false;
        if(this.state.jackpotData)
        for (var i = 0; i <= Math.ceil(this.state.jackpotData.Count/5)-1; i++) {
            if (i !== 0 && i !== this.state.jackpotData.Count && Math.abs(this.state.nowPage - i) >= 3) {
                invalidTag = true;
                continue;
            }
            if (invalidTag) {
                ret.push(
                    <a key={"ex"+i} href="javascript:void(0)" href="javascript:void(0)">...</a>
                )
                invalidTag = false;
            }
            ret.push(
                <a key={i} className={i === this.state.nowPage ? "jackPage active" : "jackPage"}  onClick={this.queryPage.bind(this,i)}>{i+1}</a>
            )
        }
        return ret;
    }
    toPrevPage(){
        if( (this.state.nowPage-1) < 0 ){
            return
        } 
        let val = this.state.nowPage;
        this.queryPage(val-1)
    }
    toNextPage() {
        if( (this.state.nowPage+1) >= Math.ceil(this.state.jackpotData.Count/5) ){
            return
        } 
        let val = this.state.nowPage;
        this.queryPage(val+1)   
    }
    showSearch(){
        $("#light,#fade").show();
    }
    // 关闭查询
    hideSearch(){
        $("#light,#fade").hide();
        $('#querycode').val("") 
        this.setState({
            jackpot:false,
            pages:false,
            jackpotData:null
        })
    }
    // 隐藏 -- 
    jLognHide(){
        $("#j-logn").hide();
        $('#j-packet-bg').hide();
    }
    // 立即领取按钮
    loginClick(){
        $("#username").val($("#username2").val());
        checkUser();
        this.jLognHide();
    }
    // 后台数据
    Awardslist(){
        const awradsList = this.state.awradsList.slice(0,30)
        return(
            <ul className='awardsCot ulbox awardsCot1'>
                {
                    awradsList.map((item,index)=>{
                        let UserName = item.User.UserName.replace(/\s/g, "").substr(0,2)+ " **** " + item.User.UserName.replace(/\s/g, "").substr(-2);
                        return(
                            <li key={`index${index}`}>
                                <span className='yellowFont'>恭喜会员</span>：
                                <span className='userName'>{UserName}</span>&nbsp;
                                <span className='yellowFont'>用户获得：</span>
                                <span className='bigF'>{item.LuckyItem.Prizes}</span>
                                <span className='yellowFont'>元</span>
                            </li>
                        )
                    })
                }
            </ul>
        )     
    }
    // 编剧
    Awardslist2(){
        const awradsList = this.state.awradsList.slice(30,60);
        return(
            <ul className='awardsCot ulbox awardsCot2'>
                {
                    awradsList.map((item,index)=>{
                        if(!isNaN(Number(item.LuckyItem.Prizes))){
                            let UserName = item.User.UserName.replace(/\s/g, "").substr(0,2)+ " **** " + item.User.UserName.replace(/\s/g, "").substr(-2);
                            return(
                                <li key={`indexR${index}`}>
                                    <span className='yellowFont'>恭喜会员</span>：
                                    <span className='userName'>{UserName}</span>&nbsp;
                                    <span className='yellowFont'>用户获得：</span>
                                    <span className='bigF'>{item.LuckyItem.Prizes}</span>
                                    <span className='yellowFont'>元</span>
                                </li>
                            )                             
                        }                       
                    })
                }
            </ul>
        )     
    }
    shuffle(a){
        var len = a.length;
        for(var i=0;i<len;i++){
            var end = len - 1 ;
            var index = (Math.random()*(end + 1)) >> 0;
            var t = a[end];
            a[end] = a[index];
            a[index] = t;
        }
        return a;
    }
    render() {
        const appName = config.appName;
        return (
            <div>
                {/*頭部*/}
                <div className="header">
                    <div className="wrapper">
                        <a href="/#" className="logo"></a>
                        <ul className="nav">
                            <li><a href="/" target="_blank">官网首页</a></li>
                            <li><a href="/register" target="_blank">会员注册</a></li>
                            <li><a id="showSearch" onClick={this.showSearch}>红包查询</a></li>
                            <li id="aLink"><a  target="_blank" >手机投注</a></li>
                            <li><a onClick={this.serversOpen.bind(this)} className="z5 serviceLink" >在线客服</a></li>
                        </ul>
                    </div>
                </div>
                {/*banner*/}
                <div className="banner">
                    <div className="banner-bg">
                        <div className="banner-a"></div>
                    </div>
                    <div className="notice">
                        <div className="wrapper">
                            <h3>最新消息：</h3>
                            <div className="marquee-box" >
                                <p style={{animation: 'marquee 10s linear infinite',whiteSpace:'nowrap'}}>
                                    【最新公告】尊敬的{appName}会员，您好！【亿元现金抢红包】活动，已正式开启...当日累计存款金额，不计输赢，即可参与抢红包机会，单个红包最高金额8888元，每天澳门时间{config.gameTag === 'asa' ? '18:00' : '16:00'}准时开抢，机不可失！拼一拼谁是真正的手气王！赶快通知您的朋友一起来抢吧~~
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <a className="btn-link" href="#" target="_blank"></a>
                        <div id="hb_start" style={{display:'none'}}>
                            <div className="txt">活动准备开启</div>
                            <div className="HotDate">
                                <div className="tle">倒计时:</div>
                                <span id="t_d"><em>00</em>天</span>
                                <span id="t_h"><em>00</em>小时</span>
                                <span id="t_m"><em>00</em>分</span> 
                                <span id="t_s"><em>00</em>秒</span>
                            </div>
                        </div>
                        {/* <!-- 进行中 -->*/}
                        <div id="hb_for" style={{display:'none'}}>
                            <div className="search">
                                <input type="text" name="username" id="username" placeholder="请输入会员账号" />
                                <button onClick={checkUser} className="btn-search" type="button" name="button">点击抢红包</button>
                            </div>
                            <div className="txt">
                                活动正在进行中
                            </div>
                            <div className="HotDate">
                                <div className="tle">
                                    本期结束:
                                </div>
                                <span id="t_d_2"><em>00</em>天</span>
                                <span id="t_h_2"><em>00</em>小时</span>
                                <span id="t_m_2"><em>00</em>分</span>
                                <span id="t_s_2"><em>00</em>秒</span>
                            </div>
                        </div>
                        {/*<!-- 下一波倒计时 -->*/}
                        <div id="hb_next" style={{display:'none'}}>
                            <div className="txt">
                                距离下期开始
                            </div>
                            <div className="HotDate">
                                <div className="tle">
                                    倒计时:
                                </div>
                                <span id="t_d_3"><em>00</em>天</span>
                                <span id="t_h_3"><em>00</em>小时</span>
                                <span id="t_m_3"><em>00</em>分</span>
                                <span id="t_s_3"><em>00</em>秒</span>
                            </div>
                        </div>
                        {/*<!-- 今日已结束 -->*/}
                        <div className="HotDate" id="today_end" >
                            <br/>
                            <div className="tle" style={{fontSize:'30px'}}>抢红包活动今日已结束</div>
                            <br/>
                            <div className="tle">请明天再来</div>
                        </div>
                        {/*<!-- 活动结束 -->*/}

                        <div className="HotDate" id="hb_end" style={{display:'none'}}>
                            <br/>
                            <div className="tle" style={{fontSize:'30px'}}>亿元抢红包活动已结束</div>
                            <br/>
                            <div className="tle" style={{fontSize:'25px'}}>我们后续将推出更多惊喜优惠敬请关注</div>
                        </div>
                    </div>
                </div>
                <div className='awardsList'>
                    <div className='titleImg'></div>
                    <div className='scrollAwards'>
                        {this.Awardslist()}  
                        {this.Awardslist2()}                      
                    </div>
                </div>
                {activityDetails()}
                <div className="footer">
                    Copyright © {appName}版权所有 Reserved
                </div>
                {/*悬浮*/}
                <div className="duilian duilian_right" style={{display:'block',top:'160px'}}>
                    <a onClick={this.serversOpen.bind(this)} className="block1 serviceLink" ></a>
                    <a className="block2" href="#toTop"></a>
                </div>

                {/*<!--红包查询-->*/}
                <div id="light" className="white_content">
                    <div className="cxbox">
                        <div className="cxbox_bt">
                            <p>输入会员账号查询</p>
                            <a style={{color:'#ffe681',textDecoration:'none'}} onClick={this.hideSearch.bind(this)} className="gban">X</a>
                        </div>
                        <div className="cxbox_hy">
                            <p>会员账号：</p><input name="querycode" id="querycode" type="text"  placeholder="输入帐号" /> <a onClick={this.queryBtn.bind(this)}>查 询</a>
                        </div>
                        <div className="cxbox_bd" style={{color:'#ffe681'}}>
                            <table width="480" cellPadding="0" cellSpacing="0">
                                <tbody><tr className="ad">
                                    <td>红包金额</td>
                                    <td>领取时间</td>
                                    <td>是否派彩</td>
                                </tr>
                                </tbody><tbody id="query_content">
                                    {this.state.jackpot?this.renderList():null}                 
                                </tbody>
                            </table>
                            {/* 分页 */}
                            {this.state.pages?<div className="quotes" >
                                <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toPrevPage.bind(this)}>上一页</a></div>
                                {this.renderPageList()}
                                <div className="nexprepage_icon"><a href="javascript:void(0)" onClick={this.toNextPage.bind(this)}>下一页</a></div>
                            </div>:null}

                        </div>
                    </div>
                </div>
                <div id="fade" className="black_overlay"></div>
                <div className="rbag" id="j-logn" style={{display:'none'}}>
                    <a  href="javascript:void(0)" className="close" data-key="lognClose" onClick={this.jLognHide} className="close" data-key="lognClose"></a>
                    <div className="cont">
                        <p><input className="txt" type="text" name="username2" id="username2" placeholder="请输入会员账号" /></p>
                        <button className="btn" type="button" onClick={this.loginClick.bind(this)} name="button2">立即领取</button>
                    </div>
                </div>
                {/*<!-- 拆红包 -->*/}
                <div className="packet" id="j-packet" ref="hongBaoWrap">
                    <a className="packet-close" href="javascript:void(0)"></a>
                    <div className="packet-1" ref="pullDoneHongBao">
                        <div className="packet-t">
                            <div className="pic">
                                <span className='hongBaoLogoIcon'></span>
                            </div>
                            <h3>{appName}</h3>
                            <div id="hb_count" className="num">
                                您还有 <span>9997</span> 次机会
                            </div>
                        </div>
                        <div className="packet-copy">
                            {appName}
                        </div>
                        <a className="packet-open" onClick={startGame.bind(this,this.refs.pullDoneHongBao,this.refs.getHongBaoWindow,this.refs.hongBaoWrap,this.refs.getHongBaoNum)}>拆红包</a>
                    </div>
                    <div className="packet-2" ref="getHongBaoWindow">
                        <div className="pannel">
                            <div className="pic">
                                <span className='hongBaoLogoIcon'></span>
                            </div>
                        </div>
                        <h3>恭喜发财，大吉大利!</h3>
                        <div id="hb_money" className="num" ref="getHongBaoNum">
                            <span>88</span>元
                        </div>
                        <div className="packet-copy">
                            {appName}
                        </div>
                    </div>
                </div>
                <div className="packet-bg" id="j-packet-bg"></div>
            </div>
        )
    }
}


export default (Content)
