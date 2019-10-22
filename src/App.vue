<template>
  <div id="app">
    <Header/>
    <div class="p-3">
      <router-view/>
    </div>
  </div>
</template>

<script>
    import Header from "./components/Header"

    export default {
        components: {Header}
    };
</script>

<style>
  #app {
    height: 100%;
  }
</style>
