<template>
  <div class="group">
    <portal to="actionBar">

      <div class="ui grid">
        <div class="nine wide column aligned right">
          <div
            id="name-header" 
            class="ui header large center aligned"
          >
            {{ name }}
          </div>
      </div>

        <div class="seven wide column">
          <IconButton
            icon="home"
            color="caution"
            misc
          />
          <IconButton
            v-if="member"
            icon="user times"
            color="red"
            :clickHandler="test"
            misc
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
    <IconButton
      v-if="!member"
      text="Join"
      icon="user plus"
      color="positive disabled"
      :clickHandler="test"
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
      tags: [],
      member: false
    }
  },
  created: function() {
    this.id = this.$route.params.id

    groups.getGroup(this.id).then((data) => {
      for (let key in data) {
        this[key] = data[key]
      }
    })
  },
  methods: {
    test() {
      this.member = !this.member
    }
  }
}
</script>

<style scoped>
.group {
  padding-bottom: 10em;
}

#name-header {
  padding-top: 0.5rem;
  width: 90%;
  color: white;
}
</style>