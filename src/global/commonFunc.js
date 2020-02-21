import { browserHistory } from 'react-router'

// 自动转账处理，仅用于体育和电竞
export function transferTip(params){
    let _totalAmount = parseInt(params.user.userBalance)
    let _autoTransfer = params.user.AutoTransfer; //是否自动转账: 0 -false; 1- true
    if(_totalAmount>1){
        if(_autoTransfer){
            enterGame(true,params);
        }else{
            window.Swal({
                title: `是否需要余额自动转入到该平台?`,
                type: "warning",
                showCloseButton: true,
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonColor: "#c5841f",
                cancelButtonColor: "#c5841f",
                confirmButtonText: "自动转入",
                cancelButtonText: "直接进入",
            }).then((isConfirm) => {

                try {
                    //点击自动转入
                    if (isConfirm.value) { 
                        Swal.close();
                        enterGame(true,params);  
                    }
                    //点击取消按钮
                    else {      
                        if(isConfirm.dismiss === 'overlay' || isConfirm.dismiss === 'close' || isConfirm.dismiss === 'esc'){
                            params.changeState();
                            Swal.close();                         
                        }else{
                            enterGame(false,params); 
                        }                                      
                    }
                }catch (e){
                    alert(e);
                }
            });                
        }
    }else{
        window.Swal({
            title: `您的总财富不足1元，是否充值？`,
            type: "warning",
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#c5841f",
            cancelButtonColor: "#c5841f",
            confirmButtonText: "返回充值",
            cancelButtonText: "直接进入",
        }).then((isConfirm) => {
            try { 
                //点击的充值，取消，X，ESC按钮
                if(isConfirm.value){
                    browserHistory.push('/deposit')
                }else if (isConfirm.dismiss === 'overlay' || isConfirm.dismiss === 'close' || isConfirm.dismiss === 'esc') { 
                    params.changeState();
                    Swal.close();
                }else { // 直接进入            
                    enterGame(false,params);                     
                }
            }catch(e){
                alert(e);
            }
        });              
    }
}
// 获得链接,获取游戏登录地址
export function enterGame(TransferFlag,params){
    const changeStateFunc = params.changeState || new Function()
    const param = params.param;
    new window.actions.ApiGetLoginUrl(param,'WEB',TransferFlag).fly(res=>{
        if(res.StatusCode == 0){
            let gameLink = res.GameLoginUrl;
            // 体育返回链接如果是http则open页面，https不需要
            if(gameLink.indexOf("https") == -1){
                Swal.fire("游戏链接不支持http，仅支持https")
                changeStateFunc && changeStateFunc(gameLink)    
            }else{              
                changeStateFunc && changeStateFunc(gameLink)
            }                                            
        }else{
            changeStateFunc && changeStateFunc()
            Swal.fire(res.Message)
        }
    })
}

// 客服服务
export function serversOpen(online_service_link){
    event.preventDefault();
    window.open(
        online_service_link,
        'servers',
        'width=800,height=700,directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no,left=5,top=50,screenX=550,screenY=250'
    )
    return false;
}
// 点击站内信
export function RedAllMsg(){
    new actions.ApiReadAllSiteMsgAction().fly(resp=>{
        if (resp.StatusCode === 0) {
            new window.actions.ApiSitemsgUnreadCountAction().fly();
        }
    });
}
// 回到顶部
export function backTop(){
    var headTop = $('.Header').offset().top;
    $('html,body').animate({
        scrollTop: headTop
    }, 500);  
}