import React, { Component } from 'react';
import {NavBar, Icon} from 'antd-mobile';
import {browserHistory} from 'react-router';
import connect from "react-redux/es/connect/connect";
import './MyMessage.scss';
const clearHtml = function (html) {//清楚html中的style
      var rel = /style\s*?=\s*?([‘"])[\s\S]*?\1/g;
      var newHtml = ''
      if (html) {
          newHtml = html.replace(rel, '')
        }
      return newHtml;
}
class ReadMessage extends Component{
    constructor(props) {
        super(props);
        this.state={
            type:this.props.routeParams.messageType,//如果type为0:活动推广1:平台消息2:站内信
            id :this.props.routeParams.messageId,
            from : this.props.routeParams.fromUrl
        }
    }

    renderMessage(){
        let id = this.state.id;
        let con=[];
        if(this.state.type == "0"){
            this.props.promotions.forEach((item,index)=>{
                if(item.Id ==id ){
                    con.push(
                        <div key={index} dangerouslySetInnerHTML={{__html:clearHtml(item.Content)}}></div>
                    )
                    return false;
                }
            })
        }else if(this.state.type == "1"){
            this.props.notices.forEach((item,index)=>{
                if(item.Id ==id ){
                    con.push(
                        <div  className="read" key={index}>
                            <p>{item.Content}</p>
                            <div className="bot">
                                <span>平台公告</span>
                                <span className="time">{item.CreateTime.replace('T',' ')}</span>
                            </div>
                        </div>
                    )
                    return false;
                }
            })
        }else if(this.state.type=="2"){
            this.props.allSitemsgs.forEach((item,index)=>{
                if(item.Id ==id ){
                    con.push(
                        <div className="read" key={index}>
                            <p>{item.Message}</p>
                            <div className="bot">
                                <span>站内信</span>
                                <span className="time">{item.SendTime.replace('T',' ')}</span>
                            </div>
                        </div>
                    )
                    return false;
                }
            })
        }
        return con;
    }
    render(){
        const con = this.renderMessage();
        let name;
        if(this.state.type==0){
            name="活动推广"
        }else if(this.state.type==1){
            name="平台消息"
        }else{
            name="站内信"
        }
        return(
            <div className="ReadMessage">
                <NavBar
                    style={{zIndex:2}}
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>{window.wapHistoryType.goBack();}}
                >{name}</NavBar>
                <div className="messageCon scroll-content">
                    {con}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        notices:state.notices,
        allSitemsgs:state.sitemsg.allSitemsgs,
        promotions:state.promotions.promotions.rows
    }
);

export default connect(mapStateToProps)(ReadMessage)