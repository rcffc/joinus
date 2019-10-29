<template>
  <div class="wrapper">
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
        <div class="ui card">
          <router-link :to="`/events/${event.id}`">
            <div class="ui header">
              {{ event.name }}
            </div>
            <div>{{ event.location }}</div>
            <router-link :to="`/groups/${event.organizer.id}`">
              <img
                class="ui avatar floated right image"
                :src="event.organizer.image"
              >
            </router-link>
            <div class="tag-row">
              <span
                v-for="tag in event.tags"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EventFinder',
  data: function () {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] 
    }
  },
  computed: {
    ...mapGetters({
      events: 'events/getGroupedEvents'
    })
  },
  created () {
    this.$store.dispatch('events/getAllEvents')
  }
}
</script>

<style scoped>
a {
  color: black
}

.wrapper {
  padding: 0 14px 80px 14px;
  width: 100%;
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

.ui.card {
  flex: 1;
  padding: 10px;
  background-color:rgba(255, 255, 255, 0.5);
}

.tag-row {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
}

.tag {
  padding-right: 3px;
  color: #053569;
}

.ui.image {
  margin: 0!important;
  box-shadow: 2px 2px #a79f98;
}

.ui.divider {
  margin: 0.5em 0;
}

.ui.header {
  margin: 5px 0;
}
</style>