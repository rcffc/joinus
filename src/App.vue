<template>
  <div 
    id="app"
    class="ui container fluid"
  >
    <ActionBar />
    <Navbar />
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<script>
import Navbar from './components/Navbar.vue'
import ActionBar from './components/ActionBar/ActionBar.vue'

export default {
  name: 'app',
  components: {
    ActionBar,
    Navbar
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #dbd3d3;
  min-height: 100%;
  margin: 3rem 0 !important;
}
</style>
