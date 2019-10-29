<template>
  <div 
    id="app"
    class="ui container"
  > 
    <ActionBar />    
    <Navbar />
    <Notification />
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<script>
import { mapMutations } from 'vuex'
import Navbar from './components/Navbar.vue'
import ActionBar from './components/ActionBar/ActionBar.vue'
import Notification from './components/Notification.vue'
import ErrorHandler from './utils/errorHandler.js'
import errorHandler from './utils/errorHandler.js'

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
  methods: {
    ...mapMutations({
      addNotification: 'notifications/addNotification'
    })
  },
  errorCaptured(err, vm, info) { //Global error handler

    this.addNotification(errorHandler(err))
    return false //Should error propagation resume? => No stop here
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
