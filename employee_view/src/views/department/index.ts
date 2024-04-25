import { getDepartment, addDepartment, delDepartment } from '@/api/department'
import { listToTree } from '@/utlis/index'
import { showMes } from '@/utlis/notify'
let departmentData = ref(null)
const receiveDepartment = async () => {
  const department = await getDepartment()
  departmentData.value = listToTree(department.data, 0)
}

const isShow = ref(false)
const getDepartmentInfo = ref({
  departmentID: '',
  pid: ''
})
const showDialog = ({ departmentID, pid }) => {
  getDepartmentInfo.value = { departmentID, pid }
  isShow.value = true
  console.log(getDepartmentInfo.value)
}

const confirmInfo = ref({
  pid: '',
  DepartmentName: ''
})
const confirAdd = async () => {
  if (confirmInfo.value.DepartmentName == '' || confirmInfo.value.pid == '') {
    return showMes('请填写完整', 'warning', 1000)
  }
  const isAdd = await addDepartment(confirmInfo.value)
  if (isAdd?.data?.success) {
    showMes('添加成功', 'success', 1000)
    receiveDepartment()
    isShow.value = false
  } else {
    showMes('添加失败', 'warning', 1000)
  }
  confirmInfo.value = { pid: '', DepartmentName: '' }
}

const del_department = async ({ departmentID }) => {
  const isDel = await delDepartment(departmentID)
  console.log(isDel)
}
export {
  del_department,
  getDepartmentInfo,
  receiveDepartment,
  isShow,
  showDialog,
  confirmInfo,
  confirAdd,
  departmentData
}
