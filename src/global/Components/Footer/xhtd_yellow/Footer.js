
import React, { Component } from 'react';
import { connect } from 'react-redux'
import "./Footer.scss"

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const appName = window.config.appName;
        return (
            <footer>
                <div className="footer-bg"></div>
                <div className="top">
                    <div className="center">
                        <div className="links">
                            <a href="/agent.html?tab=AboutUs"  target="_blank">关于我们</a>
                            <a href="/agent.html?tab=ContactUs" target="_blank">联络我们</a>
                            <a href="/agent.html?tab=Deposit" target="_blank">如何存款</a>
                            <a href="/agent.html?tab=Wthdrawal" target="_blank">如何取款</a>
                            <a href="/agent.html?tab=Faq" target="_blank">常见问题</a>
                            <a href="/agent.html?tab=BetRule" target="_blank">责任博彩</a>
                        </div>
                        <div className="logoword">Copyright © {appName} Reserved </div>
                    </div>
                </div>
            </footer>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        user : state.user,
        message:state.message,
        remoteSysConfs: state.remoteSysConfs
    }
);

export default connect(mapStateToProps, {

})(Footer)