<script setup>
import { showMes } from '@/utlis/notify';
import { updateSalary } from '@/api/empolyee'
const model = defineModel()
const prop = defineProps(['detailInfo'])

const isEdit = ref(false)
const handerSubmit = async (item) => {
    const isUpdate = await updateSalary(item)
    if (isUpdate?.data?.success) {
        showMes(isUpdate?.data?.mes, 'success')
    } else {
        showMes(isUpdate?.data?.mes, 'warning')
    }


    isEdit.value = false
}
const close = () => {
    model.value = false
    isEdit.value = false
}
</script>
<template>
    <el-drawer size="60%" direction="ttb" @close="close" v-model="model" title="详细信息" :direction="direction"
        :before-close="handleClose">
        <el-descriptions class="eldescriptions" title="个人信息" size="large" direction="vertical" :column="3" border>
            <el-descriptions-item label="员工号：">{{ detailInfo.id }}</el-descriptions-item>

            <el-descriptions-item label="照片">
                <el-avatar shape="square" style="width: 200px;height: 200px;" size="large"
                    :src="detailInfo.avatar"></el-avatar>
            </el-descriptions-item>

            <el-descriptions-item label="姓名：">{{ detailInfo.name }}</el-descriptions-item>

            <el-descriptions-item label="手机号：">{{ detailInfo.phoneNumber }}</el-descriptions-item>

            <el-descriptions-item label="性别：">{{ detailInfo.gender }}</el-descriptions-item>

            <el-descriptions-item label="薪资：">
                <template #default>
                    <span @click="isEdit = true" v-if="!isEdit">{{ detailInfo.salary }}</span>
                    <div class="updateSalary" v-else>
                        <el-input style="width: 100px;" v-model="detailInfo.salary"></el-input>
                        <el-button @click="handerSubmit({ id: detailInfo.id, salary: detailInfo.salary })"
                            type="primary">确定</el-button>
                    </div>
                </template>
            </el-descriptions-item>

            <el-descriptions-item label="身份证号：">{{ detailInfo.IDCard }}</el-descriptions-item>

            <el-descriptions-item label="出生日期:">{{ detailInfo.dateOfbirth.substring(0, 10)
                }}</el-descriptions-item>

            <el-descriptions-item label="名族：">{{ detailInfo.Clans }}</el-descriptions-item>

            <el-descriptions-item label="出生地：">{{ detailInfo.birthplace }}</el-descriptions-item>

            <el-descriptions-item label="籍贯：">{{ detailInfo.PlaceOfHouseholdRegistration
                }}</el-descriptions-item>

            <el-descriptions-item label="户籍类型：">{{ detailInfo.typeOfHouseholdRegistration
                }}</el-descriptions-item>

            <el-descriptions-item label="婚姻状态：">{{ detailInfo.MaritalStatus }}</el-descriptions-item>

            <el-descriptions-item label="政治面貌">{{ detailInfo.PoliticalOutlook }}</el-descriptions-item>

        </el-descriptions>

        <el-descriptions class="eldescriptions" title="职位详情" direction="vertical" :column="3" size="large" border>
            <el-descriptions-item label="部门">{{ detailInfo.dept }}</el-descriptions-item>

            <el-descriptions-item label="职位">{{ detailInfo.pos }}</el-descriptions-item>

            <el-descriptions-item label="入职时间">2024-4-9</el-descriptions-item>

            <el-descriptions-item label="是否在职">
                <p v-if="detailInfo?.isWork" class="state incumbency">在职</p>
                <p v-else class="state dimission">离职</p>
            </el-descriptions-item>
        </el-descriptions>

    </el-drawer>
</template>

<style lang='less' scoped>
.updateSalary {
    display: flex;
    justify-content: space-between;
}
</style>