<template>
    <div>
        <vue-upload-multiple-image 
        @upload-success="uploadImageSuccess"
        @edit-image="editImage"
        @mark-is-primary="markIsPrimary"
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
    </div>
</template>

<script>
import VueUploadMultipleImage from 'vue-upload-multiple-image'

export default {
    name: 'nouvelGalerie',
    components: {
        VueUploadMultipleImage
    },
    data() {
        return {

        }
    },
    methods: {
        uploadImageSuccess(formData, index, fileList) {
            console.log('data', formData, index, fileList)
            this.http.post('http://localhost:3000/admin/galerie/recordGalerie',formData)
            .then((response)=> {
                console.log(response)
            }).catch((erreur) => console.log(erreur))
        },
        beforeRemove (index, done, fileList) {
            console.log('index', index,'qsdfqlijsdfmlkqjsdmflkjqsdmlfkjqsmdlfkj',fileList)
            this.http.post('http://localhost:3000/admin/galerie/deleteImgNewGalerie',{
                index : index
            })
            done()
            },
        editImage(formData, index, fileList) {
            console.log('edit data', formData, index, fileList)
        },
        markIsPrimary(index, fileList){
            console.log('markIsPrimary data', index, fileList)
        },
        limitExceeded(amount){
            console.log('limitExceeded data', amount)
        }
    }
}
</script>