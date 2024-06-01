<script setup>
import { useUserStore } from '@/store/user'
import { useSysStore } from '@/store/sys'
import darkswitch from './eldark.vue'
import { showMes } from '@/utlis/notify'
import { bindID } from '@/api/dashboard'
const sysStore = useSysStore()
const userStore = useUserStore()
const popper = {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    padding: '25px'
}

const emID = ref()
const isShow = ref(false)
const close = () => {
    isShow.value = false
}
const handerUser = () => {
    isShow.value = true
}

const submit = async () => {
    if (!emID.value) return
    const isAdd = await bindID(emID.value)
    if (isAdd?.data?.success) {
        showMes(isAdd?.data?.mes, 'success', 1000)
    } else {
        showMes(isAdd?.data?.mes, 'warning', 1000)

    }
}


const cancelHander = ()=>{
    sysStore.updateToken('')
    location.href='/login'
}
</script>
<template>
    <div class="header_container">
        <el-popover placement="bottom" :width="120" :popper-style="popper">
            <template #reference>
                <el-avatar :src="userStore?.info?.avatar">{{ userStore?.info?.avatar ? '' :
                    userStore?.info?.name }}</el-avatar>
            </template>
            <p>绑定身份</p>
            <div class="nickname">
                <span>用户名：</span>
                <span>{{ userStore?.info?.name }}</span>
            </div>
            <p @click="handerUser">修改密码</p>
            
            <el-popconfirm title="确定退出系统" @confirm="cancelHander">
                <template #reference>
                    <p>注销</p>
                </template>
            </el-popconfirm>
        </el-popover>
        <darkswitch />
    </div>

    <el-dialog @close="close" v-model="isShow">
        <el-form-item label="旧密码">
            <el-input v-model="emID"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input v-model="emID"></el-input>
        </el-form-item>
        <template #footer>
            <el-button @click="submit" type="primary">确定</el-button>
        </template>
    </el-dialog>






    <!-- <el-dialog @close="close" v-model="isShow">
        <el-form-item label="ID号：">
            <el-input v-model="emID"></el-input>
        </el-form-item>
        <template #footer>
            <el-button @click="submit" type="primary">确定</el-button>
        </template>
    </el-dialog> -->
</template>

<style lang='less' scoped>
.header_container {
    height: 60px;
    box-shadow: 0 0 5px 1px #696969;
    margin-bottom: 10px;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0 20px;
    gap: 2vw;
}
</style>