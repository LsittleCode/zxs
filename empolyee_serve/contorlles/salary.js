import {sql_generateDate,sql_getSalaryList} from '../database/salary.js'

export const generateData = async (req,res,next)=>{
	const currentTime = new Date()
	const currenYear = currentTime.getFullYear()
	const currentMonth = currentTime.getMonth()+1
	const currentDate = currentTime.getDate()
	
	const startTime = new Date(`${currenYear}-${currentMonth}-1`).toLocaleDateString()
	const endTime = new Date(`${currenYear}-${currentMonth}-${currentDate}`).toLocaleDateString()
	const timeStr = `${startTime}-${endTime}`
	const isGendrate = await sql_generateDate(timeStr)
	res.cc({mes:'执行成功',success:true},200)
}



export const getSalaryList = async (req,res,next)=>{
	const salaryList = await sql_getSalaryList()
	res.cc({salaryList,success:true},200)
}