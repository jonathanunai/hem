<template>
  <div style="">
    <h3 v-if="filteredList.length > 0">Shopping list</h3>
    <h3 v-else style="padding-top: 1rem">Start a new shopping list!</h3>
    <ul>
      <li
        v-for="(item, index) in filteredList"
        :key="index"
        @click="crossout(item.item)"
      >
        <span :class="item.state">{{ item.item }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    shoppingList() {
      return this.$store.state.shoppingList
    },
    filteredList() {
      return this.shoppingList.filter((i) =>
        ['crossed', 'order'].includes(i.state)
      )
    },
  },
  methods: {
    crossout(item) {
      this.$store.dispatch('CROSSOUT', item)
    },
  },
}
</script>
<style lang="scss" scoped>
li {
  cursor: pointer;
  margin-top: 4px;
}
@keyframes strike {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.crossed {
  position: relative;
  color: $colGrey;
}
.crossed::after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: 0px;
  width: 100%;
  height: 2px;
  background: $colLightGrey;
  animation-name: strike;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
h3 {
  margin-top: 1rem;
  font-size: 1.4rem;
}
</style>
