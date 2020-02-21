import React, {Component} from 'react';
import "./CalendarTem.scss"
import swal from 'sweetalert2';

export default class CalendarTemplate extends Component{
    constructor(props){
        super();
        this.state = {
            year:new Date().getFullYear(),
            month:1,
            day:1,
            week:1,
            nowDay:1,
            shwoDate:false,
            inputTime:"",       // 当前input的时间，父级会传入startTime或者endTime
            defaultTime:"",     // 用于显示input框显示的默认时间或者placeholder
            showYear:false,     // 选择年份
            hour:props.times?props.times[0]:"00",
            minute:props.times?props.times[1]:"00",
            second:props.times?props.times[2]:"00",
        }
    }
    componentWillMount(){
        this.setState({
            defaultTime:this.props.startTime?this.props.startTime:(this.props.endTime?this.props.endTime:this.props.placeholder),
            inputTime:this.props.startTime?this.props.startTime:(this.props.endTime?this.props.endTime:""),
        })
        this.mathNumber();
    }
    shwoDate(shwoDate,e){
        e.preventDefault();
        if(window.fuckTimeIsShow){
            window.fuckTimeIsShow();
        }
        window.fuckTimeIsShow = e =>{
            this.setState({shwoDate:false});
        }
        this.setState({shwoDate,showYear:false});
    }
    // 确定选择时间
    inputTime(e){
        e.preventDefault();
        // let time = `${this.state.hour}:${this.state.minute}:${this.state.second}`;
        this.setState({
            inputTime:`${this.state.year}/${this.state.month+1}/${this.state.day}`,
            showYear:false
        })
        this.shwoDate(false,e)
    }
    // 获取时间
    getValue() {
        if (!this.state.inputTime) {
            return "";
        }
        return this.state.inputTime;
    }
    // 上一个月
    lastMonth(){
        if(this.state.month==0){
            this.mathNumber(this.state.year-1,11,1);
        }else{
            this.mathNumber(this.state.year,this.state.month-1,1);
        } 
    }
    // 下一个月
    nextMonth(){
        if(this.state.month==12){
            this.mathNumber(this.state.year+1,0,1);
        }else{
            this.mathNumber(this.state.year,this.state.month+1,1);
        }     
    }
    // 周
    renderWeek(){
        let week = ["一","二","三","四","五","六","日"];
        let weekList=[]
        for(let i=0;i<week.length;i++){
            weekList.push(
                <div key={i} className="fucktime-dateborder fucktime-dateweek">
                    {week[i]}
                </div>
            )
        }
        return weekList;
    }
    // 选择号数时
    changeDay(dayNum){
        this.mathNumber(this.state.year,this.state.month,dayNum);
    }
    // 号数
    renderDay(){
        let firstDay = new Date(this.state.year, this.state.month, 1).getDay();//获取当前月第一天是星期几
        let lastDay = new Date(this.state.year, this.state.month+1, 0).getDate();//获取当前月一共有多少天    实际下表+1
        let dayList = [];
        let dayNum=1;
        if(firstDay == 0){
            firstDay = 7;
        }
        for(let i=0;i<lastDay+firstDay-1;i++){
            if(i<firstDay-1){
                dayList.push(
                    <div key={i} className="fucktime-dateborder"></div>
                )
            }else{
                dayList.push(
                    <div key={i} className={`fucktime-dateborder ${this.state.nowDay == dayNum?"fucktime-dateactive":""}`} onClick={this.changeDay.bind(this,dayNum)}>
                        {dayNum}
                    </div>
                )
                dayNum++;
            }
        }
        return dayList
    }
    mathNumber(y=null,m,d){
        let myDate = new Date();//获取系统当前时间
        if(y)myDate.setFullYear(y,m,d)//设置指定日期
        let year = myDate.getFullYear(); //获取完整的年份
        let month = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
        let day = myDate.getDate(); //获取当前日(1-31)
        let week = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        //let hour = myDate.getHours(); //获取当前小时数(0-23)
        //let min = myDate.getMinutes(); //获取当前分钟数(0-59)
 
        if(y){
            this.setState({
                year,month,day,nowDay:day
            });
        }else{
            this.state.year = year;
            this.state.month = month;
            this.state.day = day;
            this.state.nowDay = day;
        }
        switch(week){
            case 0:
            this.state.week = "天";
            break;
            case 1:
            this.state.week = "一";
            break;
            case 2:
            this.state.week = "二";
            break;
            case 3:
            this.state.week = "三";
            break;
            case 4:
            this.state.week = "四";
            break;
            case 5:
            this.state.week = "五";
            break;
            case 6:
            this.state.week = "六";
            break;
        }
    }
    // 改变时间
    changeTime = (key,event)=>{
        this.state[key] = event.target.value;
        this.setState({})
    }
    // 时分秒
    timeDom(){
        let hourOption = [],minuteOption = [],secondOption = [];
        for(let i = 0;i < 24;i++){
            hourOption.push(
                <option key={`o${i}`}>{i<10?"0"+i:i}</option>
            )     
        }
        for(let i = 0;i < 60;i++){
            minuteOption.push(
                <option key={`s${i}`}>{i<10?"0"+i:i}</option>
            )        
        }
        for(let i = 0;i <60 ;i++){
            secondOption.push(
                <option key={`s${i}`}>{i<10?"0"+i:i}</option>
            )
        }
        return(
            <div className='minHour mt10 mb10 pb10 text-center'>
                <select value={this.state.hour} onChange={this.changeTime.bind(this,"hour")}>
                    {hourOption}
                </select>
                <span>  :  </span>
                <select value={this.state.minute} onChange={this.changeTime.bind(this,"minute")}>
                    {minuteOption}
                </select>
                <span>  :  </span>
                <select value={this.state.second} onChange={this.changeTime.bind(this,"second")}>
                    {secondOption}
                </select>               
            </div>            
        ) 
    }
    // 年份
    YearRender(){
        let years = [];
        for( let i = new Date().getFullYear()-70; i<new Date().getFullYear()+1;i++){
            years.push(
                <button key={`year${i}`} onClick={ ()=>{ this.setState({ year:i,showYear:false })} } className={ this.state.year == i?"nowYear":null}>
                    <span>{i}</span>
                </button>
            )
        }
        return years
    }
    render(){
        return(
            <div className="fucktime-box">
                <input ref="date" type="text" onClick={this.shwoDate.bind(this,true)} value={this.state.inputTime} placeholder={this.state.defaultTime} readOnly/>   
                <div className="fucktime-date-box" style={{"display":this.state.shwoDate?"block":"none"}} >
                    <div className='timeHead'>
                        <span className="fucktime-chose-left fl" onClick={this.lastMonth.bind(this)}></span>
                        <p className="fucktime-yearsMonthWeek pointer" onClick={()=>{ this.setState({showYear:true},e=>{ this.refs.yearScroll.scrollTop = 2300  }) }}>
                            {
                                this.state.year +"年"+ (this.state.month+1)+"月"+this.state.day+"日  "+"星期"+this.state.week
                            }
                        </p>
                        <span className="fucktime-chose-right fr" onClick={this.nextMonth.bind(this)}></span>                      
                    </div>
                    <div className={this.state.showYear?"chooseYear":"TimeContent"} ref='yearScroll'>
                        {
                            // 点击日历头部选择年份，
                            this.state.showYear?
                            this.YearRender():
                            <div>
                                <div className="fucktime-datebox">
                                    {
                                        this.renderWeek()
                                    }
                                    {
                                        this.renderDay()
                                    }
                                </div>
                                {
                                    // 时分秒，有的不需要时分秒，在组件中利用props控制。
                                    this.props.clearHhmmss?
                                    null:
                                    this.timeDom()
                                }
                            </div>
                        }

                    </div>
                    <div className='calendarButtons text-center'>
                        <button onClick={this.inputTime.bind(this)} className='mr10'>确定</button>
                        <button onClick={this.shwoDate.bind(this,false)} className='ml10'>取消</button>
                    </div>
                </div>
            </div>
        )    
    }
}
