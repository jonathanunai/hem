<template>
  <div class="ss-wrapper">
    <div class="smartphone">
      <div class="smartphone--inner">
        <img src="/img/shopping-list-screenshot.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.ss-wrapper {
  width: 100%;
  .smartphone {
    background: url(/img/smartphone.png);
    background-position: center;
    background-size: cover;
    width: 330px;
    height: 454px;
    margin: 0 auto;
    position: relative;
    &--inner {
      margin: 2% 33% 25% 12%;
      margin: 0;
      position: absolute;
      left: 11%;
      top: 4px;
      right: 32%;
      overflow: hidden;
      border-radius: 0.8rem;
      height: 369px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
