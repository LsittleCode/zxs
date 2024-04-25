<script setup lang="ts">
import addDialog from './components/addDialog.vue'
import { getList, delRewad } from '@/api/isReward'
import { showMes } from '@/utlis/notify'

const list = ref(null)
const getRewardList = async () => {
    const res = await getList()
    list.value = res?.data?.list
}
getRewardList()
const isShow = ref(false)


const handerConfirm = async (id) => {
    const isDel = await delRewad(id)
    if (isDel?.data?.success) {
        showMes(isDel?.data?.mes, 'success')
    }
    getRewardList()
}
</script>
<template>
    <div class="reward_punishments_header">
        <el-button type="primary" @click="isShow = true">添加奖惩</el-button>
    </div>
    <el-table :data="list" stripe border class="table" style="width:99%;">
        <el-table-column label="编号" type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="部门" prop="DepartmentName"></el-table-column>
        <el-table-column label="state">
            <template #default="{ row }">
                <el-switch style="--el-switch-on-color:#ff4949; --el-switch-off-color:#13ce66" :disabled="true"
                    v-model="row.isReward" inactive-text="奖金" active-text="扣款" :active-value="0" inline-prompt
                    :inactive-value="1"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="奖惩缘由" prop="description"></el-table-column>
        <el-table-column label="金额" prop="money"></el-table-column>
        <el-table-column label="操作">
            <template #default="{ row }">
                <el-popconfirm title="确定删除?" @confirm="handerConfirm(row.id)">
                    <template #reference>
                        <el-button type="primary">删除该纪录</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>

    </el-table>


    <addDialog @getRewardList="getRewardList" v-model:isShow="isShow"></addDialog>
</template>
<style lang='less' scoped>
.reward_punishments_header {
    padding: 15px;
    border-bottom: 1px solid #bdb0b0;
    margin-bottom: 5px;
}

.table {
    width: 100%;
}
</style>