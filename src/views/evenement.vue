<template>  <!-- code très proche de articles et workshop mais qui requête dans la collection evenements -->
    <div>
        <button @click="retourListe" id="retour">Retour</button>
        <div id="listeEvenement" v-if="!$store.state.evenement"> 
            <ul>
                <li v-for="item in AllEvenements" :key="item._id" @click="getOnEvenement(item._id)">
                    <img :src="srcImage(item.imgArticle[0])" alt="" width="200"/>
                    {{item.titre}}<br>
                    {{item.resume}}
                </li>
            </ul>
        </div>

        <div id="unEvenement" v-if="getEvenement" v-html="getEvenement">
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
        this.$store.commit('changeEvenement','')  // Je ne sais pas pourquoi mais il faut vider evenement dans le store pour qu'il considère bien qu'il est vide et qui'il affiche donc la liste
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
        getEvenement(){
            return this.$store.state.evenement.corps
        }
    },
}
</script>

<style scoped>
    ul{
        list-style-type : none;   
    }

    li>img{
        display: inline-block;
        margin-left: auto;
        margin-right: auto;
        max-height:150px;  /* Grâce à l'attribut width de la balise img, la photo est redimensionnée en gardant les proportions, max-height permet qu'elle ne puisse pas dépasser tout de même 150px de auteur même après redimensionnemnt */
        object-fit:cover  /*permet de couper la photo au lieu de l'aplatir si elle est redimensionnée */
    }
</style>