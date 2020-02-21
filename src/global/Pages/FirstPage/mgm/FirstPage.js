import React, { Component } from 'react';
import "./FirstPage.scss";
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {serversOpen} from "commonFunc"

class FirstPage extends Component {
    constructor(props) {
        super(props);
    }
    mouseOverContentgo(goto){
        switch(goto){
            case 'casinolink':
                window.$('.sportlink').css("left","667px");
                window.$('.bingolink').css("left","841px");
                break;
            case 'sportlink':
                window.$('.sportlink').css("left","176px");
                window.$('.bingolink').css("left","841px");
                break;
            case 'bingolink':
                window.$('.sportlink').css("left","176px");
                window.$('.bingolink').css("left","333px");
                break;
        }
    }
    render() {
        const FirstPagePromotionAlert = window.r.get("FirstPagePromotionAlert");
        const ImageGallery = window.r.get("ImageGallery");
        const online_service_link = this.props.remoteSysConfs.online_service_link
        return (
            <div className="mgmFirst">
                {FirstPagePromotionAlert && <FirstPagePromotionAlert/>}
                <ImageGallery height="450px"></ImageGallery>
                <div className="contentgo">
                    <div className="bigbx">
                        <Link to="/casino" >
                            <div className="linkto casinolink" onMouseOver={this.mouseOverContentgo.bind(this,"casinolink")}></div>
                        </Link>
                        <Link to="/sport" >
                        <div className="linkto sportlink" onMouseOver={this.mouseOverContentgo.bind(this,"sportlink")}></div>
                        </Link>
                        <Link to="/bingo" >
                            <div className="linkto bingolink" onMouseOver={this.mouseOverContentgo.bind(this,"bingolink")}></div>
                        </Link>
                    </div>
                </div>
                <div className="about"></div>
                <div className="content content5">
                    <div className="fromCenter center5">
                        <div className="service">
                            <ul>
                                <li>
                                    <i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;
                                    客服热线：
                                    <span>{this.props.remoteSysConfs.online_service_phone}</span>
                                </li>
                                <li>
                                    <i className="fa fa-qq" aria-hidden="true"></i>&nbsp;&nbsp;
                                    投诉与建议：
                                    <span>{this.props.remoteSysConfs.online_service_qq}</span>
                                </li>
                                <li>
                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;
                                    联系邮箱：
                                    <span>{this.props.remoteSysConfs.online_service_email}</span>
                                </li>
                                <li>
                                    <i className="fa fa-headphones" aria-hidden="true"></i>&nbsp;&nbsp;
                                    <a  href="#" style={{color:'#635846'}} onClick={()=>{serversOpen(online_service_link)}}>
                                        <span>7X24</span>
                                        小时在线客服
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        views:state.views,
        global: state.global,
        remoteSysConfs:state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {})(FirstPage);