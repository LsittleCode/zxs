<script setup>
import { del_department, getDepartmentInfo, receiveDepartment, isShow, showDialog, confirmInfo, confirAdd, departmentData } from './index.ts'

onMounted(() => {
    receiveDepartment()
})
</script>
<template>
    <el-tree :data="departmentData" default-expand-all style="padding: 10px;" @node-click="handleNodeClick"
        :expand-on-click-node="false">
        <template #default="{ node, data }">
            <div class="tree_row">
                <span>{{ data.DepartmentName }}</span>
                <div class="tree_button">
                    <el-button v-if="data.departmentID != 1" @click="showDialog(data)" size="small"
                        type="success">添加</el-button>
                    <el-popconfirm hide-icon cancel-button-text=" " confirm-button-text="确定"
                        @confirm="del_department(data)" title="确定删除?">
                        <template #reference>
                            <el-button :disabled="data.isDel == 0" v-if="data.departmentID != 1" size="small"
                                type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </div>
        </template>
    </el-tree>
    <!-- addDepartment -->
    <el-dialog v-model="isShow">
        <span>部门名称:</span>
        <el-radio-group v-model="confirmInfo.pid" class="departmentClass">
            <el-radio :value="getDepartmentInfo?.pid" label="添加部门"></el-radio>
            <el-radio :value="getDepartmentInfo?.departmentID" label="添加子部门"></el-radio>
        </el-radio-group>
        <el-input v-model="confirmInfo.DepartmentName" style="margin-top: 10px;"></el-input>
        <template #footer>
            <el-button @click="confirAdd" type="success">确定</el-button>
        </template>
    </el-dialog>
</template>
<style lang='less' scoped>
.tree_row {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.departmentClass {
    display: block;
}
</style>