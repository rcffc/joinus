<template>
  <div class="ui container info-box">
    <div class="ui doubling stackable grid container left aligned ">
      <div class="column">
        <div
          v-if="optionalFields"
          class="info-item"
        >
          <div
            v-for="(value, key) in optionalFields"
            :key="key"
            class="ui list"
          >
            <div class="ui item">
              <i :class="`icon ${ value.icon }`" />
              <span class="content">
                {{ value.content }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="description info-item">
          {{ description }}
        </div>

        <div class="ui divider" />

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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBox',
  props: {
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
    margin-top: 1.5em;
  }

  .description {
    overflow: hidden !important;
  }
</style>