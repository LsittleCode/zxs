import instance from '@/utlis/request'

export const addEmpolyee = (data) => {
  return instance({
    url: '/empolyee',
    method: 'post',
    data
  })
}

export const getEmpolyee = (params) => {
  return instance({
    url: '/empolyee',
    params
  })
}

export const getTargetEmpolyee = (id) => {
  return instance({
    url: `/empolyee/${id}`
  })
}

export const updateSalary = (item) => {
  return instance({
    url: `/empolyee/salary`,
    method: 'put',
    data: item
  })
}
