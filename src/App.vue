<template>
    <sui-grid id="app">

    <sui-grid-row>
      <ActionBar />
    </sui-grid-row>

    <sui-grid-row>
      <Navbar />
    </sui-grid-row>
  </sui-grid>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<script>
  import Navbar from "./components/Navbar.vue";
  import ActionBar from "./components/ActionBar/ActionBar.vue";

  export default {
    name: "app",
    components: {
      Navbar,
      ActionBar
    }
  };
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
