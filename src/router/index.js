//------------路由-------------
 import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入组件
import Home from '../components/Home.vue'

// import Cart from '../components/cart/Cart.vue'
// import Vip from '../components/Vip.vue'
//ue配合webpack实现路由按需加载 按照一下方式引入 第二个参数用于指定在代码分隔后生成就是文件的名称vip
//写法1const Vip = r => require.ensure([],() => r(require('../components/Vip.vue')),'vip')

//用来告诉webpack这个js文件 需要从app中且出来，作为一个代码块
//写法二  这里面注释是有用的，生成vip文件的意思
const Vip = () => import(/* webpackChunkName: "vip" */ '../components/Vip.vue')

// import Search from '../components/Search.vue'
// import NewsList from '../components/news/List.vue'
// import NewsInfo from '../components/news/Info.vue'
// //导入图片分享组件
// import PhotoList from '../components/photos/List.vue'
// import PhotoInfo from '../components/photos/Info.vue'
// //导入商品购买组件
// import GoodsList from '../components/goods/List.vue'
// import GoodsInfo from '../components/goods/Info.vue' 

const Cart = () => import(/* webpackChunkName: "cart" */ '../components/cart/Cart.vue')
const Search=() => import(/* webpackChunkName: "search" */ '../components/Search.vue')
//如果webpackChunkName系统，那么这两个代码会打包到一个js文件中
const NewsList = () => import(/* webpackChunkName: "news" */ '../components/news/List.vue')
const NewsInfo = () => import(/* webpackChunkName: "news" */ '../components/news/Info.vue')
//导入图片分享组件  
const PhotoList = () => import(/* webpackChunkName: "photo" */ '../components/photos/List.vue')
const PhotoInfo = () => import(/* webpackChunkName: "photo" */ '../components/photos/Info.vue')
//导入商品购买组件
const GoodsList = () => import(/* webpackChunkName: "goods" */ '../components/goods/List.vue')
const GoodsInfo = () => import(/* webpackChunkName: "goods" */ '../components/goods/Info.vue') 

//创建路由规则
const router = new VueRouter({
    routes: [
        {path:'/',redirect:'/home'},
        { path: '/home',component: Home },
        { path: '/cart',component: Cart},
        { path:'/search',component:Search},
        { path:'/vip',component:Vip},
        { path:'/home/news',component:NewsList},
        // 因为有很多个新闻，我们通过路由参数来区分哪一个新闻，并且根据这个id来获取新闻
        {path:'/home/newsinfo/:id',component:NewsInfo,name:'newsinfo'},
        //图片分享路由
        { path:'/home/photos',component:PhotoList},
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path:'/home/goods',component:GoodsList},
        { path:'/home/goodsinfo/:id',component:GoodsInfo}
    ],
    //修改默认高亮类名
    linkActiveClass:'mui-active'

})
//因为main.js中需要当前模块中创建的实例，所以此处需要将router导出

export default router 