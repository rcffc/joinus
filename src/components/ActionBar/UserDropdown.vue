<template>
  <div id="user-dropdown">
    <button
      class="ui button basic inverted"
      v-if="!loggedIn"
      v-on:click="handleClick"
      id="log-in"
    >
      Log in
    </button>

    <div
      v-if="loggedIn"
      class="ui icon dropdown simple"
      id="user-dropdown"
    >
    <i class="ellipsis vertical icon large"></i>

      <div class="menu">
        <div class="item">
          <i class="settings icon"></i>
            Settings
        </div>

        <div class="ui divider">
        </div>

        <button
          class="ui button icon fluid negative"
          id="log-out"
          v-on:click="handleClick"
        >
          <i class="log out icon"></i>
          Log out
        </button>
      </div>

    </div>
  </div>
</template>

<script>
  function handleClick() {
    this.loggedIn = !this.loggedIn
  }

  export default {
    name: "UserDropdown",
    data: function () {
      return {
        loggedIn: false
      }
    },
    methods: {
      handleClick
    }
    
  }
</script>

<style scoped>
  
</style>