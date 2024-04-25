<script setup lang="ts">
import { mouseMoveBackgrounp, formData, formRules, submit, form } from './login.ts'
import { useRouter } from 'vue-router'
const router = useRouter()


const container = ref(null)
const isShowDialog = ref(false)
onMounted(() => {
    mouseMoveBackgrounp(container)
})
</script>
<template>
    <div class="container" ref="container">
        <el-form hide-required-asterisk status-icon :rules="formRules" :model="formData" class="form" size="large"
            label-position="top" ref="form">
            <h4 style="text-align: center; font-size: 25px; color: azure">
                职工档案管理系统
            </h4>
            <el-form-item label="用户名:" prop="user">
                <el-input maxlength="10" v-model="formData.user"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input maxlength="12" v-model="formData.password" type="password"></el-input>
            </el-form-item>
            <el-form-item class="submit">
                <el-button @click="submit" style="width: 180px" type="primary">登录</el-button>
                <el-button @click="isShowDialog = true" style="width: 180px" type="info">注册</el-button>
            </el-form-item>
        </el-form>
    </div>


    <!-- 注册窗口 -->
    <regist v-model:isShowDialog="isShowDialog"></regist>
</template>
<style lang="less" scoped>
.container {
    box-sizing: border-box;
    height: 100vh;
    background-image: url(../../assets/images/logo_background.png);
    background-size: 110% 110%;
    background-repeat: no-repeat;
    padding-top: 100px;
    transition: all .2s ease-out;

    .form {
        max-width: 600px;
        padding: 20px;
        margin: 0 auto;

        /deep/.submit .el-form-item__content {
            justify-content: center;
        }
    }
}
</style>
