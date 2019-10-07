<template>
  <div class="ui segment inverted left aligned" id="action-bar">
    <user-dropdown/>
  </div>
</template>

<script>
  import UserDropdown from "./UserDropdown.vue";

  export default {
    name: "ActionBar",
    components: {
      UserDropdown
    }
  }
</script>

<style scoped>
  #action-bar {
    border-radius: 0%;
  }

</style>