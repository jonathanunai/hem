<template>
  <div class="page-header">
    <div class="inner">
      <div>
        <h2>Hem-App.com</h2>
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
          >
          </div>
        </transition>
      </div>
    </div>
    <svg
      class="diagonal"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#c02d28"></stop>
          <stop offset="100%" stop-color="#e66225"></stop>
        </linearGradient>
      </defs>
      <polygon points="0,2 0,0 100,0 100,10" fill="url(#linear)"></polygon>
    </svg>
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
  position: relative;
  z-index: 99;
  .inner {
    padding: 1rem;
    // background: rgba(0, 0, 0, 0.7);
    zoom: 1;
    display: flex;
    justify-content: space-between;
    > div {
    }
    align-items: center;
  }
  .diagonal {
    fill: #e66225;
    height: 24px;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 100%;
    width: 100%;
    display: none;
  }
  h2 {
    padding: 0;
    margin: 0;
    color: $colLightBlue;
    position: relative;
    font-size: 1.2rem;
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
      font-size: 2rem;
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
