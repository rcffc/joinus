<template>
  <div id="navbar">
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
      <router-link class='item' to="/home">
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

<script>
  export default {
    name: "Navbar"
  };
</script>

<style scoped>
</style>