
import React, {Component} from 'react';
export default class CasinoPage extends Component {
    onClickGameLink(val){
        if (!window.actions.auth()){return;}
        let param = val;
        Object.assign(param,{GameType:val.PlatformId=="MG2"?'casino':'Trueman'})
        cache.setSession("GameParam",JSON.stringify(param))            
        return   
        // let parma = {
        //     GamePlatform:game.GamePlatform,
        //     GameType:game.GameTypeText,
        //     IsMobile:false,
        //     IsDemo:false,
        // }
        // let windowOpen = window.Util.windowOpen("Casino");
        // new window.actions.ApiGetLoginUrl(parma).fly(res=>{
        //     if(res.StatusCode == 0){
        //         let gameLink = res.GameLoginUrl;
        //         windowOpen.location.href= gameLink;
        //     }else{
        //         windowOpen.urlError(res.Message);
        //     }
        // })
    }
    // 渲染真人列表
    renderCasino(){
        let casinoDom = [];
        for(let i=0;i<this.props.gameLayout.casinoGame.length;i++){
            let casinoGame = this.props.gameLayout.casinoGame[i]
            casinoDom.push(
                <a key={i+'casino'} 
                    className='casino_game fadeInUp animated pointer'
                    onClick={this.onClickGameLink.bind(this,casinoGame.Games[0])}
                    target={this.props.user.token?"_blank":""} 
                    href={this.props.user.token?'/games.html':'javascript:void(0)'}                 
                 >
                    {
                        // 背景图
                        casinoGame.BigPictureUrl &&
                        <div className='bigPic'style={{background:"url("+ window.config.prdImgUrl + casinoGame.BigPictureUrl + ") no-repeat 0 0"}}></div>
                    }
                    {
                        // 字体图
                        casinoGame.MinPictureUrl?
                        <a className='minPic' target="_blank" href="javascript:void(0)" style={{background:"url("+ window.config.prdImgUrl + casinoGame.MinPictureUrl + ") no-repeat center"}}></a>
                        :
                        <span className='titleSpan'>{casinoGame.SubTitle||casinoGame.Title}</span>
                    }
                </a>
            )
        }
        return casinoDom;
    }
    render() {
        return (
            <article className="newCasinoPage pr">
                <div className='casinoWrap pr mAuto'>
                    <div className='casinoBg'>
                        {
                            this.renderCasino()
                        }
                        <div className='clear'></div>
                    </div>
                </div>
            </article>
        )
    }
}
