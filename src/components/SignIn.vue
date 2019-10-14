<template>
    <div id="content-login">
        <div class="card">
            <div class="card-content center">
                <h2>このサービスを利用するにはログインが必要です</h2>
                <div id="firebaseui-auth-container"></div>
            </div>
        </div>
    </div>
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