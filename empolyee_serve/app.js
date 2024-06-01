import express  from 'express'
import 'dotenv/config'
import cors from 'cors'
import 'express-async-errors'
import {verifyToken} from './plugin/jwt.js'
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
app.use('/api/upload',upload)
app.use('/api/user',user)
app.use( async(req,res,next)=>{
 const isHasToken = req.get('Authorization')? await verifyToken(req.get('Authorization').substring(7)):false
 if(isHasToken){
  next()
 }else{
  res.cc({mes:'invalid token',success:false},403)
 }
})

app.use('/api/empolyee',empolyee)
app.use('/api/department',department)
app.use('/api/isReward',isReward)
app.use('/api/salary',salary)
app.use('/api/dashboard',dashboard)



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