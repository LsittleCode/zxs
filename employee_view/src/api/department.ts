import instance from '@/utlis/request'

export const getDepartment = () => {
  return instance({
    url: '/department'
  })
}

export const addDepartment = (data) => {
  return instance({
    url: '/department',
    method: 'put',
    data
  })
}

export const delDepartment = (departmentID) => {
  return instance({
    url: `/department/${departmentID}`,
    method: 'delete'
  })
}
