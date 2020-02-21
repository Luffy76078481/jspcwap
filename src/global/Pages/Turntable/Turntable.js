import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    ApiQueryLuckyWinnerAction, 
    ApiQueryLuckyCountAction, 
    ApiQueryLuckyDrawAction,
    ApiGetQueryLuckyCounts,
    ApiQueryLuckyChangeCounts,
    ApiGetPrizeTimesAction,// 开奖时间
} from "globalAction";
import {config} from 'globalConfig';
import './Turntable.scss'
import * as content from "./ActivityContent.js"
import bg1 from "./images/bg.jpg"
import bg2 from "./images/bg2.jpg"
import dzp from "./images/dzp.png"
import dzp2 from "./images/dzp2.png"
import dzp3 from "./images/dzp3.png"
import dzpGif2 from "./images/dzp2.gif"
import dzpGif3 from "./images/dzp3.gif"
import bbtZp0 from './images/bbt_zp_0.png'
import bbtZpGif from './images/bbt-zp.gif'

var ulHeight, ulbox, allHeight, inter, clickFlag = false;

class LootoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showLeft: false,
            showRight: false,
            remainingCount:[],
            sTime:"",//活动开始时间
            eTime:"",//活动结束
            shengYu:[],//剩余量 JSON字符串
        };
    }
    componentWillUnmount() {
        clearInterval(inter);
    }
    componentDidMount() {
        document.title = window.config.title;
        // this.setData()
        // return
        const LootoPage = window.r.props('LootoPage');
        new ApiGetPrizeTimesAction().fly(res => {
            let LuckyInfo = res.LuckyInfo;
            let nowTime = new Date(window.Util.getNowDate()).getTime()
            let startTime = new Date(LuckyInfo.StartTime.replace('T',' ')).getTime();
            let endTime = new Date(LuckyInfo.EndTime.replace('T',' ')).getTime();
            this.setState({
                sTime:LuckyInfo.StartTime.replace('T',' '),
                eTime:LuckyInfo.EndTime.replace('T',' ')
            })
            if(nowTime>=startTime && nowTime<=endTime){
                // 转盘获奖名单
                new ApiQueryLuckyWinnerAction("", 1, 15).fly(resp => {
                    if (resp.StatusCode === 0) {
                        this.carouselAction(resp);// 获奖
                    }
                });                
            }
        })   
        LootoPage.isHaveSurplus && this.GetLuckyCounts()
    }
    // 重置所有数据
    setData(){        
        let arr = [
            {"name":"保时捷汽车","count":2},
            {"name":"iphoneX","count":5},
            {"name":"免费筹码888","count":500},
            {"name":"存送优惠券","count":800},
            {"name":"免费筹码188","count":1000},
            {"name":"免费筹码88","count":1500},
            {"name":"免费筹码18","count":3000},
            {"name":"免费筹码588","count":650},
            {"name":"100元手机话费","count":100},
            {"ActivitylastUpdateTime":"2019-06-24 00:00:19"}
        ]
        this.WriteSurplus(arr) // 返写
    }
    // 获取大转盘剩余奖项 API
    GetLuckyCounts(){      
        // 获取大转盘剩余奖项JSON字符串  
        new ApiGetQueryLuckyCounts().fly(resp => {
            if(resp.value){
                this.setState({
                    shengYu:resp.value?JSON.parse(resp.value):[]
                })
                this.QueryLuckyTime(resp.currentTime,resp.lastUpdateTime)
                this.carouselAction2() // 剩余奖品滚动展示                
            }else{
                this.setData()
            }
        });
    }
    // 匹配年供，月供，日供
    QueryLuckyTime(currentTime,lastUpdateTime){
        let params = JSON.stringify(this.state.shengYu);// 临时的JSON数据，简易深拷贝，用于重置数据setState shengYu
        params = JSON.parse(params);
        // 获取服务器年份，月份，日期，小时，和最后修改的时间（年份，月份，日期，小时）
        let allTime =
        [   
            currentTime.substr(0,4),
            lastUpdateTime.substr(0,4),
            currentTime.substr(6,1),
            lastUpdateTime.substr(6,1),
            currentTime.substr(8,2),
            lastUpdateTime.substr(8,2),// 返回当前最后修改时间
            currentTime.substr(11,2),
            lastUpdateTime.substr(11,2),
        ]
        const startActivity = config.spec == "xhtd-xhtd"?16:18 //活动时间是 startActivity - 23:59
        this.RemainingAwards(params,...allTime,startActivity)              
    }
    //  计算剩余奖品个数
    RemainingAwards(params,currentYear,endYear,currentMonth,endMonth,currentDay,endDay,currentHour,endHour,startActivity,isStartActivity=false){
        if( Number(currentHour)>=startActivity ){
            isStartActivity = true// 计算活动是否开始
        }       
        // 活动未开始，进行初始化数据。
        if(!isStartActivity){
            console.log('非活动')
            // 年份更替
            if( Number(currentYear)-Number(endYear)>0 ){
                params[0].count = 3; //重置年供
                params[1] = 30; //重置月供
                this.ResetAwardsDay(params) //重置日供
                this.WriteSurplus(params);
                return                
            }
            // 月份更替
            if( currentMonth!=endMonth ){                            
                params[1] = 30; //重置月供
                this.ResetAwardsDay(params) //重置日供
                this.WriteSurplus(params);
                return            
            }
            // 号数更替
            if( currentDay!=endDay ){                 
                this.ResetAwardsDay(params) //重置日供
                this.WriteSurplus(params);
                return  
            }            
        }
        // 活动开始
        else{
            console.log('start活动')
            if( Number(currentYear)-Number( params[9].ActivitylastUpdateTime.substr(0,4) )>=1 ){
                params[0].count = 3;
                params[1].count = 30 - parseInt(Math.random()*5); //重置月供
                this.ResetAwardsDay(params,isStartActivity); //重置日供
                params[9].ActivitylastUpdateTime = window.Util.formatTime(new Date()) // 时间 
                this.WriteSurplus(params);
                return  
            }
            if( params[9].ActivitylastUpdateTime.substr(6,1) != currentMonth ){
                this.CalculationAwardsYear(params) // 计算保时捷
                params[1].count = 30 - parseInt(Math.random()*5); //重置月供              
                this.ResetAwardsDay(params,isStartActivity); //重置日供
                params[9].ActivitylastUpdateTime = window.Util.formatTime(new Date()) // 时间 
                this.WriteSurplus(params);
                return                 
            }
            if( params[9].ActivitylastUpdateTime.substr(8,2) != currentDay ){
                this.CalculationAwardsMonth(params) //计算月供
                this.ResetAwardsDay(params,isStartActivity); //计算日供
                params[9].ActivitylastUpdateTime = window.Util.formatTime(new Date()) // 时间 
                this.WriteSurplus(params);
                return    
            }
            if( Number(currentHour)-Number(endHour)>0 ){
                this.CalculationAwardsDay(params);
                this.WriteSurplus(params);
                return                    
            }  
        }
    }
    // 重置日供奖品
    ResetAwardsDay(params,isStartActivity=false){
        let resetAwards = [500,800,1000,1500,3000,650,100]
        for( let [index,val] of resetAwards.entries() ){
            if(isStartActivity){
                params[index+2].count = val - parseInt( (Math.random()*val)/10 ) // 考慮到如果跨日直接到活動時間，
            }else{
                params[index+2].count = val                      
            }
        }
    }
    // 计算年供
    CalculationAwardsYear(params){
        if(Number(params[0].count) == 0 || Number(params[0].count) == 1){
            params[0].count = 0
        }else{
            params[0].count = Number(params[0].count) - parseInt(Math.random()*params[0].count*0.5);
            params[9].ActivitylastUpdateTime = window.Util.formatTime(new Date()) // 时间  
        }
    }
    // 计算月供
    CalculationAwardsMonth(params){
        if(Number(params[1].count) == 0 || Number(params[1].count) == 1 ){
            params[1].count = 0
        }else{
            params[1].count = Number(params[1].count)-parseInt(Math.random()*params[1].count) // 计算剩余数
            params[9].ActivitylastUpdateTime = window.Util.formatTime(new Date()) // 时间                  
        }
    }
    // 計算日供
    CalculationAwardsDay(params){
        for( let item of params.slice(2,9) ){
            if(  Number(item.count) == 0 || Number(item.count)== 1){
                item.count = 0
            }else{
                item.count = Number(item.count) - parseInt(Math.random()*item.count)
            }
        }                
    }
    // 返写剩余奖品API
    WriteSurplus(params){
        new ApiQueryLuckyChangeCounts(params).fly(resp =>{           
            if(resp){
                this.setState({
                    shengYu:params
                })
                setTimeout(()=>{
                    console.log('Success');
                },1)              
            }
        })
    }
    // 剩余奖品创建
    carouselAction2(){
        if(this.state.shengYu){
            var sAwardEle = ""
            $.each(this.state.shengYu.slice(0,9), function (i, award) {
                sAwardEle += '<li><span>奖项：' + award.name+ '</span><span>'+'剩余数:' + award.count + '</span></li>';
            });
            ulHeight = $(".prizelist2").height(); //中奖列表实际高度
            ulbox = $(".ulbox2").height(); //框的高度
            allHeight = ulHeight + ulbox; //需要滚动的距离
            $(".prizelist2").html(sAwardEle);
            let trueElement = $(".ulbox2").html();
            $(".ulbox2").append(trueElement);
            this.scollAction();
        }
    }
    // 奖品列表
    carouselAction(obj = []) {
        if (obj.List) {
            var sAwardEle = ""
            var awards = ['谢谢惠顾','18','58','88','888','1888','IPHONE']
            // BBT的假数据
            var bbtAwards = ['谢谢惠顾','ipnone 11 pro256GB','588','手机话费100','188','iphone 11 pro MAX 256GB','28','8','888']
            $.each(obj.List, function (i, award) {
                let userName = award.User.UserName;
                userName = userName.substr(0, 1) + '***' + userName.substr(4, userName.split('').length);
                sAwardEle += '<li><span>恭喜' + userName + '</span><span>获得' + award.LuckyItem.Prizes + '</span></li>';
                //加了一个判断条件，在ASA和BBT中添加假数据
                if (config.spec.includes('asa')  && parseInt((Math.random() * (10 - 1) + 1) + "") > 8) {
                    var fuckyou = Math.random().toString(36).substr(3);
                    var name = fuckyou.substr(0, 1) + '***' + fuckyou.substr(4, fuckyou.split('').length);
                    var index = parseInt((Math.random() * 5) + "");
                    sAwardEle += '<li><span>恭喜' + name + '</span><span>获得' + awards[index] + '</span></li>';
                }
                if (config.spec.includes('bbt')  && parseInt((Math.random() * (10 - 1) + 1) + "") > 8) {
                    for(let a=1;a<5;a++){
                    var fuckyou = Math.random().toString(36).substr(3);
                    var name = fuckyou.substr(0, 1) + '***' + fuckyou.substr(4, fuckyou.split('').length);
                    var index = parseInt((Math.random() * 5) + "");
                    sAwardEle += '<li><span>恭喜' + name + '</span><span>获得' + bbtAwards[index] + '</span></li>';
                    }
                }
            });
            ulHeight = $(".prizelist1").height(); //中奖列表实际高度
            ulbox = $(".ulbox1").height(); //框的高度
            allHeight = ulHeight + ulbox; //需要滚动的距离
            $(".prizelist1").html(sAwardEle);
            let trueElement = $(".ulbox1").html();
            $(".ulbox1").append(trueElement);
            this.scollAction();
        }
    }
    // 滚动
    scollAction() {
        let topPx = $(".ulbox").scrollTop();
        if (inter) {
            clearInterval(inter);
        }
        inter = setInterval(() => {
            let scTop = $(".ulbox").scrollTop(topPx);
            topPx++;
            if (topPx >= allHeight) topPx = 0;
        }, 50);
    }
    // 停止滚动
    mouseHover() {
        clearInterval(inter);
        inter = null;
    }
    // 开始滚动
    mouseLeave() {
        clearInterval(inter);
        inter = null;
        this.scollAction();
    }
    // 查询机会
    checkTimes() {
        if(clickFlag){
            return
        }else {
            clickFlag = true;
        }
        if (!this.props.user.username || !this.props.user.token) {
            window.$("#reserveDialog_login").modal("show");
            clickFlag = false;
            return false;
        }
        let that = this;
        new ApiQueryLuckyCountAction(this.props.user.username).fly(resp => {
            if (resp.StatusCode === 0) {
                if (resp.Count > 0) {
                    that.startGame();
                }else{
                    window.Swal({
                        type:'error',
                        title:'温馨提示',
                        confirmButtonText: "关闭",
                        text:'您的机会已经用完啦!',         
                    })
                    clickFlag = false;
                }
            }else {
                window.Swal({
                    type:'error',
                    title:'温馨提示',
                    confirmButtonText: "关闭",
                    text:resp.Message,         
                })
                clickFlag = false;
            }
        });
    }
    // 查询奖品
    startGame() {
        $(".lotto-right-zz").css("transition", "none");
        $(".lotto-right-zz").css("transform", "rotate(0deg)")
        let that = this;
        new ApiQueryLuckyDrawAction(this.props.user.username).fly(resp => {
            if (resp.StatusCode === 0) {
                $(".lotto-right-gif").css("z-index", 3)
                if (resp.Winning == true && resp.PrizeGrade == 9) {
                    that.rotateZhuanpan(resp.PrizeGrade, () => {
                        window.Swal({
                            type:'info',
                            title:'温馨提示',
                            confirmButtonText: "关闭",
                            text:'很抱歉，本次未中奖!',         
                        })
                        $(".lotto-right-gif").css("z-index", 1)
                    });
                }else if(resp.Winning == true) {
                    that.rotateZhuanpan(resp.PrizeGrade, () => {
                        window.Swal({
                            type:'info',
                            title:'温馨提示',
                            confirmButtonText: "关闭",
                            text:resp.Message,         
                        })
                        $(".lotto-right-gif").css("z-index", 1)
                    })
                }
                if (resp.Winning == false) {
                    that.rotateZhuanpan(resp.PrizeGrade, () => {
                        window.Swal({
                            type:'info',
                            title:'温馨提示',
                            confirmButtonText: "关闭",
                            text:'很抱歉，本次未中奖!',         
                        })
                        $(".lotto-right-gif").css("z-index", 1)
                    })
                }
            }else{
                window.Swal({
                    type:'info',
                    title:'温馨提示',
                    confirmButtonText: "关闭",
                    text:resp.Message,         
                });
                clickFlag = false;
            }
        });
    }
    // 转动转盘
    rotateZhuanpan(grade, cb) {
        // if(grade == 0){
        //     grade = 9
        // }
        $(".lotto-right-zz").css("transition", "all 4s ease-out");
        let rotateN = Math.floor(3600);
        let rotate = rotateN + (-grade * 36);
        $(".lotto-right-zz").css("transform", "rotate(" + rotate + "deg)")
        setTimeout(()=>{
            cb()
            clickFlag = false;
        },4000)
    }
    // 活动详情与细则 - Show hide
    showLeftPop(show) {
        this.setState({showLeft: show})
        this.setState({showRight: false})
    }
    showRightPop(show) {
        this.setState({showRight: show})
        this.setState({showLeft: false})
    }
    render() {
        const LootoPage = window.r.props('LootoPage');
        let turnTableImg,turnTableGif;
         if (window.config.spec.includes('bet365-bbt')) {
            turnTableImg = bbtZp0;
             turnTableGif = bbtZpGif;
        }
         else 
         if(window.config.spec.includes('bet365')){
            turnTableImg = dzp;
            turnTableGif = dzpGif2;
        }else if(window.config.spec.includes('asa')){
            turnTableImg = dzp3;
            turnTableGif = dzpGif3;
        }
        else{
            turnTableImg = dzp2;
            turnTableGif = dzpGif2           
        }

        var btnClassName = 'lotto-right-zz';
        if (window.config.spec.includes('bet365-bbt')) {
            btnClassName += ' lotto-right-zz-green';
        }

        return (
            <div className="looto-background" style={{backgroundImage:`url(${LootoPage.isHaveSurplus?bg2:bg1})`}}>
                <div 
                    className="ulbox1 ulbox" 
                    onMouseEnter={this.mouseHover.bind(this)} 
                    onMouseLeave={this.mouseLeave.bind(this)}
                    style={{height:LootoPage.isHaveSurplus?"165px":"350px",}}
                >
                    <ul className="prizelist prizelist1"></ul>
                </div>
                {
                    // 此参数位于每个站点的引用文件requirement中转盘页面this.r中，isHaveSurplus是否含有剩余奖品。
                    LootoPage.isHaveSurplus?
                    <div className="ulbox2 ulbox" onMouseEnter={this.mouseHover.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                        <ul className="prizelist prizelist2"></ul>
                    </div>:null        
                }
                <div className="lotto-right" style={{backgroundImage:`url(${turnTableImg})`}}></div>
                <div className="lotto-right-gif" style={{backgroundImage:`url(${turnTableGif})`}}></div>
                <div className={btnClassName} onClick={this.checkTimes.bind(this)}>
                {config.spec.includes('bet365-bbt') ? null :  <div className="lotto-right-zz-img"></div>}     
                </div>
                <div className="zj-botton-left" onClick={this.showLeftPop.bind(this, true)}></div>
                <div className="zj-botton-right" onClick={this.showRightPop.bind(this, true)}></div>
                {           
                    //活动详情
                    !this.state.showLeft?null:
                    <div>{content.activityDetails(this.showLeftPop.bind(this,false))}</div>
                }
                {
                    //活动细则
                    !this.state.showRight ? null :
                    <div>{content.activityRoles(this.showRightPop.bind(this, false))}</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        dzpActivityDetails:state.dzpActivityDetails
    }
);

export default connect(mapStateToProps, {})(LootoPage);
