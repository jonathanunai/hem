<template>
  <footer>
    <btn @click.native="clearList">Clear list!</btn>
    <p>Powered by<br />Unai.me</p>
    <btn @click.native="goShopping">Go shopping!</btn>
  </footer>
</template>
<script>
export default {
  methods: {
    goShopping() {
      this.$store.dispatch('TOGGLE_GO_SHOPPING')
    },
    clearList() {
      this.$nuxt.$emit('toClearList')
    },
  },
}
</script>
<style lang="scss" scoped>
footer {
  clear: both;
  position: fixed;
  height: 36px;
  bottom: 0px;
  padding: 0;
  margin: 0;
  color: $colGrey;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: calc(#{$appWidth} + 40px);
  p {
    line-height: 1rem;
    display: inline-block;
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: 0.74rem;
  }
}
</style>
