<script setup>
import elmenu from './components/menu.vue'
import employeeHeader from './components/employeeHeader.vue'
import headerbreadcrumb from './components/breadcrumb.vue'
import { userInfo } from '@/api/layout'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
onMounted(async () => {
    const info = await userInfo()
    userStore.updateInfo(info?.data?.mes)
})
</script>
<template>
    <employeeHeader />
    <div class="container_employee">
        <elmenu></elmenu>
        <div class="contentWin">
            <headerbreadcrumb></headerbreadcrumb>
            <!-- 二级路由出口 -->
            <div class="showBox">
                <el-collapse-transition name="el-zoom-in-top">
                    <router-view></router-view>
                </el-collapse-transition>

            </div>
        </div>
    </div>
</template>
<style lang='less' scoped>
.container_employee {
    height: calc(100vh - 70px);
    display: flex;
    overflow: hidden;

    .contentWin {
        flex: 1;
        display: flex;
        flex-direction: column;

        .showBox {
            padding: 10px;
            overflow-y: auto;
            height: 100%;
            padding-bottom: 100px;

            &::-webkit-scrollbar {
                width: 0;
            }
        }
    }
}
</style>