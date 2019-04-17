<template>
  <div class="step2" ref="step2">
    <a-card style="min-height: 65vh">
      <div slot="title">
        <detail-list v-if="!mode" size="small" :col="2" class="detail-layout">
          <detail-list-item term="名称">{{ levelData.name }}</detail-list-item>
          <detail-list-item term="状态">{{ formatStatus(levelData.status) }}</detail-list-item>
        </detail-list>
        <!-- <a-form v-if="mode">
          <a-form-item></a-form-item>  
          <a-col :sm="2" :xs="8">名称：</a-col>
          <a-col :sm="12" :xs="16" class="step2-name">
            <span v-if="!isEdit" class="step2-name-item">{{levelData.name}}</span>
            <a-input v-if="isEdit" v-model="levelData.name" />
            <a-icon class="trigger step2-name-icon" :type="isEdit ? 'check' : 'form'" @click="toggleStatus" />
          </a-col>
          <a-col>
            <a-date-picker
              style="width: 100%;"
              :value="levelInfo.end_time"
              @change="onEndTimeChange"
              placeholder="请输入测试结束日期" />
          </a-col>
          <a-col offset="1" :sm="2" :xs="8">状态：</a-col>
          <a-col :sm="7" :xs="16" style="text-align: left;">
            <a-select v-model="levelData.status" placeholder="请选择">
              <a-select-option v-for="item in testStatusList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
          </a-col>
        </a-form> -->
        <a-row v-if="mode">     
          <a-col :sm="2" :xs="8">名称：</a-col>
          <a-col :sm="4" :xs="12" class="step2-name">
            <span v-if="!isNameEdit" class="step2-name-item">{{levelData.name}}</span>
            <a-input v-if="isNameEdit" v-model="levelData.name" />
            <a-icon class="trigger step2-name-icon" :type="isNameEdit ? 'check' : 'form'" @click="toggleStatus('name')" />
          </a-col>
          <a-col :sm="2" :xs="4">结束时间：</a-col>
          <a-col :sm="4" :xs="12" class="step2-name">
            <span v-if="!isTimeEdit" class="step2-name-item">{{ levelData.end_time | formatEndTime }}</span>
            <!-- <a-input v-if="isEdit" v-model="levelData.end_time" /> -->
            <a-date-picker
              v-if="isTimeEdit"
              showTime
              style="width: 100%;"
              format="YYYY-MM-DD HH:mm:ss"
              v-model="levelData.end_time"
              placeholder="请输入测试结束日期" />
            <a-icon class="trigger step2-name-icon" :type="isTimeEdit ? 'check' : 'form'" @click="toggleStatus('time')" />
          </a-col>
          <a-col  :sm="1" :xs="7">状态：</a-col>
          <a-col :sm="2" :xs="4" style="text-align: left;">
            <a-select v-model="levelData.status" size="small" placeholder="请选择">
              <a-select-option v-for="item in testStatusList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
            <!-- <a-radio-group @change="onChange" v-model="levelData.status">
              <a-radio v-for="(item, index) in testStatusList" :key="index" :value="item.value">{{item.label}}</a-radio>
            </a-radio-group> -->
          </a-col>
          <a-col  :sm="3" :xs="4">类型：{{testTypes[levelData.type]}}</a-col>
          <a-col offset="1" v-show="levelData.type === conference" :sm="3" :xs="4">答题限时(分钟)：</a-col> 
          <a-col v-show="levelData.type === conference" :sm="2" :xs="4" class="step2-name" >
            <span v-if="!isTimeLimitEdit" class="step2-name-item">{{levelData.time_limit}}</span>
            <a-input v-if="isTimeLimitEdit" v-model="levelData.time_limit" />
            <a-icon class="trigger step2-name-icon" :type="isTimeLimitEdit ? 'check' : 'form'" @click="toggleStatus('time_limit')" />
          </a-col>
        </a-row>
      </div>
      <div class="operate">
        <a-button type="dashed" style="width: 100%" @click="nextStep" icon="plus">新增关卡</a-button>
      </div>
      <a-table
        :columns="tableHead"
        :loading="loading2"
        :dataSource="list"
        :locale="textOptions"
        :pagination=false
        size="middle"
        :scroll="{ y: '50vh' }">
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
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
        <template slot="condition" slot-scope="condition">
          正确回答≥{{condition}}
        </template>
      </a-table>
      <a-form style="max-width: 500px; margin: 40px auto 0;">
        <a-form-item :wrapperCol="{span: 14, offset: 4}">
          <a-button v-if="!mode" @click="prevStep">上一步</a-button>
          <a-button v-if="mode" @click="goBack()">返回</a-button>
          <a-button style="margin-left: 8px" :loading="loading" type="primary" @click="finish">保存</a-button>
        </a-form-item>
      </a-form>
      <!-- <footer-tool-bar :style="{ width: `calc(100% - ${sidebarOpened ? 256 : 80}px)`, display: 'flex', justifyContent: 'center'}">
        <a-button v-if="!mode" @click="prevStep">上一步</a-button>
        <a-button v-if="mode" @click="goBack()">返回</a-button>
        <a-button style="margin-left: 8px" :loading="loading" type="primary" @click="finish">保存</a-button>
      </footer-tool-bar> -->
    </a-card>
  </div>
</template>

