import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1',
  timeout: 1000
})

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
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
