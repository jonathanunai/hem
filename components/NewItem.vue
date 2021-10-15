<template>
  <div class="input-wrapper">
    <!--     <input v-model="item" type="text" placeholder="We need...?" />
    <vue-suggestion
      v-model="item"
      :setLabel="setLabel"
      :itemTemplate="ItemTemplate"
      :items="items"
      @changed="inputChange"
      @selected="itemSelected"
    >
    </vue-suggestion> -->
    <vue-simple-suggest v-model="item" :list="fullList" placeholder="We need to buy...?" :filter-by-query="true">
      <!-- Filter by input text to only show the matching results -->
    </vue-simple-suggest>
    <p>Chosen element: {{ item }}</p>

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
        this.$nuxt.$emit('add-item', { item: this.item, state: 'order' })
      this.item = ''
    },
  },
}
</script>
<style lang="scss">
.input-wrapper {
  position: relative;
}
.vue-simple-suggest.designed .input-wrapper input {
  width: 80%;
}
</style>
