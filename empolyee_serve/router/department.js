import {Router}  from 'express'
import {getDepartment,addDept,delDept} from '../contorlles/department.js'
const router = Router()

router.get('/',getDepartment)

router.put('/',addDept)

router.delete('/:departmentID',delDept)
export default router