<script>
  import DetailList from '@/components/DetailList'; 
  const DetailListItem = DetailList.Item;
  import { testStatusList } from '@/config/modules';
  import * as testMethod from '@/services/levelTest';
  import moment from 'moment';
  import FooterToolBar from '@/components/FooterToolBar';
  import { mixinDevice } from '@/utils/mixin';
  import { testTypes, conference } from '@/config/constants';

  const tableHead = [
    {
      title: '#',
      dataIndex: 'no',
      width: '10%',
      align: 'center',
    },
    {
      title: '关卡编号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '通关条件',
      key: 'condition',
      dataIndex: 'condition',
      align: 'center',
      scopedSlots: { customRender: 'condition' },
      width:  '18%',
    },
    {
      title: '题目数量',
      dataIndex: 'num',
      key: 'num',
      align: 'center',
      width:  '18%',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      scopedSlots: { customRender: 'action' },
      width:  '18%',
    },
  ];
  export default {
    name: 'Step2',
    data () {
      return {
        conference,
        testTypes,
        loading: false,
        loading2: false,
        isNameEdit: false,
        isTimeEdit: false,
        isTimeLimitEdit: false,
        testStatusList,
        tableHead,
        list: [],
        textOptions: {
          emptyText: '暂无关卡，请点击新增关卡开始创建关卡',
        },
        levelData: {},
      };
    },
    mixins: [ mixinDevice ],
    components: {
      DetailList,
      DetailListItem,
      FooterToolBar,
    },
    computed: {
      mode() {
        return this.$route.params.mode;
      },
    },
    filters: {
      formatEndTime: function(time) {
        return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : null;
      },
    },
    methods: {
      moment,

      // onEndTimeChange(date, dateString) {
      //   window.console.log(dateString);
      //   this.levelData.end_time = this.moment(dateString, 'YYYY-MM-DD HH:mm:ss');
      // },
      
      toggleStatus(type) {
        if (type === 'name') {
          this.isNameEdit = !this.isNameEdit;
        } else if (type === 'time') {
          this.isTimeEdit = !this.isTimeEdit;
        }else if (type === 'time_limit') {
          this.isTimeLimitEdit = !this.isTimeLimitEdit;
        }
      },
      handleSelectChange(val) {
        this.queryParam.id = val;
      },
      formatStatus(val) {
        return this.testStatusList.filter(c => String(c.value) === String(val))[0].label;
      },
      nextStep () {
        let operateType = '';
        if (this.mode === 'edit') {
          operateType = 'checkPointAdd';
        } else if (this.mode === 'newTest') {
          operateType = 'newTest';
        }
        this.$router.push({
          name: 'Step3',
          params: {
            mode: operateType,
            id: this.$route.params.id,
          },
        });
      },
      prevStep () {
        this.$emit('prevStep');
      },
      goBack() {
        this.$router.push('/level/list');
      },
      handleEdit(val) {
        this.$router.push({
          name: 'Step3',
          params: {
            id: this.$route.params.id,
            checkpointId: val.id,
            mode: 'edit',
          },
        });
      },
      async handleDelete (record) {
        const params = {
          id: this.$route.params.id,
          checkpointId: record.id,
        };
        const { status, data } = await testMethod.deleteCheckPoint(params);
        if (/20\d/.test(status)) {
          this.$message.success('已删除');
          this.fetchCheckPointList();
        } else {
          this.$message.error(data.error.detail || '未知异常');
        }
      },
      async finish() {
        const createTime = this.moment(this.levelData.create_date).format('YYYY-MM-DD HH:mm:ss');
        const endTime = this.moment(this.levelData.end_time).format('YYYY-MM-DD HH:mm:ss');
        const params = {
          id: this.$route.params.id,
          name: this.levelData.name,
          status: this.levelData.status,
          type: this.levelData.type,
          end_time: endTime,
          time_limit: this.levelData.time_limit,
          create_date: createTime,
        };
        const { status, data } = await testMethod.editLevel(params);
        if (/20\d/.test(status)) {
          this.$message.success('新增成功');
          this.$router.push('/level/list');
        } else {
          this.$message.error(data.error.detail || '未知异常');
        }
      },
      async fetchTestInfo() {
        this.loading2 = true;
        const id = this.$route.params.id;
        const { status, data } = await testMethod.getTestInfo(id);
        if (/20\d/.test(status)) {
          this.loading2 = false;
          this.levelData.name = data.data.name;
          this.levelData.status = data.data.status;
          this.levelData.type = data.data.type;
          this.levelData.end_time = this.moment(data.data.end_time);
          this.levelData.create_date = data.data.create_date;
          this.levelData.time_limit = data.data.time_limit.toString();
          this.fetchCheckPointList();
        } else {
          this.loading2 = false;
          this.$message.error(data.error.detail || '未知异常');
        }
      },
      async fetchCheckPointList() {
        const id = this.$route.params.id;
        const { status, data } = await testMethod.getCheckPointList(id);
        if (/20\d/.test(status)) {
          const tempArr = [];
          data.data.forEach((item, index) => {
            tempArr.push({
              no: index,
              ...item,
            });
          });

          this.list = tempArr;
        } else {
          this.$message.error(data.error.detail || '未知异常');
        }
      },
    },
    activated() {
      window.scrollTo(0, 0);
      if (this.$route.params.mode
        && this.$route.params.mode === 'edit'
        || this.$route.params.mode === 'newTest') {
        this.fetchTestInfo();
      }
    },
    beforeMount() {
      this.levelData = Object.assign({}, this.$store.state.level.levelInfo);
    },
  };
</script>

<style lang="less" scoped>
.step2 {
  // max-width: 60vw;
  margin: 0 auto;
  .step2-name {
    display: flex;
    .step2-name-item {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .step2-name-icon {
      line-height: 32px;
      margin-left: 15px;
    }
  }
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }
  .operate {
    margin-bottom: 10px;
  }
}

</style>