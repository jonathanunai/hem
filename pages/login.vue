<template>
  <div class="page-wrapper">

    <main-header/>

    <div class="card">
      <div class="card--inner">

        <div class="card--header">
          <h2>Log in using Google. {{$auth.$state.loggedIn}} </h2>
        </div>

        <div class="card--content">
          <btn :type="'round'" @click.native="login" >
            <div class="flex-center">
              <div class="mx-2">
                <img src="~/static/Google.svg" width="20"/>
              </div>
              <span>Login</span>
            </div>
          </btn>
        </div>
      </div>

      <div class="card--footer">By Unai.me</div>

    </div>
  </div>
</template>
<script>
export default {
    mounted() {
     console.log(process.env.REDIRECT_URL)
   },
   methods:{
     async login() {
         try {
             this.$toast.show('Logging in...')
             await this.$auth.loginWith('google')
             this.$toast.success('Successfully authenticated')
         } catch(e){
             this.$toast.global.myerror()
             this.$toast.error('Error while authenticating')
         }
     }
   }

}
</script>
