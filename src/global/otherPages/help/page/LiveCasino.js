/**
 *   娱乐城
 */

import React, {Component} from 'react';
import {config} from "globalConfig";

class LiveCasino extends Component {
    render() {
        const appName = config.appName;
        return (
            <div id="liveCasino" className="contents">
                <div className="helpContent">
                    <h3 className="title1">娱乐场</h3>
                    <ul className="contentul">
                        <li><a href="#36">1、{appName}线上娱乐场有哪些真人平台？</a></li>
                    </ul>
                </div>
                {/* <h4 className="title2" id="35">
                    1.什么是返奖率？
                    <a href="#top" className="ReturnTop">返回顶部</a>
                </h4>
                <div className="helpContent">
                    <p>
                        返奖率
                        <br />
                        <br />
                        <div className="address">
                            返奖率，或称之为返奖百分比，是按照一个游戏的所有投注金额的某个百分比返还给玩家的奖金。<br />下列表格中提供了每个游戏的返奖百分比。<br />这些数值均为数学计算值，是基于游戏设置，包括所有可能出现的赛果，以及其他方面的影响，例如玩家的数量等，或受游戏情况变化影响。<br />这些数值也基于记录列出，不会受之后的派彩 影响。
                        </div> <table className="tab-TFinfo" cellPadding="0" cellSpacing="0" style={{textAlign:'center'}}>
                            <tr className="tab-tr-red">
                                <td width="263">游戏类别</td>
                                <td width="160"><strong>游戏</strong></td>
                                <td width="217">返奖百分比</td>
                            </tr>
                            <tr className="tab-tr-red">
                                <td rowSpan="4">真人荷官游戏</td>
                                <td>百家乐</td>
                                <td>98.75%</td>
                            </tr>
                            <tr>
                                <td>龙虎</td>
                                <td>98.90%</td>
                            </tr>
                            <tr>
                                <td>轮盘</td>
                                <td>97.30%</td>
                            </tr>
                            <tr>
                                <td>骰宝</td>
                                <td>90.63%</td>
                            </tr>
                        </table>
                    </p>
                </div> */}
                <h4 className="title2" id="36">1. {appName}线上娱乐场有哪些真人娱乐平台？</h4>
                <div className="helpContent">
                    <div className="address">
                        {appName}线上娱乐场的真人娱乐平台通过技术合作，引进了世界领先的真人娱乐平台。<br />真人娱乐平台：PT真人、MG真人、AG真人、BBIN真人、OG真人、申博真人等。<br />{appName}线上娱乐场的宗旨主要为大家打造亚洲最佳娱乐平台。
                    </div>
                </div>
            </div>


        )
    }
}



export default (LiveCasino);


