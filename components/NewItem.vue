<template>
  <div class="input-wrapper">
    <input v-model="input" type="text" placeholder="We need...?">
    <icon-add @click.native="add"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
    }
  },
  methods: {
    add() {
      if (this.input)
      this.$nuxt.$emit('add-item', {item: this.input, state: 'order'})
      this.input = ""
    }
  },
}
</script>
<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}

</style>
