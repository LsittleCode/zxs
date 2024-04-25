<script setup lang="ts">
import * as echarts from 'echarts';
const props = defineProps(['title', 'data'])
const option = ref({
    title: {
        text: props.title,
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: props.title,
            type: 'pie',
            radius: '60%',
            data: props.data,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})

const box = ref(null)
onMounted(() => {
    var myChart = echarts.init(box.value)
    myChart.setOption(option.value)
})
</script>
<template>
    <div class="echart-box" ref="box">

    </div>
</template>
<style lang='less' scoped>
.echart-box {
    max-width: 320px;
    height: 320px;
}
</style>