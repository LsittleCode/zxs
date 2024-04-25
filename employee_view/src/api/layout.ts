import instance from '@/utlis/request'

export const userInfo = () => {
  return instance({
    url: '/user'
  })
}
