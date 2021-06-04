<template>
  <div id="app">
    <NavBar/>
    <SideBar class="contenuPage"/>
    <router-view class="contenuPage"/>  <!-- C'est là où on place la balise router-view que le composant charger par le router sera affiché -->
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/sideBar.vue'

export default {
  components: {
  NavBar,
  SideBar
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
  row-gap: 1ch;
  display: grid;
  justify-content: space-around;
  background-image:url("./assets/images/IMG_0210_multiTest.jpg");
  background-repeat:  no-repeat;
  background-position: center;
  background-attachment: fixed;
}

.contenuPage{
  margin: 40px;
}


</style>
