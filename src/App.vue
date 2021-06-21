<template>
  <div id="app">
    <NavBar/>
    <SideBar class="contenuPage"/>
    <router-view class="contenuPage"/>  <!-- C'est là où on place la balise router-view que le composant charger par le router sera affiché -->
    <Footer/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/sideBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
  NavBar,
  SideBar,
  Footer,
  }
}
</script>

<style lang="scss">

*, ::before, ::after{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1.5rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(141, 44, 9);
  grid-template-rows: 300px 1fr 40px;
  grid-template-columns: 3.3fr 1fr;
  display: grid;
  justify-content: space-around;
  background-image:url("./assets/images/IMG_0210_multiTest.jpg");
  background-repeat:  no-repeat;
  background-size: auto;  // Pour que l'image de background s'adapte à la taille d'écran
  background-position: center;
  background-attachment: fixed;
  h1{
    font-size: 4vh;
  }
  h2{
    font-size: 3vh;
  }
  p{
    font-size: 2.5vh;
  }
}

.contenuPage{
  margin-top: 4.5vh;
  min-height: 100vh;
  width: 100%;
}

@media screen and (max-width: 1250px){
  #app{
      grid-template-columns: 1fr;
      grid-template-rows: 130px 1fr 20px;
  }
  #corpsArticle>p>img{
    max-width: 60vw;
    height: auto;
  }
  #corpsArticle>p>iframe{
  max-width: 70vw;
  max-height: 30vh;
  border:none
  }
}

#corpsArticle>p>iframe{
  border:none
}


</style>
