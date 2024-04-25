import {sql_getDatas,sql_bindID} from '../database/dashboard.js'
import {verifyToken} from '../plugin/jwt.js'


export const getDatas = async(req,res,next)=>{
	const datas = await sql_getDatas()
	res.cc({list:datas,success:true},200)
}

export const bindID = async (req,res,next)=>{
	const info = await verifyToken(req.get('Authorization').substring(7))
	const isBind = await sql_bindID(info.text,req.params.id)
	if(isBind==0){
		res.cc({mes:'你已绑定',success:false},200)
	}else if(isBind==1){
		res.cc({mes:'已被绑定',success:false},200)
	}else if(isBind==2){
		res.cc({mes:'ID不存在，请检查ID',success:false},200)
	}else if(isBind==3){
		res.cc({mes:'绑定成功',success:true},200)
	}
}