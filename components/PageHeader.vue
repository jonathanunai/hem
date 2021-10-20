<template>
  <div class="page-header">
    <div class="inner">
      <div>
        <div class="header-logo">
          <img src="/img/logo-cuadrado.png" alt="Hem - Domestic app" />
        </div>
      </div>
      <div>
        <h2>
          <span>{{ team }}</span>
        </h2>
      </div>
      <div class="user-info">
        <img :src="avatar" @click="$store.dispatch('TOGGLE_USERMENU')" />
        <transition name="dropdown">
          <user-info v-if="showUserMenu" style="animation-duration: 0.2s" />
        </transition>
        <transition name="fade">
          <div
            v-if="showUserMenu"
            class="background"
            style="animation-delay: 0.3s; animation-duration: 0.3s"
            @click="$store.dispatch('TOGGLE_USERMENU')"
          ></div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    team() {
      return this.$store.state.team
    },
    avatar() {
      return this.$auth.user.picture
        ? this.$auth.user.picture
        : '/img/avatar.png'
    },
    showUserMenu() {
      return this.$store.state.showUserMenu
    },
  },
}
</script>
<style lang="scss" scoped>
.page-header {
  // background: linear-gradient(90deg, #c02d28, #e66225);
  width: 100%;
  max-width: calc(#{$appWidth} + 40px);
  color: #e6e6e6;
  top: 0;
  z-index: 99;
  height: 60px;
  margin: 0 auto;
  .inner {
    padding: 0 1rem;
    margin: 0.4rem;
    zoom: 1;
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    .header-logo {
      img {
        height: 60px;
        padding: 6px;
      }
    }
  }
  .user-info {
    position: relative;
    img {
      border-radius: 50%;
      cursor: pointer;
      height: 50px;
      border: 4px solid $colGold2;
      padding: 0;
    }
  }
  h2 {
    padding: 0;
    margin: 0;
    color: $colGold3;
    position: relative;
    font-size: 1rem;
    span {
      color: #fff;
      &::before {
        content: 'Team';
        position: absolute;
        right: -8px;
        top: 40%;
        color: $colGold3;
        font-size: 0.86rem;
        transform: skew(-0.02turn, -14deg);
        @include media('>phone') {
          top: 60%;
        }
      }
    }
    @include media('>phone') {
      font-size: 1.7rem;
    }
  }
  .background {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.62);
  }
}
</style>
