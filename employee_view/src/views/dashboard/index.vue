<script setup lang="ts">
import { getdata } from '@/api/dashboard'
import echart from '@/components/echart.vue'
import { useTransition } from '@vueuse/core'
const peopleNum = ref(0)
const outputValue = useTransition(peopleNum, {
    duration: 1000
})



const listData = ref(null as any)
const getData = async () => {
    const { data: { list } } = await getdata()
    listData.value = list
    console.log(listData.value);


    peopleNum.value = list?.employee[0]?.pepNum
}
getData()

</script>
<template>
    <div class="dashboard_header">
        <el-calendar style="height: 320px;"></el-calendar>
        <div class="card_item">
            <el-card header="员工人数" class="peopleNum">
                <el-statistic :value="outputValue"></el-statistic>
            </el-card>

            <el-card>
                <echart v-if="listData?.departmentCategory" title="部门分布" :data="listData?.departmentCategory" />
            </el-card>

            <el-card>
                <echart v-if="listData?.posCateGory" title="职位分布" :data="listData?.posCateGory" />
            </el-card>

            <el-card>
                <echart v-if="listData?.placeCateGory" title="地区分布" :data="listData?.placeCateGory" />
            </el-card>


        </div>
    </div>
</template>
<style lang='less' scoped>
.dashboard_header {
    /deep/.el-calendar-table .el-calendar-day {
        height: 35px;
    }

    .peopleNum {
        /deep/.el-statistic__number {
            font-size: 5vw;
            text-align: center;
            display: block;
        }
    }

    .card_item {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(310px, 350px));
        justify-content: space-around;
        gap: 25px;
        margin-top: 25px;
    }
}
</style>