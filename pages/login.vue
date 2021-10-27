<template>
  <div class="page-wrapper">
    <header class="login-header">
      <nav class="nav">
        <div class="logo">
          <img src="/img/logo-cuadrado.png" alt="Hem - Domestic app" />
        </div>
        <btn class="login-buttons" @click.native="login">
          <span>{{ $t('Login') }}</span>
        </btn>
      </nav>
    </header>

    <main v-if="!loggingIn">
      <section class="HeroSection">
        <div class="HeroSection--column">
          <div class="HeroSection--content">
            <h1 class="HeroSection--title">
              Simply fast<br />
              lists for teams
            </h1>
            <div class="HeroSection--description">
              <p>
                HemApp is a webapp to create lists, such as a shopping list to
                and multiple other lists between a team.
              </p>
            </div>
            <div class="HeroSection--actions">
              <div class="HeroSection--actions-item">
                <btn class="login-buttons" @click.native="login">
                  <span>{{ $t('Login') }}</span>
                </btn>
              </div>

              <div class="HeroSection--actions-item">
                <btn class="login-buttons" @click.native="showInfo = true">
                  {{ $t('WhatIsHem') }}
                </btn>
              </div>
            </div>
            <div class="HeroSection--key-points">
              <ul>
                <li>
                  <strong>Experience focus</strong> with effortless interaction
                </li>
                <li>
                  <strong>Simple collaboration</strong> with immediate
                  synchronization
                </li>
                <li><strong>Multiple lists</strong> with unlimited items</li>
                <li>
                  <strong>Joyfull interaction</strong> with the gratifying
                  crossing-out feeling
                </li>
              </ul>
            </div>
          </div>

          <div class="HeroSection--illustration">
            <slide-show />
          </div>
        </div>
      </section>
      <section class="QuoteSection">
        <div class="QuoteSection--column">
          <blockquote class="QuoteSection--quote">
            <p>{{ $t('Quote1') }}</p>
          </blockquote>
          <cite class="QuoteSection--cite">
            <img class="QuoteSection--cite-company-logo" />
            <div class="QuoteSection--cite-details">
              <div class="QuoteSection--cite-name">Pilar Abollado</div>
              <div class="QuoteSection--cite-title">CEO Pikeria</div>
            </div></cite
          >
        </div>
      </section>
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
            <h2>{{ $t('Subheader') }}</h2>
            <ul>
              <li v-for="index in 6" :key="index">
                <span>{{ $t('q' + index) }}</span>
                <p>
                  {{ $t('a' + index) }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </main>
    <footer class="Footer Footer-with-top-separator">
      <div class="Footer--columns">
        <div class="Footer--column Footer--column-logo">
          <a
            href="https://www.hem-app.com"
            class="Footer--logo-link Link Link-without-underline"
            ><img
              class="Footer--logo-link-image"
              style="width: 64px"
              alt="Pages logo"
              src="/img/logo-cuadrado.png"
          /></a>
        </div>
        <div class="Footer--column">
          <h2 class="Footer--column-title">Product</h2>
          <ul class="Footer--column-list">
            <li class="Footer--column-list-item">
              <a
                href="https://www.hem-app.com"
                class="Link Link-without-underline Link-is-juicy"
                >Hem App</a
              >
            </li>
            <li class="Footer--column-list-item">
              <a
                href="#"
                class="Link Link-without-underline Link-is-juicy"
                 @click.prevent="login"
                >Login the app</a
              >
            </li>
          </ul>
        </div>
        <div class="Footer--column">
          <h2 class="Footer--column-title">Docs</h2>
          <ul class="Footer--column-list">
            <li class="Footer--column-list-item">
              <a
                href="#"
                class="Link Link-without-underline Link-is-juicy"
                @click.prevent="showInfo = true"
                >FAQ</a
              >
            </li>
            <li class="Footer--column-list-item">
              <a
                href="https://www.unai.me"
                class="Link Link-without-underline Link-is-juicy"
                >Unai.me</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="Footer--legal">© 2021 Unai.me</div>
    </footer>
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
  head: {
    bodyAttrs: {
      class: 'login-page',
    },
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
.page-wrapper {
  color: rgb(29, 31, 32);
  background: rgb(255, 255, 255);
  header {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 72px;
    nav {
      display: flex;
      height: 100%;
      align-items: center;
      padding: 0 1rem;
      .logo {
        display: flex;
        margin-left: 0;
        margin-right: auto;
        img {
          width: 50px;
        }
      }
      .logo-buttons {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        height: 100%;
      }
    }
  }
  .HeroSection {
    .HeroSection--column {
      display: flex;
      align-items: center;
      justify-content: center;
      --vertical-padding-top: 4em;
      --vertical-padding-bottom: 4em;
      --horizontal-gap: 8em;
      --illustration-font-size: 1em;
      padding: 136px 32px 32px 32px;
      width: 100%;
      @include media('<desktop') {
        flex-direction: column;
        width: 32em;
        max-width: 100%;
        padding-left: 1em;
        padding-right: 1em;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
        padding-bottom: 7em;
        margin-bottom: -3em;
      }
      @include media('<=smallphone') {
        --vertical-padding-top: 1.25em;
        overflow: hidden;
        padding-bottom: 5em;
        margin-bottom: -1.5em;
      }
    }
    &--content {
      width: 27em;
      max-width: 100%;
      margin-right: 128px;
      @include media('<desktop') {
        margin-right: 0;
        margin-bottom: 5em;
        flex: 0;
      }
      @include media('<tablet') {
        text-align: center;
      }
    }
    &--title {
      font-size: 3em;
      line-height: 1.05;
      font-weight: 700;
      margin-bottom: 1rem;
      letter-spacing: -0.01em;
      @include media('<desktop') {
        font-size: 2.15em;
      }

      @include media('<=smallphone') {
        font-size: 11vw;
      }
    }
    &--description {
      font-size: 1.5em;
      letter-spacing: -0.01em;
      margin-bottom: 1.25em;
      width: 18em;
      max-width: 100%;
      @include media('<=smallphone') {
        font-size: 5.3vw;
      }
    }
    &--actions {
      font-size: 1.333em;
      display: flex;
      justify-content: flex-start;
      margin-bottom: 2em;
      @include media('<=tablet') {
        justify-content: center;
        font-size: 1.2em;
        margin-bottom: 2em;
      }
    }
    &--actions-item:not(:last-child) {
      margin-right: 1em;
    }
    &--key-points {
      text-align: left;
      font-size: 0.95em;
      @include media('<=tablet') {
        font-size: 1em;
      }
    }
    ul {
      padding: 0;
      list-style: none;
      li {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 68"><path fill="%231d1f20" d="M 13 39 h -10 l -1.66 -3.12 l 23 -34 l 3.62 1.5 l -4.54 23.62 h 13.58 l 1.68 3.09 l -22 34 l -3.66 -1.4 l 3.65 -23.69 z"/></svg>')
          no-repeat;
        background-size: 1.5em 1.5em;
        padding-left: 2em;
      }
      li:not(:last-child) {
        margin-bottom: 0.75em;
      }
    }
  }
  .QuoteSection {
    padding: 2.5em;
    background: rgb(243, 243, 244);
    &--column {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    &--quote {
      font-size: 1.5em;
      width: 27.5em;
      margin-bottom: 0.75em;
      max-width: 100%;
      @include media('<=tablet') {
        font-size: 1.25em;
        margin-bottom: 1em;
      }
      & > :first-child:before,
      & > :last-child:after {
        position: absolute;
        font-family: Arial, sans-serif;
        font-size: 3em;
        line-height: 1;
        color: rgb(146, 151, 155);
      }
      & > :first-child:before {
        content: '\201C';
        margin-left: -0.4em;
      }
      & > :last-child:after {
        content: '\201D';
        margin-left: 0.05em;
      }
    }
    &--cite {
      display: flex;
      align-items: center;
      font-style: normal;
      margin-right: 2em;
      @include media('<=tablet') {
        margin-right: 1em;
      }
    }
    &--cite-company-logo {
      width: 3.5em;
      height: 3.5em;
      margin-right: 1em;
      svg {
        height: 100%;
        width: 100%;
        display: block;
      }
    }
  }
  .Footer {
    padding: 2.5em 3em 3em;
    box-shadow: inset 0 0.125em 0.5em -0.5em;
    &--columns {
      display: flex;
      justify-content: center;
      width: 64em;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 2em;
      @include media('<desktop') {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 2.5em;
        width: 50em;
        margin-left: auto;
        margin-right: auto;
      }
      @include media('<tablet') {
        grid-template-columns: 1fr 1fr;
        width: 24em;
      }
    }
    &--column {
      width: 14em;
      @include media('<desktop') {
        width: auto;
      }
    }
    &--column-logo {
      margin-left: 5em;
      @include media('<desktop') {
        grid-column: 1/-1;
        margin: auto;
      }
    }
    &--column-title {
      font-family: Menlo, 'SF Mono', 'Andale Mono';
      font-size: 0.9em;
      margin-bottom: 1.5em;
      color: rgba(29, 31, 32, 0.75);
    }
    &--legal {
      text-align: center;
      font-size: 0.8em;
      color: rgba(29, 31, 32, 0.75);
      margin-left: -1.5em;
      margin-right: -1.5em;
    }
    &--column-list {
      list-style: none;
      padding: 0;
    }
    &--column-list-item:not(:last-child) {
      margin-bottom: 0.5em;
    }
  }
  .subtext {
    padding: 1rem 0;
  }
  .info-link {
    text-align: center;
    padding-top: 1rem;
    cursor: pointer;
    color: $colGold3;
  }
  .info-slide {
    position: fixed;
    top: 0;
    left: 0;
    background: $colGold1;
    color: #fff;
    height: 100vh;
    width: 90%;
    max-width: 460px;
    z-index: 15;
    overflow-y: scroll;
    padding: 0 1rem 1rem 0;
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
        color: $colGold3;
      }
    }
  }
}
</style>
