<template>
  <div class="page-wrapper">
    <page-header />

    <div class="page-inner">
      <main>
        <main-header />

        <shopping-list :list="shoppingList"/>
        <new-item/>
      </main>
    </div>

    <page-footer />
  </div>
</template>

<script>
import { doc, updateDoc } from 'firebase/firestore'
import { db } from "~/plugins/firebase.js"

export default {
  asyncData({ $auth, store }) {
     store.dispatch('LOAD_TEAM', $auth.user.email)
  },
  computed: {
    shoppingList() {return this.$store.state.shoppingList}
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
      const data = doc(db, "marquezsadacali", "data")
      await updateDoc(data, {
        shoppingList: this.$store.state.shoppingList
      });
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
  padding: 0 3rem;
}
</style>
