import express  from 'express'
import 'dotenv/config'
import cors from 'cors'
import 'express-async-errors'

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use((req,res,next)=>{
	res.cc = (data,status=400)=>{
		return res.status(status).send(JSON.stringify({data,status}))
	}
	next()
})

// -------------------------
import upload from './router/upload.js'
import user from './router/user.js'
import dashboard from './router/dashboard.js'
import empolyee from './router/empolyee.js'
import department from './router/department.js'
import isReward from './router/isReward.js'
import salary from './router/salary.js'
// routers

app.use(express.static('../upload'))
app.use('/upload',upload)
app.use('/user',user)
app.use('/empolyee',empolyee)
app.use('/department',department)
app.use('/isReward',isReward)
app.use('/salary',salary)
app.use('/dashboard',dashboard)



app.use((err,req,res,next)=>{
    if(err){
        res.cc({mes:err.message},403)
        console.log('err--:',err.message)
    }
    next()
})


process.on('uncaughtException', (err) => {
  console.error('捕获到未处理的异常:', err.message);
});

export default app