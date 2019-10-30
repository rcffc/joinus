<template>
  <div class="wrapper">
    <portal to="actionBar">
      <div class="ui fluid center aligned"> 
        <img 
          class="ui centered image fluid logo"
          src="../../assets/join-us-white.png"
        >
      </div>
    </portal>
    <h1>My Groups</h1>
    <div class="ui three cards">
      <div
        v-for="group in groups"
        :key="group.id"
        class="ui fluid card group"
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
          </div>
        </router-link>
      </div>
    </div>
    <h1>My Events</h1>
    <div
      v-for="(eventArray, key) in events"
      :key="eventArray.id"
    >
      <div class="month">
        {{ months[key] }} 2019
      </div>
      <div
        v-for="event in eventArray"
        :key="event.id"
        class="item"
      >
        <div class="date">
          <span>{{ event.shortDate }}</span>
          <span>{{ event.time }}</span>
        </div>
        <div class="ui card event">
          <router-link :to="`/events/${event.id}`">
            <div class="ui header">
              {{ event.name }}
            </div>
            <router-link :to="`/groups/${event.organizer.id}`">
              <img
                class="ui avatar floated right image"
                :src="event.organizer.image"
              >
            </router-link>
            <div>{{ event.location }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// Fetching all events and groups until user authentication is implemented
export default {
  name: 'Home',
  data: function () {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] 
    }
  },
  computed: {
    ...mapGetters({
      events: 'events/getGroupedEvents',
      groups: 'groups/groups'
    })
  },
  created () {
    this.$store.dispatch('events/findAll'),
    this.$store.dispatch('groups/findAll')
  }
}
</script>

<style scoped>
a {
  color: black
}

.wrapper {
  padding: 0 14px 80px 14px;
  color: black;
  width: 100%
}

h1 {
  margin: 20px 0 10px 0;
}

.ui.cards>.card.group {
  padding: 0.2em;
  display: flex;
  justify-content: space-between;
}

.ui.image {
  display: block;
}

.ui.image img {
  height: 80px;
  margin-left: auto;
  margin-right: auto;
}

.item {
  display: flex;
  flex-direction: row;
}

.month {
  margin-top: 30px;
  font-size: 18px;
  font-weight: bold;
}

.date {
  margin: 25px 10px 0 0;
  display: flex;
  flex-direction: column;
}

.ui.card.event {
  padding: 10px;
  width: 100%;
  background-color:rgba(255, 255, 255, 0.5);
}

</style>