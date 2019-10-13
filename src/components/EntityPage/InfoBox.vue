<template>
  <div
    class="ui container"
  >
    <img
      class="ui large rounded centered image"
      :src="image"
    >  

    <h1 
      class="ui header huge"
    >
      {{ name }}
    </h1>

    <div
      class="ui divider"
    />

    <div 
      class="ui three column doubling stackable grid container left aligned "
    >
      <div
        class="column"
      />
      
      <div
        class="ui column"
      >
        <div
          v-if="tags.length"
        >
          <div
            v-for="(tag, index) in tags"
            :key="index"
          >
            <span>
              #{{ tag }}
            </span>
          </div>
        </div>

        <div
          v-if="optionalFields"
        >
          <div
            v-for="(value, key) in optionalFields"
            :key="key"
            class="ui list"
          >
            <div
              class="ui item"
            >
              <i
                :class="`icon ${ value.icon }`"
              />
              <span
                class="content"
              >
                {{ value.content }}
              </span>
            </div>
          </div>
        </div>
        <div
          class="ui divider"
        />
        
        <div 
          class="description"
        >
          {{ description }}
        </div>
      </div>

      <div
        class="column"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBox',
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      default: () => []
    },
    // Parent can pass optional items which have form { content, icon }
    optionalFields: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style scoped>
</style>