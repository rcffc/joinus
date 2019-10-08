<template>
  <div class="ui segment inverted" id="action-bar">
    <sui-segment id="action-bar" inverted v-if="this.$route.path === '/login'">
      <img class="logo" src="../../../assets/join-us-white.png" />
    </sui-segment>
    <sui-segment id="action-bar" inverted v-else>
    <div class="ui top attached menu inverted">
      <div class="left aligned">
        <user-dropdown/>
      </div>
      <div class="right menu">
        <search-bar/>
      </div>
    </div>
    </sui-segment>
  </div>
</template>

<script>
import UserDropdown from "./UserDropdown.vue";
import SearchBar from "./SearchBar.vue"

export default {
  name: "ActionBar",
  components: {
    UserDropdown,
    SearchBar
  }
};
</script>

<style scoped>
  #action-bar {
    border-radius: 0%;
  }

.logo {
  width: 120px;
  height: 60px;
}
</style>