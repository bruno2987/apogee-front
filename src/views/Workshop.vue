<template>  <!-- code très proche de articles et evenements mais qui requête dans la collection workshops -->
    <div>
        <button @click="retourListe" id="retour">Retour</button>
        <div id="listeWorkshops" v-if="!$store.state.workshop"> 
            <ul>
                <li v-for="item in AllWorkshops" :key="item._id" @click="getOnWorkshop(item._id)">
                    <img :src="srcImage(item.imgArticle[0])" alt="" width="200"/>
                    {{item.titre}}<br>
                    {{item.resume}}
                </li>
            </ul>
        </div>

        <div id="unWorkshop" v-if="getWorkshop" v-html="getWorkshop">
        </div>
        
    </div>
</template>

<script>
export default {
    data () {
        return {
            AllWorkshops: [],
        }
    },
    methods: {
        getOnWorkshop(id){
            this.http.get('http://localhost:3000/users/getOneWorkshop/'+id) 
                .then((response) => {
                    this.$store.commit('changeWorkshop',response.data.article)
                })
                .catch((erreur)=>
                    console.log(erreur)
                    // this.reponseServer = erreur.response.data.error.message)
                )},

        srcImage(nameImg){
            return 'imgArticles/'+nameImg
        },
        retourListe(){
            this.$store.commit('changeWorkshop','') 
        },
    },
    beforeCreate() {
        this.$store.commit('changeWorkshop','')  // Je ne sais pas pourquoi mais il faut vider evenement dans le store pour qu'il considère bien qu'il est vide et qui'il affiche donc la liste
        this.http.get('http://localhost:3000/users/getAllWorkshops')
            .then((response) => 
            response.data.articles.forEach(element => {
                this.AllWorkshops.push(element)
            })
            )
            .catch((erreur)=>
                this.reponseServer = erreur.response.data.error.message)
    },
    computed: {
        getWorkshop(){
            return this.$store.state.workshop.corps
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