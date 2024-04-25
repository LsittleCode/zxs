import query from './index.js'

export const selectDepartment = async ()=>{
	const department = await query('select * from department')
	return department
}

export const addDepartment = async ({pid,DepartmentName})=>{
	const isAdd = await query(`insert into department(pid,DepartmentName) values(?,?)`,[pid,DepartmentName])
	if(isAdd.affectedRows===1){
		return true
	}else{
		return false
	}
}


export const delpartment = async (departmentID)=>{
	const isDel = await query(`delete from department where departmentID=${departmentID} or pid=${departmentID}`)
	console.log(isDel);
}