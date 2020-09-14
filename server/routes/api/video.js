import { Router } from 'express'
import { 
    downloadMagnet, deleteVideo, addNewComment,
    getInfo, streamVideo, streamState, fetchComments 
} from '../../controllers/videoController'
const router = Router()

export default router
.delete('/delete/:magnet', deleteVideo)
.get('/info', getInfo)

.get('/status/:movie', streamState)
.get('/stream/:movie', streamVideo)

//download torrent
.post('/downloadMagnet/:magnet', downloadMagnet)


//.get('/downloadAnime/:search', downloadAnime)
//.get('/downloadMovie/:search', downloadMovie)

// api for adding a comment
.post('/addcomment', addNewComment)
.post('/fetch-comments', fetchComments)