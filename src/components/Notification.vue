<template>
  <div
    v-if="visible"
    id="notification"
    :class="`ui ${ (error) ? 'error' : 'positive' } message`"
  >
    <i  
      class="close icon"
      @click="closeHandler" 
    />
    <div class="header">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data: function () {
    return {
      visible: true
    }
  },
  props: {
    error: {
      type: Boolean,
      default: false,
      required: true
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeHandler: function () {
      this.visible = false
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