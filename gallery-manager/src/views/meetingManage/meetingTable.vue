<template>
  <a-card class="data-list">
    <div class="operate">
      <a-button type="dashed" style="width: 100%" @click="handleAdd" icon="plus">新增会议</a-button>
    </div>
    <a-table
      :loading="loading"
      :pagination="options"
      :columns="tableHead"
      :dataSource="list">
    <span slot="title1" slot-scope="text, record">
      <a href="javascript:;" @click="showVideoList(record.id)">{{text}}</a>
    </span>
  
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;" @click="handleEdit(record)">编辑</a>
      <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <!-- <a href="javascript:;" @click="AttendenceList(record.id)">名单</a> -->
              <a-popconfirm
                v-if="list.length"
                title="确定删除吗？"
                okText="确定"
                cancelText="取消"
                @confirm="() => handleDelete(record)">
                <a href="javascript:;">删除</a>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
    </span>
    </a-table>
  </a-card>
</template>

<script>
import { getMeetingList, deleteMeetingInfo}  from '@/services/meeting';
import helper from '@/utils/helper';

// import { formatTime } from '@/utils';

const tableHead = [
  {
    title: '标题',
    dataIndex: 'name',
    scopedSlots: { customRender: 'title1' },
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'description',
    align: 'center',
  },
   {
    title: '开始时间',
    dataIndex: 'created_date',
    align: 'center',
    customRender: (text) => {
      return helper.formatDate(text, 'yyyy-MM-dd hh:mm:ss');
    },
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
    };
  },
  methods: {
    toSelectPage(page) {
      this.fetchDataList(page);
    },
    handleAdd(){
      this.$router.push('/meeting/editForm/add');
    },
    handleEdit(val){
     this.$router.push({
        name: 'meetingForm',
        params: {
        id: val.id,
        mode: 'edit',
        },
      });
    },
    async handleDelete (record) {
      const { status, data } = await deleteMeetingInfo(record.id);
      if (/20\d/.test(status)) {
        this.$message.success('已删除');
        this.fetchCheckPointList();
      } else {
        this.$message.error(data.error.detail || '未知异常');
      }
    },
    showVideoList(id){
      this.$router.push(`/meeting/videoList/${id}`);
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
      const { status, data } = await getMeetingList(params);
      if (/20\d/.test(status)) {
        this.loading = false;
        data.data.list.forEach(item => {
          item.inWhitelist = item.inWhitelist ? '是' : '否';
        });
        this.list = data.data.list;
        this.options.total = data.data.totalCount;
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
