<template>
  <div id="navComposant">
    <div id="bandeau">
      <router-link v-if="$store.state.login === 'on'" to="/monespace" id="connect"><p>mon espace</p></router-link>
      <router-link v-if="$store.state.login === 'off'" to="/connexion" id="connect"><p>connexion</p></router-link>
      <nav id="nav">
        <router-link to="/" id="navA">Accueil</router-link><p></p><p></p>  <!-- router-link se charge de la navigation en appelant les bonne routes contenues dans l'index de router -->
        <router-link to="/articles" id="navA" @click.native="videStoreArticle">Articles</router-link>  <!-- pour appeler une methode sur un router-link, il faut ajouter .native à la directive @click:  @click.native="maFonction"  au lieu de  @click="maFonction" -->
        <router-link to="/evenement" id="navA" @click.native="videStoreEvenement">Evenement</router-link><p></p><p></p>
        <router-link to="/workshop" id="navA" @click.native="videStoreWorkshop">Workshop</router-link>
        <router-link to="/galerie" id="navA">Galerie</router-link><p></p><p></p>
        <router-link to="/partenaire" id="navA">Partenaire</router-link>
      </nav>


      <button id="boutonHamburger" @click="afficheSideBar"><img src="@/assets/images/Hamburger.png" alt=""></button>
        <div id="hamburger-sideBar">
          <router-link to="/" id="navH">Accueil</router-link>
          <router-link to="/articles" id="navH" @click.native="videStoreArticle();cacheSideBar();">Articles</router-link>  
          <router-link to="/evenement" id="navH" @click.native="videStoreEvenement();cacheSideBar();">Evenement</router-link>
          <router-link to="/workshop" id="navH" @click.native="videStoreWorkshop();cacheSideBar();">Workshop</router-link>
          <router-link to="/galerie" id="navH" @click.native="cacheSideBar();">Galerie</router-link>
          <router-link to="/partenaire" id="navH">Partenaire</router-link>
          <router-link to="/about" id="navH">à propos de nous</router-link>
        </div>
        <div id="hamburger-overlay" @click="cacheSideBar" @keyup.esc="cacheSideBar"></div>
    </div>
    
  <img id="logo" @click="goAccueil" src="@/assets/images/Logo_complet_Modifié.png" alt="logo" height="150" width="500">
</div>
</template>

<script>

export default {
    name: 'NavBar',
    data () {
      return {
        
      }
    },
    methods: {
      afficheSideBar(){
        document.querySelector('#hamburger-sideBar').classList.add('hamburger-activated')
      },
      cacheSideBar(){
        document.querySelector('#hamburger-sideBar').classList.remove('hamburger-activated')
      },
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
  grid-auto-flow: column;
  width: 100%;
}

#bandeau {
  position: fixed;
  z-index: 4;
  width: 100%;
  background-image: radial-gradient(circle at 23% 61%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 8%,transparent 8%, transparent 92%),radial-gradient(circle at 34% 3%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 8%,transparent 8%, transparent 92%),radial-gradient(circle at 10% 76%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 20% 80%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 48% 51%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 69% 29%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 6%,transparent 6%, transparent 94%),radial-gradient(circle at 34% 68%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),radial-gradient(circle at 22% 7%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),radial-gradient(circle at 15% 88%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),radial-gradient(circle at 14% 20%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.04) 4%,transparent 4%, transparent 96%),linear-gradient(135deg, rgb(212, 14, 0),rgb(223, 198, 37));
  display:grid;
  justify-content: center;
  padding: 0.2rem 0rem 0.2rem 0rem;
  margin: 0;
}

#logo {
  grid-row: 2/3;
  align-self: center;
  justify-self: center;
  cursor: pointer;
}

#connect{
  height: 1.4em;
  width: 5.5em;
  text-decoration: none;
  position: absolute;
  right: 10px;
  top:10px;

  border: solid 1px $orangeF;
  color: black;
  font-size: 20px;
  font-weight: 300;
  border-radius: 20px;
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;

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

#boutonHamburger img{
  height: 3vh;
}
#boutonHamburger{
  display: none;
  position: fixed;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  top: 10px;
  left: 10px;
}
#hamburger-sideBar {
  position: fixed;
  width: 50%;
  z-index: 15;
  top:0;
  left: 0;
  display: grid;
  row-gap: 2vh;
  grid-auto-flow: row;
  grid-template: 1fr;
  background-color: brown;
  transform: translateX(-100%);
  transition: transform 0.2s ease-out;
}

#hamburger-overlay{
  position: fixed;
  display: none;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: rgba(221, 152, 61, 0.4);
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 1024px){
  #bandeau{
    position: fixed;
    height: 1vh;
    padding: 0;
  }

  #nav,#connect{
    display: none;
  }
  #boutonHamburger{
    display: block;
    position: fixed;
  }

  #logo{
    height: 15vh;
    width: auto;
  }

  #hamburger-sideBar.hamburger-activated+#hamburger-overlay{
    display: block;
  }

  .hamburger-activated#hamburger-sideBar{
    transform: translateX(0);
  }
}


</style>