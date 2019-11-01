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
        <label>Name</label>
        <input type="text" name="name" placeholder="Happy fun times in Otaniemi">
      </div>

      <div class="field">
        <label>Location</label>
        <input type="text" name="location" placeholder="Somewhere">
      </div>

      <div class="field">
        <label>Date</label>
        <input type="date" name="location">
      </div>

      <div class="field">
        <label>Image</label>
        <input type="url" name="image" placeholder="https://example.com/static/test.png">
      </div>

      <div class="field">
        <label>Description</label>
        <textarea></textarea>
      </div>

      <button class="ui button primary" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EventForm',
  data: function() {
    return {
      id: '',
      name: '',
      location: '',
      image: '',
      date: '',
      description: '',
    }
  }
}
</script>

<style scoped>
.form-page {
  padding-bottom: 10rem;
  width: 100%;
  text-align: center;
}
</style>