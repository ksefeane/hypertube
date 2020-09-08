import { Router } from 'express'
const axios = require('axios');
const router = Router()
import { animeLibrary, animeSearch, movieLibrary, movieSearchLibrary } from '../../controllers/libraryController'

export default router

.get('/movies', movieLibrary)
.get('/search', movieSearchLibrary)
.get('/anime', animeLibrary)
.get('/anime/:search', animeSearch)
