<template>
  <div class="wrapper">
    <div class="ui left aligned container">
      <div class="ui list" v-for="event in events" v-bind:key="event.id">
        <router-link class='item' :to="`/events/${event.id}`">
          <img class="ui tiny rounded right floated image" v-bind:src="event.image" />
            
            <div class="ui header">{{ event.name }}</div>
            <div>{{ event.location }}</div>
            <div>{{ event.organizer }}</div>
            <div>{{ event.date }}</div>
        </router-link>
        <div class="ui divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
//These allow us to easily map state fields to the component
import { mapState } from 'vuex'

export default {
  name: "EventFinder",
  computed: mapState({
    events: state => state.events.all, //This maps store.state.events to this.events
  }),
  created () {
    this.$store.dispatch('events/getAllEvents')
  }
};
</script>

<style scoped>
.wrapper {
  padding: 20px 0 60px 0;
}

.ui.image {
  height: 75px;
  background-size: contain;
}

.ui.divider {
  margin: 0.5em 0;
}
</style>