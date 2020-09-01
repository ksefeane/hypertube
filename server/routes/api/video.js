import { Router } from 'express'
import { downloadVideo, streamVideo } from '../../controllers/videoController'
const router = Router()

export default router

.get('/stream', streamVideo)
.post('/download', downloadVideo)

//download torrent