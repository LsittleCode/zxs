import query from './index.js'


export const sql_generateDate = async (timeStr)=>{
	const isExist = await query(`select count(*) as count from salary where date='${timeStr}'`)
	if(isExist[0].count>0){
		await query(`delete from salary where date='${timeStr}'`)
	}
	
	const emInfo = await query(`SELECT e.id,e.name,e.depID,e.salary,
	SUM(CASE WHEN r.isReward=0 THEN r.money ELSE 0 END) AS pmt,
	SUM(CASE WHEN r.isReward=1 THEN r.money ELSE 0 END) AS rwd
	from empolyee e JOIN reward_punishments r ON e.id=r.emID GROUP BY e.id,e.name`)
	
	emInfo.forEach( async(item)=>{
		const saveToDateBase = await query(`insert into salary values(?,?,?,?,?,?)`,[item.id,timeStr,item.name,(Number(item.salary)+item.rwd-item.pmt),item.rwd,item.pmt])
	})
	return true
}


export const sql_getSalaryList = async ()=>{
	const list = await query(`SELECT s.*,e.pos,e.avatar FROM salary s JOIN empolyee e ON s.id=e.id`)
	return list
}