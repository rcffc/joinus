<template>
  <div id="app">
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view />
    <nav class='ui  inverted bottom fixed labeled three item icon menu'>
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
      <router-link class='item' to="/events">
        <i class="compass icon"></i>
        Events
      </router-link>
      <router-link class='item' to="/">
        <i class="home icon"></i>
        Home
      </router-link>
      <router-link class='item' to="/">
        <i class="users icon"></i>
        Groups
      </router-link>
    </nav>
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
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
