<template>
  <div class="group">
    <img
      class="ui large rounded centered image"
      :src="image"
    >
    <button class="ui right labeled icon button basic black">
      <i class="home icon" />
      Visit
    </button>

    <button class="ui right labeled icon button basic green big">
      <i class="icon user plus" />
      Join
    </button>

    <button class="ui right labeled icon button basic blue">
      <i class="share icon" />
      Share
    </button>

    <div class="ui divider" />

    <div class="ui container left aligned">
      <span class="ui header small">
        <i class="icon info" />
        <div class="content">
          Contacts
        </div>
      </span>

      <div class="ui list">
        <div class="item">
          teppo.testaaja@aalto.fi
        </div>
        <div class="item">
          tim.tester@aalto.fi
        </div>
        <div class="item">
          foo.bar@gmail.com
        </div>
      </div>
    </div>

     <div class="ui divider" />

    <InfoBox
      :description="description"
      :tags="tags"
    />
  </div>
</template>

<script>
import fb from '../../services/fb.js'
import InfoBox from './InfoBox.vue'

export default {
  name: 'Group',
  components: {
    InfoBox
  },
  data: function() {
    return {
      name: '',
      website: '',
      image: '',
      description: '',
      tags: []
    }
  },
  created: function() {
    this.id = this.$route.params.id

    fb.groups.doc(this.id).get().then((doc) => {
      const data = doc.data()

      for (let key in data) {
        this[key] = data[key]
      }
    })
  }
}
</script>

<style scoped>
.group {
  padding-bottom: 10em;
}
</style>