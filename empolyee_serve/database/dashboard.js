import query from './index.js'

export const sql_getDatas = async ()=>{
	const employee = await query(`select count(*) as pepNum from empolyee`)
	const departmentCategory = await query(`select count(e.depID) value,d.DepartmentName as name from empolyee e join department d on e.depId=d.departmentID group by e.depID`)
	const posCateGory = await query(`select count(pos) as value,pos as name from empolyee group by pos`)
	const placeCateGory = await query(`select count(birthplace) as value,birthplace as name from empolyee group by birthplace`)
	return {employee,departmentCategory,posCateGory,placeCateGory}
}



export const sql_bindID = async (user,id)=>{
	const [{isIDNull}] = await query(`select id as isIDNull from user where user='${user}'`)
	console.log(isIDNull);
	if(isIDNull) return 0  //你已绑定ID
	
	const isexist = await query(`select id as isExist from user where id='${id}'`)
	if(isexist.length != 0) return 1 //已被绑定
	
	const isHaveEmID = await query(`select id from empolyee where id='${id}'`)
	if(isHaveEmID.length == 0) return 2 //emID不存在
	
	const bin = await query(`update user set id='${id}' where user='${user}'`)
	return 3
}