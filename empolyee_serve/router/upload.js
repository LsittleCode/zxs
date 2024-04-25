import {Router} from 'express'
import {uploadImage} from '../contorlles/upload.js'
const router = Router()

router.post('/',uploadImage)


export default router