import { Router } from 'express'
const router = Router()
import {
    sweep, movieLibrary, movieDetails, animeInfo, animeSearch 
} from '../../controllers/libraryController'
import { jwtauth } from '../../controllers/userController'

export default router

.get('/topmovies', movieLibrary)
.get('/movieinfo/:search', sweep, movieDetails)
.get('/animeinfo/:search', sweep, animeInfo)

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