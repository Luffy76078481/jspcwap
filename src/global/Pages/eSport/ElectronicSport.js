import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from "globalAction";
import './ElectronicSport.scss';
import {transferTip} from 'commonFunc';

class ElectronicSport extends Component {
    constructor (props){
        super(props);
        this.state = {
            selGameId:"",
            flag:true,
            gameLink:''
        }
    }
    componentDidMount(){
        if(this.props.ESGame[0]){
            if(localStorage.getItem('user')&& this.state.gameLink == ''){
                this.onClickGame(this.props.ESGame[0]);
                this.setState({
                    flag:false
                })
            }else{
                let game = this.props.ESGame[0];      
                this.getDemoApi(game)      
            }
        }else{
            this.setState({
                flag:true
            })          
        }
    }
    // 获取试玩链接
    getDemoApi(game){
        let param = {
            GamePlatform: game.GamePlatform,
            GameType: game.GameTypeText,
            IsMobile: false,
            IsDemo: false,
        }
        // 试玩链接
        new window.actions.ApiGetDemoUrl(param).fly(res=>{     
            if(res.StatusCode == 0){
                let link = res.GameDemoUrl;
                if(link){
                    this.setState({
                        gameLink:res.GameDemoUrl
                    })
                }else{
                    Swal.fire("未配置试玩链接");
                }
            }else{
                Swal.fire(res.Message);
            }
        })    
    }
    componentWillReceiveProps(nextProps){    
        // 当前页面登录       
        if(this.state.flag && nextProps.user.username==this.props.user.username){
            if(this.props.ESGame[0] && this.state.gameLink == ''){
                this.onClickGame(this.props.ESGame[0]);
                this.setState({
                    flag:false
                })      
            }
        }        
        if(nextProps.ESGame.length>0 && this.state.flag && !localStorage.getItem('user')){
            let game = nextProps.ESGame[0];   
            this.getDemoApi(game)
        }

    }
    changeState(gameLink){
        this.setState({
            gameLink:gameLink||"",
        })       
    }
    // 点击游戏
    onClickGame(game){
        if(!auth()){
            return;
        }
        let param = {
            GamePlatform: game.GamePlatform,
            GameType: game.GameTypeText,
            GameId: game.GameIdentify,
            IsMobile: false,
            IsDemo: false,
        }
        //调用公共方法，自动转账处理
        transferTip({
            param:param,
            user:this.props.user,
            changeState:this.changeState.bind(this),
        }) 
    }

    // 电竞导航
    renderEsport(){
        let ret = [];
        let _this = this;
        if(this.props.ESGame){
            ret.push(
                this.props.ESGame.map((item, index)=>{
                    var action = _this.state.selGameId==item.Id?"active":"";
                    return (
                        <a href="javascript:void(0)" key={index} className={action} onClick={this.onClickGame.bind(this, item,false)}>
                            {item.Title}
                        </a>
                    );
                })             
            )               
        }
        return ret;
    }
    active(item){
        this.state.gameType = item.id;
    }

    render(){
        return(
            <div className = "EsportBG">
                <div className='E_sport' id='Esport'>
                    {/* <GameTabs
                        data={this.props.gameLayout.eSportNav}
                        activeAllBack={this.active.bind(this)}
                        id={"eSport"}
                    /> */}
                    <div className='E_SportNav'>
                        {this.renderEsport()}
                    </div>
                    <div>
                        <iframe ref="iframeGame" src={this.state.gameLink}  width="100%" height="1000px" frameBorder="0" />
                    </div>
                </div>
            </div> 
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        ESGame:state.game.ESGame,
        platforms: state.game.platforms,
        gameLayout:state.gameLayout
    }
);

export default connect(mapStateToProps, {})(ElectronicSport);