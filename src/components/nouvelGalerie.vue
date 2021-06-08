<template>
    <div>
        <UploadImages @change="handleImages"/>
 <h1>{{test}}</h1>
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
            test:''
        }
    },
    methods: {
        handleImages(files) {
            this.test= 'Mess TEST'
            console.log(files)
            this.http.post('http://localhost:3000/admin/galerie/recordGalerie',{files : files})
                .then((response) => {
                    console.log(response)
                })
        },
beforeRemove (index, done, fileList) {
      console.log('index', index, fileList)
        this.http.post('http://localhost:3000/admin/galerie/deleteImgNewGalerie',{index: index})
        done()
      },
        editImage (formData, index, fileList) {
            console.log('edit data', formData, index, fileList)
            },
        limitExceeded(amount){
        console.log('limitExceeded data', amount)
        }  
    },
    beforeDestroy(){
        console.log('destruction')
    } 
}
</script>