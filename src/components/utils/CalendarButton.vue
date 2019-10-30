<template>
  <button
    :class="`ui ${ (misc) ? 'basic' : 'right labeled' } icon button ${ size } neutral icon-button`"
    @click="clickHandler" 
  > 
    <i class="calendar icon" />
    {{ (misc) ? '' : 'Add to calendar' }}
  </button>

  <!--
    https://www.google.com/calendar/render?
action=TEMPLATE&
text=Your+Event+Name&
dates=20140127T224000Z/20140320T221500Z&
details=For+details,+link+here:+http://www.example.com&
location=Waldorf+Astoria,+301+Park+Ave+,+New+York,+NY+10022&
sf=true&output=xml
  -->
</template>

<script>
export default {
  name: 'CalendarButton',
  props: {
    size: {
      type: String,
      default: ''
    },
    misc: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickHandler() {
      
    }
  }
}
</script>

<style scoped>

.positive {
  background-color: #374b39 !important;
}

.basic.positive {
  color: #374b39 !important;
  box-shadow: 0 0 0 1px inset !important;
}

</style>