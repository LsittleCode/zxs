import {sql_addEmpolyee,sql_getEmpolyee,sql_getTargetEmpolyee,sql_updateSalary} from '../database/empolyee.js'
export const addEmpolyee = async(req,res,next)=>{
	const isAdd = await sql_addEmpolyee(req.body)
	if(isAdd === 0){
		res.cc({mes:"已存在",success:false},200)
	}else if(isAdd === true){
		res.cc({mes:"添加成功",success:true},200)
	}else{
		res.cc({mes:"添加失败",success:true},200)
	}
}


export const getEmpolyee = async(req,res,next)=>{
	const select_emp = await sql_getEmpolyee(req.query)
	res.cc({mes:select_emp,success:true},200)
}

export const getTargetEmpolyee = async(req,res,next)=>{
	const emp = await sql_getTargetEmpolyee(req.params)
	res.cc({mes:emp,success:true},200)
}

export const updateSalary = async(req,res,enxt)=>{
	const isUpdate = await sql_updateSalary(req.body)
	if(isUpdate){
		res.cc({mes:'更新成功',success:true},200)
	}else{
		res.cc({mes:'更新失败',success:true},200)
	}
}