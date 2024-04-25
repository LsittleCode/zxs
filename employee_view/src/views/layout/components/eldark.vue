<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = ref<boolean>(false)
isDark.value = localStorage.getItem('vueuse-color-scheme') === 'dark' ? true : false
const handerChange: any = useToggle(useDark())
</script>
<template>
    <el-switch size="large" @change="handerChange" v-model="isDark">
        <template #active-action>
            <el-icon>
                <MoonNight />
            </el-icon></template>
        <template #inactive-action>
            <el-icon>
                <Sunny />
            </el-icon></template>
    </el-switch>
</template>

<style lang='less' scoped></style>