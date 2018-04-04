<template>
  <div class="news-list">
    <!--在资料中赋值结构 file:day-06//mui/examples/hello-mui/examples/media-list.html -->
    <ul class="mui-table-view mui-table-view-chevron">
      <!-- 通过点击事件来做编程式导航 -->
				<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id" @click="goNewsInfo(item.id)">
					<a href="javascript:void(0);" class="mui-navigate-right">
            <!-- 注意属性用冒号 -->
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body ">
              
							<h4 class="mui-ellipsis news-title">{{item.title}}</h4>
							<p class="news_desc">
                <span>发表时间：{{ item.add_time | date }}</span>
                <span>点击次数：{{item.click}}次</span>
              </p>
						</div>
					</a>
				</li>
			
			</ul>
  </div>
</template>

<script>
export default {
//钩子函数 里面去发送去请求
created(){
//数据
this.getNewsList();
},
data(){
  return{
    list:[]
  }
},
//方法 调用ajax请求
methods:{
  //获取新闻列表数据
  getNewsList(){
    this.$http
    .get('api/getnewslist')
    .then(res=>{
      const data=res.data;
      console.log(data);
      if(data.status===0){
        this.list=data.message
      }
    })
  },
  goNewsInfo(id){
    console.log(id);
    //编程式导航 与router-link作用一样，区别使用场景。$router.push用于不能转换成a标签的地方比如li标签想跳转
    //router-link是把a标签换成router-link*****$router.push(路由地址) 有以下三种写法
    // this.$router.push('./home/newsinfo')
    // 因为有很多个路径，换一种方式，传对象
    // this.$router.push('/home/newsinfo'+id)
    // this.$router.push({ name:'newsinfo',params:{id:id}})
    //跳转的页面多个 只有一个li ${id}匹配多个 
    this.$router.push({ path:`/home/newsinfo/${id}`})
  }
}
}
</script>

<style lang="scss">
.news-title{
  font-weight: normal;
  font-size: 16px;
}
.news_desc{
  font-size: 12px;
  color:#26a2ff;
  // 一个往左一个往右
  display:flex;
  justify-content: space-between
}
.mui-table-view-chevron .mui-table-view-cell {
    padding-right: 54px;
}
.mui-table-view-cell {
    position: relative;
    overflow: hidden;
    padding: 11px 13px;
    -webkit-touch-callout: none;
}
</style>
