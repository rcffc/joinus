<template>
  <div>
    <div
      @click="clickHandler"
      :class="`ui ${ (misc) ? 'basic' : 'right labeled' } icon button ${ size } positive icon-button`"
    > 
      <i class="calendar icon" />
      {{ (misc) ? '' : 'Save the date' }}
    </div>

    <div class="ui modal">
      <div class="header">
        Add to Calendar
      </div>

      <!-- calendar options -->
      <div class="ui content menu vertical">
        <a 
          class="ui button fluid google-link"
          :href="googleLink"
        >
          Google
        </a>

        <a 
          class="ui button fluid disabled outlook-link"
        >
          Outlook
        </a>
      </div>
    </div>
  </div>
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
    clickHandler: function() {
      $('.ui.modal')
        .modal('show')
    },
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

.google-link {
	background: url("../../../assets/search.svg") 18px 50% no-repeat;
	background-size: 22px 100%;
}

.outlook-link {
	background: url("../../../assets/outlook.svg") 18px 50% no-repeat;
	background-size: 22px 100%;
}

</style>