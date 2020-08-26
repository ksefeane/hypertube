import Router from "express"
import { passwordReset, checkLink, changePassword } from "../../controllers/userController"
const router = Router()

export default router

.post('/', passwordReset)
.post('/:reset', checkLink, changePassword)