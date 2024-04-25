import instance from '@/utlis/request'

export const generateData = () => {
  return instance({
    url: '/salary/generateData'
  })
}

export const getSalayList = () => {
  return instance({
    url: '/salary'
  })
}
