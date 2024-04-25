import mysql from 'mysql'

const connectMySQL = mysql.createPool({
	database:'mangerSystem',
	user:'root',
	password:'570789429',
	host:'localhost',
	port:3306
})
connectMySQL.getConnection((error,res)=>{
	if(error) throw new Error(error.message)
	
	console.log('数据库连接成功')
})

const query = (qs,params=[])=>{
	return new Promise((resolve,reject)=>{
		if(params.length==0){
			connectMySQL.query(qs,(err,res)=>{
				if(err) return reject(err)
				
				return resolve(res)
			})
		}else{
			connectMySQL.query(qs,params,(err,res)=>{
				if(err) return reject(err)
				
				return resolve(res)
			})
		}
	})
}

export default query