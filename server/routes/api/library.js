import { Router } from 'express'
const router = Router()
import { movieSearch, animeLibrary, animeSearch, movieLibrary, movieSearchLibrary, animeInfo, movieInfo, localSearch, allSearch } from '../../controllers/libraryController'

export default router

//search
//.get('/search', movieSearchLibrary)
.get('/anime/:search', animeSearch)
.get('/movie/:search', movieSearch)
.get('/local/:search', localSearch)
.get('/:search', allSearch)
.get('/animeinfo/:search', animeInfo)
.get('/movieinfo/:search', movieInfo)

//return top results
.get('/topmovies', movieLibrary)
.get('/topanime/:number', animeLibrary)