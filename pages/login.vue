<template>
  <div class="page-wrapper">
    <main-header />

    <div v-if="!loggingIn" class="card">
      <div class="card--inner">
        <div class="card--header"></div>

        <div class="card--content">
          <btn :type="'round'" @click.native="login">
            <div class="flex-center">
              <div class="mx-2">
                <img src="~/static/Google.svg" width="20" />
              </div>
              <span>Login</span>
            </div>
          </btn>
          <div class="subtext">Log in using your Google account.</div>
        </div>
      </div>

      <div class="card--footer">By Unai.me</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loggingIn: false,
    }
  },
  mounted() {
    console.log(process.env.REDIRECT_URL)
  },
  methods: {
    async login() {
      this.loggingIn = true
      try {
        this.$toast.show('Logging in...')
        await this.$auth.loginWith('google')
        this.$toast.success('Successfully authenticated')
      } catch (e) {
        this.$toast.global.myerror()
        this.$toast.error('Error while authenticating')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.subtext {
  padding: 1rem 0;
}
</style>
