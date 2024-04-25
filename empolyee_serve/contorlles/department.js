import {selectDepartment,addDepartment,delpartment} from '../database/department.js'

export const getDepartment = async (req,res,next)=>{
	const department = await selectDepartment()
	res.cc(department,200)
}

export const addDept = async (req,res,next)=>{
	if(req.body?.pid=='' || req.body?.DepartmentName==''){
	   res.cc({mes:'请检查参数',success:false},200)
	}
	const isAdd = await addDepartment(req.body)
	if(isAdd){
		 res.cc({mes:'添加成功',success:true},200)
	}else{
		 res.cc({mes:'添加失败',success:false},200)
	}
}
export const delDept = async (req,res,next)=>{
	if(req.params?.departmentID == ''){
		res.cc({mes:'请检查参数',success:false},200)
	}
	
	const isDel = await delpartment(req.params?.departmentID)
}