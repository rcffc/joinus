<template>
  <div class="body">
    <sui-container text>
      <h2 is="sui-header">Explore new activities</h2>
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
  background-image: url("../../assets/stockbrot.jpg");
  background-color: black;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  padding: 80px;
  font-size: 1em;
  font-weight: bold;
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