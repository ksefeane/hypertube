import { Router } from 'express'
import { downloadMagnet, downloadMovie, downloadAnime, deleteVideo, getInfo, streamVideo } from '../../controllers/videoController'
const router = Router()

export default router
.get('/delete/:magnet', deleteVideo)
.get('/info', getInfo)

.get('/stream/:movie', streamVideo)

//download torrent
.get('/downloadMagnet/:magnet', downloadMagnet)
.get('/downloadAnime/:search', downloadAnime)
.get('/downloadMovie/:search', downloadMovie)