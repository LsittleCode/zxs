import {sql_regist,sql_login,sql_getInfo} from '../database/user.js'
import {createToken,verifyToken} from '../plugin/jwt.js'



export const login = async (req,res,next)=>{
	const {user,password} = req.body
	const isLogin = await sql_login(user,password)
	
	if(isLogin === 0){
		res.cc({mes:"未找到该用户，请检查",success:false},400)
	}else if(isLogin){
		res.cc({mes:"登陆成功",token:`bearer ${await createToken(user)}`,success:true},200)
	}else{
		res.cc({mes:"密码错误，请检查",success:false},400)
	}
}

export const regist = async (req,res,next)=>{
	const {user,password} = req.body
	const isRegist = await sql_regist(user,password)
	console.log(isRegist);
	if(isRegist === 0){
		res.cc({mes:"用户名已被注册",success:false},403)
	}else if(isRegist === true){
		res.cc({mes:"注册成功",success:true},200)
	}
	else{
		res.cc({mes:"请联系管理员",success:fasle},403)
	}
}

export const getInfo = async (req,res,next)=>{
	const tokenInfo = await verifyToken(req.get('Authorization').substring(7))
	const info = await sql_getInfo(tokenInfo.text)
	res.cc({mes:info,success:true},200)
}
