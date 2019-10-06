<template>
  <div id="user-dropdown">
  <sui-button
    v-if="!loggedIn"
    v-on:click="handleClick"
    positive
  >
    Log in
  </sui-button>

    <sui-dropdown
      v-if="loggedIn"
      class="icon primary basic large circular"
      icon="user"
      button
    >
      <sui-dropdown-menu>
        <sui-dropdown-item>
          <sui-icon name="settings" />
            Settings
        </sui-dropdown-item>

        <sui-divider horizontal />

        <sui-button
          icon="log out"
          fluid
          negative
          v-on:click="handleClick"
        >
          Log out
        </sui-button>
      </sui-dropdown-menu>

    </sui-dropdown>
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