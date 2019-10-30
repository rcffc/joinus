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
      <button class="ui blue button inverted">
        Register
      </button>
      &nbsp; 
 <button class="ui blue button">
          Log In
        </button>
      <router-link
        tag='ui-button' 
        :to="`/login/`" />
    </div>
  </div>
</template>

<script>
export default {}
</script> 

<style scoped>

.wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  background: url("../../assets/stockbrot.jpg") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.ui.header {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  flex: 1;
  margin-top: 40px;
}

.welcome-block {
  flex: 1;
  display:block
}

.welcome-text {
  color: white;
  font-size: 16px;
  margin-bottom: 24px;
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