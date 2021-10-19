<template>
  <div class="input-wrapper">
    <vue-simple-suggest
      v-model="item"
      :list="fullList"
      placeholder="We need to buy...?"
      :filter-by-query="true"
      @select="suggestionClicked"
    >
    </vue-simple-suggest>

    <icon-add @click.native="add" />

  </div>
</template>
<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css'

export default {
  components: {
    VueSimpleSuggest,
  },
  data() {
    return {
      item: '',
      items: [],
    }
  },
  computed: {
    fullList() {
      return this.$store.state.shoppingList.map((el) => el.item)
    },
  },
  methods: {
    add() {
      if (this.item)
        this.$nuxt.$emit('add-item', { item: this.item, state: 'order', quantity: 1 })
      this.item = ''
    },
    suggestionClicked(val) {
      this.item = val
      this.add()
    }
  },
}
</script>
<style lang="scss">
.input-wrapper {
  position: relative;
  margin-top: 3rem;
}
.vue-simple-suggest.designed .input-wrapper  {
  margin-right: 57px;
}
.vue-simple-suggest.designed .input-wrapper input {
}
</style>
