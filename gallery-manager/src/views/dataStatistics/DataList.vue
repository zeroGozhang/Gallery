<template>
  <a-card class="data-list">
    <a-form layout="inline" style="padding: 0 0 24px 0;">
      <a-row :gutter="48">
        <a-col :xl="5" :lg="6" :md="6" :sm="24" style="padding: 24px">
          <a-select v-model="queryParam.id" placeholder="请选择" @change="handleSelectChange">
            <a-select-option v-for="item in testList" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :xl="5" :lg="6" :md="6" :sm="24" style="padding: 24px">
          <a-date-picker
            :value="queryParam.time_start"
            @change="onStartTimeChange"
            placeholder="起始日期" />
        </a-col>
        <a-col :xl="45" :lg="6" :md="6" :sm="24" style="padding: 24px">
          <a-date-picker
            :value="queryParam.time_end"
            @change="onEndTimeChange"
            placeholder="结束日期" />
        </a-col>
        <a-col :xl="5" :lg="6"  :md="6" :sm="24" style="padding: 24px">
          <span class="table-page-search-submitButtons" :style=" { float: 'left', overflow: 'hidden' } ">
            <a-button type="primary" @click="handleSearch">查询</a-button>
          </span>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      :loading="loading"
      :pagination="options"
      :columns="tableHead"
      :dataSource="list">
    </a-table>
  </a-card>
</template>

<script>
import getDataList from '@/services/statistics';
import { getNormalTestListData } from '@/services/levelTest';
import moment from 'moment';

// import { formatTime } from '@/utils';

const tableHead = [
  {
    title: '测试名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '药店',
    dataIndex: 'terminal',
    key: 'terminal',
    align: 'center',
  },
  {
    title: '通关关数',
    dataIndex: 'pass_num',
    key: 'pass_num',
    align: 'center',
  },
];

export default {
  data() {
    return {
      loading: false,
      options: {
        page: 1,
        pageSize: 10,

        // pageSizeOptions: ['10', '25', '50', '100'],
        // showSizeChanger: true,
        // showQuickJumper: true,
        // hideOnSinglePage: true,

        total: 0,
        showTotal: total => `共 ${total} 条`,
        onChange: (page) => {
          this.toSelectPage(page);
        },
      },

      tableHead,
      list: [],
      testList: [],
      queryParam: {
        id: '',
        time_start: null,
        time_end: null,
      },
    };
  },
  methods: {
    moment,
    toSelectPage(page) {
      this.fetchDataList(page);
    },
    onStartTimeChange(date, dateString) {
      this.queryParam.time_start = this.moment(dateString, 'YYYY-MM-DD');
    },
    onEndTimeChange(date, dateString) {
      this.queryParam.time_end = this.moment(dateString, 'YYYY-MM-DD');
    },
    handleSelectChange(val) {
      this.queryParam.id = val;
    },
    handleSearch() {
      this.fetchDataList();
    },
    async fetchDataList(page = 1) {
      this.loading = true;
      const options = {
        page: page,
        size: 10,
        ...this.queryParam,
      };
      const params = {};
      Object.keys(options).forEach((c) => {
        if (options[c]) {
          params[c] = options[c];
        }
      });
      if (params.time_start) {
        params.time_start = moment(params.time_start).format('YYYY-MM-DD');
      }
      if (params.time_end) {
        params.time_end = moment(params.time_end).format('YYYY-MM-DD');
      }
      const { status, data } = await getDataList(params);
      if (/20\d/.test(status)) {
        this.loading = false;
        this.list = data.data.list;
        this.options.total = data.data.total;
      } else {
        this.loading = false;
        this.$message.error(data.error.detail || '未知异常');
      }
    },
    async fetchTestListData() {
      const { status, data } = await getNormalTestListData();
      if (/20\d/.test(status)) {
        this.testList = data.data;
        this.queryParam.id = data.data.length ? data.data[0].id : '';
      } else {
        this.$message.error(data.error.detail || '未知异常');
      }
    },
  },
  async mounted() {
    await this.fetchTestListData();
    this.fetchDataList();
  },
};
</script>

<style lang="less">
  // .ant-form-inline .ant-form-item {
  //   display: flex;
  // }
  // .ant-form-item-label {
  //   width: auto;
  // }
  // .ant-form-item-control-wrapper {
  //   flex: 1 1;
  // }
  .ant-calendar-picker {
    width: 100%;
  }
</style>
