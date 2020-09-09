import { Router } from 'express'
const router = Router()
import { movieSearch, animeLibrary, animeSearch, movieLibrary, movieSearchLibrary, animeInfo, movieInfo } from '../../controllers/libraryController'

export default router

//search
//.get('/search', movieSearchLibrary)
.get('/anime/:search', animeSearch)
.get('/movie/:search', movieSearch)
.get('/animeinfo/:search', animeInfo)
.get('/movieinfo/:search', movieInfo)

//return top results
.get('/topmovies', movieLibrary)
.get('/topanime/:number', animeLibrary)