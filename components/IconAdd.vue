<template>
  <div class="plus">{{inverted ? '-' : '+'}}</div>
</template>
<script>
export default {
  props: {
    inverted: {type: Boolean, default: false}
  }
}
</script>
<style lang="scss">
.plus {
    background: $colLightBlue;
    border-radius: 50%;
    color: $colDarkGrey;
    cursor: pointer;
    font-size: 23px;
    font-weight: 700;
    height: 34px;
    width: 34px;
    right: 38px;
    position: absolute;
    text-align: center;
    top: 0;
    &:hover {
      background: #fff;
      color: #3a3a3a;
    }
}
</style>
