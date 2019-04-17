<template>
  <div class="menu-bar">
    <a-layout-sider :trigger="null" width="256px" collapsible v-model="collapsed">
      <div class="logo">
        <img class="logo-image" :src="logo32Green" alt="logo">
        <transition name="slide-fade">
          <h1 class="name-text" v-if="!collapsed">相册管理系统</h1>
        </transition>
      </div>
      <a-menu
        mode="inline"
        theme="dark"
        @openChange="onOpenChange"
        :defaultSelectedKeys="openKeys"
        :inlineCollapsed="collapsed"
      >
        <template v-for="(item, mIndex) in menus">
          <a-menu-item v-if="!item.children" style="padding-left:36px;" :key="item.path || `menu_${mIndex}`">
            <router-link :to="{path: item.path}">
              <a-icon :type="item.icon" />
              <span>{{ item.title }}</span>
            </router-link>
          </a-menu-item>
          <sub-menu v-else :menuInfo="item" style="padding-left:36px;" :key="item.path || `item_${mIndex}`"/>
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
import logo32Green from '@/assets/logo32-green.png';
import SubMenu from './SubMenu';
import { projectMenus } from '@/config/modules';

export default {
  data () {
    return {
      logo32Green,
      menus: projectMenus,
      openKeys: [],
    };
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },

  // watch: {
  //   show(val) {
  //     window.cosnole.log(val);
  //     this.collapsed = val;
  //   },
  // },

  created() {
    this.openKeys = [this.$route.path];
  },
  components: {
    'sub-menu': SubMenu,
  },
  computed: {
    rootSubmenuKeys() {
      const routerArr = [];
      this.menus.forEach((item) => {
        if (item.children) {
          routerArr.push(item.path);
        }
      });
      return routerArr;
    },
  },
  methods: {
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
};
</script>

<style lang="less">
  .menu-bar {
    transition: all .3s cubic-bezier(.215,.61,.355,1);
    position: relative;
    height: auto;
    background: #001529;
    z-index: 10;
    .logo {
      height: 32px;
      background: none;
      margin: 16px 0;
      padding-left: 24px;
      background-color: #002140;
      .logo-image {
        width: 32px;
        height: 32px;
        text-align: left;
        display: inline-block;
      }
      .name-text {
        color: #fff;
        font-size: 16px;
        line-height: 30px;
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
      }
    }
    .ant-layout-sider {
      text-align: left;
    }
    .sider-trigger {
      position: absolute;
      top: 20px;
      right: -35px;
      cursor: pointer;
      font-size: 20px;
      z-index: 999;
    }
    .slide-fade-enter-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-leave-active {
      transition: width .1s;
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
    }
  }
</style>

