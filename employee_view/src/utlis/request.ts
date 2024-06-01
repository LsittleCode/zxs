import axios from 'axios'
import router from '@/router/main'
import {useSysStore} from '@/store/sys'
const sysStore = useSysStore()
const instance = axios.create({
  baseURL: 'http://100.70.47.96/api',
  timeout: 1000
})

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    console.log(error)
    if(error?.response?.data?.data?.mes=== 'invalid token'){
      sysStore.updateToken('')
      router.push('/login')
    }
    return error?.response?.data
  }
)

instance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  },
  (error) => {
    return error
  }
)

export default instance
