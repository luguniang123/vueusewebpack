//vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

console.log(JSON.parse(localStorage.getItem('cart')) || [])

//创建并返回store
export default new Vuex.Store({
    state: {
        //拿到存储在本地的数据
        cart: JSON.parse(localStorage.getItem('cart')) || []

        //数据
        // cart:[
        //     // { id:87,count:3},  //商品id 购买数量
        //     // { id:90,count:2}
        // ]
    },
    mutations: {
        //数据的方法
        addCart(state, payload) { //state拿到cart数据 实现数据双向绑定
           //payload表示调用这个方法者，他传递过来的参数  
            //payload:{ id:87,count:5}
            // state.cart.push({ id:payload.id,count:payload.count})
            //思路：1线判断要添加到购物车的数据是否存在在购物车中
            //如果购物车中不存在，直接push即可
            //如果购物车中存在，应该找到购物车中对应商品的count，再加上当前要添加商品的count
            console.log("购物车数量", state.cart)
            const temp = state.cart.filter(item => item.id === payload.id) //过滤数组中item.id===payload.id的值
            // filter:过滤 也会返回一个数组，如果在回调函数中返回true,这个返回的数组会收集那些返回true的元素，如果返回值是false,会被丢弃
            //    arr = arr.map(function (item) {
            //     return item + 10; 
            //   })
            // function 删掉 , ()后面加个 =>
            //   arr = arr.map( (item)=> {
            //     return item + 10; 
            //   })
            //   // 注意
            //   // 如果参数只有一个,可以省略小括号 
            //   // 如果{}代码只有1行,可以省略 {} 并且默认返回 return 
            //   arr = arr.map(item=> item + 10 )
            if (temp.length === 0) {
                state.cart.push({
                    id: payload.id,
                    count: payload.count
                })
            } else {
                //有
                temp[0].count += payload.count //temp[0]就是上面的cart里面的数据
                // var arr=[{id:87,count:3}]   arr.filter(item=>item.id===87) arr[0]               
            }
            localStorage.setItem('cart', JSON.stringify(state.cart)) //存储到本地
            /* //方法二 some() 方法的返回值：如果找到一项，也就是返回了true，那么some()方法的返回值就是true；否则， 就是false
                 const hasData = state.cart.some(item => {
                   if (item.id === payload.id) {
                     // 有
                     item.count += payload.count

                     // 找到元素，通过 返回true ，来停止循环
                     return true
                   }
                 })

                 // 购物车中没有对应的商品
                 if (!hasData) {
                   // 没有
                   state.cart.push({ id: payload.id, count: payload.count })
                 } */

        },
        //更新购物车数据的方法:只要购物车的数据发生变化，
        //就将最新的购物车数据更新到vuex的cart中
        // updateCart(state,payload){ //变量取名任意，但是里面代表的是一定的数据
        updateCart(state, newCart) { 
            // state.cart=newCart   //state拿到cart数据
            //payload表示调用这个方法者，他传递过来的参数 （变量取名任意）
            state.cart = newCart.map(item => ({
                id: item.id,   //es6语法：返回的是一个对象外面用括号来包裹
                count: item.count
            }))
        }
    },
//添加actions:封装异步操作
actions:{ //action里面写异步操作 有action，必须要有mutations在actions里面调用mutations方法  
 //   思路一点击加入购物侧，就调用异步延时操作，在延时操作里面调用mutations方法addCart需要传参数，就在context后面传goods，goods是前面goods/info.vue哪里传过来的当前商品的数据
    addCartAsync(context,goods){  //actions参数第一个是context可以理解为store,第二个参数应该是一个对象这里表示处理过后的商品对象
      setTimeout(()=>{
        context.commit('addCart',goods)   
//通过commit来触发上面的addCart()
      },600)
    }
  },
    //getters就是store的计算属性
    getters: {
        allCount(state) {
            let count = 0
            console.log("addlcount", state)
            state.cart.forEach(item => {
                count += item.count
            })
            return count
        },
        ids(state) { //根据购物车数据派生出88,90,92 id字符串

            return state.cart.map(item => item.id).join(',')

            //map方法会返回时true的数据的数组 .join之后就组合成了cart.vue里面的一个接口所需要的形式
            // state:Object
            // cart:Array[2]
            // 0:Object
            // count:5
            // id:87
            // 1:Object
            // count:9
            // id:88
        },
        //id和count的对应关系 说明现在cart中的数据，无法直接通过id来获取到对应的商品数量，
        //为了方便获取id对应的商品数量，我们从cart中派生出一个对象{88:6,90:3}
        id2Count(state) {
            const id2CountObj = {}
            state.cart.forEach(item => {
                id2CountObj[item.id] = item.count
            })
            return id2CountObj
        }
    }

})


//最后的逻辑是去修改底部的购物车的小圆点 写在了App.vue