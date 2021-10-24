<template>
  <div class="page-wrapper" :class="goShopping ? 'goShopping' : ''">

    <transition name="fade">
      <loading v-if="loading" />
    </transition>

    <div v-if="goShopping">
      <icon-refresh />
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
    <div v-if="team" class="page-inner">

      <main>
        <div style="position: relative">
          <h3>
            {{ (!isShoppingList) ? activeList.name : (filteredList.length > 0) ? $t('TheShoppingList') :  $t('StartShoppingList') }}
          </h3>
        </div>

        <shopping-list v-if="isShoppingList"/>
        <simple-list v-else/>

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
            <add-list @close="addListModal = false"/>
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
    VEasyDialog
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
  computed: {
    ...mapState(['loading', 'activeList', 'shoppingList', 'showTeamInfo', 'goShopping', 'team']),
    filteredList() {
      return this.shoppingList.filter((i) =>
        ['crossed', 'order'].includes(i.state)
      )
    },
    isShoppingList() {
      return this.activeList.slug === 'ShoppingList'
    }
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
    margin-top: 0;
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
  .close-icon,
  .refresh-icon {
    position: fixed;
    top: 22px;
    right: 12px;
    width: 20px;
    cursor: pointer;
    transition: all 0.4s ease;
    z-index: 6;
  }
  .refresh-icon {
    left: 38px;
    top: 20px;
    width: 28px;
    display: none;
  }
  .buttons {
    display: none;
  }
}
</style>
