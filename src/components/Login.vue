<template>
  <div class="center">
    <portal to="actionBar">
      <div class="ui menu transparent inverted fluid center aligned"> 
        <img 
          class="ui centered image fluid logo"
          src="../../assets/join-us-white.png">
      </div>
    </portal>

    <div>
      <h1 class="ui header">
        Explore new activities
      </h1>
      <div class="login-background">
        <p class="login-text">
          Find a new community or start your own.
        </p>
        <div class="login-button" />
        <button class="ui blue labeled icon button">
          <i class="google icon" />
          Join Us!
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script> 

<style scoped>
.login-background {
  background-color: black;
  background-image: url("../../assets/stockbrot.jpg");
  background-position: center;
  background-origin: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: 100% 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  width: 100%;
  padding: 80px;
  color: white;
  font-size: 1em;
  font-weight: bold;
}

.center {
  width: 100%;
}

.login-text {
  position: relative;
  bottom: 60px;
  left: 0psx;
}

.login-button {
  position: relative;
  top: 60px;
  left: 0px;
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