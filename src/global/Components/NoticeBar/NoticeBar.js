
/*
    头部走马灯- update 2019/7/5
*/
import React, {Component} from 'react';
import "./NoticeBar.scss";

class PopNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages:[] // 走马内容
        };
        // 读取数据API
        new window.actions.ApiNoticeAction(props.type).fly(resp=>{
            if (resp.StatusCode === 0 && resp.NewsInfo.length > 0) {
                this.setState({messages: resp.NewsInfo});
            }
        }, "pop_news_" + props.type);
    }
    // 点击弹窗
    showNotice(){
        window.$(this.refs.popBox).addClass('popout');
    }
    // 关闭弹窗
    hidNotice(){
        window.$(this.refs.popBox).removeClass('popout');
    }
    // 弹窗内容
    renderNotice() {
        var ret = [];
        for (var i = 0; i < this.state.messages.length; i++) {
            var msg = this.state.messages[i];
            ret.push(
                <li key={i}>
                    <p className="popBox_body_date">{msg.CreateTime}</p>
                    <p className="popBox_body_title">{msg.Title}</p>
                    <p className="popBox_body_content"><span>{msg.Content.replace(/(&nbsp;|&ldquo;|&rdquo|;|\s){1}|<[^>]+>/g,"") + "  "}</span>
                    </p>
                </li>
            )
        }
        return ret;
    }
    render() {
        
        // 走马灯数据
        let marqueeCotent = () =>{
            let marqueeCotent="";
            if(this.state.messages.length>0){
                for(let i=0;i<this.state.messages.length;i++){
                    marqueeCotent+= this.state.messages[i].Content.replace(/(&nbsp;|\s){1}|<[^>]+>/g,"")+"  ";
                }
            }
            return marqueeCotent
        }
        let animaTime = this.state.messages.length>0?(marqueeCotent().length*2)/10:60;
        const NoticeBar = window.r.props('NoticeBar');
        const width = NoticeBar.width || "auto";
        return  (
            <div className={"notice-bar"} style={{"width":width}}>
                <div ref="headNotice" direction="left" className="marquee" id="NoticeList">
                    <a 
                        href="javascript:void(0);" 
                        style={{animation: 'marquee ' + animaTime + 's linear infinite'}} 
                        title="网站公告 Site Notice" 
                        onClick={this.showNotice.bind(this)} 
                        className="app_color">{marqueeCotent()}
                    </a>
                </div>
                <div ref="popBox" className="popBox">
                    <div className="popBox_title">
                        <i className="fa fa-circle-o-notch popBox_pic" aria-hidden="true"></i>网站公告
                        <i className="fa fa-times popBox_close" aria-hidden="true" onClick={this.hidNotice.bind(this)}></i>
                    </div>   
                    <div className="popBox_body">
                        <ul>
                            {this.renderNotice()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default PopNews;