import { Router } from 'express'
const router = Router()
import { movieSearch, sweepLibrary, animeLibrary, animeSearch, movieLibrary, movieSearchLibrary } from '../../controllers/libraryController'

export default router

//return top results
.get('/topmovies', movieLibrary)
.get('/topanime/:number', animeLibrary)

//search
//.get('/search', movieSearchLibrary)
.get('/anime/:search', animeSearch)
.get('/movie/:search', movieSearch)
//.get('/animeinfo', animeinfo)
//.get('/movieinfo', animeinfo)

//sweep test
.get('/sweep', sweepLibrary)