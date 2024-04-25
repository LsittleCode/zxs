import instance from '@/utlis/request'

export const login = (user, password) => {
  return instance({
    url: '/user/login',
    method: 'post',
    data: {
      user,
      password
    }
  })
}
