<template>
  <div class="text-center">
    <div>
      <img class="image" src="../assets/logo.png" alt width="120" height="120"/>
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div id="firebaseui-auth-container"></div>
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

  .image {
    margin-bottom: 24px;
  }

  .text-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

</style>
