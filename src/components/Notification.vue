<template>
  <div
    id="notification" 
    class="ui positive message"
  >
    <i class="close icon"></i>
    <div class="header">
      You are eligible for a reward
    </div>
    <p>Go to your <b>special offers</b> page to see now.</p>
  </div>
</template>

<script>
export default {
  name: 'Notification'
}
</script>

<style scoped>
#notification {
  position: fixed;
  width: 100%;
  bottom: 5rem;
}
</style>