<template>
    <div>
<vue-upload-multiple-image 
    @upload-success="uploadImageSuccess"
    @edit-image="editImage"
    @limit-exceeded="limitExceeded"
    @before-remove="beforeRemove"
    id-upload="myIdUpload"
    id-edit="myIdEdit"
    :max-image=20
    primary-text="Default"
    browse-text="Browse picture(s)"
    drag-text="Drag pictures"
    mark-is-primary-text="Set as default"
    popup-text="This image will be displayed as default"
    :multiple=true
    :show-edit=true
    :show-delete=true
    :show-add=true
 >
 </vue-upload-multiple-image>
 <h1>{{test}}</h1>
    </div>
</template>

<script>
import VueUploadMultipleImage from 'vue-upload-multiple-image';

export default {
    name: 'nouvelGalerie',
    components: {
        VueUploadMultipleImage
    },
    data() {
        return {
            test:''
        }
    },
    methods: {
        uploadImageSuccess(formData) {
            this.test= 'Message TEST'
            this.http.post('http://localhost:3000/admin/galerie/recordGalerie',formData)
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