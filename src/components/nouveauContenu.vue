<template>
    <div id="nouveauContenu">
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
        

            <div id="titre">
                <label for="titre">Titre de l'article</label><br>
                <textarea v-model="titre"></textarea>
            </div>

        <div v-if="typeContenu == 'evenement' || typeContenu == 'workshop'" class="infoWorkEvnmt">
            
            <div id="date">
                <label for="date time">Date/heure de l'évènement</label>
                <input type="date" v-model="dateEvnmt">
                <input type="time" v-model="heureEvnmt">
            </div>
            <div id="lieu">
                <p>Adresse du lieu</p>

                    <label id="labvoie" for="nVoie">N° et Voie</label>
                    <input id="voie" type="text" v-model="nVoie">

                    <label for="commune">Commune</label>
                    <input type="text" v-model="commune">

                    <label for="zip">Code postal</label>
                    <input type="text" v-model="zip" style="width:3rem">

                    <label for="descr">Description du lieu</label>
                    <input id="descrAdresse" type="text" v-model="description">

            </div>
            <div id="nbrPlace" v-if="typeContenu == 'workshop'">
                <label for="nbrPlace">Nombre de places</label>
                <input style="width: 3rem; height:2rem" type="number" v-model="nbrPlace">
            </div>
        </div>

        <div id="resume">
            <label v-if="typeContenu" for="resume"> Résumé de l'article (texte qui apparaitra dans la liste des articles)</label>
            <textarea v-if="typeContenu" id="inputResume" type="text" v-model="resume" @keyup="limiteCaract"></textarea>
                <div v-if="typeContenu" id="compteurResume">
                    <p v-if="compteur => 0 ">Nombre restant de caratères</p>
                    {{compteur}} / 350
                    <p v-if="compteur <0 ">limite de caratères dépassée</p>
                </div> 
        </div>
        <div id="editeurTiny">
            <editor v-if="typeContenu" v-model="article"
            api-key="f2na22if0yp1uudnrn56wom5dqwhc8s59ru7awdfk79k6fgm"
            :init="tinymceInit"
        />
        </div>

        <button id="butonnRecord" v-if="typeContenu" @click="record">enregistrer</button>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'nouvelArticle',
    components: {
        editor: Editor,
    },
    data () {
        return {
            recordedOrNot: false,

            article:'',
            titre:'',
            resume:'',
            dateEvnmt:'',
            heureEvnmt:'',
            typeContenu:'',
            nbrPlace:'',

            nVoie:'',
            commune:'',
            zip:'',
            description:'',

            tinymceInit: {
                height: 900,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor forecolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | link image media | help',
                  automatic_uploads: true,
                  file_picker_types: 'image',
                  images_upload_url: 'http://localhost:3000/admin/articles/uploadImg',
       }
        }
    },
    computed: {
        compteur() {
           return 350 - this.resume.length
        }
    },
    methods: {
        record: function(){
            switch(this.typeContenu){
                case 'article':
                    this.http.post('http://localhost:3000/admin/articles/recordArticle',{
                        typeContenu: this.typeContenu,
                        corps: this.article,
                        titre: this.titre,
                        resume: this.resume,
                        dateEvnmt: this.dateEvnmt,
                        heureEvnmt: this.heureEvnmt
                        },
                        {headers: 
                            {Authorization: localStorage.token, userId: localStorage.userId}}
                        )
                    this.recordedOrNot = true
                    this.$router.push('/monespace');
                    break;
                case 'evenement':
                    this.http.post('http://localhost:3000/admin/articles/recordArticle',{
                        typeContenu: this.typeContenu,
                        corps: this.article,
                        titre: this.titre,
                        resume: this.resume,
                        dateEvnmt: this.dateEvnmt,
                        heureEvnmt: this.heureEvnmt,
                        nVoie: this.nVoie,
                        commune: this.commune,
                        zip: this.zip,
                        description: this.description,
                        },
                        {headers:
                            {Authorization: localStorage.token, userId: localStorage.userId}}
                        )
                    this.recordedOrNot = true
                    this.$router.push('/monespace');
                    break;
                case 'workshop':
                    this.http.post('http://localhost:3000/admin/articles/recordArticle',{
                        typeContenu: this.typeContenu,
                        corps: this.article,
                        titre: this.titre,
                        resume: this.resume,
                        dateEvnmt: this.dateEvnmt,
                        heureEvnmt: this.heureEvnmt,
                        nbrPlace: this.nbrPlace,
                        nVoie: this.nVoie,
                        commune: this.commune,
                        zip: this.zip,
                        description: this.description,
                        },
                        {headers:
                            {Authorization: localStorage.token, userId: localStorage.userId}}
                        )
                    this.recordedOrNot = true
                    this.$router.push('/monespace');
                    break;
            }
        },
        limiteCaract: function(){
            if(this.compteur < 0){
                document.getElementById('compteurResume').style.border = "solid 2px red"
            } else {
                document.getElementById('compteurResume').style.border = "none"
            }
        }
    },
    beforeDestroy() {
        if (this.recordedOrNot == false){
                this.http.post('http://localhost:3000/admin/articles/deleteArticleImg')
            }

    }
}
</script>

<style scoped lang="scss">

$orangeF: #922105;
$orangeC: #F65F03;
$jaune: #F8AC1B;

#nouveauContenu{
    display: grid;
    grid-row: 2/3;
    grid-column: 1/2;
    grid-template-rows: 5rem 5rem;
    row-gap: 2rem;
}

.radioTypecontenu{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr ;
    width: 60vh;
    justify-content: space-around;
    justify-self: center;
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

.infoWorkEvnmt{
    display: grid;
    align-items: center;
    justify-items: center;
    column-gap: 0.5rem;
    background-color: $jaune;
    border: $orangeF 1.5px solid;
    border-radius: 1rem;
    padding: 1.5rem;
    row-gap: 1.5rem;
}

#lieu{
    display: grid;
    grid-template-areas: "titre titre titre titre"
                        "labvoie voie voie voie"
                        "labcommune commune labzip zip"
                        "labdescr descr descr descr"
                        "vide descr descr descr";
    width: 60vh;
    row-gap: 0.5rem;
    column-gap: 0.5rem;
}

#date{
    grid-column-start: 1;
    display: grid;
    justify-items: center;
}

#lieu{
    grid-column-start: 2;
    grid-row: 1/3;
}

#lieu>p{
    grid-area: titre;
    justify-self: center;
}

#labvoie{
    grid-area: labvoie;
}
#voie{
    grid-area: voie;
}

#descrAdresse{
    grid-area: descr;
}

#nbrPlace{
    background-color: $orangeC;
    display: grid;
    justify-items: center;
    align-items: center;
    padding: 0.5rem;
    border: black 1px solid;
    border-radius: 0.6rem;
}

#titre{
    justify-self: center;
    text-align: center;
}
#titre>textarea{
    width: 40rem;
}

#resume{
    justify-self: center;
    align-self: center;
}

#inputResume {
    height: 7em;
    width: 80vh;
    display: flex;
    align-self: center;
}

#editeurTiny{
    height: 60rem;
}

#butonnRecord{
    height: 3rem;
}


</style>

