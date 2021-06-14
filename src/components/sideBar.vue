<template>
    <div id="sideBar">
        <div v-if="futureEvent" id="evnmtAVenir">
            <div class="titreSideBox">Evenement à venir</div>
            <ul>
                <li v-for="item in futureEvent" :key="item._id"  @click="loadOneEvenement(item._id)">
                    {{item.titre}}
                </li>
            </ul>
        </div>

        <div id="dernierArticle">
            <div class="titreSideBox">Derniers articles</div>
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
        }
    },
    methods: {
        loadOneArticle(id){
            this.http.get('http://localhost:3000/users/getOneArticle/'+id)
                .then((response) => {
                    this.$store.commit('changeArticle',response.data.article)
                    this.$router.push('/articles');  // Il faut aussi rajouter un push vers le router de articles au cas où l'utilisateur clique sur ce lien à partir d'une autre URL (par exemple, évènement)
                })
                .catch((erreur)=>
                    this.reponseServer = erreur.response.data.error.message) 
            },
        loadOneEvenement(id){
            this.http.get('http://localhost:3000/users/getOneEvenement/'+id)
                .then((response) => {
                    console.log(response.data.article)
                    this.$store.commit('changeEvenement',response.data.article)
                    this.$router.push('/evenement');
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
    grid-column-start: 2;
    grid-row-start: 2;
}

#dernierArticle, #evnmtAVenir{
    display: grid;
    border: 0.15px solid $orangeF;
    border-radius: 10px;
    width: 100%;
    margin-bottom: 2.5vh;
    .titreSideBox{
        display: flex;
        background-image: repeating-linear-gradient(45deg, rgba(208, 208, 208, 0.13) 0px, rgba(208, 208, 208, 0.13) 43px,rgba(195, 195, 195, 0.13) 43px, rgba(195, 195, 195, 0.13) 85px,rgba(41, 41, 41, 0.13) 85px, rgba(41, 41, 41, 0.13) 109px,rgba(88, 88, 88, 0.13) 109px, rgba(88, 88, 88, 0.13) 129px,rgba(24, 24, 24, 0.13) 129px, rgba(24, 24, 24, 0.13) 139px,rgba(92, 92, 92, 0.13) 139px, rgba(92, 92, 92, 0.13) 179px,rgba(37, 37, 37, 0.13) 179px, rgba(37, 37, 37, 0.13) 219px),repeating-linear-gradient(45deg, rgba(18, 18, 18, 0.13) 0px, rgba(18, 18, 18, 0.13) 13px,rgba(48, 48, 48, 0.13) 13px, rgba(48, 48, 48, 0.13) 61px,rgba(130, 130, 130, 0.13) 61px, rgba(130, 130, 130, 0.13) 84px,rgba(233, 233, 233, 0.13) 84px, rgba(233, 233, 233, 0.13) 109px,rgba(8, 8, 8, 0.13) 109px, rgba(8, 8, 8, 0.13) 143px,rgba(248, 248, 248, 0.13) 143px, rgba(248, 248, 248, 0.13) 173px,rgba(37, 37, 37, 0.13) 173px, rgba(37, 37, 37, 0.13) 188px),repeating-linear-gradient(45deg, rgba(3, 3, 3, 0.1) 0px, rgba(3, 3, 3, 0.1) 134px,rgba(82, 82, 82, 0.1) 134px, rgba(82, 82, 82, 0.1) 282px,rgba(220, 220, 220, 0.1) 282px, rgba(220, 220, 220, 0.1) 389px,rgba(173, 173, 173, 0.1) 389px, rgba(173, 173, 173, 0.1) 458px,rgba(109, 109, 109, 0.1) 458px, rgba(109, 109, 109, 0.1) 516px,rgba(240, 240, 240, 0.1) 516px, rgba(240, 240, 240, 0.1) 656px,rgba(205, 205, 205, 0.1) 656px, rgba(205, 205, 205, 0.1) 722px),linear-gradient(90deg, rgb(239,238,20),rgb(241, 95, 15));
        padding: 1rem;
        border-radius: 9px 9px 0px 0px;
        font-size: 1.5rem;
        width: 100%;
        height: 7vh;
        align-items: center;
    }
    ul{
        display: grid;
        padding: 1vh;
        list-style-type: none;
        align-items: center;
        li{
            text-decoration: none;
            padding: 1vh;
        }
        li:hover{
            background-image: linear-gradient(to left, rgba(248,172,27,0), rgba(248,172,27, 0.7));
            cursor: pointer;
        }
    }
}
</style>