<template>
  <div class="group">
    <portal to="actionBar">

      <div class="ui grid action-bar-content">
        <div class="ten wide column aligned right">
          <div
            id="name-header" 
            class="ui header large center aligned"
          >
            {{ name }}
          </div>
      </div>

        <div class="six wide column">
          <div id="button-wrapper">
            <IconButton
              icon="home"
              color="caution"
              :click-handler="handleHomeClick"
              misc
            />
            <IconButton
              v-if="member"
              icon="user times"
              color="red"
              :clickHandler="test"
              misc
            />
            <ShareButton
              :shareMessage="name"
              misc
            />
          </div>
        </div>
      </div>
    </portal>

    <img
      id="group-image"
      class="ui large rounded centered image"
      :src="image"
    >
    
    <div class="ui divider hidden" />

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
import ShareButton from '../utils/ShareButton.vue'

export default {
  name: 'Group',
  components: {
    InfoBox,
    IconButton,
    ShareButton
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
    },
    handleHomeClick() {
      window.location.href = this.website
    }
  }
}
</script>

<style scoped>
.group {
  padding-bottom: 10em;
  text-align: center;
}

.action-bar-content {
  padding-top: 0.5rem;
}

#name-header {
  padding-top: 0.5rem;
  width: 90%;
  color: white;
}

#group-image {
  box-shadow: 0px 2px 1rem #9a938c
}

#button-wrapper {
  text-align: right
}
</style>