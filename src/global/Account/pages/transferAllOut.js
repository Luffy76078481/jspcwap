/*

        一键转出，3个地方使用，头部，转账页，提款页（开启自动转账后触发）
*/
var transferAllOutState = true;// 一键转出锁
// Notice 提款页面不要提示失败的显示
export function transferAllOut(platforms,notice=true){
    if(!transferAllOutState) return;
    let transferArr=[];
    for(let i=0; i<platforms.length;i++){
        let platform = platforms[i];
        if(platform.Balance && platform.Balance>=1){
            transferArr.push(platform);
        }
    }
    if(transferArr.length == 0 && notice) {
        let obj = {};
        obj.type="message";
        obj.msgType = "error";
        obj.title = "错误";
        obj.message = "当前没有可转出的余额";
        var d = new Date();
        obj.created = d.format("yyyy/MM/dd hh:mm:ss");
        obj.startTime = d.getTime();
        window.actions._dispatch(obj)
        transferAllOutState = true;
        return
    }else{
        transferAllOutState = false;
    }
    let param = {};
    for(let b = 0;b<transferArr.length;b++){
        let Balance = transferArr[b].Balance;
        param[transferArr[b].ID] = Balance;
    }
    new window.actions.ApiTransferOutAction(param).fly(resp=>{
        if (resp.StatusCode === 0 || resp.Success === true) {
            new window.actions.ApiGamePlatformAllBalanceAction().fly();
            new window.actions.ApiPlayerInfoAction().fly(()=>{
                transferAllOutState = true;
            });// 刷新个人信息 
        }
    })
}