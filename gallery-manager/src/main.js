import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/permission'; // permission control
import '@/core/use';
import setClientJkenv from './utils/app';

Vue.config.productionTip = false;

setClientJkenv().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
