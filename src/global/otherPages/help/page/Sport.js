
import React, {Component} from 'react';
import {config} from "globalConfig";

class Sport extends Component {
    render() {
        const appName = config.appName;
        return (

            <div id="sport" className="contents">
                <div className="helpContent">
                    <h3 className="title1">{appName}体育</h3>
                    <ul className="contentul">
                        <li><a href="#30">1、什么是{appName}体育？</a></li>
                        <li><a href="#31">2、我可以申请两个20%的存款红利吗？</a></li>
                        <li><a href="#32">3、投注{appName}体育我使用哪个浏览器更好？</a></li>
                        <li><a href="#33">4、我可以同进投注于{appName}体育吗？ </a></li>
                        <li><a href="#34">5、{appName}体育提供"1X2"的投注吗？ </a></li>
                    </ul>
                </div>
                <h4 className="title2" id="30">
                    1.什么是{appName}体育？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        {appName}体育使用的是{appName}直营体育平台, 业界公认的滚球专家，
                        每月平均提供约10,000场现场滚球赛事。{appName}在线娱乐场立志提供顾客最佳水位和最优服务。
                        <br/>
                    </p>
                </div>
    
                <div className="helpContent">
                    <p>不可以的，您不可以同时申请两个20%的红利，每位新会员只能在转账的时候申请一次存款红利，如果已经申请过，您将不能再次申请。</p>
                </div>
                <h4 className="title2" id="32">
                    2.投注{appName}体育我使用哪个浏览器更好？<a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>{appName}体育支持您使用所有的浏览器，IE，火狐，Opera,Chrome,Safari ,和其他浏览器</p>
                </div>
                <h4 className="title2" id="33">
                    3. 我可以同进投注于{appName}体育吗？
                    <a href="#top" className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>
                        是的，可以的，所有玩家可以选择您最佳赛事投注。<br />
                    </p>
                </div>
                <h4 className="title2" id="34">
                    4. {appName}体育提供"1X2"的投注吗？<a href="#top"className="ReturnTop">返回顶部</a> 
                </h4>
                <div className="helpContent">
                    <p>是的，可以的，所有玩家可以选择您最佳赛事投注。</p>
                </div>
            </div>
        )
    }
}

export default (Sport);