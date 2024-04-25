<template>
  <el-upload class="avatar-uploader" action="http://127.0.0.1/upload" :show-file-list="false"
    :on-success="handleAvatarSuccess" :before-upload="handleBefore" :headers="headers">
    <img v-if="imgS" :src="imgS" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['avatarSrc'])
const emit = defineEmits(['update'])

const imgS = ref(null)
const headers = {

}

const handleAvatarSuccess = (response, uploadFile, uploadFiles) => {

  const newUrl = `http://127.0.0.1${response.data.newPath}`
  emit('update:avatarSrc', newUrl)
  imgS.value = newUrl
}

</script>
<style lang='less' scoped>
/deep/.el-upload--text {
  border: 1px dashed #8c939d !important;
  margin: 10px 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>