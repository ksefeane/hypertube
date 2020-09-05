import { Router } from 'express'
import { downloadVideo, deleteVideo, getInfo, streamVideo } from '../../controllers/videoController'
const router = Router()

export default router
.get('/download/:magnet', downloadVideo)
.get('/delete/:magnet', deleteVideo)
.get('/info', getInfo)

.get('/stream/:movie', streamVideo)
