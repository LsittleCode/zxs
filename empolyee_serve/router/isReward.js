import {Router} from 'express'
import {addReward,getReward,delRewad} from '../contorlles/isRewad.js'
const router = Router()

router.post('/',addReward)
router.get('/',getReward)
router.delete('/:id',delRewad)

export default router