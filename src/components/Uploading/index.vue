<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :http-request="onRequest"
      :file-list="fileLists"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :limit="1"
      class="custom-upload"
      :class="fileLists.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" width="100%" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDmOlrgEVWGjvrWIq9BwRownNgiTxA7nCJ',
  SecretKey: 'rToreCUVFiupSothETSAbmiNlrgFWWFg'
})
export default {
  name: 'UploadImg',
  data() {
    return {
      fileLists: [],
      imgUrl: '',
      previewImgDialog: false,
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hello-123-1313341652' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败，请重试')
          }
          this.$emit('success', { url: 'https//' + data.Location })
        }
      )
    },
    onChange(file, fileList) {
      this.fileLists = fileList
    },
    onRemove(file, fileList) {
      this.fileLists = fileList
    },
    onPreview(file, fileList) {
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      // 限制图片上传类型
      const type = ['image/jpeg', 'image/gif']
      if (!type.includes(file.type)) {
        this.$message.error('请选择' + type.join('、') + '图片')
        return false
      }
      // 限制图片上传大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超出2mb')
        return false
      }
    }
  },

  computed: {}
}
</script>

<style scoped lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 150px;
  height: 150px;
  overflow: hidden;
}
</style>
