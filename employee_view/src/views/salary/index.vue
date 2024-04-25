<script setup>
import { generateData, getSalayList } from '@/api/salary'
import { showMes } from '@/utlis/notify'

const handerGenerate = async () => {
    const isGenerate = await generateData()
    if (isGenerate?.data?.success) {
        showMes(isGenerate?.data?.mes, 'success')
    } else {
        showMes(isGenerate?.data?.mes, 'warning')
    }

    getList()
}


const tableData = ref(null)
const getList = async () => {
    const res = await getSalayList()
    tableData.value = res?.data?.salaryList
}
getList()
</script>
<template>
    <el-button style="position: sticky;" type="primary" @click="handerGenerate">生成当月数据</el-button>
    <span style="font-size: 13px;padding-left: 15px; color:rgb(155, 126, 156)">tips:每天只能生成一次</span>

    <el-table :data="tableData">
        <el-table-column prop="date" label="发放时间"></el-table-column>
        <el-table-column prop="id" label="员工编号"></el-table-column>
        <el-table-column label="照片">
            <template #default="{ row }">
                <el-avatar shape="square" style="width: 100px; height: 100px;" :src="row.avatar"></el-avatar>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="pos" label="职位"></el-table-column>
        <el-table-column prop="salary" label="底薪"></el-table-column>
        <el-table-column prop="rwd" label="奖金"></el-table-column>
        <el-table-column prop="pmt" label="扣款"></el-table-column>
        <el-table-column prop="total" label="总金额"></el-table-column>
    </el-table>
</template>

<style lang='less' scoped></style>