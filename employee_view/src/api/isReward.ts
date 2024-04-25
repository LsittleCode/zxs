import instance from '@/utlis/request'

export const addReward = (data) => {
  return instance({
    url: '/isReward',
    method: 'post',
    data
  })
}

export const getList = () => {
  return instance({
    url: '/isReward'
  })
}

export const delRewad = (id) => {
  return instance({
    url: `/isReward/${id}`,
    method: 'delete'
  })
}
