import { Router } from 'express'
const axios = require('axios');
const router = Router()
import { sweepLibrary, animeLibrary, animeSearch, movieLibrary, movieSearchLibrary } from '../../controllers/libraryController'

export default router

//return top results
.get('/movies', movieLibrary)
.get('/topanime/:number', animeLibrary)

//search
.get('/search', movieSearchLibrary)
.get('/anime/:search', animeSearch)
.get('movie/')

//sweep test
.get('/sweep', sweepLibrary)