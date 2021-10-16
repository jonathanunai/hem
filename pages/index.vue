<template>
  <div class="page-wrapper">
    <transition name="fade">
      <loading v-if="loading" />
    </transition>
    <div v-if="!team && !loading" class="registration-wrapper">
      <registration-modal />
    </div>
    <div v-if="showTeamInfo" class="registration-wrapper">
      <show-team-modal />
    </div>

    <page-header />
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
    async logout() {
      try {
        this.$toast.show('Logging out...')
        await this.$auth.logout()
        this.$toast.success('Successfully logged out')
      } catch (e) {
        this.$toast.global.myerror()
        this.$toast.error('Error while exiting')
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
</style>
