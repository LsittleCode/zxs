import path from 'path'

import {Router}  from 'express'
import {login,regist,getInfo} from '../contorlles/user.js'

const router = Router()
router.get('/',getInfo)
router.post('/login',login)
router.post('/regist',regist)


export default router