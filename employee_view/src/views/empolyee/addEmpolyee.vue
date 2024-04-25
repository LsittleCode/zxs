<script setup>
import { showMes } from '@/utlis/notify'
import { getDepartment } from '@/api/department'
import uploadImg from '@/components/uploadImg.vue'
import { addEmpolyee } from '@/api/empolyee'
const prop = defineProps(['isShow'])
const emit = defineEmits(['update'])
const closeWin = () => {
    emit('update:isShow', false)
}

const empolyeeInfo = ref({
    name: import.meta.env.DEV ? 'test' : '',
    age: 0,
    gender: import.meta.env.DEV ? '男' : '',
    IDCard: import.meta.env.DEV ? '622701200003103434' : '',
    dateOfbirth: '',
    phoneNumber: import.meta.env.DEV ? '17609339575' : '',
    depId: '',
    pos: import.meta.env.DEV ? 'web前端' : '',
    salary: 0,
    Clans: import.meta.env.DEV ? '汉族' : '',
    MaritalStatus: '已婚',
    PlaceOfHouseholdRegistration: import.meta.env.DEV ? '崆峒' : '',
    PoliticalOutlook: import.meta.env.DEV ? '群众' : '',
    birthplace: import.meta.env.DEV ? '甘肃平凉' : '',
    dateOfWork: new Date().toISOString(),
    degree: '本科',
    avatar: import.meta.env.DEV ? 'test' : '',
    graduateSchool: '兰州博文科技学院',
    typeOfHouseholdRegistration: import.meta.env.DEV ? '农村' : '',
    major: '信息管理与信息系统',
})

watch(() => empolyeeInfo.value.IDCard, (n, o) => {
    if (n.length >= 18) {
        const newDate = empolyeeInfo.value.IDCard.substring(6, 14)
        const year = newDate.substring(0, 4)
        const time = year + '-' + (newDate.substring(4).substring(0, 2).concat('-', newDate.substring(4).substring(2)))
        const targetTime = new Date(time).toISOString()
        empolyeeInfo.value.dateOfbirth = targetTime
    }
}, {
    immediate: true
})

const form = ref(null)
const confirmInfo = () => {
    form.value.validate(async (isOk) => {
        if (isOk) {
            const isAdd = await addEmpolyee(empolyeeInfo.value)
            if (isAdd.data?.success) {
                showMes('添加成功', 'success')
                closeWin()
            } else {
                showMes(isAdd.data?.mes, 'warning')
            }
        }
    })
}

const rule = {
    avatar: [
        {
            required: true,
            trigger: 'blur'
        },
        {
            pattern: /^http:\/\//,
            trigger: 'blur',
            message: "请上传照片"
        }
    ],
    name: [
        {
            required: true,
            trigger: 'blur'
        }
    ],
    gender: [
        {
            required: true,

        }
    ],
    phoneNumber: [
        {
            required: true,
            message: '请填写手机号',
            trigger: 'blur'
        },
        {
            pattern: /^1[3-9][0-9]{9}$/,
            message: '请填写正确的手机号',
            trigger: 'blur'
        }
    ],
    id: [
        {
            required: true,
        }
    ],
    pos: [
        {
            required: true,
            message: '请填具体岗位',
        }
    ],
    dateOfbirth: [
        {
            required: true,
        }
    ],
    IDCard: [
        {
            required: true,
            message: '输入身份证号',
            trigger: 'blur'
        }, {
            pattern: /^\d{15,18}/,
            message: '输入正确身份证号',
            trigger: 'blur'
        }
    ],
    birthplace: [{
        required: true
    }],
    PlaceOfHouseholdRegistration: [
        {
            required: true
        }
    ],
    typeOfHouseholdRegistration: [
        {
            required: true
        }
    ],
    Clans: [{
        required: true
    }],
    MaritalStatus: [{
        required: true
    }],
    PoliticalOutlook: [{
        required: true
    }],
    dateOfWork: [{
        required: true
    }],
    degree: [{
        required: true
    }],
    graduateSchool: [{
        required: true
    }],
    major: [{
        required: true
    }]
}


