<template>
    <div>
        <h2>connexion</h2>
        <label for="email">email</label>
        <input type="text" v-model="email">

        <label for="password">password</label>
        <input type="text" v-model="password">

        <button @click="envoiConnexion">connexion</button>
        <p v-show="responseServer">{{responseServer}}</p>

    </div>
</template>

<script>
export default {
    data() {
        return {
            email:"",
            password:"",
            responseServer:""
        }
    },
    methods: {
        envoiConnexion : function(){
            this.http.post("http://localhost:3000/admin/connexion", {
                email: this.email,
                password: this.password
            }).then((response) =>{
                this.responseServer = response.data.message; // // Si le server back renvoie un status de réussite, on peut récupéré les data dans l'objet réponse renvoyé par le back: donc response.data
                console.log(response.data.message);
                this.$router.push('/monespace');
                localStorage.userId = response.data.userId
                localStorage.token = response.data.token   // Ici on enregistre le message directement dans le localStorage du navigateur du client
                this.$store.commit('loginOk')
            })
            .catch((error) =>  // Si le server back renvoie un status d'erreur (ex:401), le message envoyé en json sera dans l'objet response de l'objet erreur renvoyé par le back
            this.responseServer = error.response.data.message);  // Donc, pour le récupérer, il ne suffit pas de mettre error.data, mais error.response.data
        }
    }
}
</script>