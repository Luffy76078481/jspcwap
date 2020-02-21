/**
 *  登录密码.
 */

import {ChangePwdComponent} from "./ChangePwdComponent";
import {ApiChangePwdAction} from "globalAction";

class ChangeLoginPwdComponent extends ChangePwdComponent {
    constructor(props) {
        super(props);
        this.title = "登录";
        this.actionCls = ApiChangePwdAction;
    }
}


export default ChangeLoginPwdComponent;