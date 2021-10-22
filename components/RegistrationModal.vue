<template>
  <div>
    <v-easy-dialog v-model="notRegistered" fullscreen>
      <div class="registration flex-col">
        <transition name="lightSpeed" mode="out-in">
          <div v-if="!hasACode" key="1" style="animation-duration: 0.4s">
            <h4 @click="show = !show">{{ $t('RegisterFree') }}</h4>
            <div>{{ $t('allYouNeed') }}</div>
            <div
              v-if="errorInTeamName"
              class="error"
              @click="hasACode = !hasACode"
            >
              {{ $t('errorTeam') }}
            </div>

            <input v-model="teamName" type="text" placeholder="Team name" />
            <div class="help-text">
              {{ $t('HelpText1') }}
            </div>
            <div class="flex-col">
              <btn
                style="margin-bottom: 0.5rem"
                :disabled="teamName.length < 3"
                @click.native="createTeam"
              >
                {{ $t('StartTeam') }}
              </btn>
            </div>
            <h4>{{ $t('Or') }}</h4>
            <div class="text-link" @click="hasACode = !hasACode">
              {{ $t('InsertCode') }}
            </div>
          </div>
          <div v-else key="2" style="animation-duration: 0.4s">
            <h4>{{ $t('EnterCode') }}</h4>
            <div v-if="errorInCode" class="error">
              {{ $t('ErrorCode') }}
            </div>

            <input v-model="code" type="text" placeholder="Enter your code" />
            <div class="help-text">
              {{ $t('HelpText2') }}
            </div>

            <div class="flex-col">
              <btn
                style="margin-bottom: 0.5rem"
                :disabled="code.length < 3"
                @click.native="joinTeam"
              >
                {{ $t('JoinTeam') }}
              </btn>
            </div>
            <div class="text-link" @click="hasACode = !hasACode">
              {{ $t('NoCode') }}
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
  getDoc,
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
      errorInTeamName: false,
    }
  },
  methods: {
    async createTeam() {
      if (this.teamName.length < 2) return
      const teamsRef = collection(db, 'teams')
      const q = query(teamsRef, where('code', '==', this.teamName))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.docs.length > 0) {
        this.errorInTeamName = true
      } else {
        const teamRef = doc(db, 'teams', this.teamName)
        const docSnap = await getDoc(teamRef)
        if (docSnap.exists()) {
          this.errorInTeamName = true
        } else {
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
        }
      }
    },

    async joinTeam() {
      if (this.code.length < 2) return
      const teamsRef = collection(db, 'teams')
      const q = query(teamsRef, where('code', '==', this.code))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.docs.length > 0) {
        const team = querySnapshot.docs[0]
        this.$store.dispatch('LOADING')
        console.log(team.id)
        await setDoc(doc(db, 'users', this.$auth.user.email), {
          team: team.id,
        })
        this.$store.dispatch('ASSIGN_TEAM', team.id)
        this.$store
          .dispatch('LOAD_TEAM', this.$auth.user.email)
          .then(() => this.$store.dispatch('LOADED'))
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
    margin-top: 24px;
  }
  .help-text {
    color: $colGold1;
    font-size: 0.7rem;
    padding: 5px 0 24px;
  }
  .btn {
    margin-top: 24px;
  }
  .text-link {
    color: $colBlue;
    cursor: pointer;
  }
  .error {
    color: red;
  }
}
</style>
