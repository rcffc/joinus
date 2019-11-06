<template>
  <div
    v-if="visible"
    id="notification"
    :class="`ui ${ (error) ? 'error' : 'positive' } message`"
  >
    <i  
      class="close icon"
      @click="closeHandler" 
    >
      <span
        v-if="count"
        id="amount"
      >
        <strong>
          {{ count }}
        </strong>
      </span>
    </i>
    

    <div class="header">
      {{ header }}
    </div>

    <p>
      {{ message }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'Notification',
  data: function() {
    return {
      error: false,
      header: '',
      message: '',
      visible: false
    }
  },
  computed: {
    ...mapGetters({
      count: 'notifications/count'
    })
  },
  created: async function() {
    this.$store.subscribe((mutation) => {      
      if (mutation.type === 'notifications/addNotification' && !this.visible) {
        this.showNotification()
        this.visible = true
      }
    })

    this.visible = this.count > 0

    if (this.visible)
      this.showNotification()

  },
  methods: {
    showNotification: async function() {
      let data = {}

      try {
        data = await this.$store.dispatch('notifications/next')
      }
      catch (err) {
        data = { error: true, header: 'Error',  message: 'Internal error' }
      }
      
      if (data) {
        this.error = data.error
        this.header = data.header || 'Notification'
        this.message = data.message

        return true
      }
      else {
        return false
      }
    },
    closeHandler: async function () {
      this.visible = await this.showNotification()
    }
  }
}
</script>

<style scoped>
#notification {
  position: fixed; 
  width: 100%;
  bottom: 5rem;
}
</style>