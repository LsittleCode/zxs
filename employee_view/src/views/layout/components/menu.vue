<script setup>
import { useSysStore } from '@/store/sys.ts'
const SysStore = useSysStore()

</script>
<template>
    <el-menu router :collapse="SysStore.isCollapse" class="el-menu-vertical-demo ">
        <el-menu-item index="/">
            <el-icon>
                <House />
            </el-icon>
            <template #title>
                <span>首页</span>
            </template>
        </el-menu-item>

        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <UserFilled />
                </el-icon>
                <span>职工信息管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/empolyee">职工查询</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>


        <el-menu-item index='/rewardPunishments'>
            <el-icon>
                <Finished />
            </el-icon>
            <template #title>
                <span>奖惩管理</span>
            </template>
        </el-menu-item>

        <el-menu-item index="/salary">
            <el-icon>
                <CreditCard />
            </el-icon>
            <template #title>
                <span>职工薪酬管理</span>
            </template>
        </el-menu-item>

        <el-menu-item index="/department">
            <el-icon>
                <OfficeBuilding />
            </el-icon>
            <template #title>
                <span>部门管理</span>
            </template>
        </el-menu-item>
    </el-menu>
</template>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.aside {
    transition: width .3s linear;

}
</style>