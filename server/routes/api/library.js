import { Router } from 'express'
const router = Router()
import { movieSearch, animeLibrary, animeSearch, movieLibrary, animeInfo, movieInfo, localSearch, allSearch, sweep, topVideos } from '../../controllers/libraryController'
import { jwtauth } from '../../controllers/userController'

export default router

.get('/topmovies', movieLibrary)
.get('/movie/:search', sweep, movieSearch)


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