<template>
  <button
    @click="clickHandler" 
    :class="`ui ${ (misc) ? 'basic' : 'right labeled' } icon button ${ size } ${ color } icon-button`"
  >
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
      default: ''
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
    },
    misc: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

.positive {
  background-color: #617073 !important;
}

.caution {
  background-color: #c4b7cb !important;
  color: white !important;
}

.neutral {
  background-color: #af9164 !important;
  color: white !important;
}

.basic.positive {
  color: #617073 !important;
  box-shadow: 0 0 0 1px inset !important;
}

.basic.caution {
  color: #c4b7cb !important;
  box-shadow: 0 0 0 1px inset !important;
}

.basic.neutral {
  color: #af9164 !important;
  box-shadow: 0 0 0 1px inset !important;
}

</style>