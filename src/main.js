import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/style.css'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
