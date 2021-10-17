<template>
  <div class="page-wrapper" :class="goShopping ? 'goShopping' : ''">
    <transition name="fade">
      <loading v-if="loading" />
    </transition>
    <div v-if="goShopping">
      <img
        src="/img/close.png"
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

    <page-header v-if="!goShopping" />
    <div class="page-inner">
      <main>
        <transition name="fade">
          <new-item v-if="!goShopping" />
        </transition>
        <shopping-list />
        <v-easy-dialog v-model="confirmClearListModal">
          <div class="flex-col">
            <h4 style="padding-bottom: 2rem">Confirm deleting all the list!</h4>

            <div class="flex-col">
              <button
                class="btn"
                style="margin-bottom: 0.5rem"
                @click="clearListConfirmed"
              >
                Delete
              </button>
              <button class="btn" @click="confirmClearListModal = false">
                Close
              </button>
            </div>
          </div>
        </v-easy-dialog>
      </main>
    </div>

    <page-footer v-if="!goShopping" />
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
    }
  },
  computed: {
    ...mapState(['loading', 'shoppingList', 'showTeamInfo']),
    filteredList() {
      return this.shoppingList.filter((i) =>
        ['crossed', 'order'].includes(i.state)
      )
    },
    team() {
      return this.$store.state.team
    },
    goShopping() {
      return this.$store.state.goShopping
    },
  },
  created() {
    this.$nuxt.$on('toClearList', () => {
      this.confirmClearListModal = true
    })
    this.$nuxt.$on('add-item', (val) => {
      this.createItem(val)
    })
    this.$nuxt.$on('logout', () => {
      this.logout()
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('add-item')
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
  width: 90%;
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
  }
  li {
    font-size: 1.5rem;
    margin-top: 12px;
    font-family: 'Coming Soon', cursive;
    span {
      span {
        color: $colBlue;
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
    top: 12px;
    right: 12px;
    width: 30px;
    cursor: pointer;
    transition: all 0.4s ease;
  }
  .refresh-icon {
    right: 52px;
  }
  .buttons {
    display: none;
  }
}
</style>
