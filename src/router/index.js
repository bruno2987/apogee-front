import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '../components/Accueil.vue'
import Articles from '../components/Articles.vue'
import Workshop from '../components/Workshop.vue'
import Galerie from '../components/Galerie.vue'
import Partenaire from '../components/Partenaire.vue'
import Connexion from '../components/Connexion.vue'
import testRegis from '../components/test.vue'
import MonEspace from '../components/MonEspace.vue'
import ListeContenuCreationModif from '../components/listeContenuCreationModif'
import nouvelAdmin from '../components/nouvelAdmin'
import evenement from '../components/evenement'
import nouvelGalerie from '../components/nouvelGalerie'

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
    component: Articles,
    props: true
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
    path: '/listeContenuCreationModif',
    name: 'listeContenuCreationModif',
    component: ListeContenuCreationModif
  },
  {
    path: '/nouvelGalerie',
    name: 'nouvelGalerie',
    component: nouvelGalerie
  },
]

const router = new VueRouter({
  routes
})

export default router
