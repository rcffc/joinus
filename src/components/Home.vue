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
    <div
      v-if="loading"
      class="ui loader active large"
    />
    <div v-else>
      <IconButton
        text="Logout"
        icon="sign-out"
        color="neutral fluid"
        :click-handler="logoutHandler"
      />
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

      <IconButton
        text="Create a group"
        icon="plus square"
        color="neutral fluid"
        :click-handler="groupCreationHandler"
      />

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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IconButton from './utils/IconButton.vue'
import firebase from "firebase";

// Fetching all events and groups until user authentication is implemented
export default {
  name: 'Home',
  components: {
    IconButton
  },
  data: function () {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      loading: true,
    }
  },
  computed: {
    ...mapGetters({
      events: 'events/getGroupedEvents',
      groups: 'groups/groups',
      user: 'user/user'
    })
  },
  created: async function() {
    try {
      await this.$store.dispatch('events/findAll')
      await this.$store.dispatch('groups/findAll')

      this.loading = false
    }
    catch(err) {
      console.log(err.message)
      window.location.href = '/#/home'
    }
  },
  methods: {
    groupCreationHandler() {
      this.$router.push(`/groups/new`)
    },
    logoutHandler() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/welcome");
        });
    }
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

.ui.logo {
  width: 120px;
  height: 55px;
  padding: 0% 1% 1%;
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

.ui.button {
  margin: 1em auto
}
</style>