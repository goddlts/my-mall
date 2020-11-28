import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import myaxios from './plugins/myaxios'
import dayjs from 'dayjs'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.css'

// 注册ElementUI 这个插件（类似于VueRouter的使用）
Vue.use(ElementUI)
// 注册自己写的myaxios插件
Vue.use(myaxios)
// 格式化日期的过滤器
Vue.filter('fmtDate', function (date, formatString) {
  return dayjs(date).format(formatString)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
