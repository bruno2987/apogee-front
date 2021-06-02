<template>
    <div>
        <button @click="retourListe" id="retour">Retour</button>
        <div id="listeArticle" v-if="!oneArticle">
            <ul>
                <li v-for="item in AllArticles" :key="item._id" @click="getOneArticle(item._id)">
                    <img style="display: inline-block; margin-left: auto; margin-right: auto;" :src="srcImage(item.imgArticle[0])" alt="" width="200"/>
                    {{item.titre}}<br>
                    {{item.resume}}
                </li>
            </ul>
        </div>

        <div id="unArticle" v-if="oneArticle" v-html="oneArticle.corps">
            {{oneArticle.titre}}
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            AllArticles: [],
            oneArticle:'',
        }
    },
    methods: {
        getOneArticle(id){
            this.http.get('http://localhost:3000/users/getOneArticle/'+id)
                .then((response) => {
                    this.oneArticle = response.data.article
                })
                .catch((erreur)=>
                    this.reponseServer = erreur.response.data.error.message)
        },
        srcImage(nameImg){
            return 'imgArticles/'+nameImg
        },
        retourListe(){
            this.oneArticle = ''
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
}
</script>

<style scoped>
    ul{
     list-style-type : none;   
    }
</style>