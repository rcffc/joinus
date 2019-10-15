<template>
  <div class="event">
    <portal to="actionBar">
      <div class="ui grid">
        <div class="eleven wide column aligned right">
          <div
            id="name-header" 
            class="ui header center aligned"
          >
            {{ name }}
          </div>
        </div>

        <div class="five wide column">
          <IconButton
            v-if="follow"
            icon="eye slash"
            color="caution"
            misc
            :click-handler="test"
          />
          <IconButton
            icon="share"
            color="neutral"
            misc
          />
        </div>
      </div>
    </portal>
    
    <img
      id="event-image"
      class="ui large rounded centered image"
      :src="`${ image || organizer.image}`"
    >

    <div class="ui hidden divider" />

    <IconButton
      :text="organizer.name"
      icon="users"
      color="neutral link"
      :click-handler="toGroupPage"
    />

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
          'date': { 'content': date, 'icon': 'calendar' },
        }"
      />
    </div>
  </div>
</template>

<script>
import IconButton from '../utils/IconButton.vue'
import InfoBox from './InfoBox.vue'

export default {
name: 'Event',
components: {
  IconButton,
  InfoBox
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
}

#event-image {
  box-shadow: 0px 2px 1rem #9a938c
}

#name-header {
  padding-top: 0.5rem;
  color: white;
}

</style>