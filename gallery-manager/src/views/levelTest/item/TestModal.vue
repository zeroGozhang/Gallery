<template>
  <a-modal
    title="新增测试"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    :confirmLoading="confirmLoading"
  >
    <a-form :form="testForm">
      <a-form-item
        label='测试名称'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol">
        <a-input
          v-decorator="['name', {rules: [{ required: true, message: '测试名称不能为空' }]}]"
          placeholder='请输入测试名称'
        />
      </a-form-item>
      <a-form-item
        label='状态'
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol">
        <a-radio-group
          name="radioGroup"
          v-decorator="[ 'status' ]"
          :options="options"
          @change="changeStatus"
          :defaultValue="options[0].value">
          <!-- <a-radio-group
            :options="options"
            @change="changeStatus"
            :defaultValue="options[0].value" /> -->
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { addTest } from '@/services/levelTest';

const formItemLayout = {
  labelCol: { lg: { span: 7 }, sm: { span: 7 } },
  wrapperCol: { lg: { span: 10 }, sm: { span: 17 } },
};
const options = [
  { label: '关闭', value: '0' },
  { label: '开启', value: '1' },
];

export default {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      formItemLayout,
      options,

      status: '',

      testForm: this.$form.createForm(this),
    };
  },
  props: {
    show: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  watch: {
    show(val) {
      this.visible = val;
    },
  },
  methods: {
    changeStatus(e) {
      this.status = e.target.value;
    },
    handleOk () {
      const _this = this;

      // 触发表单验证

      this.testForm.validateFields(async(err, values) => {
        // 验证表单没错误

        if (!err) {
          const params = {
            ...values,
            status: _this.status,
          };
          _this.confirmLoading = true;

          const { status, data } = await addTest(params);
          if (/20\d/.test(status)) {
            _this.$message.success('新增成功');
            _this.updateModalStatus();
            _this.confirmLoading = false;
          } else {
            _this.confirmLoading = false;
            _this.$message.error(data.error.detail || '未知异常');
          }

          // 模拟后端请求 2000 毫秒延迟
          // new Promise((resolve) => {
          //   setTimeout(() => resolve(), 2000);
          // }).then(() => {
          //   // Do something
          //   _this.$message.success('保存成功');
          //   _this.$emit('ok');
          // }).catch(() => {
          //   // Do something
          // }).finally(() => {
          //   _this.confirmLoading = false;
          //   _this.close();
          // });
        }
      });
    },
    handleCancel() {
      this.updateModalStatus();
    },
    updateModalStatus() {
      this.$emit('update:show', false);
    },
  },
  mounted() {
    this.status = this.options[0].value;
  },
};
</script>

<style>

</style>
