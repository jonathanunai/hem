<template>
  <div>
    <v-easy-dialog v-model="show">
      <div class="teamInfo flex-col">
        <h4>Share this code to your family/team members:</h4>
        <h2>{{ code }}</h2>
        <button class="btn" @click="close">Close</button>
      </div>
    </v-easy-dialog>
  </div>
</template>
<script>
import VEasyDialog from 'v-easy-dialog'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'
export default {
  components: {
    VEasyDialog,
  },
  data() {
    return {
      show: true,
      code: 'null',
    }
  },
  watch: {
    show(val, old) {
      console.log(val, old)
      // if (!val) this.$store.dispatch('CLOSE_TEAMINFO')
    },
  },
  created() {
    this.loadTeamInfo()
  },
  methods: {
    async loadTeamInfo() {
      const docRef = doc(db, 'teams', this.$store.state.team)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        this.code = docSnap.data().code
      }
    },
    close() {
      this.$store.dispatch('CLOSE_TEAMINFO')
    },
  },
}
</script>
<style lang="scss">
.teamInfo {
  text-align: center;
  align-items: center;
  display: flex;
  height: 390px;
  justify-content: center;
}
</style>
