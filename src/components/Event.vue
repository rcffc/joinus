<template>
  <div class="event">
    <div class="ui container">
      <img class="ui large rounded centered image" v-bind:src="this.image" />  

      <h1 class="ui header huge">{{ this.name }}</h1>

      <div class="ui divider"></div>

      <div class="ui three column doubling stackable grid container left aligned ">
        <div class="column">
        </div>
        <div class="ui column">
          <div class="ui list">
            <div class="ui item">
              <i class="icon users"></i>
              <span class="content">{{ this.organizer }}</span>
            </div>
            <div class="ui item">
              <i class="icon compass"></i>
              <span class="content">{{ this.location }}</span>
            </div>
            <div class="ui item">
              <i class="icon calendar"></i>
              <span class="content">{{ this.date }}</span>
            </div>
            <div class="ui item">
              <button class="ui right labeled icon button basic blue">
                <i class="share icon"></i>
                Share
              </button>
            </div>
          </div>
          <div class="ui divider"></div>
          
          <div class="description">{{ this.description }}</div>
        </div>

        <div class="column">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fb from "../services/fb.js";

  export default {
    name: "Event",
    created: function() {
      this.id = this.$route.params.id

      fb.events.doc(this.id).get().then((doc) => {
        const data = doc.data();

        for (let key in data) {
          this[key] = data[key]
        }
      })
    },
    data: function() {
      return {
        id: "",
        name: "",
        location: "",
        image: "",
        organizer: "",
        date: "",
        description: ""
      }
    }
  };
</script>

<style scoped>
  .event {
    overflow: auto;
  }
</style>