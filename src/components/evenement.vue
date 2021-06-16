<template>  <!-- code très proche de articles et workshop mais qui requête dans la collection evenements -->
    <div>
        <button id="boutonRetour" v-if="getEvenementStored" @click="retourListe">Retour</button>
        <div id="listeEvenement" v-if="!$store.state.evenement"> 
            <div class="ligneArticle container topBotomBordersIn" v-for="item in AllEvenements" :key="item._id" @click="getOnEvenement(item._id)">
                <div class="contenuLigneArticle">
                    <h2>{{item.titre}}</h2>
                    <img :src="srcImage(item.imgArticle[0])" alt="" width="200"/>
                    <p id="resume">{{item.resume}}</p>
                </div>
            </div>
        </div>

        <div id="unEvenement" v-if="getEvenementStored" v-html="getEvenementStored">
        </div>
        
    </div>
</template>

<script>
export default {
    data () {
        return {
            AllEvenements: [],
        }
    },
    methods: {
        getOnEvenement(id){
            this.http.get('http://localhost:3000/users/getOneEvenement/'+id) 
                .then((response) => {
                    this.$store.commit('changeEvenement',response.data.article)
                })
                .catch((erreur)=>
                    console.log(erreur)
                    // this.reponseServer = erreur.response.data.error.message)
                )},

        srcImage(nameImg){
            return 'imgArticles/'+nameImg
        },
        retourListe(){
            this.$store.commit('changeEvenement','') 
        },
    },
    beforeCreate() {
        scrollTo(1,1)
        this.http.get('http://localhost:3000/users/getAllEvenements')
            .then((response) => 
            response.data.articles.forEach(element => {
                this.AllEvenements.push(element)
            })
            )
            .catch((erreur)=>
                this.reponseServer = erreur.response.data.error.message)
    },
    computed: {
        getEvenementStored(){
            return this.$store.state.evenement.corps
        }
    },
}
</script>

<style scoped lang="scss">
$orangeF: #922105;
$orangeC: #F65F03;
$jaune: #F8AC1B;

#listeEvenement{
    display: grid;
    row-gap: 5vh;
}

.ligneArticle{
    h2{
        grid-area: titre;
        text-align: center;
    }
    img{
        grid-area: image;
        max-height:25vh;  /* Grâce à l'attribut width de la balise img, la photo est redimensionnée en gardant les proportions, max-height permet qu'elle ne puisse pas dépasser tout de même 150px de auteur même après redimensionnemnt */
        object-fit:cover  /*permet de couper la photo au lieu de l'aplatir si elle est redimensionnée */
    }
    #resume{
        grid-area: resume;
        align-self: center;
    }
}


  #boutonRetour{
    height: 1.4em;
    width: 5.5em;
    grid-column: 1/1;
    grid-row: 1/1;
    justify-self: left;
    text-decoration: none;
    background-color: $orangeF;

    border: solid 1px $jaune;
    color: #fff;
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
  #boutonRetour:before {
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
  #boutonRetour:hover {
    background-color: rgb(223, 198, 37);
    color: black;
    border: solid 1px black;
  }
  #boutonRetour:hover:before {
    -webkit-transform: skewX(-45deg) translateX(18em);
    transform: skewX(-45deg) translateX(18em);
    -webkit-transition: all 0.7s ease-in-out;
    transition: all 0.7s ease-in-out;
  }

@media screen and (min-width: 1024px){
    .ligneArticle{
    display: grid;
    margin: 3vh;
    .contenuLigneArticle{
        display: grid;
        grid-template-areas: "titre titre titre"
                         "image resume resume";
        row-gap: 1vh;
        column-gap: 1vh;
        }
    }
//  Partie pour créer l'animation à la sélection des articles (elle n'est pas nécessaire sur un portable/tablette: C'est pourquoi elle est placé dans cette media query)
    div.topBotomBordersIn div::before,.ligneArticle.topBotomBordersIn div::after{
        position: absolute;
        left: 0px;
        width: 100%;
        height: 2px;
        background: $orangeF;
        content: "";
        opacity: 0;
        transition: all 0.3s;
    }
    div.topBotomBordersIn div:before{
        top: 0px;
        width: 100%;
        transform: translateY(-10px);
    }
    div.topBotomBordersIn div:after{
        bottom: 0px;
        width: 100%;
        transform: translateY(10px);
    }
    div.topBotomBordersIn div:hover:before,div.topBotomBordersIn div:hover:after{
        opacity: 1;
        width: 100%;
        transform: translateY(0px);
    }
    .ligneArticle.container{
        margin: 0 auto;
        padding: 10px 5px;
        width: 100vh;
    }
    .ligneArticle.container div{
        margin: 0px 10px;
        padding: 10px 10px;
        position: relative;
        z-index: 0;
        cursor: pointer;
    }
}

@media screen and (max-width: 1024px){
    .contenuLigneArticle{
      display: grid;
      grid-template-areas: "titre"
                         "image"
                         "resume";
      justify-items: center;
      #resume{
          padding: 2vw;
      }
    }
    .ligneArticle.container{
        width: 100%;
        margin: 0;
    }
}
</style>