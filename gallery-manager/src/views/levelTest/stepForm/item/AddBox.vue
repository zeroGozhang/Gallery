<template>
  <div class="answer-list-item-add">
    <a-textarea v-model="answer.title" :autosize="{ minRows: 1, maxRows: 3 }"></a-textarea>
    <div class="answer-list-item-add-operate">
      <a-icon style="font-size: 16px;padding: 0 10px;" type="check-circle" @click="handleSaveAnswer"/>
      <a-popconfirm
        okText="确定"
        cancelText="取消"
        okType='danger'
        @confirm="handleDelAnswer"
        title="确定删除该答案吗？">
        <a-icon style="font-size: 16px;padding: 0 10px;" type="close-circle"/>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    answer: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    handleSaveAnswer() {
      this.$emit('handleSaveAnswer', this.answer);
    },
    handleDelAnswer() {
      this.$emit('handleDelAnswer');
    },
  },
};
</script>

<style lang="less" scoped>
.answer-list-item-add {
  display:flex;
  justify-content:space-between;
  .answer-list-item-add-operate {
    // width: 80px;
    // padding-left: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
