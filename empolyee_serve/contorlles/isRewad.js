import {sql_addReward,sql_getReward,sql_delRewad} from '../database/isReward.js'
export const addReward = async (req,res,next)=>{
	const isAdd = await sql_addReward(req.body)
	if(isAdd === 0){
		res.cc({mes:'未找到该员工',success:false},200)
	}else if(isAdd){
		res.cc({mes:'添加成功',success:true},200)
	}else{
		res.cc({mes:'添加失败',success:false},200)
	}
}

export const getReward = async(req,res,next)=>{
	const isGet = await sql_getReward()
	res.cc({list:isGet,success:true},200)
}

export const delRewad = async (req,res,nect)=>{
	const isDel = await sql_delRewad(req.params.id)
	if(isDel){
		res.cc({mes:'删除成功',success:true},200)
	}else{
		res.cc({mes:'删除失败',success:false},200)
	}
}