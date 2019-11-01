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
        <span class="ui neutral pointing below label">Name</span>
        <input type="text" name="name" placeholder="Happy fun times in Otaniemi">
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">Location</span>
        <input type="text" name="location" placeholder="Somewhere">
      </div>

      <div class="inline field">
        <span class="ui neutral right pointing label">Date and time</span>
        <input type="date" name="date">
        <input type="time" name="time">
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">Image</span>
        <input type="url" name="image" placeholder="https://example.com/static/test.png">
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">Description</span>
        <textarea name="description" />
      </div>

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
      description: '',
    }
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
.form-page {
  padding: 0.5rem 1rem;
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