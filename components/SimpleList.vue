<template>
  <div class="simple-list">
    <div class="input-wrap">
      <input v-model="item" type="text" /> <icon-add @click.native="add" />
    </div>
    <ul>
      <transition-group name="bounce">
        <li v-for="line in activeList.list" :key="line.item">
          <div class="flex-row">
            <span :class="line.state">
              {{ line.item }}
            </span>
          </div>
          <div class="buttons">
            <icon-add class="delete-icon" @click.native="deleteItem(line)" />
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      item: '',
    }
  },
  computed: {
    ...mapState(['loading', 'activeList']),
  },
  methods: {
    add() {
      if (this.item) this.$store.dispatch('ADD_OTHER_ITEM', { item: this.item })
      this.item = ''
    },
    deleteItem(item) {
      this.$store.dispatch('DELETE_OTHER_ITEM', item)
    },
  },
}
</script>
<style lang="scss">
.simple-list {
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
  .plus {
    top: 6px;
  }
  .input-wrap {
    position: relative;
    margin-top: 2rem;
    padding-right: 5rem;
  }
}
</style>
