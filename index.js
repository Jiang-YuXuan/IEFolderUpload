//实例化server
var server = require('./public/js/server');
//实例化router
var router = require('./public/js/router');
//启动server
server.nodeServer(router.route);