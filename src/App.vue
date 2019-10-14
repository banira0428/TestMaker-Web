<template>
    <div id="app">
        <Header/>
        <div class="content">
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
    }
</style>
