<template>
    <div>
        <div v-for="item in albumsListe" :key="item._id">{{item.titre}} {{item.images[0]}}</div>
    </div>
</template>

<script>
export default {
    name: 'galerie',
    data: () =>{
        return {
            albumsListe:''
        }
    },
    beforeCreate(){
        this.http.get('http://localhost:3000/users/getListeAlbums')
            .then((response) =>{
                console.log(response.data)
                this.albumsListe = response.data.albumsListe
            })
    }
}
</script>