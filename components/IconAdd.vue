<template>
  <div class="plus">{{ inverted ? '-' : '+' }}</div>
</template>
<script>
export default {
  props: {
    inverted: { type: Boolean, default: false },
  },
}
</script>
<style lang="scss">
.plus {
  background: $colGold3;
  border-radius: 50%;
  color: $colDarkGrey;
  cursor: pointer;
  font-size: 23px;
  font-weight: 700;
  height: 34px;
  width: 34px;
  right: 8px;
  position: absolute;
  text-align: center;
  top: 0;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: $colGold5;
  }
}
</style>
