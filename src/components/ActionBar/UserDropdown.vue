<template>
  <sui-dropdown
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

      <sui-button icon="log out" negative>
        Log out
      </sui-button>
    </sui-dropdown-menu>

  </sui-dropdown>
</template>

<script>
  export default {
    name: "UserDropdown",
  }
</script>

<style scoped>
</style>