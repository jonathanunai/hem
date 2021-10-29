<template>
  <div class="flex-col">
    <h4 style="padding-bottom: 2rem">Create a new list!</h4>
    <div class="flex-col">
      <p>
        Choose a name for your new list. For example "Movie watch list", "Future
        shopping list", "House TODO list", etc...
      </p>
      <input v-model="listName" type="text"/>
      <btn @click.native="create"> Create </btn>
      <btn @click.native="$emit('close')"> Close </btn>
    </div>
  </div>
</template>
<script>
const slugify = require('slugify')

slugify('some string') // some-string

export default {
  data() {
    return {
      listName: '',
    }
  },
  methods: {
    create() {
      if (this.listName.length > 2) {
        const newList = {
          slug: slugify(this.listName),
          list: { slug: slugify(this.listName), name: this.listName, list: [] }
        }
        this.$store.dispatch('ADD_LIST', newList)
        this.$emit('close')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
p {
  padding: 0 1rem 1rem;
}
input {
  box-sizing: border-box;
  margin: 0;
  margin-bottom: 1rem;
}
button {
 margin: 0.4rem 0;
}
</style>
