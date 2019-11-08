<template>
  <div class="form-page">
    <portal to="actionBar">
      <div
        id="name-header" 
        class="ui header center aligned large"
      >
        {{ create ? "Create an Event" : name }}
      </div>
    </portal>

    <form class="ui form">
      <div :class="`field ${ (nameError) ? 'error' : '' }`">
        <span class="ui neutral pointing below label">
          Name
        </span>
        <input
          v-model="name" 
          type="text"
          placeholder="Happy fun times in Otaniemi"
          @keyup="checkName"
        >
        <div :class="`ui ${ (nameError) ? '' : 'hidden' } pointing red basic label fluid`">
          {{ nameError }}
        </div>
      </div>

      <div :class="`field ${ (locationError) ? 'error' : '' }`">
        <span class="ui neutral pointing below label">
          Location
        </span>
        <input
          v-model="location"
          type="text"
          placeholder="Otakaari 1, Espoo, Finland"
          @keyup="checkLocation"
        >
        <div :class="`ui ${ (locationError) ? '' : 'hidden' } pointing red basic label fluid`">
          {{ locationError }}
        </div>
      </div>

      <div :class="`field ${ (timeError) ? 'error' : '' }`">
        <span class="ui neutral pointing below label">
          Date
        </span>
        <input
          v-model="date"
          type="date"
          @keyup="checkTime"
        >
        <div :class="`ui ${ (timeError) ? '' : 'hidden' } pointing red basic label fluid`">
          {{ timeError }}
        </div>
      </div>

      <div :class="`field ${ (timeError) ? 'error' : '' }`">
        <span class="ui neutral pointing below label">
          Time
        </span>
        <input
          v-model="time"
          type="time"
          @keyup="checkTime"
        >
        <div :class="`ui ${ (timeError) ? '' : 'hidden' } pointing red basic label fluid`">
          {{ timeError }}
        </div>
      </div>

      <div :class="`field ${ (imageError) ? 'error' : '' }`">
        <span class="ui neutral pointing below label">
          Image
        </span>
        <input
          v-model="image"
          type="url"
          placeholder="https://example.com/static/test.png"
          @keyup="checkImage"
        >
        <div :class="`ui ${ (imageError) ? '' : 'hidden' } pointing red basic label fluid`">
          {{ imageError }}
        </div>
      </div>

      <div :class="`field ${ (tagError) ? 'error' : '' }`">
        <span class="ui neutral pointing below label">
          Tags
        </span>
          
        <div
          id="tags"
          class="ui multiple search selection fluid dropdown"
          @keyup="addTag"
        >
          <input
            type="hidden"
            name="tags"
          >
          <span class="text">
            No tags selected
          </span>
          
          <div class="menu fluid">
            <div
              v-for="tag in availableTags"
              :key="tag"
              :data-value="tag"
              class="item"
            >
              {{ tag }}
            </div>
          </div>
        </div>
        
        <div :class="`ui ${ (tagError) ? '' : 'hidden' } pointing red basic label fluid`">
          {{ tagError }}
        </div>
      </div>

      <div :class="`field ${ (descriptionError) ? 'error' : '' }`">
        <span class="ui neutral pointing below label">
          Description
        </span>
        <textarea
          v-model="description"
          @keyup="checkDescription"
        />
        <div :class="`ui ${ (descriptionError) ? '' : 'hidden' } pointing red basic label fluid`">
          {{ descriptionError }}
        </div>
      </div>

      <IconButton
        text="Submit"
        icon="save outline"
        color="positive fluid"
        :click-handler="submitHandler"
      />
    </form>
  </div>
</template>

<script>
import IconButton from '../utils/IconButton.vue'
import _ from 'underscore'

const MIN_NAME_LEN = 3
const MAX_NAME_LEN = 30
const MIN_LOCATION_LEN = 5
const MAX_DESC_LEN = 800

