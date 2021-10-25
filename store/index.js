import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'
const initialState = { slug: 'ShoppingList', name: 'Shopping list' }
const find = (state, item) => {
  if (state.activeList.slug === 'ShoppingList') {
    return state.shoppingList.findIndex((x) => x.item === item.item)
  } else if (state.otherLists[state.activeList.slug]) {
    return state.otherLists[state.activeList.slug].list.findIndex(
      (x) => x.item === item.item
    )
  } else return -1
}

export const state = () => ({
  team: null,
  shoppingList: [],
  otherLists: {},
  showMenu: false,
  showUserMenu: false,
  showTeamInfo: false,
  goShopping: false,
  activeList: initialState,
  loading: true,
})

export const mutations = {
  setList(state, payload) {
    if (payload.slug) state.otherLists[payload.slug] = payload.list
    else state.shoppingList = payload
  },
  switchToList(state, list) {
    state.activeList =
      list === 'ShoppingList' ? initialState : state.otherLists[list]
  },
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
  toggleMenu(state) {
    state.showMenu = !state.showMenu
  },
  toggleTeamInfo(state, payload) {
    if (payload === 'closed') state.showTeamInfo = false
    else state.showTeamInfo = !state.showTeamInfo
  },
  toggleGoShopping(state) {
    state.goShopping = !state.goShopping
  },
  toggleList(state, to) {
    const listArray = Object.keys(state.otherLists)
    if (listArray.length) {
      if (state.activeList.slug === 'ShoppingList') {
        state.activeList =
          to === 'left'
            ? state.otherLists[listArray[listArray.length-1]]
            : state.otherLists[listArray[0]]
      } else {
        const pos = listArray.indexOf(state.activeList.slug)
        if (
          listArray.length === 1 ||
          (pos === listArray.length -1 && to === 'right') ||
          (pos === 0 && to === 'left')
        )
          state.activeList = initialState
        else
          state.activeList =
            to === 'left'
              ? state.otherLists[listArray[pos - 1]]
              : state.otherLists[listArray[pos + 1]]
      }
    }
  },
  loadList(state, payload) {
    state.shoppingList = payload
  },
  loadOtherLists(state, payload) {
    state.otherLists = payload
  },
  addItem(state, payload) {
    const index = find(state, payload)
    if (index !== -1) {
      state.shoppingList[index].state = 'order'
      state.shoppingList[index].avatar = this.$auth.user.picture
    } else {
      state.shoppingList.push(payload)
      state.shoppingList.sort((a, b) => a.item.localeCompare(b.item))
    }
  },
  addOtherItem(state, item) {
    const index = find(state, item)
    if (index === -1) {
      state.otherLists[state.activeList.slug].list.push(item)
      state.otherLists[state.activeList.slug].list.sort((a, b) =>
        a.item.localeCompare(b.item)
      )
    }
  },
  clearList(state) {
    if (state.activeList.slug === 'ShoppingList') {
      state.shoppingList = state.shoppingList.map((el) => {
        return { ...el, state: 'inactive', quantity: 1 }
      })
    } else {
      state.otherLists[state.activeList.slug].list = []
    }
  },
  changeState(state, item) {
    const index = find(state, item)
    if (item.state === 'toggle')
      state.shoppingList[index].state =
        state.shoppingList[index].state === 'crossed' ? 'order' : 'crossed'
    else state.shoppingList[index].state = item.state
  },
  deleteItem(state, item) {
    const index = find(state, item)
    if (index !== -1) {
      state.otherLists[state.activeList.slug].list.splice(index, 1)
    }
  },
  changeQuantity(state, item) {
    const index = find(state, item)
    if (index !== -1) {
      const q = state.shoppingList[index].quantity
      state.shoppingList[index].quantity =
        item.to === 'decrease' ? q - 1 : q + 1
    }
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
      if (docSnap2.exists()) {
        commit('loadList', docSnap2.data().shoppingList)
        if (docSnap2.data().otherLists) {
          commit('loadOtherLists', docSnap2.data().otherLists)
        }
      } else {
        console.log('No such document!')
      }
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
  async ADD_OTHER_ITEM({ commit }, payload) {
    commit('addOtherItem', payload)
    const data = doc(db, this.state.team, 'data')
    await updateDoc(data, {
      otherLists: this.state.otherLists,
    })
  },
  ASSIGN_TEAM({ commit }, payload) {
    commit('assignTeam', payload)
  },
  TOGGLE_LOADING({ commit }) {
    commit('toggleLoading')
  },
  TOGGLE_LIST({ commit }, to) {
    commit('toggleList', to)
  },
  LOADED({ commit }) {
    commit('changeLoading', false)
    if (this.state.team)
      onSnapshot(doc(db, this.state.team, 'data'), (doc) => {
        commit('setList', doc.data().shoppingList)
      })
  },
  LOADING({ commit }) {
    commit('changeLoading', true)
  },
  TOGGLE_USERMENU({ commit }) {
    commit('toggleUserMenu')
  },
  TOGGLE_MENU({ commit }) {
    commit('toggleMenu')
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
    commit('changeState', { item, state: 'toggle' })
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
  async DELETE_ITEM({ commit }, item) {
    commit('changeState', { item, state: 'inactive' })
    const data = doc(db, this.state.team, 'data')
    await updateDoc(data, {
      shoppingList: this.state.shoppingList,
    })
  },
  async DELETE_OTHER_ITEM({ commit }, item) {
    commit('deleteItem', item)
    const data = doc(db, this.state.team, 'data')
    await updateDoc(data, {
      otherLists: this.state.otherLists,
    })
  },

  async ADD_LIST({ commit }, payload) {
    commit('setList', payload)
    const data = doc(db, this.state.team, 'data')
    await updateDoc(data, {
      otherLists: this.state.otherLists,
    })
  },
  SWITCH_TO_LIST({ commit }, list) {
    commit('switchToList', list)
  },
}
