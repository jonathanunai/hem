<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in filteredList"
        :key="index"

        @click="crossout(index)"
      >
        <span :class="item.state">{{ item.item }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    list: { type: Array, default: () => [] },
  },
  computed: {
    filteredList() {
      return this.list.filter((i) => ['crossed', 'order'].includes(i.state))
    },
  },
  methods: {
    crossout(index) {
      this.$store.dispatch('CROSSOUT', index)
    },
  },
}
</script>
<style lang="scss" scoped>
li {
  cursor: pointer;
}
@keyframes strike{
  0%   { width : 0; }
  100% { width: 100%; }
}
.crossed {
  position: relative;
}
.crossed::after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: 0px;
  width: 100%;
  height: 2px;
  background: white;
  animation-name: strike;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

</style>
