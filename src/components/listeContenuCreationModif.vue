<template>
    <div id="menuNouveauContenu">
        <div v-if="!creation && !modification" id="selectionContenu">

            <button class="boutonOrange" @click="creation = true ; typeContenu='' ">Créer nouveau contenu</button>

            <p>Sélectionner le type de contenu à modifier</p>

            <div class="radioTypecontenu">
                <div id="artRad">
                    <div class="pRadio">
                        <input type="radio" for="article" name="typeContenu" value="article" v-model="typeContenu">
                        <label for="article">Article</label>
                    </div>
                </div>
                <div id="evenRad">
                    <div class="pRadio">
                        <input type="radio" for="evenement" name="typeContenu" value="evenement" v-model="typeContenu">
                        <label for="evenement">Evènement</label>
                    </div>
                </div>
                <div id="workRad">
                    <div class="pRadio">
                        <input type="radio" for="workshop" name="typeContenu" value="workshop" v-model="typeContenu">
                        <label for="workshop">Workshop</label>
                    </div>
                </div>         
            </div>
            <div id="listeContenu" v-if="typeContenu">
                <div id="legendtableau">
                    <p>Date de création</p> <p>Titre</p><p></p>
                </div>

                
                <div class="contenuParType" v-if="typeContenu === 'article'">
                    <div class="contenuInfos" v-for="item in article" :key="item._id"> 
                        <p>{{item.createdDate}}</p>
                        <p>{{item.titre}}</p>
                        <p class="modif" @click="modifyOneArticle(item._id)">Modifier</p>
                        <p class="modif" @click="deleteOneArticle(item._id)">Supprimer</p>
                    </div>
                </div>
                <div class="contenuParType" v-if="typeContenu === 'evenement'">
                    <div class="contenuInfos" v-for="item in evenement" :key="item._id">
                        <p>{{item.createdDate}}</p>
                        <p>{{item.titre}}</p>
                        <p class="modif" @click="modifyOneArticle(item._id)">Modifier</p>
                        <p class="modif" @click="deleteOneArticle(item._id)">Supprimer</p>
                    </div>
                </div>
                <div class="contenuParType" v-if="typeContenu === 'workshop'">
                    <div class="contenuInfos" v-for="item in workshop" :key="item._id">
                        <p>{{item.createdDate}}</p>
                        <p>{{item.titre}}</p>
                        <p class="modif" @click="modifyOneArticle(item._id)">Modifier</p>
                        <p class="modif" @click="deleteOneArticle(item._id)">Supprimer</p>
                    </div>
                </div>
            </div>

        </div>

        <NouveauContenu v-if="creation"/>

        <modifArticle v-if="modification" :contenuSent= typeContenu :objectSent = contenuToModify /> <!-- Attention: Pour pouvoir passre une donnée des datas via les props, il faut mettre un v-bind (ou :) devant le message envoyé -->

    </div>
</template>

<script>
import NouveauContenu from '@/components/nouveauContenu.vue'
import modifArticle from '@/components/modifArticle.vue'

export default {
    name: 'listeContenuCreationModif',
    components:{
        NouveauContenu,
        modifArticle
    },
    data: () => {
        return {
            creation:false,
            modification:false,
            typeContenu:'',
            article:'',
            workshop:'',
            evenement:'',
            contenuToModify:''
        }
    },
    methods: {
        modifyOneArticle(id){
            switch(this.typeContenu){
                case 'article':
                    this.http.get('http://localhost:3000/users/getOneArticle/'+id)
                        .then((response) => {
                            this.modification = true
                            this.contenuToModify = response.data.article
                        })
                        .catch((erreur)=>
                            console.log(erreur.response.data.error.message))
                        break;
                case 'workshop':
                    this.http.get('http://localhost:3000/users/getOneWorkshop/'+id)
                        .then((response) => {
                            this.modification = true
                            this.contenuToModify = response.data.article
                        })
                        .catch((erreur)=>
                            console.log(erreur.response.data.error.message))
                        break;
                case 'evenement':
                    this.http.get('http://localhost:3000/users/getOneEvenement/'+id)
                        .then((response) => {
                            this.modification = true
                            this.contenuToModify = response.data.article
                        })
                        .catch((erreur)=>
                            console.log(erreur.response.data.error.message))
                        break;                        
            }
        },
        deleteOneArticle(id){
                    this.http.post('http://localhost:3000/admin/articles/deleteOneArticle', {
                        typeContenu: this.typeContenu,
                        id: id
                    },
                    {headers: 
                        {Authorization: localStorage.token, userId: localStorage.userId}}
                    )
        }
    },
    beforeCreate() {
        this.http.get('http://localhost:3000/admin/getAllContentListe')
            .then((response) => {
                console.log(response.data)
                this.article = response.data.listeArticle
                this.workshop = response.data.listeWorkshop
                this.evenement = response.data.listeEvenement
            }
 
        )
    }
}
</script>

<style scoped lang="scss">

$orangeF: #922105;
$orangeC: #F65F03;
$jaune: #F8AC1B;

#selectionContenu{
    display: grid;
    row-gap: 2vh;
    justify-items: center;
}


.radioTypecontenu{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 60vh;
    height: 8vh;
    justify-content: space-around;
}

#artRad{
    display: flex;
    justify-content: center;
    align-items: center;
}

#workRad{
    display: flex;
    justify-content: center;
    align-items: center;
}

#evenRad{
    display: flex;
    justify-content: center;
    align-items: center;
}

.pRadio {    // Conteneur en position absolute pour pouvoir positionner le bouton radio et le label l'un sur l'autre
    position: absolute;
    align-self: center;
}

.pRadio>input[type="radio"]:not(:checked),
.pRadio>input[type="radio"]:checked {
	position: absolute;
    width: 100%;
	height: 100%;
    z-index: 2;
    opacity: 0;
}

.pRadio>input[type="radio"]+label{
	position: relative;
    display: inline-block;
	font-size: 1.05em;
    line-height: 100%;
    background-color: $jaune;
    padding: 0.3em;
    width: 6em;
    text-align: center;
    border-radius: 2em;
}

.pRadio>input[type="radio"]:checked + label{
	position: relative;
    display: inline-block;
	font-size: 1.05em;
    line-height: 100%;
    padding: 0.3em;
    width: 6em;
    background-color: $orangeF;
    color: white;
}

#listeContenu{
    justify-self: left;
    display: grid;
    #legendtableau{
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        border-bottom: 0.25rem solid $orangeF;
        align-items: center;
        padding: 1vh;
        font-size: 2.7vh;
        font-weight: bold;
        background-color: rgba(248,172,27, 0.4);
        border-radius: 10px 0px 10px 0px
    }
}

.contenuParType{
    display: grid;
}

.contenuInfos{
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-content: center;
    border-bottom: 1px solid $orangeF;
    p{
        padding: 1.5vh;
    }
}

.modif{
    text-decoration: underline;
}
.modif:hover{
    text-decoration: none;
    color:black;
    font-weight: 10px;
    cursor: pointer;
}

.boutonOrange{
  height: 2.6em;
  width: 9em;
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
.boutonOrange:before {
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
.boutonOrange:hover {
  background-color: rgb(223, 198, 37);
  color: black;
  border: solid 1px black;
}
.boutonOrange:hover:before {
  -webkit-transform: skewX(-45deg) translateX(18em);
  transform: skewX(-45deg) translateX(18em);
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;
}
</style>