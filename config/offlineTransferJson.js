//转账类型JSON
export const transferTypes = [
    {
        id: "1",
        name: "网银",
        requirePlace: false,//是否需要显示省、市、地址
    },
    // {
    //     id: "2",
    //     name: "ATM自动柜员机",
    //     requirePlace: true
    // },
    {
        id: "3",
        name: "ATM现金存款",
        requirePlace: true
    },
    {
        id: "4",
        name: "银行柜台",
        requirePlace: true
    },
    {
        id: "5",
        name: "手机银行",
        requirePlace: false
    },
    {
        id: "6",
        name: "支付宝",
        requirePlace: false
    },
    {
        id: "7",
        name: "微信",
        requirePlace: false
    }
];