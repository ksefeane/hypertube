import { Router } from 'express'
const router = Router()
import { listUsers, registerUser } from '../../controllers/userController'

export default router
//get
.get('/', listUsers)
//add
.post('/', registerUser)
//delete
