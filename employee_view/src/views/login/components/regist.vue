<script setup lang="ts">
const prop = defineProps(['isShowDialog'])
const emit = defineEmits(['update'])

const closeDialog = () => {
    emit('update:isShowDialog', false)
}

interface regist {
    user: string,
    password: string,
    phone: string
}

const registUserInfo = ref<regist>({
    user: '',
    password: '',
    phone: ''
})
</script>
<template>
    <el-dialog @close="closeDialog" v-model="prop.isShowDialog" draggable>
        <el-form label-position="top" label-suffix=":" class="form">
            <el-form-item label=" 用户名">
                <el-input v-model="registUserInfo.user"></el-input>
            </el-form-item>

            <el-form-item label="密码">
                <el-input v-model="registUserInfo.password"></el-input>
            </el-form-item>

            <el-form-item label="手机号">
                <el-input type="phone" maxlength="11" v-model="registUserInfo.phone"></el-input>
            </el-form-item>
            <el-button size="large" type="success">登录</el-button>
        </el-form>
    </el-dialog>
</template>
<style lang='less' scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .el-form-item {
        width: 40vw;
    }
}
</style>