import { Router } from 'express'
const router = Router()
import { movieSearch, animeLibrary, animeSearch, movieLibrary, animeInfo, movieInfo, localSearch, allSearch, sweep } from '../../controllers/libraryController'
import { jwtauth } from '../../controllers/userController'

export default router

//search
//.get('/search', movieSearchLibrary)
.get('/anime/:search', sweep, animeSearch)
.get('/movie/:search', sweep, movieSearch)
.get('/local/:search', sweep, localSearch)
.get('/:search', jwtauth, sweep, allSearch)
.get('/animeinfo/:search', jwtauth, animeInfo)
.get('/movieinfo/:search', movieInfo)

//return top results
.get('/topmovies', movieLibrary)
.get('/topanime/:number', animeLibrary)