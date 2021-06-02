<template>
<div>
    <label for="name">Prénom</label>
    <input type="text" v-model="name" @keypress="count=0">
    <button @click="affiche">????</button>
    <label for="lastName">Nom</label>
    <input type="text" v-model="lastName">
    <button @click="check">Confirmation du server</button><br>
    <button @click="send">enregistrement Mongo</button>



    <h1> {{ name }}</h1>

    <h2 id="sentenceToSend" v-if="count>0"> {{name}} est un con</h2>

    <h3 v-show="reponseServer">{{reponseServer}}</h3>

</div>
</template>

<script>
export default {
    name: 'testRegis',
    data () {
        return {
            name:"",
            lastName:"",
            reponseServer:"", 
            count:0
        }
    },
    methods: {
        affiche: function(){
            this.count ++
        },
        check: function(){
            this.http.post("http://localhost:3000/regis/testRegisLog", {
                name: this.name,
                lastName: this.lastName
            },
            {headers: {Authorization: localStorage.token, userId: localStorage.userId}}  // Cette ligne permet de mettre des variable dans le header de la requête
            ).then((response) => 
            this.reponseServer = response.data.message)
            .catch((erreur)=>
           this.reponseServer = erreur.response.data.error.message)
        },
        send: function(){
            this.http.post("http://localhost:3000/regis/recordRegis", {
                name: this.name,
                lastName: this.lastName
            }).then((response) =>
            console.log(response.data))
        }
    }
}
</script>


