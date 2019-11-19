<template>
  <div class="wrapper">
    <portal to="actionBar">
      <div class="ui fluid center aligned"> 
        <img 
          class="ui centered image fluid logo"
          src="../../assets/join-us-white.png"
        >
      </div>
    </portal>

    <h1 class="ui header">
      Explore new activities
    </h1>

    <div class="welcome-block">
      <p class="welcome-text">
        Find a new community or start your own.
      </p>
      <router-link 
        to="/register" 
        class="ui blue button"
      > 
        Register 
      </router-link>

      &nbsp;

      <router-link 
        to="/login" 
        class="ui blue button"
      > 
        Log In 
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  created: function() {
    if (this.$store.state.user.isLoggedIn === true)
      this.$router.replace('/')
  },
  mounted: function() {
    $('body')
      .css({'height': '100%', 'overflow': 'hidden'})
  },
  beforeDestroy: function() {
    $('body')
      .css({'height': '', 'overflow': ''})
  },
}
</script> 

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url("../../assets/stockbrot.jpg") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.ui.header {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  flex: 1;
  margin: 2em auto 0;
  color:white;
  max-width: 80%
}

.welcome-block {
  flex: 1;
  display:block
}

.welcome-text {
  color: white;
  font-size: 16px;
  margin: 0 auto 24px;
  max-width: 80%
}

.ui.image {
  width: 120px;
  height: 55px;
  padding: 0% 1% 1%;
}

.ui.menu {
  background-color: #374b39 !important;
  height: 100%;
}
</style>