
// 前端布局真人页面。
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './css/CasinoGame.scss';

class CasinoPage extends Component {
    onClickCasino(val){
        if (!window.actions.auth()){return;}       
        let param = val;
        Object.assign(param,{GameType:val.PlatformId=="MG2"?'casino':'Trueman'})
        cache.setSession("GameParam",JSON.stringify(param))            
        return       
    }
    // 渲染真人列表
    renderCasino(){
        let casinoDom = [];
        for (var i = 0; i <  this.props.casinos.length; i++) {
            let casinoGame = this.props.casinos[i];
            casinoDom.push(
                <a 
                key={i+'casino'} 
                className='casino_game fadeInUp animated pointer'
                target={this.props.user.token?"_blank":""} 
                href={this.props.user.token?'/games.html':'javascript:void(0)'} 
                onClick={this.onClickCasino.bind(this,casinoGame)}
                >
                    {
                        casinoGame.ImageUrl&&
                        <div className='bigPic'style={{background:"url("+ window.config.prdImgUrl + casinoGame.ImageUrl + ") no-repeat center"}}></div>
                    }               
                    <span className='titleSpan'>{casinoGame.Title}</span>                
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
const mapStateToProps = (state, ownProps) => (
    {
        casinos:state.views.casinos,
        user : state.user,
    }
);

export default connect(mapStateToProps, {})(CasinoPage);