import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'

export const state = () => ({
  team: null,
  shoppingList: [],
})

export const mutations = {
  assignTeam(state, payload) {
    state.team = payload
  },
  loadList(state, payload) {
    state.shoppingList = payload
  },
  addItem(state, payload) {
    state.shoppingList.push(payload)
  },
  crossout(state, index) {
    state.shoppingList[index].state = state.shoppingList[index].state === "crossed" ? "order" : "crossed"
  },
}

export const actions = {
  async LOAD_TEAM({ commit }, payload) {
    const docRef = doc(db, 'users', payload)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const team = docSnap.data().team
      commit('assignTeam', team)

      const docRef2 = doc(db, team, 'data')
      const docSnap2 = await getDoc(docRef2)
      if (docSnap2.exists()) commit('loadList', docSnap2.data().shoppingList)
      else console.log('No such document!')
    } else {
      console.log('No such document!')
    }
  },
  ADD_ITEM({ commit }, payload) {
    commit('addItem', payload)
  },
  async CROSSOUT({ commit }, index) {
    commit('crossout', index)
    console.log(this.state.team)

    const data = doc(db, this.state.team, 'data')
    await updateDoc(data, {
      shoppingList: this.state.shoppingList,
    })

  }
}
