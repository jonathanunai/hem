<template>
  <div class="arrow-icon" :class="direction">
    <img src="/img/arrow.png" alt="Modify quantity" />
  </div>
</template>
<script>
export default {
  props: {
    direction: { type: String, default: 'up' },
  },
}
</script>
<style lang="scss">
.arrow-icon {
  cursor: pointer;
  img {
    width: 20px;
    margin: 0 2px;
  }
  &.down {
    img {
      transform: rotate(180deg);
    }
  }
}
</style>
