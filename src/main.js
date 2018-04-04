//引入vue
import Vue from 'vue'

//导入App组件
import App from './App.vue'

//导入mint-ui组件
import {
    Header,Button, Swipe, SwipeItem,Lazyload,Switch,Indicator
} from 'mint-ui';
//注册为全局组件
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Switch.name, Switch);

Vue.use(Lazyload);  //注意懒加载是vue的插件，所以需要use
// //------------路由-------------
// //导入路由  分离路由时候，注意路径改变了 在这个页面用到router所以写import router from './router'
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)

// import Home from './components/Home.vue'
// import Cart from './components/cart/Cart.vue'
// import Vip from './components/Vip.vue'
// import Search from './components/Search.vue'
// import NewsList from './components/news/List.vue'

// const router = new VueRouter({
//     routes: [
//         {path:'/',redirect:'/home'},
//         { path: '/home',component: Home },
//         { path: '/cart',component: Cart},
//         { path:'/search',component:Search},
//         { path:'/vip',component:Vip},
//         { path:'/home/news',component:NewsList}
//     ],
//     //修改默认高亮类名
//     linkActiveClass:'mui-active'

// })

//导入mui 的css
import './lib/mui/css/mui.min.css'
//导入购物车extra.css
import './lib/mui/css/icons-extra.css'
//导入main.css
import './assets/css/index.css'
//导入请求数据的插件
import axios  from 'axios'
//设置请求接口的公共路径 axios提供的方法
axios.defaults.baseURL='http://vue.studyit.io/'
//给******vue的原型添加一个$http的属性，它的值是axios 
//因为axios不是vue的插件，所以不能用use()来安装
Vue.prototype.$http=axios   //添加给原型的组件和方法，实例就可以拿到
//导入日期过滤器index.js没有导出任何内容（如果导出的话，我们会用到，所以引入时候写import axios from 'axios'），只需要让这个js文件执行就行  ************导入js文件就行，js就会执行一次
import './filters'  //引入文件名，默认可以省略index.js

//导入路由模块
import router from './router'   

//导入vue-preview插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview) //安装 https://github.com/LS1231/vue-preview

//导入vuex
import store from './store' //引入文件名，默认可以省略index.js

//axios的拦截器
// 拦截器会拦截发送的每一个请求，请求发送之前执行request中的函数，请求发送完成之后执行response中的函数
axios.interceptors.request.use(function(config){
    //所有请求之前都要执行的操作
    console.log(config);
    if(config.methods==='get'){
        Indicator.open('加载中...');  //mint-ui中的加载器
    }   //打印发现发表评论是post,按照这个判断是get就显示加载中，post显示评论成功
   
    return config;
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 所有请求完成后都要执行的操作
    setTimeout(()=>{
        Indicator.close();
    },400)
   
    return response;
  })

//创建vue实例
new Vue({
    el: '#app',
    render:  c=> c(App), //渲染根组件
    router, //将路路由实例与vue实例关联到一起
    store,  //将store挂载到vue的实例中 router和store属于vue的插件所以只有这两个需要挂载
    data:{
            msg:"343"
    }   
})

//注意后缀名vue是组件,有模板

