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
const sortList = (state) => {
  if (state.activeList.slug === 'ShoppingList') {
    state.shoppingList.sort((a, b) => {
      if (a.state > b.state) return -1
      if (a.state < b.state) return 1
      return a.item.localeCompare(b.item)
    })
  }
}
const updateDB = (state, data) => {
  if (state.activeList.slug === 'ShoppingList') {
    updateDoc(data, {
      shoppingList: state.shoppingList,
    })
  } else {
    updateDoc(data, {
      otherLists: state.otherLists,
    })
  }
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
            ? state.otherLists[listArray[listArray.length - 1]]
            : state.otherLists[listArray[0]]
      } else {
        const pos = listArray.indexOf(state.activeList.slug)
        if (
          listArray.length === 1 ||
          (pos === listArray.length - 1 && to === 'right') ||
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
  loadLists(state, payload) {
    state.shoppingList = payload.shoppingList
    const listArray = Object.keys(payload.otherLists)
    if (listArray.length) {
      listArray.forEach((item) =>
        this._vm.$set(state.otherLists, item, payload.otherLists[item])
      )
    }
  },
  addItem(state, payload) {
    const index = find(state, payload)
    if (index !== -1) {
      state.shoppingList[index].state = 'order'
      state.shoppingList[index].user = {
        picture: this.$auth.user.picture,
        name: this.$auth.user.name,
      }
    } else {
      state.shoppingList.push(payload)
      sortList(state)
    }
  },
  addOtherItem(state, item) {
    const index = find(state, item)
    if (index !== -1) {
      this._vm.$set(
        state.otherLists[state.activeList.slug].list[index],
        'state',
        'order'
      )
      this._vm.$set(
        state.otherLists[state.activeList.slug].list[index],
        'user',
        {
          picture: this.$auth.user.picture,
          name: this.$auth.user.name,
        }
      )

      // state.otherLists[state.activeList.slug].list[index].state = 'order'
      // state.otherLists[state.activeList.slug].list[index].user = this.$auth.user
    } else {
      state.otherLists[state.activeList.slug].list.push(item)
      state.otherLists[state.activeList.slug].list.sort((a, b) =>
        a.item.localeCompare(b.item)
      )
    }
  },
  clearList(state, cleanMode = false) {
    if (state.activeList.slug === 'ShoppingList') {
      state.shoppingList = state.shoppingList.map((el) => {
        return cleanMode
          ? el.state === 'crossed'
            ? { ...el, state: 'inactive', quantity: 1 }
            : el
          : { ...el, state: 'inactive', quantity: 1 }
      })
    } else {
      state.otherLists[state.activeList.slug].list = []
    }
  },
  changeState(state, item) {
    const index = find(state, item)
    if (state.activeList.slug === 'ShoppingList') {
      if (item.state === 'toggle')
        state.shoppingList[index].state =
          state.shoppingList[index].state === 'crossed' ? 'order' : 'crossed'
      else state.shoppingList[index].state = item.state
    } else {
      state.otherLists[state.activeList.slug].list[index].state =
        state.otherLists[state.activeList.slug].list[index].state === 'crossed'
          ? 'order'
          : 'crossed'
    }

    sortList(state)
  },
  deleteItem(state, item) {
    const index = find(state, item)
    if (index !== -1) {
      state.otherLists[state.activeList.slug].list.splice(index, 1)
    }
  },
  hardDelete(state, item) {
    const index = find(state, item)
    state.shoppingList.splice(index, 1)
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
        commit('loadLists', docSnap2.data())
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
    if (docSnap.exists()) commit('loadLists', docSnap.data())
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
    commit('changeState', { item: item.item, state: 'toggle' })
    const data = doc(db, this.state.team, 'data')
    await updateDB(this.state, data)
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
  async HARD_DELETE_ITEM({ commit }, item) {
    commit('hardDelete', { item })
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
  CLEAN_LIST({ commit }) {
    commit('clearList', true)
    const data = doc(db, this.state.team, 'data')
    updateDB(this.state, data)
  },
  SWITCH_TO_LIST({ commit }, list) {
    commit('switchToList', list)
  },
}
