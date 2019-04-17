<template>
  <div class="header">
    <a-layout-header class="header-content">
      <a-icon
        class="trigger"
        @click="toggleCollapsed"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      <div class="top-header-extra">
        <!-- 登陆 -->
        <HeaderAvatar></HeaderAvatar>
      </div>
    </a-layout-header>
    
  </div>
</template>

<script>
import HeaderAvatar from './HeaderAvatar';

export default {
  data() {
    return {
      // collapsed: false,
    };
  },
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    HeaderAvatar,
  },
  methods: {
    toggleCollapsed () {
      // this.collapsed = !this.collapsed;
      
      this.$emit('toggle');
    },
  },
};
</script>

<style lang="less">
  .header {
    padding: 0 0 12px 0;
    .header-content {
      height: 64px;
      padding: 0 12px 0 0;
      background: #fff;
      -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
      position: relative;
      .trigger {
        font-size: 20px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        -webkit-transition: color .3s;
        transition: color .3s;
        float: left;
      }
      .top-header-extra {
        float: right;
        padding: 0 24px;
      }
    }
  }
</style>
