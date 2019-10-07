<template>
  <div class="center">
    <sui-container text>
      <h1 is="sui-header">Explore new activities</h1>
      <div class="login-background">
        <p class="login-text">Find a new community or start your own.</p>
        <sui-button class="login-button" icon="google" color="blue" content="Join Us!" bottom />
      </div>
    </sui-container>
  </div>
</template>

<script>
export default {};
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
</style>