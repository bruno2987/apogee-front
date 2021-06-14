<template>
    <div>
        <button id="boutonRetour" v-if="idAlbum" @click="retourListe">Retour</button>
        <div v-if="!idAlbum" id="listeAlbums">
            <div class="ligneAlbum" v-for="item in albumsListe" :key="item._id" @click="seeAlbum(item._id)">
                {{item.titre}}
                <img :src="srcImage(item.images[0])" width="300">
            </div>
        </div>

        <div id="oneAlbum" v-if="idAlbum">
            <img v-for="item in imgsAlbum" :key="item" :src="srcImage(item)" width="400">
        </div>
    </div>
</template>

<script>
export default {
    name: 'galerie',
    data: () =>{
        return {
            albumsListe:'',
            idAlbum:'',
            imgsAlbum:'',
            imgTitre:''
        }
    },
    methods: {
        srcImage(nameImg){
            return 'imgGaleries/'+nameImg
        },
        seeAlbum(id){
            this.idAlbum= id
            this.http.get('http://localhost:3000/users/getOneAlbum/'+id)
                .then((response) => {
                    this.imgsAlbum = response.data.album.images
                    this.imgTitre = response.data.album.images
                })
        },
        retourListe(){
            this.idAlbum=''
        },
    },
    beforeCreate(){
        scrollTo(1,1)
        this.http.get('http://localhost:3000/users/getListeAlbums')
            .then((response) =>{
                console.log(response.data)
                this.albumsListe = response.data.albumsListe
            })
    }
}
</script>

<style scoped lang="scss">
$orangeF: #922105;
$orangeC: #F65F03;
$jaune: #F8AC1B;

#listeAlbums{
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 5vh;
    column-gap: 1vh;
    margin-left: 12vh;
    margin-right: 12vh;
    align-items: center;
    justify-items: center;
    .ligneAlbum{
        display: grid;
        grid-template-rows: 1fr 5fr;
        align-items: center;
        justify-items: center;
        width: 40vh;
        height: 30vh;
        background-image: linear-gradient(to right, rgba(248,172,27,0), rgba(248,172,27, 0.7));
        border-radius: 10px;
        img{
            object-fit: cover;
            max-height: 30vh;
            border-radius: 10px;
        }
    }
}

#listeAlbums .ligneAlbum:hover{   // 226, 94, 6
    background-color: rgba(226, 94, 6,0.7); // C'est la même couleur que $jaune mais en RGBA pour pouvoir lui mettre une valeurs de transparence
    cursor: pointer;
}

#boutonRetour{
  position: fixed;
  height: 1.4em;
  width: 5.5em;
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
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  p{
    font-size: 0.8em;
  }
}
#outonRetour:before {
  content: "";
  background-color: rgba(255, 255, 255, 0.3);
  height: 100%;
  width: 3em;
  position: fixed;
  top: 0;
  left: -4.5em;
  -webkit-filter: blur(3px);
  filter: blur(3px);
  -webkit-transform: skewX(-45deg) translateX(0);
  transform: skewX(-45deg) translateX(0);
  -webkit-transition: none;
  transition: none;
}
#boutonRetour:hover {
  background-color: rgb(223, 198, 37);
  color: black;
  border: solid 1px black;
}
#boutonRetour:hover:before {
  -webkit-transform: skewX(-45deg) translateX(18em);
  transform: skewX(-45deg) translateX(18em);
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;
}

#oneAlbum{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 4vh;
    column-gap: 2vh;
    margin: 3vh;
    align-items: center;
    justify-items: center;
}

</style>