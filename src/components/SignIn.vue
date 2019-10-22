<template>
  <b-card>
    <b-card-text text-tag="h3">
      このサービスを利用するにはログインが必要です
    </b-card-text>
    <div id="firebaseui-auth-container"></div>
  </b-card>
</template>

<script>
    import firebase from 'firebase'

    const firebaseui = require("firebaseui");
    require("firebaseui/dist/firebaseui.css");

    export default {
        name: "SignIn.vue",
        mounted: function () {
            let ui = new firebaseui.auth.AuthUI(firebase.auth());
            ui.start('#firebaseui-auth-container', {
                signInFlow: "redirect",
                signInSuccessUrl: "/",
                signInOptions: [
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                ],
            });
        }
    }
</script>

<style scoped>

</style>
