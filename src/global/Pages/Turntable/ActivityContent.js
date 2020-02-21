import React from 'react';
import {config} from "globalConfig";
var startTime ="18:00" // 初始活动开始时间
var endTime = "23:59"; // 初始活动结束时间

export function activityDetails(showLeftPop){
    if( config.spec.includes('xhtd') ){
        startTime = "16:00";
    }
    let DetailsContent;
    if (config.spec.includes('bet365-bbt')) {
        DetailsContent = (
            <div className="wrap_box">
                <p className="wz newtitle">抽奖条件</p>
                <p className="wz newwz">
                    活动时间：12月25日00:00开始<br />
                    活动对象：{config.appName}全体有效会员<br />
                    结束时间：2020年1月1日23:59:59<br />                  
                    <span>奖品设置：iPhone 11pro(256GB)、iPhone 11 Pro Max(256GB)、正品球衣、免费筹码 8元、28元、188元、588元、888元、手机话费100元、谢谢惠顾，更多奖项不定时更新中</span><br />
                    <p className="newtitle" style={{paddingBottom: '0'}} >活动内容</p> 
                
                    <table style={{float: "none", margin: "0"}}>
                        <tbody>
                            <tr className="tit">
                                <th>当天累计存款金额</th>
                                <th>抽奖次数</th>
                                <th>免费筹码流水限制</th>

                            </tr>
                            <tr>
                                <td>500+</td>
                                <td>1次</td>
                                <td rowSpan={4}>1倍</td>

                            </tr>
                            <tr>
                                <td>2000+</td>
                                <td>3次</td>
                            </tr>
                            <tr>
                                <td>5000+</td>
                                <td>5次</td>
                            </tr>
                            <tr>
                                <td>10000+</td>
                                <td>8次</td>
                            </tr>

                        </tbody>
                    </table> 
                    <br/>
                    <p>
                    请符合会员在每轮结束后24小时内，联系优惠QQ专员【365艾丽：22867130】并提交以下内容：<br />
                    玩家账号、真实姓名、注册手机号码、奖品名称（若奖品为球衣需提供尺M/L/XL）、详细邮寄地址信息<br />
                    （省→市→区（乡）→街道（村）→小区（组）→楼号→单元→门牌号
                    </p>
                </p>
            </div>
        )
    }
    else if(config.spec.includes('asa')){
        endTime = "23:00";
        DetailsContent=(
            <div className="wrap_box">                               
                <p className="wz newtitle">抽奖条件</p>
                <p className="wz newwz">
                    活动时间：现在起<br/>
                    结束时间：以官网通知时间为准<br/>
                    活动对象：{config.appName}全体有效会员<br/>
                    {/* 活动时间：{sTime}~{eTime}<br/> */}
                    <span style={{"color":"#ff0000"}}>★存款金额统计:当日的累计存款金额计算周期采用的是美东时间，即北京时间每天中午12:00:00至次日中午11:59:59</span><br/>
                </p>
                <table>
                    <tbody>
                        <tr className="tit">
                            <th>当天累计存款金额</th>
                            <th>抽奖次数</th>
                            <th>流水限制</th>
                            <th>活动时间</th>
                        </tr>
                        <tr>
                            <td>200+</td>
                            <td>1次</td>
                            <td rowSpan={7}>一倍流水</td>
                            <td rowSpan={7}>北京时间<br/>                
                                {startTime}至{endTime}                              
                            </td>
                        </tr>
                        <tr>
                            <td>5000+</td>
                            <td>2次</td>
                        </tr>
                        <tr>
                            <td>10000+</td>
                            <td>3次</td>
                        </tr>
                        <tr>
                            <td>50000+</td>
                            <td>5次</td>
                        </tr>
                        <tr>
                            <td>100000+</td>
                            <td>10次</td>
                        </tr>
                        <tr>
                            <td>200000+</td>
                            <td>18次</td>
                        </tr>
                        <tr>
                            <td>500000+</td>
                            <td>28次</td>
                        </tr>
                    </tbody>
                </table>
            </div>        
        )        
    } else if (config.spec.includes("cbd")) {
        DetailsContent = (
            <div className="wrap_box">
                <p className="wz newtitle">抽奖条件</p>
                <p className="wz newwz">
                    活动时间：自美东时间2019年4月13日起<br />
                    结束时间：以官网通知时间为准<br />
                    活动对象：{config.appName}全体有效会员<br />
                    开放时间：每天12:30 ~ 次日11:59<br />
                    <span>奖品设置：保时捷跑车、IphoneX、免费筹码—18元、88元、188元、588元、888元、100元手机话费、电子老虎机存送优惠券，更多奖项不定期更新中</span><br />
                </p>
                <table>
                    <tbody>
                        <tr className="tit">
                            <th>当天累计存款金额</th>
                            <th>抽奖次数</th>
                            <th>流水限制</th>
                            <th>活动时间</th>
                        </tr>
                        <tr>
                            <td>500+</td>
                            <td>1次</td>
                            <td rowSpan={7}>无需流水<br />即可提款</td>
                            <td rowSpan={7}>
                                全天
                        </td>
                        </tr>
                        <tr>
                            <td>2000+</td>
                            <td>3次</td>
                        </tr>
                        <tr>
                            <td>5000+</td>
                            <td>5次</td>
                        </tr>
                        <tr>
                            <td>10000+</td>
                            <td>8次</td>
                        </tr>
                        <tr>
                            <td>50000+</td>
                            <td>10次</td>
                        </tr>
                        <tr>
                            <td>100000+</td>
                            <td>15次</td>
                        </tr>
                        <tr>
                            <td>500000+</td>
                            <td>28次</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    else
    {
        DetailsContent=(
            <div className="wrap_box">  
                <p className="wz newtitle">抽奖条件</p>
                <p className="wz newwz">
                    活动时间：自美东时间2019年4月13日起<br/>
                    结束时间：以官网通知时间为准<br/>
                    活动对象：{config.appName}全体有效会员<br/>
                    开放时间：每天下午{startTime}~23:59<br/>
                    <span>奖品设置：保时捷跑车、IphoneX、免费筹码—18元、88元、188元、588元、888元、100元手机话费、电子老虎机存送优惠券，更多奖项不定期更新中</span><br/>
                </p>
                <table>
                    <tbody>
                    <tr className="tit">
                        <th>当天累计存款金额</th>
                        <th>抽奖次数</th>
                        <th>流水限制</th>
                        <th>活动时间</th>
                    </tr>
                    <tr>
                        <td>500+</td>
                        <td>1次</td>
                        <td rowSpan={7}>无需流水<br/>即可提款</td>
                        <td rowSpan={7}>北京时间<br/>                
                            {startTime}至23:59                              
                        </td>
                    </tr>
                    <tr>
                        <td>2000+</td>
                        <td>3次</td>
                    </tr>
                    <tr>
                        <td>5000+</td>
                        <td>5次</td>
                    </tr>
                    <tr>
                        <td>10000+</td>
                        <td>8次</td>
                    </tr>
                    <tr>
                        <td>50000+</td>
                        <td>10次</td>
                    </tr>
                    <tr>
                        <td>100000+</td>
                        <td>15次</td>
                    </tr>
                    <tr>
                        <td>500000+</td>
                        <td>28次</td>
                    </tr>
                    </tbody>
                </table>
            </div>   
        )
    }
    return(
        <div className="huodong_detail">
            <div className="hd_img"><div className="img1"/></div>
            <div className="close_img" onClick={()=>showLeftPop()}><div className="img-xx"/></div>
            <div className="text">
                {DetailsContent}
            </div>
        </div>  
    )
}
// 活动细则
export function activityRoles(showRightPop){
    let RolesContent;
    if(config.spec.includes('bet365-bbt')) {
        RolesContent = (
            <div className="wrap_box">
                <p className="wz">1、所有实物奖品不可折现，本活动不与其他存送类活动共享；</p>
                <p className="wz">2、请确认相关奖品包装完好无损后再进行签收。</p>
                <p className="wz">3、若您在申领奖品后长时间仍未收到奖品，请在活动结束后的15天内联系在线客服或以邮件形式联系我们，超过时间则默认为放弃奖品。</p>
                <p className="wz">4、关联账号不可重复参加；任何会员以任何不诚实手段，包括但不限于对赌、冒充、伪造身份、合谋作弊等参加本活动，违规者系统会取消该等用户任何领奖资格并不需事先作任何通知。</p>
                <p className="wz">5、bet365娱乐不对任何关于第三方产品的发布延期、产品质量、产品库存、配送流程、产品保养及任何不可抗力因素等出现的任何意外、故障、损毁、直接或间接损失费用负责。</p>
                <p className="wz">6、bet365娱乐保留提前终止活动并不作提前及个别通知的权利，bet365娱乐保留本活动最终解释权。</p>
            </div>
        )   
    }
    else if(config.spec.includes('asa')){
        RolesContent = (
            <div className="wrap_box">
                <p className="wz">1、如果您当日的累计存款金额达到活动条件，即可开始参与，且需在该有效时间内完成转盘旋转次数，逾期末参加视为自动放弃活动资格;否则此次存款无效，逾期将失去兑换资格；</p>
                <p className="wz">2、凡是抽中"免费筹码”的会员无需申请，系统会在30分内自动添加到中奖会员账号上，无需流水即可提款；</p>
                <p className="wz">3、凡是抽中“100元手机话费”的会员务必在中奖后，2小时内添加官网客服QQ:联系客服申请话费充值，逾期视为自动放弃；</p>
                <p className="wz">4、此“幸运大赚盘”活动为(本站]系统程序自动运行，中奖的概率完全遵循力学及自然概率，不涉及任何人工操作，抽奖结果以系统判定为准，不得争议，</p>
                <p className="wz">5、如您忘记会员账号/密码，请您联系7 x24小时在线客服协助您取回您的账号信息；</p>
                <p className="wz">6、参与该优惠，即表示您同意《一般优惠规则与条款》；</p>
                <p className="wz">7、我司保留权利向此团队或个人停止、取消优惠或索回已支付的全部优惠红利。此外,公司亦保留权利向这些客户扣取相当于优惠红利价值的行政费用,以补偿我们的行政成本;</p>
                <p className="wz">8、我司保留对活动的最终解释权,以及在无通知的情况下修改、终止活动的权利,适用于所有优惠。</p>
            </div>            
        )             
    } else if(config.spec.includes('cbd')) {
        RolesContent = (
            <div className="wrap_box">
                <p className="wz">1、如果您当日的累计存款金额达到活动条件，即可次日12:30之后获得大转盘抽奖机会，且需在该有效时间内完成转盘旋转次数，逾期未参加视为自动放弃活动资格；</p>
                <p className="wz">2、在获得“存送优惠券”的会员，在使用优惠券进行存款之前，账户余额必须低于10元，需联系24小时在线客服进行申请且彩金未派发前不可投注，否则此次存款无效，逾期将失去兑换资格；</p>
                <p className="wz">3、凡是抽中“免费筹码”的会员无需申请，系统会在30分内自动添加到中奖会员账号上，无需流水即可提款；</p>
                <p className="wz">4、凡是抽中“100元手机话费”的会员务必在中奖后，2小时内添加官网客服QQ：{config.qq} 申请话费充值，逾期视为自动放弃，</p>
                <p className="wz">5、凡是抽中实物奖品的会员，奖品不可折现；请务必于中奖后三个工作日内联系我司客服提供快递收货地址、姓名及联系电话，奖品将在中奖会员提供具体收货地址后十个工作日内寄出，请耐心等待。如中奖后三个工作日内未联系我司确认收货地址或因个人提供的收件信息不完整、不正确、电话无法联系上导致物品无法寄送快递退回的情况，均视为自动放弃不再安排寄送，请勿与客服就此理论；</p>
                <p className="wz">6、此“幸运大赚盘”活动为【{config.appName}】系统程序自动运行，中奖的概率完全遵循力学及自然概率，不涉及任何人工操作，抽奖结果以系统判定为准，不得争议</p>
                <p className="wz">7、如您忘记会员账号/密码，请您联系7x24小时在线客服协助您取回您的账号信息</p>
                <p className="wz">8、参与该优惠，即表示您同意《一般优惠规则与条款》。</p>
            </div>
        )  
    }
    
    else{
        RolesContent = (
            <div className="wrap_box">
                <p className="wz">1、如果您当日的累计存款金额达到活动条件，即可开始参与，且需在该有效时间内完成转盘旋转次数，逾期未参加视为自动放弃活动资格；</p>
                <p className="wz">2、在获得“存送优惠券”的会员，在使用优惠券进行存款之前，账户余额必须低于10元，需联系24小时在线客服进行申请且彩金未派发前不可投注，否则此次存款无效，逾期将失去兑换资格；</p>
                <p className="wz">3、凡是抽中“免费筹码”的会员无需申请，系统会在30分内自动添加到中奖会员账号上，无需流水即可提款；</p>
                <p className="wz">4、凡是抽中“100元手机话费”的会员务必在中奖后，2小时内添加官网客服QQ：{config.qq} 申请话费充值，逾期视为自动放弃，</p>
                <p className="wz">5、凡是抽中实物奖品的会员，奖品不可折现；请务必于中奖后三个工作日内联系我司客服提供快递收货地址、姓名及联系电话，奖品将在中奖会员提供具体收货地址后十个工作日内寄出，请耐心等待。如中奖后三个工作日内未联系我司确认收货地址或因个人提供的收件信息不完整、不正确、电话无法联系上导致物品无法寄送快递退回的情况，均视为自动放弃不再安排寄送，请勿与客服就此理论；</p>
                <p className="wz">6、此“幸运大赚盘”活动为【{config.appName}】系统程序自动运行，中奖的概率完全遵循力学及自然概率，不涉及任何人工操作，抽奖结果以系统判定为准，不得争议</p>
                <p className="wz">7、如您忘记会员账号/密码，请您联系7x24小时在线客服协助您取回您的账号信息</p>
                <p className="wz">8、参与该优惠，即表示您同意《一般优惠规则与条款》。</p>
            </div>            
        )  
    }
    return(
        <div className="huodong_detail2">
            <div className="hd_img"><div className="img1"/></div>
            <div className="close_img" onClick={()=>showRightPop()}><div className="img-xx"/></div>    
            {RolesContent}        
        </div>
    )
}