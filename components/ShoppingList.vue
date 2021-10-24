<template>
  <div style="">
    <transition name="fade">
      <new-item v-if="!goShopping" />
    </transition>
    <ul>
      <transition-group name="bounce">
        <li v-for="item in filteredList" :key="item.item">
          <div class="flex-row">
            <div class="buttons fixed-width">
              <icon-add
                v-if="item.quantity > 1 && !goShopping"
                :inverted="true"
                @click.native="changeQuantity(item.item, 'decrease')"
              />
              <icon-add v-if="!goShopping" @click.native="changeQuantity(item.item)" />
              <img v-if="item.avatar" :src="item.avatar" />
            </div>
            <span :class="item.state" @click="crossout(item.item)">
              {{ item.item }}
              <span v-if="item.quantity > 1"> ({{ item.quantity }})</span>
            </span>
          </div>
          <div v-if="!goShopping" class="buttons">
            <icon-add
              class="delete-icon"
              @click.native="deleteItem(item.item)"
            />
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
    ...mapState(['shoppingList', 'goShopping']),
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
    deleteItem(item) {
      this.$store.dispatch('DELETE_ITEM', item)
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
  padding-top: 0.5rem;
}
li {
  margin-top: 4px;
  font-size: 1.223rem;
  display: flex;
  justify-content: space-between;
  span {
    cursor: pointer;
    text-align: left;
    span {
      color: $colGold3;
    }
  }
}
img {
  border-radius: 50%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: 1px solid #bf9b30;
  padding: 0;
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
  margin-top: 2rem;
  font-size: 1.4rem;
  color: $colGold4;
}
</style>
