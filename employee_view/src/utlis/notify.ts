import { ElNotification } from 'element-plus'
import 'element-plus/theme-chalk/el-notification.css'

export const showMes = (message, type, duration = 500) => {
  return ElNotification({
    message,
    type,
    duration
  })
}
