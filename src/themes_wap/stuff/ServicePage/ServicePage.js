/*
                       
                温馨提示：━━━━━━━━━━━━━━━━
                联系我们-业务逻辑难度为：★
          
*/

import React, { Component } from 'react';
import { Flex, List, NavBar, Icon, Button } from 'antd-mobile';
import connect from "react-redux/es/connect/connect";
import './ServicePage.scss';
import { config } from "globalConfig";
const Item = List.Item;

class ServicePage extends Component {
    constructor(props) {
        super(props);
    }
    openSildeBar() {
        this.props.params.openSilde()
    }
    serviceOpen() {
        if (config.isApp) {
            window.Util.appOpen(this.props.remoteSysConfs.online_service_link)
        } else {
            window.open(this.props.remoteSysConfs.online_service_link, '_blank');
        }
    }
    componentDidMount(){
        console.log(this.props.remoteSysConfs,3333333333)
    }

    // 复制copyCode
    copyCode(copyId) {
        var copyObj = document.getElementById(copyId);
        copyObj.select();
        copyObj.setSelectionRange(0, copyObj.value.length)
        document.execCommand("Copy");
    }

    render() {
        return (
            <div className="HelpPage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={'返回'}
                    onLeftClick={() => window.wapHistoryType.push('/myPage')}
                >联系我们</NavBar>
                <div className="scroll-content ServicePage">
                    <Flex>
                        <List className="list">
                            <p className='title'>您可以通过以下方式和我们取得联系</p>
                            <div className="my-am-list-item">
                                {
                                    this.props.remoteSysConfs.online_service_phone ?
                                        <Item>
                                            <i className="icon icon-phone" />电话：
                                            <input id="code_phone" className='link_url' defaultValue={this.props.remoteSysConfs.online_service_phone} readOnly/>
                                            <span className="copy" onClick={this.copyCode.bind(this, 'code_phone')}>复制</span>
                                        </Item> : null
                                }
                                {
                                    this.props.remoteSysConfs.online_service_qq ?
                                        <Item>
                                            <i className="iconQQ">
                                                <svg viewBox="64 64 896 896" className="" data-icon="qq" width="1em"
                                                    height="1em" fill="currentColor" aria-hidden="true">
                                                    <path
                                                        d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" />
                                                </svg>
                                            </i>QQ：
                                            <input id="code_qq" className='link_url' defaultValue={this.props.remoteSysConfs.online_service_qq} readOnly />
                                            <span className="copy" onClick={this.copyCode.bind(this, 'code_qq')}>复制</span>
                                        </Item> : null
                                }
                                {
                                    this.props.remoteSysConfs.online_service_wechat ?
                                        <Item>
                                            <i className="iconWechat">
                                                <svg viewBox="64 64 896 896" className="" data-icon="wechat" width="1em"
                                                    height="1em" fill="currentColor" aria-hidden="true">
                                                    <path
                                                        d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z" />
                                                </svg>
                                            </i>官方微信：
                                            <input id="code_wx" className='link_url' defaultValue={this.props.remoteSysConfs.online_service_wechat} readOnly/>
                                            <span className="copy" onClick={this.copyCode.bind(this, 'code_wx')}>复制</span>
                                        </Item> : null
                                }
                                {
                                    this.props.remoteSysConfs.agent_wecaht &&
                                    <Item>
                                        <i className="iconWechat">
                                            <svg viewBox="64 64 896 896" className="" data-icon="wechat" width="1em"
                                                height="1em" fill="currentColor" aria-hidden="true">
                                                <path
                                                    d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z" />
                                            </svg>
                                        </i>代理微信：
                                        <input id="code_DLwx" className='link_url' defaultValue={this.props.remoteSysConfs.agent_wecaht} readOnly/>
                                        <span className="copy" onClick={this.copyCode.bind(this, 'code_DLwx')}>复制</span>
                                    </Item>
                                }
                                {
                                    this.props.remoteSysConfs.online_service_skype ?
                                        <Item >
                                            <i className="iconSky">
                                                <svg viewBox="64 64 896 896" className="" data-icon="skype" width="1em"
                                                    height="1em" fill="currentColor" aria-hidden="true">
                                                    <path
                                                        d="M883.7 578.6c4.1-22.5 6.3-45.5 6.3-68.5 0-51-10-100.5-29.7-147-19-45-46.3-85.4-81-120.1a375.79 375.79 0 0 0-120.1-80.9c-46.6-19.7-96-29.7-147-29.7-24 0-48.1 2.3-71.5 6.8A225.1 225.1 0 0 0 335.6 113c-59.7 0-115.9 23.3-158.1 65.5A222.25 222.25 0 0 0 112 336.6c0 38 9.8 75.4 28.1 108.4-3.7 21.4-5.7 43.3-5.7 65.1 0 51 10 100.5 29.7 147 19 45 46.2 85.4 80.9 120.1 34.7 34.7 75.1 61.9 120.1 80.9 46.6 19.7 96 29.7 147 29.7 22.2 0 44.4-2 66.2-5.9 33.5 18.9 71.3 29 110 29 59.7 0 115.9-23.2 158.1-65.5 42.3-42.2 65.5-98.4 65.5-158.1.1-38-9.7-75.5-28.2-108.7zm-88.1 216C766.9 823.4 729 839 688.4 839c-26.1 0-51.8-6.8-74.6-19.7l-22.5-12.7-25.5 4.5c-17.8 3.2-35.8 4.8-53.6 4.8-41.4 0-81.3-8.1-119.1-24.1-36.3-15.3-69-37.3-97.2-65.5a304.29 304.29 0 0 1-65.5-97.1c-16-37.7-24-77.6-24-119 0-17.4 1.6-35.2 4.6-52.8l4.4-25.1L203 410a151.02 151.02 0 0 1-19.1-73.4c0-40.6 15.7-78.5 44.4-107.2C257.1 200.7 295 185 335.6 185a153 153 0 0 1 71.4 17.9l22.4 11.8 24.8-4.8c18.9-3.6 38.4-5.5 58-5.5 41.4 0 81.3 8.1 119 24 36.5 15.4 69.1 37.4 97.2 65.5 28.2 28.1 50.2 60.8 65.6 97.2 16 37.7 24 77.6 24 119 0 18.4-1.7 37-5.1 55.5l-4.7 25.5 12.6 22.6c12.6 22.5 19.2 48 19.2 73.7 0 40.7-15.7 78.5-44.4 107.2zM583.4 466.2L495 446.6c-33.6-7.7-72.3-17.8-72.3-49.5s27.1-53.9 76.1-53.9c98.7 0 89.7 67.8 138.7 67.8 25.8 0 48.4-15.2 48.4-41.2 0-60.8-97.4-106.5-180-106.5-89.7 0-185.2 38.1-185.2 139.5 0 48.8 17.4 100.8 113.6 124.9l119.4 29.8c36.1 8.9 45.2 29.2 45.2 47.6 0 30.5-30.3 60.3-85.2 60.3-107.2 0-92.3-82.5-149.7-82.5-25.8 0-44.5 17.8-44.5 43.1 0 49.4 60 115.4 194.2 115.4 127.7 0 191-61.5 191-144 0-53.1-24.5-109.6-121.3-131.2z" />
                                                </svg>
                                            </i>Skype：
                                            <input id="code_sky" className='link_url' defaultValue={this.props.remoteSysConfs.online_service_skype} readOnly/>
                                            <span className="copy" onClick={this.copyCode.bind(this, 'code_sky')}>复制</span>
                                        </Item> : null
                                }
                                {
                                    this.props.remoteSysConfs.online_service_email ?
                                        <Item >
                                            <i className="icon icon-envelope" />邮箱：
                                            <input id="code_email" className='link_url' defaultValue={this.props.remoteSysConfs.online_service_email} readOnly />
                                            <span className="copy" onClick={this.copyCode.bind(this, 'code_email')}>复制</span>
                                        </Item> : null
                                }
                                {
                                    this.props.remoteSysConfs.online_service_worktime ?
                                        <Item >
                                            <i className="icon icon-time" />工作时间：{this.props.remoteSysConfs.online_service_worktime}
                                        </Item> : null
                                }
                            </div>
                        </List>
                    </Flex>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => (
    {
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps)(ServicePage)