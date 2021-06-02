import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)   // Cette ligne permet d'utiliser le plugin vuex que l'on a installé
// Vue.use permet d'ajouter une fonctionnalité globale à notre instance de vue

export default new Vuex.Store({
  state: {
    login: 'off'
  },
  mutations: {
    loginOk(state){
      state.login= 'on';
    }
  },
  actions: {
  },
  modules: {
  }
})
