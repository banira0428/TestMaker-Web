<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
    import Header from "./components/Header"
    import Home from "./components/Home"

    export default {
        components: {Header, Home}
    };
</script>

<style>
  #app {
    height: 100%;
  }
</style>
