<template>
  <sui-segment id="action-bar" inverted v-if="this.$route.path === '/login'">
    <img class="logo" src="../../../assets/join-us-white.png" />
  </sui-segment>
  <sui-segment id="action-bar" inverted v-else>
    <user-dropdown />
  </sui-segment>
</template>

<script>
import UserDropdown from "./UserDropdown.vue";

export default {
  name: "ActionBar",
  components: {
    UserDropdown
  }
};
</script>

<style scoped>
#action-bar {
  width: 100%;
  padding: 4px;
  margin:0%
}

#user-dropdown {
  display: block;
  float: left;
}

.logo {
  width: 120px;
  height: 60px;
}
</style>