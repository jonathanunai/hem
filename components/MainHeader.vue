<template>
  <section class="main-header-section">
    <header class="s-wrap" :class="type">
      <div class="logo"> </div>
      <div style="clear: both"></div>
    </header>
  </section>
</template>
<script>
export default {
  props: {
    type: { type: String, default: () => '' },
  },
}
</script>
<style lang="scss" scoped>
.main-header-section {
  width: 100%;
  padding: 0;
  header {
    width: 100%;
    text-align: center;
    &.horizontal {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 20%;
      svg {
        width: 60px;
      }
    }
    .logo {
      background: url(/logo_transparent.png) no-repeat;
      background-position: center;
      background-size: cover;
      padding-top: 25%;
      width: 100%;
    }
  }
}
</style>
