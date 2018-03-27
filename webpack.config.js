const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口
  entry: path.join(__dirname, './src/js/main.js'),

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
    port: 3000,
    // 热更新 1
    // hot: true
  },

  // 用来处理非JS的静态资源
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
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
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
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
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },

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
