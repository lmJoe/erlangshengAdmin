var Version = new Date().getTime();
const path = require('path');
module.exports = {
  devServer: {
    //设置主机地址
    host:'0.0.0.0',
    //设置默认端口
    port:'8080',
    //自动打开浏览器
    open:true,
  },
  publicPath:'',
  configureWebpack:{ 
    output: {
        // 输出重构【模块名称.hash值.时间戳】
        filename: `js/[name].[hash].${Version}.js`,
        chunkFilename: `js/[name].[hash].${Version}.js`
    },
},
}