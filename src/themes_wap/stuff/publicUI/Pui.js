import React, {Component} from 'react';
import {Picker, InputItem, Toast, List} from 'antd-mobile';
import './Pui.scss';
// 放置各种需要复用的小组件


export class NumPicker extends Component {  //wap下拉选择数字组件
    constructor (props){
        super(props);
        this.state = {
            data: [
                [
                    {label: '0',value: '0'},
                    {label: '1',value: '1'},
                    {label: '2',value: '2'},
                    {label: '3',value: '3'},                    
                    {label: '4',value: '4'},   
                    {label: '5',value: '5'},
                    {label: '6',value: '6'},
                    {label: '7',value: '7'},
                    {label: '8',value: '8'},                    
                    {label: '9',value: '9'},                 
                ],
                [
                    {label: '0',value: '0'},
                    {label: '1',value: '1'},
                    {label: '2',value: '2'},
                    {label: '3',value: '3'},                    
                    {label: '4',value: '4'},   
                    {label: '5',value: '5'},
                    {label: '6',value: '6'},
                    {label: '7',value: '7'},
                    {label: '8',value: '8'},                    
                    {label: '9',value: '9'},                 
                ],
                [
                    {label: '0',value: '0'},
                    {label: '1',value: '1'},
                    {label: '2',value: '2'},
                    {label: '3',value: '3'},                    
                    {label: '4',value: '4'},   
                    {label: '5',value: '5'},
                    {label: '6',value: '6'},
                    {label: '7',value: '7'},
                    {label: '8',value: '8'},                    
                    {label: '9',value: '9'},                 
                ],
                [
                    {label: '0',value: '0'},
                    {label: '1',value: '1'},
                    {label: '2',value: '2'},
                    {label: '3',value: '3'},                    
                    {label: '4',value: '4'},   
                    {label: '5',value: '5'},
                    {label: '6',value: '6'},
                    {label: '7',value: '7'},
                    {label: '8',value: '8'},                    
                    {label: '9',value: '9'},                 
                ]
            ],
            withdrawalPassword: props.withdrawalPassword,
        };
    }

    render(){
        const {withdrawalPassword} = this.state;
        const {value,onChange,onOk,errorInfos,error,onErrorClick,tipText} = this.props;
        return (
            <div className='set_withdraw_pwd'>
                <Picker
                    cascade={false}
                    data={this.state.data}
                    value={value}
                    onOk = {onOk}
                >
                    <InputItem
                        value={value}
                        error={error}
                        onErrorClick={onErrorClick}
                        onChange={onChange}
                    >
                        <label className="label">{tipText}</label>
                    </InputItem>
                </Picker>
            </div>
            
        )
    }

}
export class NumIconPicker extends Component {  //wap下拉选择数字组件
    constructor (props){
        super(props);
        this.state = {
            data: [
                [
                    {label: '0',value: '0'},
                    {label: '1',value: '1'},
                    {label: '2',value: '2'},
                    {label: '3',value: '3'},
                    {label: '4',value: '4'},
                    {label: '5',value: '5'},
                    {label: '6',value: '6'},
                    {label: '7',value: '7'},
                    {label: '8',value: '8'},
                    {label: '9',value: '9'},
                ],
                [
                    {label: '0',value: '0'},
                    {label: '1',value: '1'},
                    {label: '2',value: '2'},
                    {label: '3',value: '3'},
                    {label: '4',value: '4'},
                    {label: '5',value: '5'},
                    {label: '6',value: '6'},
                    {label: '7',value: '7'},
                    {label: '8',value: '8'},
                    {label: '9',value: '9'},
                ],
                [
                    {label: '0',value: '0'},
                    {label: '1',value: '1'},
                    {label: '2',value: '2'},
                    {label: '3',value: '3'},
                    {label: '4',value: '4'},
                    {label: '5',value: '5'},
                    {label: '6',value: '6'},
                    {label: '7',value: '7'},
                    {label: '8',value: '8'},
                    {label: '9',value: '9'},
                ],
                [
                    {label: '0',value: '0'},
                    {label: '1',value: '1'},
                    {label: '2',value: '2'},
                    {label: '3',value: '3'},
                    {label: '4',value: '4'},
                    {label: '5',value: '5'},
                    {label: '6',value: '6'},
                    {label: '7',value: '7'},
                    {label: '8',value: '8'},
                    {label: '9',value: '9'},
                ]
            ],
            withdrawalPassword: props.withdrawalPassword,
        };
    }


    render(){
        const {withdrawalPassword} = this.state;
        const {value,onChange,onOk,errorInfos,error,onErrorClick,tipText,iconClassName} = this.props;

        return (
            <div className='set_withdraw_pwd'>
                <Picker
                    cascade={false}
                    data={this.state.data}
                    value={value}
                    onOk = {onOk}
                >
                    <InputItem
                        value={value}
                        error={error}
                        onErrorClick={onErrorClick}
                        onChange={onChange}
                    >
                        <label className={"label "+iconClassName}><span className='star'>{tipText}</span></label>
                    </InputItem>
                </Picker>
            </div>

        )
    }

}

export class FastTimeSelect extends Component {
    constructor (props){
        super(props);
        this.state = {
            timeZoneIndex:props.timeZone,
        };
    }

    componentWillReceiveProps(netxProps){
        if(netxProps.timeZone !== this.props.timeZone ){
            this.setState({
                timeZoneIndex:netxProps.timeZone,
            });
        }
    }

    timeZoneChange(val){
        this.setState({
            timeZoneIndex:val,
        });
        this.props.getVal(val);
    }
    render(){
        return (
            <div className='timeZone'>
                <Picker title="选择时区"
                        data={[{label: ('北京时间'), value: 0},{label: ('美东时间'), value: 1}]}
                        value={this.state.timeZoneIndex}
                        cols={1}
                        onOk={(val)=>{this.timeZoneChange(val)}}
                        disabled={this.props.disable}
                >
                    <List.Item arrow="down"></List.Item>
                </Picker>
            </div>
        )
    }
}
