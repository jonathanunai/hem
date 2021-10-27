<template>
  <div class="main-menu">
    <span> Hi {{ $auth.user.name }}!</span>

    <a href="#" @click.prevent="switchToList('ShoppingList')">{{ $t('ShoppingList') }}</a>

    <ul>
      <li v-for="(otherList, index) in otherLists" :key="index">
        <a href="#" @click.prevent="switchToList(index)">{{ otherList.name }}</a>
      </li>
    </ul>

    <a href="https://www.buymeacoffee.com/unaime" _target="_blank">{{ $t('Buyme') }}</a>

    <a href="#" @click.prevent="addList">{{ $t('AddList') }}</a>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isShopping', 'otherLists']),
  },
  methods: {
    switchToList(list) {
      this.$store.dispatch('SWITCH_TO_LIST', list)
      this.$store.dispatch('TOGGLE_MENU')
    },
    clearList() {
      this.$nuxt.$emit('toClearList')
      this.$store.dispatch('TOGGLE_MENU')
    },
    addList() {
      this.$nuxt.$emit('toAddList')
      this.$store.dispatch('TOGGLE_MENU')
    },
  },
}
</script>

<style lang="scss">
.main-menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: $colGold3;
  color: $colDarkGrey;
  padding: 0.5rem;
  left: 1rem;
  width: 300px;
  border-radius: 0.2rem;
  z-index: 2;
  font-size: 1.1rem;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 19px 38px,
    rgba(0, 0, 0, 0.42) 0px 15px 12px;
    cursor: auto;
  span {
    border-bottom: 2px solid #fff;
    margin-bottom: 2rem;
    padding-bottom: 0.4rem;
    font-weight: bold;
    width: 100%;
    background: unset;
    position: relative;
  }
  a {
    margin-bottom: 0.625rem;
    &:hover {
      color: $colGold1;
    }
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      margin-bottom: 0.625rem;
    }
  }
}
</style>
