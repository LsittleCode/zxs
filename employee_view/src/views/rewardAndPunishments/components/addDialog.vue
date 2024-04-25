<script setup lang="ts">
import { getTargetEmpolyee } from '@/api/empolyee'
import { addReward } from '@/api/isReward'
import { showMes } from '@/utlis/notify'

const props = defineProps(['isShow'])
const emit = defineEmits(['update', 'getRewardList'])

const rewardInfo = ref({
    empolyeeId: '',
    addDescription: '',
    isReward: 1,
    money: 0
})

const uname = ref({
    name: '',
    pos: ''
})

const closeWin = () => {
    rewardInfo.value = {
        empolyeeId: '',
        addDescription: '',
        isReward: 1,
        money: 0
    }
    uname.value = {
        name: '',
        pos: ''
    }
    emit('getRewardList')
    emit('update:isShow' as any, false)
}
const handerChange = async () => {
    const { data: { mes } } = await getTargetEmpolyee(rewardInfo.value.empolyeeId)
    uname.value = mes
}
const handerReward = async () => {
    if (rewardInfo.value.empolyeeId == '' || rewardInfo.value.addDescription == '') {
        return
    }
    const isAdd = await addReward(rewardInfo.value)
    if (isAdd?.data?.success) {
        showMes(isAdd?.data?.mes, 'success', 1000)
    }



    closeWin()

}

</script>

<template>
    <el-dialog v-model="props.isShow" @close="closeWin" title="添加" width="50%">
        <el-form class="form" label-width="100px">
            <el-form-item label="员工编号 ：">
                <el-input @change="handerChange" v-model="rewardInfo.empolyeeId"></el-input>
                <span v-show="uname?.name">{{ uname?.pos }}-{{ uname?.name }}</span>
            </el-form-item>

            <el-form-item label="状态 ：">
                <el-switch style="--el-switch-on-color:#ff4949; --el-switch-off-color:#13ce66" :active-value="0"
                    :inactive-value="1" v-model="rewardInfo.isReward" inactive-text="奖金" active-text="扣款"
                    inline-prompt></el-switch>
            </el-form-item>
            <el-form-item label="描述 ：">
                <el-input v-model="rewardInfo.addDescription"></el-input>
            </el-form-item>

            <el-form-item label="金额 ：">
                <el-input v-model="rewardInfo.money"></el-input>
            </el-form-item>
            <el-button @click="handerReward" style="margin: 0 auto;" type="primary">提交</el-button>
        </el-form>

    </el-dialog>
</template>
<style lang='less' scoped>
.form {
    display: flex;
    flex-direction: column;

    flex-wrap: wrap;
}
</style>