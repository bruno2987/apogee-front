<template>
    <div>
        <h2>inscription</h2>
        <label for="email">email</label>
        <input type="text" v-model="email">

        <label for="password">password</label>
        <input type="text" v-model="password">

        <button @click="envoiInscription">inscription</button>
        <p v-show="responseServer">{{responseServer.message}}</p>
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
        envoiInscription: function(){
        this.http.post("http://localhost:3000/admin/inscription", {
            email: this.email,
            password: this.password
        }).then((response) =>
            this.responseServer = response.data)
        },
    }
}
</script>