//导入的模块
var http = require('http');
var express = require("express");//express框架
var server = express();

//服务器函数
const nodeServer = (route) => {
//创建server并监听8888端口
http.createServer(server).listen(8888,function(){
    console.log("Server is listening port 8888");
});
server.use(express.static(__dirname+"/public"));
//设置模板视图的目录
server.set("views","./public/views");
//设置是否启用视图编译缓存，启用将加快服务器执行效率
server.set("view cache",true);
//设置模板引擎的格式即运用何种模板引擎
server.set("view engine","ejs");
//调取路由
route(server);

}
exports.nodeServer = nodeServer;