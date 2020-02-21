import React from 'react';
import {config} from "globalConfig";
const appName = config.appName;
export function activityDetails(){
    let depositNum = (config.spec.includes('jjh')||config.spec.includes('xhtd'))?100:500; // 存款金额
    let totalNum = (config.spec.includes('jjh')||config.spec.includes('xhtd'))?1000:2000
    if(config.spec.includes('aaa')){
        return(
            <div className="content">
                {/* <div className="mod mod-1">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-1.png")} alt=""/>
                        </div>
                        <div className="mt-20">
                            双十一红包雨：11月10号-13号时间为每日中午12点到晚上22点。只要达到有效投注即可领取哦~<font color="#FFFF00">最高8888+</font>等你领取~<br/><br/>
                    
                            <table className="tbl">
                                <tbody>
                                <tr>
                                    <th>有效投注</th>
                                    <th>抽奖次数</th>
                                    <th>流水要求</th>
                                    <th>单个红包</th>
                                    <th>活动时间</th>
                                </tr>
                                <tr>
                                    <td>1000<span>+</span></td>
                                    <td>1次</td>
                                    <td rowSpan="6">无</td>
                                    <td rowSpan="6">最多8888</td>
                                    <td rowSpan="6">11月10日-13号</td>
                                </tr>
                                <tr>
                                    <td>5000<span>+</span></td>
                                    <td>2次</td>
                                </tr>
                                <tr>
                                    <td>20000<span>+</span></td>
                                    <td>3次</td>
                                </tr>
                                <tr>
                                    <td>60000+</td>
                                    <td>5次</td>
                                </tr>
                                <tr>
                                    <td>100000+</td>
                                    <td>8次</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* <p>
                            <span className="fc-yellow">注：当天累计存款（以美东时间0-24点为准），次日抢红包次数（以美东时间0-24点为准）。<br/>
                                <font color="#00FF00">如：北京时间12号上午8点（美东时间为11号晚上8点）存款100，即可在北京时间12号下午14点（美东时间为12号凌晨2点）获得一次抢红包机会。</font>
                            </span>
                        </p> */}
                    {/* </div> */}
                {/* </div>  */}
                <div className="mod mod-2">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-2.png")} alt=""/>
                        </div>
                        <p>
                            1、所有优惠以人民币(CNY)为结算金额，以美东时间(EDT)为计时区间。<br/>
                            2、在真人视讯/电子游艺/彩票游戏/体育投注等进行无风险投注（例如：单局同时投注庄闲、大小、单双、输赢、红黑、转盘类单局下注号码超过全局号码2/3、倍投等）任何取消注单、赛事或局数，皆不与予参加本活动。<br/>
                            3、每位玩家﹑每户﹑每一住址 、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/银行账户) 及IP地址只能享有一次优惠 ；若会员有重复申请账号行为，公司保留取消或收回会员优惠彩金的权利。<br/>
                            4、亚洲bet365 （36557.com）的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行为， 公司保留冻结、取消该团体或个人账户及账户结余的权利。<br/>
                            5、亚洲bet365 （36557.com）保留对活动的最终解释权，以及在无通知的情况下修改、终止活动的权利，适用于所有优惠！<br/>
                        </p>
                    </div>
                </div>
                <div className="mod mod-3">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-3.png")} alt=""/>
                        </div>
                        <p>
                            1、.本活动和返水优惠共享，不与其它任何优惠共享。<br/>
                            2、该优惠仅限指定首存金额进行默认派送，若有兴趣参与，请您入款指定门槛金额哦！<br/>
                            3、任何出现对打、对冲、刷水套利行为；bet365有权取消优惠红利以及产生的盈利金额。<br/>
                            4、任何形式的同IP、同姓名、或相同（似）关联信息，仅限申请一次。<br/>
                            5、.参与该优惠，即表示您同意《优惠规则与条款》。
                            <br/>
                        </p>
                    </div>
                </div>
            </div>            
        )
    }else if(config.spec.includes('asa')){
        return(
            <div className="content">
                <div className="mod mod-1">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-1.png")} alt=""/>
                        </div>
                        <div className="mt-20">
                            即日起凡是在澳门{appName}<font color="#FFFF00">存款达到200元+</font>的会员皆可在当日参与抢亿元现金红包活动，亿元现金红包将于(<font color="#FFFF00">北京时间2018/02/09至2020/01/02限时开抢</font>)，会员登录{appName}参与抢红包，单个红包最高8888元，快来试试您的运气吧！更多给力现金回馈活动筹备中,敬请关注{appName}）<br/>
                            <table className="tbl">
                                <tbody>
                                    <tr>
                                        <th>当天累计<span lang="zh-cn">存款</span></th>
                                        <th>抢红包次数</th>
                                        <th>流水限制</th>
                                        <th>单个最大红包</th>
                                        <th>活动时间</th>
                                    </tr>
                                    <tr>
                                        <td>200<span>+</span></td>
                                        <td>1次</td>
                                        <td rowSpan="7">一倍流水</td>
                                        <td rowSpan="7">8888元</td>
                                        <td rowSpan="7">每天北京时间<br/>18：00 - 23:00点</td>
                                    </tr>
                                    <tr>
                                        <td>5000<span>+</span></td>
                                        <td>2次</td>
                                    </tr>
                                    <tr>
                                        <td>10000<span>+</span></td>
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
                        <p>
                            <span className="fc-yellow">注：当天累计存款（以美东时间0-24点为准），次日抢红包次数（以美东时间0-24点为准）。<br/>
                                <font color="#00FF00">如：北京时间12号上午8点（美东时间为11号晚上8点）存款200，即可在北京时间12号下午14点（美东时间为12号凌晨2点）获得一次抢红包机会。</font>
                            </span>
                        </p>
                    </div>
                </div>
                <div className="mod mod-2">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-2.png")} alt=""/>
                        </div>
                        <p>
                            1、会员在当日存款累计金额达到200元+，即可在次日获得抢红包机会。<br/>
                            2、所获得红包彩金{config.spec.includes("asa")?"一倍流水":"无需流水"}即可申请提款。<br/>
                            3、会员每天存款金额均有系统自动统计，若有任何异议，以{appName}核定为准不得争议.<br/>
                            4、部分套利、违反公司条例会员不在活动名单之内！如发现会员同一个IP下注册多个账号进行投注抢红包，公司有权拒绝赠送其彩金并做账号冻结处理，保证正常玩家的利益。<br/>
                            5、如果您在规定时间没未进行抢红包活动，则视为主动放弃，不得争议！<br/>
                            6、此抢红包活动为【澳门{appName}】系统程序自动运行，红包的概率完全遵循力学及自然概率.不涉及任何人工操作，抽奖结果以系统判定为准.不得争议。
                        </p>
                    </div>
                </div>
                <div className="mod mod-3">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-3.png")} alt=""/>
                        </div>
                        <p>
                            1、所有优惠以<span className="fc-yellow">人民币(CNY)</span>为结算金额，以<span
                            className="fc-yellow">美东时间(EDT)</span>为计时区间；
                            <br/>
                            2、在真人视讯/电子游艺/彩票游戏/体育投注等进行无风险投注（例如：单局同时投注庄闲、大小、单双、输赢、红黑、转盘类单局下注号码超过全局号码2/3、倍投等）任何取消注单、赛事或局数，皆不与予参加本活动。
                            <br/>
                            3、每位玩家﹑每户﹑每一住址 、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/银行账户) 及IP地址只能享有一次优惠 ；若会员有重复申请账号行为，公司保留取消或收回会员优惠彩金的权利。
                            <br/>
                            4、澳门{appName}的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行为， 公司保留冻结、取消该团体或个人账户及账户结余的权利。
                            <br/>
                            5、澳门{appName}保留对活动的最终解释权，以及在无通知的情况下修改、终止活动的权利，适用于所有优惠。
                            <br/>
                        </p>
                    </div>
                </div>
            </div>            
        )

    }
    else if (config.spec.includes('cbd') ) {

        return(
            <div className = "content" >
                <div className="mod mod-1">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-1.png")} alt="" />
                        </div>
                        <div className="mt-20">
                            即日起凡是在{appName}
                            <font color="#FFFF00">存款达到{depositNum}元+</font>
                            的会员皆可在当日参与抢亿元现金红包活动，亿元现金红包将于(<font color="#FFFF00">澳门时间<span
                                id="startTimeSpan"></span>至<span
                                    id="endTimeSpans">待定</span></font>)，会员登录{appName}参与抢红包，单个红包最高8888元，快来试试您的运气吧！更多给力现金回馈活动筹备中,敬请关注{appName}）<br />
                            <font color="#00FF00">
                                温馨提示：亲们！尚未注册/存款的亲们强烈建议您注册/存款,每天在{appName}进行存款游戏,天天参与多项优惠活动噢！如此给力，速来{appName}尽情玩乐吧！</font>
                            <table className="tbl">
                                <tbody>
                                </tbody>
                            </table>
                            <table className="tbl">
                                <tbody>
                                    <tr>
                                        <th>当天累计<span lang="zh-cn">存款</span>金额</th>
                                        <th>抢红包次数</th>
                                        <th>单个红包最大金额</th>
                                        <th>流水限制</th>
                                        <th>活动时间</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            {depositNum}
                                            <span>+</span>
                                        </td>
                                        <td>1次</td>
                                        <td rowSpan="7">8888元</td>
                                        <td rowSpan="7">无需流水<p>即可出款</p></td>
                                        <td rowSpan="7">
                                            全天
                                    </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {totalNum}
                                            <span>+</span>
                                        </td>
                                        <td>3次</td>
                                    </tr>
                                    <tr>
                                        <td>5000<span>+</span></td>
                                        <td>5次</td>
                                    </tr>
                                    <tr>
                                        <td>10000<span>+</span></td>
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
                                    <tr>
                                        <td colSpan="5">
                                            <p>会员达到条件后在该时间段没抢红包，视为自动弃权。温馨提示：输入游戏账号时请勿输入大写字母,否则导致派彩失败则视为自动放弃。</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <span className="fc-yellow">注：会员必须达到指定的存款金额才可以获得对应抢红包次数。<br />
                                <font color="#00FF00">例：会员小明当天累积存款2000元， 则可获得3次抢红包机会，抢到的红包将在30秒内派送到该会员的账号上。</font>
                            </span>
                        </p>
                    </div>
                </div>
                <div className="mod mod-2">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-2.png")} alt="" />
                        </div>
                        <p>
                            1、会员在当日存款累计金额达到{depositNum}元+，即可在次日12:30之后获得抢红包机会。<br />
                            2、 所获得红包 彩金无需流水即可申请提款。<br />
                            3、会员每天存款金额均有系统自动统计，若有任何异议，以{appName}核定为准不得争议。<br />
                            4、部分套利、违反公司条例会员不在活动名单之内！<br />
                            6、如果您的当日有效投存款达到抢红包条件，超过限定抢红包时间将视为会员自动弃权，不得争议！<br />
                            5、<font
                                color="#00FF00">每台电脑，每位会员，每个IP当日最多仅88次参与机会，如发现会员同一个IP下注册多个账号进行投注抢红包，公司有权拒绝赠送其彩金并做账号冻结处理，保证正常玩家的利益；</font><br />
                            6、此抢红包活动为【{appName}】系统程序自动运行，红包的概率完全遵循力学及自然概率.不涉及任何人工操作，抽奖结果以系统判定为准.不得争议。<br />
                            7、如您忘记会员账号/密码，请您联系<font color="#FFFF00">7×24小时在线客服</font>协助您取回您的账号信息；<br />
                            8、参与该优惠，即表示您同意《<font color="#FFFF00">一般优惠规则与条款</font>》。</p>
                    </div>
                </div>
                <div className="mod mod-3">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-3.png")} alt="" />
                        </div>
                        <p>
                            1、所有优...惠以<span className="fc-yellow">人民币(CNY)</span>为结算金额，以<span
                                className="fc-yellow">美东时间(EDT)</span>为计时区间；
                            <br />
                            2、每位玩家﹑每户﹑每一住址 、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/银行账户) 及IP地
                            址只能享有一次优惠；若会员有重复申请账号行为，公司保留取消或收回会员优惠彩金的权利；
                            <br />
                            3、<span className="fc-yellow">{appName}</span>的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行
                            为，公司保留冻结、取消该团体或个人账户及账户结余的权利；
                            <br />
                            4、若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，<span
                                className="fc-yellow">{appName}有权要求会员向我们提供充足有效的文件</span>用以确认是否享有该优惠的资质；
                            <br />
                            5、当参与优惠会员未能完全遵守、或违反、或滥用任何有关公司优惠或推广的条款，又或我们有任何证据有任何团队或个人投下一连串的关联赌注，籍以造成无论赛果怎样都可以确保可以从该存款红利或其他推广活动提供的优惠获利，<span
                                className="fc-yellow">{appName}保留权利向此团队或个人停止、取消优惠或索回已支付的全部优惠红利</span>。此外，公司亦保留权利向这些客户扣取
                            相当于优惠红利价值的行政费用，以补偿我们的行政成本；
                            <br />
                            6、<span className="fc-yellow">{appName}保留对活动的最终解释权，</span>以及在无通知的情况下修改、终止活动的权利，适用于所有优惠。
                        </p>
                    </div>
                </div>
            </div>            
        )
}   else if (config.spec.includes("kyy")) {
     return(
            <div className="content">
                <div className="mod mod-1">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-1.png")} alt=""/>
                        </div>
                        <div className="mt-20">
                            即日起凡是在{appName}
                            <font color="#FFFF00">存款达到{depositNum}元+</font>
                            的会员皆可在次日参与抢亿元现金红包活动，亿元现金红包将于(<font color="#FFFF00">澳门时间
                            <span id="startTimeSpan"></span>
                            
                             {/* 至<span id="endTimeSpan"></span> */}
                             限时开抢</font>)，会员登录{appName}参与抢红包，单个红包最高8888元，快来试试您的运气吧！更多给力现金回馈活动筹备中,敬请关注{appName}）<br/>
                            <font color="#00FF00">
                                温馨提示：亲们！尚未注册/存款的亲们强烈建议您注册/存款,每天在{appName}进行存款游戏,天天参与多项优惠活动噢！如此给力，速来{appName}尽情玩乐吧！</font>
                            <table className="tbl">
                                <tbody>
                                </tbody>
                            </table>
                            <table className="tbl">
                                <tbody>
                                <tr>
                                    <th>当天累计<span lang="zh-cn">存款</span>金额</th>
                                    <th>抢红包次数</th>
                                    <th>单个红包最大金额</th>
                                    <th>流水限制</th>
                                    <th>活动时间</th>
                                </tr>
                                <tr>
                                    <td>
                                        {depositNum }
                                        <span>+</span>
                                    </td>
                                    <td>1次</td>
                                    <td rowSpan="7">8888元</td>
                                    <td rowSpan="7">无需流水<p>即可出款</p></td>
                                    <td rowSpan="7">
                                        每天北京时间<br/>
                                        下午1:00～次日11:59:59
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {totalNum}
                                        <span>+</span>
                                    </td>
                                    <td>3次</td>
                                </tr>
                                <tr>
                                    <td>5000<span>+</span></td>
                                    <td>5次</td>
                                </tr>
                                <tr>
                                    <td>10000<span>+</span></td>
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
                                <tr>
                                    <td colSpan="5">
                                        <p>会员达到条件后在该时间段没抢红包，视为自动弃权。温馨提示：输入游戏账号时请勿输入大写字母,否则导致派彩失败则视为自动放弃。</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <span className="fc-yellow">注：会员必须达到指定的存款金额才可以获得对应抢红包次数。<br/>
                                <font color="#00FF00">例：会员小明当天累积存款2000元， 则可获得3次抢红包机会，抢到的红包将在30秒内派送到该会员的账号上。</font>
                            </span>
                        </p>
                    </div>
                </div>
                <div className="mod mod-2">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-2.png")} alt=""/>
                        </div>
                        <p>
                            1、会员在当日存款累计金额达到{depositNum}元+，即可在当日获得抢红包机会。<br/>
                            2、 所获得红包 彩金无需流水即可申请提款。<br/>
                            3、会员每天存款金额均有系统自动统计，若有任何异议，以{appName}核定为准不得争议。<br/>
                            4、部分套利、违反公司条例会员不在活动名单之内！<br/>
                            6、如果您的当日有效投存款达到抢红包条件，超过限定抢红包时间将视为会员自动弃权，不得争议！<br/>
                            5、<font
                            color="#00FF00">每台电脑，每位会员，每个IP当日最多仅88次参与机会，如发现会员同一个IP下注册多个账号进行投注抢红包，公司有权拒绝赠送其彩金并做账号冻结处理，保证正常玩家的利益；</font><br/>
                            6、此抢红包活动为【{appName}】系统程序自动运行，红包的概率完全遵循力学及自然概率.不涉及任何人工操作，抽奖结果以系统判定为准.不得争议。<br/>
                            7、如您忘记会员账号/密码，请您联系<font color="#FFFF00">7×24小时在线客服</font>协助您取回您的账号信息；<br/>
                            8、参与该优惠，即表示您同意《<font color="#FFFF00">一般优惠规则与条款</font>》。</p>
                    </div>
                </div>
                <div className="mod mod-3">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-3.png")} alt=""/>
                        </div>
                        <p>
                            1、所有优...惠以<span className="fc-yellow">人民币(CNY)</span>为结算金额，以<span
                            className="fc-yellow">美东时间(EDT)</span>为计时区间；
                            <br/>
                            2、每位玩家﹑每户﹑每一住址 、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/银行账户) 及IP地
                            址只能享有一次优惠；若会员有重复申请账号行为，公司保留取消或收回会员优惠彩金的权利；
                            <br/>
                            3、<span className="fc-yellow">{appName}</span>的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行
                            为，公司保留冻结、取消该团体或个人账户及账户结余的权利；
                            <br/>
                            4、若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，<span
                            className="fc-yellow">{appName}有权要求会员向我们提供充足有效的文件</span>用以确认是否享有该优惠的资质；
                            <br/>
                            5、当参与优惠会员未能完全遵守、或违反、或滥用任何有关公司优惠或推广的条款，又或我们有任何证据有任何团队或个人投下一连串的关联赌注，籍以造成无论赛果怎样都可以确保可以从该存款红利或其他推广活动提供的优惠获利，<span
                            className="fc-yellow">{appName}保留权利向此团队或个人停止、取消优惠或索回已支付的全部优惠红利</span>。此外，公司亦保留权利向这些客户扣取
                            相当于优惠红利价值的行政费用，以补偿我们的行政成本；
                            <br/>
                            6、<span className="fc-yellow">{appName}保留对活动的最终解释权，</span>以及在无通知的情况下修改、终止活动的权利，适用于所有优惠。
                        </p>
                    </div>
                </div>
            </div>            
        )
    } 
    
    else{
        return(
            <div className="content">
                <div className="mod mod-1">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-1.png")} alt=""/>
                        </div>
                        <div className="mt-20">
                            即日起凡是在{appName}
                            <font color="#FFFF00">存款达到{depositNum}元+</font>
                            的会员皆可在当日参与抢亿元现金红包活动，亿元现金红包将于(<font color="#FFFF00">澳门时间<span
                            id="startTimeSpan"></span>至<span
                            id="endTimeSpan"></span>限时开抢</font>)，会员登录{appName}参与抢红包，单个红包最高8888元，快来试试您的运气吧！更多给力现金回馈活动筹备中,敬请关注{appName}）<br/>
                            <font color="#00FF00">
                                温馨提示：亲们！尚未注册/存款的亲们强烈建议您注册/存款,每天在{appName}进行存款游戏,天天参与多项优惠活动噢！如此给力，速来{appName}尽情玩乐吧！</font>
                            <table className="tbl">
                                <tbody>
                                </tbody>
                            </table>
                            <table className="tbl">
                                <tbody>
                                <tr>
                                    <th>当天累计<span lang="zh-cn">存款</span>金额</th>
                                    <th>抢红包次数</th>
                                    <th>单个红包最大金额</th>
                                    <th>流水限制</th>
                                    <th>活动时间</th>
                                </tr>
                                <tr>
                                    <td>
                                        {depositNum }
                                        <span>+</span>
                                    </td>
                                    <td>1次</td>
                                    <td rowSpan="7">8888元</td>
                                    <td rowSpan="7">无需流水<p>即可出款</p></td>
                                    <td rowSpan="7">
                                        每天北京时间<br/>下午
                                        {config.spec == "xhtd-xhtd" ? "16:00" : "18:30"}
                                        至晚上00:00
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {totalNum}
                                        <span>+</span>
                                    </td>
                                    <td>3次</td>
                                </tr>
                                <tr>
                                    <td>5000<span>+</span></td>
                                    <td>5次</td>
                                </tr>
                                <tr>
                                    <td>10000<span>+</span></td>
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
                                <tr>
                                    <td colSpan="5">
                                        <p>会员达到条件后在该时间段没抢红包，视为自动弃权。温馨提示：输入游戏账号时请勿输入大写字母,否则导致派彩失败则视为自动放弃。</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <span className="fc-yellow">注：会员必须达到指定的存款金额才可以获得对应抢红包次数。<br/>
                                <font color="#00FF00">例：会员小明当天累积存款2000元， 则可获得3次抢红包机会，抢到的红包将在30秒内派送到该会员的账号上。</font>
                            </span>
                        </p>
                    </div>
                </div>
                <div className="mod mod-2">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-2.png")} alt=""/>
                        </div>
                        <p>
                            1、会员在当日存款累计金额达到{depositNum}元+，即可在当日获得抢红包机会。<br/>
                            2、 所获得红包 彩金无需流水即可申请提款。<br/>
                            3、会员每天存款金额均有系统自动统计，若有任何异议，以{appName}核定为准不得争议。<br/>
                            4、部分套利、违反公司条例会员不在活动名单之内！<br/>
                            6、如果您的当日有效投存款达到抢红包条件，超过限定抢红包时间将视为会员自动弃权，不得争议！<br/>
                            5、<font
                            color="#00FF00">每台电脑，每位会员，每个IP当日最多仅88次参与机会，如发现会员同一个IP下注册多个账号进行投注抢红包，公司有权拒绝赠送其彩金并做账号冻结处理，保证正常玩家的利益；</font><br/>
                            6、此抢红包活动为【{appName}】系统程序自动运行，红包的概率完全遵循力学及自然概率.不涉及任何人工操作，抽奖结果以系统判定为准.不得争议。<br/>
                            7、如您忘记会员账号/密码，请您联系<font color="#FFFF00">7×24小时在线客服</font>协助您取回您的账号信息；<br/>
                            8、参与该优惠，即表示您同意《<font color="#FFFF00">一般优惠规则与条款</font>》。</p>
                    </div>
                </div>
                <div className="mod mod-3">
                    <div className="wrapper">
                        <div className="hd">
                            <img src={require("../images/hd-3.png")} alt=""/>
                        </div>
                        <p>
                            1、所有优...惠以<span className="fc-yellow">人民币(CNY)</span>为结算金额，以<span
                            className="fc-yellow">美东时间(EDT)</span>为计时区间；
                            <br/>
                            2、每位玩家﹑每户﹑每一住址 、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/银行账户) 及IP地
                            址只能享有一次优惠；若会员有重复申请账号行为，公司保留取消或收回会员优惠彩金的权利；
                            <br/>
                            3、<span className="fc-yellow">{appName}</span>的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行
                            为，公司保留冻结、取消该团体或个人账户及账户结余的权利；
                            <br/>
                            4、若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，<span
                            className="fc-yellow">{appName}有权要求会员向我们提供充足有效的文件</span>用以确认是否享有该优惠的资质；
                            <br/>
                            5、当参与优惠会员未能完全遵守、或违反、或滥用任何有关公司优惠或推广的条款，又或我们有任何证据有任何团队或个人投下一连串的关联赌注，籍以造成无论赛果怎样都可以确保可以从该存款红利或其他推广活动提供的优惠获利，<span
                            className="fc-yellow">{appName}保留权利向此团队或个人停止、取消优惠或索回已支付的全部优惠红利</span>。此外，公司亦保留权利向这些客户扣取
                            相当于优惠红利价值的行政费用，以补偿我们的行政成本；
                            <br/>
                            6、<span className="fc-yellow">{appName}保留对活动的最终解释权，</span>以及在无通知的情况下修改、终止活动的权利，适用于所有优惠。
                        </p>
                    </div>
                </div>
            </div>            
        )
    }
}