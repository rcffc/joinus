<template>
  <div class="event">
    <portal to="actionBar">
      <div class="ui grid action-bar-content">
        <div class="ten wide column aligned right">
          <div
            id="name-header" 
            class="ui header center aligned"
          >
            {{ name }}
          </div>
        </div>

        <div class="six wide column">
          <div id="button-wrapper">
            <IconButton
              v-if="follow"
              icon="eye slash"
              color="caution"
              misc
              :click-handler="test"
            />
            <ShareButton
              :shareMessage="name"
              misc
            />
          </div>
        </div>
      </div>
    </portal>
    
    <img
      id="event-image"
      class="ui large rounded centered image"
      :src="`${ image || organizer.image}`"
    >

    <div class="ui hidden divider" />
    <router-link
      class="item"
      :to="`/groups/${ organizer.id }`"
    >
      <IconButton
        :text="organizer.name"
        icon="users"
        color="neutral link"
      />
    </router-link>

    <IconButton
      v-if="!follow"
      text="Follow"
      icon="eye"
      color="positive disabled"
      :click-handler="test"
    />
  
    <div class="ui container">
      <InfoBox
        :description="description"
        :optional-fields="{
          'location': { 'content': location, 'icon': 'compass' },
          'date': { 'content': date.toLocaleString(), 'icon': 'calendar' },
        }"
      />
    </div>
  </div>
</template>

<script>
import IconButton from '../utils/IconButton.vue'
import InfoBox from './InfoBox.vue'
import ShareButton from '../utils/ShareButton.vue'

export default {
name: 'Event',
components: {
  IconButton,
  InfoBox,
  ShareButton
},
data: function() {
  return {
    id: '',
    name: '',
    location: '',
    image: '',
    organizer: '',
    date: '',
    description: '',
    follow: false
  }
},
created: function() {
  this.id = this.$route.params.id
  
  const data = this.$store
    .state
    .events
    .all
    .find(e => e.id === this.id)
  
  if (data) {
   for (let key in data) {
      this[key] = data[key]
    } 
  }
  else {

  }
  //TODO: Do something when data is undefined or null

},
methods: {
  test() {
    this.follow = !this.follow 
  },
  toGroupPage() {
    window.location.href = `/groups/${ this.organizer.id }`
  }
}
}
</script>

<style scoped>
.event {
  padding-bottom: 10rem;
  text-align: center;
}

.action-bar-content {
  padding-top: 0.5rem;
}

#event-image {
  box-shadow: 0px 2px 1rem #9a938c
}

#name-header {
  padding-top: 0.5rem;
  color: white;
}

#button-wrapper {
  text-align: right
}

</style>