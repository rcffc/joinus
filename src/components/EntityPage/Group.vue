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
                v-if="isOwner"
                icon="edit"
                color="neutral"
                size="tiny"
                misc
                :click-handler="editHandler"
              />
              <IconButton
                icon="globe"
                color="caution"
                size="tiny"
                :click-handler="handleHomeClick"
                misc
              />
              <ShareButton
                :share-message="name"
                size="tiny"
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

      <button
        v-if="user.data && memberIndex < 0"
        v-on="{click: this.$store.state.tickets.currentTicket
          ? handleWithdrawClick : handleJoinClick }"
        v-bind:class="[this.$store.state.tickets.currentTicket
          ? 'ui right labeled icon button neutral': 'ui right labeled icon button positive']"
      >
        {{ this.$store.state.tickets.currentTicket
          ? "Withdraw": "Join" }}
        <i
          :class="[this.$store.state.tickets.currentTicket
            ? 'hourglass neutral icon': 'user plus icon']"
        />
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

      <button
        v-if="memberIndex >= 0 && !isOwner"
        :class="['ui right labeled icon button caution']"
        v-on="{click: handleLeaveClick }"
      >
        Leave
        <i :class="['sign-out icon']" />
      </button>
      
      <div v-if="isOwner">
        <div class="ui container left aligned review">
          <span class="ui header small">
            <i class="icon user plus" />
            <div class="content">
              Review Join Requests
            </div>
          </span>

          <div class="candidates">
            <div class="ui list">
              <div
                v-for="(ticket, index) in this.$store.state.tickets.tickets"
                :key="index"
                class="item"
              >
                <div class="ui grid">
                  <div class="twelve wide column">
                    {{ ticket.user_email }}
                  </div>
                  <div class="two wide column">
                    <button
                      class="ui right icon button positive"
                      @click="handleApproveClick(ticket)"
                    >
                      <i class="check icon" />
                    </button>
                  </div>
                  <div class="two wide column">
                    <button
                      class="ui right icon button caution"
                      @click="handleRejectClick(ticket)"
                    >
                      <i class="remove icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ui divider" />

        &nbsp;

        <IconButton
          class="delete"
          text="Delete Group"
          icon="remove"
          color="caution"
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
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  created: async function() {
    this.id = this.$route.params.id

    try {
      const data = await this.$store.dispatch('groups/find', this.id)
      const tickets = await this.$store.dispatch('tickets/findByGroup', this.id)

      for (let key in data) {
        this[key] = data[key]
      }

      if (this.user.isLoggedIn)
        this.memberIndex = this.members.findIndex(user => user.id === this.user.data.id)

      this.isOwner = this.memberIndex >= 0 && this.members[this.memberIndex].role === 'owner'

      for (let t of tickets) {
        if (this.user.isLoggedIn && t.user_email === this.user.data.email && t.group === this.id && this.memberIndex < 0) {
          this.$store.dispatch('tickets/setCurrentTicket', t.id)
          break
        }
      }

      this.loading = false
    }
    catch (err) {
      this.$router.push('/groups')
      
      err.name = 'LoadingError'

      return Promise.reject(err)
    }
  },
  destroyed: function() {
    this.$store.dispatch('tickets/setCurrentTicket', null)
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
    },
    handleJoinClick() {
      try {
        this.$store.dispatch('tickets/create', 
          {user_email: this.user.data.email, user_id: this.user.data.id, group: this.id})
      }
      catch (err) {
        return Promise.reject(err)
      }
    },
    handleWithdrawClick() {
      try {
        this.$store.dispatch('tickets/delete', this.$store.state.tickets.currentTicket)
      }
      catch (err) {
        return Promise.reject(err)
      }
    },
    handleLeaveClick() {
      try {
        this.$store.dispatch('groups/removeMember', {user: this.user.data.id, group: this.id})
        this.memberIndex = -1
      }
      catch (err) {
        return Promise.reject(err)
      }
    },
    handleApproveClick(ticket) {
      try {
        this.$store.dispatch('groups/addMember', {user: ticket.user_id, group: ticket.group})
        this.$store.dispatch('tickets/delete', ticket.id)
      }
      catch (err) {
        return Promise.reject(err)
      }
    },
    handleRejectClick(ticket) {
      try {
        this.$store.dispatch('tickets/delete', ticket.id)
      }
      catch (err) {
        return Promise.reject(err)
      }
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

.candidates {
  max-width: 90%;
  margin: 0 auto;
}

.ui.grid>[class*="twelve wide"].column {
  padding-top: 1.5rem;
}

.delete {
  position: relative;
  bottom: -4em;
}

.positive {
  background-color: #374b39 !important;
}

.neutral {
  background-color: #af9164 !important;
  color: white !important;
}

.caution {
  background-color: #a43a31 !important;
  color: white !important;
}

</style>