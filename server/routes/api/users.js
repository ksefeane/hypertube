import { Router } from 'express'
const router = Router()
import { 
    listUsers, registerUser, loginUser, ftLogin, gitLogin, logoutUser, uploadPhoto
} from '../../controllers/userController'
import upload from '../../models/imageModel'
import passport from 'passport'

export default router

//get
.get('/', listUsers)
.get('/auth/42', passport.authenticate('42', {scope: 'public'}))
.get('/auth/redirect', passport.authenticate('42', {session: false, failureRedirect: '/api/users/signup'}), ftLogin)
.get('/auth/github', passport.authenticate('github', {scope: 'user'}))
.get('/auth/redirect2', passport.authenticate('github', {session: false, failureRedirect: '/api/users/signup'}), ftLogin)
.get('/logout', logoutUser)

//add
.post('/signup', registerUser)
.post('/signin', loginUser)
.post('/upload', upload.single('photo'), uploadPhoto)

//delete