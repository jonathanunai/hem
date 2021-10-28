<template>
  <div
    v-hammer:swipe.right="onSwipeRight"
    class="page-wrapper"
    :class="goShopping ? 'goShopping' : ''"
  >
    <transition name="fade">
      <loading v-if="loading" />
    </transition>

    <div v-if="goShopping">
      <img
        src="/img/cross.png"
        alt="Close"
        class="close-icon"
        @click="stopShopping"
      />
    </div>

    <div v-if="!team && !loading" class="registration-wrapper">
      <registration-modal />
    </div>

    <div v-if="showTeamInfo" class="registration-wrapper">
      <show-team-modal />
    </div>

    <page-header v-if="!goShopping && team" />
    <div v-if="team" v-hammer:swipe.left="onSwipeLeft" class="page-inner">
      <main>
        <div style="position: relative">
          <h3>
            {{
              !isShoppingList
                ? activeList.name
                : filteredList.length > 0
                ? $t('TheShoppingList')
                : $t('StartShoppingList')
            }}
          </h3>
        </div>
        <transition mode="out-in" name="zoom">
          <shopping-list
            v-if="isShoppingList"
            style="animation-duration: 0.2s"
          />
          <simple-list v-else style="animation-duration: 0.2s" />
        </transition>

        <v-easy-dialog v-model="confirmClearListModal">
          <div class="flex-col">
            <h4 style="padding-bottom: 2rem">Confirm deleting all the list!</h4>

            <div class="flex-col">
              <btn
                style="margin-bottom: 0.5rem"
                @click.native="clearListConfirmed"
              >
                Delete
              </btn>
              <btn class="btn" @click.native="confirmClearListModal = false">
                Close
              </btn>
            </div>
          </div>
        </v-easy-dialog>

        <v-easy-dialog v-model="addListModal">
          <add-list @close="addListModal = false" />
        </v-easy-dialog>
      </main>
    </div>

    <page-footer v-if="!goShopping && team" />
  </div>
</template>

<script>
import VEasyDialog from 'v-easy-dialog'
import { mapState } from 'vuex'

export default {
  components: {
    VEasyDialog,
  },
  asyncData({ $auth, store }) {
    store
      .dispatch('LOAD_TEAM', $auth.user.email)
      .then((val) => store.dispatch('LOADED'))
  },
  data() {
    return {
      confirmClearListModal: false,
      addListModal: false,
    }
  },
  head: {
    bodyAttrs: {
      class: 'app-page',
    },
  },
  computed: {
    ...mapState([
      'loading',
      'activeList',
      'shoppingList',
      'showTeamInfo',
      'goShopping',
      'team',
    ]),
    filteredList() {
      if (Array.isArray(this.shoppingList))
        return this.shoppingList.filter((i) =>
          ['crossed', 'order'].includes(i.state)
        )
      else return []
    },
    isShoppingList() {
      return this.activeList.slug === 'ShoppingList'
    },
  },
  created() {
    this.$nuxt.$on('toClearList', () => {
      this.confirmClearListModal = true
    })
    this.$nuxt.$on('toAddList', () => {
      this.addListModal = true
    })
    this.$nuxt.$on('logout', () => {
      this.logout()
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('toClearList')
    this.$nuxt.$off('toAddList')
    this.$nuxt.$off('logout')
  },

  methods: {
    createItem(val) {
      this.$store.dispatch('ADD_ITEM', val)
    },
    clearListConfirmed() {
      this.$store.dispatch('CLEAR_LIST')
      this.confirmClearListModal = false
    },
    stopShopping() {
      this.$store.dispatch('TOGGLE_GO_SHOPPING')
    },
    onSwipeLeft() {
      this.$store.dispatch('TOGGLE_LIST', 'right')
    },
    onSwipeRight() {
      this.$store.dispatch('TOGGLE_LIST', 'left')
    },
    async logout() {
      try {
        await this.$auth.logout()
        this.$toast.success('You out')
      } catch (e) {
        this.$toast.global.myerror()
        this.$toast.error('Ooops, something went wrong...')
      }
    },
  },
}
</script>

<style lang="scss">
body.app-page {
  background-color: $colDarkGrey;
  color: #e6e6e6;
  font-size: 16px;
  line-height: 1.5;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0;
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-page {
  section {
    padding-top: 50px;
  }

  .page-wrapper {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
  }
  .page-inner {
    flex: 1 1 auto;
    padding: 2rem 1rem;
    width: 90%;
  }
  @media (min-width: 768px) {
    .page-inner {
      max-width: $appWidth;
    }
  }

  main {
    display: block;
    padding: 0;
    margin: 0 auto;
    .btn {
      margin-top: 1rem;
    }
  }
  .goShopping {
    background: url(/img/paper.jpeg);
    background-position: center top;
    background-size: 100% auto;
    color: $colDarkGrey;
    .page-inner {
      margin-top: 1rem;
      padding-top: 0;
    }
    h3 {
      color: $colBlue !important;
    }
    ul {
      padding-left: 30px;
    }

    li {
      font-size: 1.5rem;
      margin-top: 12px;
      font-family: 'Coming Soon', cursive;
      span {
        span {
          color: $colBlue !important;
        }
      }

      span.crossed {
        color: $colGreyer;
        &::after {
          height: 3px;
          background: $colDarkGrey;
        }
      }
    }
    .close-icon {
      position: fixed;
      top: 29px;
      right: 17px;
      width: 20px;
      cursor: pointer;
      transition: all 0.4s ease;
      z-index: 6;
    }
    .buttons {
      .plus {
        display: none;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
