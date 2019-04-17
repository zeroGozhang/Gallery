import Vue from 'vue';
import VueStorage from 'vue-ls';
import config from '@/config/defaultSettings';
import Cookie from 'js-cookie';
import Vuelidate from 'vuelidate';

import toolsPlugin from '@/plugins/';

// base library

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// import '@/components/use'

Vue.prototype.$cookie = Cookie;

Vue.use(Antd);
Vue.use(toolsPlugin);
Vue.use(Cookie);
Vue.use(Vuelidate);

Vue.use(VueStorage, config.storageOptions);