<template>
  <div class="hb-container">
    <!-- menu start -->
    <a href="#" class="smenu">
      <span class="hb-square"></span>
      <span class="hb-square"></span>
      <span class="hb-square"></span>
      <span class="hb-square"></span>
      <span class="hb-square"></span>
      <span class="hb-square"></span>
      <span class="hb-square"></span>
      <span class="hb-square"></span>
      <span class="hb-square"></span>
    </a>
    <!-- menu end -->
  </div>
</template>
<style lang="scss">
$gap: 2px;
.hb-container {
  margin: 0;
  width: 40px;
  position: relative;
}

.smenu {
  width: 40px;
  height: 40px;
  display: inline-block;
  transition: all 0.8s;

  .hb-square {
    float: left;
    position: relative;
    padding: $gap;
    display: block;
    width: 33.33%;
    height: 33.33%;
    transition: all 1.4s;

    &:nth-child(2) {
      top: 0px;
    }
    &:nth-child(4) {
      left: 0px;
    }
    &:nth-child(6) {
      right: 0px;
    }
    &:nth-child(8) {
      bottom: 0px;
    }

    &:nth-child(1) {
      bottom: 0px;
      right: 0px;
    }
    &:nth-child(3) {
      left: 0px;
      bottom: 0px;
    }
    &:nth-child(7) {
      right: 0px;
      top: 0px;
    }
    &:nth-child(9) {
      top: 0px;
      left: 0px;
    }

    &:after {
      content: '';
      width: 100%;
      height: 100%;
      background-color: $colGold2;
      display: block;
      transition: all 0.8s ease;
    }
  }

  &:hover {
    .hb-square:nth-child(2) {
      top: $gap * 2;
    }
    .hb-square:nth-child(4) {
      left: $gap * 2;
    }
    .hb-square:nth-child(6) {
      right: $gap * 2;
    }
    .hb-square:nth-child(8) {
      bottom: $gap * 2;
    }

    .hb-square:nth-child(1) {
      bottom: $gap * 2;
      right: $gap * 2;
    }
    .hb-square:nth-child(3) {
      left: $gap * 2;
      bottom: $gap * 2;
    }
    .hb-square:nth-child(7) {
      right: $gap * 2;
      top: $gap * 2;
    }
    .hb-square:nth-child(9) {
      top: $gap * 2;
      left: $gap * 2;
    }

    .hb-square:nth-child(2):after,
    .hb-square:nth-child(4):after,
    .hb-square:nth-child(5):after,
    .hb-square:nth-child(6):after,
    .hb-square:nth-child(8):after {
      background-color: #eee;
    }
    .hb-square:nth-child(1):after,
    .hb-square:nth-child(3):after,
    .hb-square:nth-child(7):after,
    .hb-square:nth-child(9):after {
      background-color: transparent;
    }
    transform: rotate(405deg);
    -webkit-backface-visibility: hidden;
    transform-origin: center;
  }
}
</style>
