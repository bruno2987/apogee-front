<template>
  <div id="navComposant">
    <div id="bandeau">
      <nav id="nav">
        <router-link to="/" id="navA">Accueil</router-link><p></p><p></p>  <!-- router-link se charge de la navigation en appelant les bonne routes contenues dans l'index de router -->
        <router-link to="/articles" id="navA" @click.native="videStoreArticle">Articles</router-link>  <!-- pour appeler une methode sur un router-link, il faut ajouter .native à la directive @click:  @click.native="maFonction"  au lieu de  @click="maFonction" -->
        <router-link to="/evenement" id="navA" @click.native="videStoreEvenement">Evenemnement</router-link><p></p><p></p>
        <router-link to="/workshop" id="navA" @click.native="videStoreWorkshop">Workshop</router-link>
        <router-link to="/galerie" id="navA">Galerie</router-link><p></p><p></p>
        <router-link to="/partenaire" id="navA">Partenaire</router-link>
        <router-link to="/about" id="navA">à propos de nous</router-link>
      </nav>
        <router-link v-if="$store.state.login === 'on'" to="/monespace" id="connect"><p>mon espace</p></router-link>
        <router-link v-if="$store.state.login === 'off'" to="/connexion" id="connect"><p>connexion</p></router-link>
    </div>
    <div id="logoEtConnect">
      <img id="logo" @click="goAccueil" src="@/assets/images/Logo_complet_Modifié.png" alt="logo" height="150" width="500">
    </div>
  </div>
</template>

<script>

export default {
    name: 'NavBar',
    methods: {
      videStoreArticle(){
        this.$store.commit('changeArticle','') // méthode pour vider article dans le store (cela permet de revenir à la liste)
      },
      videStoreEvenement(){
        this.$store.commit('changeEvenement','') // méthode pour vider article dans le store (cela permet de revenir à la liste)
      },
      videStoreWorkshop(){
        this.$store.commit('changeWorkshop','') // méthode pour vider article dans le store (cela permet de revenir à la liste)
      },
      goAccueil(){
        this.$router.push('/Accueil')
      }
    }
}
</script>

<style scoped lang="scss">

$orangeF: #922105;
$orangeC: #F65F03;
$jaune: #F8AC1B;

#navComposant{
  grid-column: 1/3;
  grid-row: 1/1;
  display: grid;
  grid-template-rows: 1fr 9fr;
}

#bandeau {
  grid-row: 1/2;
  grid-template-columns: 1fr 10fr 1fr;
  background-image: radial-gradient(circle at 23% 61%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 8%,transparent 8%, transparent 92%),radial-gradient(circle at 34% 3%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 8%,transparent 8%, transparent 92%),radial-gradient(circle at 10% 76%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 20% 80%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 48% 51%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 69% 29%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 34% 68%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),radial-gradient(circle at 22% 7%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),radial-gradient(circle at 15% 88%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),radial-gradient(circle at 14% 20%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),linear-gradient(135deg, rgb(212, 14, 0),rgb(223, 198, 37));
  display:grid;
  row-gap: 0.5rem;
  justify-content: center;
  padding: 0.2rem;
  margin: 0;
}

#logoEtConnect{
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
}

#logo {
  grid-column: 2/3;
  align-self: center;
  justify-self: center;
  cursor: pointer;
}

#connect{
  height: 1.4em;
  width: 5.5em;
  grid-column: 3/4;
  justify-self: right;
  text-decoration: none;

  border: solid 1px $orangeF;
  color: black;
  font-size: 20px;
  font-weight: 300;
  border-radius: 20px;
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  p{
    font-size: 0.8em;
  }
}

#connect:before {
  content: "";
  background-color: rgba(255, 255, 255, 0.3);
  height: 100%;
  width: 3em;
  position: absolute;
  top: 0;
  left: -4.5em;
  -webkit-filter: blur(3px);
  filter: blur(3px);
  -webkit-transform: skewX(-45deg) translateX(0);
  transform: skewX(-45deg) translateX(0);
  -webkit-transition: none;
  transition: none;
}
#connect:hover {
  background-color: $orangeC;
  color: black;
  border: solid 1px black;
}
#connect:hover:before {
  -webkit-transform: skewX(-45deg) translateX(18em);
  transform: skewX(-45deg) translateX(18em);
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;
}


nav {
  grid-column: 2/3;
  align-self: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;
  align-items: center;
  #navA {
  font-weight: bold;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 1.4rem;
    &.router-link-exact-active {
      color: black;
    }
  }
}

</style>