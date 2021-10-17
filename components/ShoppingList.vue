<template>
  <div style="">
    <div style="position: relative">
      <h3 v-if="filteredList.length > 0">The Shopping list</h3>
      <h3 v-else style="padding-top: 1rem">Start a new shopping list!</h3>
    </div>
    <ul>
      <transition-group name="bounce">
        <li v-for="item in filteredList" :key="item.item">
          <span :class="item.state" @click="crossout(item.item)">
            {{ item.item }}
            <span v-if="item.quantity > 1"> ({{ item.quantity }})</span>
          </span>
          <div class="buttons">
            <icon-add
              v-if="item.quantity > 1"
              :inverted="true"
              @click.native="changeQuantity(item.item, 'decrease')"
            />
            <icon-add @click.native="changeQuantity(item.item)" />
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['shoppingList']),
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
    changeQuantity(item, to) {
      this.$store.dispatch('CHANGE_QUANTITY', { item, to })
    },
    refresh() {
      this.$store.dispatch('LOADING')
      this.$store
        .dispatch('REFRESH_LIST')
        .then(() => this.$store.dispatch('LOADED'))
    },
  },
}
</script>
<style lang="scss" scoped>
ul {
  padding-left: 12px;
}
li {
  margin-top: 4px;
  font-size: 1.223rem;
  display: flex;
  justify-content: space-between;
  span {
    cursor: pointer;
    span {
      color: $colLightBlue;
    }
  }
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
  top: 49%;
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
.buttons {
  display: flex;
  position: relative;
  .plus {
    position: relative;
    margin-right: 4px;
    width: 20px;
    height: 20px;
    font-size: 0.9rem;
    right: unset;
  }
}
</style>
