//导入的模块
var upload = require('./upload');
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//路由对应函数
const route = (server) => {
  console.log("About to route a request");
//设置路由
  server.get("/",function(req,res){
    res.render("index",{title:"Nodejs文件夹上传"});
  });//get请求，主页ejs渲染

  server.post("/upload",urlencodedParser,function(req,res){
    //处理表单
    let rootPath = req.body.path;//获取name为path的input输入框的值
    console.log(rootPath);
    //正则替换（反斜杠全替换为正斜杠）
	rootPath = rootPath.replace(/\\/g,"/");
	console.log(rootPath);
    upload.upload(rootPath);
    //设置响应头
    res.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
    res.write("上传成功!");//向页面响应数据
    res.end();
  });
}

exports.route = route;