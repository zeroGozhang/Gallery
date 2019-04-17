<template>
  <a-list
    :pagination="pagination"
    class="test-card-list" ref="content"
    :grid="{gutter: 24, lg: 4, md: 2, sm: 1, xs: 1}"
    :dataSource="list"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <template v-if="item === null">
        <a-button class="new-btn" type="dashed" @click="handleAdd">
          <div>
            <a-icon style="font-size:2rem;" type="plus"/>
          </div>
          <span>新增产品</span>
        </a-button>
      </template>
      <template v-else>
        <a-card :hoverable="true" :loading="loading">
          <detail-list size="small" :col="1" class="detail-layout">
            <detail-list-item term="名称">{{ item.name }}</detail-list-item>
            <detail-list-item term="关卡数">{{ item.levelNum }}</detail-list-item>
            <detail-list-item term="创建日期">{{ item.createDate }}</detail-list-item>
            <detail-list-item term="状态">{{ item.status }}</detail-list-item>
          </detail-list>
          <template class="ant-card-actions" slot="actions">
            <a-popconfirm
              okText="确定"
              cancelText="取消"
              @confirm="delConfirm(item, index)"
              title="确认删除该关卡吗？">
              <a-icon type="delete" />
            </a-popconfirm>
            <a-icon type="form" @click="handleEdit(item, index)" />
          </template>
        </a-card>
      </template>
    </a-list-item>
  </a-list>
</template>

<script>
import DetailList from '@/components/DetailList';
const DetailListItem = DetailList.Item;

const dataSource = [];
dataSource.push(null);
for (let i = 0; i < 11; i++) {
  dataSource.push({
    name: `${i + 1}月测试`,
    levelNum: i + 2,
    createDate: new Date().getTime(),
    status: '1',
  });
}

export default {
  data() {
    return {
      list: dataSource,
      loading: true,
      pagination: {
        page: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '25', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        hideOnSinglePage: true,
        total: 50,
        showTotal: total => `共 ${total} 条`,
        onChange: (page) => {
          window.console.log(page);
        },
      },
      total: 11,
    };
  },
  components: {
    DetailList,
    DetailListItem,
  },
  methods: {
    handleAdd() {
      this.$router.push('/level/step/add');

    },
    handleEdit(e, index) {
      this.$router.push(`/level/edit/${index}`);
    },
    delConfirm (e, index) {
      window.console.log(e);
      window.console.log(index);
      this.$message.success('Click on Yes');
    },
  },
  mounted() {
    this.loading = false;
  },
};
</script>

<style lang="less">
  .test-card-list {
    .new-btn {
      background-color: #fff;
      border-radius: 2px;
      width: 100%;
      height: 177px;
    }
    .meta-content {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      height: 64px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .ant-card-body {
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

