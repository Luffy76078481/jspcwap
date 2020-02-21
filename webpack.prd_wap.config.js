const webpack = require('webpack');
const path = require('path'); // 导入路径包
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, "distWap");
const APP_DIR = path.resolve(__dirname, 'src');
const NODE_MODULE = path.resolve(__dirname, 'node_module');
console.log('---------------------------wap端打包中...' + process.env.NODE_ENV + '----------------------')
module.exports = {
    // devtool: 'source-map',
    entry: {
        bundle: APP_DIR + "/entry_wap.js",
        plugin: APP_DIR + "/plugin/index_wap.js",
        noServiceEntry: APP_DIR + "/noService.js", //非法访问页面
        maintain: APP_DIR + "/maintainWap.js",//网站维护中  入口文件
    }, // 入口文件

    // 输出文件 build下的bundle.js
    output: {
        publicPath: "/m/", //输出目录，寻找资源的地址
        path: BUILD_DIR,
        filename: "js/[name].[hash].js",
        // chunkFilename: 'js/[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            "configureStore": path.resolve(__dirname, "./src/store/configureStore.prod_wap"),
            "globalConfig": path.resolve(__dirname, "./config/config_Wap"), //配置文件
            "CacheHelper": path.resolve(__dirname, "./src/store/CacheHelper"), //
            "globalRouter": path.resolve(__dirname, "./src/router/RouterWap"), //路由
            "globalAction": path.resolve(__dirname, "./src/actions/index"), //action
            "provincesJson": path.resolve(__dirname, "./config/provincesJson"), //省市的JSON数据
            "offlineTransferJson": path.resolve(__dirname, "./config/offlineTransferJson"), //转账类型JSON
            "wapNavJson": path.resolve(__dirname, "./config/wapNavJson"), //转账类型JSON
            "bankJson": path.resolve(__dirname, "./config/bankJson"), // 银行正则
            "pui":path.resolve(__dirname,"./src/themes_wap/stuff/publicUI/Pui.js"),//公共UI小模块
        }
    },
    // 使用loader模块
    module: {
        rules: [{
                test: /\.(gif|jpg|png)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: "images/[path][name].[ext]?v=[hash:12]",
                        publicPath: "/m/"
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
                        name: "font/[path][name].[ext]?v=[hash:12]",
                        publicPath: "/m/"
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
                                libraryName: 'antd-mobile',
                                libraryDirectory: "es",
                                "style": "css"
                            }]
                        ],
                        cacheDirectory: true,
                    }
                }],
                exclude: NODE_MODULE,
            },
            {
                test: /\.(css|scss|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: "css-loader",
                            options: {
                                sourceMap: false,
                                importLoaders: 1,
                                minimize: true
                            }
                        },
                        {
                            loader: 'less-loader' // 引入less-loader
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                })
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                },
            }
        },
        // 为每个入口提取出webpack runtime模块
        runtimeChunk: {
            name: 'manifest'
        }
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "css/[name].[hash].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': "jquery"
        }),
        new HtmlWebpackPlugin({
            template: 'public/index_wap.html', // 模版文件
            filename: "index.html",
            chunksSortMode: function (chunk1, chunk2) {
                var order = ["manifest", "commons", 'plugin', 'bundle'];
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
            chunks: ["manifest", "commons", "bundle", "plugin"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/gameUrlLoading.html', //请求游戏接口时的loading页面
            filename: "gameUrlLoading.html",
            chunks: ["plugin", "gameUrlLoading"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/NoServicePage.html', //非法访问页面
            filename: "NoServicePage.html",
            chunks: ["manifest", "commons", "noServiceEntry"]
        }),
        new HtmlWebpackPlugin({
            template: 'public/maintainPageWap.html', //模版文件
            filename:"maintainPage.html",
            chunks: ["manifest","commons","maintain"]
        }),
        new webpack.DefinePlugin({
            BASENAME: JSON.stringify('/m')
        })

    ]
};