export default {
  name: 'EventForm',
  components: {
    IconButton
  },
  data: function() {
    return {
      id: '',
      name: '',
      nameError: '',
      location: '',
      locationError: '',
      image: '',
      imageError: '',
      date: '',
      time: '',
      timeError: '',
      tags: [],
      description: '',
      descriptionError: '',
      tagError: '',
      availableTags: this.$store.getters['events/getTags'],
      create: true,
    }
  },
  created: async function() {
    this.create = (this.$route.params.eventId) == null
    this.id = this.$route.params.eventId || this.$route.params.groupId

    if (!this.create) {
      try {
        const data = await this.$store.dispatch('events/find', this.id)

        for (let key in data) {
          this[key] = data[key]
        }

        this.date = data.date.toISOString().substring(0, 10)
        
        let [hours, mins] = data.date.toLocaleTimeString().split(':')

        this.time = `${ ((hours.length < 2) ? '0' : '') + hours }:${ mins }` 

        this.updateTagSelection(this.tags)
      }
      catch (err) {
        this.$router.replace('/events')

        err.name = 'LoadingError'
        
        return Promise.reject(err)
      }
    }
  },
  mounted: function() {
    $('#tags')
      .dropdown({
        allowAdditions: true,
        onRemove: (value) => {
          this.tags = this.tags.filter(tag => tag !== value)

          try {
            this.tags.map(tag => this.checkTag(tag))

            this.tagError = ''
          }
          catch (err) {
            this.tagError = err.message
          }
        }
      })
  },
  methods: {
    async submitHandler(event) {
      event.preventDefault()

      this.checkName()
      this.checkImage()
      this.checkLocation()
      this.checkTime()
      this.checkDescription()
      

      if (this.nameError || this.locationError || this.timeError || this.tagError || this.descriptionError)
        return
      
      const result = _.pick(this, ['name', 'location', 'tags', 'description', 'image'])

      result.date = new Date(`${ this.date } ${ this.time }`)

      try {
        (this.create) ?
          this.$store.dispatch('events/create', { ...result, organizer: this.id })
          :
          this.$store.dispatch('events/edit', { ...result, id: this.id })
      }
      catch (err) {
        err.name = 'CustomError'
        throw err
      }

      this.$router.replace('/events/')
    },
    updateTagSelection(tags) {
      //For some reason, semantic ui doesn't refresh the selection without a setTimeout wrapper.
      setTimeout(function () {  
        $('.ui.dropdown')
          .dropdown('set selected', tags)
      }, 1) 
    },
    checkString(str) {
      if (!/^[a-z0-9-./&’!”(),:? \xC0-\xFF]+$/i.test(str))
        throw Error('Please use only these characters: A-Za-z0-9-,.:?/\\&’!”“ and foreign characters')
    },
    addTag({ target }) {
      let { value } = target

      if (/\s/g.test(value)) {
        value = value.trim()
        target.value = ''

        try {
          const selectedTags = this.tags.concat(value)

          this.updateTagSelection(selectedTags)
          
          //Check tag validity here so that the tag will be added to the UI but if it is invalid an error will be shown.
          this.checkTag(value)

          this.tags = selectedTags

          this.availableTags = this.availableTags.concat(value)
        }
        catch (err) {
          this.tagError = err.message
        }
      }
    },
    checkTag(str) {
      if (!/^[a-zA-Z0-9\xC0-\xFF]+$/i.test(str))
        throw Error('Please use only letters and digits')
    },
    checkUrl(url) {
      //source https://stackoverflow.com/questions/205923/best-way-to-handle-security-and-avoid-xss-with-user-entered-urls
      if (!/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(url) && url.length)
        throw Error('Please give valid url.')

    },
    checkName() {
      this.nameError = ''
  
      try {
        if (this.name.length > MAX_NAME_LEN || this.name.length < MIN_NAME_LEN )
          throw Error(`Length of the name has to be between ${ MIN_NAME_LEN }-${ MAX_NAME_LEN }`)

        this.checkString(this.name)
      }
      catch (err) {
        this.nameError = err.message
      }
    },
    checkTime() {
      this.timeError = ''
      
      try {
        if (!(this.date && this.time))
          throw Error('Please give a date and time')
      }
      catch (err) {
        this.timeError = err.message
      }

    },
    checkImage() {
      this.imageError = ''
    
      try {
        this.checkUrl(this.image)
      }
      catch (err) {
        this.imageError = err.message
      }
    },  
    checkLocation() {
      this.locationError = ''
    
      try {
        if (!this.location.length)
          throw Error(`Must be at least ${ MIN_LOCATION_LEN } characters long.`)

        this.checkString(this.location)
      }
      catch (err) {
        this.locationError = err.message
      }

    },
    checkDescription() {
      this.descriptionError = ''

      try {
        if (!this.description)
          return

        this.checkString(this.description)

        if (this.description.length > MAX_DESC_LEN)
          throw Error(`The description can't be longer than ${ MAX_DESC_LEN } characters.`)
      }
      catch (err) {
        this.descriptionError = err.message
      }
    }
  }
}
</script>

<style scoped>
#name-header {
  padding-top: 0.5rem;
  color: white;
}

.form-page {
  padding: 3rem 1rem;
  margin-bottom: 5rem;
  width: 100%;
}

.neutral {
  background-color: #af9164 !important;
  color: white !important;
}

.basic.neutral {
  color: #af9164 !important;
  box-shadow: 0 0 0 1px inset !important;
}

.ui.multiple.fluid.dropdown {
  background-color: white !important;
  border-radius: 4px;
}

.empty {
  display: none;
}
</style>