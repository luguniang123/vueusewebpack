<template>
  <div>

     <mt-header fixed title="黑马程序员">
		 <!-- 返回上一页的写法 -->
        <a  slot="left" @click.prevent="$router.go(-1)" v-show="$route.path!=='/home'">
          <mt-button icon="back">返回</mt-button>
        </a>
     </mt-header>
     <!-- 头部和页脚是固定的，中间内容在哪里，router-view就在那里 -->
    <!-- 给内容区域统一给个margin-top -->
    <router-view class="content"></router-view>
<!-- day-06/资料/mui/examples/hello-mui/examples/icons.html（可以打开这个页面查看网络请求）有图标的类 还需要引入css、字体文件 -->
    <nav class="mui-bar mui-bar-tab">
			<!-- 写入口 to='/home' 匹配路由 -->
<!-- 给router-link（组件）绑定事件的时候，需要制定.native事件修饰符，此时单击事件才会生效，而普通的元素没有.native -->
			<router-link class="mui-tab-item " to="/home" @click.native="goPage('/home')">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link  class="mui-tab-item" to="/vip"  @click.native="goPage('/vip')">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link >
			<router-link  class="mui-tab-item" to="/cart"  @click.native="goPage('/cart')">
				<!-- 注意我们默认的样式mui-icon不能去掉 -->
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<!-- 访问计算属性 -->
					<span class="mui-badge">{{ $store.getters.allCount }}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link >
			<router-link  class="mui-tab-item" to="/search"  @click.native="goPage('/search')">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link >
		</nav>
  </div>
</template>

<script>
export default {
	created(){
		console.log(this.$route);
		// {name: undefined, meta: {…}, path: "/home", hash: "", query: {…}, …}
		//所以只要去判断依稀啊是不是/home,就知道现在是不是首页要不要展示返回按钮
	},
	methods:{
		goPage(path){
			console.log('触发');
			this.$router.push(path); //路由跳转-编程式路由跳转
			
		}
		// ,
		// getAllCount(){  
		// 	let count=0
		// 	this.$store.state.cart.forEach(item=>{
		// 		count+=item.count
		// 	})
		// 	return count
		// }
		
	}
	// ,
	//计算属性
		// 	computed:{
		// 		getAllCount(){
		// 			let count =0
		// 		this.$store.state.cart.forEach(item=>{  
		// 			//这是组件与组件通讯的方法，也就是状态管理 ，拿到加入购物车中的盒子里面的数据
		// 			count+=item.count
		// 			console.log(count);
		// 		})
		// 		return count
		// 	}
			
		// }
}
</script>

<style scoped>
/* scoped属性 ：添加改属性后，style中的样式只会对当前组件起作用
*/
.content{
	/* 因为是固定定位的，留一个位置 */
		margin-top: 40px;
		margin-bottom: 50px;
}
/* scroll滚动警告的处理方式参考：http://www.jianshu.com/p/baf61adc8667 */
* {
  touch-action: none;
}

</style>
