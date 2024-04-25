import {Router} from 'express'

import {getDatas,bindID} from '../contorlles/dashboard.js'

const router = Router()

router.get('/',getDatas)

router.get('/:id',bindID)

export default router