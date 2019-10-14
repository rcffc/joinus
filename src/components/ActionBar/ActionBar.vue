<template>
  <div
    id="action-bar"
    class="ui top attached menu inverted"
  >
    
    <div
      v-if="this.$route.path === '/login'"
      class="ui segment inverted"
    >
      <img
        class="logo"
        src="../../../assets/join-us-white.png"
      />
    </div>

    <div
      class="left aligned"
    >
      <UserDropdown/>
    </div>

    <div
      class="right menu"
    >
      <SearchBar/>
    </div>
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
    position: fixed;
    left: 0;
    width: 100vw;
    z-index: 200;
    height: 5rem;
    padding: 1.2rem 0.5rem 1rem;
  }

.logo {
  width: 68px;
  height: 34px;
  padding: 0
}
</style>