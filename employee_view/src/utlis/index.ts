export const listToTree = (list, pid) => {
  const arr = [] as any
  list.forEach((item) => {
    if (item.pid === pid) {
      arr.push(item)
      const children = listToTree(list, item.departmentID)
      if (children.length) item.children = children
    }
  })
  return arr
}
