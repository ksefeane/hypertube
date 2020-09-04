import { Router } from 'express'
import { downloadVideo, deleteVideo, getInfo, streamVideo } from '../../controllers/videoController'
const router = Router()

export default router
.get('/delete/:magnet', deleteVideo)

.get('/download/:magnet', downloadVideo)
.get('/info', getInfo)
.get('/stream/', streamVideo)
