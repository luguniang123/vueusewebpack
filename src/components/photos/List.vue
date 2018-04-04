<template>
<div>
  <!-- 顶部横向滚动需要给外面设置top left -->
  <div class="mui-slider mui-fullscreen">
  <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
    <div class="mui-scroll" >
       <a class="mui-control-item mui-active" href="javascript:;" @click.prevent="getImages(0)">
           全部
        </a>
        <a href="#" class="mui-control-item" v-for="item in categoryList" :key='item.id' @click.prevent="getImages(item.id)">
            {{item.title}}
        </a>
    </div>
  </div>
</div>
 
 <!-- mui的问题：对mui-tab-item做了阻止跳转的代码  所以这是后点击底部菜单栏会出现不能跳转的问题 
 可以去源码注释掉这句话 也可以去App.vue去做编程式导航-->
  	<!-- 图片列表 -->
		<ul class="category-img-list">
      <li class="img-list-item" v-for="item in imageList" :key="item.id" 
      @click="goPhotoInfo(item.id)">
        <!-- 通过 mint-ui 中提供的 v-lazy 指令加给img的url，来实现**懒加载功能 -->
        <img  v-lazy="item.img_url" >
        <div>
          <h2>{{ item.title}}</h2>
          <p>{{ item.zhaiyao}}</p>
        </div>
      </li>
    </ul>

</div>
</template>

<script>
//导入mui.js
import mui from "../../lib/mui/js/mui.js";
//******注意导入mui****不是strict mode严格模式的，让babel不再去处理这个mui就可以，去webpack.config.js去添加exclude \lib

export default {
  //钩子函数 因为调用mui的代码需要操作dom,所以，应该在mounted这个钩子函数中调用mui代码

  mounted() {
    //初始化scroll控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //发送请求，获取数据 也可以在created钩子函数里进行
    this.getCategoryList();
    this.getImages(0); //获取全部图片数据  一进来就调用一次
  },
  data() {
    return {
      categoryList: [], //顶部横向滚动插件
      imageList: []
    };
  },
  methods: {
    //获取分类列表
    getCategoryList() {
      this.$http.get("/api/getimgcategory").then(res => {
        const data = res.data;
        console.log(data);
        if (data.status === 0) {
          this.categoryList = data.message;
        }
      });
    },
    //获取图片列表数据  //根据id获取分
    getImages( id=0 ) {  //复用方法 
      this.$http.get(`/api/getimages/${id}`).then(res => {
        const data = res.data;
     //   console.log(data);
        if (data.status === 0) {
          this.imageList = data.message;
        }
      });
    },
    //跳转到详情
    goPhotoInfo(id){    
      this.$router.push(`/home/photoinfo/${id}`)   //注意路由跳转 写上斜杠
    }
    
  }
};
</script>

<style lang="scss">
.mui-slider-indicator.mui-segmented-control {
  background-color: #fff;
}

.mui-fullscreen {
  position: fixed;
  top: 40px;
  height: 38px;
}

/* scroll滚动警告的处理方式参考：http://www.jianshu.com/p/baf61adc8667 */
* {
  touch-action: none;
}

.category-img-list {
  list-style: none;
  padding: 5px;

  .img-list-item {
    position: relative;
    margin-bottom: 5px;

    div {
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;

      h2 {
        font-size: 16px;
      }

      p {
        color: #fff;
        margin-bottom: 0px;
      }
    }

    // 图片懒加载过程中的样式  文档中写错了****应该是img
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
