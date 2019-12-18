<template>
  <header class="pb-0">
    <b-navbar class="header" toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="/">暗記メーカー</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav >
        <b-navbar-nav>
          <b-nav-item to="/index">アプリ</b-nav-item>
          <b-nav-item to="/help">ヘルプ」</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" @click="signOut" v-if="isSignIn">ログアウト</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
    import firebase from 'firebase'
    import store from '../store'

    export default {
        name: "Header",
        computed: {
            isSignIn() {
                return store.state.status
            }
        },
        methods: {
            signOut: function () {
                if (firebase.auth().currentUser) {
                    firebase.auth().signOut().then(() => {
                        this.$router.push({path: "/signin"});
                    });
                }
            },
        }
    }
</script>

<style scoped>

</style>
