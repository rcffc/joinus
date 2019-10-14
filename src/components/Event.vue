<template>
  <div class="event">
    <div class="ui container">
      <img
        :src="image"
        class="ui large rounded centered image"
      >  

      <h1 class="ui header huge">
        {{ name }}
      </h1>

      <div class="ui divider" />

      <div class="ui three column doubling stackable grid container left aligned ">
        <div class="column" />
        <div class="ui column">
          <div class="ui list">
            <div class="ui item">
              <i class="icon users" />
              <span class="content">{{ organizer }}</span>
            </div>
            <div class="ui item">
              <i class="icon compass" />
              <span class="content">{{ location }}</span>
            </div>
            <div class="ui item">
              <i class="icon calendar" />
              <span class="content">{{ date }}</span>
            </div>
            <div class="ui item">
              <button class="ui right labeled icon button basic blue">
                <i class="share icon" />
                Share
              </button>
            </div>
          </div>
          <div class="ui divider" />
          
          <div class="description">
            {{ description }}
          </div>
        </div>

        <div class="column" />
      </div>
    </div>
  </div>
</template>

<script>
//These allow us to easily map state fields to the component
import { mapMutations } from 'vuex'

export default {
  name: 'Event',
  data: function() {
    return {
      id: '',
      name: '',
      location: '',
      image: '',
      organizer: '',
      date: '',
      description: ''
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

    this.setName(this.name)

    //TODO: Do something when data is undefined or null

  },
  beforeDestroy: function() {
    this.setName()
  },
  methods: {
    ...mapMutations({
      setName: 'actionBar/setName'
    })
  }

}
</script>

<style scoped>
  .event {
    padding-bottom: 10rem;
  }
</style>