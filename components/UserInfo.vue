<template>
  <div>
    <div class="user-menu">
      <span>Hi {{ $auth.user.name }}!</span>
      <a
        v-for="locale in availableLocales"
        :key="locale.code"
        @click.prevent.stop="$i18n.setLocale(locale.code)"
        >{{ locale.name }}</a
      >
      <a v-if="!isShopping" href="#" @click.prevent="goShopping"
        >Go Shopping!</a
      >
      <a v-else href="#" @click.prevent="goShopping">Stop Shopping!</a>
      <a href="#" @click.prevent="clearList">Clear shopping list</a>
      <a href="#" @click.prevent="showTeamCode">Show team code</a>
      <a href="#" @click.prevent="$nuxt.$emit('logout')">Logout</a>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isShopping() {
      return this.$store.state.goShopping
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  methods: {
    goShopping() {
      this.$store.dispatch('TOGGLE_GO_SHOPPING')
      this.$store.dispatch('TOGGLE_USERMENU')
    },
    clearList() {
      this.$nuxt.$emit('toClearList')
      this.$store.dispatch('TOGGLE_USERMENU')
    },
    showTeamCode() {
      this.$store.dispatch('TOGGLE_TEAMINFO')
      this.$store.dispatch('TOGGLE_USERMENU')
    },
  },
}
</script>
<style lang="scss">
.user-menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  background: $colLightBlue;
  color: $colDarkGrey;
  padding: 0.5rem;
  right: 10px;
  width: 300px;
  border-radius: 0.2rem;
  z-index: 2;
  font-size: 1.1rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  span {
    border-bottom: 2px solid #fff;
    margin-bottom: 1rem;
    font-weight: bold;
    width: 100%;
    background: unset;
  }
  a {
    margin-bottom: 0.625rem;
    &:hover {
      color: #fff;
    }
  }
}
</style>
