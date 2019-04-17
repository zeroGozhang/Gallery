<template>
  <div class="step3-level" ref="step3">
    <a-form class="step3-form">
      <div class="information">
        <div class="header-info">
          <span>通关条件：</span>
          <span>
            当答对题目≥&nbsp;&nbsp;
            <a-input size="small" v-model="checkPointCondition" style="width:60px;" />
            &nbsp;&nbsp;即通过关卡
          </span>
        </div>
        <div class="header-extra" v-show="!isAddBtnFixed">
          <a-button type="primary" @click="handleAddQuestion">
            <a-icon type="plus"></a-icon>
            新增题目
          </a-button>
        </div>
      </div>
      <a-list size="large" :dataSource="questionList" v-if="questionList.length">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <template>
            <a-card style="width: 100%;" :hoverable="true" :loading="loading" :ref="'test-' + index">
              <div slot="title">
                <a-row>
                  <a-col :xs="24" :sm="4" :md="3">
                    <span>第{{ index + 1 }}题：</span>
                  </a-col>
                  <a-col :xs="24" :sm="12" :md="11">
                    <a-textarea
                      placeholder="题目名称"
                      v-model="item.title"
                      :autosize="{ minRows: 1, maxRows: 6 }" />
                  </a-col>
                  <a-col :xs="24" :sm="8" :md="9" offset="1">
                    <a-radio-group @change="onRadioChange(item)" v-model="item.type">
                      <a-radio :value="0">单选题</a-radio>
                      <a-radio :value="1">多选题</a-radio>
                    </a-radio-group>
                  </a-col>
                </a-row>
              </div>
              <div slot="extra">
                <a-button type="primary" size="small" @click="handleDelQuestion(index)">
                  <a-icon type="close"></a-icon>
                </a-button>
              </div>
              <div class="question-content">
                <div class="anwser-list">
                  <div v-for="(answer, idx) in item.options" :key="idx" class="answer-list-item">
                    <EditBox
                      v-if="answer && answer.type === 'edit'"
                      :answer.sync="answer"
                      @onSelectAnswer="onSelectAnswer({ index, idx, type: item.type })"
                      @handleEditAnswer="handleEditAnswer"
                      @handleDelAnswer="handleDelAnswer({ index, idx, length: item.options.length })"/>
                    <AddBox
                      v-if="answer && answer.type === 'add'"
                      :answer.sync="answer"
                      @handleSaveAnswer="handleSaveAnswer"
                      @handleDelAnswer="handleDelAnswer({ index, idx, length: item.options.length })"/>
                  </div>
                  <div class="add-answer-btn">
                    <a-button
                      icon="plus"
                      size="small"
                      type="dashed"
                      style="width: 100%"
                      @click="handleAddAnswer(index)">
                      新增答案
                    </a-button>
                  </div>
                </div>
              </div>
              <a-alert
                closable
                v-if="visible"
                class="answer-tips"
                :afterClose="handleCloseAlert"
                message="注意：勾选答案后，即表示此选项为正确答案"
              />
              <template class="ant-card-actions" slot="actions">
                <div @click="moveUp(item, index)">
                  <a-icon type="arrow-up"/>
                  上移
                </div>
                <div @click="moveDown(item, index)">
                  <a-icon type="arrow-down"/>
                  下移
                </div>
              </template>
            </a-card>
          </template>
        </a-list-item>
      </a-list>
      <div v-if="!questionList.length" class="no-question">
        暂无题目
      </div>
      <a-form-item v-if="!isBtnBoxFixed" :wrapperCol="{span: 14, offset: 4}" style="padding-top:20px;">
        <a-button @click="prevStep">上一步</a-button>
        <a-button :loading="loading" type="primary" style="margin-left: 8px" @click="finish">保存</a-button>
      </a-form-item>
    </a-form>
    <footer-tool-bar v-if="isBtnBoxFixed" :style="{ width: `calc(100% - ${sidebarOpened ? 256 : 80}px)`, display: 'flex', justifyContent: 'center',padding: '0 24px'}">
    <!-- <footer-tool-bar :style="{ width: isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}"> -->
      <div style="width: 100%;background: #fff;box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);background: #fff;border-top: 1px solid #e8e8e8;">
        <a-button @click="prevStep">上一步</a-button>
        <a-button type="primary" :loading="loading" style="margin-left: 8px" @click="finish">提交</a-button>
        <a-button type="primary" v-show="isAddBtnFixed" style="margin-left: 8px" @click="handleAddQuestion">
          <a-icon type="plus"></a-icon>
          新增题目
        </a-button>
      </div>
    </footer-tool-bar>
  </div>
</template>

