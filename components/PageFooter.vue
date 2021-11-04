<template>
  <footer>
        <btn @click.native="cleanList">{{ $t('CleanList') }}</btn>

    <p>by<br />Unai.me</p>
        <btn @click.native="clearList">{{ $t('ClearList') }}</btn>
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
    cleanList() {
      this.$store.dispatch('CLEAN_LIST')
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
  color: #fff;
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
