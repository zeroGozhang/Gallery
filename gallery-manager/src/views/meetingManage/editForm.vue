<template>
  <a-card style="min-height: 65vh">
  <a-form :form="form" >
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="名称"
      >
      <a-input
        v-model="meetingInfo.name"  
        name="name"
        placeholder="请输入相册名称" />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="名称"
      >
      <a-input
        v-model="meetingInfo.description"  
        name="description"
        placeholder="请输入相册描述" />
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="图片"
      >
  <div class="clearfix">
    <a-upload
      action="//jsonplaceholder.typicode.com/posts/"
      listType="picture-card"
      :fileList="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 3">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
    </a-form-item>

    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="封面">
      <a-upload
        name="cover"
        listType="picture-card"
        class="avatar-uploader"
        action='//web-gateway.tst.jianke.com/uploader/upload'
        :data = "headers"
        :showUploadList="false"
        :beforeUpload="beforeUpload"
        @change="coverChange"
      >
       <img v-if="imageUrl" :src="imageUrl" alt="封面图片"/>
       <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">上传</div>
       </div>
      </a-upload>
    </a-form-item>
    <a-form-item
      :label-col="formTailLayout.labelCol"
      :wrapper-col="formTailLayout.wrapperCol">
      <a-button
        type="primary"
        @click="finish">
        确认
      </a-button>
    </a-form-item>
  </a-form>
  </a-card>
</template>

<script>
import  { addMeetingForm, fetchMeetingInfo, editMeetingForm }  from '@/services/meeting';
import { getBindedArticleList } from '@/services/meetingVideo';
import moment from 'moment';
import { request } from 'https';

function getBase64 (img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10, offset: 4 },
};
export default {
  name:'editForm',
  data () {
    return {
      valueRadio:2,
      loading: false,
      imageUrl: '',
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),
      visible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
      meetingInfo: {
        title:'',
      },
      headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `bearer ${JSON.parse(localStorage.getItem('tokenInfo')).token}`,
  },
    };
  },
  components: {
  },
  computed: {
    mode() {
      return this.$route.params.mode;
    },
  },
  activated() {
    if(this.$route.params.mode === 'edit') {
      this.getMeetingList();
    }else{
      this.initPage();
    };
  },
  methods: {
    moment,
     handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
     onChange (e) {
      console.log('radio checked', e.target.value)
    },
    handleSelection(data) {
      const idArr = [];
      const titleArr = [];
      const result = data.forEach(item => {
        idArr.push(item.id);
        titleArr.push(item.title);
      });
      this.tmpSelectedArticlesArr.bindedArticleKeys = [...idArr];
      this.tmpSelectedArticlesArr.bindedArticleTitles = [...titleArr];
    },
    async setBindedArticles(meetingId) {
      const params = {
        page: 1,
        size: 100,
        id: meetingId,
      };
      const { data, status } = await getBindedArticleList(params);
      if (/20\d/.test(status)) {
        if (data.data.totalcount) {
          const idArr = [];
          const titleArr = [];
          data.data.data.forEach(articleItem => {
            idArr.push(articleItem.id);
            titleArr.push(articleItem.title);
          });
          this.bindedArticleKeys = idArr;
          this.bindedArticleTitles = titleArr;
        }
      } else {
        this.$message.error(data.error.detail || '未知异常');
      }
    },
    async getMeetingList(){
      const id = this.$route.params.id;
      const { status, data } = await fetchMeetingInfo(id);
      if (/20\d/.test(status)) {
        this.meetingInfo=data.data;
      } else {
        this.$message.error(data.error.detail || '未知异常');
      }
      this.setBindedArticles(id);
    },
    initPage() {
      this.meetingInfo = {
          title: '',
          whiteList:'',
        };
    },
    coverChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload (file) {
      const formData = new FormData();
      formData.append('files[]',file);
      console.log(formData);
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      if (!isJPG) {
        this.$message.error('You can only upload JPG OR PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      request({
        url:'//web-gateway.tst.jianke.com/uploader/upload',
        method: 'post',
        processData:false,
        data:formData,
        success: (data)=>{
          console.log(data);
          this.loading=false;
          // this.imageUrl = 
          this.$message.success('upload successfully.');
        }
      })
      return isJPG && isLt2M;
    },
    bindArticle () {
      this.visible = true;
    },
    bindArticleConfirm() {
      this.visible = false;
      const { bindedArticleKeys, bindedArticleTitles } = this.tmpSelectedArticlesArr;
      this.bindedArticleKeys = bindedArticleKeys;
      this.bindedArticleTitles = bindedArticleTitles;
    },
    finish () {
      this.form.validateFields(
        async (err, values) => {
          console.warn(err, values);
          if (!err) {
            const params = {
              name: this.meetingInfo.name,
              description: this.meetingInfo.description,
              cover: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=f888027cebdde711f8d245f697eecef4/71cf3bc79f3df8dcfcea3de8c311728b461028f7.jpg',
            };
            if(this.$route.params.mode === 'add') {
              const { status, data } = await addMeetingForm(params);
              if (/20\d/.test(status)) {
                this.$message.success('新增成功');
                this.$router.push('/meetingManage');
              } else {
                this.$message.error(data.error.detail || '未知异常');
              }
            }else if(this.$route.params.mode === 'edit'){
              const id = this.$route.params.id ;
              const {status, data } = await editMeetingForm(id, params);
              if (/20\d/.test(status)) {
                this.$message.success('修改成功');
                this.$router.push('/meetingManage');
              } else {
                this.$message.error(data.error.detail || '未知异常');
              }
            }
          }
        },
      );
    },
  },
};
</script>
<style>
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>