<script setup>
const props = defineProps(['data'])

</script>
<template>
    <el-card>
        <el-avatar shape="square" style="width: 120px;height: 120px;" :src="data.avatar"></el-avatar>
        <span>{{ data.id }}</span>

        <span>姓名：{{ data.name }}-{{ data.gender }}</span>

        <span>部门： {{ data.dept }}-{{ data.pos }}</span>

        <span>入职时间：{{ data.dateOfWork.substring(0, 10) }}</span>

        <span>手机号：{{ data.phoneNumber }}</span>

    </el-card>
</template>

<style lang='less' scoped>
.el-card {
    border-radius: 10px;
    font-size: 16px;
    transition: all .2s;
    margin: 15px;

    &:hover {
        transform: scale(1.08);
    }
}

/deep/.el-card__body {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .el-avatar {
        margin: 0 auto;
        width: 100px;
        height: 100px;
    }
}
</style>