import { Router } from 'express'
const router = Router()
import {
    sweep, movieLibrary, movieDetails, animeDetails, animeTorrents 
} from '../../controllers/libraryController'
import { jwtauth } from '../../controllers/userController'

export default router

.get('/topmovies', sweep, movieLibrary)
.get('/movieinfo/:search', sweep, movieDetails)
.get('/animeinfo/:search', sweep, animeDetails)
.get('/animetorrents/:search', animeTorrents)

//.get('/search', movieSearchLibrary)
//.get('/topvideos', topVideos)
//.get('/topanime', animeLibrary)
// .get('/anime/:search', sweep, animeSearch)
// .get('/local/:search', sweep, localSearch)
// .get('/:search', jwtauth, sweep, allSearch)
// .get('/animeinfo/:search', jwtauth, animeInfo)
//.get('/movieinfo/:search', movieInfo)

//return top results
//.get('/topanime/:number', animeLibrary)