var path = require('path');
var fs = require('fs');
//上传路径
var uploadPath = "./public/upload/";
//读写数据时的缓存流
var buf = new Buffer(1024);

//上传文件主方法
const upload = (rootPath) => {
	//获取选择文件的名
	let rootFolder = path.basename(rootPath);
    console.log("创建目录"+rootFolder);
    //上传根目录
    uploadPath = uploadPath+rootFolder;
    fs.mkdirSync(uploadPath);
    console.log(rootFolder+"目录创建成功。");
    //读取目录(rootPath用户选择文件夹路径,uploadPath+"/"存储于服务器路径)
    readFileList(rootPath,uploadPath+"/");
    return;
}

//递归读取文件系统函数
const readFileList = (childPath,uploadPath) => {
	console.log("查看"+childPath+"目录");
	//读取文件目录(files是文件目录对象)
    let files = fs.readdirSync(childPath);
    //遍历文件目录(itm是文件对象,index是索引)
    files.forEach(function (itm, index) {
    	//获取文件信息
        let stat = fs.statSync(childPath + itm);
        //判断是否为文件夹
        if (stat.isDirectory()) {
        	//写文件夹
        	let upPath = uploadPath + itm;
        	fs.mkdirSync(upPath);
        	console.log(itm+"目录创建成功。");
            //递归读取文件
            readFileList(childPath + itm + "/",upPath+"/");
        } else {
            //cope文件
            let fromPath = childPath + itm;//上传文件路径
            let toPath = uploadPath + itm;//复制目的路径
            copy(fromPath,toPath);
        }

    });
    return;
}

//文件复制函数(fromPath文件来源路径,toPath目的地路径)
const copy = (fromPath,toPath) => {
   console.log("准备读取文件！");
   //读取文件内容于缓存buffer中
   buf = fs.readFileSync(fromPath);
      // 仅输出读取的字节
      if(buf.length > 0){
        //写文件
         console.log("准备写入文件");
         fs.writeFileSync(toPath,buf);
      }else{
         //停止读写
         return;
      }    
}
exports.upload = upload;