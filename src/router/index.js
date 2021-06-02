import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Articles from '../views/Articles.vue'
import Workshop from '../views/Workshop.vue'
import Galerie from '../views/Galerie.vue'
import Partenaire from '../views/Partenaire.vue'
import Connexion from '../views/Connexion.vue'
import testRegis from '../components/test.vue'
import MonEspace from '../views/MonEspace.vue'
import nouvelArticle from '../views/nouvelArticle'
import nouvelAdmin from '../views/nouvelAdmin'
import evenement from '../views/evenement'


Vue.use(VueRouter)   // utilisation du plugin VueRouter

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
  path: '/evenement',
  name: 'Evenement',
  component: evenement
  },
  {
    path: '/workshop',
    name: 'Workshop',
    component: Workshop
  },
  {
    path: '/galerie',
    name: 'Galerie',
    component: Galerie
  },
  {
    path: '/partenaire',
    name: 'Partenaire',
    component: Partenaire
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/test',
    name: 'Test',
    component: testRegis
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  /////////////////////////////////   Route d'admin 
  {
    path: '/monespace',
    name: 'MonEspace',
    component: MonEspace
  },
  {
    path: '/nouveladmin',
    name: 'nouvelAdmin',
    component: nouvelAdmin
  },
  {
    path: '/nouvelarticle',
    name: 'nouvelArticle',
    component: nouvelArticle
  },
]

const router = new VueRouter({
  routes
})

export default router
