<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer">
      <a-avatar class="avatar" size="small" :src="userInfo.avatar || Logo"/>
      <span>{{ userInfo.nickName }}</span>
    </span>
    <!-- {{userInfo}} -->
    <a-menu style="width: 120px" slot="overlay">
      <!-- <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item> -->
      <!-- <a-menu-divider /> -->
      <a-menu-item>
        <div @click="logout">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </div>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import Logo from '@/assets/logo24-green.png';

export default {
  name: 'HeaderAvatar',
  data() {
    return {
      Logo,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.auth.authInfo.userInfo;
    },
  },
  methods: {
    logout() {
      window.localStorage.removeItem('tokenInfo');

      this.$cookie.remove('MemberCookie', { path: '/', domain: 'jianke.com' });
      this.$cookie.remove('MemberCookieV2', { path: '/', domain: 'jianke.com' });
      this.$cookie.remove('MemberToken', { path: '/', domain: 'jianke.com' });

      this.$router.push('/login');
    },
  },

  // computed: {
    // currUser () {
    //   return this.$store.state.account.user
    // }
  // }
};
</script>

<style lang="less" scoped>
  .avatar{
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0,0%,100%,.85);
    vertical-align: middle;
  }
  .ant-avatar-sm {
    border-radius: unset;
  }
</style>
