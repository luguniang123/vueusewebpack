<template>
 <div class="goods-list">
    <ul>
      <li class="goods-item" v-for="item in list" :key="item.id" @click="goGoodsInfo(item.id)">
        <img :src="item.img_url" :alt="item.title">
        <h2>{{ item.title }}</h2>
        <div>
          <span class="price-cur">￥{{ item.sell_price}}</span>
          <span class="price-prev">￥{{ item.market_price}}</span>
        </div>
        <p>
          <span>热卖中</span>
          <span>剩余{{ item.stock_quantity}}件</span>
        </p>
      </li>
    </ul>

    <!-- 加载更多 -->
    <mt-button plain size="large" type="primary" @click="loadMore" v-if="hasMore">加载更多</mt-button>
    <p class="has-more" v-else>亲，没有更多商品了~</p>
  </div>
</template>

<script>
export default{
   created(){
       this.getGoods();
   },
   data(){
       return{
           list:[], //商品类表数据
           pageIndex:1,
           hasMore:true //是否还有更多数据
         
       }
   },
   methods:{
       getGoods(){
           this.$http
           .get(`/api/getgoods?pageindex=${this.pageIndex}`)
           .then(res=>{
               const data=res.data
               console.log(data);
               if(data.status===0){
                   this.list=[...this.list,...data.message]  //从后台拿到的数据，点击更多时候可以复用，这里是每一次点击拿到更多的数据，以便去渲染

                if(data.message.length<10){
                  this.hasMore=false
                }
               }
           })
       },
       //加载更多
       loadMore(){
         this.pageIndex++
         this.getGoods()
       },
       goGoodsInfo(id){  //调用函数，一定要写形参，里面有一个参数
         this.$router.push(`/home/goodsinfo/${id}`)  
       }
   }
}
</script>

<style lang="scss">
  .goods-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .goods-item {
      width: 48%;
      margin: 1%;
      padding: 3px;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px #ccc;

      h2 {
        font-size: 14px;

        height: 32px;
        overflow: hidden;
        line-height: 16px;
        margin-bottom: 5px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      div {
        font-size: 14px;
        margin-top: 5px;

        .price-cur {
          color: #f00;
          margin-right: 10px;
        }
        .price-prev {
          text-decoration: line-through;
          color: #ccc;
        }
      }

      img {
        width: 100%;
      }

      p {
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 0 3px;
        color: #ccc;
      }
    }

    .has-more {
      padding: 10px;
      text-align: center;
    }
  }
</style>

