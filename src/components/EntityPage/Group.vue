<template>
  <div class="group">
    <div
      v-if="loading"
      class="ui loader active"
    />

    <div v-else>
      <portal to="actionBar">
        <div class="ui grid action-bar-content">
          <div class="nine wide column aligned right">
            <div
              id="name-header" 
              class="ui header large center aligned"
            >
              {{ name }}
            </div>
          </div>

          <div class="seven wide column">
            <div id="button-wrapper">
              <IconButton
                icon="edit"
                color="neutral"
                misc
                :click-handler="editHandler"
              />
              <IconButton
                icon="home"
                color="caution"
                :click-handler="handleHomeClick"
                misc
              />
              <IconButton
                v-if="member"
                icon="user times"
                color="caution"
                :click-handler="test"
                misc
              />
              <ShareButton
                :share-message="name"
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
        v-if="member"
        text="Create an event"
        icon="plus square"
        color="neutral"
        :click-handler="eventCreationHandler"
      />

      <IconButton
        v-if="!member"
        text="Join"
        icon="user plus"
        color="positive"
        :click-handler="test"
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
          
          <div
            v-for="(member, index) in members"
            :key="index"
            class="item"
          >
            {{ member.username }}
          </div>
        </div>
      </div>

      <div class="ui divider" />

      <InfoBox
        :description="description"
        :tags="tags"
      />
    </div>
  </div>
</template>

<script>
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
      loading: true,
      name: '',
      website: '',
      image: '',
      description: '',
      members: [],
      tags: [],
      member: false
    }
  },
  created: async function() {
    this.id = this.$route.params.id

    try {
      const data = await this.$store.dispatch('groups/find', this.id)

      for (let key in data) {
        this[key] = data[key]
      }

      this.loading = false
    }
    catch (err) {
      this.$router.push('/groups')
      
      err.name = 'LoadingError'

      return Promise.reject(err)
    }
  },
  methods: {
    test() {
      this.member = !this.member
    },
    eventCreationHandler() {
      this.$router.push(`/groups/${ this.id }/events/new`)
    },
    editHandler() {
      this.$router.push(`/groups/edit/${ this.id }`)
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