
//replace(" ","")
var fs = require("fs"); //获取fs模块
var glob = require("glob") // 遍歷
// 获取 package.json 环境变量
var isRunStart = process.env.isRunStart;
var isRunStartWap = process.env.isRunStartWap;
var isBuildWap = process.env.isBuildWap;
var isBuildApp = process.env.isBuildApp;
var config;

if( isRunStart ){
    console.log(' ========== ========== ========== 前方高能：PC启动ing ========== ========== ========== ')
    config = readConfig("config/config.js");
}else if( isRunStartWap || isBuildWap || isBuildApp ){
    config = readConfig("config/config_Wap.js");
    if(isRunStartWap){
        console.log(' =================================== 前方高能：移动端配置启动...ing ======================================= ')
    }else if(isBuildWap){
        console.log(' =================================== 前方高能：Wap正在打包前配置...ing  ======================================= ')
    }else if(isBuildApp){
        console.log(' =================================== 前方高能：App正在打包前配置...ing ======================================= ')
    }else{
        console.error(' ========== ========== ========== 紅色警告：未獲取環境變量，警告，警告！ ========== ========== ========== ')        
    }    
}else{
    config = readConfig("config/config.js");
    console.log(' ========== ========== ========== 前方高能：PC打包ing ========== ========== ========== ')
}


// 讀取文件
function readFile(path) { 
    return fs.readFileSync(path).toString();
}
// 寫入文件 - 寫入的文件路徑 寫入的内容
function writeFile(path, content) {
    fs.writeFileSync(path, content, {
        encoding: "utf8", // 可选值，默认 ‘utf8′
        flag: "w" // 默认值 ‘w'
    });
}
// 讀取Config配置文件
function readConfig(str) {
    var configContent = readFile(str);
    var i = configContent.indexOf("{"); // 開始
    configContent = configContent.substring(i); // 獲取整個config對象
    return JSON.parse(configContent); // 轉換
}
// api配置
const startTag = "//__start";
const endTag = "//__end";
// 替換内容
function replaceVariables(content,api) {
    var tag = false;
    var ret = "";
    var off = 0;
    while (true) {
        var i = content.indexOf(startTag, off);//__start下标
        if (i < 0) {
            if(tag){
                ret += content.substring(off); // 连接end之后
                return ret;
            }else{
                return false;
            }
        } else {
            tag = true;
        }
        // 处理end以前
        var j = content.indexOf("\n", i + startTag.length) // 换行符下标
        var tem = content.substring(i + startTag.length, j).trim(); // 修改内容
        // 替换api 或者 spec 
        if (api) {
            if(isRunStartWap||isBuildApp||isBuildWap){
                config = readConfig("config/config_Wap.js");
            }else{
                config = readConfig("config/config.js");
            }
            tem = tem.replace("#{spec}", config.api)
        } else {
            tem = tem.replace("#{spec}", config.spec)
        }
        var k = content.indexOf(endTag, j); //__end下标
        // 連接 
        ret += content.substring(off, j) + "\n"; 
        ret += tem + "\n"; 
        off = k;// 重新找__start
    }
}
// 配置requirementConfig指向
changeConfig(init = function () {
    var shouldConfiguredFiles = [];
    if(isRunStartWap||isBuildApp||isBuildWap){
        //shouldConfiguredFiles = ['config/requirementWap.js']
    }else{
        shouldConfiguredFiles = ["config/requirementConfig.js","src/agent.js","src/help.js","src/hongBao.js"]
    }
    shouldConfiguredFiles.forEach(function(item){
        writeFile(
            item, 
            replaceVariables( readFile(item) )
        );       
    })
});
// configData=>配置config文件
function changeConfig(init) {
    var configData;
    if(isRunStartWap||isBuildApp||isBuildWap){
        configData = readFile("config/configData_Wap.js")
    }else{
        configData = readFile("config/configData.js")
    }
    var end = 0;
    var startIndex = configData.indexOf("//〓〓〓" + config.spec + "〓〓〓");
    if(startIndex == -1){
        console.error("  __________________ 無此項配置，請核對配置 __________________ ")
    }else{
        startIndex = configData.indexOf("export", startIndex);
        end = configData.indexOf("//〓〓〓End〓〓〓", startIndex);
        var newConfigData = configData.substring(startIndex, end);
        if(isRunStartWap||isBuildApp||isBuildWap){
            writeFile("config/config_Wap.js", newConfigData);
        }else{
            writeFile("config/config.js", newConfigData);
        }   
        // 打包和啓動的不同處理
        if(isRunStartWap||isBuildApp||isBuildWap){ // 移動端
            if(isRunStartWap){
                var webpackConfig = readFile("webpack.config_wap.js");
                webpackConfig = replaceVariables(webpackConfig,true);
                writeFile("webpack.config_wap.js", webpackConfig);
            }else{
                newConfigData = readConfig('config/config_Wap.js');
                newConfigData.devImgUrl = "";
                if(isBuildApp){
                    newConfigData.isApp = true;
                }  
                if(isBuildWap){
                    newConfigData.isApp = false;
                }                             
                newConfigData = JSON.stringify(newConfigData)
                newConfigData = "export const config ="+newConfigData;
                writeFile("config/config_Wap.js", newConfigData);   
                     
            }            
        }else{ // PC端處理
            if(isRunStart){
                var webpackConfig = readFile("webpack.config.js");
                webpackConfig = replaceVariables(webpackConfig,true);
                writeFile("webpack.config.js", webpackConfig);
            }else{
                newConfigData = readConfig('config/config.js');
                newConfigData.prdImgUrl = "";
                newConfigData = JSON.stringify(newConfigData)
                newConfigData = "export const config ="+newConfigData;
                writeFile("config/config.js", newConfigData);
            }
        }

    }
    init();
}

