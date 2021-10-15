<template>
  <div class="page-header">
    <div class="inner">
      <div>
        <div class="header-logo">
          <img src="/logo_new.png" alt="Hem - Domestic app" />
        </div>
      </div>
      <div>
        <h2>
          <span>{{ team }}</span>
        </h2>
      </div>
      <div class="user-info">
        <img :src="avatar" @click="$store.dispatch('TOGGLE_USERMENU')" />
        <transition name="tilt-in">
          <user-info v-if="showUserMenu" />
        </transition>
        <transition name="fade">
          <div
            v-if="showUserMenu"
            class="background"
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
  color: #e6e6e6;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 60px;
  .inner {
    padding: 1rem;
    // background: rgba(0, 0, 0, 0.7);
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
    img {
      border-radius: 50%;
      cursor: pointer;
      height: 60px;
      padding: 6px;
    }
  }
  h2 {
    padding: 0;
    margin: 0;
    color: $colLightBlue;
    position: relative;
    font-size: 1rem;
    span {
      color: #fff;
      &::before {
        content: 'Team';
        position: absolute;
        right: -8px;
        top: 40%;
        color: $colLightBlue;
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
