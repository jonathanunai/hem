<template>
  <div class="input-wrapper">
    <input v-model="input" type="text" placeholder="We need...?">
    <icon-add @click.native="add"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
    }
  },
  methods: {
    add() {
      if (this.input)
      this.$nuxt.$emit('add-item', {item: this.input, state: 'order'})
      this.input = ""
    }
  },
}
</script>
<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}
input[type=text] {
  all: unset;
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  padding: 2px 5px;
  margin-right: 1rem;
  width: 74%;
  &:focus{
    box-shadow: 1px solid #f2f2f2;
  }
  &::before{
    content: "☎";
    position: absolute;
    left: calc(50% - 327px);
    top: calc(50% - 30px);
    color: #333;
    font-weight: bold;
    font-size:40px;
    padding:0 10px;
  }
  &::-webkit-input-placeholder,
  &::-moz-placeholder,
  &:-moz-placeholder,
  &:-ms-input-placeholder,
  &::placeholder {
    font-size: 18px;
    color: dimgrey;
    font-family: sans-serif;
    transition: all 0.5s ease;
  }
  &:focus {
    &::placeholder {
      font-size: 8px;
      top: 0;
      position: absolute;
      transition: all 0.3s ease;
    }
  }
}

</style>
