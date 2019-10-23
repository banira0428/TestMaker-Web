<template>
  <div id="app">
    <Header/>
    <div class="p-3 pb-3 flex-grow-1">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
    import Header from "./components/Header"
    import Footer from './components/Footer';

    export default {
        components: {Header, Footer}
    };
</script>

<style>
  #app {
    height: 100%;
    display: flex;
    flex-flow: column;
  }
</style>
