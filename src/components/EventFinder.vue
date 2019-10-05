<template>
  <div class="wrapper">
    <div class="ui left aligned container">
      <div class="ui list" v-for="event in events" v-bind:key="event.id">
        <div class="item">
          <img class="ui tiny rounded right floated image" v-bind:src="event.image" />
            <div class="ui header">{{ event.name }}</div>
            <div>{{ event.location }}</div>
            <div>{{ event.organizer }}</div>
            <div>{{ event.date }}</div>
        </div>
        <div class="ui divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { events } from "./dummyEvents.js";

export default {
  name: "EventFinder",
  data: function() {
    return {
      events
    };
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