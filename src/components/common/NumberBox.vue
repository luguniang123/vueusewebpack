<template>
  <div class="mui-numbox" >
  <button class="mui-btn mui-numbox-btn-minus" type="button" @click="minus">-</button>
  <input class="mui-numbox-input" type="number" v-model="numberCount"/>
  <button class="mui-btn mui-numbox-btn-plus" type="button" @click="plus">+</button>
</div>
</template>

<script>
//子组件去父组件里面注册

export default {
    //value表示购买数量 //total表示库存数量 通过v-model传递过来的数据，约定用value来接收
    //因为props的特点不能修改只能读取属性，所以把值给了自己的数据
    props:['value','total'],
    data(){
        return { 
            //现在
            numberCount:this.value  //把值给了自己的数据  通过v-model实现数据双向绑定

        }
    },
    watch:{  //对象
         numberCount(newVal){   //函数，记得里面也要写参数 newVal，oldVal也是固定的
             if(newVal>=this.total){  //最新的数值
                 this.numberCount=this.total  
             }else if(newVal<0){   
                 this.numberCount=0 
             }
             this.$emit('input',newVal-0)  //接收父组件传拿过来的方法input是通过v-model传递过来的方法，
             //子组件接收父组件传递过来的input方法（v-model自动指定的方法不用在父组件中声明）传给的是父组件的count
         }
    },
    methods:{
        //-
        minus(){
        //    console.log("-");
        if(this.numberCount <0) return
            this.numberCount--
        },
        //+
        plus(){
            // console.log('+');
            if(this.numberCount>=this.total) return
            this.numberCount++
        }
    }
    
}
</script>

<style scoped lang="scss">
.num-box {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 120px;
  height: 25px;
  padding: 0 40px 0 40px;
  vertical-align: top;
  vertical-align: middle;
  border: solid 1px #bbb;
  border-radius: 3px;
  background-color: #efeff4;

  [disabled] {
    color: #c0c0c0;
  }

  .num-btn {
    font-size: 18px;
    font-weight: normal;
    line-height: 100%;
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 40px;
    height: 100%;
    padding: 0;
    color: #555;
    border: none;
    border-radius: 0;
    background-color: #f9f9f9;
  }

  .num-btn-minus {
    left: 0;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .num-btn-plus {
    right: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .num-input-numbox {
    display: inline-block;
    overflow: hidden;
    width: 100% !important;
    height: 100%;
    margin: 0;
    padding: 0 3px !important;
    text-align: center;
    text-overflow: ellipsis;
    word-break: normal;
    border: none !important;
    border-right: solid 1px #ccc !important;
    border-left: solid 1px #ccc !important;
    border-radius: 0 !important;
  }
}
</style>

