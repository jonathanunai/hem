<template>
  <div class="input-wrapper">
    <vue-simple-suggest
      v-model="item"
      :list="fullList"
      :placeholder="$t('WeNeedToBuy')"
      :filter-by-query="true"
      @select="suggestionClicked"
      @keyup.enter="add"
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
    }
  },
  computed: {
    fullList() {
      return this.$store.state.shoppingList.map((el) => el.item)
    },
    avatar() {
      return this.$auth.user.picture
        ? this.$auth.user.picture
        : '/img/avatar.png'
    },
  },
  methods: {
    add() {
      if (this.item)
        this.$store
          .dispatch('ADD_ITEM', {
            item: this.item,
            state: 'order',
            quantity: 1,
            user: this.$auth.user,
          })
          .then(() => (this.item = ''))
    },
    suggestionClicked(val) {
      this.item = val
      this.add()
    },
  },
}
</script>
<style lang="scss">
.input-wrapper {
  position: relative;
  margin-top: 2rem;
}
.vue-simple-suggest.designed .input-wrapper {
  margin-right: 57px;
}
.vue-simple-suggest.designed .input-wrapper input {
}
</style>
