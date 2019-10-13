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

    <div
      class="ui divider"
    />

    <div
      class="ui container left aligned"
    >
      <span
        class="ui header small"
      >
        <i
          class="icon info"
        />
        <div
          class="content"
        >
          Contacts
        </div>
      </span>

      <div
        class="ui list"
      >
        <div
          class="item"
        >
          teppo.testaaja@aalto.fi
        </div>
        <div
          class="item"
        >
          tim.tester@aalto.fi
        </div>
        <div
          class="item"
        >
          foo.bar@gmail.com
        </div>
      </div>

      <button
        class="ui right labeled icon button basic blue"
      >
        <i 
          class="share icon"
        />
        Share
      </button>

      <button
        class="ui right labeled icon button basic green"
      >
        <i 
          class="icon user plus"
        />
        Join
      </button>
    </div>
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