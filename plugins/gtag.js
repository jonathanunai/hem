import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ app }) => {
  Vue.use(VueGtag, {
    config: { id: 'G-XQW0V31P20' },
    appName: 'Hem app',
  }, app.router);
}
