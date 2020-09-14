import { Router } from 'express'
import { 
    downloadMagnet, downloadMovie, downloadAnime, deleteVideo, addNewComment,
    getInfo, streamVideo, fetchComments 
} from '../../controllers/videoController'
const router = Router()

export default router
.get('/delete/:magnet', deleteVideo)
.get('/info', getInfo)

.get('/stream/:movie', streamVideo)

//download torrent
.get('/downloadMagnet/:magnet', downloadMagnet)
.get('/downloadAnime/:search', downloadAnime)
.get('/downloadMovie/:search', downloadMovie)

// api for adding a comment
.post('/addcomment', addNewComment)
.post('/fetch-comments', fetchComments)