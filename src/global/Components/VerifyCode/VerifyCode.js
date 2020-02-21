/**
 *  前端驗證碼
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';

export class VerifyCode extends Component {
    constructor(props) {
        super(props);
        this.state={
            width:100,
            height:40
        }
    }
    componentDidMount(){
        this.draw();
    }
    changeCode(){
        this.draw()
    }
    randomColor(){
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    draw(show_num=[]){
        let _this = this;
        let canvas_width=_this.state.width;
        let canvas_height=_this.state.height;
        let canvas = this.refs.verifyCodeCanvas;//获取到canvas的对象，演员
        let context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        let sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        let aCode = sCode.split(",");
        let aLength = aCode.length;//获取到数组的长度
        for (let i = 0; i <= 3; i++) {
            let j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            let deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            let txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            let x = 10 + i * 20;//文字在canvas上的x坐标
            let y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";
            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = _this.randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (let i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = _this.randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (let i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = _this.randomColor();
            context.beginPath();
            let x = Math.random() * canvas_width;
            let y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
        if(_this.props.getVerifyCode){
            _this.props.getVerifyCode(show_num.join(""));
        }
    }
    render(){
        return(
            <canvas 
                ref="verifyCodeCanvas" 
                id="verifyCodeCanvas"
                onClick={this.changeCode.bind(this)} 
                width={this.state.width} 
                height={this.state.height}
            >                 
            </canvas>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {}
);

export default connect(mapStateToProps)(VerifyCode)
