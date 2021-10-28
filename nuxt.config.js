export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,
  server: {
    port: 3044,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Hem App - Colaborative shopping list',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Colaboration tool to share lists like a shopping list, todo list or a film and series watchlist with team or family',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        name: 'og:site_name',
        content: 'HemApp lists',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        name: 'og:url',
        content: 'https://www.hem-app.com',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        name: 'og:title',
        content: 'HemApp - The ultimate shopping list',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        name: 'og:description',
        content:
          'Colaboration tool to share lists like a shopping list, todo list or a film and series watchlist with team or family.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        name: 'og:image',
        content: '/img/logo-share.png',
      },
      { property: 'og:image:width', content: '972' },
      { property: 'og:image:height', content: '720' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap',
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/css/main.scss'],
  styleResources: {
    scss: ['~assets/scss/mixins.scss', '~assets/scss/variables.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/firebase.js',
    '~/plugins/hammer.js',
    {
      src: './plugins/gtag.js',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'es',
        name: 'Español',
        file: 'es.json',
      },
      {
        code: 'sv',
        name: 'Svenska',
        file: 'sv.json',
      },
    ],
    strategy: 'no_prefix',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    langDir: 'locales/',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  googleAnalytics: {
    id: 'UA-4192453-32'
  },

  router: {
    middleware: ['auth'],
  },
  auth: {
    strategies: {
      google: {
        client_id:
          '37049723745-3fkv14o86jki23ecrqhtueutqnu8nb9m.apps.googleusercontent.com',
        redirect_uri: process.env.REDIRECT_URL || 'https://hem-app.com/login/',
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login/',
      home: '/',
    },
  },
  toast: {
    position: 'top-center',
    duration: '2000',
    register: [
      // Register custom toasts
      {
        name: 'myerror',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
        },
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