<script>
  import { addCheckPoint, fetchCheckpointInfo, editCheckPoint } from '@/services/levelTest';
  import FooterToolBar from '@/components/FooterToolBar';
  import EditBox from './item/EditBox';
  import AddBox from './item/AddBox';
  import { mixinDevice } from '@/utils/mixin';
  import debounce from 'lodash.debounce';

  export default {
    name: 'Step3',
    data () {
      return {
        loading: false,
        isBtnBoxFixed: false,
        isAddBtnFixed: false,
        visible: true,
        pagination: {
          page: 1,
          pageSize: 10,
          size: 'small',
          pageSizeOptions: ['10', '25', '50', '100'],
          showSizeChanger: true,
          showQuickJumper: true,
          hideOnSinglePage: true,
          total: 50,
          showTotal: total => `共 ${total} 条`,
          onChange: (page) => this.onPageChange(page),
        },
        checkPointCondition: '',
        questionList: [
          {
            title: '',
            type: 0,
            options: [
              // {
              //   title: '',
              //   is_right: 0,
              //   type: 'edit/add',
              // },
            ],
          },
        ],
      };
    },
    mixins: [ mixinDevice ],
    components: {
      EditBox,
      AddBox,
      FooterToolBar,
    },
    computed: {
      mode() {
        return this.$route.params.mode;
      },
    },
    methods: {
      handleCloseAlert(){
        this.visible = false;
      },
      onRadioChange(option) {
        if (option.options.length) {
          option.options.forEach((item) => {
            item.is_right = 0;
            item.isChecked = false;
          });
        }
      },
      prevStep () {
        const id = this.$route.params.id;
        this.$router.push(`/level/edit/${id}`);
      },
      nextStep () {
        const that = this;
        that.loading = true;
        setTimeout(function () {
          that.$emit('nextStep');
        }, 1500);
      },
      async finish () {
        const reg = /^[+]{0,1}(\d+)$/;
        if (!this.checkPointCondition
          || this.checkPointCondition > this.questionList.length
          || !reg.test(this.checkPointCondition)) {
          this.$message.warning('通关条件无效，请重新输');
          return;
        }

        let params = {
          condition: parseInt(this.checkPointCondition, 10),
          list: this.questionList,
        };
        if (this.mode === 'edit') {
          params.id = this.$route.params.id;
          params.checkpointId = this.$route.params.checkpointId;
          const { status, data } = await editCheckPoint(params);
          if (/20\d/.test(status)) {
            this.$router.push(`/level/edit/${this.$route.params.id}`);
          } else {
            this.$message.error(data.error.detail || '未知异常');
          }
        } else if (this.mode === 'checkPointAdd' || this.mode === 'newTest') {
          params.id = this.$route.params.id;
          const { status, data } = await addCheckPoint(params);
          if (/20\d/.test(status)) {
            this.$message.success('新增成功');
            this.$router.push(`/level/newTest/${this.$route.params.id}`);
          } else {
            this.$message.error(data.error.detail || '未知异常');
          }
        }
      },
      onPageChange(page) {
        this.pagination.page = page;
      },
      handleAddQuestion() {
        this.questionList.push(
          {
            title: '',
            type: 0,
            options: [
              {
                title: '',
                is_right: 0,
                isChecked: false,
                type: 'add',
              },
            ],
          },
        );
      },
      handleDelQuestion(index) {
        const len = this.questionList.length;
        if (len >= 1) {
          this.questionList.splice(index, 1);
        }
      },
      handleAddAnswer(index) {
        this.questionList[index].options.push({
          title: '',
          is_right: 0,
          isChecked: false,
          type: 'add',
        });
      },
      onSelectAnswer ({ index, idx, type }) {
        if (type === 1) {

          // 多选

          const checkStatus = this.questionList[index].options[idx].isChecked;
          this.questionList[index].options[idx].is_right = !checkStatus ? 1 : 0;
          this.questionList[index].options[idx].isChecked = !checkStatus;
        } else {

          // 单选

          const checkStatus = this.questionList[index].options[idx].isChecked;

          let answerList = this.questionList[index].options;
          const bool = answerList.every( c => !c.isChecked);

          if (checkStatus) {
            this.questionList[index].options[idx].is_right = 0;
            this.questionList[index].options[idx].isChecked = false;
          } else {
            if (bool) {
              this.questionList[index].options[idx].is_right = 1;
              this.questionList[index].options[idx].isChecked = true;
            } else {
              answerList.forEach((item, iIndex) => {
                if (iIndex === idx) {
                  item.isChecked = true;
                  item.is_right = 1;
                } else {
                  item.isChecked = false;
                  item.is_right = 0;
                }
              });
            }
          }
        }
      },
      handleEditAnswer(option) {
        option.type = 'add';
      },
      handleSaveAnswer(answer) {
        if (!answer.title) {
          this.$message.warning('答案内容不能为空');
          return;
        }
        answer.type = 'edit';
      },
      handleDelAnswer({ index, idx, length }) {
        if (length > 1) {
          this.questionList[index].options.splice(idx, 1);
        } else {
          this.$message.warning('每道题至少要有一个答案！');
        }
      },
      moveUp(item, index) {
        if (index) {
          const questions = this.questionList;
          const preItem = questions[index - 1];
          this.$set(this.questionList, index - 1, item);
          this.$set(this.questionList, index, preItem);

          // questions.splice((index - 1), 1, item);
          // questions.splice((index), 1, preItem);
        } else {
          this.$message.warning('已经是第一题，不能上移了！！！');
        }
      },
      moveDown(item, index) {
        if (index === (this.questionList.length - 1)) {
          this.$message.warning('已经是最后一题，不能下移了！！！');
          return;
        }
        const questions = this.questionList;
        const len = questions.length;
        if (len > 1 && ((len - 1) !== index)) {
          const nextItem = questions[index + 1];
          this.$set(this.questionList, index + 1, item);
          this.$set(this.questionList, index, nextItem);
        }
      },
      async getCheckPointInfo() {
        const params = {
          id: this.$route.params.id,
          checkpointId: this.$route.params.checkpointId,
        };
        const { status, data } = await fetchCheckpointInfo(params);
        if (/20\d/.test(status)) {
          this.checkPointCondition = data.data.condition;
          const tempArr = data.data.list;
          tempArr.forEach((item) => {
            if (item.options.length) {
              item.options.forEach((c) => {
                c.type = 'edit';
                c.isChecked = !!c.is_right;
              });
            }
          });

          this.questionList = tempArr;

        } else {
          this.$message.error(data.error.detail || '未知异常');
        }
      },
      initPage() {
        this.checkPointCondition = null;
        this.questionList = [
          {
            title: '',
            type: 0,
            options: [
              {
                title: '',
                is_right: 0,
                isChecked: false,
                type: 'add',
              },
            ],
          },
        ];
      },
      step3ContentHeights() {
        return this.$refs.step3.offsetHeight;
      },
      debounceScroll: debounce(
        function() {
          if (window.scrollY > 500) {
            this.isAddBtnFixed = true;
          } else {
            this.isAddBtnFixed = false;
          }
        },
      300),
    },
    updated() {
      if (this.step3ContentHeights() > 1000) {
        this.isBtnBoxFixed = true;
      } else {
        this.isBtnBoxFixed = false;
      }
    },
    activated() {
      window.scrollTo(0, 0);
      window.addEventListener('scroll', this.debounceScroll);
      if (this.$route.params.mode === 'checkPointAdd'
        || this.$route.params.mode === 'newTest') {
        this.initPage();
      } else {
        this.getCheckPointInfo();
      }
    },
  };
