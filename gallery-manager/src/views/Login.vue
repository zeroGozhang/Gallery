<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" :src="logo" />
          <span class="title">{{ name }}</span>
        </div>
      </div>
      <div class="login">
        <a-form>
          <!-- <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane tab="手机号登录" key="2"> -->
              <a-form-item>
                <a-input size="large" placeholder="请输入手机号码" v-model="formData.phoneNum" >
                  <a-icon slot="prefix" type="mobile" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-row :gutter="8" style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input size="large" placeholder="请输入验证码" style="height:45px;" v-model="formData.imgCode">
                      <a-icon slot="prefix" type="mail" />
                    </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <div class="image-code-box" @click="getImageCode">
                      <img alt="验证码" :src="imageCodeInfo.image">
                    </div>
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item>
                <a-row :gutter="8" style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input size="large" placeholder="请输入短信验证码" v-model="formData.smsCode">
                      <a-icon slot="prefix" type="mail" />
                    </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <a-button style="width: 100%" class="captcha-button" @click="getSmsCode" v-if="!timeCountShow" size="large">获取验证码</a-button>
                    <a-button style="width: 100%" class="captcha-button" disabled v-if="timeCountShow" size="large">重试（{{counts}}）</a-button>
                  </a-col>
                </a-row>
              </a-form-item>
            <!-- </a-tab-pane>
          </a-tabs> -->
          <a-form-item>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" @click="onSubmit" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <!-- <global-footer :link-list="linkList" :copyright="copyright" /> -->
  </div>
</template>

<script>
import { projectName, description } from '../../package.json';
import logo from '@/assets/logo32-green.png';

import * as accountMethod from '@/services/account';
import * as captchaMethod from '@/services/captcha';

// import helper from '@/utils/helper';

import httpRequest from '../utils/http';

import { getUserInfo } from '@/services/account';

// import GlobalFooter from '../../layouts/GlobalFooter'

export default {
  name: 'Login',

  components: {
    // LoginContent,
  },

  data () {
    return {
      logo,
      logging: false,
      imgCodeShow: false,
      timeCountShow: false,
      counts: 0,
      imageCodeInfo: {},
      ticketInfo: {},
      error: '',
      name: projectName,
      description: description,
      formData: {
        imgCode: '',
        phoneNum: '',
        smsCode: '',
        loginName: '',
        password: '',
        agree: true,
      },
      tabLoginType: 'sms',
      id: 0,
    };
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName;
    },
    linkList () {
      return this.$store.state.setting.footerLinks;
    },
    copyright () {
      return this.$store.state.setting.copyright;
    },
  },
  methods: {
    async getImageCode() {
      this.imgCodeShow = true;
      const { status, data } = await captchaMethod.getImageCode();
      if (/20\d/.test(status)) {
        this.imageCodeInfo = data;
      } else {
        this.imageCodeInfo = {};
      }
    },

    // 获取ticket,校验图片验证码

    async getCmsCode() {
      if (this.formData.imgCode) {
        const { status, data } = await captchaMethod.getTicket({
          id: this.imageCodeInfo.id,
          code: this.formData.imgCode,
        });
        if (/20\d/.test(status)) {
          this.ticketInfo = data;
          this.getSmsCode();
        } else {
          this.$message.error(data.message);
          this.ticketInfo = {};
          this.getImageCode();
        }
      }
    },

      // 获取手机短信验证码

    async getSmsCode() {
      const ticket = this.imageCodeInfo.ticket || this.ticketInfo.ticket;
      if (ticket) {
        const { status, data } = await captchaMethod.getSms({
          phoneNum: this.formData.phoneNum,
          ticket,
        });
        if (/20\d/.test(status)) {
          this.addTimeCount(data);
        } else if (status === 400) {
          this.$message.warning(data.message);
          this.getImageCode();
          this.ticketInfo = {};
        } else if (status === 500) {
          this.$message.error('服务异常，请刷新页面重试');
        } else {
          this.smsInfo = {};
        }
      } else {
        this.getCmsCode();
      }
    },

    addTimeCount(data) {
      // this.sendMsgFlag = true;

      this.timeCountShow = true;

      // 设置倒计时时间

      this.counts = 60;
      const timer = setInterval(() => {
        if (this.counts > 1) {
          this.counts -= 1;
        } else {
          clearInterval(timer);
          this.timeCountShow = false;
        }
      }, 1000);
      this.smsInfo = data;
    },

    // 短信登录

    async onSubmit() {
      this.logging = true;
      const { phoneNum, smsCode } = this.formData;
      if (!phoneNum || !smsCode) {
        this.$message.warning('请输入手机号码以及验证码并获取短信验证码');
        this.logging = false;
        return;
      }
      this.getUserInfos();
    },

    async getToken() {
      const { phoneNum, smsCode } = this.formData;
      const { status, data } = await accountMethod.smsLogin({ phoneNum, smsCode });
      this.logging = false;
      if (!(/20\d/.test(status))) {
        this.$message.error(data.message || '未知异常');
        return false;
      }
      data.expires_time = Date.now() + (data.expires_in * 1000);

      // const rs = {
      //   token: data,
      // };

      // localStorage.setItem('tokenInfo', JSON.stringify(rs));

      return data;
    },

    /**
     * 获取用户信息
     */

    async getUserInfos() {
      const tokenData = await this.getToken();
      if (!tokenData) {
        return false;
      }
      httpRequest.defaults.headers.Authorization = `bearer ${tokenData.access_token}`;
      const { data } = await getUserInfo();
      this.saveUserInfo({
        account: data.accountId,
        token: tokenData,
        username: data.nickName,
        avator: data.avatar,
        userInfo: data,
      });
      this.$router.push('/level/list');
      return true;
    },
    saveUserInfo(rs = {}) {
      if (localStorage) {
        this.$store.commit('auth/SAVE_TOKENINFO', rs);
        localStorage.setItem('tokenInfo', JSON.stringify(rs));
      }
    },
  },
  mounted() {
    // if (helper.isLogin()) {
    //   this.$router.push('/level/list');
    // }

    this.getImageCode();
  },
};
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    // background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          a {
            text-decoration: none;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }
          .title {
            font-size: 33px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .login{
        width: 396px;
        margin: 30px auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;

          &:hover {
            color: #13C2C2;
          }
        }
      }
    }
    .image-code-box {
      display: inline-block;
      width: 128px;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      text-align: center;
      color: #666;
      cursor: pointer;
      background-color: #ddd;
      vertical-align: top;
    }
  }
</style>
