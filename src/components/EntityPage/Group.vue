<template>
  <div
    class="group"
  >
    <InfoBox
      :name="name"
      :description="description"
      :image="image"
      :tags="tags"
      :optional-fields="{
        'website': {
          'content': website,
          'icon': 'home'
        } 
      }"
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
  padding-bottom: 5em;
}
</style>