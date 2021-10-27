<template>
  <div class="user-menu">
    <div class="menu-header">
      <span>{{ $t('MyAccount') }}</span>
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
    </div>
    <div class="menu-subheader">
      {{ $t('Team') }}: <span>{{ team }}</span>
    </div>
    <ul class="menu-links">
      <li>
        <a href="#" @click.prevent="showTeamCode">{{ $t('ShowCode') }}</a>
      </li>
      <li>
        <a href="#" @click.prevent="$nuxt.$emit('logout')">{{
          $t('Logout')
        }}</a>
      </li>
    </ul>
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
    team() {
      return this.$store.state.team
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
  padding: 0rem;
  right: 1rem;
  width: 300px;
  border-radius: 0.2rem;
  z-index: 2;
  font-size: 1.1rem;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 19px 38px,
    rgba(0, 0, 0, 0.44) 0px 15px 12px;
  .menu-header {
    font-weight: bold;
    width: 100%;
    background: unset;
    position: relative;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .menu-subheader {
    margin-bottom: 1rem;
    background: $colGold4;
    border: 2px $colGold5 solid;
    width: 100%;
    text-align: center;
  }
  .menu-links {
    padding: 0.5rem;
    margin: 0;
    list-style: none;
    text-align: right;
    li {
      margin-bottom: 0.225rem;
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
