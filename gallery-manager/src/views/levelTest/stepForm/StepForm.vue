<template>
  <a-card :bordered="false" class="step-form">
    <a-steps class="steps" :current="currentTab">
      <a-step title="创建测试" />
      <a-step title="添加关卡" />
      <a-step title="添加问题" />
      <!-- <a-step title="完成" /> -->
    </a-steps>
    <div class="content">
      <step1 v-if="currentTab === 0" @nextStep="nextStep"/>
      <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep"/>
      <step3 v-if="currentTab === 2" @finish="finish" @prevStep="prevStep"/>
      <!-- <step4 v-if="currentTab === 3" @prevStep="prevStep" @finish="finish"/> -->
    </div>
  </a-card>
</template>

<script>
  import Step1 from './Step1';
  import Step2 from './Step2';
  import Step3 from './Step3';
  import { INIT_LEVEL_DATA } from '@/store/types';

  export default {
    name: 'StepForm',
    components: {
      Step1,
      Step2,
      Step3,
    },
    data () {
      return {
        // description: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',

        levelInfo: {},
        currentTab: 0,

        // form

        form: null,
      };
    },
    methods: {

      nextStep () {
        if (this.currentTab < 2) {
          this.currentTab += 1;
        }
      },
      prevStep () {
        if (this.currentTab > 0) {
          this.currentTab -= 1;
        }
      },
      finish () {
        this.currentTab = 1;
      },
    },
    mounted() {
      this.$store.commit(`level/${INIT_LEVEL_DATA}`);
    },
  };
</script>

<style lang="less" scoped>
  .step-form {
    min-height: 65vh;
    .steps {
      max-width: 750px;
      margin: 16px auto;
      text-align: left;
    }
  }
</style>