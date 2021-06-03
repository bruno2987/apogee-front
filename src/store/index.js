import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)   // Cette ligne permet d'utiliser le plugin vuex que l'on a installé
// Vue.use permet d'ajouter une fonctionnalité globale à notre instance de vue

export default new Vuex.Store({
  state: {
    login: 'off',
    article: Object,
    evenement: Object,
    workshop: Object
  },
  mutations: {
    loginOk(state){
      state.login= 'on';
    },
    changeArticle(state, article){
      state.article = article
    },
    changeEvenement(state, evenement){
      state.evenement = evenement
    },
    changeWorkshop(state, workshop){
      state.workshop = workshop
    }
  },
  actions: {
  },
  modules: {
  }
})
