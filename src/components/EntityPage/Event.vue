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
      class="ui large rounded centered image"
      :src="image"
    >

    <div class="ui hidden divider" />

    <IconButton
      v-if="!follow"
      text="Follow"
      icon="eye"
      color="positive"
      :click-handler="test"
    />
    <div class="ui container">
      <InfoBox
        :description="description"
        :optional-fields="{
          'organizer': { 'content': organizer, 'icon': 'users' },
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
    
    if (data)
      for (let key in data) {
        this[key] = data[key]
      }

    //TODO: Do something when data is undefined or null

  },
  methods: {
    test() {
     this.follow = !this.follow 
    }
  }
}
</script>

<style scoped>
.event {
  padding-bottom: 10rem;
}

#name-header {
  padding-top: 0.5rem;
  color: white;
}

</style>