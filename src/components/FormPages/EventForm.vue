<template>
  <div class="form-page">
    <portal to="actionBar">
        <div
          id="name-header" 
          class="ui header center aligned large"
        >
          {{ name || "Create an Event" }}
        </div>
      </portal>

    <form class="ui form">
      <div class="field">
        <span class="ui neutral pointing below label">
          Name
        </span>
        <input
          v-model="name" 
          type="text"
          placeholder="Happy fun times in Otaniemi"
        >
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Location
        </span>
        <input
          v-model="location"
          type="text"
          placeholder="Otakaari 1, Espoo, Finland"
        >
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Date
        </span>
        <input
          v-model="date"
          type="date"
        >
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Time
        </span>
        <input
          v-model="time"
          type="time"
        >
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Image
        </span>
        <input
          v-model="image"
          type="url"
          placeholder="https://example.com/static/test.png"
        >
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Description
        </span>
        <textarea v-model="description" />
      </div>

      <select
          v-model="tags"
          class="ui fluid search dropdown"
          multiple=""
        >
          <option
            v-for="tag in tags"
            :key="tag"
            v-bind:value="tag"
          >
            {{ tag }}
          </option>
        </select>

      <IconButton
        text="Submit"
        icon="save outline"
        color="positive fluid"
        :click-handler="submitHandler"
        type="submit"
      />
    </form>
  </div>
</template>

<script>
import IconButton from '../utils/IconButton.vue'

export default {
  name: 'EventForm',
  components: {
    IconButton
  },
  data: function() {
    return {
      id: '',
      name: '',
      location: '',
      image: '',
      date: '',
      time: '',
      tags: [],
      description: '',
    }
  },
  created: async function() {
    this.id = this.$route.params.id

    if (this.id) {
      try {
        const data = await this.$store.dispatch('events/find', this.id)

        for (let key in data) {
          this[key] = data[key]
        }

        this.date = data.date.toISOString().substring(0, 10)
        
        let [hours, mins] = data.date.toLocaleTimeString().split(':')

        this.time = `${ ((hours.length < 2) ? '0' : '') + hours }:${ mins }` 
      }
      catch (err) {
        this.$router.push('/events')

        err.name = 'LoadingError'
        
        return Promise.reject(err)
      }
    }
  },
  mounted: function() {
    $('.ui.dropdown')
      .dropdown()
  },
  methods: {
    submitHandler(event) {
      event.preventDefault()
      this.$router.push('/events/')
      
      const err = Error('Not implemented yet')
      err.name = 'CustomError'

      throw err
    }
  }
}
</script>

<style scoped>
#name-header {
  padding-top: 0.5rem;
  color: white;
}

.form-page {
  padding: 3rem 1rem;
  margin-bottom: 5rem;
  width: 100%;
}

.neutral {
  background-color: #af9164 !important;
  color: white !important;
}

.basic.neutral {
  color: #af9164 !important;
  box-shadow: 0 0 0 1px inset !important;
}
</style>