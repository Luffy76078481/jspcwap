import React, { Component } from 'react';
import { connect } from 'react-redux';
import {transferTip} from 'commonFunc';
import {auth} from "globalAction";
import * as cache from "../../../store/CacheHelper";
import "./sport.scss";

class Sport extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading:false,
            lockTryPlay:true,
            intoGameLock:true,
            gameUrl:"",
            MaintainMessage:"",
            frameWidth:1200, // 默认Frame宽度
            nowClickGame:""
        };
    }
    /*
        体育页面的业务逻辑_____________
        1、未登录时，当前页面刷新。需要获取返回游戏的第一个游戏（当游戏导航返回时，回调中发API获取试玩链接）
        2、未登录时，其他页面跳入当前页。
        3、登录时刷新本页，默认点击第一个游戏
        4、登录时，其他页面跳入本页，默认点击第一个游戏
    
    */
    componentDidMount(){
        if(this.props.sportGames.length>0 && !cache.get('user')){
            this.setState({
                lockTryPlay:false,
            })
            let game = this.props.sportGames[0];
            let param = {
                GamePlatform: game.GamePlatform,
                GameType: game.GameTypeText,
                GameId: game.GameIdentify,
                IsMobile: false,
                IsDemo: false,
            }
            // 试玩链接
            new window.actions.ApiGetDemoUrl(param).fly(res=>{        
                if(res.StatusCode == 0){
                    return
                }else{
                    Swal.fire(res.Message);
                    this.setState({
                        lockTryPlay:true,
                    })
                }
            })               
        }
        if(this.props.sportGames.length>0 && cache.get('user')){
            this.setState({
                intoGameLock:false
            })
            this.changeTab(this.props.sportGames[0]);
        }
    }
    componentWillReceiveProps(nextProps){
        if(cache.get('user')){
            if(nextProps.sportGames.length>0 && this.state.intoGameLock){
                this.state.intoGameLock = false;
                this.changeTab(nextProps.sportGames[0])
                this.setState({
                    intoGameLock:false
                })
            }
        }else{
            if(nextProps.sportGames.length>0 && this.state.lockTryPlay){
                this.state.lockTryPlay = false;
                let game = nextProps.sportGames[0];
                let param = {
                    GamePlatform: game.GamePlatform,
                    GameType: game.GameTypeText,
                    GameId: game.GameIdentify,
                    IsMobile: false,
                    IsDemo: false,
                }
                // 试玩链接
                new window.actions.ApiGetDemoUrl(param).fly(res=>{
                    if(res.StatusCode == 0){
                        this.setState({
                            lockTryPlay:false
                        })
                    }else{
                        Swal.fire(res.Message)
                        this.setState({
                            lockTryPlay:true
                        })
                    }
                })               
            }
        } 
    }
    // 切换游戏w
    changeTab(game){
        if(this.state.isLoading)return;// 加载中，防止连续点击。
        if(!auth())return;// 未登录    
        if(game.Maintained){
            this.setState({
                MaintainMessage:game.MaintainMessage || "维护中..."
            })
            return
        }else{
            this.setState({
                MaintainMessage:"",
                isLoading:true,
            })
        }
        this.setState({
            nowClickGame:game.GamePlatform
        })
        let param = {
            GamePlatform: game.GamePlatform,
            GameType: game.GameTypeText,
            GameId: game.GameIdentify,
            IsMobile: false,
            IsDemo: false,
        }
        // 调用公共方法，自动转账处理
        transferTip({
            param:param,
            user:this.props.user,
            changeState:this.changeState.bind(this),
        })
    }
    changeState(link){
        this.setState({
            isLoading:false,
            gameUrl:link?link:""
        },()=>{
            if(this.state.nowClickGame.includes("BTI")||this.state.nowClickGame.includes("IBOSPORTS")){
                this.setState({
                    frameWidth:1400
                })
            }else if(this.state.nowClickGame.includes("188")||this.state.nowClickGame.includes("SBO")){
                this.setState({
                    frameWidth:1050
                })
            }else if(this.state.nowClickGame.includes('BBIN')){
                this.setState({
                    frameWidth:1300
                })
            }
        })
    }
    render(){
        let sportGames = [];  
        for(let i = 0; i< this.props.sportGames.length; i++){
            let sports = this.props.sportGames[i]
            if(!this.props.user.username){
                if(!sports.GamePlatform.includes('188')){
                    sportGames.push(sports);
                }
            }else{
                sportGames.push(sports);
            }
        }
        return(
            <div className='newSportPage'>
                <div className='sportContaier' style={{"width":(this.state.frameWidth+250)+"px"}}>               
                    <div className='sportNav'>
                        {
                            sportGames.map( (data,index)=>{
                                return (
                                    <a href="javascript:void(0)" key={index} onClick={this.changeTab.bind(this,data)}>
                                        <img src={config.prdImgUrl + data.ImageUrl}/>
                                    </a>
                                );
                            })
                        }
                    </div>
                    <div className='sportWrap' style={{"width":(this.state.frameWidth)+"px" }}>
                        {
                            this.state.MaintainMessage?
                            <p className='Maintain text-center'>{this.state.MaintainMessage}</p>:
                            (
                                this.state.gameUrl?<iframe ref="iframeGame" src={this.state.gameUrl} width="100%" height="1000px" frameBorder="0" />   
                                :<iframe ref="iframeGame" src={this.props.sportTryPlayLink} width="100%" height="1000px" frameBorder="0" />                                      
                            )                
                        }
                    </div>
                </div>
            </div>            
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs,
        sportGames:state.game.sportGames,
        gameLayout:state.gameLayout,
        user: state.user,
        sportTryPlayLink:state.sportTryPlayLink,
    }
);

export default connect(mapStateToProps)(Sport)