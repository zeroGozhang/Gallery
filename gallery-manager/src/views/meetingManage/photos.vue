<template>
  <div class="clearfix">
    <a-upload
      action="//127.0.0.1:7001/upload/photos"
      :data = "headers"
      listType="picture-card"
      :fileList="fileList"
      :beforeUpload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
      :remove = "handleRemove"
    >
      <div v-if="fileList.length < 100">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import  { photoList , removePhoto }  from '@/services/photos';

export default {
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      headers: {},
    }
  },
  activated() {
    this.getPhotoList()
    console.log(this.$route.params.id)
    this.headers = {
      id:this.$route.params.id
    }
   this.fileList = [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }]
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ file, fileList }) {
      this.fileList = fileList;
    
      if (file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (file.status === 'removed') {
          
      }
      if (file.status === 'done') {
        this.loading = false;
      }
  
    },
    handleRemove(info){
      console.log(info.uid)
      this.reomveImg(info.uid);
      console.log('删除成功');
    },

    beforeUpload (file) {
      const formData = new FormData();
      formData.append('files[]',file);
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      if (!isJPG) {
        this.$message.error('You can only upload JPG OR PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJPG && isLt2M;
    },
    async getPhotoList(){
      const id = this.$route.params.id;
      const { status, data } = await photoList(id);
      if (/20\d/.test(status)) {
        console.log(data.result)
        let imgList = [];
        const photoList = data.result.list;
        photoList.forEach(pl => {
          imgList.push({
             uid: pl.id,
             name: pl.name,
             status: 'done',
             url: pl.url
          })
        })
        console.log(imgList)
        this.fileList = imgList
      } else {
        this.$message.error(data.error.detail || '未知异常');
      }
    },

    async reomveImg(id){
       const {status, data} = await removePhoto(id)
        if (/20\d/.test(status)) {
          this.$message.info('删除成功')
      } else {
        this.$message.error(data.error.detail || '未知异常');
      }
    }


  },
}
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>