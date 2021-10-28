import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ app }) => {
  Vue.use(VueGtag, {
    config: { id: 'G-5LTTDHLH2N' },
    appName: 'Hem app',
  }, app.router);
}
