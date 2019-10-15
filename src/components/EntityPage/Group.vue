<template>
  <div class="group">
    <portal to="actionBar">
      <div class="ui menu inverted fluid big center aligned">
        <div
          id="name-header" 
          class="ui header inverted center aligned"
        >
          {{ name }}
        </div>
      </div>
    </portal>

    <img
      class="ui large rounded centered image"
      :src="image"
    >
    <IconButton
      text="Visit"
      icon="home"
      color="caution"
    />
    <IconButton
      text="Join"
      icon="user plus"
      color="positive"
    />
    <IconButton
      text="Share"
      icon="share"
      color="neutral"
    />
    
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
import { groups } from '../../api'
import InfoBox from './InfoBox.vue'
import IconButton from '../utils/IconButton.vue'

export default {
  name: 'Group',
  components: {
    InfoBox,
    IconButton
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

    groups.getGroup(this.id).then((data) => {
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

#name-header {
  padding-top: 0.5rem;
  width: 100%;
}
</style>