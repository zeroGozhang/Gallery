<template>
  <a-card class="data-list">
    <a-table
      :loading="loading"
      :pagination="options"
      :columns="tableHead"
      :dataSource="list">
    </a-table>
  </a-card>
</template>

<script>
import getDataList from '@/services/signinStatistics';

// import { formatTime } from '@/utils';

const tableHead = [
  {
    title: '微信昵称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'openid',
    dataIndex: 'openid',
    align: 'center',
  },
  {
    title: '签到时间',
    dataIndex: 'created_date',
    align: 'center',
  },
  {
    title: '是否为邀请用户',
    dataIndex: 'inWhitelist',
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
        total: 0,
        showTotal: total => `共 ${total} 条`,
        onChange: (page) => {
          this.toSelectPage(page);
        },
      },
      tableHead,
      list: [],
      testList: [],
    };
  },
  methods: {
    toSelectPage(page) {
      this.fetchDataList(page);
    },
    async fetchDataList(page = 1) {
      this.loading = true;
      const options = {
        page: page,
        size: 10,
      };
      const params = {};
      Object.keys(options).forEach((c) => {
        if (options[c]) {
          params[c] = options[c];
        }
      });
      const { status, data } = await getDataList(params);
      if (/20\d/.test(status)) {
        this.loading = false;
        data.data.list.forEach(item => {
          item.inWhitelist = item.inWhitelist ? '是' : '否';
        });
        this.list = data.data.list;
        this.options.total = data.data.total;
      } else {
        this.loading = false;
        this.$message.error(data.error.detail || '未知异常');
      }
    },
  },
  async mounted() {
    this.fetchDataList();
  },
};
</script>

<style lang="less">
  .ant-calendar-picker {
    width: 100%;
  }
</style>