if( isRunStartWap || isBuildWap || isBuildApp ){
    config = readConfig('config/config_Wap.js');
    changeImg();
    changeScss();
    // 更換圖片
    function changeImg() {
        //glob('src/wapSrc/wapThemes/' + config.spec + '/style/images/*.png', (err, files) => {
        glob('src/themes_wap/themes/' + config.model + '/images/*.png', (err, files) => {
            files.forEach( //循环出所有图片
                function (path) {
                    var Img = fs.readFileSync(path, { //读取图片
                        encoding: 'hex',
                        flag: 'r'
                    })
                    var replaPath = path.split("/images/")[1];
                    writeImg(replaPath,Img)
                }
            )
        });
        //glob('src/wapSrc/wapThemes/' + config.spec + '/style/images/*.ico', (err, files) => {
        glob('src/themes_wap/themes/' + config.model + '/images/*.ico', (err, files) => {
            files.forEach( //循环出所有图片
                function (path) {
                    var Img = fs.readFileSync(path, { //读取图片
                        encoding: 'hex',
                        flag: 'r'
                    })
                    var replaPath = path.split("/images/")[1];
                    writeImg(replaPath,Img)
                }
            )
        });
        //glob('src/wapSrc/wapThemes/' + config.spec + '/style/images/*.jpg', (err, files) => {
        glob('src/themes_wap/themes/' + config.model + '/images/*.jpg', (err, files) => {
            files.forEach( //循环出所有图片
                function (path) {
                    var Img = fs.readFileSync(path, { //读取图片
                        encoding: 'hex',
                        flag: 'r'
                    })
                    var replaPath = path.split("/images/")[1];
                    writeImg(replaPath,Img)
                }
            )
        });
        function writeImg(replaPath,content) {
            //fs.writeFileSync("src/wapSrc/wapGlobal/style/images/"+replaPath, content, {
            fs.writeFileSync("src/themes_wap/images/"+replaPath, content, {
                encoding: "hex",
                flag: "w"
            });
        }
    }
    // 切換SCSS
    function changeScss(){
        // var scss = readFile('src/wapSrc/wapThemes/' + config.spec + '/style/variables.scss');
        // writeFile("src/wapSrc/wapGlobal/style/variables.scss",scss);
        // writeFile("src/template_wap/pages/style/variables.scss",scss);
        var scss = readFile('src/themes_wap/themes/' + config.model + '/variables.scss');
        writeFile("src/themes_wap/style/variables.scss",scss);
    }
}
    // 寻找所有src下的JS，也許以後會用到
    /*
    glob("src/*.js", {}, function (er, files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var content = readFile(file);// 文件内容
            content = replaceVariables(content); // 替換内容
            if (content) {
                console.log(" 更替agent,help的路徑 " + file);
                writeFile(file, content); // 更新内容
            }
        }
    })
    */
 