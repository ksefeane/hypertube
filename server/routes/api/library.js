import { Router } from 'express'
const axios = require('axios');
const router = Router()
import { movieLibrary } from '../../controllers/libraryController'
export default router

.get('/movies', movieLibrary)
