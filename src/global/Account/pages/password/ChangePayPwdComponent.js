/**
 * 付款密码
 */

import React from 'react';
import {ChangePwdComponent} from "./ChangePwdComponent";
import {ApiChangePayPwdAction} from "globalAction";

class ChangePayPwdComponent extends ChangePwdComponent {
    constructor(props) {
        super(props);
        this.title = "取款";
        this.actionCls = ApiChangePayPwdAction;
    }
}

export default ChangePayPwdComponent;