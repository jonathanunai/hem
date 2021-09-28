<template>
  <div class="top-header">
    <div class="inner">
      <h2>Hem</h2>
    </div>
    <svg class="diagonal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none"><defs><linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#c02d28"></stop><stop offset="100%" stop-color="#e66225"></stop></linearGradient></defs><polygon points="0,2 0,0 100,0 100,10" fill="url(#linear)"></polygon></svg>
  </div>
</template>
<style lang="scss" scoped>
.top-header {
    background: linear-gradient(90deg,#c02d28,#e66225);
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
