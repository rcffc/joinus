<template>
  <div class="wrapper">
    <div class="ui two cards">
      <div class='card' v-for="group in groups" v-bind:key="group.id">
        <router-link :to="`/groups/${group.id}`">
            <div class="ui image">
              <img class="img" v-bind:src="group.image" />
            </div>
            <div class="content">
              <div class="header">{{ group.name }}</div>
              <div class="ui divider"></div>
              <span class='tag' v-for="tag in group.tags" v-bind:key="tag">
                #{{ tag }}
              </span>
            </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "EventFinder",
  computed: mapState({
    groups: state => state.groups.all,
  }),
  created () {
    this.$store.dispatch('groups/getAllGroups')
  }
}
</script>

<style scoped>
a {
  color: black
}

.wrapper {
  padding-bottom: 80px;
  color: black;
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