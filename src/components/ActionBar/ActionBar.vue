<template>
  <div
    id="action-bar"
    class="ui top attached menu"
  >
    <!-- Content determined by visible page -->
    <portal-target name="actionBar">
      <!-- default content when the portal is not targeted -->
      <div class="ui grid">
        <div class="five wide column">
          <UserDropdown />
        </div>

        <div class="two column" />

        <div class="column">
          <SearchBar />
        </div>
      </div>
    </portal-target>
  </div>
</template>

<script>
import UserDropdown from './UserDropdown.vue'
import SearchBar from './SearchBar.vue'

export default {
  name: 'ActionBar',
  components: {
    UserDropdown,
    SearchBar
  },
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

.vue-portal-target {
  display: block !important;
  width: 100% !important;
}

.ui.menu {
  background-color: #374b39 !important;
}

</style>