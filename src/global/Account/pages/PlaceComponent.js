/**
 * 个人中心1-省份城市地点             ==> 新站共用
 */

import React, {Component} from 'react';
import {provinces} from "provincesJson";
import { Link} from 'react-router'

class PlaceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selProvince:provinces[0],
        };
        this.getSelProvince = this.getSelProvince.bind(this);
        this.getSelCity = this.getSelCity.bind(this);
    }
    // 开户省份
    renderProvinces() {
        var ret = [];
        for (var i = 0; i < provinces.length; i++) {
            var p = provinces[i];
            ret.push(
                <option key={i} value={p.name}>{p.name}</option>
            );
        }
        return ret;
    }
    // 城市
    renderCities() {
        var ret = [];
        for (var i = 0; i < this.state.selProvince.cities.length; i++) {
            var c = this.state.selProvince.cities[i];
            ret.push(
                <option key={i} value={c.name}>{c.name}</option>
            );

        }
        return ret;
    }
    // 切换省份
    onProvinceChanged(e) {
        this.setState({selProvince:provinces[e.target.selectedIndex]})
    }
    /* 父组件获取省份，城市方法 */
    getSelProvince() {
        if (!this.refs.province) {
            return "";
        }
        return this.refs.province.value;
    }
    getSelCity() {
        if (!this.refs.city) {
            return "";
        }
        return this.refs.city.value;
    }
    render(){
        return (
            <div>
                <div className="mb20">
                    <label className="lbl">开户省: </label>     
                    <select ref="province" onChange={this.onProvinceChanged.bind(this)} className='normalInput'>
                        {
                            this.renderProvinces()
                        }
                    </select>    
                </div>
                <div className="mb20">
                    <label className="lbl">开户市: </label>
                    <select ref="city" className='normalInput'>
                        {
                            this.renderCities()
                        }
                    </select>
                </div>
            </div>
        );
    }
}


export default PlaceComponent;