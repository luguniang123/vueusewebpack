<template>
<!-- 整个可以写v-if 如果购物车为空，就不展示总价-->
  <div >
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cart" v-for="item in list" :key="item.id">
         <!-- mint ui提供的开关组件 switch-->
          <mt-switch v-model="item.selected"></mt-switch>
<!-- v-model="" -->
          <img :src="item.thumb_path" alt="">
          <div>
            <h2 data-v-0505f5cb="">
              {{ item.title}}</h2>
            <div data-v-0505f5cb="" class="info">
              <span data-v-0505f5cb="">￥{{ item.sell_price}}</span> 
            <!-- 在页面上用 子组件 -->
            <!-- vuex的cart存储了商品的id和商品的购买数量，因此，我们需要从vuex中根据商品id获取到购买商品数量 -->
             <!-- 将每个shan商品的数量通过v-model传递给组件，实现数据双向绑定 -->
             <NumberBox v-model="item.count"></NumberBox>
              <a @click.prevent="del(item.id)" href="#">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cart-buy">
          <div>
            <p>总计（不包含运费）</p>
            <p>已勾选商品&nbsp;
              <!-- 一共多少件 在vuex里面已经算好了也就是store -->
              <span>{{ $store.getters.allCount }}</span>&nbsp;件&nbsp;&nbsp;总价：
              <span>￥{{ totalPrice}}</span></p>
          </div>
          <div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入子组件
import NumberBox from '../common/NumberBox.vue'

export default{
  created(){
    this.getCartListByIds();
  },
  data(){
    return {
      list:[]

    }
  },
  //思路 开关和减和加 都会影响vuex中的cart中的数据这些都要去重新更新到 vuex 也就是store中
  watch:{
       list:{ //监视对象数据的变化 数组也是对象
        handler(curList){ //深度监听对象中每个属性变化的语法
          // console.log("list变了",curList);
          this.$store.commit('updateCart',curList.map(item=>{ //调用更新方法，传数据过去
              return {  //传的数据只要给结算页面 购买商品id 和购买商品数就行
                id:item.id,  //map返回数组，数组里面有对象
                count:item.count
              }
          }))
           
        },
        deep:true
      }
    
  },
  //计算商品价格
  computed:{
    totalPrice(){
      let total=0
      this.list.forEach(item=>{
        total+=item.count*item.sell_price
      })
      return total
    }
  },
  methods:{ //根据ids,来获取页面的数据
    getCartListByIds(){
  //     const ids=this.$store.getters.ids //调用index.js里面的ids方法
  //  //   console.log(ids); 去购物车挑选几件商品就可以打印拿到87,88
  //  const id2Count=this.$store.getters.id2Count
  //上面两句话的优化 es6中的解构
  const { ids,id2Count }=this.$store.getters //从getters对象中拿到ids,id2Count，并且分别生成两个变量
     if(ids==='') return //思路：如果不买，直接访问购物车，那么会报错，可以判断一下，如果为空，就return
     this.$http
        .get(`/api/goods/getshopcarlist/${ids}`)  //${ids}es6拼接字符串的语法
        .then(res=>{
          const data=res.data
          if(data.status===0){
              // this.list=data.message
              this.list=data.message.map(item=>{  //map方法返回一个**新数组，这个数组会收集每一次function的返回值
                return {
                  ...item,  //展开数组，也就是解构,es6中数组结构被纳入标准，但是对象结构没有，需要去.babelrc去添加stage-2,让babel编译
                  selected:true, //添加属性
                  count:id2Count[item.id]  //添加属性 属性值是从index.js也就是store（vuex）这里拿到的

//    list:Array[2]
// 0:Object
// cou:1
// id:87
// sell_price:2195
// thumb_path:"http://vue.studyit.io/upload/201504/20/thumb_201504200046589514.jpg"
// title:"华为（HUAWEI）荣耀6Plus 16G双4G版"
                }
              })  //选中zhu昂太是特有的一个数据，没有的数据，我们需要自己加上 
          }
        })
    },
    //删除商品  把上面的点击的当前的id传过来
    del(id){
      this.list.some((item,index,curList)=>{  //删除触发了watch,更新到cart里面，重新渲染数据
        if((item.id-0)===(id-0)){ 
           curList.splice(index,1)  //删除了这一条
            return true  
        }
      })
    }
  },
  //注册为自己的子组件
  components:{NumberBox }
}  
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 14px;
  }

  img {
    height: 60px;
  }

  span {
    color: #f00;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.cart-buy {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #f00;
  }
}
</style>
