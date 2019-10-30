<template>
  <div
    :class="`ui dropdown simple ${ (misc) ? 'basic' : 'right labeled' } icon button ${ size } positive icon-button`" 
  > 
    <i class="calendar icon" />
    {{ (misc) ? '' : 'Remember' }}

    <!-- calendar options -->
    <div class="menu">
      <a 
        class="item button icon"
        :href="googleLink"
      >
        <i class="google icon" />
        Google
      </a>
    </div>
  </div>

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
    },
    name: {
      type: String,
      default: 'Event',
      required: true
    },
    date: {
      type: Date,
      default() {
        return new Date()
      },
      required: true
    },
    location: {
      type: String,
      default: 'Otakaari 1, 02150 Espoo, Suomi',
      required: true
    }
  },
  data: function() {
    //NOTE: All events last an hour because we don't have ending dates.
    const endDate = new Date(this.date.getTime())
    endDate.setHours(endDate.getHours() + 1)

    const dateToString = (date) => date.toISOString().replace(/-|:|\.(.*)/gi, '') + 'Z'

    console.log(this.date.toISOString())

    return {
      googleLink: [
        'https://www.google.com/calendar/render?action=TEMPLATE',
        `text=${ this.name }`,
        `dates=${ dateToString(this.date) }/${ dateToString(endDate) }`, //Start/End
        `location=${ this.location }`,
        'sf=true&output=xml'
      ].join('&')
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