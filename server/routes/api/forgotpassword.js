import Router from "express"
import { passwordReset } from "../../controllers/userController"
const router = Router()

export default router

.get('/', passwordReset)