import { showMes } from '@/utlis/notify'
import { login } from '@/api/login.ts'
import { useSysStore } from '@/store/sys.js'
const sysStore = useSysStore()
// 表单数据
const formData = ref({
  user: 'zxs' as string,
  password: '123456' as string
})

const formRules = {
  user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const form = ref(null) as any
const submit = () => {
  form.value.validate(async (isValid) => {
    if (!isValid) {
      return
    } else {
      const res = await login(formData.value.user, formData.value.password)
      if (res.data.success) {
        sysStore.updateToken(res.data.token)
        showMes(res.data.mes, 'success')
        setTimeout(() => {
          location.href = '/'
        }, 500)
      } else {
        showMes(res.data.mes, 'warning')
      }
    }
  })
}

// 图片微动
const mouseMoveBackgrounp = (container) => {
  container.value.addEventListener('mousemove', (e) => {
    let x = -e.pageX / 50
    let y = -e.pageY / 50
    container.value.style.backgroundPosition = `${x}px ${y}px`
  })
}
export { mouseMoveBackgrounp, formData, formRules, submit, form }
