<template>
  <button :class="`ui right labeled icon button ${ size } ${ color } icon-button`">
    <i :class="`${ icon } icon`" />
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'black'
    },
    clickHandler: {
      type: Function,
      default: () => null
    },
    size: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
</style>