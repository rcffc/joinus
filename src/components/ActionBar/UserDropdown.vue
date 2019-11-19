<template>
  <div id="user-dropdown">
    <button
      v-if="!loggedIn"
      id="log-in"
      class="ui button basic inverted"
      @click="handleClick"
    >
      Log in
    </button>

    <div
      v-if="loggedIn"
      id="user-dropdown"
      class="ui icon dropdown simple"
    >
      <i class="ellipsis vertical icon large" />

      <div class="menu">
        <div class="item">
          <i class="settings icon" />
          Settings
        </div>

        <div class="ui divider" />

        <button
          id="log-out"
          class="ui button icon fluid negative"
          @click="handleClick"
        >
          <i class="log out icon" />
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
  name: 'UserDropdown',
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