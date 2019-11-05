<template>
  <div class="form-page">
    <portal to="actionBar">
      <div
        id="name-header" 
        class="ui header center aligned large"
      >
        {{ name || "Create a Group" }}
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
          placeholder="My fun group"
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
          id="tags"
          class="ui multiple selection search fluid dropdown"
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
  name: 'GroupForm',
  components: {
    IconButton
  },
  data: function() {
    return {
      id: '',
      name: '',
      image: '',
      tags: [],
      description: '',
      inputTag: '',
      availableTags: this.$store.getters['groups/getTags']
    }
  },
  created: async function() {
    this.id = this.$route.params.groupId

    if (this.id) {
      try {
        const data = await this.$store.dispatch('groups/find', this.id)

        for (let key in data) {
          this[key] = data[key]
        }

        this.updateTagSelection(this.tags)
      }
      catch (err) {
        this.$router.push('/groups')

        err.name = 'CustomError'
        
        return Promise.reject(err)
      }
    }
  },
  mounted: function() {
    $('#tags')
      .dropdown({
        allowAdditions: true,
        onChange: (value) => {
          this.tags = value.split(',')
        }
      })
  },
  methods: {
    submitHandler(event) {
      event.preventDefault()

      this.$router.push('/groups/')
      
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