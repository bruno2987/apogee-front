<template>
    <div>
        <label for="titre">Titre de l'album</label>
        <input type="text" v-model="titre" name="titre">
        <UploadImages @change="handleImages" v-model="files"/>
        <button @click="sendToServer">envoyer</button>
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
            files:null,
        }
    },
    methods: {
        handleImages(files) {
            let datas = new FormData()
            files.forEach(element => {
                datas.append('file',element)
            })
            this.files = datas;
        },
        sendToServer(){
                this.files.append('titre',this.titre)
                        this.http.post('http://localhost:3000/admin/galerie/recordGalerie', this.files)
                .then((response) => {
                    console.log(response)
                    this.files = null
                })
        },
    },
}
</script>