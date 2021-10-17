<template>
  <div>
    <v-easy-dialog v-model="notRegistered">
      <div class="registration flex-col">
        <transition name="lightSpeed" mode="out-in">
          <div v-if="!hasACode" key="1" style="animation-duration: 0.4s">
            <h4 @click="show = !show">Register for free!</h4>
            <div>All you nead is a great name for your house team:</div>
            <input v-model="teamName" type="text" placeholder="Team name" />
            <div class="help-text">
              Can't think of any? try joining both you surenames ;)
            </div>
            <div class="flex-col">
              <button
                class="btn"
                style="margin-bottom: 0.5rem"
                :disabled="teamName.length < 3"
                @click="createTeam"
              >
                Start a team!
              </button>
            </div>
            <h4>Or</h4>
            <div class="text-link" @click="hasACode = !hasACode">
              Insert a code to join a team!
            </div>
          </div>
          <div v-else key="2" style="animation-duration: 0.4s">
            <div v-if="errorInCode" class="error">
              The code does not match any team
            </div>
            <h4>Enter your code to join a team! ;)</h4>
            <input v-model="code" type="text" placeholder="Enter your code" />
            <div class="flex-col">
              <button
                class="btn"
                style="margin-bottom: 0.5rem"
                :disabled="code.length < 3"
                @click="joinTeam"
              >
                Join a team!
              </button>
            </div>
            <div class="text-link" @click="hasACode = !hasACode">
              I don't hace a code
            </div>
          </div>
        </transition>
      </div>
    </v-easy-dialog>
  </div>
</template>
<script>
import VEasyDialog from 'v-easy-dialog'
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'
function makeid(length) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export default {
  components: {
    VEasyDialog,
  },

  data() {
    return {
      notRegistered: true,
      teamName: '',
      code: '',
      hasACode: false,
      show: false,
      errorInCode: false,
    }
  },
  methods: {
    async createTeam() {
      if (this.teamName.length < 2) return

      await setDoc(doc(db, 'teams', this.teamName), {
        code: makeid(6),
      })
      await setDoc(doc(db, 'users', this.$auth.user.email), {
        team: this.teamName,
      })
      await setDoc(doc(db, this.teamName, 'data'), {
        shoppingList: {},
      })
      this.$store.dispatch('ASSIGN_TEAM', this.teamName)
    },

    async joinTeam() {
      if (this.code.length < 2) return
      const teamsRef = collection(db, 'teams')
      const q = query(teamsRef, where('code', '==', this.code))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.docs.length > 0) {
        this.$store.dispatch('LOADING')
         await setDoc(doc(db, 'users', this.$auth.user.email), {
          team: querySnapshot.docs[0].id,
        })
        this.$store.dispatch('ASSIGN_TEAM', querySnapshot.docs[0].id)
        this.$store.dispatch('LOAD_TEAM', this.$auth.user.email).then(() => this.$store.dispatch('LOADED'))

      } else {
        this.errorInCode = true
      }
    },
  },
}
</script>
<style lang="scss">
.registration {
  text-align: center;
  align-items: center;
  display: flex;
  height: 390px;
  justify-content: center;
  h4 {
    padding: 2rem 0;
  }
  input[type='text'] {
    border-bottom: 2px solid $colGrey;
    max-width: 260px;
    margin: 0 auto;
    margin-top: 12px;
  }
  .help-text {
    color: $colBlue;
    font-size: 0.7rem;
    padding: 5px 0 12px;
  }
  .btn {
    margin-top: 24px;
  }
  .text-link {
    color: $colMidRed;
    cursor: pointer;
  }
  .error {
    color: red;
  }
}
</style>
