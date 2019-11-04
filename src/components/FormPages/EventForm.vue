<template>
  <div class="form-page">
    <portal to="actionBar">
      <div
        id="name-header" 
        class="ui header center aligned large"
      >
        {{ name || "Create an Event" }}
      </div>
    </portal>

    <form class="ui form">
      <div class="field">
        <span class="ui neutral pointing below label">
          Name
        </span>
        <input
          v-model="name" 
          type="text"
          placeholder="Happy fun times in Otaniemi"
        >
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Location
        </span>
        <input
          v-model="location"
          type="text"
          placeholder="Otakaari 1, Espoo, Finland"
        >
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Date
        </span>
        <input
          v-model="date"
          type="date"
        >
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Time
        </span>
        <input
          v-model="time"
          type="time"
        >
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Image
        </span>
        <input
          v-model="image"
          type="url"
          placeholder="https://example.com/static/test.png"
        >
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Tags
        </span>
          
        <div
          class="ui multiple fluid dropdown"
        >
          <input
            type="hidden"
            name="tags"
          >
          <span class="text">
            No tags selected
          </span>
          
          <div class="menu fluid">
            <div class="ui icon search input">
              <i class="search icon" />
              <input
                type="text"
                placeholder="Search tags..."
              >
            </div>

            <div class="divider" />

            <div class="ui action input">
              <input
                v-model="inputTag"
                type="text"
                placeholder="Add a tag"
              >
              <button
                class="ui button neutral"
                @click="addTag"
              >
                Add
              </button>
            </div>

            <div class="divider" />

            <div class="header">
              <i class="tags icon" />
              Available tags
            </div>

            <div class="scrolling menu">
              <div
                v-for="tag in availableTags"
                :key="tag"
                :value="tag"
                class="item"
              >
                {{ tag }}
              </div>>
            </div>
          </div>
        </div>  
      </div>

      <div class="field">
        <span class="ui neutral pointing below label">
          Description
        </span>
        <textarea v-model="description" />
      </div>

      <IconButton
        text="Submit"
        icon="save outline"
        color="positive fluid"
        :click-handler="submitHandler"
        type="submit"
      />
    </form>
  </div>
</template>

<script>
import IconButton from '../utils/IconButton.vue'

export default {
  name: 'EventForm',
  components: {
    IconButton
  },
  data: function() {
    return {
      id: '',
      name: '',
      location: '',
      image: '',
      date: '',
      time: '',
      tags: [],
      description: '',
      inputTag: '',
      availableTags: this.$store.getters['events/getTags']
    }
  },
  created: async function() {
    this.id = this.$route.params.eventId || this.$route.params.groupId

    if (this.$route.params.eventId) {
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
        this.$router.push('/events')

        err.name = 'LoadingError'
        
        return Promise.reject(err)
      }
    }
  },
  mounted: function() {
    $('.ui.dropdown')
      .dropdown({
        onChange: (value) => {
          this.tags = value.split(',')
        }
      })
  },
  methods: {
    submitHandler(event) {
      event.preventDefault()

      this.$router.push('/events/')
      
      const err = Error('Not implemented yet')
      err.name = 'CustomError'

      throw err
    },
    addTag(event) {
      event.preventDefault()
      
      if (this.inputTag && !this.availableTags.includes(this.inputTag)) {
        this.availableTags = this.availableTags.concat(this.inputTag)
      
        this.updateTagSelection(this.inputTag)

        this.inputTag = ''
      }

      //TODO: show error
    },
    updateTagSelection(tags) {
      //For some reason, semantic ui doesn't refresh the selection without a setTimeout wrapper.
      setTimeout(function () {  
        $('.ui.dropdown')
          .dropdown('set selected', tags)
      }, 1)
      
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