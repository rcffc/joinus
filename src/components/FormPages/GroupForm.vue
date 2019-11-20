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
      <div :class="`field ${ (nameError) ? 'error' : '' }`">
        <span class="ui neutral pointing below label">
          Name
        </span>
        <input
          v-model="name" 
          type="text"
          placeholder="JoinUs!"
          @keyup="checkName"
        >
        <div :class="`ui ${ (nameError) ? '' : 'hidden' } pointing red basic label fluid`">
          {{ nameError }}
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
import { mapGetters } from 'vuex'
import IconButton from '../utils/IconButton.vue'
import _ from 'underscore'

const MIN_NAME_LEN = 3
const MAX_NAME_LEN = 15
const MAX_DESC_LEN = 800

export default {
  name: 'GroupForm',
  components: {
    IconButton
  },
  data: function() {
    return {
      id: '',
      name: '',
      nameError: '',
      image: '',
      imageError: '',
      tags: [],
      description: '',
      descriptionError: '',
      tagError: '',
      members: [],
      availableTags: [],
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  created: async function() {
    this.id = this.$route.params.groupId

    if (!this.user.isLoggedIn) {

      const err = Error('Not logged in')
      err.name = 'CustomError'

      this.$router.replace('/welcome')
      return Promise.reject(err)
    }

    this.members = this.members.concat({ id: this.user.data.id, role: 'owner' })

    if (this.id) {
      try {
        const data = await this.$store.dispatch('groups/find', this.id)

        for (let key in data) {
          this[key] = data[key]
        }
        
        const memberIndex = this.members.findIndex(user => user.id === this.user.data.id)

        if (memberIndex < 0 || this.members[memberIndex].role !== 'owner') {
          const err = Error('not owner')
          err.name = 'FirebaseError'

          this.$router.replace(`/groups/${ this.id }`)
          return Promise.reject(err)
        }

        //Update via onAdd
        this.tags = []
        this.updateTagSelection(data.tags)
      }
      catch (err) {
        this.$router.push('/groups')

        err.name = 'CustomError'
        
        return Promise.reject(err)
      }
    }

    this.availableTags = this.$store.getters['groups/getTags']

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
        },
        onAdd: (value) => {
          try {
            this.checkTag(value)
            
            this.tags = this.tags.concat(value)
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
      this.checkDescription()

      if (this.nameError || this.tagError || this.descriptionError)
        return

      const result = _.pick(this, ['name', 'tags', 'description', 'image', 'members'])

      

      try {
        if (this.id) {
          await this.$store.dispatch('groups/edit', { ...result, id: this.id })
        }
        else {
          result.members = { [this.$store.getters['user/user'].data.id]: 'owner' }
          await this.$store.dispatch('groups/create', result)
        }
          
      }
      catch (err) {
        err.name = 'CustomError'
        throw err
      }

      this.$router.replace('/groups/')
    },
    checkString(str) {
      if (!/^[a-z0-9-./&’!”(),:? \xC0-\xFF]+$/i.test(str))
        throw Error('Please use only these characters: A-Za-z0-9-,.:?/\\&’!”“ and foreign characters')
    },
    addTag({ target }) {
      let { value } = target

      if (/\s/g.test(value)) {
        target.value = ''
        value = value.trim()
        
        //Check tag validity here so that the tag will be added to the UI but if it is invalid an error will be shown.
        try {
          this.checkTag(value)

          if (!this.availableTags.includes(value))
            this.availableTags = this.availableTags.concat(value)
        }
        catch (err) {
          this.tagError = err.message
        }

        this.updateTagSelection(value.trim())
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
    checkImage() {
      this.imageError = ''

      try {
        this.checkUrl(this.image)
      }
      catch (err) {
        this.imageError = err.message
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
  color: white !important;
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