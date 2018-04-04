import Vue from 'vue'
import moment from 'moment'
//日期过滤器
// 第一个参数过滤器的名称 
//第二个参数：是一个回调函数，当使用过滤器的时候，这个函数就会执行 
// Vue.filter('date',function(input,format="YYYY-MM-DD HH-mm-ss",arg2){  
Vue.filter('date',(input,format='YYYY-MM-DD HH:mm:ss')=>{
    return moment(input).format(format)
})