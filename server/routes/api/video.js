import { Router } from 'express'
import { 
    downloadMagnet, deleteVideo, 
    getInfo, streamVideo, streamState 
} from '../../controllers/videoController'
import { fetchComments, addNewComment } from "../../controllers/videoController";
const router = Router()

export default router
.delete('/delete/:magnet', deleteVideo)

.get('/status/:movie', streamState)
.get('/stream/:movie', streamVideo)

//download torrent
.get('/downloadMagnet/:title/:magnet', downloadMagnet)
.get('/info', getInfo)

.post('/addcomment', addNewComment)
.post('/fetch-comments', fetchComments)

//.get('/downloadAnime/:search', downloadAnime)
//.get('/downloadMovie/:search', downloadMovie)

// api for adding a comment
//.post('/addcomment', addNewComment)
