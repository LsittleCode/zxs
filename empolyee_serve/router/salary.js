import {Router} from 'express'
import {generateData,getSalaryList} from '../contorlles/salary.js'


const router = Router()

router.get('/generateData',generateData)


router.get('/',getSalaryList)

export default router