import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from'axios'
import store from './store'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)


//Dans la console, installer le plugin vueex pour le data store avec la commande "vue add vuex"

Vue.prototype.http=Axios;  // On fait un prototype: http correspond donc à l'import de axios (à peu de chose près!!!)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
