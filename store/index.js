import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'

export const state = () => ({
  team: null,
  shoppingList: [],
  showUserMenu: false,
  showTeamInfo: false,
  goShopping: false,
  loading: true,
})

export const mutations = {
  assignTeam(state, payload) {
    state.team = payload
  },
  toggleLoading(state) {
    state.loading = !state.loading
  },
  changeLoading(state, payload) {
    state.loading = payload
  },
  toggleUserMenu(state) {
    state.showUserMenu = !state.showUserMenu
  },
  toggleTeamInfo(state, payload) {
    if (payload === 'closed') state.showTeamInfo = false
    else state.showTeamInfo = !state.showTeamInfo
  },
  toggleGoShopping(state) {
    state.goShopping = !state.goShopping
  },
  loadList(state, payload) {
    state.shoppingList = payload
  },
  addItem(state, payload) {
    const foundIndex = state.shoppingList.findIndex(
      (x) => x.item === payload.item
    )
    if (foundIndex !== -1)
      state.shoppingList.find((el) => el.item === payload.item).state = 'order'
    else state.shoppingList.push(payload)
    state.shoppingList.sort((a, b) => a.item.localeCompare(b.item));

  },
  clearList(state) {
    state.shoppingList = state.shoppingList.map((el) => {
      return { ...el, state: 'inactive', quantity: 1 }
    })
  },
  crossout(state, item) {
    const ind = state.shoppingList.findIndex((obj) => obj.item === item)
    state.shoppingList[ind].state =
      state.shoppingList[ind].state === 'crossed' ? 'order' : 'crossed'
  },
  changeQuantity(state, item) {
    const ind = state.shoppingList.findIndex((obj) => obj.item === item.item)
    const q = state.shoppingList[ind].quantity
    state.shoppingList[ind].quantity = item.to === 'decrease' ? q - 1 : q + 1
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
    return new Promise(function (resolve, reject) {
      resolve('Loaded')
    })
  },
  async REFRESH_LIST({ commit }) {
    const docRef = doc(db, this.state.team, 'data')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) commit('loadList', docSnap.data().shoppingList)
    else console.log('No such document!')
    return new Promise(function (resolve, reject) {
      resolve('Refreshed')
    })
  },
  async ADD_ITEM({ commit }, payload) {
    commit('addItem', payload)
    const data = doc(db, this.state.team, 'data')
    await updateDoc(data, {
      shoppingList: this.state.shoppingList,
    })
  },
  ASSIGN_TEAM({ commit }, payload) {
    commit('assignTeam', payload)
  },
  TOGGLE_LOADING({ commit }) {
    commit('toggleLoading')
  },
  LOADED({ commit }) {
    commit('changeLoading', false)
  },
  LOADING({ commit }) {
    commit('changeLoading', true)
  },
  TOGGLE_USERMENU({ commit }) {
    commit('toggleUserMenu')
  },
  TOGGLE_TEAMINFO({ commit }) {
    commit('toggleTeamInfo')
  },
  CLOSE_TEAMINFO({ commit }) {
    commit('toggleTeamInfo', 'close')
  },
  TOGGLE_GO_SHOPPING({ commit }) {
    commit('toggleGoShopping')
  },
  async CLEAR_LIST({ commit }) {
    commit('clearList')
    const data = doc(db, this.state.team, 'data')
    await updateDoc(data, {
      shoppingList: this.state.shoppingList,
    })
  },
  async CROSSOUT({ commit }, item) {
    commit('crossout', item)
    const data = doc(db, this.state.team, 'data')
    await updateDoc(data, {
      shoppingList: this.state.shoppingList,
    })
  },
  async CHANGE_QUANTITY({ commit }, item) {
    commit('changeQuantity', item)
    const data = doc(db, this.state.team, 'data')
    await updateDoc(data, {
      shoppingList: this.state.shoppingList,
    })
  },
}
