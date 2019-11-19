<template>
  <div class="search-bar">
    <div class="ui search">
      <div class="ui icon input">
        <input
          id="search"
          v-model="searchString"
          class="prompt"
          type="text"
          :placeholder="placeholder"
        >
        <i class="search icon" />
      </div>
      <div class="results" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  computed: {
    searchString: {
      get () {
        return this.$store.state.searchString
      },
      set (value) {
        if (this.$route.path.endsWith('events')) {
          this.$store.dispatch('events/filterEvents', value)
        }
        if (this.$route.path.endsWith('groups')) {
          this.$store.dispatch('groups/filterGroups', value)
        }
      }
    },
    placeholder() {
      return this.$route.path.includes('events') ? 'Look for events...' : 'Look for groups...'
    }
  }
}
</script>

<style scoped>
  .ui.search {
    padding: 5px 0% 0%;
    text-align: center;
  }
</style>