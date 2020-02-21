/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                游戏内页-业务逻辑难度为：★★★
          
*/


import React, { Component } from 'react';
import {ListView, NavBar, Icon, SearchBar, Flex, Modal, Toast,Button } from 'antd-mobile';
import {config} from "globalConfig";
import {wapAuth} from 'globalAction';
import connect from "react-redux/es/connect/connect";
import './AllGamePage.scss'

let pageIndex = 1;
let filter={};
let listData=[];
let handleGame;
class AllGamePage extends Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
              rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            hasMore:false,
            tabsId:"",
            tabLoading:true,
            isLoading: true,
            depositModalShow:false,//是否显示充值弹出层
            transferModalShow:false,//是否显示转入弹出层
            IntoRoomShow:false,//是否显示加入房间，棋牌专用
            IntoRoomGamePlatform:"",
            IntoRoomGameTypeText:""
        };
    }

    componentWillMount(){
        if(this.props.routeParams.PlatformIds){
            if(this.props.slot_category.length>0){
                for (var i=0;i<this.props.slot_category.length;i++){
                    this.props.slot_category[i].PlatformIds=this.props.routeParams.PlatformIds;
                    this.props.slot_category[i].GameType=this.props.routeParams.GameType;
                }
                this.tabsChange(this.props.slot_category[0]);
            }else{
                new window.actions.ApiWapGameCategoriesAction('slot_category').fly( );
            }
        }else{
            if(this.props.mobileHomeMore.length>0){
                this.tabsChange(this.props.mobileHomeMore[0]);
            }else{
                new window.actions.ApiWapGameCategoriesAction('mobile_home_more').fly();
            }

        }
    }
    
    componentWillReceiveProps (nextProps){
        if(this.props.routeParams.PlatformIds){
            if(this.props.slot_category.length !== nextProps.slot_category.length){
                for (var i=0;i<nextProps.slot_category.length;i++){
                    nextProps.slot_category[i].PlatformIds=this.props.routeParams.PlatformIds;
                    nextProps.slot_category[i].GameType=this.props.routeParams.GameType;
                }
                if(nextProps.slot_category[0]){
                    this.tabsChange(nextProps.slot_category[0]);
                }
            }else{
                this.setState({
                    tabLoading:false
                })
            }
        }else{
            if(this.props.mobileHomeMore.length !== nextProps.mobileHomeMore.length){
                if(nextProps.mobileHomeMore[0]){
                    this.tabsChange(nextProps.mobileHomeMore[0]);
                }
            }else{
                this.setState({
                    tabLoading:false
                })
            }
        }
    }

    onEndReached = () => {
        if (!this.state.isLoading && !this.state.hasMore) {
            return false;
        }
       this.setState({ isLoading: true });
       this.getList(false);
    };

    getList(flag){
        let gameName = this.refs.SearchBar?this.refs.SearchBar.state.value.replaceAll(' ','') : "";
        if(flag){   //flag判断是否是搜索框
            Toast.loading('数据搜索中...',300);
            filter.GameName = gameName;
            listData=[];
            pageIndex = 1;
        }
        new window.actions.ApiQueryGamesAction(filter,pageIndex,30).fly(resp=>{
            Toast.hide();
            console.log('resp: ',resp);
            if(resp.StatusCode ==0){
                pageIndex++;
                listData=listData.concat(resp.Page);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(listData),
                    hasMore: resp.TotalPages >= pageIndex,
                    isLoading: false,
                    tabLoading: false
                })
            }
        })
        filter.GameName = ""
    }

    tabsChange(item){
        if(item.ID === this.state.tabsId) return;
        listData=[];
        pageIndex = 1;
        this.setState({
            tabsId: item.ID,
            tabLoading: true,
        });
        filter.GameMarks = item.MarkIds;
        filter.GamePlatform = item.PlatformIds;
        filter.Jackpot = item.Jackpot;
        filter.GameType =item.GameType?item.GameType:"";
        if(item.ID == "YOPLAY"){
            filter.GameMarks = "";
            filter.GamePlatform = "";
            filter.GameType =4;
            filter.YoPlay =1;
        }else if(item.ID=="more_all"){
            filter.YoPlay ="";
        }
        filter.TerminalType="Mobile";
        this.getList(false);
    }

    renderTabs(){
        let tabs=[];
        let _this = this;
        if(this.props.routeParams.PlatformIds){
            this.props.slot_category.forEach((item,index)=>{
                let className ="tabsCate";
                if(index==0 && !_this.state.tabsId){
                    className="tabsCate active";

                }else{
                    className = _this.state.tabsId==item.ID?"tabsCate active":"tabsCate"
                }

                tabs.push(
                    <a key={index} className={className} onClick={this.tabsChange.bind(this,item)}>
                        {item.Name}
                    </a>
                )
            })
        }else{
            this.props.mobileHomeMore.forEach((item,index)=>{
                let className ="tabsCate";
                if(index==0 && !_this.state.tabsId){
                    className="tabsCate active";

                }else{
                    className = _this.state.tabsId==item.ID?"tabsCate active":"tabsCate"
                }
                tabs.push(
                    <a key={index} className={className} onClick={this.tabsChange.bind(this,item)}>
                        {item.Name}
                    </a>
                )
            })
        }
        return tabs;
    }

    playGame(game){
        event.preventDefault();
        event.stopPropagation();
        if(!wapAuth(true)) return false;
        let _this = this;
        let currentBalance=0;
        let totalAmount = parseInt(this.props.user.amount)> 1 ? parseInt(this.props.user.amount):0;

        for (var i =0;i<this.props.platforms.length;i++){
            let _thisBalance = this.props.platforms[i].Balance? parseInt(this.props.platforms[i].Balance):0;
            totalAmount+=_thisBalance;
            if(this.props.platforms[i].ID ==game.GamePlatform){
                currentBalance=_thisBalance;
            }
        }
        handleGame=game;
        // if(totalAmount<1 ){
        //     this.setState({
        //         depositModalShow:true
        //     })
        // }
        if (this.props.user.AutoTransfer) {
            _this.getGameUrl(handleGame, true);
        } else {
            _this.getGameUrl(game);
        }
        // if(currentBalance<1){
        //     if(this.props.user.AutoTransfer){
        //         _this.getGameUrl(handleGame,true);
        //     }else{
        //         this.setState({
        //             transferModalShow:true
        //         })
        //     }
        // }else{
        //     _this.getGameUrl(game)
        // }
    }

    getGameUrl(game,TransferFlag=false){
        let parma = {
            GamePlatform:game.GamePlatform,
            GameType:game.GameTypeText,
            GameId:game.GameIdentify,
            IsMobile:true,
            IsDemo:false,
        }
        Toast.loading('游戏地址获取中...',300);
        let windowOpen;
        if(!config.isApp){
            windowOpen = window.Util.windowOpen('Game');
        }
        new window.actions.ApiGetLoginUrl(parma,'(mobile)',TransferFlag).fly(res=>{
            Toast.hide();
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                if(TransferFlag){
                    new window.actions.ApiPlayerInfoAction().fly();
                    new window.actions.ApiGamePlatformAllBalanceAction().fly();
                }
                if(!config.isApp){
                    windowOpen.location.href= gameLink;
                }else{
                    window.Util.appOpen(gameLink)
                }
            }
            else{
                if(!config.isApp){
                    windowOpen.urlError(res.Message);
                }else{
                    Modal.alert(res.Message)
                }
            }
        })
    }

    IntoRoom(game){
        if(!wapAuth(true)) return false;
       this.setState({
        IntoRoomShow:true,
        IntoRoomGamePlatform:game.GamePlatform,
        IntoRoomGameTypeText:game.GameTypeText
       })
    }

    IntoRoomCancel(){
       
        this.setState({
            IntoRoomShow:false,
           })
    }

    onGetIntoRoom(TransferFlag=false){
        let RoomId = this.refs.IntoRoomId.value;
        let parma = {
            GamePlatform:this.state.IntoRoomGamePlatform,
            GameType:this.state.IntoRoomGameTypeText,
            GameId:"2$"+RoomId,
            IsMobile:true,
            IsDemo:false,
        }
        Toast.loading('游戏地址获取中...',300);
        let windowOpen;
        if(!config.isApp){
            windowOpen = window.Util.windowOpen('Game');
        }
        new window.actions.ApiGetLoginUrl(parma,'(mobile)',TransferFlag).fly(res=>{
            Toast.hide();
            if(res.StatusCode == 0){
                let gameLink = res.GameLoginUrl;
                if(TransferFlag){
                    new window.actions.ApiPlayerInfoAction().fly();
                    new window.actions.ApiGamePlatformAllBalanceAction().fly();
                }
                if(!config.isApp){
                    windowOpen.location.href= gameLink;
                    this.setState({
                        IntoRoomShow:false,
                       })
                }else{
                    window.Util.appOpen(gameLink);
                    this.setState({
                        IntoRoomShow:false,
                       })
                }
            }
            else{
                if(!config.isApp){
                    windowOpen.urlError(res.Message);
                }else{
                    Modal.alert(res.Message)
                }
            }
        })
    }

    gameAddFavorite(item,event){
        event.preventDefault();
        event.stopPropagation();
        if(!wapAuth(true)) return false;
        Toast.loading(item.Title+'收藏中..',300);
        new window.actions.ApiAddFavoriteAction(item.Id).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode!=0){
                Modal.alert("添加失败！", resp.Message);
            }
        });
    }

    gameRemoveFavorite(item,event){
        event.preventDefault();
        event.stopPropagation();
        Toast.loading(item.Title+'删除收藏中..',300);
        new window.actions.ApiDeleteFavoriteAction(item.Id).fly(resp=>{
            Toast.hide();
            if(resp.StatusCode!=0){
                Modal.alert("删除收藏失败！", resp.Message);
            }
        });
    }

    renderList(){
        const _this = this;
        if(this.state.tabLoading){
            return(
                <div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>
            )
        }
        let favoritesIds = this.props.user.favoritesIds ||"";
        const row = (rowData) => {
            let favoriteBtn;
            if(favoritesIds.indexOf(rowData.Id)>-1){
                favoriteBtn=(
                    <div onClick={this.gameRemoveFavorite.bind(this,rowData)} className="gameInfo removeFavorite">
                        <i className="icon icon-star"></i>
                        {rowData.IsNew?<i className="icon icon-new"></i>:null}
                        {rowData.IsHot?<i className="icon icon-hot"></i>:null}
                    </div>
                )
            }else{
                favoriteBtn=(
                    <div onClick={this.gameAddFavorite.bind(this,rowData)} className="gameInfo">
                        <i className="icon icon-star-empty"></i>
                        {rowData.IsNew?<i className="icon icon-new"></i>:null}
                        {rowData.IsHot?<i className="icon icon-hot"></i>:null}
                    </div>
                )
            }
            return (
                <Flex className="listItem" align="start">
                    <Flex.Item className="itemL" onClick={rowData.GameIdentify && rowData.GameIdentify.indexOf("2$X")!=-1? _this.IntoRoom.bind(_this,rowData): _this.playGame.bind(_this,rowData)}>
                        {/* <span>{rowData.GamePlatform}</span> */}
                        <img  src={config.devImgUrl+rowData.IconUrl} alt="" />
                    </Flex.Item>
                    <Flex.Item className="itemR">
                        <h5>{rowData.Title}</h5>
                        {/* <p>这是一款赚钱的游戏</p> */}
                        {favoriteBtn}
                    </Flex.Item>
                </Flex>
            );
        };

        const renderFooter = ()=>{
            let con;
            if(this.state.isLoading){
                con=(<div className="dataLoading"><i className="icon-spinner icon-spin"></i> 玩命加载中...</div>)
            }else if(!this.state.hasMore){
                con=(<div style={{textAlign:'center',lineHeight:'2rem'}}>我没有更多数据了! (ㄒoㄒ)~</div>)
            }
            return con;
        };
        return(
            <ListView
                dataSource={this.state.dataSource}
                className="myListView"
                renderFooter={renderFooter}
                renderRow={row}
                initialListSize={30}
                pageSize={5}//每次事件循环（每帧）渲染的行数
                scrollRenderAheadDistance={400}//当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行
                onEndReached={this.onEndReached.bind(this)}//当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
                onEndReachedThreshold={100}//调用onEndReached之前的临界值，单位是像素
            />
        )
    }

    render(){
        let _this =this;
        const tabs = this.renderTabs();
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={()=>window.wapHistoryType.push('/')}
                >{this.props.routeParams.GameName?this.props.routeParams.GameName:"所有游戏"}</NavBar>

                <div className='wrapper AllGamePage'>
                    <SearchBar
                        placeholder="搜一搜，海量赚钱游戏"
                        ref="SearchBar"
                        onSubmit={() => this.getList(true)}
                        cancelText="确认"
                        onCancel={() => this.getList(true)}
                        onClear={()=>setTimeout(this.getList.bind(this,true),0) }
                    />
                    {
                        this.props.params.GameName.includes("棋牌") || this.props.params.GameName.includes("彩票") ? null :
                        <div className="tabs">
                            {tabs}
                        </div>
                    }
                    { this.renderList()}
                </div>
                {/*充值弹出层*/}
                {
                    this.state.depositModalShow &&
                    <Modal
                        transparent
                        visible={this.state.depositModalShow}
                        onClose={()=>{this.setState({depositModalShow:false})}}
                        footer={
                        [
                            { text: '充值', onPress: () => {window.wapHistoryType.push('/money/deposit')}},
                            { text: '直接进入', onPress: () => {
                                 _this.getGameUrl(handleGame);
                                 this.setState({depositModalShow:false})
                            } }
                        ]
                    }
                    >
                        <b style={{color:'#333'}}>您的余额不足，是否前往充值?</b>
                    </Modal>
                }
                {/*转账弹出层*/}
                {
                    this.state.transferModalShow &&
                    <Modal
                        transparent
                        visible={this.state.transferModalShow}
                        onClose={()=>{this.setState({transferModalShow:false})}}
                        footer={
                            [
                                { text: '直接进入', onPress: () => {
                                    _this.getGameUrl(handleGame);
                                    _this.setState({transferModalShow:false})
                                }},
                                { text: '自动转入', onPress: () => {
                                     _this.getGameUrl(handleGame,true);
                                     _this.setState({transferModalShow:false})
                                }}
                            ]
                        }
                    >
                        <b style={{color:'#333'}}>您在{handleGame.GamePlatform}的余额不足，是否将资金自动转入{handleGame.GamePlatform}</b>
                    </Modal>
                }
                {/* 加入棋牌房间 */}
                {
                      <Modal title="加入房间"
                      transparent
                      visible={this.state.IntoRoomShow}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      footer={[
                        { text: '取消', onPress: () => {
                            _this.IntoRoomCancel();
                        }},
                        { text: '确定', onPress: () => {
                            _this.onGetIntoRoom();
                       }}
                      ]}
                      >
                        <input ref="IntoRoomId" className="IntoRoomClass" type="number" maxLength="6" placeholder="请输入6位房间密码"  /><br/>
                      </Modal>
                }
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        user:state.user,
        platforms:state.game.platforms,
        mobileHomeMore:state.wapCategores.mobileHomeMore,//點擊更多  獲取游戲分類
        slot_category:state.wapCategores.slot_category//老虎机的分类

    }
);

export default connect(mapStateToProps)(AllGamePage)