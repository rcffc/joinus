<template>
  <sui-segment id="action-bar">
    <user-dropdown/>
  </sui-segment>
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
    width: 100%;
  }

  #user-dropdown {
    display: block;
    float: left;
  }

</style>