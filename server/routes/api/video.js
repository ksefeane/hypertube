import { Router } from 'express'
import { downloadVideo } from '../../controllers/videoController'
const router = Router()

export default router

.post('/download', downloadVideo)

//download torrent