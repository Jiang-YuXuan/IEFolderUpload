//导入的模块
var upload1 = require('./upload1');
var bodyParser = require('body-parser');
var formidable = require('formidable');

var form = new formidable.IncomingForm();
//开启多选属性
form.multiples = true;
//上传路径
var uploadPath = "./public/upload/";
//路由对应函数
const route = (server) => {
  console.log("About to route1 a request");
  // 创建 application/x-www-form-urlencoded 编码解析
  server.use(bodyParser.urlencoded({ extended: false }));
//设置路由

  server.get("/",function(req,res){
    res.render("home",{title:"Nodejs文件夹上传"});
  });//get请求，主页ejs渲染


  //post表单上传
  server.post("/upload",function(req,res){
    //处理表单
    let toPath = "";
    let fromPath = "";
    form.parse(req,function(err, fields, files){
       let fils = files.upload;
       for (var i = 0; i < fils.length; i++) {
          fromPath = fils[i].path;
          console.log(fromPath);
          toPath = uploadPath+fils[i].name;
          console.log(toPath);
          //文件上传
          upload1.upload(fromPath,toPath);
        }
    });
    //设置响应头
    res.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
    res.write("上传成功!");//向页面响应数据
    res.end();
  });
}

exports.route = route;