<template>
  <a-card class="data-list">
    <div class="operate">
      <a-button type="primary" @click="handleAdd" icon="plus">添加会议邀请</a-button>
      <a-modal
      title="编辑"
      v-model="visible"
      @ok="handleOk"
    >
    </a-modal>
    </div>
    <a-table
      :loading="loading"
      :pagination="options"
      :columns="tableHead"
      :dataSource="list">
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;" @click="handleEdit(record)">编辑</a>
      <a-divider type="vertical" /> 
        <a-popconfirm
          v-if="list.length"
          title="确定删除吗？"
          okText="确定"
          cancelText="取消"
          @confirm="() => handleDelete(record)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
    </span>
    </a-table>
  </a-card>
</template>

<script>
// import editFrom from '@/meetingam/'
import getMeetingVideoList from '@/services/meetingVideo';

// import { formatTime } from '@/utils';

const tableHead = [
  {
    title: '封面',
    dataIndex: 'cover',
    align: 'center',
  },
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
  },
  {
    title: 'owner',
    dataIndex: 'owner',
    align: 'center',
  },
   {
    title: '开始时间',
    dataIndex: 'startDate',
    align: 'center',
  },
   {
    title: '操作',
    key:'action',
    scopedSlots: { customRender: 'action' },
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
      visible: false,
    };
  },
  methods: {
    toSelectPage(page) {
      this.fetchDataList(page);
    },
    handleAdd(){
      this.$router.push('/meeting/editForm/add');
      // this.visible = true;
    },
    handleEdit(val){
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
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
      params.id= this.$route.params.id;
      const { status, data } = await getMeetingVideoList(params);
      if (/20\d/.test(status)) {
        this.loading = false;
        data.data.list.forEach(item => {
          item.inWhitelist = item.inWhitelist ? '是' : '否';
        });
        this.list = data.data.list;
        this.options.total = data.data.totalcount;
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
