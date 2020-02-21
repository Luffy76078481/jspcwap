const ip = require('ip');
// let IPv4 = "192.168.149.19";
let IPv4 = '0.0.0.0';
const webpack = require('webpack');
const path = require('path'); // 导入路径包
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');
const NODE_MODULE = path.resolve(__dirname, 'node_module');

module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',
    entry: {
        bundle: APP_DIR + "/entry.js",
        plugin: APP_DIR + "/plugin/index.js",
        common: ['jquery', 'react', 'react-dom', 'redux', 'react-redux', 'react-router', 'react-router-redux'],
        help: APP_DIR + "/help.js", //帮助中心 入口文件
        hongBao: APP_DIR + "/hongBao.js", //紅包頁面  入口文件
        noServiceEntry: APP_DIR + "/noService.js", //非法访问页面
        maintain: APP_DIR + "/maintain.js", //网站维护中  入口文件
        agent: APP_DIR + "/agent.js", //代理页面
        gameUrlLoading: APP_DIR + "/gameUrlLoading.js", //请求游戏接口时的loading页面
        games: APP_DIR + "/games.js", //游戏中转页面
        // nav: APP_DIR + "/nav.js",
        promotionCenter: APP_DIR + "/promotionCenter.js"
    }, // 入口文件
    // 输出文件 build下的bundle.js
    output: {
        path: BUILD_DIR + "/static",
        filename: "[name].[hash].js",
        publicPath: "/",
    },
    resolve: {
        alias: {
            "configureStore": path.resolve(__dirname, "./src/store/configureStore.prod"),
            "globalConfig": path.resolve(__dirname, "./config/config"), //配置文件
            "globalRouter": path.resolve(__dirname, "./src/router/Router"), //路由
            "globalAction": path.resolve(__dirname, "./src/actions/index"), //action
            "globalHelper": path.resolve(__dirname, "./config/config_helper"), // config_helper
            "provincesJson": path.resolve(__dirname, "./config/provincesJson"), //省市的JSON数据
            "offlineTransferJson": path.resolve(__dirname, "./config/offlineTransferJson"), //转账类型JSON
            "pui": path.resolve(__dirname, "./src/global/Components/publicUI/Pui.js"), //公共UI小模块
            "commonFunc": path.resolve(__dirname, "./src/global/commonFunc.js"), //公共方法
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    // 使用loader模块
    module: {
        rules: [{
            test: /\.(gif|jpg|png)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: "images/[path][name].[ext]?v=[hash:12]"
                }
            }],
            exclude: NODE_MODULE
        },
        {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: "font/[path][name].[ext]?v=[hash:12]"
                }
            }],
            exclude: NODE_MODULE
        },
        {
            test: /\.(js|jsx)$/,
            use: [{
                loader: "babel-loader",
                options: {
                    "presets": ["es2015", "react", "stage-1"],
                    plugins: [
                        "transform-runtime",
                        ['import', {
                            libraryName: 'antd',
                            libraryDirectory: "es",
                            "style": "css"
                        }]
                    ],
                    cacheDirectory: true,
                }
            }],
            // exclude: NODE_MODULE,
            include: [path.resolve('src'),path.resolve('/node_modules/element-ui/src'),path.resolve('/node_modules/element-ui/packages'),path.resolve('/node_modules/swiper')]
        },
      
        {
            test: /\.(css|scss|less)$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader",
                options: {
                    sourceMap: true
                }
            }]
        }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': "jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/index.html', // 模版文件
            filename: "index.html",
            chunksSortMode: function (chunk1, chunk2) {
                var order = ["common", 'plugin', 'bundle'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
            chunks: ["common", "bundle", "plugin"]
        }),

        new HtmlWebpackPlugin({
            template: 'public/help.html', //幫助頁面
            filename: "help.html",
            chunks: ["help"]
        }),

        new HtmlWebpackPlugin({
            template: 'public/agent.html', //代理頁面
            filename: "agent.html",
            chunks: ["plugin", "agent"]
        }),

        new HtmlWebpackPlugin({
            template: 'public/maintainPage.html', //模版文件
            filename: "maintainPage.html",
            chunks: ["maintain"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/hongBao.html', //紅包文件
            filename: "hongBao.html",
            chunks: ["common", "hongBao"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/NoServicePage.html', //非法访问页面
            filename: "NoServicePage.html",
            chunks: ["noServiceEntry"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/games.html', //游戏中转页面
            filename: "games.html",
            chunks: ["games"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/gameUrlLoading.html', //请求游戏接口时的loading页面
            filename: "gameUrlLoading.html",
            chunks: ["plugin", "gameUrlLoading"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/promotionCenter.html', //优惠活动办理中心
            filename: "promotionCenter.html",
            chunks: ["common", "promotionCenter"]
        }),
        // new HtmlWebpackPlugin({
        //     template: 'public/nav.html', //導航頁面
        //     chunks: ["common", "nav"]
        // }),
    ],
    // 配置devServer各种参数
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        open: true, //自动打开浏览器
        hot: true,
        //openPage: "",
        https:true,
        host: '0.0.0.0',
        // https:true,
        useLocalIp: true,
        //host: IPv4,
        port: 8080,
        proxy: { //重定向
            '/api/v0/Pay/**': { //.net生產環境[支付]
                //__start target: '#{spec}',
target: 'https://bb776.com/',
//__end
                secure: false, //若地址为https，需要设置为false
                changeOrigin: true //是否跨域
            },
            '/api/**': { //.net生產環境
                //__start target: '#{spec}',
target: 'https://bb776.com/',
//__end
                secure: false, //若地址为https，需要设置为false
                changeOrigin: true //是否跨域
            },
            '/signalr': { //.net生產環境
                //__start target: '#{spec}',
target: 'https://bb776.com/',
//__end
                secure: false, //若地址为https，需要设置为false
                changeOrigin: true //是否跨域
            },
        },

    },
    performance: {
        hints: false
    }
};