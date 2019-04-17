<template>
  <div class="step1">
    <!-- <a-row>
      <a-col :xs="24" :sm="24" :md="24" :lg="{ span: 16, offset: 4 }" :xl="{ span: 10, offset: 5 }"> -->
        <a-form class="step1-form">
          <a-form-item
            label="测试名称"
            style="text-align:left;"
            :labelCol="{span: 5, offset: 2}"
            :wrapperCol="{span: 14}"
          >
            <a-input
              name="name"
              style="width: 280px;"
              v-model="levelInfo.name"  
              :maxlength="30"
              placeholder='请输入测试名称'
            />
          </a-form-item>
          <a-form-item
            label="类型"
            style="text-align:left;"
            :labelCol="{span: 5, offset: 2}"
            :wrapperCol="{span: 14}"
          >
          <a-select v-model="levelInfo.type" placeholder="请选择" style="width: 280px;">
              <a-select-option v-for="item in Object.keys(testTypes)" :key="item" :value="item" >{{testTypes[item]}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-show="levelInfo.type === conference"
            label="答题限时"
            style="text-align:left;"
            :labelCol="{span: 5, offset: 2}"
            :wrapperCol="{span: 14}"
          >
            <a-input
              name="limit"
              style="width: 280px;"
              v-model="levelInfo.time_limit"
              :maxlength="30"
              placeholder='请输入答题限时(分钟)'
            />
          </a-form-item>
          <a-form-item
            label="结束时间"
            style="text-align:left;"
            :labelCol="{span: 5, offset: 2}"
            :wrapperCol="{span: 14}"
          >
            <a-date-picker
              showTime
              style="width: 280px;"
              format="YYYY-MM-DD HH:mm:ss"
              v-model="levelInfo.end_time"
              @change="onEndTimeChange"
              placeholder="请输入测试结束日期"/>
          </a-form-item>
          <a-form-item
            label="状态"
            style="text-align:left;"
            :labelCol="{span: 5, offset: 2}"
            :wrapperCol="{span: 14}"
          >
            <!-- <a-radio-group
              name="radioGroup"> -->
            <a-radio-group
              :options="testStatusList"
              @change="changeStatus"
              v-model="levelInfo.status"/>
            <!-- </a-radio-group> -->
          </a-form-item>
          <a-form-item :wrapperCol="{span: 14, offset: 4}">
            <a-button style="margin-right:15px;" @click="backTo">返回</a-button>
            <a-button type="primary" @click="nextStep">下一步</a-button>
          </a-form-item>
        </a-form>
      <!-- </a-col>
    </a-row> -->
  </div>
</template>

<script>
  import { testStatusList } from '@/config/modules';
  import { addBreakThrough } from '@/services/levelTest';
  import { testTypes, conference } from '@/config/constants';
  import moment from 'moment';
  const options = [
    { label: '关闭', value: '0' },
    { label: '开启', value: '1' },
  ];
  export default {
    name: 'Step1',
    data() {
      return {
        conference,
        testStatusList,
        testTypes,
        options,
        form: this.$form.createForm(this),
        levelInfo: {
          name: '',
          end_time: null,
          status: 0,
          type: 'normal',
          time_limit: 0,
        },
      };
    },
    computed: {
      levelData() {
        return Object.assign({}, this.$store.state.level.levelInfo);
      },
    },
    methods: {
      moment,
      onEndTimeChange(date, dateString) {
        window.console.log(dateString);
        if (!date) {
          this.levelInfo.end_time = null;
          return;
        }
      },
      backTo() {
        this.$store.commit('level/INIT_LEVEL_DATA');
        this.$router.go(-1);
      },
      async nextStep () {
        if (!this.levelInfo.name) {
          this.$message.warning('请输入测试名称');
          return;
        }
        if (!this.levelInfo.type) {
          this.$message.warning('请选择类型');
          return;
        }
        if (this.levelInfo.type === conference && !(/^[1-9]\d*$/.test(this.levelInfo.time_limit))) {
          this.$message.warning('答题限时只能输入正整数');
          return;
        }
        let params = {
          ...this.levelInfo,
          end_time: moment(this.levelInfo.end_time).format('YYYY-MM-DD HH:mm:ss'),
        };
        const { status, data } = await addBreakThrough(params);
        if (/20\d/.test(status)) {
          this.levelInfo.id = data.data.id;
          await this.$store.commit('level/SET_TEST_INFO', {
            ...params,
            id: data.data.id,
          });

          // this.$emit('nextStep');

          this.$router.push(`/level/newTest/${data.data.id}`);
        } else {
          this.$message.error(data.error.detail || '未知异常');
        }
      },
      changeStatus(e) {
        this.levelInfo.status = e.target.value;
      },
    },
    mounted() {
      this.levelInfo = Object.assign({}, this.$store.state.level.levelInfo);
    },
  };
</script>

<style lang="less" scoped>
.step1 {
  .step1-form {
    max-width: 500px;
    margin: 40px auto 0;
  }
}
</style>
