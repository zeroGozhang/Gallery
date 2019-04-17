<template>
  <div>
    <a-list
      class="test-card-list" ref="content"
      :grid="{gutter: 24, xxl: 6, lg: 4, md: 2, sm: 1, xs: 1}"
      :dataSource="list"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <template v-if="item === null">
          <a-button
            class="new-btn"
            type="dashed"
            style="margin-bottom:-5px;"
            @click="handleAdd">
            <div>
              <a-icon style="font-size:2rem;" type="plus"/>
            </div>
            <span>新增闯关</span>
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true" :loading="loading" :ref="'test-' + index" :style="{'border-color': openStatus(item.status) ? '#13C2C2' : ''}">
            <detail-list size="small" :col="1" class="detail-layout">
              <detail-list-item term="名称">{{ item.name }}</detail-list-item>
              <detail-list-item term="关卡数">{{ item.num }}</detail-list-item>
              <detail-list-item term="类型">{{ testTypes[item.type] }}</detail-list-item>
              <detail-list-item term="创建日期">{{ moment(item.create_date).format('YYYY-MM-DD') }}</detail-list-item>
              <detail-list-item term="结束日期">{{ moment(item.end_date).format('YYYY-MM-DD') }}</detail-list-item>
              <detail-list-item term="状态">{{ formatStatus(item.status) }}</detail-list-item>
            </detail-list>
            <template class="ant-card-actions" slot="actions">
              <a-popconfirm
                okText="确定"
                cancelText="取消"
                @confirm="delConfirm(item)"
                title="是否删除本条测试？">
                <a-icon type="delete" />
              </a-popconfirm>
              <a-icon type="form" @click="handleEdit(item, index)" />
            </template>
          </a-card>
        </template>
      </a-list-item>
      <div v-if="list.length === 0" style="padding: 24px;background: #fff;">
        <span>暂无数据</span>
      </div>
      <test-modal :show.sync="showModal"></test-modal>
    </a-list>
  </div>
</template>

<script>
import DetailList from '@/components/DetailList';
import TestModal from './item/TestModal';
const DetailListItem = DetailList.Item;
import { getTestListData, deleteLevel } from '@/services/levelTest';
import moment from 'moment';
import { testStatusList } from '@/config/modules';
import { testTypes } from '@/config/constants';

// import { dateFormate } from '@/utils';

export default {
  data() {
    return {
      testTypes,
      testStatusList,
      list: [],
      loading: false,
      showModal: false,

      // pagination: {
      //   page: 1,
      //   pageSize: 10,
      //   pageSizeOptions: ['10', '25', '50', '100'],
      //   showSizeChanger: true,
      //   showQuickJumper: true,
      //   hideOnSinglePage: true,
      //   total: 0,
      //   showTotal: total => `共 ${total} 条`,
      //   onChange: (page) => {
      //     window.console.log(page);
      //   },
      // },

      total: 11,
    };
  },
  components: {
    DetailList,
    DetailListItem,
    TestModal,
  },
  methods: {
    moment,
    openStatus(status) {
      return !!status;
    },
    formatStatus(status) {
      let title = '';
      testStatusList.forEach((item) => {
        if (item.value === status) {
          title = item.label;
        }
      });
      return title;
    },
    handleAdd() {
      this.$router.push('/level/step');
    },
    handleEdit(e) {
      this.$router.push(`/level/edit/${e.id}`);
    },
    async delConfirm (item) {
      const { status, data } = await deleteLevel(item.id);
      if (/^20\d/.test(status)) {
        this.$message.success('已删除');
        this.getListData();
      } else {
        this.$message.error(data.error.detail || '未知异常');
      }
    },
    async getListData() {
      this.loading = true;
      const { status, data } = await getTestListData();
      if (/20\d/.test(status)) {
        let arr = [];
        arr.push(null);
        this.list = arr.concat(data.data);
        this.loading = false;
      } else {
        this.loading = false;
        this.$message.error(data.error.detail || '未知异常');
      }
    },
  },
  activated() {
    this.getListData();
  },
};
</script>

<style lang="less">
  .test-card-list {
    .new-btn {
      background-color: #fff;
      border-radius: 2px;
      width: 100%;
      height: 207px;
    }
    .meta-content {
      // position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      height: 64px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .ant-card-body {
      overflow: hidden;
      padding: 24px 24px 0;
    }
    .ant-card-actions {
      border-top: none;
      background: #fff;
      li {
        width: auto !important;
        margin: 5px 0;
        float: right;
        span {
          .anticon {
            font-size: 20px;
          }
        }
      }
      li:not(:last-child) {
        border-right: none;
      }
    }
  }
</style>

