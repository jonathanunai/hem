<template>
  <button class="button" :class="type">
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    type: { type: String, default: 'square' },
  },
}
</script>
<style lang="scss">
.button {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  text-transform: uppercase;
  transition-duration: 0.28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  border-style: none;
  cursor: pointer;
  will-change: box-shadow;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.square {
  border-radius: 4px;
  background: $colGold3;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  &:hover {
      background: $colGold4;

  }
}
.round {
  text-decoration: none;
  transition: color 0.2s;
  font-size: 14px;
  padding: 10px 20px;
  background: $colGold3;
  border: none;
  border-radius: 40px;
  color: $colDarkGrey;
  display: block;
  line-height: 1.25;
  padding: 10px 20px;
  text-align: center;
  vertical-align: middle;
  width: 100%;
}
.round:hover {
  background: $colGold5;
  color: #fff;
}
.square:before {
  border-radius: inherit;
  bottom: 0;
  color: inherit;
  content: '';
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  background-color: currentColor;
}
.square:hover:before {
  opacity: 0.08;
}
.square:after {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.square:active {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
</style>
