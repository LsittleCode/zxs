import query from './index.js'
import {craeteHash,hashCompare} from '../plugin/crypto.js'

export const sql_login = async (user,password)=>{
	const isExist = await query('select user from user where user=?',[user])
	if(isExist.length === 0) return 0
	const [{pwd}] = await query('select password as pwd from user where user=?',[user])
	
	const isRight = await hashCompare(password,pwd)
	return isRight
}


export const sql_regist = async (user,password)=>{
	// 是否同名
	const isExist = await query('select user from user where user=?',[user])
	if(isExist.length !=0 )return 0
	
	password = craeteHash(password)
	const res = await query('insert into user(user,password) values(?,?)',[user,password])
	if(res.affectedRows===1){
		return true
	}else{
		return false
	}
}

export const sql_getInfo = async (user)=>{
	const info = await query(`select e.name,e.avatar from user u join empolyee e on u.id=e.id where u.user='${user}'`)
	return info[0]
}

