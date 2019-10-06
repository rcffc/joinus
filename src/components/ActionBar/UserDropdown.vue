<template>
  <div id="user-dropdown">
  <sui-button
    v-if="!loggedIn"
    v-on:click="handleClick"
    id="log-in"
    icon="sign in"
    labelPosition="right"
    basic
    inverted
  >
    Log in
  </sui-button>

    <sui-dropdown
      v-if="loggedIn"
      class="icon"
      icon="empty"
      id="user-dropdown"
    >
    <sui-icon name="ellipsis vertical" size="large" />
      <sui-dropdown-menu>
        <sui-dropdown-item>
          <sui-icon name="settings" />
            Settings
        </sui-dropdown-item>

        <sui-divider horizontal />

        <sui-button
          icon="log out"
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
  #log-in {
    margin-left: 1em;
  }
</style>