import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from "globalAction";
import {Spin} from 'antd';
import GameTabs from "../../Components/gameTabs/GameTabs";
import './bingo.scss';

class BingoPage extends Component {
    constructor (props){
        super(props);
        this.state = {
            loading:false,
        }
    }
    onClickTCGame = (game) => {
        if (!auth()) {return;}
        // 判断是否登录
        if(this.props.user.token){
            cache.setSession("GameParam",JSON.stringify(game))            
            return
        }
    }
    active(item){
        this.state.gameType = item.id;
        this.toPage();
    }
    toPage() {
        if(this.state.gameType == ""){//这种情况应该是在棋牌页面刷新，或者异步数据尚未加载，此时直接用默认首屏数据；
            this.setState({
                loading:false
            });
            return;
        }
        this.setState({
            loading:true
        });
        new window.actions.PageNavAction(this.state.gameType,"bingoGame").fly(resp=>{
            this.setState({
                loading:false
            });
        });
    }
    gameList(){
        if(!!!this.props.gameLayout.bingoGame)return
        if(this.state.gameType == ""){
            this.state.gameType =this.props.gameLayout.bingoGame.Tag
        }
        return <Platform  
        user={this.props.user}
        Title={this.props.gameLayout.bingoGame.Title}  
        lotterys={this.props.gameLayout.bingoGame.Games} 
        onClickTCGame={this.onClickTCGame} />;
    }
    render() {
        return (
            <article id="bingo" className=" BGcolor-main">
                <div className="banner">
                    <div className="HeaderBanner">
                        <div id="AnimationContainer">
                            <div className="AnimatedImage" id="AnimatedImage1"></div>
                            <div className="AnimatedImage" id="AnimatedImage2"></div>
                            <div className="AnimatedImage" id="AnimatedImage3"></div>
                        </div>
                        <div id="BannerItemInnerContainer">
                            <div className="BingoHeaderBannerItem"></div>
                        </div>
                        <div className="tabbox">
                            <GameTabs
                                data={this.props.gameLayout.bingoNav}
                                activeAllBack={this.active.bind(this)}
                                id={"bingoNav"}
                            />
                        </div>
                       
                    </div>
                </div>
                {
                    this.state.loading?
                    <div className="loading-container" style={{"textAlign":"center","minHeight":"200px","lineHeight":"200px"}}>
                        <Spin wrapperClassName="loadText" tip="拼命加载中..."/>
                    </div>
                    :
                    this.gameList()
                }
            </article>
        )
    }
}

class Platform extends Component { //平台,比如FC/CG
    render(){
        const {Title,lotterys,onClickTCGame,user} = this.props;  
        return (
            <div className="bingo-fname">
                <div className="container">
                    <div className="row bingo-platform-list">
                        {lotterys &&
                            lotterys.map((val,i)=>{
                                return(
                                    <LotteryItem 
                                        key={val.Id} 
                                        item={val}
                                        // GamePlatform={item.GamePlatform} 
                                        onClickTCGame={onClickTCGame} 
                                        user={user}
                                        iconUrl={val.ImageUrl} 
                                        lotteryName={val.Title} />                                    
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class LotteryItem extends Component { //单个的彩种:比如重庆时时彩,PK拾
    render(){
        const {item,onClickTCGame,iconUrl,lotteryName,user} = this.props;
        return (
            <div className="wow fadeInUp animated" style={{visibility: "visible", animationName: "fadeInUp"}}>
                <a 
                target={user.token?"_blank":""} 
                href={user.token?'/games.html':'javascript:void(0)'} 
                onClick={()=>onClickTCGame(item)} 
                >
                    <span className="bingo-platform-img"><img src={window.config.prdImgUrl+iconUrl} /></span>
                </a>
                <span className="bottomBg"></span>
                <span className="color-third">{lotteryName}</span>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user: state.user,
        platforms: state.game.platforms,
        gameLayout:state.gameLayout,
    }
);

export default connect(mapStateToProps, {})(BingoPage);