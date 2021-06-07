<template>
    <div>
        Mon espace
        <div id="navAdmin">
            <router-link to="/nouvelarticle" id="navA">Créer un nouvel article</router-link> <br>
            <router-link to="/nouveladmin" id="navA">Inscrire un nouvel administrateur</router-link> <br>
            <router-link to="/nouvelGalerie" id="navA">Ajouter une nouvelle galerie</router-link>
        </div>
    </div>
</template>


<style scoped lang="scss">

$orangeF: #922105;
$orangeC: #F65F03;
$jaune: #F8AC1B;

#navAdmin {
  grid-row: 2/2;
  grid-column: 1/4;
  align-self: center;
  #navA {
  font-weight: bold;
  color: $orangeF;
  text-decoration: none;
    &.router-link-exact-active {
      color: black;
    }
  }
}
</style>