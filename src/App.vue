<template>
  <div 
    id="app"
    class="ui container"
  > 
    <ActionBar />    
    <Navbar />
    <Notification
      :text="notificationText"
      :error="notificationType"
    />
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<script>
import Navbar from './components/Navbar.vue'
import ActionBar from './components/ActionBar/ActionBar.vue'
import Notification from './components/Notification.vue'

export default {
  name: 'app',
  components: {
    ActionBar,
    Navbar,
    Notification
  },
  data: function() {
    return {
      notificationType: false,
      notificationText: ''
    }
  },
  errorCaptured(err, vm, info) { //Global error handler
    this.notificationType = true
    this.notificationText = err.message
    return false
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #dfd5cb;
  background-image: url('../assets/32612b83.png');
  min-height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 !important;
}
</style>
