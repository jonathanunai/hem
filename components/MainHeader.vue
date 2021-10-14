<template>
  <section class="main-header-section">
    <header class="s-wrap" :class="type">
      <div class="logo"><img src="/logo.png" alt="Hem - Domestic app"></div>
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
      img{
      width: 100%;

      }
      @include media(">phone", "<=tablet") {
      }
      @include media(">desktop") {
      }

    }

  }
}
</style>
