<template>
  <div class="page-wrapper">
    <div v-if="!team" class="registration-wrapper">
      <registration-modal />
    </div>
    <page-header />
    <main-header :type="'horizontal'" />
    <div class="page-inner">
      <main>
        <new-item />
        <shopping-list />
        <button
          v-if="filteredList.length > 0"
          class="btn"
          role="button"
          @click="confirmClearListModal = true"
        >
          Clear list
        </button>
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

    <page-footer />
  </div>
</template>

<script>
import VEasyDialog from 'v-easy-dialog'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'

export default {
  components: {
    VEasyDialog,
  },
  asyncData({ $auth, store }) {
    store.dispatch('LOAD_TEAM', $auth.user.email)
  },
  data() {
    return {
      confirmClearListModal: false,
    }
  },
  computed: {
    shoppingList() {
      return this.$store.state.shoppingList
    },
    filteredList() {
      return this.shoppingList.filter((i) =>
        ['crossed', 'order'].includes(i.state)
      )
    },
    team() {
      return this.$store.state.team
    },
  },
  created() {
    this.$nuxt.$on('add-item', (val) => {
      this.createItem(val)
    })
    this.$nuxt.$on('logout', (val) => {
      this.logout()
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('add-item')
  },

  methods: {
    async createItem(val) {
      this.$store.dispatch('ADD_ITEM', val)
      const data = doc(db, this.team, 'data')
      await updateDoc(data, {
        shoppingList: this.$store.state.shoppingList,
      })
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
