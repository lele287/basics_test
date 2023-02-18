import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from './http'
import store from './store'
import VuePhotoZoomPro from "vue-photo-zoom-pro";
Vue.use(VuePhotoZoomPro);

// axios.interceptors.request.use(config => {
//   console.log('http发出请求了！')
//    return config
// })
// axios.interceptors.response.use(config => {
//   console.log('http响应了！')
//    return config
// })

let eventBus = new Vue()              //创建事件总线对象
Vue.prototype.$eventBus = eventBus    //把事件总线对象注册为全局成员
// axios.interceptors.request.use(config => {
//   console.log('http发出请求了！')
//    return config
// })
// axios.interceptors.response.use(config => {
//   console.log('http响应了！')
//    return config
// })
router.afterEach((to,from,next) => {
  window.scrollTo(0,0); //切换路由之后滚动条始终在最顶部
});
Vue.prototype.$axios = axios //将axios设置为Vue对象的属性成员
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
