<template>
  <footer>
    <btn @click.native="clearList">{{ $t('ClearList') }}</btn>
    <p>by<br />Unai.me</p>
    <btn @click.native="goShopping">{{ $t('GoShopping') }}</btn>
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
  height: 46px;
  bottom: 0px;
  padding: 0.4rem;
    margin: 0rem;
  color: $colGrey;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: calc(#{$appWidth} + 40px);
  background: $colGold2;
  p {
    line-height: 1rem;
    display: inline-block;
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: 0.74rem;
  }
  button {
    font-size: 0.74rem;
    letter-spacing: 0.05em;
    background: $colGold5;
  }
}
</style>
