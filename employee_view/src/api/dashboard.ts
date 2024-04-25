import instance from '@/utlis/request'

export const getdata = () => {
  return instance({
    url: '/dashboard'
  })
}

export const bindID = (id) => {
  return instance({
    url: `/dashboard/${id}`
  })
}
