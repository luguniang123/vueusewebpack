<template>
  <div class="home">
    <!-- 轮播图 mint-ui 中swipper http://mint-ui.github.io/docs/#/en2/swipe-->
    <mt-swipe :auto="4000" class="home_swipe">  
    <!-- 遍历 -->
      <mt-swipe-item v-for="(item,i) in list" :key="i">
        <img :src="item.img" :alt="item.url">
      </mt-swipe-item>
    </mt-swipe>
<!-- day-06\资料\mui\examples\hello-mui\examples/grid-default.html -->
  <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <!-- 这里用**路由匹配方式去跳转 router-link在页面上就是会自动转换为a标签 -->
                  <!-- 这里有一个****精确匹配与模糊匹配的问题，不写精确匹配就模糊匹配，只要路径带着斜线/home,就会有高亮 -->
                  <router-link to="/home/news">
		                    <span class="mui-icon "></span>
		                    <div class="mui-media-body">新闻咨询</div>
                  </router-link>
                </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <router-link to="/home/photos">
		                    <span class="mui-icon "></span>
		                    <div class="mui-media-body">图片分享</div>
                  </router-link>
                </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <router-link to="/home/goods">
		                    <span class="mui-icon"></span>
		                    <div class="mui-media-body">商品购买</div>
                  </router-link>
                  </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <router-link to="#">
		                    <span class="mui-icon "></span>
		                    <div class="mui-media-body">留言反馈</div>
                  </router-link>
                </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <router-link to="#">
		                    <span class="mui-icon "></span>
		                    <div class="mui-media-body">视频专区</div>
                  </router-link>
                </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <router-link to="#">
		                    <span class="mui-icon "></span>
		                    <div class="mui-media-body">联系我们</div>
                  </router-link>
                </li>
		        </ul>
  </div>

</template>

<script>
// import axios from 'axios'  //把请求数据放到公共的地方main.js

export default {
  //因为一进入页面就要拿到数据，所有需要在created钩子函数中发送ajax请求获取数据
  //安装npm i -S axios //导入axios
  created() {
    this.getLunbo();
  },
  data() {
    return {
      list: [] //轮播图数组
    };
  },
  methods: {
    //获取轮播图数据
    getLunbo() {
      //将方法放到都放到这里来，上面调用
      // axios
      this.$http.get("api/getlunbo").then(res => {
      //  console.log(res.data);
        const data = res.data;
        if (data.status === 0) {
          this.list = data.message; //把数组给到list
        }
      });
    }
  }
};
</script>

<style lang="scss">
.home_swipe {
  height: 180px;
  img {
    width: 100%;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
  .mui-grid-view {
    border: none;
  }
  //  公共的抽出来
  .mui-icon {
    height: 60px;
    width: 60px;
    background-size: cover;
  }
  li:nth-child(1) .mui-icon {
    background-image: url(../assets/images/menu1.png);
  }
  li:nth-child(2) .mui-icon {
    background-image: url(../assets/images/menu2.png);
  }
  li:nth-child(3) .mui-icon {
    background-image: url(../assets/images/menu3.png);
  }
  li:nth-child(4) .mui-icon {
    background-image: url(../assets/images/menu4.png);
  }
  li:nth-child(5) .mui-icon {
    background-image: url(../assets/images/menu5.png);
  }
  li:nth-child(6) .mui-icon {
    background-image: url(../assets/images/menu6.png);
  }
}
</style>
