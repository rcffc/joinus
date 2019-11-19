<template>
  <div class="event">
    <div
      v-if="loading"
      class="ui loader active large"
    />

    <div v-else>
      <portal to="actionBar">
        <div class="ui grid action-bar-content">
          <div class="ten wide column aligned right">
            <div
              id="name-header" 
              class="ui header center aligned"
            >
              {{ name }}
            </div>
          </div>

          <div class="six wide column">
            <div id="button-wrapper">
              <IconButton
                v-if="role"
                icon="edit"
                color="neutral"
                misc
                :click-handler="editHandler"
              />
              <IconButton
                v-if="follow"
                icon="eye slash"
                color="caution"
                misc
                :click-handler="followHandler"
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
        id="event-image"
        class="ui large rounded centered image"
        :src="`${ image || organizer.image}`"
      >

      <div class="ui hidden divider" />
      <router-link
        class="item"
        :to="`/groups/${ organizer.id }`"
      >
        <IconButton
          :text="organizer.name"
          icon="users"
          color="neutral link"
        />
      </router-link>

      <IconButton
        v-if="user.data && !follow"
        text="Follow"
        icon="eye"
        color="positive"
        :click-handler="followHandler"
      />
      <CalendarButton
        :name="name"
        :date="date"
        :location="location"
      />

      <div class="ui container">
        <InfoBox
          :description="description"
          :optional-fields="{
            'location': { 'content': location, 'icon': 'compass' },
            'date': { 'content': date.toLocaleString(), 'icon': 'calendar' },
          }"
        />
      </div>

      <div v-if="role">
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
import { mapGetters } from 'vuex'
import IconButton from '../utils/IconButton.vue'
import InfoBox from './InfoBox.vue'
import ShareButton from '../utils/ShareButton.vue'
import CalendarButton from '../utils/CalendarButton.vue'

export default {
  name: 'Event',
  components: {
    IconButton,
    InfoBox,
    ShareButton,
    CalendarButton
  },
  data: function() {
    return {
      loading: true,
      id: '',
      name: '',
      location: '',
      image: '',
      organizer: '',
      date: '',
      description: '',
      follow: false,
      role: '',
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      getById: 'events/getById',
      user: 'user/user'
    })
  },
  watch: {
    error: function(val) {
      throw val
    }
  },
  created: async function() {
    this.id = this.$route.params.id

    try {
      const data = await this.$store.dispatch('events/find', this.id)

      for (let key in data) {
        this[key] = data[key]
      }

      if (this.user.isLoggedIn) {
        this.role = this.organizer.members[this.user.data.id]
        this.follow = this.user.data.following.some(id => id === this.id)
      }

      this.loading = false
    }
<<<<<<< HEAD
    catch (err) {    
=======
    catch (err) {
      console.log(err)
      
>>>>>>> 44c40e2e034f70364960e20c4a6dcf138284d1f1
      this.$router.push('/events')

      err.name = 'LoadingError'
      
      return Promise.reject(err)
    }
  },
  methods: {
    followHandler() {
      this.follow = !this.follow 
      try {
        this.$store.dispatch('user/edit', [this.user.data.id, this.id])
      }
      catch (err) {
        return Promise.reject(err)
      }
    },
    editHandler() {
      this.$router.push(`/events/edit/${ this.id }`)
    },
    toGroupPage() {
      this.$router.push(`/groups/${ this.organizer.id }`)
    },
    handleDeleteClick() {
      return $('#delete-modal')
        .modal({
          onApprove: async () => {
            try {
              await this.$store.dispatch('events/delete', this.id)
              this.$router.replace('/events')
            }
            catch (err) {
              this.error = err
            }
          }
        })
        .modal('show')
    }
  },
}
</script>

<style scoped>
.event {
  padding-bottom: 10rem;
  text-align: center;
}

.action-bar-content {
  padding-top: 0.5rem;
}


#event-image {
  box-shadow: 0px 2px 1rem #9a938c
}

#name-header {
  padding-top: 0.5rem;
  color: white;
}

#button-wrapper {
  text-align: right
}

</style>