<template>
    <div id="sideBar">
        <div id="evnmtAVenir">
            <ul>
                <li v-for="item in futureEvent" :key="item._id">
                    {{item.titre}}
                </li>
            </ul>
        </div>

        <div id="dernierArticle">
            <ul>
                <li v-for="item in sixArticle" :key="item._id" @click="loadOneArticle(item._id)">
                    {{item.titre}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            sixArticle: [],
            futureEvent:[],
            message:'',
            ArticleSelect:''
        }
    },
    methods: {
        loadOneArticle(id){
            this.http.get('http://localhost:3000/users/getOneArticle/'+id)
                .then((response) => {
                    this.$store.commit('changeArticle',response.data.article)
                    this.ArticleSelect = response.data.article,
                    console.log(this.ArticleSelect)
                })
                .catch((erreur)=>
                    this.reponseServer = erreur.response.data.error.message) 
            }
    },  
    beforeCreate(){
        this.http.get('http://localhost:3000/users/getsixLastArticles')
            .then((response)=>
            response.data.articles.forEach(element => {
                this.sixArticle.push(element)
            })
            )
            .catch((erreur)=>
            console.log(erreur.response.data.error.message))

        this.http.get('http://localhost:3000/users/getFutureEvent')
            .then((response)=>
            response.data.articles.forEach(element => {
                this.futureEvent.push(element)
            })
            )
            .catch((erreur)=>
            console.log(erreur.response.data.error.message))
    }
}
</script>

<style scoped lang="scss">

$orangeF: #922105;
$orangeC: #F65F03;
$jaune: #F8AC1B;

#sideBar {
    border: 1px solid black;
    grid-column: 2/3;
    grid-row: 2/3;
}
</style>