</script>
<style lang="less" scoped>
  .step3-level {
    min-height: 65vh;
    background: #fff;
    padding: 10px 0;
    .step3-form {
      max-width: 55vw;
      margin: 20px auto 0px;
      .no-question {
        border:1px solid #eee;
        border-radius:4px;
        color:#aaa;
        padding:24px;
        margin:10px 0;
      }
    }
    .information {
      display: flex;
      justify-content: space-between;
      line-height: 24px;
    }
    .money {
      font-family: "Helvetica Neue",sans-serif;
      font-weight: 500;
      font-size: 20px;
      line-height: 14px;
    }

    .align-right {
      text-align: right;
    }
    .align-left {
      text-align: left;
    }

    .ant-radio-group {
      white-space: nowrap;
    }
    .anwser-list {
      text-align: left;
      padding: 0 10px;
      .answer-list-item {
        position:relative;
        margin: 10px 0;
        // .answer-list-item-edit-operate {
        //   // width: 80px;
        //   // padding-left: 22px;
        //   display: flex;
        //   justify-content: space-around;
        //   align-items: center;
        // }
        // .answer-list-item-edit {
        //   display:flex;
        //   justify-content:space-between;
        //   // .answer-list-item-edit-operate {
        //   //   width: 80px;
        //   //   padding-left: 22px;
        //   //   display: flex;
        //   //   justify-content: space-around;
        //   //   align-items: center;
        //   // }
        // }
        // .answer-list-item-add {
        //   display:flex;
        //   justify-content:space-between;
        //   .answer-list-item-add-operate {
        //     // width: 80px;
        //     // padding-left: 15px;
        //     display: flex;
        //     justify-content: space-around;
        //     align-items: center;
        //   }
        // }
      }
      .add-answer-btn {
        padding: 10px 0;
      }
    }
    .ant-list-split .ant-list-item {
      border-bottom: none;
    }
    .ant-checkbox-wrapper {
      // margin-left: 8px;
      // margin-bottom: 5px;
      display: flex;
      align-items: center;
    }
    .trigger {
      padding: 0 5px;
      cursor: pointer;
      -webkit-transition: color .3s;
      transition: color .3s;
      text-align: left;
      position: absolute;
      /* margin: auto 0; */
      line-height: 25px;
    }
    .answer-checkbox {
      display: flex;
    }
    .answer-tips {
      background-color: #e6fffb;
      border: 1px solid #87e8de;
      padding: 4px 10px;
    }
  }
</style>

<style scoped>
  .answer-tips >>> .ant-alert-close-icon {
    top: 4px;
  }
  .ant-checkbox-wrapper >>> .ant-checkbox {
    top: 0;
  }
  .ant-card >>> .ant-card-extra {
    align-self: self-start;
    padding-left: 24px;
  }
  .ant-card >>> .ant-card-actions > li {
    margin: 5px 0;
  }
</style>