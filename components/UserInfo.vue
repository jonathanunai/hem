<template>
  <div class="user-menu">
    <span
      >My account
      <div>
        <a
          v-for="locale in availableLocales"
          :key="locale.code"
          href="#"
          @click.prevent.stop="setLocale(locale.code)"
        >
          [{{ locale.code }}]
        </a>
      </div>
    </span>
    <a href="#" @click.prevent="showTeamCode">{{ $t('ShowCode') }}</a>
    <a href="#" @click.prevent="$nuxt.$emit('logout')">{{ $t('Logout') }}</a>
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
    setLocale(l) {
      this.$i18n.setLocale(l)
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
  background: $colGold3;
  color: $colDarkGrey;
  padding: 0.5rem;
  right: 1rem;
  width: 300px;
  border-radius: 0.2rem;
  z-index: 2;
  font-size: 1.1rem;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 19px 38px,
    rgba(0, 0, 0, 0.44) 0px 15px 12px;
  span {
    border-bottom: 2px solid #fff;
    margin-bottom: 2rem;
    padding-bottom: 0.4rem;
    font-weight: bold;
    width: 100%;
    background: unset;
    position: relative;
    div {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  a {
    margin-bottom: 0.625rem;
    &:hover {
      color: #fff;
    }
  }
}
</style>
