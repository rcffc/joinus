<template>
  <div
    id="action-bar"
    class="ui top attached menu inverted"
  >
    <!-- Log in bar -->  
    <div
      v-if="this.$route.path === '/login'"
      class="ui menu inverted fluid center aligned"
    > 
      <img
        class="ui centered image logo"
        src="../../../assets/join-us-white.png"
      >
    </div>

    <!-- Event/Group page bar -->
    <div
      v-else-if="name"
      class="ui menu inverted fluid big center aligned"
    >
      <div
        id="name-header" 
        class="ui header inverted center aligned"
      >
      {{ name }}
      </div>
    </div>
  
    <!-- Finder bar -->
    <div
      v-else
      class="ui grid inverted"
    >
      <div class="five wide column">
        <UserDropdown />
      </div>

      <div class="two column" />

      <div class="column">
        <SearchBar />
      </div>
    </div>
  </div>
</template>

<script>
import UserDropdown from './UserDropdown.vue'
import SearchBar from './SearchBar.vue'
import { mapState } from 'vuex'

export default {
  name: 'ActionBar',
  components: {
    UserDropdown,
    SearchBar
  },
  computed: mapState({
    name: state => state.actionBar.name,
  }),
}
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

#name-header {
  padding-top: 0.5rem;
  width: 100%;
}

.logo {
  width: 68px;
  height: 34px;
  padding: 0;
}
</style>