<template>
    <div id="unArticle">
        <h1>{{titre}}</h1>
        <div id="corpsArticle" v-html="corps"></div>
    </div>
</template>

<script>
export default {
    name:'Article',
    props: {
        workshopSent:{
            type: Object,
            required: true
        }
    },
    data () {
        return {
            titre:'',
            corps:''
        }
    },
    beforeMount(){
        this.titre = this.workshopSent.titre
        this.corps = this.workshopSent.corps
    }
}
</script>

<style scoped lang='scss'>

#unArticle{
    padding: 0vh 6.5vw 0vh 6.5vw;
}

@media screen and (max-width: 1024px){
    #unArticle{
        padding: 0vh 7.5vw 0vh 7.5vw;
    }
    #corpsArticle>p>img{
      max-width: 60vw;
      height: auto;
  }
}
</style>