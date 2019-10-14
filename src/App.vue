<template>
  <div class="ui container fluid" id="app">
    <action-bar />
    <navbar />
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<script>
import Navbar from "./components/Navbar.vue";
import ActionBar from "./components/ActionBar/ActionBar.vue";

export default {
  name: "app",
  components: {
    ActionBar,
    Navbar
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
  background-color: #dbd3d3;
  min-height: 100%;
  margin: auto 0 !important;
}

.inverted {
  background-color: #2d2a32 !important;
}

.positive {
  background-color: #617073 !important;
}

.caution {
  background-color: #c4b7cb !important;
  color: white !important;
}

.neutral {
  background-color: #af9164 !important;
  color: white !important;
}

</style>
