<template>
  <div class="goods-info">
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 轮播图组件 -->
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, i) in imgList" :key="i">
              <img :src="item.src" alt="商品轮播图">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
<!-- v-model来实现组件之间的双向数据绑定  商品详情页面的坑：vue不能使用mui的框来做加入购物车的+ 和- 因为到时数据不会变化
*****必须使用vue提供的方法才能做**数据绑定 父组件大页面商品库存 通过props传给子组件 子组件调用父组件的方法，购买数量传给父组件
v-model可以实现组件之间双向数据绑定-->
    <!-- 
      飞舞的小球 
      1 transition是vue内置组件，用来实现动画和过渡效果
      2 要执行动画效果的元素，应该被 transition 包裹
    -->
  <transition
   v-on:before-enter="beforeEnter"
  v-on:enter="enter">
    <div class="ball" v-show="isShow"></div>
  </transition>

    <!-- 商品数据展示file:///F:/day-06/1-%E6%95%99%E5%AD%A6%E8%B5%84%E6%96%99/mui/examples/hello-mui/examples/card.html -->
    <div class="mui-card">
      <div class="mui-card-header" v-text="info.title"></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner info">
          <p>
            <span class="market-price">市场价：<del>￥{{info.market_price }}</del></span> 
            <span>
            销售价：
            <span class="sell-price">￥{{info.sell_price}}</span>
            </span>
          </p>
          <div class="numbox-container">
            购买数量：

            <!-- count 表示：购买数量 -->
            <!-- total 表示：库存数量 -->
        <NumberBox v-model="count" :total="info.stock_quantity"></NumberBox>
          </div>
          <div>
            <mt-button type="primary">立即购买</mt-button>
            <mt-button type="danger" @click="addCart">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ info.goods_no}}</p>
          <p>库存情况：{{info.stock_quantity}}件</p>
          <p>上架时间：{{info.add_time |date('YYYY-MM-DD')}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
 //父组件中导入NumberBox子组件

import NumberBox from '../common/NumberBox.vue'

export default {
 
  created() {
    this.getGoodsImgs()
    this.getGoodsInfoById()
  },

  data() {
    return {
      imgList: [],    // 商品轮播图数组
      info:{}, //商品详情数据
      count:1, //把---**购买数量给子组件为了先显示，以后子组件可以改 还应该把**库存数量给子组件----------
      isShow:false //是否展示小球 一开始不展示
    }
  },

  methods: {
    // 获取商品轮播图数据
    getGoodsImgs() {
      this.$http
        .get(`/api/getthumimages/${this.$route.params.id}`)
        .then(res => {
          const data = res.data

          if (data.status === 0) {
            this.imgList = data.message
          }
        })
    },
    //获取商品轮播图数据
    getGoodsInfoById(){
      this.$http
      .get(`/api/goods/getinfo/${this.$route.params.id}`)
      .then(res=>{
        const data=res.data
        if(data.status===0){
          this.info=data.message[0]  //只要不是列表就注意【0】，拿到一条准确的数据
        }
      })
    },
    //加入购物车
    addCart(){
    //  console.log(this.count);   
    // //因为是store已经在vue这里注册到了一起，所以能够直接调用方法
    // this.$store.commit('addCart',{id:this.$route.params.id-0,count:this.count})

    //调用actions,异步添加购物车中的商品数据  //用$store.dispatch来触发
        this.$store.dispatch('addCartAsync',{ id:this.$route.params.id-0,count:this.count})
     //动画0.6秒小球也需要走0.6秒
     // this.isShow=!this.isShow 上面是false 取反意思是true
      this.isShow=true
    },
    //飞舞的小球-动画
 // --------
  // 进入中
  // --------

  beforeEnter: function (el) { //el表示要执行动画效果的DOM对象
    // console.log('beforeEnter',el);
    //设置小球的初始位置
    el.style.transform='translate(0,0)' 
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  enter: function (el, done) {   //这里done不调用，afterEnter是不会走的
   
  //  console.log('enter');
    // el.offsetLeft //****window.pageYOffset触发浏览器的重绘与重排机制
//设置小球的结束位置
    el.style.transform='translate(87px,'+(window.pageYOffset+228)+'px)' //写了两个translate，要写el.offsetLeft
    this.isShow=false  //动画做完小球消失
    // done()   // ***注意此处的done函数调用后，后续的afterEnter钩子函数才会执行
  }
  // afterEnter: function (el) {
  //  console.log('afterEnter');
  // }

},
    //把子组件与父组件绑定起来
    components:{ NumberBox }

  }



</script>

<style lang="scss">
  .goods-info {
    position: relative;
  }

  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      text-align: center;

      img {
        height: 100%;
        // width: 100%;
      }
    }
  }

  .info {

    p {
      color: #000;

      .market-price {
        margin-right: 10px;
      }

      .sell-price {
        color: #f00;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .mui-numbox {
      height: 25px;
    }

    .numbox-container {
      margin-bottom: 10px;
    }

    .mint-button {
      font-size: 14px;
      height: 34px;
    }
  }

  .mui-card-footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
  }

  .ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #f00;
    position: absolute;
    z-index: 11;
    top: 352px;
    left: 152px;
    // top: 393px;
    // left: 151px;
    /* 通过 贝塞尔曲线 设置动画效果 */
    // http://cubic-bezier.com/#.41,1.84,.72,-1.12
    // transition: all 3s cubic-bezier(.41,1.84,.72,-1.12);
    transition: all 3s ease;
  }
</style>