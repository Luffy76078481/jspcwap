import React, { Component } from 'react';
import * as cache from "../../../store/CacheHelper";
import {ApiGetLoginUrl} from "globalAction"
import "./gameTransfer.scss"
// import { browserHistory } from 'react-router'
//import { ContentSelectAll } from 'material-ui/svg-icons';

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param_game:{},
            param_user:{},
        }
    }
    componentDidMount(){
        const game = cache.getSession('GameParam');//游戏数据，用于获取游戏链接或余额
        const user = cache.get('user');// 用户信息  
        this.setState({
            param_game:Object.assign(this.state.param_game,game),
            param_user:Object.assign(this.state.param_user,user)
        })
        setTimeout(()=>{
            this.transferTip()            
        },100)  
       
    }
    closeWindow(){
        setTimeout(()=>{
            window.close()
        },500)
    }
    transferTip(){
        const user = this.state.param_user; // 用户信息
        const _totalAmount = parseInt(user.userBalance)
        const _autoTransfer = user.AutoTransfer; //是否自动转账: 0 -false; 1- true
        if(_totalAmount>1){
            if(_autoTransfer){
                this.enterGame(true);
            }else{
                window.Swal({
                    title: `是否需要余额自动转入到该平台?`,
                    type: "warning",
                    showCloseButton: true,
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonColor: "#c5841f",
                    cancelButtonColor: "#c5841f",
                    confirmButtonText: "自动转入",
                    cancelButtonText: "直接进入",
                }).then((isConfirm) => {
                    try {
                        //点击自动转入
                        if (isConfirm.value) { 
                            Swal.close();
                            this.enterGame(true);  
                        }
                        //点击取消按钮
                        else {      
                            if(isConfirm.dismiss === 'overlay' || isConfirm.dismiss === 'close' || isConfirm.dismiss === 'esc'){
                                Swal.close();
                                this.closeWindow()                              
                            }else{
                                this.enterGame(false); 
                            }                                      
                        }
                    }catch (e){
                        alert(e);
                    }
                });                
            }
        }else{
            window.Swal({
                title: `您的总财富不足1元，是否充值？`,
                type: "warning",
                showCloseButton: true,
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonColor: "#c5841f",
                cancelButtonColor: "#c5841f",
                confirmButtonText: "返回充值",
                cancelButtonText: "直接进入",
            }).then((isConfirm) => {
                try { 
                    //点击的充值，取消，X，ESC按钮
                    if (isConfirm.value || isConfirm.dismiss === 'overlay' || isConfirm.dismiss === 'close' || isConfirm.dismiss === 'esc') { 
                        Swal.close();
                        this.closeWindow()
                    }
                    //点击取消按钮
                    else {                            
                        this.enterGame(false);                     
                    }
                }catch(e){
                    alert(e);
                }
            });              
        }
    }
    enterGame(TransferFlag){
        const game = this.state.param_game;
        let GamePlatform = game.GamePlatform ? game.GamePlatform : game.PlatformId;
        const param = {
            GamePlatform: GamePlatform,
            GameType: game.GameTypeText || game.GameType,
            GameId: game.GameIdentify || "",
            IsMobile: false,
            IsDemo: false,
        } 
        if(game.YoPlay){
            Object.assign(param,{YoPlay:1})
        }
        new ApiGetLoginUrl(param,'WEB',TransferFlag).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                if(gameLink){
                    location.href = gameLink;
                }else{
                    Swal.fire("游戏加载失败....")
                    setTimeout(()=>{
                        this.closeWindow()
                    },1500)
                }
            }else{
                Swal.fire(res.Message)
            }
        })
    }
    render(){
        return(
            <div className='text-center'>loading...</div>
        )
    }
}