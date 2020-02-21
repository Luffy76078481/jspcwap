/**
 * XPJ合作经营
 */
import React, {Component} from 'react';
import {config} from "globalConfig";
class AllianceContent extends Component {
    render() {
        return (
            <div id="AllianceContent" className=" xpjContent show">
                <div className="money-fousImg"></div>
                <div className="fnameCenter money-text heiti">
                    <p>
                        <span>三级占成代理方案</span>
                        <br/>
                        <br/>
                        XPJ娱乐城位您打造了全新三级代理计划，您的人脉可以变成金矿！您既是玩家也是代理，最重要的是，您不需承担任何风险！只要您的下线进行投注，您将得到最多三个层级下线会员的佣金分成，25％、35％、45％！您只需要通过网络发展或介绍身边朋友加入并成为我们的会员，安坐在家中即可拥抱佣金回报，现加入XPJ娱乐城三级代理队伍，即刻赢在起点，快速开创一番属于自己的事业！我们将以最低的门槛和最丰厚的回报助您成功！</p>
                </div>
                <div className="borderHeng"></div>
                <div className="fnameCenter">
                    <div className="moneyStep">
                        <div className="moneyStepList">
                            <h3>1. 注册账号</h3>
                            <p>在线注册代理会员账号<br/>
                                等待审核通过
                            </p>
                        </div>
                        <div className="moneyBorderSan"></div>
                        <div className="moneyStepList">
                            <h3>2. 开始推广</h3>
                            <p>申请代理连接条或者宣传代码<br/>
                                或者代理代码，进行推广
                            </p>
                        </div>
                        <div className="moneyBorderSan"></div>
                        <div className="moneyStepList">
                            <h3>3. 赚取佣金</h3>
                            <p>按照代理合作计划<br/>
                                赢取丰厚的佣金
                            </p>
                        </div>
                        <div className="clear"></div>
                        <div className="moneStepAdd">
                            <a onClick={this.props.onClickJoin} href="#" className="productMix">现在加入</a>
                        </div>
                        <h3 className="f28 heiti juzhong font300 tit" style={{marginTop:"20px"}} >佣金计划</h3>
                        <p className="yongjin">佣金模式采业界首创输值占成三级提佣
                            可获佣的游戏类型：真人娱乐、电子游戏、体育、彩票</p>
                        <h3 className="f28 heiti juzhong font300 tit" style={{marginTop:"20px"}} >佣金结算</h3>
                        <p className="yongjin">XPJ将于每月10日前统一结算并支付代理佣金至代理帐户指定之游戏帐号或代理绑定银行卡资料中，结算周期为美东时间上月1日至月底最后1日</p>
                    </div>
                </div>
                <div className="borderHeng"></div>
                <div className="fnameCenter par3">
                    <h3 className="f28 heiti juzhong font300 tit">佣金方案</h3>
                    <p className="juzhong f12 textListText">
                        （一）佣金计算方式
                        净盈利=(线下会员一周内的总输值 - 优惠 - 洗码 - 平台费用 - 资金成本 - 盈利修正)
                        ※平台费用=各游戏平台报表盈利值的15%
                        ※资金成本(存款手续费)=存款总金额的1%
                    </p>
                    {
                        config.spec.includes('xpj-xpj')?
                        <table className="tableList" cellPadding="0" cellSpacing="0" >
                            <tbody>
                                <tr>
                                    <td>有效会员数</td>
                                    <td>最小公司净盈利(RMB)</td>
                                    <td>最大公司净盈利(RMB)</td>
                                    <td>净盈利佣金比例</td>
                                </tr>
                                <tr>
                                    <td>5人</td>
                                    <td>1</td>
                                    <td>1,000,000</td>
                                    <td>25％</td>
                                </tr>
                                <tr>
                                    <td>30人</td>
                                    <td>1,000,001</td>
                                    <td>3,000,000</td>
                                    <td>35％</td>
                                </tr>
                                <tr>
                                    <td>50人</td>
                                    <td>3,000,001</td>
                                    <td>无上限</td>
                                    <td>45％</td>
                                </tr>
                            </tbody>
                        </table>                            
                        :
                        <table className="tableList" cellPadding="0" cellSpacing="0" >
                            <tbody>
                                <tr>
                                    <td>有效会员数</td>
                                    <td>最小公司净盈利(RMB)</td>
                                    <td>最大公司净盈利(RMB)</td>
                                    <td>净盈利佣金比例</td>
                                </tr>
                                <tr>
                                    <td>5人</td>
                                    <td>1</td>
                                    <td>49999</td>
                                    <td>35％</td>
                                </tr>
                                <tr>
                                    <td>5人</td>
                                    <td>50000</td>
                                    <td>299999</td>
                                    <td>40％</td>
                                </tr>
                                <tr>
                                    <td>20人</td>
                                    <td>300000</td>
                                    <td>999999</td>
                                    <td>45％</td>
                                </tr>
                                <tr>
                                    <td>30人</td>
                                    <td>1,000,000</td>
                                    <td>无上限</td>
                                    <td>50％</td>
                                </tr>
                            </tbody>
                        </table>                        
                    }
                    <p className="f12 textListText">
                        （二）方案优势
                        无需投入资金，零风险，无线下人数取款限制
                        有单独代理后台供管理，界面清楚，操作简单
                        周周结算，佣金提款无流水要求，佣金比例高
                        三级代理，业界首创，朋友拉朋友，收益迅速
                    </p>
                    <p className="f12 textListText" style={{marginTop:"20px"}}>
                        （三）规则条款<br/>
                        1.任何会员只能成为一个推荐人的线下，代理自己不能做自己的下线。<br/>

                        2.原本已在XPJ注册过账号的会员不得重新注册为其他会员的线下，若经发现将扣除该线下的佣金。<br/>

                        3.最低提取佣金金额为500元，不足500佣金将累计至下月或某月达到要求后统一派发，负收益也将累计至下月。<br/>

                        4.当月最少需有5个有效会员数方可进行佣金提取，有效会员数的判定为当月有效投注额超过10000以上。<br/>

                        5.为防止不良业者滥用XPJ所提供的代理方案，审核部门将严格审核每位代理申请注册时所提供的个人资料，并观察代理及线下会员游戏情况，若经审核发现代理有任何不良营利企图，或与其他代理，会员进行合谋套利行为，XPJ娱乐将冻结该合作代理及会员只账户、资金，并收回相关佣金、优惠。<br/>

                        6.XPJ娱乐保留本佣金方案最终解释权。<br/>

                    </p>
                </div>
            </div>
        )
    }
}



export default (AllianceContent);