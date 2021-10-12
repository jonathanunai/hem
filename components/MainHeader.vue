<template>
  <section class="main-header-section">
    <header class="s-wrap" :class="type">
      <icon-pen />
      <h3>HEM</h3>
      <h4>(Domestic organization)</h4>
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
  }
}
</style>
