<template>
  <div class="wrapper">
    <sui-container text-align="left">
      <sui-list v-for="event in events" v-bind:key="event.id">

        <sui-list-item class="item">
          <img class="ui tiny rounded right floated image" v-bind:src="event.image" />
            <h3 is="sui-header">{{ event.name }}</h3>
            <div>{{ event.location }}</div>
            <div>{{ event.organizer }}</div>
            <div>{{ event.date }}</div>
        </sui-list-item>
        <sui-divider />

      </sui-list>
    </sui-container>
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