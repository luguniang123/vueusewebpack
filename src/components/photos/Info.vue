<template>
  <div class="photo-info">
    <header>
      <h2 class="title">55</h2>
      <p class="mui-ellipsis">
        <span>发表时间：1</span>
        <span>点击次数：1次</span>
      </p>
    </header>
    <div class="thumb-img">
      <!-- <img :src="item.src" height="100" class="preview-img" v-for="(item,i) in list" :key="i"> -->
<!-- 图片已经没用了，现在已经变成组件了 -->
<!-- 注意slides现在已经是list -->
    
    </div>
    <div class="content" ></div>

  </div>
</template>

<script>

export default {
  created() {
    this.getGoodsImgs();
  
  },
  data() {
    return {
     imgList:[]  //商品轮播图数组
    };
  },
  methods: {
    //获取商品轮播图数据
   getGoodsImgs(){
     this.$http
      .get(`/api/getthumimages/${this.$route.params.id}`)
      .then(res=>{
        const data=res.data
        if(data.status===0){
          this.imgList=data.message
        }
      })
   }


}

}
  
</script>

<style lang="scss">
.photo-info {
  padding-left: 3px;
  padding-right: 3px;
  padding-top: 10px;

  .thumb-img {
    border-top: 1px solid #ccc;
    .my-gallery{
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      figure{
        margin:0;
      }
    }
figure{
   img {
      margin: 9px;
      box-shadow: 0 0 15px #ccc;  //需要把图片阴影限定一下，否则会影响到缩略图
      width: 100px;
      height: 100px;  

    }
}
   
  }

  .title {
    font-size: 18px;
    color: #26a2ff;
    text-align: center;
  }

  .mui-ellipsis {
    display: flex;
    justify-content: space-between;
    padding: 0 3px;
  }

  .content {
    font-size: 14px;
    line-height: 28px;
    padding-top: 20px;
  }
}

</style>
