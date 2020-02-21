
import React, {Component} from 'react';
import {config} from "globalConfig";

class ContactContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online_service_worktime: "周一至周五 11:00/21:00(GMT+8)",
            online_service_link: "",
            online_service_qq: config.qq || "",
            online_service_email: "xp9677@gmail.com" || "",
            online_service_phone: config.phone || "",
            online_service_skype: config.skype || ""
        }
    }
    componentDidMount(){
        this.setState({
            online_service_skype: this.props.online_service_skype || "",
            online_service_worktime: this.props.online_service_worktime || "",
            online_service_link:this.props.online_service_link || "",
            online_service_email:this.props.online_service_email || "",
            online_service_qq:this.props.online_service_qq || "",
            online_service_phone:this.props.online_service_phone || "",
            agent_service_qq:this.props.agent_service_qq || "",
        });
    }

    serversOpen(e){
        e.preventDefault();
        if(e.target.id=='test'){
            window.swal({
                    title: "忘记密码",
                    text: "联系在线客服协助修改密码",
                    confirmButtonColor: "#c5841f",
                    confirmButtonText: "联系客服",
                    showCancelButton: true,
                    cancelButtonText: "关闭",
                },
                ()=>{
                    window.open(this.state["online_service_link"],'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
                });
            return;
        }
        window.open(this.state["online_service_link"],'servers','width=700,height=600,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250');
        return false;
    }


    render() {
        const skype  = config.skype;
        const email = "xp9677@gmail.com";
        const qq = config.qq;
        const spec = config.spec;
        return (
            <div id="ContactContent" className="show">
                <div className="contact-fousImg">
                    {/*<img src="assets/images/content/content_02.jpg" width="100%"/>*/}
                </div>
                <div className="fnameCenter">
                    <div className="titleGroup">
                        <span className="contactIcon">
                            <i className="fa fa-phone-square"></i>
                        </span>
                        <h3 className="heiti f35 font300 contactTitle">联系我们</h3>
                    </div>
                    <div className="contactFname heiti">
                        <div className="formRight">
                            <p>
                                <span className=" iconGroup tab_inco3" style={{ marginLeft:'1px'}} >
                                    <i className="fa fa-at"></i>
                                </span>
                                &nbsp;&nbsp;邮箱：{this.state["online_service_email"]}
                            </p>
                            {
                                this.state["online_service_skype"] ?
                                    <p>
                                        <span className=" iconGroup tab_inco4"></span>
                                        <i className=" iconGroup fa fa-skype"></i>
                                        <span style={{letterSpacing:"1.3px"}}>&nbsp;&nbsp;Skype</span>
                                        ：{this.state["online_service_skype"]}
                                    </p> : null
                            }
                            <p>
                                {/* <div> */}
                                    {
                                        spec == 'yhwj' ? null : 
                                            spec=='gdh' ? null : 
                                                spec=='mgm-vv8' ? null :
                                                    <span>
                                                        <span className="iconGroup tab_inco5">
                                                            <i className="fa fa-qq" ></i>
                                                        </span>
                                                        &nbsp;&nbsp;代理QQ号：           
                                                        {
                                                            this.state["agent_service_qq"] ?
                                                            <b style={{fontWeight: '100'}}>{this.state["agent_service_qq"]}</b> :
                                                            <b style={{fontWeight: '100'}}>{this.state["online_service_qq"]}</b>
                                                        }
                                                    </span>
                                    } 
                                {/* </div>    */}
                            </p>
                            <p><span className=" iconGroup tab_inco6"><i className="fa fa-clock-o" ></i></span>&nbsp;&nbsp;工作时间：{spec=='mgm-vv8'?'周一至周日7x24小时':null}<span className="f12" style={{fontSize: "12px"}}>7*24全年无休提供客服服务</span></p>
                            <p><span className=" iconGroup tab_inco7"><i className="fa fa-headphones"></i></span>&nbsp;&nbsp;需要协助-<a id="test1" target="_parent" href="#" onClick={this.serversOpen.bind(this)} ><b className="huang">我要协助</b></a></p>
                            <p className="f28 heiti contactHzImg"><span className="logoImg"></span><span>合作伙伴事业部</span></p>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
        )
    }
}



export default (ContactContent);