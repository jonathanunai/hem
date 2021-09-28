<template>
  <div class="page-wrapper">
    <div class="page-inner">
      <top-header/>
      <main>
        <main-header/>
        <icon-add/>
      </main>
      <footer><a href="#" @click.prevent="logout">Logout</a> {{$auth.$state.loggedIn}}</footer>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
     async logout() {
         try {
             this.$toast.show('Logging out...')
             await this.$auth.logout()
             this.$toast.success('Successfully logged out')
         } catch(e){
             this.$toast.global.myerror()
             this.$toast.error('Error while exiting')
         }
     }
  },
}
</script>
<style lang="scss">
main {
  display: block;
}

</style>
