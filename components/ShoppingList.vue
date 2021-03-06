<template>
  <div style="">
    <new-item v-if="!goShopping" />
    <ul>
      <transition-group name="bounce">
        <li v-for="item in filteredList" :key="item.item" :class="activeItem === item.item ? 'active' : ''">
          <div class="flex-row" >
            <div class="buttons fixed-width">
              <icon-add
                v-if="item.quantity > 1 && !goShopping"
                :inverted="true"
                @click.native="changeQuantity(item.item, 'decrease')"
              />
              <icon-add
                v-if="!goShopping"
                @click.native="changeQuantity(item.item)"
              />
              <img
                v-if="item.user && item.user.picture"
                :src="item.user.picture"
                class="itemUserPic"
              />
            </div>
            <span
              :class="item.state"
              @click.prevent.stop="handleClick($event, item)"
            >
              {{ item.item }}
              <span v-if="item.quantity > 1"> ({{ item.quantity }})</span>
            </span>
          </div>
        </li>
      </transition-group>
    </ul>
    <div class="button-wrapper">
      <btn v-if="!goShopping" @click.native="toShopping">{{
        $t('GoShopping')
      }}</btn>
    </div>

    <vue-simple-context-menu
      :ref="'vueSimpleContextMenu'"
      :element-id="'myUniqueId'"
      :options="options"
      @option-clicked="optionClicked"
      @menu-closed="activeItem=''"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import VueSimpleContextMenu from 'vue-simple-context-menu'

export default {
  components: {
    VueSimpleContextMenu,
  },
  data() {
    return {
      itemData: {},
      showTooltip: false,
      activeItem: '',
      options: [
        { name: this.$t('CrossoutItem'), action: 'cross' },
        { name: this.$t('Removefromlist'), action: 'remove' },
        { name: this.$t('Deletecompletely'), action: 'delete' },
      ],
    }
  },
  computed: {
    ...mapState(['shoppingList', 'goShopping']),
    filteredList() {
      if (Array.isArray(this.shoppingList))
        return this.shoppingList.filter((i) =>
          ['crossed', 'order'].includes(i.state)
        )
      else return []
    },
  },
  methods: {
    crossout(item) {
      this.$store.dispatch('CROSSOUT', item)
    },
    handleClick(event, item) {
      if (this.goShopping) this.crossout(item)
      else  {
        this.activeItem = item.item
        this.$refs.vueSimpleContextMenu.showMenu(event, item)
      }
    },
    optionClicked(event) {
      if (event.option.action === 'cross') this.crossout(event.item)
      else if (event.option.action === 'remove')
        this.deleteItem(event.item.item)
      else if (event.option.action === 'delete') this.$store.dispatch('HARD_DELETE_ITEM', event.item.item)
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
    toShopping() {
      this.$store.dispatch('TOGGLE_GO_SHOPPING')
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
  transition: all 0.2s ease-in-out;

  span {
    cursor: pointer;
    text-align: left;
    span {
      color: $colGold3;
    }
  }
  &.active {
    background: $colGold2;
    color: $colGold5;
    transition: all 0.4s ease-in-out;
  }
}
h3 {
  margin-top: 2rem;
  font-size: 1.4rem;
  color: $colGold4;
}
/* .tootltip {
  position: absolute;
  background: $colGold5;
  border-radius: 0.4rem;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  a {
    width: 100%;
    margin-bottom: 0.4rem;
  }
}
 */
.button-wrapper {
  width: 100%;
  text-align: center;
  padding: 2rem 1rem;
}
</style>
