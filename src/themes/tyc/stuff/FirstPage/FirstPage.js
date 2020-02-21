import React, { Component } from 'react';
import {Link,browserHistory} from 'react-router';

import { connect } from 'react-redux';
import "./FirstPage.scss";
import puyu from './images/puyu.gif';
import AG1 from './images/AG1.png';
import AG2 from './images/AG2.png';
import AG3 from './images/AG3.png';
import AG4 from './images/AG4.png';
import AG5 from './images/AG5.png';
import tiyu from './images/0126.jpg';
import tgpbanner9 from './images/tmqipai.jpg';
let casinoOwl,casinoOwlIndex=0;
let newCasinos=[];
class FirstPage extends Component {
    constructor(props) {
        super(props);
    }
    initAll(){
        let _this = this;
        casinoOwl=null;
        casinoOwlIndex=0;
        casinoOwl = window.renderOwl(".sliderBox",{
            loop: true,
            autoplay: true,
            items: 1,
            nav: false,
            autoplayHoverPause: true,
            dots:true,
        });
        if(casinoOwl){
            casinoOwl.off('change.owl.carousel').on('change.owl.carousel', function(e) {
                if(casinoOwlIndex == newCasinos.length-1){
                     casinoOwlIndex=0;
                }else{
                    casinoOwlIndex++;
                }
                $(".sliderLi li").removeClass('active');
                $(".sliderLi li:eq("+casinoOwlIndex+")").addClass('active');
            })
        }
        window.renderOwl(".stretch",{
            loop: true,
            autoplay: true,
            items: 1,
            autoplayHoverPause: true,
            dots:true,
        })
    }
    componentDidMount() {
        this.initAll();
        document.title = "澳门永利娱乐城";
    }
    componentWillUnmount(){
        if(casinoOwl){
            casinoOwl.trigger('destroy.owl.carousel');
        }
        casinoOwlIndex=0;
    }
    componentDidUpdate() {
        this.initAll();
    }


    serversOpen(e){
        e.preventDefault();
        window.open(this.props.remoteSysConfs.online_service_link,'servers','width=900,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=450,screenY=250');
        return false;
    }


    onClickGame(game) {
        if (!window.actions.auth()) {
            return;
        }
        let GameType = '';
        if(game.PlatformId=="MG2"){
            GameType = 'casino'
        }else{
            GameType = 'Trueman'
        }
        let parma = {
            GamePlatform:game.PlatformId,
            GameType:GameType,//Trueman
            IsMobile:false,
            IsDemo:false,
        }
        let windowOpen = window.Util.windowOpen("Casino");
        new window.actions.ApiGetLoginUrl(parma).fly(res=>{
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                windowOpen.location.href= gameLink;
            }else{
                windowOpen.urlError(res.Message);
            }
        })
    }
    casinoTabs(index,e){
        $(e.target).siblings('li').removeClass('active');
        $(e.target).addClass('active');
        casinoOwlIndex=index-1;
        casinoOwl.trigger('to.owl.carousel',[index])
    }
    renderTabsCons(){
        let liItems =[];
        let imgItems=[];
        newCasinos=[];
        for (var i = 0; i < this.props.casinos.length; i++) {
            var item = this.props.casinos[i];
            if(item.PlatformId !="OPUS2") {//应sky要求去掉印尼厅
                newCasinos.push(item);
            }
        }
        for (var i = 0; i < newCasinos.length; i++) {//因为这个轮播需要数组的序号 而原来的数组中去掉了一个平台 所以又新建了一个数组用来循环
            var item = newCasinos[i];
            liItems.push(<li key={i}  className={i==0?"active":""}  onClick={this.casinoTabs.bind(this,i)}  id={i}>{item.PlatformId}<span></span></li>);
            imgItems.push(<div key={i} className={"imgSpan "+item.PlatformId} data-index={i} onClick={this.onClickGame.bind(this,item)}></div>)
        }
        return(
            <div className="tabsCon">
                <ol className="sliderLi">
                    {liItems}
                </ol>
                <div className="sliderBox">
                    {imgItems}
                </div>
            </div>
        )
    }
    render() {
        const ImageGallery = window.r.get("ImageGallery");
        const tabsCons = this.renderTabsCons();
        const HijackAlert = window.r.get("hijackAlert");
        const HomeAnnouncement = window.r.get('HomeAnnouncement')
        return (
            <div className="firstPage">
                <div className='con'>
                    <div className="leftCon">
                        {HijackAlert && <HijackAlert/>}
                        {<HomeAnnouncement/>}
                        <ImageGallery height="465px" imgtype='slider'></ImageGallery>
                        <div className="pic" >
                            <div className="pic-all">
                                <div className="pic-l">
                                    <div className="ng-scope">
                                        <Link to="/fish" >
                                            <img className="sssv28-carousel-inner sssv28-carousel-inner-leftimage"
                                                 src={puyu} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="pic-r">
                                    <div className="ng-scope" style={{width:'383px'}}>
                                        <div className="e-game-title">
                                            <h5>AG老虎机</h5>
                                        </div>
                                        <div className="stretch">
                                            <div className="item">
                                                <Link to="/games" >
                                                    <img src={AG1} />
                                                </Link>
                                            </div>
                                            <div className="item">
                                                <Link to="/games" >
                                                    <img src={AG2} />
                                                </Link>
                                            </div>
                                            <div className="item">
                                                <Link to="/games" >
                                                    <img src={AG3} />
                                                </Link>
                                            </div>
                                            <div className="item">
                                                <Link to="/games" >
                                                    <img src={AG4} />
                                                </Link>
                                            </div>
                                            <div className="item">
                                                <Link to="/games" >
                                                    <img src={AG5} />
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rightCon">
                        <div style={{paddingBottom:'10px'}}>
                            <Link to="/sport" >
                                <img src={tiyu} className="img-responsive" />
                            </Link>
                            <Link to="/streetMachine"  className="sssv28-promo--new-player-bonus">
                                <img src={tgpbanner9} />
                            </Link>
                        </div>
                        {tabsCons}

                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        views:state.views,
        global: state.global,
        bestGames: state.game.bestGames,
        casinos:state.views.casinos,
        remoteSysConfs:state.remoteSysConfs,
    }
);

export default connect(mapStateToProps)(FirstPage)