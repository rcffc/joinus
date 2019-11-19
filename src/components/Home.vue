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
      <div class="profile-header">
        <h1>My Groups</h1>
        <div class="group-button">
          <IconButton
            text="New Group"
            icon="plus square"
            color="neutral"
            :click-handler="groupCreationHandler"
          />
        </div>
      </div>
      <div v-if="groups.length" class="ui three cards">
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
      <div v-else class="info-content">
        Join groups on the group page:
        <div class="button-container">
          <IconButton
            text="Groups"
            icon="users"
            color="positive"
            :click-handler="groupsRedirectHandler"
          />
        </div>
      </div>
      <h1>My Events</h1>
      <div v-if="Object.entries(events).length !== 0">
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
      <div v-else class="info-content">
        Follow events on the event page:
        <div class="button-container">
          <IconButton
            text="Events"
            icon="users"
            color="positive"
            :click-handler="eventsRedirectHandler"
          />
        </div>
      </div>
    </div>
    <div class="button-container">
       <div class="ui divider">
         
      </div>
      <IconButton
        text="Logout"
        icon="sign-out"
        color="neutral"
        :click-handler="logoutHandler"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IconButton from './utils/IconButton.vue'

export default {
  name: 'Home',
  components: {
    IconButton
  },
  data: function () {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      loading: true,
      groups: [],
      events: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  created: async function() {
    const init = async () => {
      try { 
        if(this.user.data) {
          const { following, id } = this.user.data
          this.events = await this.$store.dispatch('events/findAll', following)
          this.groups = await this.$store.dispatch('groups/findAll', id)    
        }
        this.loading = false

        if (endSubscription)
          endSubscription()
      }
      catch(err) {
        this.$router.replace('/events')
        err.name = 'CustomError'

        return Promise.reject(err)
      }
    }

    switch (this.$store.state.user.isLoggedIn) {   
      case true:
        init()
        break

      case 'inProgress':
        var endSubscription = this.$store.subscribe(async (mutation, state) => {
          if (mutation.type === 'user/SET_LOGGED_IN') {
            await init()
          }
        })

        break

      default:
        this.$router.replace('/welcome')
        return
    }
  },
  methods: {
    groupsRedirectHandler() {
      this.$router.push(`/groups`)
    },
    eventsRedirectHandler() {
      this.$router.push(`/events`)
    },
    groupCreationHandler() {
      this.$router.push(`/groups/new`)
    },
    logoutHandler() {
      return this.$store.dispatch('user/logOut')
        .then(() => {
          this.$router.replace("/welcome")
        })
        .catch(err => Promise.reject(err))
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
  display: inline-block;
  margin: 20px 0 10px 0;
  width: 50%;
}

.ui.button {
  display: inline-block;
  margin: 1em auto;
  margin-top: 1.5em;
}

.profile-header {
  display: flex;
  justify-content: space-between;
}

.group-button {
  text-align: right;
}

.info-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 2em;
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

.button-container {
  text-align: center;
  margin: 1em 0;
}
</style>