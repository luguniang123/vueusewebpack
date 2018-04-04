<template>
  <div class="news-info">
    <h3 class="news-title">{{ info.title }}</h3>
    <p class="news_desc" >
      <span>发表时间：{{ info.add_time}}</span>
      <span>点击次数：{{ info.click }}次</span>
    </p>
    <!-- 内容区域 v-html动态生成页面内容-->
    <div class="content" v-html="info.content"></div>

    <!-- 评论组件 -->
    <!-- <div class="comment">
      <h3>发表评论</h3>
      <textarea name="" id="" cols="30" rows="10" placeholder="请输入评论内容"
      v-model="content"></textarea>
      <mt-button type="primary" size="large" @click="sendComment">发表评论</mt-button>
      <ul class="comment-list">
        <li class="comment-item" v-for="(item,i) in list" :key="i">
          <h5>
            <span>第{{i+1}}楼</span>
            <span>用户：{{item.user_name}}</span>
            <span>发表时间：{{ item.dd_time}}</span>
          </h5>
          <p>{{item.content}}</p>
        </li>
      </ul>
      <mt-button type="primary" plain size="large" @click="loadMore">加载更多</mt-button>
    </div> -->
    <!-- 作为子组件  父组件给他传值 从路由里面直接拿id 如果是自己的模板就用this-->
   <!-- 因为评论组件依赖于id,是需要根据id来获取评论数据的
   方法1 组件需要什么数据，就通过父子通讯机制来传递什么数据 
   组件直接依赖于父组件中的id值（不推荐）
   给组件传值的方式3 info.id 是异步的 问题：因为info数据是通过ajax请求拿到的数据，
   在渲染comment组件的时候，info的数据还没有拿到，所以info.id就是undefined
   办法：在数据拿到之后把isloaded换成true 再去给子组件传值-->
   <!-- <Comment :commentId="$route.params.id"></Comment> -->
    <Comment :commentId="info.id" v-if="isLoaded"></Comment>
     <!-- v-show如果是false（不展示元素），那么是通过dispaly:none来设置元素隐藏，html结构还在。
v-if如果是false（不展示元素，html的结构是不存在的 -->
  </div>
</template>

<script>

//1导入评论组件   2组件作为当前组件的子组件  3 Comment才能在这里使用<comment></comment> 并且传值给子组件
import Comment from '../common/Comment.vue'

export default {
  //钩子函数 一进页面就去发送请求
  created(){
    this.getNewsInfoById();//加载新闻详情
    // this.getCommentById(); //加载评论数据
  
  },
  data(){
    return{
      info:{}, //新闻详情
      // list:[], //评论列表数据
      //  pageIndex:1, //分页功能，表示当前加载第几页数据
      //  content:''   //评论框
      isLoaded:false //数据是否加载完成
} 
  },
  methods:{
    //根据id获取新闻详情 
    getNewsInfoById(){
      this.$http
      //-----------这里要写字符串模板--------------------------------------
        // .get(`/api/getnew/:newid`) 发ajax请求时，要拿到准确的id值通过$route.params.id来拿
        .get(`/api/getnew/${this.$route.params.id}`)
        .then(res=>{
          const data=res.data;
         // console.log(data);
          if(data.status===0){
            this.info=data.message[0]; 
             this.isLoaded=true         //注意*****是把第一条数据给到详情页
          }
        })
    }
//     getCommentById(){  //加载评论数据

//       this.$http
//         .get(`/api/getcomments/${this.$route.params.id}?pageindex=${this.pageIndex}`)
//         .then(res=>{
//           const data=res.data;
//             // console.log(data);
//           if(data.status===0){
//             // this.list=this.list.concat(data.message);  
//             //es6数组展开运算符
//            this.list=[...this.list,...data.message]
          
//            //es6数组展开运算符作用将数组转为用逗号分隔的参数序列
//           //  var arr=['a','b','c']
// //console.log(...arr);
// //上面代码相当于把所以的读取出来console.log(arr[0],arr[1],arr[2])
//           //  let arr= this.list;
//           // this.list=arr.push(data.message);
//           }
//         })
//     },
//   loadMore(){
//     this.pageIndex++;   //pageindex键 的值pageIndex++
//     this.getCommentById();  //调用方法加载下一页数据
//   },
//   sendComment(){  //发表评论
//     if(this.content.trim()==='') return
//       //axios发送post请求必须是content='content'& 的形式
//     this.$http   //this指向Vue的实例 这里要写上this.$http.post('/dizhi',参数)
//     .post(`/api/postcomment/${this.$route.params.id}`,`content=${this.content}`)
//     .then(res=>{
//       // console.log(res);
//       if(res.data.status===0){  //回复为0，说民成功，可以重新调接口，但是更好的是去缓存中拿到数据
//         this.list.unshift({  //在第一条前面插入
//           add_time:new Date,
//           content:this.content,
//           user_name:'匿名用户'
//         })
//         this.content=''; //清空评论信息

//       }
//     })
//   }
  },
  //2将Comment 组件作为当前组件的子组件  ES6语法键值一样可以省略
  components:{ Comment}
}
</script>

<style lang="scss">

// <-- 这里style标签里面是要写上lang="scss" 因为在webpack。config.js已经匹配过了转换-->
.news-info{
  padding: 5px;
  .news_desc{
    font-size: 12px;
    color:#26a2ff;
    // 一个往左一个往右
    display:flex;
    justify-content: space-between;
// 下划线
    border-bottom: 1px solid #ccc;
  }
  .news-title{
    font-size: 18px;
  }
  //img标签在上面没有，是动态生成的 所以在style标签中不能加scoped作用域只在当前作用域有效的限制
  //*******scoped对于动态生成的标签eg:v-html是不生效的，这里img在上面没写，如果写了scoped,就不生效了
  
  img{
    width: 100%;

  }
}
.content{
  border-bottom: 1px solid #ccc;
}
// .comment-list{
//   .comment-item{
//     h4{
//       display: flex;
//       justify-content: space-between;
//       height: 24px;
//       line-height: 24px;
//       background-color: #eee;
//       font-size: 14px;
//       font-weight: normal;
//     }
//     p{
//       color: #000;
//       padding: 5px 10px;
//     }
//   }

// }
// .comment{
//   h3{
//     margin-top: 20px;
//     }
// }
</style>
