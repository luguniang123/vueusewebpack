<template>
   <!-- 评论组件 -->
    <div class="comment">
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
    </div>
</template>

<script>
import {  Toast  } from 'mint-ui'; //导入mint-ui的提示
export default {
    // props:['commentId'], //接收父组件中传递过来的id
   // Prop 验证
    props: {
        commentId:{
            type:  Number,  //props验证，如果不符合要求会报错
            required: true   //做一个props验证 https://cn.vuejs.org/v2/guide/components.html#Prop-验证         
        }
     
     
    },
  created() {
    this.getCommentById(); //加载评论数据

  },

  data() {
    return {
      list: [], //评论列表数据
      pageIndex: 1, //分页功能，表示当前加载第几页数据
      content: "" //评论框
    };
  },
  methods: {
    getCommentById() {
      //加载评论数据

      this.$http
        .get(
            `/api/getcomments/${this.commentId}?pageindex=${  
        //   `/api/getcomments/${this.$route.params.id}?pageindex=${
            this.pageIndex
          }`
        )
        .then(res => {
          const data = res.data;
          // console.log(data);
          if (data.status === 0) {
            // this.list=this.list.concat(data.message);
            //es6数组展开运算符
            this.list = [...this.list, ...data.message];

            //es6数组展开运算符作用将数组转为用逗号分隔的参数序列
            //  var arr=['a','b','c']
            //console.log(...arr);
            //上面代码相当于把所以的读取出来console.log(arr[0],arr[1],arr[2])
            //  let arr= this.list;
            // this.list=arr.push(data.message);
          }
        });
    },
    loadMore() {
      this.pageIndex++; //pageindex键 的值pageIndex++
      this.getCommentById(); //调用方法加载下一页数据
    },
    sendComment() {
      //发表评论
      if (this.content.trim() === "") return;
      //axios发送post请求必须是content='content'& 的形式
      this.$http //this指向Vue的实例 这里要写上this.$http.post('/dizhi',参数)
        .post(
          `/api/postcomment/${this.commentId}`,
          `content=${this.content}`
        )
        .then(res => {
          // console.log(res);
          if (res.data.status === 0) {
            //回复为0，说民成功，可以重新调接口，但是更好的是去缓存中拿到数据
            this.list.unshift({
              //在第一条前面插入
              add_time: new Date(),
              content: this.content,
              user_name: "匿名用户"
            });
            // Indicator.open('发表评论成功');  //mint-ui加载器
            // setTimeout(()=>{
            //   Indicator.close(); //关闭
            // })
            Toast({
              message: '发表成功',
           
              duration: 1000
            });
            this.content = ""; //清空评论信息
          }
        });
    }
  }
};
</script>

<style lang="scss" >
.comment-list {
  .comment-item {
    h4 {
      display: flex;
      justify-content: space-between;
      height: 24px;
      line-height: 24px;
      background-color: #eee;
      font-size: 14px;
      font-weight: normal;
    }
    p {
      color: #000;
      padding: 5px 10px;
    }
  }
}
.comment {
  h3 {
    margin-top: 20px;
  }
}
</style>
