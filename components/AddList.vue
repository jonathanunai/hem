<template>
  <div class="flex-col">
    <h4 style="padding-bottom: 2rem">Create a new list!</h4>
    <div class="flex-col">
      <p>
        Choose a name for your new list. For example "Movie watch list", "Future
        shopping list", "House TODO list", etc...
      </p>
      <input v-model="listName" type="text"/>
      <btn style="margin-bottom: 0.5rem" @click.native="create"> Create </btn>
      <btn class="btn" @click.native="$emit('close')"> Close </btn>
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
        console.log(newList)
        this.$emit('close')
      }
    },
  },
}
</script>
