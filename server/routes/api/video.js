import { Router } from 'express'
import { 
    downloadMagnet, deleteVideo,
    getInfo, streamVideo, streamState
} from '../../controllers/videoController'
import { fetchComments, addNewComment } from "../../controllers/videoController";
const router = Router()

export default router
.delete('/delete/:magnet', deleteVideo)
.get('/info', getInfo)

.get('/status/:movie', streamState)
.get('/stream/:movie', streamVideo)

//download 
// .get('/downloadMagnet/:magnet', downloadMagnet)
.post('/downloadMagnet/:magnet', downloadMagnet)


//.get('/downloadAnime/:search', downloadAnime)
//.get('/downloadMovie/:search', downloadMovie)

// api for adding a comment
.post('/addcomment', addNewComment)
.post('/fetch-comments', fetchComments)