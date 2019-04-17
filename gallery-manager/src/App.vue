<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import { deviceEnquire, DEVICE_TYPE } from '@/utils/device';

import { TOGGLE_DEVICE } from '@/store/types';

  export default {
    data () {
      return {
        locale: zhCN,
      };
    },
    mounted () {
      const { $store } = this;
      deviceEnquire(deviceType => {
        // window.console.log($store);
        // window.console.log(deviceType);

        switch (deviceType) {
          case DEVICE_TYPE.DESKTOP:
            $store.commit(`globalSet/${TOGGLE_DEVICE}`, 'desktop');
            $store.dispatch('globalSet/setSidebar', true);
            break;
          case DEVICE_TYPE.TABLET:
            $store.commit(`globalSet/${TOGGLE_DEVICE}`, 'tablet');
            $store.dispatch('globalSet/setSidebar', false);
            break;
          case DEVICE_TYPE.MOBILE:
          default:
            $store.commit(`globalSet/${TOGGLE_DEVICE}`, 'mobile');
            $store.dispatch('globalSet/setSidebar', false);
            break;
        }

        // console.log('deviceType', deviceType);
      });
    },
  };
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  input {
    border-radius: 4px !important;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
