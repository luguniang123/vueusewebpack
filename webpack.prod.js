const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
//自动删除的包
const cleanWebpackPlugin = require('clean-webpack-plugin')

// 分离 css 到独立的文件中
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 压缩 css 资源文件 ***------包需要是3.2.0否则报错因为版本不一样使用方法不一样
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')



module.exports = {
  // 入口
  entry:{
      //我们写的js代码的入口
    app:path.join(__dirname, './src/main.js'),
//第三方js文件的入口 约定第三方包的名字叫vender
    vendor: ['vue', 'vuex','vue-router', 'vue-preview','axios',
'moment','mint-ui'] 
 //把用到的第三方包写进来 可以去package.json的dependencies里面来看，babel不用管，
 //mui 不是通过npm安装的，所以不能写这里
  },

  // 出口
  output: {
    // 输出文件目录
    path: path.join(__dirname, './dist'),
    // 输出文件名称
    // filename: 'bundle.js'
    filename: 'js/[name].[chunkhash].js',  //因为有两入口，指定不同出口，表将js文件放到js目录中
    //name表示入口entry中配置的文件名称  chunkhash随机的名称
    //设置公共路径
    publicPath:'/',  //设置公共路径 以为打包分离后 css 在根目录，验证（注意先viscode这里文件刷新）打包后的css文件fonts前面有/就说明成功
  
    //vue配合webpack实现路由按需加载
    // ------添加 chunkFilename, 指定代码分离后的每个 输出js文件的名和路径  还需要去index.js修改组件的引用方式------
   chunkFilename: 'js/[name].[chunkhash].js',
  },

//   // webpack-dev-server
//   devServer: {
//     // 自动打开浏览器
//     open: true,
//     // 设定默认打开哪个目录下的 index.html
//     // contentBase: path.join(__dirname, './src'),
//     // 端口号
//     port: 3001,
//     // 热更新 1
//     // hot: true
//   },
//   devtool:'eval-source-map',//用于方便开发期间调错的代码

  // 用来处理非JS的静态资源
  module: {
    rules: [
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        }) },
      {  test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        }) },
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
            limit: 8192,
            //指定把图片放到dist/images下面来 hash指定采用hash命名方式，后面的文件名位数 ext表示保留原来的后缀名
            name: 'images/[hash:7].[ext]' 
          }
        } 
      },
//引用mui 时候，svg会报错，原因是mui的svg格式写的不合法。方法注释掉css文件，测试最后发现是mui
//把mui.css mui.min.css中的文件\' 全部替换成"
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            // limit 就是阀值，值的单位：字节(byte)
            limit: 8192,
            name:'fonts/[hash:7].[ext]'
          }
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
      template: path.join(__dirname, './src/index.html'),

      //压缩html文件
  minify: {
    // 移除空白
    collapseWhitespace: true,
    // 移除注释
    removeComments: true,
    // 移除属性中的双引号
    removeAttributeQuotes: true
  }
    }),
    new cleanWebpackPlugin(['./dist']),
    // 3 抽离第三方包
  new webpack.optimize.CommonsChunkPlugin({
    // 将 entry 中指定的 ['vue', 'vue-router', 'axios'] 打包到名为 vendor 的js文件中
    // 第三方包入口名称，对应 entry 中的 vendor 属性
    name: 'vendor',  //需要与入口中写的vender名字要一样
  }),
   // 压缩代码  移除警告（优化代码）uglifyjs 无法压缩ES6的代码
  // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/tree/v0.4.6
  new webpack.optimize.UglifyJsPlugin({
    // 压缩
    compress: {
      // 移除警告
      warnings: false
    }
  }),

  // 指定环境为生产环境：vue会根据这一项启用压缩后的vue文件
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  // 通过插件抽离 css (参数)
new ExtractTextPlugin("css/style.css"),  //将css文件抽离到css
// 抽离css 的辅助压缩插件
new OptimizeCssAssetsPlugin()
  ]
}
// 在package.json 中devDependencies 开发阶段用的包 npm i -D 包名比如webpack
// dependencies 中是项目上线后用的包 npm i -S 包名 比如mui mint-ui 
