
import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Footer.scss";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="FootPage">
                <article id="footer">
                    <div className="mAuto pr w1000 clearfix">
                        <div className="footer-help-share wow fadeInUp">
                            <div id="foot_help" className='fl'>
                                <h3 ><i className="glyphicon glyphicon-question-sign mr5 "></i>使用帮助 <span>GUIDE</span></h3>
                                <div className="guide-list">
                                    <p>
                                        <a href="/help.html#deposit" target="_blank" >如何存款</a>
                                        <a href="/help.html#responsibility" target="_blank" >责任条款</a>
                                        <a href="/help.html#rule" target="_blank" >游戏帮助</a>
                                    </p>
                                    <p>
                                        <a href="/help.html#myAccount" target="_blank" >隐私保护</a>
                                        <a href="/help.html#withdrawal" target="_blank" >如何提款</a>
                                        <a href="/help.html#terms" target="_blank" >规则与条款</a>
                                    </p>
                                </div>
                            </div>
                            <div id="foot_share" className="fadeInUp fl">
                                <h3 ><i className="glyphicon glyphicon-share-alt mr5"></i>社交分享 <span>SHARE</span></h3>
                                <div className="share-list">
                                    <a href="http://weibo.com/" target="_blank" className="share-weibo " title="微博"></a>
                                    <a href="http://user.qzone.qq.com/" target="_blank" className="share-qzone " title="QQ空间"></a>
                                    <a href="https://www.facebook.com/" target="_blank" className="share-fackbook " title="fackbook"></a>
                                    <a href="https://twitter.com/" target="_blank" className="share-twitter " title="twitter"></a>
                                </div>
                            </div>
                            <div className="fl footer-mobile-img fadeInUp"></div>
                        </div>
                    </div>
                </article>
                <article id="platform-inco">
                    <div className="w1000 mAuto pr">           
                        <img className="footer_bottom_img"/>           
                    </div>
                </article>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
   
    }
);

export default connect(mapStateToProps, {})(Footer)