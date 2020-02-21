/**
 * Created by b3 on 2017/7/3.
 */

import React, {Component} from 'react';
import {config} from "globalConfig";




class Responsibility extends Component {



    render() {
        const appName = config.appName;
        return (
            <div id="responsibility" className="contents">
                <div className="helpContent">
                    <h3 className="title1">责任博彩</h3>
                    <ul className="contentul">
                        <li><a href="#57">1、博彩调查问卷</a></li>
                        <li><a href="#58">2、自我隔离</a></li>
                        <li><a href="#59">3、年龄限制</a></li>
                    </ul>
                </div>

                <h4 className="title2" id="57">1. 博彩调查问卷<a href="#top" className="ReturnTop">返回顶部</a> </h4>

                <div className="helpContent">
                    <p>{appName}正在积极努力为玩家提供一个优质的娱乐平台。这些问题设置的目的在于，我们已经设置升级了多项安全设施来确保我们游戏的公平公正。我们鼓励客户通过回答我们的问卷来了解客户对博彩的危害问题的状况:
                        <ul type="disc">
                            <li>您会因为躲避工作和学习来进行赌博吗？ </li>
                            <li>您会因为无聊或者不开心来进行赌博吗？ </li>
                            <li>您在注金投注完时，是否感觉钱已经丢掉或者说要尽快的再次下注？ </li>
                            <li>您会一直赌博直到您的钱都输完吗？ </li>
                            <li>您是否有说谎言借钱，甚至盗窃来进行博彩？ </li>
                            <li>您是否刻意隐瞒过您在博彩中花费的时间和资金吗？ </li>
                            <li>您是否不愿意花费您的赌金在其他方面呢？ </li>
                            <li>您是否已经对家人，朋友和爱好失去了兴趣？ </li>
                            <li>假如您的注金全部投注完，您是否会想要尽快赢回您输掉的资金？ </li>
                            <li></li>
                        </ul>
                        <p>如果您的大部分答案选择为&ldquo;是&rdquo;，您可能已经沉迷于赌博，我们建议您:</p>
                        <ul type="disc">
                            <li>把博彩当做一种娱乐休闲项目 </li>
                            <li>避免连续的损失 </li>
                            <li>对博彩有自己的认识 </li>
                            <li>合理安排自己在博彩中的时间和精力 </li>
                        </ul>
                        </p></div>

                <h4 className="title2" id="58">2. 自我隔离<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p>对于一些客户希望暂时远离博彩，我们将提供一个自我排除的功能，您可以申请六个月到五年的账户停用时间。请点击网页中的&ldquo;联系我们&rdquo;，我们的客服人员会为您带来更多资讯。</p>                            </div>
                <h4 className="title2" id="59">3. 年龄限制<a href="#top" className="ReturnTop">返回顶部</a> </h4>
                <div className="helpContent">
                    <p>18岁以下的人群是禁止赌博的，{appName}将保有对顾客所提供年龄信息证明的查询，如有发现年龄证明与客户所提供的不符，我们将关闭客户的账号以及冻结所剩余的资金。由于各地的法令条款不同，因此我们建议客户在进行博彩游戏前，翻阅当地法律进行查询。
                    </p>
                    <p>{appName}建议禁止您开设多重账号，匿名用户名，以及密码的滥用。
                    </p>
                </div>

            </div>


        )
    }
}



export default (Responsibility);
