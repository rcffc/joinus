<template>
  <div
    class="ui container info-box"
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
      class="ui doubling stackable grid container left aligned "
    >
      <div
        class="column"
      >
        <div
          v-if="optionalFields"
          class="info-item"
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
          v-if="tags.length"
          class="info-item"
        >
          <span
            v-for="(tag, index) in tags"
            :key="index"
          >
            #{{ tag }}
          </span>
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
  .info-item {
    margin-top: 0.5em;
  }

  .description {
    overflow: hidden !important;
  }
</style>