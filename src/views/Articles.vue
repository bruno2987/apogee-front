<template>
    <div>
        <button @click="retourListe" id="retour">Retour</button>
        <div id="listeArticle" v-if="!$store.state.article"> <!-- La liste ne s'affiche que si l'attribut article dans le store (vuex) est vide. -->

                <div class="ligneArticle" v-for="item in AllArticles" :key="item._id" @click="getOneArticle(item._id)">
                    <h2>{{item.titre}}</h2>
                    <img :src="srcImage(item.imgArticle[0])" alt="" width="200"/>
                    <p>{{item.resume}}</p>
                </div>
        </div>


        <div id="unArticle" v-if="getArticle" v-html="getArticle"> <!-- Ne s'affiche que si l'attribut article du store contient un article -->
        </div>
        
    </div>
</template>

<script>
export default {
    data () {
        return {
            AllArticles: [],
        }
    },
    methods: {
        getOneArticle(id){
            this.http.get('http://localhost:3000/users/getOneArticle/'+id)  // Cette fonction permet de chercher l'article correspondant à l'id et de le mettre dans le store
                .then((response) => {
                    this.$store.commit('changeArticle',response.data.article)
                })
                .catch((erreur)=>
                    this.reponseServer = erreur.response.data.error.message)
        },

        srcImage(nameImg){
            return 'imgArticles/'+nameImg
        },
        retourListe(){
            this.$store.commit('changeArticle','')  // Pour retourner à la liste, il suffit de vider l'attribut article du store
        },
    },
    beforeCreate() {
        this.http.get('http://localhost:3000/users/getAllArticles')
            .then((response) => 
            response.data.articles.forEach(element => {
                this.AllArticles.push(element)
            })
            )
            .catch((erreur)=>
                this.reponseServer = erreur.response.data.error.message)
    },
    computed: {
        getArticle(){
            return this.$store.state.article.corps
        }
    },
}
</script>

<style scoped lang="scss">

#listeArticle{
    display: grid;
    row-gap: 0.5vh;
}

.ligneArticle{
    display: grid;
    margin: 3vh;
    row-gap: 1vh;
    column-gap: 1vh;
    grid-template-areas: "titre titre titre"
                         "image resume resume";
    h2{
        grid-area: titre;
    }
    img{
        grid-area: image;
        max-height:150px;  /* Grâce à l'attribut width de la balise img, la photo est redimensionnée en gardant les proportions, max-height permet qu'elle ne puisse pas dépasser tout de même 150px de auteur même après redimensionnemnt */
        object-fit:cover  /*permet de couper la photo au lieu de l'aplatir si elle est redimensionnée */
    }
}

</style>