let fs=require("fs");

//回调函数的第一个参数为error 用于输出错误信息
          //第二个参数为data 是一个十六进制文件 可以用toString()输出
fs.readFile("../config/test.txt",function (e,d) {
    console.log(e);  //null
    console.log(d.toString());
});

fs.writeFile("../config/user.txt","{\"username\":\"lyx\"}",function (e) {
    console.log(e);  //null   说明文件阅读成功和写入成功 error的值为null
});