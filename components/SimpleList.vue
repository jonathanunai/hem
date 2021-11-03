<template>
  <div class="simple-list">
    <div v-if="!goShopping" class="input-wrap">
      <input v-model="item" type="text" /> <icon-add @click.native="add" />
    </div>
    <ul>
      <transition-group name="bounce">
        <li v-for="line in list" :key="line.item">
          <div class="flex-row">
            <img
              v-if="line.user && line.user.picture"
              :src="line.user.picture"
              class="itemUserPic"
            />

            <span :class="line.state" @click="crossout(line)">
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
    ...mapState(['loading', 'activeList', 'goShopping']),
    list() {
      return this.activeList.list
    },
  },
    watch: {
    list(activeList) {
      console.log(activeList)
    },
  },

  methods: {
    add() {
      if (this.item)
        this.$store.dispatch('ADD_OTHER_ITEM', {
          item: this.item,
          state: 'order',
          quantity: 1,
          user: this.$auth.user,
        })
      this.item = ''
    },
    crossout(item) {
      console.log(this.list[0].state)
      this.$store.dispatch('CROSSOUT', item)

      console.log(this.list[0].state)

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
      padding-left: 6px;
      span {
        color: $colGold3;
      }
    }
  }
  .plus {
    top: 6px;
  }
  .delete-icon {
    top: 0px;
  }
  .input-wrap {
    position: relative;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-right: 5rem;
  }
}
</style>
