<template>
  <div class="page-header">
    <div class="inner">
      <div>
        <h2>
          Hem - <span>{{ team }}</span>
        </h2>
      </div>
      <div class="user-info">
        <img :src="avatar" @click="showUserMenu = !showUserMenu" />
        <transition name="tilt-in">
          <div v-if="showUserMenu" class="user-menu">
            {{ $auth.user.name }}
            <a href="#" @click.prevent="$nuxt.$emit('logout')">Logout</a>
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
  data() {
    return {
      showUserMenu: false,
    }
  },
  computed: {
    team() {
      return this.$store.state.team
    },
    avatar() {
      return this.$auth.user.picture
        ? this.$auth.user.picture
        : '/img/avatar.png'
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
    span {
      color: #e66225;
    }
  }
  .user-info {
    position: relative;
    .user-menu {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      background: #e66225;
      padding: 0.5rem;
      right: 0;
      width: 200px;
      z-index: 2;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
      a {

      }
    }
    img {
      border-radius: 50%;
      cursor: pointer;
      width: 30px;
    }
  }
}
</style>
