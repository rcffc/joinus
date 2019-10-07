<template>
  <div class="ui segment inverted" id="action-bar">
    <div class="ui top attached menu inverted">
      <div class="left aligned">
        <user-dropdown/>
      </div>
      <div class="right menu">
        <search-bar/>
      </div>
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
  }
</script>

<style scoped>
  #action-bar {
    border-radius: 0%;
  }

</style>