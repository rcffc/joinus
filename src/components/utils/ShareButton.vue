<template>
  <button
    v-if="canShare"
    :class="`ui ${ (misc) ? 'basic' : 'right labeled' } icon button ${ size } neutral icon-button`"
    @click="clickHandler" 
  > 
    <i :class="`share icon`" />
    {{ (misc) ? '' : 'Share' }}
  </button>
</template>

<script>
export default {
  name: 'ShareButton',
  props: {
    size: {
      type: String,
      default: ''
    },
    misc: {
      type: Boolean,
      default: false
    },
    shareMessage: {
      type: String,
      required: true
    }
  },
  data: function() {
  
    return {
      canShare: navigator.share
    }
  },
  methods: {
    clickHandler() {
      navigator.share({
        title: 'JoinUs!',
        text: `Check out ${ this.shareMessage }`,
        url: window.location.href
      })
        .catch(err => alert(err.message))
    }
  }
}
</script>

<style scoped>

.neutral {
  background-color: #af9164 !important;
  color: white !important;
}

.basic.neutral {
  color: #af9164 !important;
  box-shadow: 0 0 0 1px inset !important;
}

</style>