const dep = ref(null)
onMounted(async () => {
    const department = await getDepartment()
    dep.value = department.data
})
</script>
<template>
    <el-dialog v-model="prop.isShow" @close="closeWin" width="80%">
        <el-form class="form" :rules="rule" hide-required-asterisk ref="form" :model="empolyeeInfo">
            <el-form-item label="头像:" prop="avatar">
                <uploadImg v-model:avatarSrc="empolyeeInfo.avatar"></uploadImg>
            </el-form-item>

            <el-form-item label="工号:">
                <el-input placeholder="自动生成" disabled></el-input>
            </el-form-item>

            <el-form-item prop="name" label="姓名:">
                <el-input v-model="empolyeeInfo.name"></el-input>
            </el-form-item>

            <el-form-item prop="gender" label="性别:">
                <el-select placeholder="" v-model="empolyeeInfo.gender">
                    <el-option label="男" value="男" </el-option>
                        <el-option label="女" value="女" </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="phoneNumber" label="手机号:">
                <el-input v-model="empolyeeInfo.phoneNumber"></el-input>
            </el-form-item>

            <el-form-item prop="depId" label="部门:">
                <el-select placeholder="选择部门" v-model="empolyeeInfo.depId">
                    <el-option v-for="(item, index) in dep" :disabled="item.departmentID == 1"
                        :value="item.departmentID" key="item.departmentID" :label="item.DepartmentName"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="pos" label="岗位:">
                <el-input v-model="empolyeeInfo.pos"></el-input>
            </el-form-item>

            <el-form-item label="薪资:">
                <el-input v-model="empolyeeInfo.salary"></el-input>
            </el-form-item>

            <el-form-item prop="dateOfbirth" label="出生日期:">
                <el-date-picker value-format="YYYY-MM-DD" v-model="empolyeeInfo.dateOfbirth" type="Date"
                    placeholder="出生日期" :size="size" />
            </el-form-item>

            <el-form-item prop="IDCard" label="身份证号:">
                <el-input v-model="empolyeeInfo.IDCard"></el-input>
            </el-form-item>

            <el-form-item prop="birthplace" label="籍贯:">
                <el-input v-model="empolyeeInfo.birthplace"></el-input>
            </el-form-item>

            <el-form-item label="户籍所在地:" prop="PlaceOfHouseholdRegistration">
                <el-input v-model="empolyeeInfo.PlaceOfHouseholdRegistration"></el-input>
            </el-form-item>

            <el-form-item prop="typeOfHouseholdRegistration" label="户籍类型:">
                <el-select placeholder="" v-model="empolyeeInfo.typeOfHouseholdRegistration">
                    <el-option label="城镇" value="城镇" </el-option>
                        <el-option label="农村" value="农村"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="Clans" label="名族:">
                <el-input v-model="empolyeeInfo.Clans"></el-input>
            </el-form-item>

            <el-form-item prop="MaritalStatus" label="婚姻状态:">
                <el-select placeholder="" v-model="empolyeeInfo.MaritalStatus">
                    <el-option label="未婚" value="未婚" </el-option>
                        <el-option label="已婚" value="已婚"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="PoliticalOutlook" label="政治面貌:">
                <el-select placeholder="选择政治面貌" v-model="empolyeeInfo.PoliticalOutlook">
                    <el-option label="中国党员" value="中国党员" </el-option>
                        <el-option label="共青团员" value="共青团员"></el-option>
                        <el-option label="群众" value="群众"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="dateOfWork" label="入职时间:">
                <el-date-picker disabled value-format="YYYY-MM-DD" v-model="empolyeeInfo.dateOfWork" type="Date"
                    placeholder="出生日期" :size="size" />
            </el-form-item>

            <el-form-item prop="degree" label="最高学历:">
                <el-input v-model="empolyeeInfo.degree"></el-input>
            </el-form-item>

            <el-form-item prop="graduateSchool" label="毕业院校:">
                <el-input v-model="empolyeeInfo.graduateSchool"></el-input>
            </el-form-item>

            <el-form-item prop="major" label="所学专业:">
                <el-input v-model="empolyeeInfo.major"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="confirmInfo" type="success">添加</el-button>
        </template>
    </el-dialog>
</template>
<style lang='less' scoped>
.form {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 300px));
    gap: 15px;
    max-height: 70vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0;
    }
}
</style>