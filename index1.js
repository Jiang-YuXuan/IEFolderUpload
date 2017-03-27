//实例化server
var server = require('./public/js/server');
//实例化router
var router1 = require('./public/js/router1');
//启动server
server.nodeServer(router1.route);