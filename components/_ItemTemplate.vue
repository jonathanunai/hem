<template>
  <div>
    <b>#££</b>
    <span>{{ item }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      item: { required: true },
    },
  };
</script>
