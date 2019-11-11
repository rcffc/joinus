<template>
  <div class="group">
    <div
      v-if="loading"
      class="ui loader active"
    />

    <div v-else>
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
                v-if="memberIndex"
                icon="user times"
                color="caution"
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
        v-if="memberIndex >= 0"
        text="Create an event"
        icon="plus square"
        color="neutral"
        :click-handler="eventCreationHandler"
      />

      <IconButton
        v-if="memberIndex < 0"
        text="Join"
        icon="user plus"
        color="positive"
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

      <div class="ui divider" />

      <div v-if="isOwner">
        <IconButton
          text="Delete"
          icon="remove"
          misc
          color="caution fluid"
          :click-handler="handleDeleteClick"
        />

        <div
          id="delete-modal" 
          class="ui modal"
        >
          <div class="header">
            Are you sure?
          </div>
          <div class="actions">
            <IconButton
              text="Yes"
              icon="check"
              color="approve"
              misc
            />
            <IconButton
              text="Cancel"
              icon="cancel"
              color="cancel caution"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoBox from './InfoBox.vue'
import IconButton from '../utils/IconButton.vue'
import ShareButton from '../utils/ShareButton.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Group',
  components: {
    InfoBox,
    IconButton,
    ShareButton
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  data: function() {
    return {
      loading: true,
      name: '',
      website: '',
      image: '',
      description: '',
      members: [],
      memberIndex: -1,
      isOwner: false,
      tags: []
    }
  },
  created: async function() {
    this.id = this.$route.params.id


    try {
      const data = await this.$store.dispatch('groups/find', this.id)

      for (let key in data) {
        this[key] = data[key]
      }

      this.memberIndex = this.members.findIndex(user => user.id === this.user.data.id)

      this.isOwner = this.memberIndex >= 0 && this.members[this.memberIndex].role === 'owner'

      this.loading = false
    }
    catch (err) {
      this.$router.push('/groups')
      
      err.name = 'LoadingError'

      return Promise.reject(err)
    }
  },
  methods: {
    eventCreationHandler() {
      this.$router.push(`/groups/${ this.id }/events/new`)
    },
    editHandler() {
      this.$router.push(`/groups/edit/${ this.id }`)
    },
    handleHomeClick() {
      window.location.href = this.website
    },
    handleDeleteClick() {
      $('#delete-modal')
        .modal({
          onApprove: async () => {
            try {
              await this.$store.dispatch('groups/delete', this.id)
              this.$router.replace('/groups')
            }
            catch (err) {
              return Promise.reject(err)
            }
          }
        })
        .modal('show')
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