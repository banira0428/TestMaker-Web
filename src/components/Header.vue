<template>
    <header id="top-head" v-bind:class="{open: isOpen}">
        <h2 class="title"><a href="/">暗記メーカー α版</a></h2>
        <a href="#" class="menu-mobile" id="toggle-menu" v-on:click="isOpen = !isOpen">{{isOpen ? '閉じる' : 'メニュー'}}</a>
        <ul>
            <li><a href="/">ホーム</a></li>
            <li><a href="#"><router-link to="/about">このサイトについて</router-link></a></li>
            <li><a href="#" @click="signOut" v-if="isSignIn">{{'ログアウト'}}</a></li>
        </ul>
    </header>
</template>

<script>
    import firebase from 'firebase'
    import store from '../store'

    export default {
        name: "Header",
        data: function () {
            return {
                isOpen: false,
            }
        },
        computed: {
          isSignIn() {
              return store.state.status
          }
        },
        methods: {
            signOut: function () {
                if(firebase.auth().currentUser){
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