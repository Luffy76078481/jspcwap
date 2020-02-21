import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {serversOpen} from "commonFunc"
import "./FirstPage.scss";

class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zcNum:30000 + parseInt(Math.random() * 1000),
            zcSale:150000 + parseInt(Math.random() * 5000),
            howMany:20000000 + parseInt(Math.random() * 5000000),
            timer:null,
        }
    }
    componentDidMount(){
        if(this.state.timer)clearInterval(this.state.timer)
        if(this.state.num3>100000000){
            clearInterval(this.state.timer);
            location.reload()
            return
        }         
        this.state.timer = setInterval(()=>{
            let num1 = this.state.zcNum;
            let num2 = this.state.zcSale;
            let num3 = this.state.howMany;
            num1 += parseInt( Math.random() * 5);
            num2 += parseInt( Math.random() * 500);
            num3 += parseInt( Math.random() * 50000);
            this.setState({ 
                zcNum:num1,
                zcSale:num2,
                howMany:num3
            })            
        },3000)              
    }
    componentWillUnmount(){
        clearInterval(this.state.timer)
    }
    renderFirstPage(){
        return(
            <div className='homeWrap'>
                <div className='home_box'>
                    <div className='link clearfix'>
                        <Link to="/casino">
                            <div id='f1' className='div'></div>
                        </Link>
                        <Link to="/sport">
                            <div id='f2' className='div'></div>
                        </Link>
                        <Link to="/games">
                            <div id='f3' className='div'></div>
                        </Link>
                        <Link to="/bingo">
                            <div id='f4' className='div'></div>
                        </Link>
                        <div className='content clearfix'>                 
                            <div>
                                <span>{ this.state.zcNum }</span>
                                <div className='load'></div>
                            </div>
                            <div>
                                <span>{ this.state.zcSale }</span>
                                <div className='load'></div>
                            </div>
                            <div>
                                <span>{ this.state.howMany }</span>
                            </div>                
                        </div>  
                    </div>
                    <div className='content2'>
                        <div>
                            <a className='cooperation' href="/agent.html?tab=Alliance" target="_blank"></a>
                            <Link className="custTo" to="/deposit"></Link>
                            <a className="serverTo" href='javascript:void(0);' onClick={()=>serversOpen(this.props.remoteSysConfs.online_service_link)}></a>                 
                        </div>
                        <div className='help'>
                            <a href="/agent.html?tab=AboutUs"  target="_blank">关于我们</a>
                            <a href="/agent.html?tab=ContactUs" target="_blank">联络我们</a>
                            <a href="/agent.html?tab=BetRule" target="_blank">责任博彩</a>
                            <a href="/agent.html?tab=Deposit" target="_blank">存款帮助</a>
                            <a href="/agent.html?tab=Wthdrawal" target="_blank">取款帮助</a>
                            <a href="/agent.html?tab=Faq" target="_blank">常见问题</a>
                        </div>
                    </div>
                </div>
            </div>            
        )
    }
    render() {
        const PopNews = window.r.get("NoticeBar");
        const ImageGallery = window.r.get("ImageGallery2");
        const PromotionAlert = window.r.get("FirstPagePromotionAlert")
        return (
            <div className="FirstPage">
                {PromotionAlert && <PromotionAlert/>}
                <ImageGallery height="440px" type="pc_home_images"></ImageGallery>
                <div className="noticeNew">
                    <div className="noticeCenter">
                        <span className='new_title'>最新资讯:</span>
                        <PopNews></PopNews>
                    </div>
                </div>
                {this.renderFirstPage()}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(FirstPage)