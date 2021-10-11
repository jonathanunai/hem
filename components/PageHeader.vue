<template>
  <div class="page-header">
    <div class="inner">
      <h2>Hem - {{team}}</h2>
            <div><a href="#" @click.prevent="$nuxt.$emit('logout')">Logout</a></div>

    </div>
    <svg class="diagonal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none"><defs><linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#c02d28"></stop><stop offset="100%" stop-color="#e66225"></stop></linearGradient></defs><polygon points="0,2 0,0 100,0 100,10" fill="url(#linear)"></polygon></svg>
  </div>
</template>
<script>
export default {
  computed: {
    team() {
      return this.$store.state.team
    }
  },
}
</script>
<style lang="scss" scoped>
.page-header {
    background: linear-gradient(90deg,#c02d28,#e66225);
    width: 100%;
    color: #e6e6e6;
    position: relative;
    z-index: 99;
    .inner {
      background: rgba(0,0,0,.7);
      padding: 10px 0;
      zoom: 1;
    }
    .diagonal {
      fill: #e66225;
      height: 24px;
      left: 0;
      pointer-events: none;
      position: absolute;
      top: 100%;
      width: 100%;
    }
}

</style>
