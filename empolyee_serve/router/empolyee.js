import {Router} from 'express'
const router = Router()

import {addEmpolyee,getEmpolyee,getTargetEmpolyee,updateSalary} from '../contorlles/empolyee.js'
router.post('/',addEmpolyee)

router.get('/',getEmpolyee)

router.get('/:id',getTargetEmpolyee)


router.put('/salary',updateSalary)
export default router