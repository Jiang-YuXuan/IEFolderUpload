var fs = require('fs');
var path = require('path');
//读写数据时的缓存流
var buf = new Buffer(1024);
//上传文件主方法
const upload = (fromPath,toPath) => {
	//获取文件夹路径
  let upPath = path.dirname(toPath);

  //判断文件夹是否存在
  if (!fs.existsSync(upPath)) {
     //创建文件夹
     console.log("创建文件夹"+upPath);
     fs.mkdirSync(upPath);
  }
     //复制文件
     //读取文件内容于缓存buffer中
     buf = fs.readFileSync(fromPath);
     // 仅输出读取的字节
     if(buf.length > 0){
       //写文件
       console.log("准备写入文件");
       fs.writeFileSync(toPath,buf);
     }else{
       //停止读写(当文件为空时也不会创建)
       return;
     }  
}
exports.upload = upload;