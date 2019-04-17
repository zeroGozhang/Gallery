<template>
  <div class="answer-list-item-edit">
    <a-checkbox
      :checked="answer.isChecked"
      class="answer-checkbox"
      @change="onSelectAnswer">
      {{answer.title}}
    </a-checkbox>
    <div class="answer-list-item-edit-operate">
      <a-icon type="form" style="font-size: 16px;padding: 0 10px;" @click="handleEditAnswer"/>
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
  data() {
    return {};
  },
  props: {
    answer: {
      type: Object,
      default: () => {
        return {};
      },
    },

    // index: {
    //   type: Number,
    // },
    // idx: {
    //   type: Number,
    // },
    // type: {
    //   type: Number,
    // },
  },
  methods: {
    onSelectAnswer() {
      this.$emit('onSelectAnswer');
    },
    handleEditAnswer() {
      this.$emit('handleEditAnswer', this.answer);
    },
    handleDelAnswer() {
      this.$emit('handleDelAnswer');
    },
  },
};
</script>

<style lang="less" scoped>

.answer-list-item-edit {
  display:flex;
  justify-content:space-between;
  .answer-list-item-edit-operate {
    // width: 80px;
    // padding-left: 22px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
