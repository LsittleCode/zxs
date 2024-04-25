import query from './index.js'
export const sql_addReward = async ({  empolyeeId, addDescription,isReward,money})=>{
	const isExist = await query(`select id,depId,name from empolyee where id=${empolyeeId}`)
	if(isExist.length==0) return 0
	
	const add = await query('insert into reward_punishments(emID,description,money,isReward,deptId,name) values(?,?,?,?,?,?)',[empolyeeId,addDescription,money,isReward,isExist[0].depId,isExist[0].name])
	if(add.affectedRows == 1){
		return true
	}else{
		return false
	}
}



export const sql_getReward = async ()=>{
	const rewardList = await query(`select r.*,d.DepartmentName from  reward_punishments r  join department d  on deptId=departmentID`)
	return rewardList
}


export const sql_delRewad  = async (id)=>{
	const delTarge = await query(`delete from reward_punishments where id=${id}`)
	if(delTarge.affectedRows === 1){
		return true
	}else{
		return false
	}
}