<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSysStore } from '@/store/sys.js'
import { ArrowRight } from '@element-plus/icons-vue'
import { useBreadStore } from '@/store/bread'
const sysStore = useSysStore()
const router = useRouter()
const breadStore = useBreadStore()
// 删除指定页面  跳转到最后一个breadStore.breadList的path
const handerClose = (item: string) => {
    breadStore.delBread(item)
    if (breadStore.breadList.length > 0) {
        router.push(breadStore.breadList[breadStore.breadList.length - 1].path)
    } else {
        router.push('/')
    }
}
</script>
<template>
    <div class="bread-container">
        <el-icon @click="sysStore.updateCollapse" class="isCollapse" :size="20">
            <Grid />
        </el-icon>
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item class="breadCrumb" v-for="(item, index) in breadStore.breadList">
                <template #default>
                    <span :class="[$route.path == item.path ? 'active' : '']" @click="$router.push(item.path)">{{
                        item.name }}</span>
                    <el-icon class="close-bt" @click="handerClose(item.path)">
                        <Close />
                    </el-icon>
                </template>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<style lang='less' scoped>
.bread-container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #e3e0e0;
    gap: 15px;

    .isCollapse {
        cursor: pointer;
    }

    .el-breadcrumb {
        font-size: 13px;
    }

    .breadCrumb {
        animation: breadEnter .4s ease;
        position: relative;
        cursor: pointer;

        &:hover .close-bt {
            opacity: 1;
            top: -18px;
            left: 0%;
        }

        .close-bt {
            position: absolute;
            font-size: 15px;
            top: 0;
            left: 0%;
            opacity: 0;
            transition: all .3s;
        }
    }


}


.active {
    color: #409eff;
}


.breadMove {
    animation: breadLeave .2s linear;
}

@keyframes breadEnter {
    from {
        transform: translateX(-50%);
    }

    to {
        transform: translateX(0%);
    }
}

@keyframes breadLeave {
    from {
        transform: translateX(0%);
    }

    to {
        transform: translateX(-50%);
    }
}
</style>