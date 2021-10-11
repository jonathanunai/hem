<template>
  <div>
    {{user.name}}
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default:  () => { return {name: 'Not set'} }
      }
  }
}

</script>
