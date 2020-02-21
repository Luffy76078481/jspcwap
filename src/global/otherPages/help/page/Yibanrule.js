/**
 * Created by b3 on 2017/7/3.
 */

import React, {Component} from 'react';
import {config} from "globalConfig";



class Yibanrule extends Component {



    render() {
        const appName = config.appName;
        return (
            <div id="yibanrule" className="contents">
                <div className="helpContent">
                    <h3  className="title1">优惠的一般条款及规则</h3>
                    <br />

                </div>

                <h4 className="title2" id="41">此规则作为{appName}线上娱乐场的优惠一般条款及规则<a href="#top" className="ReturnTop">返回顶部</a> </h4>

                <div className="helpContent">
                    <br />
                    1、每位玩家﹑每户﹑每一住址、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/银行帐户号码) 及IP地址只能享有一次优惠。<br />
                    <p>2、申请优惠会员的注册手机号、IP以及银行卡必须是同一归属地的，如遇到不一致，{appName}有权扣除您的盈利保留本金。</p><br />
                    <p>3、本次优惠的对象是娱乐性质玩家，如发现会员为职业赌徒或只为寻求红利的玩家，{appName}保留取消该玩家红利的权利。</p><br />
                    <p>4、如您的本金和优惠金额没有按照优惠活动规则使用，将收回优惠及盈利，保留您的本金，可以正常投注任何游戏。</p><br />
                    <p>5、所有的体育拒绝投注、无效投注、打平、投赔率低于1.75(欧洲盘)及兑现了的注单或出现对赌情况的投注将不计算在任何累积投注要求内。另外，如果屡次投注低于1.75(欧洲盘)的赛事套利的玩家，{appName}有权没收您的所有盈利，退还本金。</p><br />
                    <p>6、凡是PT、MG平台的老虎机优惠奖金，需全程在{appName}PT、MG娱乐场内老虎机专区进行投注。所有21点游戏，所有轮盘游戏，所有百家乐游戏，所有骰宝游戏，所有视频扑克游戏，所有Pontoon游戏，各种Craps游戏，赌场战争游戏，牌九游戏，多旋转老虎机（例如：古怪猴子、地妖之穴、海洋公主、三倍利润、热带滚筒和部落生活等等）和老虎机奖金翻倍投注将不计算在内，如投注此类游戏将取消申领资格，扣除所有红利以及赢利。</p><br />
                    {
                        config.spec.includes('bbt')?(<p>7、投注电子游戏：古怪猴子，三倍猴子，冰球突破，篮球巨星游戏的会员将不享受网站返水优惠。<br /></p>):''
                    }
                    {
                        config.spec.includes('bbt')?<br />:''
                    }
                    <p>{config.spec.includes('bbt')?8:7}、{appName}保留修改、解释本次规则的权利；以及在无通知的情况下作出改变本次活动的权利；所有{appName}规则条款适用。</p><br />
                    <p>当参与优惠会员未能完全遵守、或违反、或滥用任何有关这优惠或推广的条款，又或我们有任何证据有一位或一群客户投下一连串的关连赌注，藉以造成无论赛果怎样都可以确保可以从这存款红利或其他推广活动提供的优惠盈利，{appName}线上娱乐场保留权利向这些个别或一群客户停止、取消优惠或索回已支付的全部优惠红利。此外，{appName}线上娱乐场亦保留权利向这些客户扣取相当于优惠红利价值的行政费用，以补偿我们的行政成本。</p><br />
                </div>
            </div>


        )
    }
}



export default (Yibanrule);


