import React, {Component} from 'react';
import './Pui.scss';
// import {MainButton} from './test'
// ———————————————————————————————— 放置各种需要复用的小组件

// ____________________________________ 支付密码下拉框 ____________________
export class PassWord extends Component {  
    constructor (props){
        super();
        this.state = {
            option:props.defaultVal
        };
    }
    changeVal = (i,event)=>{
        this.state.option[i] = event.target.value;
        this.setState({
            option:this.state.option
        });
        this.props.getVal(this.state.option.join(''));
    }
    render(){
        let select = [];
        for(let k = 0;k < this.state.option.length;k++){
            let option = [];
            for(let i = 0;i < 10;i++){
                option.push(
                    <option key={`o${i}`}>{i}</option>
                )        
            }
            select.push(
                <select key={`s${k}`} onChange={this.changeVal.bind(this,k)} value={this.state.option[k]} className='PayPassWord'>
                    {option}
                </select>
            ) 
        }
        return <div className="Pui-PassWord">    
            {select}
        </div>
    }
}
// ____________________________________ 复制按钮 ____________________
export class CopyButton extends Component {  
    constructor (props){
        super();
    }
    // 复制当前文本
    copyCode(CopyElement){
        if(CopyElement){
            document.getElementById(CopyElement).select()
        }
        else{
            window.swal('错误','复制失败，请重新复制！','error')
        }
        try{
            if( document.execCommand('copy',false, null) )
            {
                document.execCommand("Copy");
                window.swal('恭喜您','复制成功！','success')
            }
        }
        catch(err){
            window.swal('错误','复制失败，请手动复制！','error')
        }
    }
    render(){
        return(
            <button className='Pui-CopyButton ml10' onClick={this.copyCode.bind(this,this.props.copyEle)}>复制</button>
        )
    }
}


// ____________________________________ 时区类型下拉 ____________________
export class TimeZone extends Component {  
    constructor (props){
        super();
        this.state = {
            option:props.defaultVal
        };
    }

    zoneChange(e){
        this.setState({
            option:e.target.value
        });
        this.props.getVal(e.target.value);
    }
   
    render(){
        return(
            <div className="Pui-TimeZone">
                {/* <MainButton/> */}
                <select onChange={this.zoneChange.bind(this)} value={this.state.option}>
                    <option>美东时间</option>
                    <option>北京时间</option>
                </select>
            </div>
            
        )
    }
}




