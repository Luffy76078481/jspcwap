import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { message } from 'antd';

class Frame extends Component {
    // 提示弹窗
    componentWillReceiveProps(nextProps) {
        if( nextProps.message.popup){
            const popup =  nextProps.message.popup;
            message.destroy();
            if (popup.msgType === "loading") {
                message.loading(popup.message)
            } else if (popup.msgType === "success"){
                message.success(popup.message,1);
            }else if (popup.msgType === "error") {
                message.error(popup.message,2);
            }
        }
    }
    componentDidMount(){
        //let srciptDom = `<script language="javascript" src="https://twopl.realgogo.com/chat/chatClient/monitor.js?jid=3049963406&companyID=365034707&configID=1080&codeType=custom&ss=1"></script>`;
        // var script= document.createElement('script');
        // script.type= 'text/javascript';
        // script.src= "https://twopl.realgogo.com/chat/chatClient/monitor.js?jid=3049963406&companyID=365034707&configID=1080&codeType=custom&ss=1";
        // console.log(document.getElementById('root'))
        // //React.cloneElement
        // setTimeout(()=>{
        //     document.getElementById('bbbbbb').appendChild(script)
        // },1000)
      
    }
    constructor(props){
        super(props);     
        this.div = <div id='bbbbbb'></div>
    }
    // 关闭弹窗，转盘抽奖弹窗。
    globeHide(){
        $("#globe-show").hide();
    }
    render() {
        var Header = window.r.get("Header");
        var LoginPage = window.r.get("LoginPage");
        var Footer = window.r.get("Footer");
        var AffixService = window.r.get("AffixService");
        var AffixService2 = window.r.get("AffixService2");
        var AffixService_Download = window.r.get("AffixService_Download");
        var AffixService_Callback = window.r.get("AffixService_Callback");
        var AffixService_Help = window.r.get("AffixService_Help");
        var SideBarRight = window.r.get("SideBarRight");        // AAA新对联
        var SideBarLeft = window.r.get("SideBarLeft");        // AAA新对联
        var AffixHongbao = window.r.get("AffixHongbao")        // 红包，目前AAA有
        var Turntable = window.r.get("Turntable")        // 大转盘AAA入口
        const remoteSysConfs = this.props.remoteSysConfs || {};
        /*
            二臣贼子，你枉活七十有六，
            一生未立寸功，只会摇唇鼓舌！助曹为虐！
            一条断脊之犬，还敢在我军阵前狺狺狂吠，我从未见过有如此厚颜无耻之人！

            data-theme 主题样式 data-wesite 模板站
        */
    
        return (
            <div data-theme={window.config.theme} data-website={window.config.spec.substr(0,window.config.spec.indexOf('-'))}>
                <div id="globe-show">
                    <div className="globe-popbox"></div>
                    <div className="globe-popbox-popbox">
                        <p id="globe-message"></p>
                        <p className="globe-close" onClick={this.globeHide}>关闭</p>
                    </div>
                </div>
                <LoginPage/>
                <Header/>
                {this.props.children}
                {window.config.spec.includes('bet365') && browserHistory.getCurrentLocation().pathname=='/'? null: <Footer/>}
                {AffixService2?<AffixService2></AffixService2>:null}
                {window.config.spec.includes('bet365') && browserHistory.getCurrentLocation().pathname=='/'? null: (AffixService?<AffixService/>:null)}
                {AffixService_Download?<AffixService_Download/>:null}
                {AffixService_Callback?<AffixService_Callback/>:null}
                {AffixService_Help? <AffixService_Help/>:null}
                {SideBarLeft?<SideBarLeft/>:null}
                {SideBarRight?<SideBarRight/>:null}
                {
                    !$.isEmptyObject(remoteSysConfs) &&
                    (remoteSysConfs.allow_hongBao==='1'||remoteSysConfs.allow_hongbao==='1')?
                    (window.config.spec.includes('bet365') && browserHistory.getCurrentLocation().pathname=='/')?
                    null:
                    <AffixHongbao/>
                    :null
                }
                {
                    !$.isEmptyObject(remoteSysConfs) &&
                    (remoteSysConfs.allow_zhuanPan==='1'||remoteSysConfs.allow_zhuanpan==='1')?
                    (browserHistory.getCurrentLocation().pathname=='/'&&window.config.spec.includes('bet365')?null:(Turntable&&<Turntable/>))
                    :null                  
                }
                {
                    window.config.spec.includes('bbt') &&
                    <script type= 'text/javascript' src="https://twopl.realgogo.com/chat/chatClient/monitor.js?jid=3049963406&companyID=365034707&configID=1080&codeType=custom&ss=1"></script>
                }
 
            </div>
            
        );
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        message:state.message,
        remoteSysConfs: state.remoteSysConfs
    }
);

var frame = connect(mapStateToProps, {})(Frame);

export default frame;