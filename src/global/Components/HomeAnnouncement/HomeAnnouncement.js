
import React, {Component} from 'react';
import "./HomeAnnouncement.scss";
import {Tabs} from 'antd';
const {TabPane} = Tabs;

export default class HomeAnnouncement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promotionList:[],
            defaultActiveKey:"0",
            showAnnounce:false
        }
    }
    componentDidMount(){
        new window.actions.ApiNoticeAction("home-promotion").fly(resp=>{
            if (resp.StatusCode == 0 && resp.NewsInfo.length > 0) {
                this.setState({
                    promotionList: resp.NewsInfo,
                    showAnnounce:true
                });
            }
        }, "home-promotion");
        if(sessionStorage.getItem("homePopState")){
            this.setState({
                showAnnounce:false
            })
            return;
        }
    }
    handClickAnnounce = (key)=>{
        this.setState({
            defaultActiveKey: key + ''
          })
    }
    hidNotice(){
        this.setState({
            showAnnounce:false
        })
        sessionStorage.setItem("homePopState",true)
    }
    homeAnnouncement(){
        return(
            <div className='announceWrap'>
                <Tabs defaultActiveKey={this.state.defaultActiveKey}
                onChange={this.handClickAnnounce} tabPosition='top'>
                    {this.state.promotionList.map((item,index)=>{
                        return(
                        <TabPane tab={<TabTtile item={item} />} key={index}>
                            <a href={item.externalLink} target="blank" className='tabCot'>
                                <div style={!item.Content.includes('<img')?{'padding':"10px","backgroundColor":"#FFF"}:{"padding":0}} 
                                dangerouslySetInnerHTML={{__html: item.Content}}>
                                </div>
                            </a>
                            <div className="fa fa-times closebs" onClick={this.hidNotice.bind(this)}></div>
                        </TabPane>
                        ) 
                    })}

                </Tabs>
            </div>
        )
    }
    render(){
        if(!this.state.showAnnounce){
            return null
        }
        return(
            <div className='homeAnnouncement'>
                {this.homeAnnouncement()}  
            </div>
        )
    }
}
class TabTtile extends React.Component{
    render() {
        const {item} = this.props
        return( 
            <p className="TabTitle">{item.Title}</p>    
        )
    }
}