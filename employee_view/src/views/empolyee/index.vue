<script setup>
import empolyeeCard from './component/empolyeeCard.vue'
import addEmpolyee from './addEmpolyee.vue'
import { getEmpolyee } from '@/api/empolyee'
import myDrawer from '@/components/drawer.vue'

// 详细信息模态框
const showDrawer = ref(false)
const detailInfo = ref(null)
const handerDrawer = (item) => {
    showDrawer.value = true
    detailInfo.value = item
}


// 两种显示
const radio = ref(0)
const isShow = ref(false)
import { getDepartment } from '@/api/department'
// 获取部门
const dept = ref(null)
const getDept = async () => {
    const data = await getDepartment()
    dept.value = data.data
}
getDept()


// 搜索
const selectGroup = ref({
    departmentID: '',
    empolyeeName: ''
})

// 获取员工列表
const emList = ref(null)
const getEm = async () => {
    const res_emList = await getEmpolyee(selectGroup.value)
    emList.value = res_emList.data.mes
}
getEm()


const handlerSearch = () => {
    getEm()
}
</script>
<template>
    <div class="empolyee_opeartion_header">
        <el-button type="primary" size="small" @click="isShow = true">新增</el-button>
        <div class="category">
            <el-radio-group v-model="radio" text-color="#333">
                <el-radio :value="0">表格</el-radio>
                <el-radio :value="1">卡片</el-radio>
            </el-radio-group>
        </div>
        <div class="selectionBar">
            <div class="selectionItems deparment">
                <label class="title">部门:</label>
                <el-select class="departmentName" clearable v-model="selectGroup.departmentID">
                    <el-option v-for="(item, index) in dept" :value="item.departmentID"
                        :label="item.DepartmentName"></el-option>
                </el-select>
            </div>

            <div class="selectionItems searchName">
                <label class="title" for="userName">姓名:</label>
                <el-input :disabled="userStore?.user?.sup == 0" v-model="selectGroup.empolyeeName"
                    id="userName"></el-input>
            </div>
            <el-button @click="handlerSearch" class="submit" type="primary">搜索</el-button>
        </div>

    </div>
    <transition name="el-fade-in-linear">
        <el-table v-if="radio == 0" :data="emList" style="background: transparent;" border>
            <template #empty>当-前-无-数-据</template>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="照片">
                <template #default="{ row }">
                    <el-avatar shape="square" :src="row.avatar" style="width: 100px;height: 100px;"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="工号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
            <el-table-column prop="dept" label="部门"></el-table-column>
            <el-table-column prop="pos" label="职位"></el-table-column>
            <el-table-column sortable prop="salary" label="薪资"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button @click="handerDrawer(row)" type="success">详细信息</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="cardInfo" v-else>
            <empolyeeCard @click="handerDrawer(item)" v-for="(item, index) in emList" :data="item"></empolyeeCard>
        </div>
    </transition>

    <addEmpolyee v-model:isShow="isShow"></addEmpolyee>


    <myDrawer v-model="showDrawer" :detailInfo="detailInfo" />
</template>

<style lang='less' scoped>
.empolyee_opeartion_header {
    padding-left: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
}

/deep/.el-radio__input.is-checked .el-radio__inner {
    background: #5cf499;
    border-color: rgb(87, 133, 223);
}

/deep/.el-radio__input.is-checked+.el-radio__label {
    color: #5cf4ec;
    text-shadow: #5cf499 0 1px 1px;
}

.el-table__header-wrapper .el-table__header {
    width: 100% !important;
}

.cardInfo {
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: repeat(auto-fill, minmax(260px, 300px));
}

.selectionBar {
    flex: 1;
    padding: 10px 1vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 280px));

    .selectionItems {
        display: flex;
        align-items: center;
        padding: 10px;

        .title {
            white-space: nowrap;
            min-width: 50px;
            padding: 0 10px;
            font-size: 18px;
            color: #c8cfce;
        }
    }

    .submit {
        width: 150px;
        margin: 9px auto;
    }
}
</style>