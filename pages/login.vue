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
          <div class="info-link" @click="showInfo = true">What is Hem app?</div>
        </div>
      </div>
      <transition name="slideLeft">
        <div v-if="showInfo" class="info-slide">
          <img
            src="/img/cross.png"
            alt="Close"
            class="close-icon"
            @click="showInfo = false"
          />
          <div class="info-slide-inner">
            <h1>Hem App</h1>
            <h2>The collaborative shopping list</h2>
            <ul>
              <li>
                <span>What is Hem App?</span>
                <p>
                  It is the simplest, easiest and quickest way to have a
                  collaborative and always updated shopping list.
                </p>
              </li>
              <li>
                <span>Who should use it?</span>
                <p>
                  Hem App works with any team or family that wish to share a
                  list.
                </p>
              </li>
              <li>
                <span>Is it free?</span>
                <p>Hem App is completely free to use. Nice!</p>
              </li>
              <li>
                <span>How does it work?</span>
                <p>Use your google account to log in, choose a name for your team/family and voila! Start using your list.</p>
              </li>
              <li>
                <span>Is it addictive?</span>
                <p>
                  Yes. Once you try it, you wont be able to live without it. Not
                  joking.
                </p>
              </li>
              <li>
                <span>Who did this?</span>
                <p>
                  Jonathan Unai, a programmer tired of reading his whatsapps
                  looking for groceries at the supermarket. Now it is available
                  to everyone.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <div class="card--footer">By Unai.me</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loggingIn: false,
      showInfo: false,
    }
  },
  methods: {
    async login() {
      this.loggingIn = true
      try {
        await this.$auth.loginWith('google')
        this.$toast.success('You in!')
      } catch (e) {
        this.$toast.global.myerror()
        this.$toast.error('Oops... not working!')
      }
    },
    stopShopping() {
      this.$store.dispatch('TOGGLE_GO_SHOPPING')
    },

    slideInfo() {},
  },
}
</script>
<style lang="scss" scoped>
.subtext {
  padding: 1rem 0;
}
.info-link {
  text-align: center;
  padding-top: 1rem;
  cursor: pointer;
  color: $colLightBlue;
}
.info-slide {
  position: fixed;
  top: 0;
  left: 0;
  background: $colLightGrey;
  color: $colDarkGrey;
  height: 100vh;
  width: 90%;
  max-width: 400px;
  z-index: 5;
  overflow-y: scroll;
  .info-slide-inner {
  }
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);

  .close-icon {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 20px;
    cursor: pointer;
    transition: all 0.4s ease;
    z-index: 6;
  }
  h1,
  h2 {
    text-align: center;
    margin-bottom: 0;
  }
  h2 {
    font-size: 1rem;
    font-style: italic;
    padding: 0;
    margin: 0;
    margin-bottom: 2rem;
  }
  ul {
    span {
      font-weight: bold;
    }
  }
}
</style>
