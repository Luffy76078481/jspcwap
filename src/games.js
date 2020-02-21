import React, { Component } from 'react';
import { render } from 'react-dom'
import Content from "./global/otherPages/games/gameTransfer"
import {setStorage} from "globalAction";
import configureStore from 'configureStore';
import Swal from 'sweetalert2';
import "./plugin/utils/main.js"
/*
    解决IE下Promise报错 
    【
        1.install babel-runtime和babel-plugin-transform-runtime 
        2.添加在主页之前添加window.Promise = Promise
    】
*/

window.Promise = Promise;
window.Swal = Swal;
const store = configureStore();
setStorage(store.dispatch, store.getState);
class GameTransferPage extends Component {
    render() {
        return (
            <div>
                 <Content/>
            </div>
        )
    }
}
render(<GameTransferPage/>, document.getElementById('root'));