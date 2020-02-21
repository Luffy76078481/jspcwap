
import React from 'react';
import {config} from "globalConfig";

export function renderProfile() {
    var ret = "";
    if (config.spec === "bet365-bee") {
        ret = "Bet365是世界最大的网络博彩公司，在世界各地拥有2,200多万客户，集团员工总数超过3,000名，是由直布罗陀政府颁发执照并受直布罗陀博彩委员会监管，除体育投注外，我们还在线提供一流的现场荷官，电子游艺，彩票及扑克牌室。bet365采用方便快捷的一户通系统，即您可使用相同的用户名、密码及支付方式，畅快体验上述所有的精彩产品。";
    }else if(config.spec === "bet365-bbt") {
        ret = "Bet365是世界领先的网络博彩集团之一，提供体育投注、金融、娱乐场、扑克牌及游戏等丰富选择。我们向客户提供全部体育范围内的丰富投注，内容涵盖足球、网球、篮球、斯诺克及乒乓球等。此外，您还可以使用网球过关投注奖金尽享ATP网球顶级赛事带来的众多诱人投注机会。您可同时通过手机或平板电脑访问“移动中的Bet365”，体验一系列同样精彩诱人的赛事及盘口，包括现场滚球盘服务。";
    }else if(config.spec === "xpj-asa"){
        ret ="新葡京娱乐场已取得了菲律宾政府唯一认可的发牌及监管单位First Cagayan Leisure Resort Corporation(FCLRC)和 Cagayan Economic Zone Authority(CEZA)联合颁发的网络博彩游戏运营牌照。新葡京娱乐场严格按照这些管理机构发布的规则进行运营。";
    }else if(config.spec ==="mgm-vv8"){
        ret="美高梅(MGM Macau)为大中华地区领先的娱乐场博彩度假酒店发展商、拥有者和运营商之一，是屡获殊荣的顶级综合博彩度假酒店，于2007年与亚洲最大博彩软件提供商进行技术合作，正式进军网络博彩业，成立【澳门美高梅娱乐场】在线博彩网站。在越来越热络的网络博彩市场中，美高梅不断地求新求变，寻找最新的创意，秉持最好的服务。带给客户高质量的服务、产品、娱乐，以及提供更多元化的游戏产品，是我们企业永恒不变的宗旨。"
    }else if(config.spec ==="ldgj-kyy"){
        ret="利达国际创办于2008年1月,公司一直致力于品牌策划传播事业,国际赛事贵宾接待及相关娱乐演出等事业;经营:企业形象策划,品牌营销策划,广告代理发布,媒体整合传播旅游发展计划等;我们为全球多个地区提供一体化的服务，客服覆盖亚洲、欧洲、美洲等地，以专业、高效、优质的服务赢得广大客户认可。公司位于菲律宾,汇集一批具有很强的市场洞察力,策划能力及接待经验的专业团队.我们的王牌业务——娱乐演出、国际赛事贵宾接待，为境内外喜爱娱乐演出、国际赛事高端旅行的客户，提供量身定制的全程贵宾接待。这些服务涵盖了名人演唱会、知名体育赛事、电视节、电影节、音乐节、慈善party 等。欢迎携手,共创未来.向世界传播您代表中国的价值,对这一共同的事业我们称之为,创造具有中国精神的世界品牌。"
    }else if(config.spec ==="vns-uzi"){
        ret="威尼斯人于2007年初正式開拓亞洲市場，被授予“亞洲最受玩家喜愛的博彩品牌”，如今也成為亞洲最具有領導地位的頂級博彩公司。背靠亞洲具代表地位的網絡博彩娛樂集團（BBIN），提供豐富多樣的視訊直播、電子遊藝、體育賽事、及彩票等遊戲產品，逐步建構亞洲最大網絡博彩娛樂事業體"
    }else if(config.spec ==="jhgj-jjh"){
        ret="品牌信誉-首选「金豪」，最具公信力的博彩公司、更有高质量的游戏平台。公司不仅拥有市场上最多元化的游戏投注平台，同时为客户提供实时、刺激、高信誉的服务保证、高质量的游戏平台，也是公司的首要宗旨。"
    }else {
        ret = config.appName+"线上娱乐城由亚洲顶级IT技术团队斥资打造的顶级线上娱乐平台，运营总部位於东南亚的一个群岛国家菲律宾马尼拉，并获得菲律宾政府认证的博彩执照。我们一切博彩营业行为皆遵从菲律宾政府博彩条约。一直秉持诚信可靠，秉持最好服务的企业宗旨为广大游戏爱好者服务，以维护客户以及企业形象。";
    }
    return ret;
}
export function renderTerms() {
    var ret="";
    ret="于菲律宾卡格扬自由港(CAGAYAN FREEPORT)受充分许可和规管，提供网上体育博彩（Sportsbook Wagering）和娱乐场博彩(Casino Gambling)服务"
    return ret;
}
export function renderAllianceTable() {
    if(config.spec === "vns-uzi"||config.spec === "mgm-vv8"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" rules="none">
            <tbody>
                <tr>
                    <td>当月净盈利</td>
                    <td>净盈利返佣比例</td>
                    <td>利润计算</td>
                </tr>
                <tr>
                    <td>1~5万</td>
                    <td>35%</td>
                    <td>17500（按5万计算）</td>
                </tr>
                <tr>
                    <td>5~9.9万</td>
                    <td>40%</td>
                    <td>37100（按9.9万计算）</td>
                </tr>
                <tr>
                    <td>10~19.9万</td>
                    <td>45%</td>
                    <td>79600（按19.9万计算）</td>
                </tr>
                <tr>
                    <td>20~49.9万</td>
                    <td>50%</td>
                    <td>222150（按49.9万计算）</td>
                </tr>
                <tr>
                    <td>50万以上</td>
                    <td>55%</td>
                    <td>480300（按100万计算）</td>
                </tr>
            </tbody>
            </table>
        )
    }else if(config.spec === "xhtd-xhtd"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0">
                <tbody>
                    <tr>
                        <td>当月盈利</td>
                        <td>当月退佣比例</td>
                        <td>佣金</td>
                    </tr>
                    <tr>
                        <td>1 - 5万</td>
                        <td>35%</td>
                        <td>17500（按5万计算）</td>
                    </tr>
                    <tr>
                        <td>5 - 9.9万</td>
                        <td>40%</td>
                        <td>37100（按9.9万计算）</td>
                    </tr>
                    <tr>
                        <td>10 - 19.9万</td>
                        <td>45%</td>
                        <td>79600（按19.9万计算）</td>
                    </tr>
                    <tr>
                        <td>20 - 49.9万</td>
                        <td>50%</td>
                        <td>222150（按49.9万计算）</td>
                    </tr>
                    <tr>
                        <td>50万以上</td>
                        <td>55%</td>
                        <td>480300（按100万计算）</td>
                    </tr>
                </tbody>
            </table>
        )
    }else if(config.spec === "bet365-bee"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" >
            <tbody>
                <tr>
                    <td rowSpan='2'>每月有效会员</td>
                    <td colSpan='2'>每日纯利润（派彩-红利）</td>
                    <td colSpan='5'>佣金比例</td>
                </tr>
                <tr>
                    <td>最低（RMB）</td>
                    <td>最高（RMB）</td>
                    <td>真人</td>
                    <td>体育</td>
                    <td>电子</td>
                    <td>棋牌</td>
                    <td>彩票</td>
                </tr>
                <tr>
                    <td>≥5</td>
                    <td>1</td>
                    <td>150000</td>
                    <td>25%</td>
                    <td>20%</td>
                    <td>30%</td>
                    <td>0.1%</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>≥25</td>
                    <td>150001</td>
                    <td>600000</td>
                    <td>30%</td>
                    <td>25%</td>
                    <td>35%</td>
                    <td>0.1%</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>≥50</td>
                    <td>600001</td>
                    <td>1200000</td>
                    <td>35%</td>
                    <td>30%</td>
                    <td>40%</td>
                    <td>0.2%</td>
                    <td>0.2%</td>
                </tr>
                <tr>
                    <td>≥100</td>
                    <td>1200001</td>
                    <td>N/A</td>
                    <td>40%</td>
                    <td>35%</td>
                    <td>45%</td>
                    <td>0.3%</td>
                    <td>0.3%</td>
                </tr>
            </tbody>
        </table>         
        )
    }else if(config.spec === "js-j98"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" >
            <tbody>
            <tr>
                <td>当月盈利</td>
                <td>最低有效会员</td>
                <td>真人(&gt;)</td>
                <td>电子棋牌</td>
                <td>彩票</td>
                <td>体育/电竞</td>
                <td>月最低新增人数</td>
            </tr>
            <tr>
                <td>>3000</td>
                <td>5人</td>
                <td>20%</td>
                <td>20%</td>
                <td>0.10%</td>
                <td>10%</td>
                <td>1人</td>
            </tr>
            <tr>
                <td>>100000</td>
                <td>10人</td>
                <td>25%</td>
                <td>25%</td>
                <td>0.10%</td>
                <td>10%</td>
                <td>2人</td>
            </tr>
            <tr>
                <td>>300000</td>
                <td>20人</td>
                <td>30%</td>
                <td>30%</td>
                <td>0.10%</td>
                <td>10%</td>
                <td>3人</td>
            </tr>
            <tr>
                <td>>600000</td>
                <td>30人</td>
                <td>35%</td>
                <td>35%</td>
                <td>0.10%</td>
                <td>10%</td>
                <td>4人</td>
            </tr>
            </tbody>
        </table>
        )
    }else{
        return (
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td>存款会员数</td>
                    <td>有效投注会员</td>
                    <td>最小公司盈利(&gt;)</td>
                    <td>最大公司盈利(≦)</td>
                    <td>公司盈利佣金比例(%)</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>5</td>
                    <td>1</td>
                    <td>150000</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td>25</td>
                    <td>25</td>
                    <td>150000</td>
                    <td>600000</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>50</td>
                    <td>50</td>
                    <td>600000</td>
                    <td>1200000</td>
                    <td>35</td>
                </tr>
                <tr>
                    <td>100</td>
                    <td>100</td>
                    <td>1200000</td>
                    <td>12000000</td>
                    <td>40</td>
                </tr>
                </tbody>
            </table>
        )
    }
}
export  function rederAllianceTable2() {
    if(config.spec=="ybb"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td className="table-title">视讯</td>
                    <td className="table-title">体育</td>
                    <td className="table-title">电子</td>
                    <td className="table-title">彩票</td>
                </tr>
                <tr>
                    <td>25%</td>
                    <td>25%</td>
                    <td>25%</td>
                    <td>0.1%</td>
                </tr>
                </tbody>
            </table>
        )
    } else if(config.spec=="hg"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td className="table-title">视讯</td>
                    <td className="table-title">体育</td>
                    <td className="table-title">电子</td>
                    <td className="table-title">彩票</td>
                </tr>
                <tr>
                    <td>25%</td>
                    <td>25%</td>
                    <td>25%</td>
                    <td>0.1%</td>
                </tr>
                </tbody>
            </table>
        )
    } else {
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td className="table-title">视讯</td>
                    <td className="table-title">体育</td>
                    <td className="table-title">电子</td>
                    <td className="table-title">彩票</td>
                </tr>
                <tr>
                    <td>25%</td>
                    <td>25%</td>
                    <td>25%</td>
                    <td>0.1%</td>
                </tr>
                </tbody>
            </table>
        )
    }
}
export function renderToolTitle() {

    if(config.spec =="ldgj-kyy"){
        return(<h3 className="f35 juzhong heiti font300" style={{ paddingBottom: '20px'}}>私人定制</h3>)

    }else {
        return(<h3 className="f35 juzhong heiti font300" style={{ paddingBottom: '20px'}}>给力的优惠活动</h3>
        )
    }

}
export function render_tittxt() {
    if(config.spec =="xhtd-xhtd"){
        return(
            <div className="txt">
                {/*<span style={{lineHeight: "35px",fontWeight:"700"}}>公平公正</span><br/>*/}
                <span>在越来越热络的网络博彩市场中，我们不断求新求变，寻找最新的创意，秉持最好的服务，以带给客户高品质的服务、产品、娱乐，是我们的企业永恒宗旨。</span><br/><br/>
                <span style={{lineHeight: "35px",fontWeight:"700"}}>公平、公正、公开</span><br/>
                <span>我们的体育博彩拥有顶级的盘房操盘，投入大量的人力以及资源，提高完整赛事，丰富玩法给热爱体育的玩家。
                    真人视讯游戏拥有经国际赌场专业训练的荷官，进行各种赌场游戏，所有赌局都依荷官动作，而不是预设的电脑机率结果，
                    以高科技的网络直播技术，带给玩家身历赌场的刺激经验！各式彩票游戏，是依官方赛果产生游戏结果，让玩家在活波的投注介面，
                    享受最公正的娱乐。而我们的电子游戏使用最公平的乱数产生机率，让玩家安心享受多元的娱乐性游戏。新濠天地所有的游戏皆有共同的优点：
                    无须下载、介面操作简易、功能齐全、画面精致、游戏秉持公平、公正、公开！</span><br/><br/>
                <span style={{lineHeight: "35px",fontWeight:"700"}}>客户至上</span><br/>
                <span>在市场上众多的博彩网站中，玩家选择新濠天地，除了多元化的产品，也是因为新濠天地拥有良好的信誉，
                    以及高品质的服务，我们的用心随处可见，诺顿分级评级新濠天地为安全网站，绝无任何恶意软体，并获得 GEOTRUST 国际认证，
                    确保网站公平公正性，所有会员资料均经过加密，保障玩家隐私。新濠天地以服务会员不打烊的精神，24小时处理会员出入款相关事宜，
                    令我们骄傲的客服团队，亲切又专业，解决玩家对于网站、游戏的种种疑难杂症，让每位玩家有宾至如归的感觉！
                    我们自豪的以业界最强的各种优惠方式回馈我们的会员，新濠天地绝对是玩家最明智的选择！</span><br/>
            </div>
        )

    }else {
        return(
            <div className="txt">
                <span style={{lineHeight: "35px",fontWeight:"700"}}>公平公正</span><br/>
                <span>是我们最基本的宗旨。我们采用最具亚洲代表的网络博彩娱乐集团多家国际公司同时使用一套真人游戏系统；给玩家提供绝对公平公正的在线娱乐平台。
                            我们在处理客户的投诉回馈，都秉持着公平公正的基本原则，旨在打造一个客户信赖的娱乐平台。</span><br/><br/>
                <span style={{lineHeight: "35px",fontWeight:"700"}}>诚信专业</span><br/>
                <span>诚信经营是公司的核心宗旨之一，因为只有诚信经营才能赢得客户的信赖和口碑；我们的经营团队具备多年的博彩运营经验，所有的技术团队和客服团队都经过专业的训练，我们以最专业的水平和态度，
                            力求给客户提供安全稳定的游戏平台及优质的客服。</span><br/><br/>
                <span style={{lineHeight: "35px",fontWeight:"700"}}>客户至上</span><br/>
                <span>我们的目标是打造最受玩家欢迎的在线娱乐平台，我们更关心客户的需求和利益。提供24小时专业的客户服务，随时解决客户的咨询及问题。多渠道的与客户互动交流，
                            了解客户的需求，随时关注客户的意见。举办更多的优惠及促销活动，给客户提供更多的回馈及惊喜。</span><br/>
            </div>
        )
    }
}