import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameTabs from "../../Components/gameTabs/GameTabs";
import Paging from "../../Components/paging/Paging";
import {beforeTransferTip} from 'commonFunc';
import {Spin} from 'antd';
import * as cache from "../../../store/CacheHelper";
import "./Chess1.scss";
class Chess1 extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            gameType:"",//当前游戏平台
            IntoRoomIdsVlaue:"",//房间号
        };
    }
    toPage(pageNo = 1) {
        if(this.state.gameType == ""){//这种情况应该是在棋牌页面刷新，或者异步数据尚未加载，此时直接用默认首屏数据；
            this.setState({
                loading:false
            });
            return;
        }
        this.setState({
            loading:true
        });
        new window.actions.PageNavAction(this.state.gameType,"chessGame",pageNo).fly(resp=>{
            if(resp.StatusCode ==0){
                this.setState({
                    loading:false,
                })
            }
        });
    }
    gameList(){
        if(!!!this.props.gameLayout.chessGame.Games)return
        if(this.state.gameType == ""){
            this.state.gameType =this.props.gameLayout.chessGame.Tag
        }
        let gameData = [];
        for(let i=0;i<this.props.gameLayout.chessGame.Games.length;i++){
            var g = this.props.gameLayout.chessGame.Games[i];
            gameData.push(
                <a 
                    key ={i} 
                    target={this.props.user.token&&g.GameIdentify.indexOf("2$X")==-1?"_blank":""} 
                    href={this.props.user.token&&g.GameIdentify.indexOf("2$X")==-1?'/games.html':'javascript:void(0)'} 
                    onClick={g.GameIdentify&&g.GameIdentify.indexOf("2$X")!=-1?
                    this.onClickIntoRoom.bind(this, g):this.onClickGame.bind(this,g)}

                    >         
                    <img className="game_img" src={window.config.prdImgUrl+g.ImageUrl}/>
                    <div className="game_title">{g.Title}</div>             
                </a>
            )
        }
        return gameData;
    } 
    // 进入房间
    onClickIntoRoom(game){
        if (!window.actions.auth()) {
            return;
        }
        window.$("#ChessIntoRoom").modal("show");
        this.setState({
            intoGamePlatform:game.GamePlatform,
            intoGameTypeText:game.GameTypeText
        })
    }
    // 关闭加入房间
    close(){
        this.setState({
            errorPassword:false
        })
    }
    handleChange(e){
        this.setState({
            IntoRoomIdsVlaue:e.target.value,
        })        
    }
    // 进入房间api
    onClickIntoRoomId(){
        if(this.state.IntoRoomIdsVlaue==""){
            window.swal({
                title: "请填写房间号",
                text: "",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return false;
        }else if(this.state.IntoRoomIdsVlaue.length<6){
            window.swal({
                title: "房间号不能小于6位",
                text: "",
                type: "warning",
                confirmButtonColor: "#c5841f",
                confirmButtonText: "OK",
            });
            return false;
        }
        let param = {
            GamePlatform:this.state.intoGamePlatform,
            GameType:this.state.intoGameTypeText,
            GameIdentify:"2$"+this.state.IntoRoomIdsVlaue,
            YoPlay: 1
        }
        if(this.props.user.token){
            cache.setSession("GameParam",JSON.stringify(param))            
            return
        }
    }
    // 开始游戏
    onClickGame(game) {           
        if (!window.actions.auth()){return;}
        Object.assign(game,{YoPlay:1})
        cache.setSession("GameParam",JSON.stringify(game))                       
    }
    // 请求API
    active(item){
        this.state.gameType = item.id;
        this.toPage(1)
    }
    render(){
        return (
            <div className="Chess1">
                <GameTabs
                    data={this.props.gameLayout.chessNav}
                    activeAllBack={this.active.bind(this)}
                    id={"chessNav"}
                />
                {
                    this.state.loading?
                    <div className="loading-container" style={{"textAlign":"center"}}>
                        <Spin wrapperClassName="loadText" tip="拼命加载中..."/>
                    </div>
                    :
                    <ul className="chess1GameBox">
                        {this.gameList()}
                    </ul>
                }
                <Paging
                    toPage={this.toPage.bind(this)}
                    pageNo={Math.ceil(this.props.gameLayout.chessGame.GamesTotal/this.props.gameLayout.chessGame.FirstScreenGames)}
                    gameType={this.state.gameType}
                />
                
            )
            {/* 进入房间弹窗 */}
            <div ref="dlg" id="ChessIntoRoom" className="modal fade" role="dialog">
                <div className="modal-dialog login">
                    <div className="modal-content custom_modal_content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" onClick={()=>{this.close()}}><i className="fa fa-times"></i></button>
                            <h4 className="modal-title">加入房间</h4>
                        </div>
                        <div className="modal-body fast_booking_content">
                            <div className="row">
                                <div className="col-xs-12 col-md-12">
                                    <input type="number" maxLength="6" onChange={e=>{this.handleChange(e)}} placeholder="请输入6位房间密码"/>
                                </div>
                                <div className="col-xs-6 col-md-6">
                                    <a className='intoGameButton' 
                                    onClick={this.onClickIntoRoomId.bind(this)}
                                    target={this.state.IntoRoomIdsVlaue.length==6?"_blank":""} 
                                    href={this.state.IntoRoomIdsVlaue.length==6?'/games.html':'javascript:void(0)'} >确定</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>               
        </div>
        );
    }


}

const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs,
        gameLayout:state.gameLayout,
        user: state.user,
        gameType:state.gameTabs
    }
);

export default connect(mapStateToProps)(Chess1)
