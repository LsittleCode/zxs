import query from './index.js'
import generateEmployeeID from '../plugin/generateEmpolyeeID.js'
export const sql_addEmpolyee = async(item)=>{
	let qs = `select count(IDCard) as isExist from empolyee where IDCard='${item.IDCard}'`
	const [{isExist}] = await query(qs)
	if(isExist != 0){
		return 0
	}
	const id = `${item.depId<10?'0'+item.depId:item.depId}${generateEmployeeID()}`
	const dataArr = [id,...Object.values(item)]
	 qs = `insert into empolyee values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
	const isAdd = await query(qs,dataArr)
	if(isAdd.affectedRows === 1) {
		return true
	}else{
		return false
	}
}


export const sql_getEmpolyee = async(item)=>{
	let {departmentID,empolyeeName} = item
	if(!departmentID) departmentID=null
	  let qs = `select e.*,d.DepartmentName as dept from empolyee e join department d on e.depId=departmentID
	  where
	  (${departmentID} IS NULL OR depId=${departmentID})
	  and
	  (name like '${empolyeeName}%')
	  `;
	 const select_res = await query(qs)
	 return select_res

}


export const sql_getTargetEmpolyee = async(item)=>{
	const [em] = await query(`select name,pos from empolyee where id=${item.id}`)
	return em
	
}


export const sql_updateSalary = async({id,salary})=>{
	const isUpdate = await query(`update empolyee SET salary=${salary} where id=${id}`)
	if(isUpdate.affectedRows === 1){
		return true
	}else{
		return false
	}
}