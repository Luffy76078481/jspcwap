/**
 * Created by xm on 2017/11/17.
 */

Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
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


import React, { Component } from 'react';
import { render } from 'react-dom'
import {connect} from 'react-redux';
import {config} from "globalConfig";
import configureStore from 'configureStore';
import {   setStorage, ApiQueryPromotionsAction,ApiAllSysConfigAction    } from "globalAction";
import * as configHelper from "../config/config_helper";
window.configHelper = configHelper;
import 'isomorphic-fetch';
window.Promise = Promise;//解决IE下Promise报错 【1.install babel-runtime和babel-plugin-transform-runtime 2.添加在主页之前添加window.Promise = Promise】
import "./global/otherPages/promotionCenter/promotionCenter.scss";
// ★★★★★
import "./themes/vns-uzi/page/index/skin.scss";
class PromotionCenter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            online_service_link: "",
            details:false,
            proApplic:false,
            applicSchedule:false,
            marsk:false,
            promotion:[],
            promoOnChose:null,
        }
        this.onproApplic = this.onproApplic.bind(this);
    }
    componentDidMount() {
        let _this  =this
        new ApiAllSysConfigAction().fly(resp => {
            if(resp.StatusCode === 0){
                _this.setState({online_service_link: resp.Config.online_service_link});
            }
        });

        new ApiQueryPromotionsAction(1,20).fly(resp => {
            if(resp.StatusCode === 0){
                _this.setState({promotion: resp.List});
            }
        });
    }


    serversOpen(e){
        e.preventDefault();
        window.open(this.state["online_service_link"],'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }

    ondetails(i){
        this.setState({
            details:true,
            marsk:true,
            promoOnChose:i,
        })
    }

    onproApplic(e, promo){
        var x = e.target.title;
        if(x!='details')
        this.setState({
            proApplic:true,
            marsk:true,
        })
    }

    onapplicSchedule(){
        this.setState({
            applicSchedule:true,
            marsk:true,
        })
    }

    offbox(){
        this.setState({
            details:false,
            marsk:false,
            proApplic:false,
            applicSchedule:false,
        })
    }


    renderPromos(){
        var ret = [];
        for (var i = 0; i < this.state.promotion.length; i++) {
            var promo = this.state.promotion[i];
            ret.push(
                <div value="details2" key={i} className="protion" onClick={this.ondetails.bind(this,i)}>
                    <div title="sss" value="details2" className="proimg"  style={{background: "url('" + promo.Thumbnail + "') no-repeat center" , backgroundSize:"100%"}}></div>
                    <div title="sss" value="details2" className="title">{promo.Title}</div>
                    <div title="sss" value="details2" className="btnL btn"></div>
                    {/*<div title="sss" value="details2" className="btnR btn"></div>*/}
                </div>
            )

        }
        return ret;
    }

    renderDetails(){
        var ret = [];
        var promoOnChose = this.state.promoOnChose;
        var promo = this.state.promotion[promoOnChose];
        if(promo && promo.Content){
            ret.push(
                <div title="zzzzz" className={this.state.details?"details on":"details"} dangerouslySetInnerHTML={{__html:promo.Content}}></div>
            )
        }

        return ret;
    }



    render() {
        const promotionLink = window.configHelper.getPromotionUrl();
        return (
            <div className="promotion-center">

                <div className={this.state.marsk?"marsk on":"marsk"} onClick={this.offbox.bind(this)}></div>

                <div className={this.state.proApplic?"proApplic on":"proApplic"}>
                    <div className="closebtn" onClick={this.offbox.bind(this)}></div>
                    <div className="logo"></div>
                    <div className="title">优惠活动申请</div>
                    <form action="">
                        <div className="txt">
                            <div className="inputtxt">申请主题：</div>123
                        </div>
                        <div className="member">
                            <div className="inputtxt">会员账号：</div>
                            <input type="text"/>
                        </div>
                        <div className="date">
                            <div className="inputtxt">申请日期：</div>
                            <input type="text"/>
                        </div>
                        <div className="number">
                            <div className="inputtxt">验证码：</div>
                            <input type="text"/>
                        </div>
                        <div className="btnbx">
                            <div className="btnl btn">立即提交</div>
                            <div className="btnr btn">审核进度查询</div>
                        </div>
                    </form>
                </div>

                <div className={this.state.applicSchedule?"applicSchedule on":"applicSchedule"}>
                    <div className="closebtn" onClick={this.offbox.bind(this)}></div>
                    <div className="logo"></div>
                    <div className="title">申请进度查询</div>
                    <form action="">
                        <div className="member">
                            <div className="inputtxt">请输入会员帐号：</div>
                            <input type="text"/>
                        </div>
                        <div className="date">
                            <div className="inputtxt">选择查询项目：</div>
                            <input type="text"/>
                        </div>
                        <div className="btnbx">
                            <div className="btnl btn">点击查询</div>
                        </div>
                    </form>
                </div>

                {this.renderDetails()}

                <div className="onlinesv">
                    <div className="fxboxL"></div>
                    <div className="fxboxR">
                        <a  href="/register"><div className="btn1 btn"></div></a>
                        <div className="btn2 btn" onClick={this.serversOpen.bind(this)}></div>
                        <a  href="/nav.html" target="_blank"><div className="btn3 btn"></div></a>
                        <a href={promotionLink} target="_blank"><div className="btn4 btn"></div></a>
                    </div>
                </div>
                <div className="hd">
                    <div className="hdbox">
                        <a href="/"><div className="proClogo"></div></a>
                        <div className="title"></div>
                        <div className="btn" onClick={this.onapplicSchedule.bind(this)}></div>
                    </div>
                </div>
                <div className="bd">
                    <div className="probox">
                        {this.renderPromos()}
                    </div>
                </div>
                <div className="ft">
                    <div className="ftbox">
                        <div className="ftL">
                            <a  href="/register" target="_blank"><div className="ftBtn1 ftBtn"></div></a>
                            <a  href="/nav.html" target="_blank"><div className="ftBtn2 ftBtn"></div></a>
                            <a  href="/nav.html" target="_blank"><div className="ftBtn3 ftBtn"></div></a>
                            <a href={promotionLink} target="_blank"><div className="ftBtn4 ftBtn"></div></a>
                            <div className="ftBtn5 ftBtn" onClick={this.serversOpen.bind(this)}></div>
                            <a href={promotionLink} target="_blank"><div className="ftBtn6 ftBtn"></div></a>
                        </div>
                        <div className="ftR">
                            <marquee className="run-cont" ref="affiche" direction="up"
                                     style={{loop: -1, scrollAmount: 1,scrollDelay:20, }} onMouseOut={(e) => {
                                this.refs.affiche.start()
                            }} onMouseOver={(e) => {
                                this.refs.affiche.stop()
                            }}>
                                <div className="cycle-carousel-wrap">
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">C0***Yh</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">幸运注单</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">Nnzz***2</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">首存彩金</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">S97***Tg</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">真人百家乐，和局对对碰</span>
                                    </li>
                                    <li className="cycle-slide" >
                                        <span className="area">恭喜</span>
                                        <span className="user">E96***Ef</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">资讯端下载</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">along***</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">首存赠送28元现金</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">huan***</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">电子游艺NO.10(存款赠送)</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">S97***Tg</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">首存赠送28元现金</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">E96***Ef</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">首存赠送28元现金</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">C0***Yh</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">电子游艺 NO.8(消除大战)</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">Nnzz***2</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">首存彩金</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">C0***Yh</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">幸运注单</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">Nnzz***2</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">电子游艺NO.6(智勇冲关)</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">zhuail***</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">电子游艺NO15(组队游戏)</span>
                                    </li>
                                    <li className="cycle-slide" >
                                        <span className="area">恭喜</span>
                                        <span className="user">liubin4***</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">首存赠送28元现金</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">tangyou***</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">锦上添花</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">tt5***</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">救援金</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">aa4746***</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">电子游艺NO.6(智勇冲关)</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">fanyuem***</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">电子游艺NO15(组队游戏)</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">kaikai***</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">首存赠送28元现金</span>
                                    </li>
                                    <li className="cycle-slide">
                                        <span className="area">恭喜</span>
                                        <span className="user">zhangni***</span>
                                        <span className="game">成功办理</span>
                                        <span className="money">资讯端下载</span>
                                    </li>
                                </div>
                            </marquee>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const store = configureStore();
setStorage(store.dispatch, store.getState);
render(<PromotionCenter/>, document.getElementById('root'));
