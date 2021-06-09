<template>
    <div>
        <button @click="displayFormAlbum = true , message=''">Créer un nouvel album</button>
        <h3 v-if="message" style="color: green">{{message}}</h3>
        <label v-if="displayFormAlbum" for="titre">Titre de l'album</label>
        <input v-if="displayFormAlbum" type="text" v-model="titre" name="titre">
        <UploadImages v-if="displayFormAlbum" @change="handleImages"/>
        <button v-if="titre && images" @click="sendToServer">envoyer</button>
    </div>
</template>

<script>
import UploadImages from "vue-upload-drop-images";

export default {
    name: 'nouvelGalerie',
    components: {
        UploadImages,
    },
    data() {
        return {
            titre:'',
            images:'',
            formToSend:new FormData(),
            message:'',
            displayFormAlbum:false
        }
    },
    methods: {
        handleImages(files) {
            this.images = files
        },
        sendToServer(){
            this.images.forEach(element => {
                this.formToSend.append('file',element)
            })
            this.formToSend.append('titre',this.titre)

            this.http.post('http://localhost:3000/admin/galerie/recordGalerie', this.formToSend)
                .then((response) => {
                    this.images = ''
                    this.titre=''
                    this.formToSend= new FormData()
                    this.displayFormAlbum= false
                    this.message= response.data.message
                })
        },
    },
}
</script>