const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
//自动删除的包
const cleanWebpackPlugin = require('clean-webpack-plugin')

// 分离 css 到独立的文件中
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 压缩 css 资源文件 ***包需要是3.2.0否则报错
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  // 入口
  entry: path.join(__dirname, './src/main.js'),

  // 出口
  output: {
    // 输出文件目录
    path: path.join(__dirname, './dist'),
    // 输出文件名称
    filename: 'bundle.js'
  },

  // webpack-dev-server
  devServer: {
    // 自动打开浏览器
    open: true,
    // 设定默认打开哪个目录下的 index.html
    // contentBase: path.join(__dirname, './src'),
    // 端口号
    port: 3001,
    // 热更新 1
    // hot: true
  },
  devtool:'eval-source-map',//用于方便调错的代码

  // 用来处理非JS的静态资源
  module: {
    rules: [
      { test: /\.css$/,use: ['style-loader', 'css-loader'] },
      //css-loader先将css文件转化为commonJS代码
      //使用sass-
      //style-loader创建一个style标签，将css-loader拿到的字符串，作为style标签的内容，并且插入到head标签中
      { test:/\.(scss|sass)$/,use:['style-loader','css-loader','sass-loader']},
      //sass 通过sass-loader把sass转移成css,然后css转化成标签放到html结构中
      //处理less
      { test:/\.less$/,use:['style-loader','css-loader','less-loader']},
  
      // { test: /\.(png|jpg|jpeg|gif)$/, use: 'file-loader' }

      // 使用 url-loader 图片会被解析为 base64 编码的格式
      // 对于小图标才适合使用Base64编码，大图片是不适合用base64的
      // 所以，我们要指定一个阀值，如果图片的大小比指定的阀值小，就转化为base64；
      //                         如果图片的大小比指定的阀值大，就不使用base64，此时，url-loader会主动调用 file-loader 来加载图片
      // { test: /\.(png|jpg|jpeg|gif)$/, use: 'url-loader' }
      { 
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // limit 就是阀值，值的单位：字节(byte)
            limit: 8192
          }
        } 
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2|otf|ttf)$/,
        use: {
          loader: 'url-loader',
          // options: {
          //   // limit 就是阀值，值的单位：字节(byte)
          //   limit: 8192
          // }
        }
      },

      // 处理ES6或者更高级的JS语法：
      // exclude 排除 node_modules。
      // 因为默认情况下，babel会对项目中所有的js文件进行处理，但是 node_modules 中的文件就是ES5的代码，是不需要被处理的。如果处理的话，那么速度会很慢，所以，我们直接将 node_modules 排除，不处理它。这样 babel 处理的性能会更高
     //让babel不取处理引进的文件 在文件夹lib里面
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules|mui/ },
      

      // 处理 Vue单文件组件
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  },

  plugins: [
    // 热更新 2
    // new webpack.HotModuleReplacementPlugin(),

    // 1 自动引入css、js
    // 2 在内存中自动生成一个页面，在浏览器中看到的就是这个页面
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html')
    })
  ]
}
// 在package.json 中devDependencies 开发阶段用的包 npm i -D 包名比如webpack
// dependencies 中是项目上线后用的包 npm i -S 包名 比如mui mint-ui 
