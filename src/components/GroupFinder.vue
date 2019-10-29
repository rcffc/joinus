<template>
  <div class="wrapper">
    <div class="ui two cards">
      <div
        v-for="group in groups"
        :key="group.id"
        class="ui fluid card"
      >
        <router-link :to="`/groups/${group.id}`">
          <div class="ui image">
            <img
              class="img"
              :src="group.image"
            >
          </div>
          <div class="content">
            <div class="header">
              {{ group.name }}
            </div>
            <div class="ui divider" />
            <span
              v-for="tag in group.tags"
              :key="tag"
              class="tag"
            >
              #{{ tag }}
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GroupFinder',
  computed: {
    ...mapGetters({
      groups: 'groups/groups'
    })
  },
  created () {
    this.$store.dispatch('groups/findAll')
  }
}
</script>

<style scoped>
.wrapper {
  padding-bottom: 80px;
  color: black;
  width: 100%
}

.ui.cards {
  margin: 0 !important;
}

.ui.cards>.card {
  padding: 0.2em;
}

.ui.image {
  display: block;
}

.ui.image img {
  height: 130px;
  margin-left: auto;
  margin-right: auto;
}

.header {
  font-size: 18px;
  font-weight: bold;
}

.ui.divider {
  margin: 0.3em 0;
}

.content {
  padding: 0.4em 0.2em
}

.tag {
  font-size: 12px;
  color: #053569;
}


</style>